/// Selectors
const newQuotesMenu = document.getElementById("new-quotes-menu")
const dueTodayQuotesMenu = document.getElementById("due-today-quotes-menu")
const newQuotesTable = document.getElementById("new-quotes")
const dueTodayQuotesTable = document.getElementById("due-today-quotes")
const inputForm = document.getElementById("input-form")
const saveButtons = document.getElementById("save-buttons")
const deleteButtons = document.getElementById("delete-buttons")
const saveiQuoteBtn = document.getElementById("save-iquote-btn")
const saveTabBtn = document.getElementById("save-tab-btn")
const deleteBtn = document.getElementById("delete-btn")
const inputEl = document.getElementById("input-el")
const newQuoteList = document.getElementById("new-quotes-list")
const dueQuoteList = document.getElementById("due-quotes-list")

/// Local storage variables
const newQuotesLocalStorage = JSON.parse( localStorage.getItem("newQuotes") )
const dueQuotesLocalStorage = JSON.parse( localStorage.getItem("dueQuotes") )

/// Arrays to save quotes
let newQuotes = []
let dueTodayQuotes = []

///Render quotes if local storage has saved items

if (newQuotesLocalStorage) {
    newQuotes = newQuotesLocalStorage
    renderNewQuotes(newQuotes)
}

if(dueQuotesLocalStorage) {
    dueTodayQuotes = dueQuotesLocalStorage
    renderDueQuotes(dueTodayQuotes)
}

/// Toggle between Quote tables
newQuotesMenu.addEventListener('click', e => {
    newQuotesTable.classList.add("active")
    dueTodayQuotesTable.classList.remove("active")
    newQuotesTable.style.display = "block"
    inputForm.style.display = "block"
    saveButtons.style.display = "flex"
    deleteButtons.style.display = "flex"
    dueTodayQuotesTable.style.display = "none"
    renderNewQuotes(newQuotes)
})

dueTodayQuotesMenu.addEventListener('click', e => {
    dueTodayQuotesTable.classList.add("active")
    newQuotesTable.classList.remove("active")
    dueTodayQuotesTable.style.display = "block"
    inputForm.style.display = "block"
    saveButtons.style.display = "flex"
    deleteButtons.style.display = "flex"
    newQuotesTable.style.display = "none"
    renderDueQuotes(dueTodayQuotes)
})

/// Save button function and logic
saveiQuoteBtn.addEventListener("click", e =>{
    if(newQuotesTable.classList.contains("active")){
        /// Logic to distinguish between URL and iQuote number
        if (inputEl.value.length > 100){
            console.log("This is a new URL")
            const fullURL = inputEl.value
            const leftURL = fullURL.split("=")[0]
            const rightURL = fullURL.split("=")[1]
            const iQuote = rightURL.split("&")[0]
            console.log("fullURL", fullURL)
            console.log("leftURL", leftURL)
            console.log("rightURL", rightURL)
            console.log("iQuote", iQuote)
            newQuotes.push(iQuote)
            inputEl.value = ""
            localStorage.setItem("newQuotes", JSON.stringify(newQuotes) )
            renderNewQuotes(newQuotes)
            console.log(newQuotes)
            console.log("Save new quote")
        } else if(inputEl.value.length === 11) {
            console.log("this is a new iQuote")
            newQuotes.push(inputEl.value)
            inputEl.value = ""
            localStorage.setItem("newQuotes", JSON.stringify(newQuotes) )
            renderNewQuotes(newQuotes)
            console.log(newQuotes)
            console.log("Save new quote")
        } 
    } else if (dueTodayQuotesTable.classList.contains("active")){
        if (inputEl.value.length > 100){
            console.log("This is a URL due today")
            const fullURL = inputEl.value
            const leftURL = fullURL.split("=")[0]
            const rightURL = fullURL.split("=")[1]
            const iQuote = rightURL.split("&")[0]
            console.log("fullURL", fullURL)
            console.log("leftURL", leftURL)
            console.log("rightURL", rightURL)
            console.log("iQuote", iQuote)
            dueTodayQuotes.push(iQuote)
            inputEl.value = ""
            localStorage.setItem("dueQuotes", JSON.stringify(dueTodayQuotes) )
            renderDueQuotes(dueTodayQuotes)
            console.log(dueTodayQuotes)
            console.log("Save due today quote")
        } else if (inputEl.value.length === 11){
            console.log("this is a due today iQuote")
            dueTodayQuotes.push(inputEl.value)
            inputEl.value = ""
            localStorage.setItem("dueQuotes", JSON.stringify(dueTodayQuotes) )
            renderDueQuotes(dueTodayQuotes)
            console.log(dueTodayQuotes)
            console.log("Save due today quote")
        }
    }
})

