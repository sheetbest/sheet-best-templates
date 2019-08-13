const SheetBest = {};

SheetBest.input = (element) => {
  var url = element.getAttribute("data-sheet-best");
  // TODO
}

SheetBest.output = (element) => {
  // Extract some data, from the element
  var url = element.getAttribute("data-sheet-best");
  var text = element.innerHTML;
  element.innerHTML = "";

  fetch(url).then(r => r.json()).then(data => {
    var replacement = data.map(object => {
      // Trim all attributes on the object
      Object.keys(object).forEach(k => {
        object[k.trim()] = object[k];
      })

      // Replace the text
      return text.replace(/{{([^{}]*)}}/g, (match, key) => {
        return object[key.trim()];
      })
    });

    // Re-add it to the HTML
    element.innerHTML = replacement.join("");
  });
}

SheetBest.setup = () => {
  // Run all the necessary scripts for all [data-sheet-best]
  var elements = document.querySelectorAll("[data-sheet-best]");
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    if (element.tagName === "FORM") {
      input(element);
    } else {
      output(element);
    }
  }
}

document.addEventListener("DOMContentLoaded", setup);

module.exports = SheetBest;
