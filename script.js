// ==================== function updateSizeOnScreen ====================
const mostUsed = document.getElementById("most-used")
const leastUsed = document.getElementById("least-used")

function loadBook(fileName, displayName) {
    let currentBook = ""
    const url = "books/" + fileName

    document.getElementById("file-name").innerHTML = displayName
    document.getElementById("search-stat").innerHTML = ""
    document.getElementById("keyword").value = ""

    const xhr = new XMLHttpRequest()
    xhr.open("GET", url, true)
    xhr.send()

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            currentBook = xhr.responseText

            getDocStats(currentBook)

            currentBook = currentBook.replace(/(?:\r\n|\r|\n)/g, "<br>")
            document.getElementById("file-content").innerHTML = currentBook

            const elmnt = document.getElementById("file-content")
            elmnt.scrollTop = 0
        }
    }
}

let wordDictionary = {}

function getDocStats(fileContent) {
    const docLength = document.getElementById("doc-length")
    const wordCount = document.getElementById("word-count")
    const charCount = document.getElementById("char-count")

    let text = fileContent.toLowerCase()
    let wordArray = text.match(/\b\S+\b/g)

    for (let word of wordArray) {
        if (wordDictionary[word] > 0) {
            wordDictionary[word] += 1
        } else {
            wordDictionary[word] = 1
        }
    }

    let wordList = sortProperties(wordDictionary)

    const top5Words = wordList.slice(0, 5)
    const least5Words = wordList.slice(-5).reverse()

    ulTemplate(top5Words, mostUsed)
    ulTemplate(least5Words, leastUsed)
}

function ulTemplate(items, element) {
    let resultsHTML = ""

    for (let i = 0; i < items.length; i++) {
        resultsHTML += `<li>${i + 1}: ${items[i]} ${wordDictionary[items[i]]} time(s)</li>`
    }

    element.innerHTML = resultsHTML
}

function sortProperties(obj) {
    let keysArray = Object.keys(obj)

    let keysSorted = keysArray.sort(function (a, b) {
        return obj[b] - obj[a]
    })

    return keysSorted
}
