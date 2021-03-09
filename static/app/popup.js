const pageList = ["card-test","test-select", "word-list-page"];
const acceptWordList = document.getElementById("accept-wordlist");
const acceptENGToBEN = document.getElementById("ENGtoBEN");
const acceptBENToENG = document.getElementById("BENtoENG");
const exitToTestSelect = document.getElementById("exit-to-test-select");
const flipCardButton = document.getElementById("flip-card");
const cardFront = document.getElementById("card-front");
const cardBack = document.getElementById("card-back");
const cardTest = document.getElementById("card-test");
const correctButton = document.getElementById("correct");
const incorrectButton = document.getElementById("incorrect");
const testSelect = document.getElementById("test-select");
const wordListPage = document.getElementById("word-list-page");
const exitToHome = document.getElementById("exit-to-home");
const wordList = document.getElementById("word-list");
var wordTRs = "";
var cardFrontText = document.getElementById("card-front-text");
var cardBackText = document.getElementById("card-back-text");
let index;
var currentIndex;


//acceptWordList.addEventListener("click", function () {changePage('test-select')});
//acceptENGToBEN.addEventListener("click", function () {showingLang = "ENG"; randomWordCard(); changePage('card-test')});
//acceptBENToENG.addEventListener("click", function () {showingLang = "BEN"; randomWordCard(); changePage('card-test')});

flipCardButton.addEventListener("click", function () {flipCard()});
correctButton.addEventListener("click", function () {correctAnswer()})
incorrectButton.addEventListener("click", function () {incorrectAnswer()})

function flipCard () {
    if (cardFront.classList.contains("hidden")) {
        cardFront.classList.remove("hidden");
        cardBack.classList.add("hidden");
    }
    else {
        cardBack.classList.remove("hidden");
        cardFront.classList.add("hidden");
    }
}

function changePage(pageById) {
    for (i = 0; i < pageList.length; i++) {
        document.getElementById(pageList[i]).classList.add("hidden")
    }

    document.getElementById(pageById).classList.remove("hidden")


}

function correctAnswer () {
    updateForm(true)
    randomWordCard()
}

function incorrectAnswer () {
    updateForm(false)
    randomWordCard()
}

function updateForm(isCorrect) {
    var confidenceInputId = "id_form-" + currentIndex + "-confidence";
    var confidenceInput = document.getElementById(confidenceInputId);
    var nextReviewInputId = "id_form-" + currentIndex + "-next_review"
    var nextReviewInput = document.getElementById(nextReviewInputId)
    var focusInputId = "id_form-" + currentIndex + "-focus"
    var focusInput = document.getElementById(focusInputId)
    var date = new Date();
    date.setDate(date.getDate());

    if (isCorrect) {
        if (Date.parse(focusInput.value) >= date) {
            confidence = parseInt(confidenceInput.value) + 1;
            confidence = Math.min(confidence, 7);
            confidenceInput.value = confidence;

            var resultDate = new Date();
            resultDate.setDate(resultDate.getDate());
            resultDate = resultDate.toLocaleDateString();
            nextReviewInput.value = resultDate
        }
        else {
            confidence = parseInt(confidenceInput.value) + 1;
            confidence = Math.min(confidence, 30);
            confidenceInput.value = confidence;
            console.log("+");

            var resultDate = new Date();
            resultDate.setDate(resultDate.getDate() + confidence);
            resultDate = resultDate.toLocaleDateString();
            nextReviewInput.value = resultDate
        }
    }
    else {
        confidence = parseInt(confidenceInput.value) - 1;
        confidence = Math.max(confidence, 0);
        confidenceInput.value = confidence;

        var resultDate = new Date();
        resultDate.setDate(resultDate.getDate() + confidence);
        resultDate = resultDate.toLocaleDateString();
        nextReviewInput.value = resultDate
    }

    
}

function addWordList () {
    for (i = 0; i < wordArray.length; i++) {
        wordTRs += '<tr class="list-row"> <td>' + wordArray[i].english + '</td> <td>' + wordArray[i].bengali + '</td> <td class="emoji-td">&#128078</td> </tr>'
    }
    wordList.innerHTML = wordTRs
}

document.onkeydown = checkKey;

function randomWordCard () {
    if (showingLang == "bengali" && cardFront.classList.contains("hidden") || showingLang == "english" && cardBack.classList.contains("hidden")) {
        flipCard()
    }
    hideWord()
    revealWord()

}


function hideWord() {
    wordClass = "show-word"
    words = document.getElementsByClassName(wordClass);
    [].forEach.call(words, function(el) {
        el.classList.add("hidden");
      });
}

function revealWord() {
    console.log("oy")
    randomInt = getRandomInt(0, (wordArray.length))
    var randomWord = wordArray[randomInt]
    wordClass = "show-" + randomWord;
    words = document.getElementsByClassName(wordClass);
    [].forEach.call(words, function(el) {
        el.classList.remove("hidden");
      });
    var currentWord = randomWord
    currentIndex = randomInt
    console.log(currentIndex)
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }


function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

function checkKey(e) {
    e = e || window.event;
    if (! cardTest.classList.contains("hidden")) {
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
    else if (! testSelect.classList.contains("hidden")) {
        if (e.keyCode == '38') {
            // up arrow
            acceptENGToBEN.click()
        }
        else if (e.keyCode == '40') {
            // down arrow
            acceptBENToENG.click()
        }
        else if (e.keyCode == '37') {
           // left arrow
            acceptBENToENG.click()
        }
        else if (e.keyCode == '39') {
           // right arrow
            acceptENGToBEN.click()
        }

    }
    else if (! wordListPage.classList.contains("hidden")) {
        if (e.keyCode == '38') {
            // up arrow
            acceptWordList.click()
        }
        else if (e.keyCode == '40') {
            // down arrow
            exitToHome.click()
        }
        else if (e.keyCode == '37') {
           // left arrow
            exitToHome.click()
        }
        else if (e.keyCode == '39') {
           // right arrow
            acceptWordList.click()
        }

    }
}
randomWordCard();
addWordList();
