global.fetch = require('isomorphic-fetch');
const SheeBest = require('./index');

const sleep = (seconds) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));

test('Reading a SpreadSheet and turning a template into formatted HTML', async (done) => {
  jest.setTimeout(30000);

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

  await SheeBest.setup();
  expect(document.body.innerHTML).toMatchSnapshot();

  done();
});

test('Writing data to a SpreadSheet', async (done) => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => ({}),
  }));
  global.FormData = jest.fn(() => () => ({}));
  Array.from = jest.fn(() => [
    ['code', 'FOOO'], ['price', '2000'], ['volume', '10000000'],
  ]);

  document.body.innerHTML = `
<form id="form" data-sheet-best="https://sheet.best/api/sheet/cf969697-682a-40e3-bad4-d54803eeeacf">
  <input type="text" name="code"/>
  <input type="text" name="price"/>
  <input type="text" name="volume"/>
  <button id="submit-button" type="submit">submit</button>
</form>
`.trim();

  await SheeBest.setup();

  const button = document.getElementById('submit-button');
  button.click();

  await sleep(1.4);

  expect(fetch).toHaveBeenCalledTimes(1);

  done();
});
