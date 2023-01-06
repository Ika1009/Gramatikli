
//import recnik_latinica_alfabeticki_sort from './recnik_latinica.js';

var typingTimer;                //timer identifier
var doneTypingInterval = 3000;  //time in ms (5 seconds)
let textArea = document.getElementsByTagName('div')[0]; // za sad je samo za jedan, bice za sve


//funkcija da se upali funkcija ProveriGreske kad se zavrsi tajmer od 3 sekunde
textArea.addEventListener('keyup', () => {
    clearTimeout(typingTimer);
    if (textArea.innerHTML) {
        typingTimer = setTimeout(ProveriGreske, doneTypingInterval);
    }
});

function ProveriGreske() // kad se zavrsi kucanje proverava text input boxa
{
    let tekst = textArea.innerText;
    ProveriZaTypos(tekst);
    let reci = tekst.split(' ');
    for(let i = 0; i < reci.length; i++) // for za svaku rec ukucanu
    {
        // da se doda da ne proverava za reci ako su ceste kao a ili i... i da ne proverava za spejsove, vec proverio ProveraZaTypos
        //console.log("Pravilna rec je: " + PravilnaRecIliNe(reci[i]));
    }
}

function ProveriZaTypos(tekst)
{
    console.log(tekst);

    for(let i = 0; i < tekst.length - 3; i++) // za svaki karakter u tekstu
    {
        if(tekst[i] == '.' && tekst[i+1] != ' '){ // treba razmak posle tacke
            PodvuciCrveno(i, i+1); 
            
            if(tekst[i+1].charCodeAt(0)>=97 && tekst[i+1].charCodeAt(0) <= 122) { PodvuciCrveno(i, i+1); } // treba veliko slovo
            
            else if(tekst[i+1] == '.' && tekst[i+2] != '.') { PodvuciCrveno(i, i+1); } // samo dve tacke, predlozi samo jednu
        }
        else if(tekst[i] == ',' && tekst[i+1] != ' '){ // treba razmak posle zareza
            PodvuciCrveno(i, i+1); 
            
            if(tekst[i+1] == ',') { PodvuciCrveno(i, i+1); } // dva zareza, predlozi samo jedan
        }
        else if(tekst[i].charCodeAt(0) == 160) { PodvuciCrveno(i, i + 1); } // dva uzastopna spejsa
    }


    function PodvuciCrveno(index1, index2) 
    {
        console.log('Podvuci');
        // ubacuje span sa klasom da bi ga podvuklo crvenom
        textArea.innerHTML = textArea.innerText.slice(0, index1) + '<span class=underline-crven>' + textArea.innerText.slice(index1, index2 + 1) +  '</span>' + textArea.innerText.slice(index2 + 1, textArea.innerText.length);
    }
}

function PravilnaRecIliNe(rec)
{
  let index = BinarnaPretragaPoRecniku(rec);
  let nadjenaRecURecniku = recnik_latinica_alfabeticki_sort[index];

  console.log("Nadnjena rec je: " + nadjenaRecURecniku + "; a trazena rec je : " + rec);
  if(rec == nadjenaRecURecniku) { return }
  
  // ako rec nije pravilna
  let editMin = 100, najboljiMatch;
  for(let i = index, j = index; i < recnik_latinica_alfabeticki_sort.length || j >= 0; i++, j--)// mora da ga napravim da ide ka gore i ka dole od indexa početne reči
  {
    if(i < recnik_latinica_alfabeticki_sort.length)
    {
        edit = EditDistDP(rec, recnik_latinica_alfabeticki_sort[i]);
        if(edit == 1){ return recnik_latinica_alfabeticki_sort[i]}
        else if( edit < editMin) { editMin = edit; najboljiMatch = recnik_latinica_alfabeticki_sort[i] }
    }
    if(j>=0)
    {
        edit = EditDistDP(rec, recnik_latinica_alfabeticki_sort[j]);
        if(edit == 1){ return recnik_latinica_alfabeticki_sort[j]}
        else if( edit < editMin) { editMin = edit; najboljiMatch = recnik_latinica_alfabeticki_sort[j] }
    }

  }
  return najboljiMatch;

}

// vraca index reci ili najblize
function BinarnaPretragaPoRecniku(rec){
    var startIndex  = 0,
        stopIndex   = recnik_latinica_alfabeticki_sort.length - 1,
        middle      = Math.floor((stopIndex + startIndex)/2);

    while(recnik_latinica_alfabeticki_sort[middle] != rec && startIndex < stopIndex){

        if (rec < recnik_latinica_alfabeticki_sort[middle]){
            stopIndex = middle - 1;
        } else if (rec > recnik_latinica_alfabeticki_sort[middle]){
            startIndex = middle + 1;
        }
        middle = Math.floor((stopIndex + startIndex)/2);
    }
    return middle;
}


// A Space efficient Dynamic Programming
// based Javascript program to find minimum
// number operations to convert str1 to str2
function EditDistDP(str1, str2) // mora da ga napravimo da gleda od nazad
{
    let len1 = str1.length;
    let len2 = str2.length;
  
    // Create a DP array to memoize result
    // of previous computations
    let DP = new Array(2);
    for(let i = 0; i < 2; i++)
    {
        DP[i] = new Array(len1+1);
        for(let j = 0; j < len1 + 1; j++)
            DP[i][j] = 0;
    }
  
  
    // Base condition when second String
    // is empty then we remove all characters
    for (let i = 0; i <= len1; i++)
        DP[0][i] = i;
  
    // Start filling the DP
    // This loop run for every
    // character in second String
    for (let i = 1; i <= len2; i++)
    {
        
        // This loop compares the char from
        // second String with first String
        // characters
        for (let j = 0; j <= len1; j++)
        {
            
            // if first String is empty then
            // we have to perform add character
            // operation to get second String
            if (j == 0)
                DP[i % 2][j] = i;
  
            // if character from both String
            // is same then we do not perform any
            // operation . here i % 2 is for bound
            // the row number.
            else if (str1[j-1] == str2[i-1]) {
                DP[i % 2][j] = DP[(i - 1) % 2][j - 1];
            }
  
            // if character from both String is
            // not same then we take the minimum
            // from three specified operation
            else {
                DP[i % 2][j] = 1 + Math.min(DP[(i - 1) % 2][j],
                                       Math.min(DP[i % 2][j - 1],
                                           DP[(i - 1) % 2][j - 1]));
            }
        }
    }
  
    // after complete fill the DP array
    // if the len2 is even then we end
    // up in the 0th row else we end up
    // in the 1th row so we take len2 % 2
    // to get row
    return DP[len2 % 2][len1];
}