/// Save tab function and logic
saveTabBtn.addEventListener("click", e =>{
    if(newQuotesTable.classList.contains("active")){
        console.log("Save tab in new quote")
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            const fullURL = tabs[0].url
            const leftURL = fullURL.split("=")[0]
            const rightURL = fullURL.split("=")[1]
            const iQuote = rightURL.split("&")[0]
            console.log("fullURL", fullURL)
            console.log("leftURL", leftURL)
            console.log("rightURL", rightURL)
            console.log("iQuote", iQuote)
            newQuotes.push(iQuote)
            localStorage.setItem("newQuotes", JSON.stringify(newQuotes) )
            renderNewQuotes(newQuotes)
            console.log(newQuotes)
            console.log("Save new quote")
        })

    } else if (dueTodayQuotesTable.classList.contains("active")){
        console.log("Save tab in due today quote")
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            const fullURL = tabs[0].url
            const leftURL = fullURL.split("=")[0]
            const rightURL = fullURL.split("=")[1]
            const iQuote = rightURL.split("&")[0]
            console.log("fullURL", fullURL)
            console.log("leftURL", leftURL)
            console.log("rightURL", rightURL)
            console.log("iQuote", iQuote)
            dueTodayQuotes.push(iQuote)
            localStorage.setItem("dueQuotes", JSON.stringify(dueTodayQuotes) )
            renderDueQuotes(dueTodayQuotes)
            console.log(dueTodayQuotes)
            console.log("Save due today quote")
        })
    }
})

/// Functions to render quotes to the page
function renderNewQuotes(quotes) {
    let listItems = ""
    const leftURL= "http://iquote-evolve.avnet.com/qrtapp/pages/common/QRTQuoteSummary.jsf?quoteID="
    const rightURL = "&conversationContext=2314" 
    for (let i = 0; i<quotes.length; i++) {
        listItems += `
        <li><input 
        type="checkbox"
        id="${quotes[i]}"/>
      <label for="${quotes[i]}">
      <span class="custom-checkbox"></span>
      <a target='_blank' href='${leftURL}${quotes[i]}${rightURL}'>${quotes[i]}</a></label></li>`
    }
    newQuoteList.innerHTML = listItems
}

function renderDueQuotes(quotes) {
    let listItems = ""
    const leftURL= "http://iquote-evolve.avnet.com/qrtapp/pages/common/QRTQuoteSummary.jsf?quoteID="
    const rightURL = "&conversationContext=2314" 
    for (let i = 0; i<quotes.length; i++) {
        listItems += `
        <li><input 
        type="checkbox"
        id="${quotes[i]}"/>
      <label for="${quotes[i]}">
      <span class="custom-checkbox"></span>
      <a target='_blank' href='${leftURL}${quotes[i]}${rightURL}'>${quotes[i]}</a></label></li>`
    }
    dueQuoteList.innerHTML = listItems
}

/// Delete button function and logic
deleteBtn.addEventListener("dblclick", e => {
    if(newQuotesTable.classList.contains("active")){
        localStorage.removeItem("newQuotes")
        newQuotes = []
        renderNewQuotes(newQuotes)
    } else if (dueTodayQuotesTable.classList.contains("active")) {
        localStorage.removeItem("dueQuotes")
        dueTodayQuotes = []
        renderDueQuotes(dueTodayQuotes)
    }
})
