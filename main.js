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

const createPage = (obj) => {
  for (var key of Object.keys(obj)) {
    console.log(obj[key]);
    if (key == "container") {
      var parentContainer = document.createElement(obj[key]);
      console.log(parentContainer);
      parentContainer.setAttribute("id", "parentContainer");
      previewArea.appendChild(parentContainer);
    }
    if (key == "tagName") {
      var element = document.createElement(obj[key]);
      console.log(element);
      childContainer.appendChild(element);
    }
    if (key == "children") {
      createChildren(obj[key]);
    }
  }
};

const createChildren = (obj) => {
  obj.forEach((object) => {
    for (var key of Object.keys(object)) {
      if (key == "tagName") {
        var childContainer = document.createElement(object[key]);
        childContainer.setAttribute("id", "childContainer");
        parentContainer.appendChild(childContainer);
      }
      if (key == "children") {
        object[key].forEach((child) => {
          for (var key of Object.keys(child)) {
            if (key == "tagName") {
              console.log(child[key]);
              var element = document.createElement(child[key]);
              childContainer.appendChild(element);
            }
            if (key == "content") {
              element.innerHTML = child[key];
            }
            if (key == "children") {
              child[key].forEach((child) => {
                console.log(child);
                createPage(child);
              });
            } else {
              element.setAttribute(key, child[key]);
            }
          }
        });
      }
    }
  });
};

convertJSON.addEventListener("click", () => {
  const JSONobj = JSON.parse(getCode.value);
  const forms = [...JSONobj];
  console.log(forms);
  deleteChilds(previewArea);

  forms.forEach((form) => {
    createPage(form);
  });
});

function deleteChilds(divName) {
  while (divName.hasChildNodes()) {
    divName.removeChild(divName.children[0]);
  }
}

function createElement(tagName) {
  const element = document.createElement(tagName);
  previewArea.appendChild(element);
}

function addContent() {
  element.innerHTML = key;
}

//     if (Object.hasOwn(object, "content")) {
//       element.innerHTML = object.content;
//     }
//   }
//   if (key == "children") {
//     object[key].forEach((k) => {
//       createPage(k);
//     });
//   }
// }

const create = (o) => {
  console.log(o);
};
