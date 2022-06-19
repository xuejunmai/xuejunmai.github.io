'use strict';

let main = document.getElementById('main');
let textContainer = document.getElementById('text-container');
let resultsContainer = document.getElementById('results');
let wpmText = document.getElementById('wpm');
let accuracyText = document.getElementById('accuracy');
let timeText = document.getElementById('time');

const invalidKeys = 'F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 F11 F12 Escape Tab CapsLock Shift Control Alt Meta ArrowLeft ArrowRight ArrowDown ArrowUp Enter'.split(
    ' ',
);

const text_list = ['this is the re mountain typing test made by caleb xu and timothy mai, this is truly a remarkable creation. Mr shelby is the best teacher ', 
  'JavaScript, often abbreviated JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS. Over 97% of websites use JavaScript on the client side for web page behavior, often incorporating third-party libraries.',
  'HTML (HyperText Markup Language) is the code that is used to structure a web page and its content. For example, content could be structured within a set of paragraphs, a list of bulleted points, or using images and data tables.',
  'CSS is the language we use to style an HTML document. CSS describes how HTML elements should be displayed.',
  'Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible.',
  'Python is a high-level, interpreted, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation.',
  'PHP is a general-purpose scripting language geared toward web development. It was originally created by Danish-Canadian programmer Rasmus Lerdorf in 1994.'];
let text = text_list[Math.floor(Math.random() * 7)];
//let text = text_list[1];
const textArr = text.split('');
const htmlArr = textArr.map((item, index, array) => {
    if (item === ' ') {
        return `<span class="space" id="span${index}">${item}</span>`;
    }
    return `<span class="char" id="span${index}">${item}</span>`;
});
let errors = [];
textContainer.innerHTML = htmlArr.join('');
let firstTime = true;
let currentPos = 0;
let backspaceNeeded = false;
let currentTime = 0;
let repeat;
textContainer.focus();
document.addEventListener('keydown', event => {
    if (event.key === ' ') {
        event.preventDefault();
    }
    if (firstTime) {
        firstTime = false;
        repeat = setInterval(() => currentTime++, 1000);
    }
    if (event.location === 0 && !invalidKeys.includes(event.key)) {
        handleKey(event.key);
    }
});

function handleKey(key) {
    let span = document.getElementById(`span${currentPos}`).style;
    if (!backspaceNeeded) {
        if (key === textArr[currentPos]) {
            span.color = 'green';
            currentPos++;
        } else {
            if (textArr[currentPos] === ' ') {
                span.backgroundColor = 'red';
            } else {
                span.color = 'red';
            }
            backspaceNeeded = true;
            errors.push(textArr[currentPos]);
        }
    } else {
        if (event.key === 'Backspace') {
            if (textArr[currentPos] === ' ') {
                span.backgroundColor = 'transparent';
            } else {
                span.color = 'black';
            }
            backspaceNeeded = false;
        }
    }
    if (currentPos === textArr.length) {
        clearInterval(repeat);
        handleEnd();
    }
}

function handleEnd() {
    let wpm = Math.floor(textArr.length / 5 / (currentTime / 60));
    let accuracy = Math.floor(
        ((textArr.length - errors.length) / textArr.length) * 100,
    );
    let multiples = Math.floor(currentTime / 60);
    let seconds = currentTime - multiples * 60;
    
    let list = document.getElementById("Results");
    
    let li = document.createElement("li");
    li.innerText = `wpm: ${wpm} wpm`;
    list.appendChild(li);
    
    let li1 = document.createElement("li");
    li1.innerText = `accuracy: ${accuracy}%`;
    list.appendChild(li1);

    let li2 = document.createElement("li");
    li2.innerText = `Time: ${multiples} m ${seconds} s`; 
    list.appendChild(li2);     
    
    main.style.display = 'none';
    resultsContainer.style.display = 'block';
    

}
