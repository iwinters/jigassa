const flipCardButton = document.getElementById("flip-card");
const correctButton = document.getElementById("correct");
const incorrectButton = document.getElementById("incorrect");
const exitToTestSelect = document.getElementById("exit-to-test-select");

let sentence_dict = {};
let key;
let banglaKey;
let showingLang = "BEN"

flipCardButton.addEventListener("click", function () {flipCard()});
correctButton.addEventListener("click", function () {showSentence()})
incorrectButton.addEventListener("click", function () {showSentence()})


async function getSentences () {
    let word;
    for (py_word in wordArray) {
        word = wordArray[py_word];

        await fetch('https://api.wordnik.com/v4/word.json/' + word + '/topExample?useCanonical=false&api_key=bki9gjxwi7jvfelipjri95oh1qagmrssvur86wbivxw7yb2fn')
        .then(response => response.json())
        .then(data => sentence_dict[word] = data.text)
    }
}

function showSentence () {
    showingLang = "BEN"
    let sentenceParagraph = document.getElementById('show-sentence');
    let sentence = getSentence();
    let occurences = sentence.split(key).length - 1;
    for(var i=0; i < occurences; i++){
        sentence = sentence.replace(key, "<span class='keyWord'>" + banglaKey + "</span>")
    }

    sentenceParagraph.innerHTML = sentence


}

function getSentence () {
    let index = getRandomInt(0, (wordArray.length));
    key = wordArray[index];
    banglaKey = banglaWordArray[index];
    return sentence_dict[key]

}

function flipCard () {
    let keyWordSpans = document.getElementsByClassName("keyWord");
    if (showingLang == "ENG") {
        for (keyWordSpan in keyWordSpans) {
            keyWordSpans[keyWordSpan].innerHTML = banglaKey
        }
    }
    if (showingLang == "BEN") {
        for (keyWordSpan in keyWordSpans) {
            keyWordSpans[keyWordSpan].innerHTML = key
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
    await getSentences();
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

