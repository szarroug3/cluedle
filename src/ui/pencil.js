// Grease pencils, red and blue, for marking words. Pick one up from the rail (even with a card open),
// then select words in the newspaper story, a suspect's description or statement, a clue, or a scrap
// brought up close, and they're underlined in that colour. With a pencil in hand, clicking a mark rubs it out. Marks are saved by their place in
// the text, so they come back on the next visit.

const COLORS = ["red", "blue"];

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

// Where in the text each kind of markable thing sits. `target` names what a mark belongs to.
const MARKABLE = [
  { selector: ".pin-clipping .story", target: () => "clipping" },
  { selector: ".pin-suspect .suspect-desc", target: (node) => node.closest(".pin-item").dataset.pin },
  { selector: ".pin-suspect .suspect-statement", target: (node) => `statement:${node.closest(".pin-item").dataset.pin.replace("suspect:", "")}` },
  { selector: ".pin-clue .clue-text", target: (node) => node.closest(".pin-item").dataset.pin },
  { selector: ".clue-open .clue-text", target: (node) => `clue:${node.closest("[data-clue]").dataset.clue}` },
  // The close-up shares its marks with the card on the board.
  { selector: ".statement-open .statement-desc", target: (node) => `suspect:${node.closest("[data-suspect]").dataset.suspect}` },
  { selector: ".statement-open .statement-quote", target: (node) => `statement:${node.closest("[data-suspect]").dataset.suspect}` },
  { selector: ".close-look .close-look-note:not(.close-look-code)", target: (node) => `look:${node.closest("[data-look]").dataset.look}` },
];

function markableOf(node) {
  const element = node?.nodeType === Node.TEXT_NODE ? node.parentElement : node;
  for (const { selector, target } of MARKABLE) {
    const host = element?.closest(selector);
    if (host) return { host, target: target(host) };
  }
  return null;
}

// Character offset of a point within a host's text.
function offsetIn(host, node, offset) {
  const range = document.createRange();
  range.selectNodeContents(host);
  range.setEnd(node, offset);
  return range.toString().length;
}

// Wrap characters [start, end) of a host's text in a mark, splitting text nodes as needed.
function wrap(host, start, end, mark) {
  const walker = document.createTreeWalker(host, NodeFilter.SHOW_TEXT);
  const pieces = [];
  let at = 0;
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const from = Math.max(start - at, 0);
    const to = Math.min(end - at, node.length);
    if (from < to) pieces.push({ node, from, to });
    at += node.length;
  }
  for (const { node, from, to } of pieces) {
    const middle = node.splitText(from);
    middle.splitText(to - from);
    const span = el("mark", `pencil-mark mark-${mark.color}`);
    span.dataset.mark = String(mark.id);
    middle.replaceWith(span);
    span.append(middle);
  }
}

// A new mark snaps out to whole words and swallows any mark of the same colour it overlaps, so
// marking across an old mark extends it. Returns the marks to keep, with the new one last; or the
// marks unchanged if the selection held no words.
export function addMark(marks, text, { target, start, end, color }) {
  const word = /[\w’'$.,:-]/;
  while (start < end && /\s/.test(text[start])) start++;
  while (end > start && /\s/.test(text[end - 1])) end--;
  if (start >= end) return marks;
  while (start > 0 && word.test(text[start - 1])) start--;
  while (end < text.length && word.test(text[end])) end++;
  const overlaps = (m) => m.target === target && m.color === color && m.start <= end && m.end >= start;
  for (const m of marks.filter(overlaps)) {
    start = Math.min(start, m.start);
    end = Math.max(end, m.end);
  }
  const id = Math.max(0, ...marks.map((m) => m.id)) + 1;
  return [...marks.filter((m) => !overlaps(m)), { id, target, start, end, color }];
}

export function createPencil(stage, { marks, onChange, onPickUp }) {
  let held = null;

  const group = el("div", "rail-group pencils");
  const cup = el("div", "pencil-cup");
  const pencils = COLORS.map((color) => {
    const pencil = el("button", `pencil pencil-${color}`);
    pencil.type = "button";
    pencil.dataset.color = color;
    pencil.setAttribute("aria-label", `Pick up the ${color} pencil`);
    cup.append(pencil);
    return pencil;
  });
  group.append(cup, el("div", "rail-label", "Pencils"));
  stage.querySelector(".case-tag").before(group);

  function refresh() {
    for (const pencil of pencils) pencil.classList.toggle("lifted", pencil.dataset.color === held);
    stage.classList.toggle("marking", Boolean(held));
    for (const color of COLORS) stage.classList.toggle(`marking-${color}`, held === color);
  }

  function pickUp(color) {
    held = held === color ? null : color;
    if (held) onPickUp?.();
    refresh();
  }

  // Draw every saved mark inside a container (the board, or a statement just opened).
  function apply(container) {
    for (const { selector, target } of MARKABLE) {
      for (const host of container.querySelectorAll(selector)) {
        for (const old of host.querySelectorAll(".pencil-mark")) old.replaceWith(...old.childNodes);
        host.normalize();
        const name = target(host);
        for (const mark of marks.filter((m) => m.target === name)) wrap(host, mark.start, mark.end, mark);
      }
    }
  }

  // Letting go after selecting words marks them, if they're all in one markable place.
  let justMarked = false;
  document.addEventListener("pointerup", () => {
    if (!held) return;
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;
    const range = selection.getRangeAt(0);
    const start = markableOf(range.startContainer);
    const end = markableOf(range.endContainer);
    selection.removeAllRanges();
    if (!start || !end || start.host !== end.host) return;
    const from = offsetIn(start.host, range.startContainer, range.startOffset);
    const to = offsetIn(start.host, range.endContainer, range.endOffset);
    const next = addMark(marks, start.host.textContent, { target: start.target, start: from, end: to, color: held });
    if (next === marks) return;
    marks.splice(0, marks.length, ...next);
    onChange();
    // Redraw everywhere: a statement's marks show on its card and in its close-up alike.
    apply(stage);
    justMarked = true;
    setTimeout(() => (justMarked = false), 0);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && held && !stage.querySelector(".overlay")) pickUp(held);
  });

  return {
    apply,
    putDown() {
      held = null;
      refresh();
    },
    // Handles a click if it belongs to the pencils; returns whether it did.
    handleClick(event) {
      const pencil = event.target.closest(".pencil");
      if (pencil) {
        pickUp(pencil.dataset.color);
        return true;
      }
      if (!held) return false;
      // The click that ends a selection shouldn't also open the card under it.
      if (justMarked) return true;
      const mark = event.target.closest(".pencil-mark");
      if (mark) {
        marks.splice(marks.findIndex((m) => String(m.id) === mark.dataset.mark), 1);
        onChange();
        apply(stage);
        return true;
      }
      return false;
    },
  };
}
