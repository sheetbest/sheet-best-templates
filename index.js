const SheetBest = {};

SheetBest.input = () => {
  // TODO
  // const url = element.getAttribute('data-sheet-best');
};

SheetBest.output = (element) => {
  // Extract some data, from the element
  const url = element.getAttribute('data-sheet-best');
  const text = element.innerHTML;
  element.innerHTML = '';

  fetch(url).then((r) => r.json()).then((data) => {
    const replacement = data.map((object) => {
      // Trim all attributes on the object
      Object.keys(object).forEach((k) => {
        object[k.trim()] = object[k];
      });

      // Replace the text
      return text.replace(/{{([^{}]*)}}/g, (match, key) => object[key.trim()]);
    });

    // Re-add it to the HTML
    element.innerHTML = replacement.join('');
  });
};

SheetBest.setup = () => {
  // Run all the necessary scripts for all [data-sheet-best]
  const elements = document.querySelectorAll('[data-sheet-best]');
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (element.tagName === 'FORM') {
      SheetBest.input(element);
    } else {
      SheetBest.output(element);
    }
  }
};

document.addEventListener('DOMContentLoaded', SheetBest.setup);

module.exports = SheetBest;
