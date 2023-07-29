import Prism from "prismjs";
const html = document.getElementById("leftSection");
const codetag = document.getElementById("codetag");

window.onload = () => {
  const needed = htmlEntities(html.outerHTML);
  codetag.innerHTML = needed;
};

function htmlEntities(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// const code = `var data = 1;`;

// // const loadJSON = document.getElementById("loadJSON");
// // Returns a highlighted HTML string

// const pre = document.getElementById("pre");
// const codes = document.getElementById("prew");

// loadJSON.addEventListener("click", () => {
//   const highlightthis = pre.value;

//   const html = Prism.highlight(
//     highlightthis,
//     Prism.languages.javascript,
//     "javascript"
//   );
// });

var m_pos;
function resizeRight(e) {
  var rightParent = resizeElementright.parentNode;
  var dx = m_pos - e.x;
  m_pos = e.x;
  rightParent.style.width =
    parseInt(getComputedStyle(rightParent, "").width) + dx + "px";
}

var resizeElementright = document.getElementById("preview-button");
resizeElementright.addEventListener(
  "mousedown",
  function (e) {
    m_pos = e.x;
    document.addEventListener("mousemove", resizeRight, false);
  },
  false
);
document.addEventListener(
  "mouseup",
  function () {
    document.removeEventListener("mousemove", resizeRight, false);
  },
  false
);

//

//setting up the clicked Effect
function barClicked() {
  bars.classList.toggle("active");
  nav.classList.toggle("visible");
}
