# \<jinn-window>

Jinn-window wraps [jsPanel](https://jspanel.de) into a webcomponent.

Kudos to the jsPanel team for providing such a great window component.

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

## `jinn-window` attributes


| Attribute | Description | Default |
| --------- | -----------| ------- |
| name | set the name of the window | - |
| title | set the title of the window | - |
| open | opens the window on page load. Marker attribute | - |
| position | optional position of window. see below | center |
| snap | snaps window to corners or centers of each border | true |
| headercontrols | a list icon names to show on toolbar for resizing the window | minimize, smallify, close | 
| size | space-separated width + height e.g. '100 50' | auto (fit content) |

### position

Allows to position a window initially. One of the following values 
is allowed:
* 'center'
* 'left-top'
* 'center-top'
* 'right-top'
* 'right-center'
* 'right-bottom'
* 'center-bottom'
* 'left-bottom'
* 'left-center'
Default value: none

### headercontrols

One of:
* smallify - shrink to header
* minimize - minimze to bottom of page
* normalize - restore last size
* maximize - take the full page
* close - close button
* closeonly - shortcut for only close button
* none - no controls at all

## Events

### window-opened

| Param | Description |
| ---- | ---- | 
| name | the name of the window just being opened |
| title | the title of the window just being opened |


## Examples

### Bind it on a button

```html
<jinn-window name="42"></jinn-window>
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

### Open a green window with a fixed size in the center on pageload

```html
<jinn-window name="5"  open position="center" size="150 50" title="center"><div class="center-box">center</div></jinn-window>

```

### Consider the [demo-page](demo/index.html) for more examples

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

## #Releasing on npm


```
 np --branch main --no-release-draft --no-tests --no-2fa
```

git status must be clean.