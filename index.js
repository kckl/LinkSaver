let myLinks = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const ulEl = document.getElementById("ul-el")
const linksFromLocalStorage = JSON.parse( localStorage.getItem("myLinks") )


if (linksFromLocalStorage) {
    myLinks = linksFromLocalStorage
    renderLinks()
}

inputBtn.addEventListener("click", function() {
    myLinks.push(inputEl.value)
    localStorage.setItem("myLinks", JSON.stringify(myLinks))
    renderLinks(myLinks)
})

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLinks.push(tabs[0].url)
        localStorage.setItem("myLinks", JSON.stringify(myLinks))
        renderLinks(myLinks)
    })
})

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLinks = []
    renderLinks(myLinks)
})

function renderLinks(links) {
    let listItems = ""
    for (let i = 0; i < links.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${links[i]}'>
                    ${links[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems  
}
