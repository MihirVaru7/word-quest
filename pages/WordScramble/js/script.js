const wordText= document.querySelector(".word");
hintText= document.querySelector(".hint span");
timeText= document.querySelector(".time b");
inputField= document.querySelector("input");
refreshBtn= document.querySelector(".refresh-word");
checkBtn= document.querySelector(".check-word");
const hintDisplay = document.querySelector(".hint-display");
const hintBtn = document.querySelector(".hint-btn"); // Select hint button
let hintUsed = false; 

let correctWord,timer;

const initTimer = maxTime=> {
    clearInterval(timer);
    timer=setInterval(()=>{
       
        if(maxTime>0){
            maxTime--;
            return timeText.innerText= maxTime;
        }
        clearInterval(timer);
        alert(`time off! ${correctWord.toUpperCase()} was the correct word`);
        initGame();
    },1000);
}

const initGame=()=>{
    initTimer(30);
    let randomObj= words[Math.floor(Math.random()*words.length)];
    let wordArray= randomObj.word.split("");
    for(let i= wordArray.length-1; i>0; i--){
        let j= Math.floor(Math.random()*(i+1));
        [wordArray[i], wordArray[j]]= [wordArray[j], wordArray[i]];
    }
    wordText.innerText= wordArray.join("");
    hintText.innerText= randomObj.hint;
    correctWord= randomObj.word.toLowerCase();
    inputField.value="";
    inputField.setAttribute("mexlength", correctWord.length);
    hintUsed = false; 
    hintDisplay.innerText = "";
}
initGame();

const checkWord=()=>{
    let userWord= inputField.value.toLocaleLowerCase();
    if(!userWord) return alert("Please enter a word");
    if(userWord !== correctWord) return alert(`Oops! ${userWord} is not the correct word`);
    alert(`Congratulation! ${userWord.toUpperCase()} is the correct word`);
    initGame();
}

const giveHint = () => {
    if (hintUsed) return; 

    let hintArray = wordText.innerText.split(""); 

   
    hintArray = correctWord.split("").map((letter, index) => {
        if (index < 2 || index >= correctWord.length - 2) return letter; 
        return "_";  
    });

    hintDisplay.innerText = `Hint: ${hintArray.join("")}`;
    hintUsed = true;  
};

hintBtn.addEventListener("click", giveHint);
refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click",checkWord);

inputField.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkBtn.click();
    }
});

