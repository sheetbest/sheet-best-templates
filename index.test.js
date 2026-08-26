const SheetBest = require('./index');

test('Reading a SpreadSheet and turning a template into formatted HTML', async () => {
  global.fetch = jest.fn(async () => ({
    ok: true,
    json: async () => [
      {
        code: 'COST', price: 268.15, high: 275.36, low: 268,
      },
      {
        code: 'AAPL', price: 202.74, high: 206.44, low: 202.59,
      },
      {
        code: 'ADBE', price: 283.66, high: 289.65, low: 281.43,
      },
      {
        code: 'AMZN', price: 1762.96, high: 1795.65, low: 1757.22,
      },
      {
        code: 'PEP', price: 129.12, high: 130.53, low: 128.8,
      },
      {
        code: 'TSLA', price: 219.62, high: 231.5, low: 219.5,
      },
    ],
  }));

  document.body.innerHTML = `
<div data-sheet-best="https://sheet.best/api/sheet/cf969697-682a-40e3-bad4-d54803eeeacf">
  <div>
    <h2>{{ code }}</h2>
    <div>
      <span>Price: <b>{{ price }}</b></span>
      <span>High: <b>{{ high }}</b></span>
      <span>Low: <b>{{ low }}</b></span>
    </div>
  </div>
</div>
`.trim();

  await SheetBest.setup();

  expect(global.fetch).toHaveBeenCalledWith(
    'https://sheet.best/api/sheet/cf969697-682a-40e3-bad4-d54803eeeacf',
  );
  expect(document.body.innerHTML).toMatchSnapshot();
});

test('Writing data to a SpreadSheet', async () => {
  global.fetch = jest.fn(async () => ({
    json: async () => ({}),
  }));

  document.body.innerHTML = `
<form id="form" data-sheet-best="https://sheet.best/api/sheet/cf969697-682a-40e3-bad4-d54803eeeacf">
  <input type="text" name="code" value="FOOO"/>
  <input type="text" name="price" value="2000"/>
  <input type="text" name="volume" value="10000000"/>
  <button id="submit-button" type="submit">submit</button>
</form>
`.trim();

  await SheetBest.setup();

  const form = document.getElementById('form');
  const button = document.getElementById('submit-button');
  const finished = new Promise((resolve) => {
    form.addEventListener('submit-finished', resolve, { once: true });
  });

  button.click();

  await finished;

  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith(
    'https://sheet.best/api/sheet/cf969697-682a-40e3-bad4-d54803eeeacf',
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([{
        code: 'FOOO',
        price: '2000',
        volume: '10000000',
      }]),
    },
  );
});
