const mostUsed = document.getElementById("most-used")
const leastUsed = document.getElementById("least-used")
const docLength = document.getElementById("doc-length")
const wordCount = document.getElementById("word-count")

let wordDictionary = {}

// ==================== Load a book from disk ====================
function loadBook(fileName, displayName) {
    let currentBook = ""
    const url = "books/" + fileName

    //reset our UI
    document.getElementById("file-name").innerHTML = displayName
    document.getElementById("search-stat").innerHTML = ""
    document.getElementById("keyword").value = ""

    //create a server a request to load our book
    const xhr = new XMLHttpRequest()
    xhr.open("GET", url, true)
    xhr.send()

    xhr.onreadystatechange = function () {
        //0:request not initialized, 1:server connection established, 2:request received, 3:processing request, 4:request finished and response is ready
        //200: "OK", 403: "Forbidden", 404: "Page not found"

        if (xhr.readyState == 4 && xhr.status == 200) {
            currentBook = xhr.responseText

            getDocStats(currentBook)

            //remove line breaks and carriage returns and replace with a <br>
            currentBook = currentBook.replace(/(?:\r\n|\r|\n)/g, "<br>")

            document.getElementById("file-content").innerHTML = currentBook

            const elmnt = document.getElementById("file-content")
            elmnt.scrollTop = 0
        }
    }
}

//get the stats for the book
function getDocStats(fileContent) {
    const charCount = document.getElementById("char-count")

    let text = fileContent.toLowerCase()
    let wordArray = text.match(/\b\S+\b/g)

    let uncommonWords = []

    //filter out the uncommon words
    uncommonWords = filterStopWords(wordArray)

    //count every word in the wordArray
    for (let word of uncommonWords) {
        if (wordDictionary[word] > 0) {
            wordDictionary[word] += 1
        } else {
            wordDictionary[word] = 1
        }
    }
    //sort the array
    let wordList = sortProperties(wordDictionary)

    //return the top 5 words
    const top5Words = wordList.slice(0, 5)

    //return the least 5 words
    const least5Words = wordList.slice(-5, wordList.length).reverse()

    //add the values to the page

    ulTemplate(top5Words, mostUsed)
    ulTemplate(least5Words, leastUsed)

    docLength.innerText = "Document Length: " + text.length
    wordCount.innerText = "Word Count: " + wordArray.length
}

function ulTemplate(items, element) {
    let resultsHTML = ""

    for (let i = 0; i < items.length; i++) {
        resultsHTML += `
                         <li> ${items[i]}: ${wordDictionary[items[i]]} time(s) </li>
                    `
    }
    element.innerHTML = resultsHTML
}

function sortProperties(obj) {
    //first convert the object to an array

    let keysArray = Object.keys(obj)

    //sort the array
    let keysSorted = keysArray.sort(function (a, b) {
        return obj[b] - obj[a]
    })

    return keysSorted
}
//filter list of array
//filter out stop words
function filterStopWords(wordArray) {
    const commonWords = getStopWords()
    const commonObj = {}
    const uncommonArr = []

    for (let i = 0; i < commonWords.length; i++) {
        commonObj[commonWords[i].trim()] = true
    }
    for (let i = 0; i < wordArray.length; i++) {
        const word = wordArray[i].trim().toLowerCase()
        if (!commonObj[word]) {
            uncommonArr.push(word)
        }
    }
    return uncommonArr
}

//a list of stop words we don't want to include in stats
function getStopWords() {
    return [
        "a",
        "all",
        "an",
        "and",
        "are",
        "as",
        "at",
        "be",
        "but",
        "by",
        "for",
        "had",
        "he",
        "her",
        "him",
        "his",
        "if",
        "in",
        "into",
        "i",
        "is",
        "it",
        "no",
        "not",
        "of",
        "on",
        "or",
        "she",
        "such",
        "that",
        "the",
        "their",
        "them",
        "then",
        "there",
        "these",
        "they",
        "this",
        "to",
        "you",
        "was",
        "were",
        "will",
        "with",
    ]
}

//highlight the words after search
function performMark() {
    //read the keyword
    const keyword = document.getElementById("keyword").value
    const display = document.getElementById("file-content")

    let newContent = ""

    // find all the currently marked items
    let spans = document.querySelectorAll("mark")
    //<mark></mark>

    for (let i = 0; i < spans.length; i++) {
        spans[i].outerHTML = spans[i].innerHTML
    }
    const re = new RegExp(keyword, "gi")
    const replaceText = "<mark id='mark-me'>$&</mark>"
    const bookContent = display.innerHTML

    //add the mark to the book content
    newContent = bookContent.replace(re, replaceText)

    display.innerHTML = newContent
    const count = document.querySelectorAll("mark").length
    document.getElementById("search-stat").innerHTML = "found " + count + "matches"

    if (count > 0) {
        const element = document.getElementById("mark-me")
        element.scrollIntoView()
    }
}
