const SheetBest = {};

SheetBest.input = (form) => {
  // XXX: Not yet tested
  const url = form.getAttribute('data-sheet-best');

  const setEnabled = (enabled) => {
    const elements = form.querySelectorAll('[type=submit]');
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (enabled) {
        element.removeAttribute('disabled');
      } else {
        element.setAttribute('disabled', 'disabled');
      }
    }
  };


  form.addEventListener('submit', async (e) => {
    setEnabled(false);

    e.preventDefault();
    const formData = new FormData(form);
    const entries = Array.from(formData);
    const data = {};
    entries.forEach(([k, v]) => {
      data[k] = v;
    });

    form.querySelectorAll('[type=submit]');

    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([data]),
    }).then((r) => r.json());

    form.dispatchEvent(new Event('submit-finished', {
      response,
    }));

    setEnabled(true);
  });
};

SheetBest.output = async (element) => {
  // Extract some data, from the element
  const url = element.getAttribute('data-sheet-best');
  const text = element.innerHTML;
  element.innerHTML = '';

  let data = await fetch(url).then((r) => r.json());

  if (!Array.isArray(data)) {
    data = [data];
  }

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
};

SheetBest.setup = async () => {
  // Run all the necessary scripts for all [data-sheet-best]
  const elements = document.querySelectorAll('[data-sheet-best]');
  const promises = [];
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (element.tagName === 'FORM') {
      SheetBest.input(element);
    } else {
      promises.push(SheetBest.output(element));
    }
  }

  return Promise.all(promises);
};

document.addEventListener('DOMContentLoaded', SheetBest.setup);

module.exports = SheetBest;
