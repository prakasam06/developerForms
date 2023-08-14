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

const createPage = (obj, id) => {
  for (var key of Object.keys(obj)) {
    console.log(obj[key]);
    if (key == "container") {
      var element = createElement(obj[key], key);

      element.setAttribute("id", `${Date.now() + obj[key]}`);
      previewArea.appendChild(element);
    }
    if (key == "tagName") {
      element = createElement(obj[key]);

      const data = id;
      console.log(data);
      const contain = document.getElementById(data);
      console.log(contain);
      contain.appendChild(element);

      if (obj.hasOwnProperty("content")) {
        element.innerHTML = obj.content;
      }
    }

    if (key == "children") {
      console.log(element.id);
      createChildren(obj[key], element.id);
    } else {
      console.log(key, obj[key]);
      element.setAttribute(key, obj[key]);
    }
  }
};

const createChildren = (obj, id) => {
  obj.forEach((object) => {
    console.log(id);
    for (var key of Object.keys(object)) {
      if (key == "tagName") {
        var childContainer = document.createElement(object[key]);
        childContainer.setAttribute("id", `${object[key] + Date.now()}`);
        var container = document.getElementById(id);
        container.appendChild(childContainer);
      }
      if (key == "content") {
        childContainer.innerHTML = object[key];
      }
      if (key == "children") {
        object[key].forEach((child) => {
          for (var key of Object.keys(child)) {
            if (key == "tagName") {
              console.log(child[key]);
              var element = document.createElement(child[key]);

              childContainer.appendChild(element);
              element.setAttribute("id", `${Date.now() + child[key]}`);
            }
            if (key == "content") {
              element.innerHTML = child[key];
            } else {
              element.setAttribute(key, child[key]);
            }

            if (key == "children") {
              child[key].forEach((child) => {
                console.log(child);
                console.log(element.id);
                createPage(child, element.id);
              });
            }
          }
        });
      } else {
        childContainer.setAttribute(key, object[key]);
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
    addDefaultstyles(form);
  });
});

function deleteChilds(divName) {
  while (divName.hasChildNodes()) {
    divName.removeChild(divName.children[0]);
  }
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

const createElement = (tagName, key) => {
  var element = document.createElement(tagName);
  element.setAttribute("id", `${tagName + key}`);
  console.log(element);
  return element;
};

const addDefaultstyles = (obj) => {
  obj.defaultClasses.forEach((o) => {
    for (var key of Object.keys(o)) {
      const elements = document.getElementsByTagName(key);
      Array.from(elements).forEach((element) => {
        console.log(element);
        console.log(o[key]);
        element.setAttribute("class", o[key]);
      });
    }
  });
};
