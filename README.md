# SheetBest Templates

[![Build Status](https://travis-ci.org/sheetbest/sheet-best-templates.svg?branch=master)](https://travis-ci.org/sheetbest/sheet-best-templates)
[![Coverage Status](https://coveralls.io/repos/github/sheetbest/sheet-best-templates/badge.svg?branch=master)](https://coveralls.io/github/sheetbest/sheet-best-templates?branch=master)

Connect Google Sheets to your HTML

With SheetBest Templates you'll be able to:

-  Use SpreadSheet data to display data on your HTML template
-  Insert data from a HTML `<form>` to a SpreadSheet

## Usage

This project requires you to setup a Google Sheet API at [SheetBest](https://sheet.best).
When you get yours get back here (it looks like this: https://sheet.best/api/sheet/cf969697-682a-40e3-bad4-d54803eeeacf).
We will use it on the next steps.


Add this snippet to your HTML page:

```html
<script src="https://cdn.sheet.best/sheet-best-templates.min.js"></script>
```

Then follow the instructions on for the operation that you want to do:

## Display Data

To display data you just need to add `data-sheet-best` attribute to your HTML
tag:

```html
<div data-sheet-best="https://sheet.best/api/sheet/cf969697-682a-40e3-bad4-d54803eeeacf"></div>
```

Then you just need to use `{{  }}` templates, they will be replaced
by the content on your SpreadSheet API

```html
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
```

A Google Sheet like this:

<img src="https://raw.githubusercontent.com/sheetbest/sheet-best-templates/master/assets/images/read-example.png" />

Will generate a HTML code like this:

```html
<div data-sheet-best="https://sheet.best/api/sheet/cf969697-682a-40e3-bad4-d54803eeeacf">
  <div>
    <h2>COST</h2>
    <div>
      <span>Price: <b>273.59</b></span>
      <span>High: <b>275.36</b></span>
      <span>Low: <b>272.76</b></span>
    </div>
  </div>

  <!-- ...and so on, until... -->

  <div>
    <h2>TSLA</h2>
    <div>
      <span>Price: <b>229.31</b></span>
      <span>High: <b>231.5</b></span>
      <span>Low: <b>228.03</b></span>
    </div>
  </div>
</div>
```

## Inserting Data

To display data you just need to add `data-sheet-best` attribute to a `<form>`
tag. If your spreadsheet is setup like this:

```html
<form data-sheet-best="https://sheet.best/api/sheet/cf969697-682a-40e3-bad4-d54803eeeacf">
  <input type="text" name="name"/>
  <input type="text" name="email"/>
  <button type="submit">submit</button>
</form>
```

We will automatically add the information on your SpreadSheet once the user
submits the content:

<img src="https://raw.githubusercontent.com/sheetbest/sheet-best-templates/master/assets/images/write-example.png" />

## License

The files included in this repository are licensed under the MIT license.
