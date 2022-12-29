//chrome://extensions/

let myLeads = [];
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("leads"));
const saveBtn = document.getElementById("save-btn");
const deleteBtn = document.getElementById("delete-btn");
const unorderedlist = document.getElementById("ul-element");
const inputField = document.getElementById("input-element");
const tabBtn = document.getElementById("tab-btn");


if(leadsFromLocalStorage){
  myLeads = leadsFromLocalStorage;
  renderLeads(myLeads)
}

  saveBtn.addEventListener("click", (e)=>{
    const  inputToTextField = inputField.value;
    if(inputToTextField === ""){
      return
      }
    myLeads.push(inputToTextField);
      localStorage.setItem("leads", JSON.stringify(myLeads))
      inputField.value = "";
      renderLeads(myLeads)
      
      
  })

  tabBtn.addEventListener("click",  ()=>{
      chrome.tabs.query({
      active: true,
      lastFocusedWindow: true
  }, (tabs)=> {
      // and use that tab to fill in out title and url
      var tab = tabs[0];
      myLeads.push(tab.url)
      localStorage.setItem("leads", JSON.stringify(myLeads))
      renderLeads(myLeads)
      
  });
   
  });
 
  deleteBtn.addEventListener("click", (e)=>{
          if(myLeads[0] !== undefined){
            if(confirm("Are you sure you want to delete all links?")){
              localStorage.clear();
              myLeads = [];
              unorderedlist.textContent = "";
            }
          }
          return
  })


function renderLeads(array){
  let listItems = "";
  
  for(let i=0; i < array.length; i++){
    listItems += `<li>
    <a href="${array[i]}" target="_blank">${array[i]}</a>
    </li>`
  }
  unorderedlist.innerHTML = listItems;
}
