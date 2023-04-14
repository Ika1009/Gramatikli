
/*  // DrawLine function takes an HTML element and a string as parameters, checks for text nodes of an htmlelement
function DrawLine(htmlElement, tekst) {

    /**
     * Finds the coordinates of the first occurrence of a given text within a HTML element.
     * @param {HTMLElement} htmlElement - The HTML element to search for the text within.
     * @param {string} text - The text to search for.
     * @return {object|null} - An object containing the coordinates of the text or null if the text is not found.
     *//*
    function findTextCoordinates(htmlElement, text) {
      // Collect all text nodes within the given HTML element
      let textNodes = [];
      for (let i = 0; i < htmlElement.childNodes.length; i++) {
        let node = htmlElement.childNodes[i];
        if (node.nodeType === Node.TEXT_NODE) {
          textNodes.push(node);
        }
      }
  
      // Iterate through all text nodes to find the coordinates of the first occurrence of the given text
      for (let i = 0; i < textNodes.length; i++) {
        let node = textNodes[i];
        let nodeText = node.textContent;
        let index = nodeText.indexOf(text);
        if (index !== -1) {
          let range = document.createRange();
          range.setStart(node, index);
          range.setEnd(node, index + text.length);
          let rects = range.getClientRects();
          if (rects.length > 0) {
            // Return an object containing the coordinates of the first occurrence of the given text
            return {
              top: rects[0].top,
              left: rects[0].left,
              width: rects[0].width,
              height: rects[0].height
            };
          }
        }
      }
      // Return null if the given text is not found
      return null;
    }
  
    // drawLineUnderText function takes a coordinates object as a parameter
    function drawLineUnderText(coordinates) {
      // create a div element for the line
      let line = document.createElement("div");
      // set line styles
      line.style.position = "absolute";
      line.style.top = (coordinates.top + window.scrollY + coordinates.height) + "px";
      line.style.left = coordinates.left + "px";
      line.style.width = "0";
      line.style.height = "3px";
      line.style.backgroundColor = "#D0312D";
      // append the line to the htmlElement parameter
      htmlElement.appendChild(line);
      
      // animate the line
      let lineWidth = 0;
      let animateLine = setInterval(function() {
        lineWidth += 1;
        if (lineWidth >= coordinates.width) {
          clearInterval(animateLine);
        } else {
          line.style.width = lineWidth + "px";
        }
      }, 10);
    }
  
    // get the text coordinates
    let coordinates = findTextCoordinates(htmlElement, tekst);
    // draw the line under the text
    drawLineUnderText(coordinates);
  }*/