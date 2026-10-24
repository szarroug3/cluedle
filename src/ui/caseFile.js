// The case file cover: the first thing seen each day. Case number, date, title, and Open the file.

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function longDate(key) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export function showCaseFile(stage, { caseNumber, dateKey, title, onOpen }) {
  const cover = el("div", "cover");
  const folder = el("div", "folder");
  const label = el("div", "paper folder-label");
  label.append(
    el("div", "card-label", "Riverside Heights Police · Homicide"),
    el("div", "folder-number", `Case File No. ${caseNumber}`),
    el("h1", "folder-title", title),
    el("div", "folder-date", longDate(dateKey)),
  );
  const open = el("button", "open-file", "Open the file");
  open.type = "button";
  open.addEventListener("click", () => {
    cover.classList.add("opening");
    setTimeout(() => {
      cover.remove();
      onOpen();
    }, 350);
  });
  folder.append(el("div", "folder-tab", "Confidential"), label, el("p", "folder-line", "The file’s open. Somebody in this room is lying."), open);
  cover.append(folder);
  stage.append(cover);
  open.focus();
}
