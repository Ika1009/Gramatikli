const delay = ms => new Promise(res => setTimeout(res, ms));
//import recnik_latinica_alfabeticki_sort from './recnici/recnik_latinica.js';
console.log("starting...");


let textArea = document.getElementsByTagName('div')[0]; // za sad je samo za jedan, bice za sve

//tajmer za 3 sekunde nakon kucanja
var typingTimer;
textArea.addEventListener('keyup', () => {
    clearTimeout(typingTimer);
    if (textArea.innerHTML) {
        typingTimer = setTimeout(ProveriGreske, 500/*3000*/); // kad se zavrsi tajmer zove se ProveriGreske() od textArea
    }
});


function ProveriGreske() {
    let tekst = textArea.textContent;
    ProveriZaTypos(tekst, textArea);
    let reci = tekst.split(' ');
    for (let i = 0; i < reci.length; i++) // for za svaku rec ukucanu
    {
        // da se doda da ne proverava za reci ako su ceste kao a ili i... i da ne proverava za spejsove, vec proverio ProveraZaTypos
        //console.log("Pravilna rec je: " + PravilnaRecIliNe(reci[i]));
    }

    function ProveriZaTypos(text, htmlElement) {
        let openBraces = 0;
        let openSingleQuotes = false;
        let openDoubleQuotes = false;
        for (let i = 0; i < text.length - 2; i++) {
            const char = text[i];
            const nextChar = text[i + 1];
            const nextNextChar = text[i + 2];

            if (char === '.') {
                if (nextChar !== ' ') 
                    DrawLineWithTwoIndexes(htmlElement, i, text.indexOf(' ', i), "Nedostaje razmak posle tačke", ". " + nextChar); // Nema razmak posle tacke
                else if (nextNextChar >= 'a' && nextNextChar <= 'z') 
                    DrawLineWithTwoIndexes(htmlElement, i + 2, text.indexOf(' ', i + 2), "Veliko slovo posle tačke", ". " + nextNextChar.toUpperCase()); // Malo slovo posle tacke
                else if (nextChar === '.' && nextNextChar !== '.') 
                    DrawLineWithTwoIndexes(htmlElement, i, i + 2, "Dve uzastopne tačke", "."); // Samo dve tacke
            } else if (char === ',') {
                if (nextChar !== ' ') 
                    DrawLineWithTwoIndexes(htmlElement, i, text.indexOf(' ', i), "Razmak posle zareza", ", "); // Nema razmak posle zareza
                else if (nextChar === ',') 
                    DrawLineWithTwoIndexes(htmlElement, i, i + 2, "Dva uzastopna zareza", ",,"); // Dva uzastopna zareza
            } else if (char === '\xA0')
                DrawLineWithTwoIndexes(htmlElement, i, i + 2, "Dva uzastopna razmaka", "  "); // Dva uzaredna razmaka
            else if (char === '-' && nextChar !== ' ')
                DrawLineWithTwoIndexes(htmlElement, i, text.indexOf(' ', i), "Nema razmaka nakon crte", "-"); // Nema razmaka nakon crte
            else if (nextChar === '-' && char !== ' ')
                DrawLineWithTwoIndexes(htmlElement, findPrevWhitespace(i), i+1, "Nema razmaka pre crte", " -"); // Nema razmaka pre crte
            else if (char === '{') openBraces++;
            else if (char === '}') {
                if (openBraces === 0)
                    DrawLineWithTwoIndexes(htmlElement, i, i + 1, "Nepotpune vitičasti zagrade", "}"); // Nepotpuni vitičasti zagrade
                else openBraces--;
            } else if (char === '\'') {
                if (openSingleQuotes) {
                    if (nextChar !== ' ' && nextChar !== '\'' && nextChar !== '\n')
                        DrawLineWithTwoIndexes(htmlElement, i, i + 1, "Nepotpuni apostrof", "'"); // Nepotpuni apostrof
                    else openSingleQuotes = false;
                } else openSingleQuotes = true;
            } else if (char === '"') {
                if (openDoubleQuotes) {
                    if (nextChar !== ' ' && nextChar !== '"' && nextChar !== '\n') {
                        DrawLineWithTwoIndexes(htmlElement, i, i + 1, "Nepotpuni navodnici", '"'); // Nedostaje zatvarajući navodnik
                    } else {
                        openDoubleQuotes = false;
                    }
                } else {
                    openDoubleQuotes = true;
                    if (prevChar === ' ' || prevChar === undefined) {
                        DrawLineWithTwoIndexes(htmlElement, i, i + 1, "Ne treba razmak pre otvarajućih navodnika", suggestion); // Ne treba razmak pre otvarajućih navodnika
                    }
                }
            }
        }
        // provera za zadnja dva karaktera posto for ne ide dotle
        let char1 = text[text.length - 1], char2 = text[text.length - 2];
        if (char1 === '\'' && (openSingleQuotes ? openSingleQuotes = false : openSingleQuotes = true));
        else if (char2 === '\'' && (openSingleQuotes ? openSingleQuotes = false : openSingleQuotes = true));
        else if (char1 === '"' && (openDoubleQuotes ? openDoubleQuotes = false : openDoubleQuotes = true));
        else if (char2 === '"' && (openDoubleQuotes ? openDoubleQuotes = false : openDoubleQuotes = true));
        else if (char1 === '{') openBraces++;
        else if (char1 === '}') { if (openBraces === 0) DrawLineWithTwoIndexes(htmlElement, i, i + 1, "Nepotpune vitičasti zagrade", "}"); else openBraces--; }
        else if (char2 === '{') openBraces++;
        else if (char2 === '}') { if (openBraces === 0) DrawLineWithTwoIndexes(htmlElement, i, i + 1, "Nepotpune vitičasti zagrade", ""); else openBraces--; }

        if (openBraces > 0) {
            const lastOpenBraceIndex = text.lastIndexOf('{');
            DrawLineWithTwoIndexes(htmlElement, lastOpenBraceIndex, text.length, "Nepotpune vitičasti zagrade", "}"); // Nepotpune vitičaste zagrade
        }

        if (openSingleQuotes) {
            const lastOpenSingleQuoteIndex = text.lastIndexOf('\'');
            DrawLineWithTwoIndexes(htmlElement, lastOpenSingleQuoteIndex, text.length,  "Nepotpuni apostrof", "'"); // Nepotpuni apostrof
        }

        if (openDoubleQuotes) {
            const lastOpenDoubleQuoteIndex = text.lastIndexOf('"');
            DrawLineWithTwoIndexes(htmlElement, lastOpenDoubleQuoteIndex, text.length, "Nepotpuni navodnici", '"'); // Nepotpuni navodnici
        }

        function findPrevWhitespace(i) {
            while (i >= 0 && text.charAt(i) !== ' ') { i--; }
            return i + 1;
          }
    }
}

