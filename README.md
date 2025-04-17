<h1>&lt;seven-segment&gt; A Segmented Display Web Component</h1>

<div>
  <a href="https://github.com/dartbotapp/segment" rel="noopener noreferrer" target="_blank"><img src="https://img.shields.io/badge/GitHub-Code-232323.svg?style=flat&amp;logo=github&amp;logoColor=white" alt="GitHub" /></a>
  <a href="https://docs.dartbot.com/segment" rel="noopener noreferrer" target="_blank"><img src="https://img.shields.io/badge/Docs-Website-232323.svg?style=flat" alt="Documentation" /></a>
  <a href="https://www.npmjs.com/package/@dartbot/segment" rel="noopener noreferrer" target="_blank"><img src="https://img.shields.io/npm/dw/@dartbot/segment?label=npm&amp;style=flat" alt="npm" /></a>
  <a href="https://github.com/dartbotapp/segment/actions/workflows/publish.yml" rel="noopener noreferrer" target="_blank"><img src="https://img.shields.io/github/actions/workflow/status/dartbotapp/segment/publish.yml" alt="GitHub Actions Workflow Status" /></a>
  <a href="https://github.com/dartbotapp/segment/blob/main/LICENSE" rel="noopener noreferrer" target="_blank"><img src="https://img.shields.io/badge/license-MIT-232323.svg?style=flat" alt="License" /></a>
</div>

<img src="https://raw.githubusercontent.com/dartbotapp/segment/refs/heads/main/storybook-public/segment_interval.gif" style="width:22em; border:.1em solid #fff; margin:2em 0" />


---

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

<h3>
  <a href="https://docs.dartbot.com/segment">
    <img style="width:.9em;margin-right:.2em" src="https://raw.githubusercontent.com/dartbotapp/segment/refs/heads/main/storybook-public/storybook.svg">Storybook Documentation</>
  </a>
</h3>

## Design Goals

🎨 **HTML Canvas** Render using HTMLCanvas

🍦 **Vanilla Web Component** Export as a dependency-free vanilla web component, usable with just HTML, CSS, and JS

#️⃣ **Typescript** Written in Typescript

🌈 **Styles** Offer fully customizable styling. Where possible use CSS to control customized settings

🧾 **Support CSS props** CSS properties like padding, margin, filters, etc., should affect the element as expected

🔎 **Pan & Zoom** Support ability to zoom in and change center point of the board

🌐 **Accessibility** Implement accessibility recommendations. WCAG, WAI-ARIA

🕹️ **Interactivity** Support user interactivity features including touch input, hover, selection, highlighting, and clicking.

## Installation

```bash
npm i @dartbot/segment
```

## Usage

```html
<script type="module">
  import '@dartbot/segment/seven-segment.js';
</script>

<seven-segment></seven-segment>
```

## Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```

## Testing with Web Test Runner

To execute a single test run:

```bash
npm run test
```

To run the tests in interactive watch mode run:

```bash
npm run test:watch
```

## Demoing with Storybook

To run a local instance of Storybook for your component, run

```bash
npm run storybook
```

To build a production version of Storybook, run

```bash
npm run storybook:build
```


## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`

## To Do
- [x] Set Format
  - [x] char masks
  - [x] align
- [x] Export Image
  - [x] standard
  - [x] large size
- [ ] Auto color calc
- [ ] Create your own
- [ ] Styles (shadow, glow)
- [ ] Effects
  - [ ] marquee, blink, rotate, rotate fill
- [ ] Additional segments
  - [ ] 16, 14, Posey
- [ ] Accessibility https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/canvas#maximum_canvas_size
- [ ] Unit Tests
