const mostUsed = document.getElementById("most-used")
const leastUsed = document.getElementById("least-used")

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

let wordDictionary = {}
//get the stats for the book
function getDocStats(fileContent) {
    const docLength = document.getElementById("doc-length")
    const wordCount = document.getElementById("word-count")
    const charCount = document.getElementById("char-count")

    let text = fileContent.toLowerCase()
    let wordArray = text.match(/\b\S+\b/g)

    //count every word in the wordArray
    for (let word in wordArray) {
        let wordValue = wordArray[word]
        // console.log(wordValue)
        if (wordDictionary[wordValue] > 0) {
            wordDictionary[wordValue] += 1
        } else {
            wordDictionary[wordValue] = 1
        }
    }

    //sort the array
    let wordList = sortProperties(wordDictionary)
    // console.log(wordDictionary[[1][0]]) //2526

    //return the top 5 words
    const top5Words = wordList.slice(0, 5)
    // console.log(top5Words) //the
    // console.log(wordDictionary[top5Words[1][0]]) //2526

    // za svaku rijec u utop5words kojoj je key jednak topywords indexu povezi value
    //     top5Words.forEach(() => {
    //     let topWord =
    // })
    // let top5WordsValues = wordDictionary[top5Words[0]]
    // console.log(top5WordsValues) //2526

    for (let i = 0; i < top5Words.length; i++) {
        var top5WordsValues = wordDictionary[top5Words[i]]
        // console.log(top5WordsValues)
    }

    //  function myFunction(item, index) {
    //       text += index + ": " + item + "<br>";
    //    }
    //     console.log(top5WordsValues)
    //     ulTemplate(top5Words, 20, mostUsed)

    // let text = "";
    // const fruits = ["apple", "orange", "cherry"];
    // fruits.forEach(myFunction);

    // document.getElementById("demo").innerHTML = text;

    // }

    //return the least 5 words
    const least5Words = wordList.slice(-5, wordList.length).reverse()
    // console.log(least5Words)

    // for (let i = 0; i < least5Words.length; i++) {
    //     const least5WordsValues = wordDictionary[least5Words[i]]
    //     console.log(least5WordsValues)
    // }

    // const keysSortedValueFirst = obj[keysSorted[0]]
    // console.log(keysSortedValueFirst)

    //add the values to the page

    ulTemplate(top5Words, top5WordsValues, mostUsed)
    ulTemplate(least5Words, 20, leastUsed)
}

function ulTemplate(items, value, element) {
    // const rowTemplate = document.getElementById("template-ul-items")
    // let templateHTML = rowTemplate.innerHTML

    let resultsHTML = ""

    // let templateHTML = `

    //                  <li></li>

    //                  `
    for (let i = 0; i < items.length; i++) {
        // resultsHTML += templateHTML.replace()
        resultsHTML += `
                         <li>${i + 1}: ${items[i]} ${value} time(s) </li>
                    `
        console.log(items.value)
    }
    // console.log(resultsHTML)
    element.innerHTML = resultsHTML
    // console.log(resultsHTML)
}

function sortProperties(obj) {
    //first convert the object to an array
    //rijeci keys
    let keysArray = Object.keys(obj)
    // console.log(obj)
    // kolicina rijeci, vrijednost value
    // let valuesArray = Object.values(obj)
    // console.log(valuesArray)

    //sort the array
    let keysSorted = keysArray.sort(function (a, b) {
        return obj[b] - obj[a]
    })
    //prvi key u arrayu nakon sorta
    // console.log(keysSorted[0])
    //value prvog key u arrayu nakon sorta
    // const keysSortedValueFirst = obj[keysSorted[0]]
    // console.log(keysSortedValueFirst)
    //prvi bez varijable
    // console.log(obj[keysSorted[0]])

    //zadnji key u arrayu nakon sorta
    // console.log(keysSorted[keysSorted.length - 1])
    //value zadnjeg key u array nakon sorta
    // const keysSortedValueLast = obj[keysSorted[keysSorted.length - 1]]
    // console.log(keysSortedValueLast)
    //zadnji bez varijable
    // console.log(obj[keysSorted[keysSorted.length - 1]])
    // console.log(keysSorted)
    return keysSorted
}

// var list = {"you": 100, "me": 75, "foo": 116, "bar": 15};
// keysSorted = Object.keys(list).sort(function(a,b){return list[a]-list[b]})
// console.log(keysSorted);     // bar,me,you,foo