// roze boja ispod linije regularna - #f99fa9
// crvena boja na hover - #dc0010
// roze boja na hover pomesana sa opacity da se dobije dobra #f99fa940
const LINE_POSITION = "absolute";
const LINE_HEIGHT = "3.5px";
const LINE_COLOR_PINK = "#f99fa9";
const LINE_COLOR_PINK_HOVER = "#f99fa940";
const LINE_COLOR_RED = "#dc0010";
const LINE_RADIUS = "500px";

const BELA = "#fefeff";
const ZELENA_SLOVA = "#10a783";
const ZELENA_TAMNA = "#018275";
const SIVA_ZA_BIRANJE = "#f0f3fd";
const SIVA_SLOVA = "#0e111b";

function DrawLine(htmlElement, text) {

    // Find the index of the text within the element's textContent
    const index = htmlElement.textContent.indexOf(text);
    if (index === -1) {
        // Text not found, return early
        return;
    }

    // Get the bounding client rect for the text
    const range = document.createRange();
    range.setStart(htmlElement.firstChild, index);
    range.setEnd(htmlElement.firstChild, index + text.length);
    const rect = range.getBoundingClientRect();

    // Create and style the line
    const line = document.createElement("div");
    line.style.position = LINE_POSITION;
    line.style.top = (rect.bottom + window.scrollY) + "px";
    line.style.left = rect.left + "px";
    line.style.width = 0; // animation will raise the width
    line.style.height = LINE_HEIGHT;
    line.style.backgroundColor = LINE_COLOR_PINK;
    line.style.borderRadius = LINE_RADIUS; // add border radius property

    // Append the line to the element
    document.body.appendChild(line);

    // animate the line
    let lineWidth = 0;
    let animateLine = setInterval(function () {
        lineWidth += 1;
        if (lineWidth >= rect.width) {
            clearInterval(animateLine);
        } else {
            line.style.width = lineWidth + "px";
        }
    }, 10);

}

