import Prism from "prismjs";

const codetag = document.getElementById("codetag");
const jsonInp = document.getElementById("JSONinp");
const page1 = document.getElementById("page1");

// window.onload = () => {
//   const needed = htmlEntities(html.outerHTML);
//   codetag.innerHTML = needed;
// };

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

function htmlEntities(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// const forms = [];
// const page = {
//   pageno: 1,
//   pageId: Date.now(),
//   contents: [],
// };

// const content = {
//   contentId: Date.now(),
//   label: "",
//   labelid: Date.now(),
//   inputType: Text,
//   inputId: Date.now(),
//   id: Date.now(),
//   pageid: page.pageId,
//   bootstrapClasses: [],
//   tailwindclasses: [],
// };

// const bootstrap = {
//   inputs: [],
//   labels: [],
//   thisDiv: [],
// };

// const tailwind = {
//   inputs: [],
//   labels: [],
//   thisDiv: [],
// };

// const forms = [
// {
//   pageno: 1,
//   pageId: Date.now(),
//   contents: {
//     contentId: Date.now(),
//     label: "name",
//     labelid: Date.now(),
//     inputType: "Text",
//     inputId: Date.now(),
//     id: "Date.now()",
//     pageid: "page.pageId",
//     bootstrapClasses: [
//       {
//         inputs: ["form-control"],
//         labels: ["form-label"],
//         thisDiv: ["card", "bg-dark"],
//       },
//     ],
//     tailwindclasses: [
//       {
//         inputs: [],
//         labels: [],
//         thisDiv: [],
//       },
//     ],
//   },
// },
// ];

const convert = document.getElementById("JSONtohtml");

convert.addEventListener("click", () => {
  const JSONobj = jsonInp.value;
  const jsonObjectOrArray = JSON.parse(JSONobj);
  console.log(jsonObjectOrArray);
  const forms = [...jsonObjectOrArray];
  console.log(forms);

  forms.forEach((form) => {
    const section = document.createElement("div");
    page1.appendChild(section);
    section.classList.add("container");
    console.log(form.contents);

    form.contents.forEach((content) => {
      console.log("hey");
      const thisdiv = document.createElement("div");
      section.appendChild(thisdiv);
      const label = document.createElement("label");
      label.innerHTML = content.label;
      const input = document.createElement("input");
      input.type = content.inputType;
      thisdiv.appendChild(label);
      thisdiv.appendChild(input);
      content.bootstrapClasses.forEach((bootstrap) => {
        console.log(bootstrap.inputs);
        bootstrap.inputs.forEach((style) => {
          input.classList.add(style);
        });
        bootstrap.labels.forEach((style) => {
          label.classList.add(style);
        });
        bootstrap.thisDiv.forEach((style) => {
          thisdiv.classList.add(style);
        });
      });
    });
    const needed = page1.outerHTML;
    const html = Prism.highlight(needed, Prism.languages.html, "html");
    codetag.innerHTML = html;
  });
});

// [
//   {
//     "pageno": 1,
//     "pageId": 1669611614491,
//     "contents": [
//       {
//         "contentId": 1669611614491,
//         "label": "name",
//         "labelid": 1669611614491,
//         "inputType": "Text",
//         "inputId": 1669611614491,
//         "id": 1669611614491,
//         "pageid": "page.pageId",
//         "bootstrapClasses": [
//           {
//             "inputs": ["form-control"],
//             "labels": ["form-label"],
//             "thisDiv": ["card", "bg-primary"]
//           }
//         ],
//         "tailwindclasses": [
//           {
//             "inputs": [],
//             "labels": [],
//             "thisDiv": []
//           }
//         ]
//       }
//     ]
//   }
//   ]
