const flipCardButton = document.getElementById("flip-card");
const correctButton = document.getElementById("correct");
const incorrectButton = document.getElementById("incorrect");
const exitToTestSelect = document.getElementById("exit-to-test-select");

let sentence_dict = {};
let key;
let banglaKey;
let showingLang = "BEN";
let keyWordSpans

flipCardButton.addEventListener("click", function () {flipCard()});
correctButton.addEventListener("click", function () {showSentence()})
incorrectButton.addEventListener("click", function () {showSentence()})


/*async function getSentences () {
    let word;
    for (py_word in wordArray) {
        word = wordArray[py_word];

        await fetch('https://api.wordnik.com/v4/word.json/' + word + '/topExample?useCanonical=false&api_key=bki9gjxwi7jvfelipjri95oh1qagmrssvur86wbivxw7yb2fn')
        .then(response => response.json())
        .then(data => function bol () {if (typeof data.text !== "undefined" ) {sentence_dict[word] = data.text; console.log('yee')} else {console.log("NO")}})
    }
}*/

function showSentence () {
    showingLang = "BEN"
    let sentenceParagraph = document.getElementById('show-sentence');
    let sentenceObj = getSentence();
    let sentence = sentenceObj.sentence;
    let englishWord = sentenceObj.english;
    let banglaWord = sentenceObj.bengali;
    let occurences = sentence.split(englishWord).length - 1;
    for(var i=0; i < 10; i++){
        sentence = sentence.replace(englishWord, "<span class='keyWord'>" + banglaWord + "</span>").replace(englishWord.toLowerCase(), "<span class='keyWord'>" + banglaWord.toLowerCase() + "</span>")
    }
    sentenceParagraph.innerHTML = sentence
}

function getSentence () {
    let index = getRandomInt(0, (sentenceArray.length));
    sentenceObj = sentenceArray[index]
    return sentenceObj

}

function flipCard () {
    keyWordSpans = document.getElementsByClassName("keyWord");
    if (showingLang == "ENG") {
        for (keyWordSpan of keyWordSpans) {
            console.log(keyWordSpan.innerHTML)
            if (keyWordSpan.innerHTML.toLowerCase() == keyWordSpan.innerHTML) {
                keyWordSpan.innerHTML = sentenceObj.bengali.toLowerCase()
            }
            else {
                keyWordSpan.innerHTML = sentenceObj.bengali

            }
        }
    }
    if (showingLang == "BEN") {
        for (keyWordSpan of keyWordSpans) {
            console.log(keyWordSpan.innerHTML)

            if (keyWordSpan.innerHTML.toLowerCase() == keyWordSpan.innerHTML) {
                keyWordSpan.innerHTML = sentenceObj.english.toLowerCase()
            }
            else {
                keyWordSpan.innerHTML = sentenceObj.english
            }
        }
    }
    if (showingLang == "BEN") {
        showingLang = "ENG"
    }
    else {
        showingLang = "BEN"
    }

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

async function runPage () {
    console.log(sentenceArray)
    //await getSentences();
    showSentence();
}

document.onkeydown = checkKey;


function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '38') {
        // up arrow
        correctButton.click()
    }
    else if (e.keyCode == '40') {
        // down arrow
        incorrectButton.click()
    }
    else if (e.keyCode == '37') {
        // left arrow
        exitToTestSelect.click()
    }
    else if (e.keyCode == '39') {
        // right arrow
        flipCardButton.click()
    }
    
    
}

runPage()