function DrawLineWithTwoIndexes(htmlElement, index1, index2, typoErrorMessage, suggestion) {
    // Get the bounding client rect for the text
    const range = document.createRange();
    range.setStart(htmlElement.firstChild, index1);
    range.setEnd(htmlElement.firstChild, index2);
    const rect = range.getBoundingClientRect();
    console.log(rect);

    // Create and style the line
    const line = document.createElement("div");
    line.style.position = LINE_POSITION;
    line.style.top = (rect.bottom + window.scrollY - rect.height) + "px";
    line.style.left = rect.left + "px";
    line.style.width = "2px"; // animation will raise the width
    line.style.height = (rect.height + 1) + "px"; // animation will raise the height;
    //line.style.backgroundColor = LINE_COLOR;
    line.style.background = `linear-gradient(to bottom, transparent 86%, ${LINE_COLOR_PINK} 14%)`; // set gradient background
    //line.style.borderRadius = LINE_RADIUS; // add border radius property
    // line.style.transition = "background-color 0.3s ease, opacity 0.3s ease"; // ali ne radi add transition for color and opacity 


    // Append the line to the element
    document.body.appendChild(line);

    // animate the line
    let lineWidth = 0;
    let animateLine = setInterval(function () {
        lineWidth += 0.5;
        if (lineWidth >= rect.width) {
            clearInterval(animateLine);
            // Create the popup and add hover event listeners
            const popup = create3ButtonPopup(rect, typoErrorMessage, suggestion);
            let isCursorInsidePopup = false;
            let isCursorOnWord = false;
            let hidePopupTimer = null;

            popup.addEventListener("mouseenter", () => {
                isCursorInsidePopup = true;
                clearTimeout(hidePopupTimer);
            });

            popup.addEventListener("mouseleave", () => {
                isCursorInsidePopup = false;
                if (!isCursorOnWord) {
                    hidePopupTimer = setTimeout(() => {
                        popup.style.display = "none";
                        line.style.background = `linear-gradient(to bottom, transparent 86%, ${LINE_COLOR_PINK} 14%)`; // set gradient background
                        line.style.opacity = 1;
                    }, 500);
                }
            });

            line.addEventListener("mouseenter", async () => {
                isCursorOnWord = true;
                clearTimeout(hidePopupTimer);
                //if(hidePopupTimer !== null && hidePopupTimer !== 0) 
                //await delay(500);
                popup.style.display = "block";
                line.style.background = `linear-gradient(to bottom, ${LINE_COLOR_PINK_HOVER} 86%, ${LINE_COLOR_RED} 14%)`; // set gradient background
                line.style.transition = "background-color 2s ease-in-out, opacity 2s ease-in-out"; // add transition property
                line.style.opacity = 0.8; // set opacity to 0.8 or any other value less than 1
            });

            line.addEventListener("mouseleave", () => {
                isCursorOnWord = false;
                if (!isCursorInsidePopup) {
                    hidePopupTimer = setTimeout(() => {
                        popup.style.display = "none";
                        line.style.background = `linear-gradient(to bottom, transparent 86%, ${LINE_COLOR_PINK} 14%)`; // set gradient background
                        line.style.opacity = 1;
                    }, 500);
                }
            });
        }
        else line.style.width = lineWidth + "px";
    }, 10);

}
function create3ButtonPopup(rect, typoErrorMessage, suggestion) {
    // Create and style the popup
    const popup = document.createElement("div");
    popup.style.position = "absolute";
    popup.style.top = (rect.bottom + window.scrollY + 10) + "px";
    popup.style.left = rect.left + "px";
    popup.style.width = "215px";
    popup.style.height = "120px";
    popup.style.padding = "0px";
    popup.style.backgroundColor = BELA;
    popup.style.borderRadius = "25px";
    popup.style.boxShadow = "0 0 20px rgba(0, 0, 0, 0.5)";
    popup.style.display = "none"; // hide the popup initially

    // Create and style the div
    const button1 = document.createElement("div");
    button1.style.backgroundColor = BELA;
    button1.style.borderRadius = "5px";
    button1.style.width = "100%";
    button1.style.height = "40%"; // set div height to 30%
    button1.style.display = "flex";
    button1.style.flexDirection = "column";
    button1.style.justifyContent = "center";

    // Create top text element
    const topText = document.createElement("div");
    topText.style.color = SIVA_SLOVA;
    topText.textContent = typoErrorMessage;
    topText.style.textAlign = "left";
    //topText.style.padding = "25px 10px";
    button1.appendChild(topText);

    // Create bottom text element
    const bottomText = document.createElement("div");
    bottomText.textContent = suggestion;
    bottomText.style.color = ZELENA_SLOVA;
    bottomText.style.textAlign = "left";
    bottomText.style.fontWeight = "bold";
    button1.appendChild(bottomText);

    // Make the div act like a button
    button1.style.cursor = "pointer";
    button1.onclick = function () {
        // Your button click functionality here
    };

    const button2 = document.createElement("button");
    button2.textContent = "Button 2";
    button2.style.backgroundColor = BELA;
    button2.style.color = SIVA_SLOVA;
    button2.style.padding = "5px 10px";
    button2.style.borderRadius = "5px";
    button2.style.width = "100%";
    button2.style.height = "30%"; // set button 2 height to 23.33%

    const button3 = document.createElement("button");
    button3.textContent = "Button 3";
    button3.style.backgroundColor = BELA;
    button3.style.color = SIVA_SLOVA;
    button3.style.padding = "5px 10px";
    button3.style.borderRadius = "5px";
    button3.style.width = "100%";
    button3.style.height = "30%"; // set button 2 height to 23.33%


    // Remove the button outlines
    button1.style.border = "none";
    button2.style.border = "none";
    button3.style.border = "none";

    // Append the buttons to the popup
    popup.appendChild(button1);
    popup.appendChild(button2);
    popup.appendChild(button3);

    // Append the popup to the body
    document.body.appendChild(popup);

    // Add hover effect to buttons
    button1.addEventListener("mouseover", () => {
        button1.style.backgroundColor = ZELENA_SLOVA;
        button1.style.color = BELA;
        topText.style.color = BELA;
        bottomText.style.color = BELA;
    });
    button1.addEventListener("mouseout", () => { 
        button1.style.backgroundColor = BELA;
        topText.style.color = SIVA_SLOVA;
        bottomText.style.color = ZELENA_SLOVA;
    });

    const buttons = popup.querySelectorAll("button");
    buttons.forEach((button, index) => {
        button.addEventListener("mouseover", () => {
            button.style.backgroundColor = SIVA_ZA_BIRANJE;
            button.style.cursor = "pointer";
        });
        button.addEventListener("mouseout", () => { button.style.backgroundColor = BELA; });
    });

    return popup;
}

