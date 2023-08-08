import Prism from "prismjs";

const codetag = document.getElementById("codetag");

const page1 = document.getElementById("page1");
const getCode = document.getElementById("editing");
const codeTag = document.getElementById("highlighting");
const convertJSON = document.getElementById("convert");
const previewArea = document.getElementById("previewArea");

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

//setting up the clicked Effect
function barClicked() {
  bars.classList.toggle("active");
  nav.classList.toggle("visible");
}

function htmlEntities(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

getCode.oninput = () => {
  const html = Prism.highlight(
    getCode.value,
    Prism.languages.javascript,
    "javascript"
  );

  console.log(getCode.value);
  console.log(html);
  codeTag.innerHTML = html;
};

convertJSON.addEventListener("click", () => {
  const JSONobj = JSON.parse(getCode.value);
  const forms = [...JSONobj];
  console.log(forms);
  deleteChilds(previewArea);
  forms.forEach((page) => {
    const container = document.createElement(page.tagName);
    previewArea.appendChild(container);
    page.children.forEach((child) => {
      const elementsContainer = document.createElement(child.tagName);
      child.children.forEach((childd) => {
        const element = document.createElement(childd.tagName);
        if (childd.tagName == "label") {
          element.innerHTML = childd.content;
        } else if (childd.tagName == "input") {
          element.type = childd.type;
        }
        elementsContainer.appendChild(element);
      });
      container.appendChild(elementsContainer);
    });
  });
});

function deleteChilds(divName) {
  while (divName.hasChildNodes()) {
    divName.removeChild(divName.children[0]);
  }
}
