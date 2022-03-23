const pageList = ["card-test","test-select", "word-list-page"];
const acceptWordList = document.getElementById("accept-wordlist");
const acceptENGToBEN = document.getElementById("ENGtoBEN");
const acceptBENToENG = document.getElementById("BENtoENG");
const flipCardButton = document.getElementById("flip-card");
const cardFront = document.getElementById("card-front");
const cardBack = document.getElementById("card-back");
const infoCard = document.getElementById("info-card");

const wlCardFront = document.getElementById("wl-card-front");
const wlInfoCard = document.getElementById("wl-info-card");
const wlInfoButton = document.getElementById('wl-info-button');


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

wlInfoButton.addEventListener("click", function () {flipWLInfoCard()});

function addWordList () {
    for (i = 0; i < wordArray.length; i++) {
        wordTRs += '<tr class="list-row"> <td>' + wordArray[i].english + '</td> <td>' + wordArray[i].bengali + '</td> <td class="emoji-td">&#128078</td> </tr>'
    }
    wordList.innerHTML = wordTRs
}



//acceptWordList.addEventListener("click", function () {changePage('test-select')});
//acceptENGToBEN.addEventListener("click", function () {showingLang = "ENG"; randomWordCard(); changePage('card-test')});
//acceptBENToENG.addEventListener("click", function () {showingLang = "BEN"; randomWordCard(); changePage('card-test')});


function flipWLInfoCard () {
    console.log("moo")
    if (wlInfoCard.classList.contains("hidden")) {
        wlCardFront.classList.add("hidden");
        wlInfoCard.classList.remove("hidden");
        
    }
    else {
        wlInfoCard.classList.add("hidden");
        wlCardFront.classList.remove("hidden");

        
    }

}




function checkKey(e) {
    e = e || window.event;
    console.log("1")
    if (e.keyCode == '37') {
        // left arrow
        console.log("2")
        wlInfoButton.click()
    }
    else if (e.keyCode == '39') {
        // right arrow
        acceptWordList.click()
     }

  
}

document.onkeydown = checkKey;

addWordList()