const SheetBest = {};

SheetBest.input = (form) => {
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
  const url = element.getAttribute('data-sheet-best');
  const text = element.innerHTML;
  element.innerHTML = '';

  let data = await fetch(url).then((r) => {
    if (!r.ok) {
      element.dispatchEvent(new CustomEvent('sheetbest-load-failed', { detail: { status: r.status } }));
      return [];
    }

    return r.json();
  });

  if (!Array.isArray(data)) {
    data = [data];
  }

  const replacement = data.map((object) => {
    Object.keys(object).forEach((k) => {
      object[k.trim()] = object[k];
    });

    return text.replace(/{{([^{}]*)}}/g, (_match, key) => object[key.trim()]);
  });

  element.innerHTML = replacement.join('');
};

SheetBest.setup = async () => {
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

  await Promise.all(promises);

  document.dispatchEvent(new Event('sheetbest-load-complete'));
};

document.addEventListener('DOMContentLoaded', SheetBest.setup);

module.exports = SheetBest;
