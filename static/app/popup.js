const pageList = ["card-test","test-select", "word-list-page"];
const acceptWordList = document.getElementById("accept-wordlist");
const acceptENGToBEN = document.getElementById("ENGtoBEN");
const acceptBENToENG = document.getElementById("BENtoENG");
const flipCardButton = document.getElementById("flip-card");
const cardFront = document.getElementById("card-front");
const cardBack = document.getElementById("card-back");
const infoCard = document.getElementById("info-card");

const cardTest = document.getElementById("card-test");
const correctButton = document.getElementById("correct");
const incorrectButton = document.getElementById("incorrect");
const infoButton = document.getElementById('info-button')
const testSelect = document.getElementById("test-select");
const wordListPage = document.getElementById("word-list-page");
const exitToHome = document.getElementById("exit-to-home");
const wordList = document.getElementById("word-list");
const submitButton = document.getElementById("submit-button")
const maxFocusConfidence = 7
var wordTRs = "";
var cardFrontText = document.getElementById("card-front-text");
var cardBackText = document.getElementById("card-back-text");
let index;
var currentIndex;
var today = new Date().toISOString().substr(0,10);
var xModal = document.getElementById('x-modal');
var closeModalButton = document.getElementById('close-modal');


var wordFocusIdArray = [];
var acceptEarlyWeekEndButton = document.getElementById('accept-early-week-end-button');
console.log(acceptEarlyWeekEndButton)

acceptEarlyWeekEndButton.addEventListener('click', function () {acceptEarlyWeekEnd()});



//acceptWordList.addEventListener("click", function () {changePage('test-select')});
//acceptENGToBEN.addEventListener("click", function () {showingLang = "ENG"; randomWordCard(); changePage('card-test')});
//acceptBENToENG.addEventListener("click", function () {showingLang = "BEN"; randomWordCard(); changePage('card-test')});

flipCardButton.addEventListener("click", function () {flipCard()});
correctButton.addEventListener("click", function () {correctAnswer()})
incorrectButton.addEventListener("click", function () {incorrectAnswer()})
infoButton.addEventListener("click", function () {flipInfoCard()})

function flipCard () {
    infoCard.classList.add("hidden")
    if (cardFront.classList.contains("hidden")) {
        cardFront.classList.remove("hidden");
        cardBack.classList.add("hidden");
    }
    else {
        cardBack.classList.remove("hidden");
        cardFront.classList.add("hidden");
    }
}

function flipInfoCard () {
    if (infoCard.classList.contains("hidden")) {
        cardBack.classList.add("hidden");
        cardFront.classList.add("hidden");
        infoCard.classList.remove("hidden");
        
    }
    else {
        infoCard.classList.add("hidden");
        cardBack.classList.remove("hidden");

        
    }

}


<<<<<<< HEAD

=======
>>>>>>> origin/main
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
            confidence = Math.min(confidence, maxFocusConfidence);
            confidenceInput.value = confidence;

            var resultDate = new Date();
            resultDate.setDate(resultDate.getDate());
            resultDate = resultDate.toISOString().substr(0,10);
            nextReviewInput.value = resultDate
        }
        else {
            confidence = parseInt(confidenceInput.value) + 1;
            confidence = Math.min(confidence, 30);
            confidenceInput.value = confidence;
            console.log("+");

            var resultDate = new Date();
            resultDate.setDate(resultDate.getDate() + confidence);
            resultDate = resultDate.toISOString().substr(0,10);
            nextReviewInput.value = resultDate
        }
    }
    else {
        confidence = parseInt(confidenceInput.value) - 1;
        confidence = Math.max(confidence, 0);
        confidenceInput.value = confidence;

        var resultDate = new Date();
        resultDate.setDate(resultDate.getDate() + confidence);
        resultDate = resultDate.toISOString().substr(0,10);
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
    randomInt = getRandomInt(0, (wordArray.length))
    var randomWord = wordArray[randomInt]
    wordClass = "show-" + randomWord;
    words = document.getElementsByClassName(wordClass);
    [].forEach.call(words, function(el) {
        el.classList.remove("hidden");
      });
    currentIndex = randomInt
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }


function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

// Allow shortcut if confidence is 7 on all words
function focusConfidenceIsMaxed () {
    var allTrue = true

    for (i=0; i < wordArray.length; i++) {
        console.log(i)
        console.log(wordArray.length)
        var wordFocusId = "id_form-" + i + "-focus";
        var wordFocusValue = document.getElementById(wordFocusId).value;
        var wordConfidenceId = "id_form-" + i + "-confidence";
        
        var wordConfidenceValue = document.getElementById(wordConfidenceId).value;
        
        if (wordFocusValue > today) {
            console.log("is focus")
            if (wordConfidenceValue  == maxFocusConfidence) {
                console.log("is confident")
                wordFocusIdArray.push(wordFocusId)
            }
            else {
                console.log("rats");
                allTrue = false
            }
        }
        else {
            console.log(wordFocusId);
            console.log(wordFocusValue);
            console.log(today)
            console.log("its me")

        }
    }
    console.log("why")
    if (allTrue) {
        
        
        console.log(allTrue)
        if (hasWeekWords === "yes") {
            console.log(hasWeekWords)
            console.log("goldenlogs")
            console.log("oh snap")
            document.getElementById('early-week-end-offer-modal').classList.remove("hidden")
        }
        else {
            console.log(hasWeekWords)
            console.log("oh crap")
        }

    }
    else {
        console.log(allTrue)
        console.log("wha")
    }


}

function acceptEarlyWeekEnd () {
    for (id in wordFocusIdArray) {
        console.log(id);
        var currentFocusValue = document.getElementById(wordFocusIdArray[id]).value;
        console.log(currentFocusValue);
        console.log(today);
        todayDate = new Date(today);
        currentFocusDate = new Date(currentFocusValue)
        if (currentFocusDate >= todayDate) {
            var yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 3);
            console.log(yesterday)
            console.log("cup")
            yesterday = yesterday.toISOString().substr(0,10);
            
            document.getElementById(wordFocusIdArray[id]).value = yesterday
        }

    }
    submitButton.click()
}

function closeModal () {
    document.getElementById('early-week-end-offer-modal').classList.add("hidden")

}

function setCloseOptions () {
    xModal.addEventListener('click', function () {closeModal()});
    closeModalButton.addEventListener('click', function () {closeModal()})
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
            infoButton.click()
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
focusConfidenceIsMaxed()
setCloseOptions ()

addWordList();