function create4ButtonPopup(rect, popupText) {
    // Create and style the popup
    const popup = document.createElement("div");
    popup.style.position = "absolute";
    popup.style.top = (rect.bottom + window.scrollY + 10) + "px";
    popup.style.left = rect.left + "px";
    popup.style.width = "215px";
    popup.style.height = "155px";
    popup.style.padding = "0px";
    popup.style.backgroundColor = BELA;
    popup.style.borderRadius = "15px";
    popup.style.boxShadow = "0 0 20px rgba(0, 0, 0, 0.5)";
    popup.style.display = "none"; // hide the popup initially

    // Create and style the buttons
    const button1 = document.createElement("button");
    button1.textContent = popupText;
    button1.style.backgroundColor = BELA;
    button1.style.color = ZELENA_SLOVA;
    button1.style.padding = "5px 10px";
    button1.style.borderRadius = "5px";
    button1.style.width = "100%";
    button1.style.fontWeight = "bold";
    button1.style.height = "30%"; // set button 1 height to 30%

    const button2 = document.createElement("button");
    button2.textContent = "Button 2";
    button2.style.backgroundColor = BELA;
    button2.style.color = SIVA_SLOVA;
    button2.style.padding = "5px 10px";
    button2.style.borderRadius = "5px";
    button2.style.width = "100%";
    button2.style.height = "23.33%"; // set button 2 height to 23.33%

    const button3 = document.createElement("button");
    button3.textContent = "Button 3";
    button3.style.backgroundColor = BELA;
    button3.style.color = SIVA_SLOVA;
    button3.style.padding = "5px 10px";
    button3.style.borderRadius = "5px";
    button3.style.width = "100%";
    button3.style.height = "23.33%"; // set button 2 height to 23.33%

    const button4 = document.createElement("button");
    button4.textContent = "Button 4";
    button4.style.backgroundColor = BELA;
    button4.style.color = SIVA_SLOVA;
    button4.style.padding = "5px 10px";
    button4.style.borderRadius = "5px";
    button4.style.width = "100%";
    button4.style.height = "23.33%"; // set button 2 height to 23.33%

    // Remove the button outlines
    button1.style.border = "none";
    button2.style.border = "none";
    button3.style.border = "none";
    button4.style.border = "none";

    // Append the buttons to the popup
    popup.appendChild(button1);
    popup.appendChild(button2);
    popup.appendChild(button3);
    popup.appendChild(button4);

    // Append the popup to the body
    document.body.appendChild(popup);

    // Add hover effect to buttons
    const buttons = popup.querySelectorAll("button");
    buttons.forEach((button, index) => {
        button.addEventListener("mouseover", () => {
            button.style.backgroundColor = index === 0 ? ZELENA_SLOVA : SIVA_ZA_BIRANJE;
            if (index === 0) button.style.color = BELA;
            button.style.cursor = "pointer";
        });
        button.addEventListener("mouseout", () => {
            button.style.backgroundColor = BELA;
            if (index === 0) button.style.color = ZELENA_SLOVA;
        });
    });

    return popup;
}

