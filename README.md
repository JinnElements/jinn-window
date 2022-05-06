# \<jinn-window>

Jinn-window wraps [jsPanel](https://jspanel.de) into a webcomponent.

## Installation

```bash
npm i jinn-window
```

## Usage

```html
<script type="module">
  import 'jinn-window/jinn-window.js';
</script>

<jinn-window name="foo"></jinn-window>
```

### Arguments

#### ```name``` set the name fo the windows

#### ```title``` set the title of the windows

#### ```open``` open the window on pageload

Default value: none

#### ```headercontrols``` enable / disable header controls.

Possible adjustments:
close, maximize , normalize, minimize, smallify

Default value: minimize, smallify, close

#### ```position```html set the possition of the window

Possible adjustments: center, left-top, center-top, right-top, right-center, 
right-bottom, center-bottom, left-bottom, left-center

Default value: center

#### ```snap``` Snap the windows to the corner

Possible adjustments: true or false

Default value: true

#### ```size``` define the window size

Possible adjustments: "height width", auto

Defualt value: auto

### Examples

#### Bind it on a button

```html
<button id="openLeft">Open Left</button>

<script type="text/javascript">
  const openButton = document.getElementById("openLeft");
    const win = document.querySelector("jinn-window[name='42']");

  openButton.addEventListener("click", (e) => {
    win.open();
  });

  win.addEventListener("window-opened", (e) => {
    console.log("window-opened", e.detail)
  });
</script>

```

#### Open a green window with a fixed size in the center on pageload

```html
<jinn-window name="5"  open position="center" size="150 50" title="center"><div class="center-box">center</div></jinn-window>

```

#### Consider the [demo-page](demo/index.html) for more examples

## Testing with Web Test Runner

To execute a single test run:

```bash
npm run test
```

To run the tests in interactive watch mode run:

```bash
npm run test:watch
```


## Tooling configs

For most of the tools, the configuration is in the `package.json` to minimize the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`
