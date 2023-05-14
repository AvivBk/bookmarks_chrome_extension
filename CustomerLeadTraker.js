const inputEl = document.getElementById("input-el");
const inputBtnEl = document.getElementById("input-btn");
const deleteBtnEl = document.getElementById("delete-btn");
const tabBtnEl = document.getElementById("tab-btn");
const listEl = document.getElementById("list-el");


let marksList =[];
//container.innerHTML = "<button>add to page</button>"
const marksLocalStorage = JSON.parse(localStorage.getItem("marksList"));

if (marksLocalStorage)
{
    marksList = marksLocalStorage;
    ConvertArrayToLinks(marksList);
}


inputBtnEl.addEventListener("click",function(){
  marksList.push(inputEl.value);
  PushToLocalStorage(marksList, "marksList");
  ConvertArrayToLinks(marksList);
  inputEl.value = "";
})

deleteBtnEl.addEventListener("dblclick",function(){
  localStorage.clear();
  marksList.splice(0,marksList.length);
  listEl.innerHTML ="";
})

tabBtnEl.addEventListener("click",function(){
 SaveCurrentTab();
})

// a - makes the string as a link , li for doting
//target='_blank' create a new tab when pressed 
function AddInputAsLink()
{
    return "<li><a target='_blank' href='" + 
                inputEl.value + "'>" +
                inputEl.value + "</a></li>";
}

function PushToLocalStorage(arr, name)
{
    localStorage.setItem(name, JSON.stringify(arr));
}

// using templates we can use multiple lines in the string and it looks like html code string  
function AddInputAsLinkStringTemplates(value) 
{
     return  `
            <li>
                <a target='_blank' href='${value}'>
                    ${value}
                </a>
            </li>
        `
}

function ConvertArrayToLinks(arr)
{
    let list = "";
    for (let i = 0; i < arr.length; i++) 
    {
        list += AddInputAsLinkStringTemplates(marksList[i]);
    }
    listEl.innerHTML = list ; 
}

function SaveCurrentTab()
{
   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // since only one tab should be active and in the current window at once
        // the return variable should only have one entry
        marksList.push(tabs[0].url);
        PushToLocalStorage(marksList,"marksList");
        ConvertArrayToLinks(marksList);
    })
}
// higher cost when manipulating objects inside the dom
// that why ive used markslist insted - improve preformence
// const li = document.createElement("li")
   // li.textContent = myLeads[i]
   // listEl.append(li)