// Function to check the spelling of a word and return the correction
function spellCheck(word) {
    // Levenshtein distance algorithm to find closest match
    function levenshteinDistance(a, b) {
        if (a.length === 0) return b.length;
        if (b.length === 0) return a.length;
        var matrix = [];
        for (var i = 0; i <= b.length; i++)
            matrix[i] = [i];
        for (var j = 0; j <= a.length; j++)
            matrix[0][j] = j;
        for (var i = 1; i <= b.length; i++)
            for (var j = 1; j <= a.length; j++)
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + (b.charAt(i - 1) === a.charAt(j - 1) ? 0 : 1),
                    Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
        return matrix[b.length][a.length];
    }
    // Check for transposed characters
    function checkTransposed(a, b) {
        let transposed = false;
        if (a.length === b.length) {
            for (let i = 0; i < a.length - 1; i++) {
                if (a[i] === b[i + 1] && a[i + 1] === b[i]) {
                    transposed = true;
                    break;
                }
            }
        }
        return transposed;
    }

    // Find the closest matches in the dictionary
    let closestMatches = []
    let minDistance = Number.MAX_VALUE;
    for (let i = 0; i < dictionary.length; i++) {
        let distance = levenshteinDistance(word.split('').reverse().join(''), dictionary[i].split('').reverse().join(''));
        if (checkTransposed(word.split('').reverse().join(''), dictionary[i].split('').reverse().join(''))) {
            distance--;
        }
        if (distance <= minDistance) {
            if (distance < minDistance) closestMatches = []
            closestMatches.push(dictionary[i])
            minDistance = distance;
        }
    }

    if (minDistance === 0) {
        return `${word} is spelled correctly`;
    } else {
        return `Did you mean ${closestMatches.join(", ")}?`;
    }
}

// Test the spell checker
/*console.log(spellCheck('pogresno'));
console.log(spellCheck('ispravno'));
console.log(spellCheck('tatr'));
console.log(spellCheck('totrura'));
console.log(spellCheck('mil'));
console.log(spellCheck('najmilja'));
console.log(spellCheck(''));
console.log(spellCheck(''));
console.log(spellCheck(''));
console.log(spellCheck(''));
console.log(spellCheck(''));*/
