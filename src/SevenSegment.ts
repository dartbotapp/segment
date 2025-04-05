import { charMasks } from './render-segment/char-masks';
import { render } from './render-segment/render-segment';
import { createTheme, Token, tokenDefaults } from './render-segment/token';
import { debounce } from './utils';

export enum SevenSegmentAttributes {
  Format = 'format',
  Mask = 'mask',
  DisplayText = 'displaytext',
}

export class SevenSegment extends HTMLElement {
  #canvas: HTMLCanvasElement;

  #style: HTMLStyleElement;

  #shadow: ShadowRoot;

  #format: string;

  #mask: number[] = [];

  static RESIZE_DEBOUNCE_MS = 100;

  static get observedAttributes() {
    return [
      SevenSegmentAttributes.Format,
      SevenSegmentAttributes.Mask,
      SevenSegmentAttributes.DisplayText,
    ];
  }

  get count() {
    return this.#format.match(/#/g)?.length || 0;
  }

  constructor() {
    super();
    this.#format = '#####';
    this.#shadow = this.attachShadow({ mode: 'open' });
    this.#shadow.innerHTML = `
      <style>
        :host {
          display: flex;
          width: 100%;
          aspect-ratio: ${this.count} / 1.75;
          box-sizing: border-box;
          user-select: none;
          background: var(${Token.segmentBackground}, ${tokenDefaults[Token.segmentBackground]});
        }
        canvas {
          width: 100%;
          height: 100%;
          background: var(${Token.segmentBackground}, ${tokenDefaults[Token.segmentBackground]});
        }
      </style>
      <canvas></canvas>
    `;
    this.#canvas = this.#shadow.querySelector('canvas')!;
    this.#style = this.#shadow.querySelector('style')!;

    const resizeObserver = new ResizeObserver(
      debounce(
        (entries: ResizeObserverEntry[]) => {
          const entry = entries.find(e => e.target === this)!;
          const box = entry.devicePixelContentBoxSize?.[0];
          const boxC = entry.contentBoxSize[0];
          const physical = (n: number) => Math.round(n * devicePixelRatio);
          this.#canvas.width = box?.inlineSize ?? physical(boxC.inlineSize);
          this.#canvas.height = box?.blockSize ?? physical(boxC.blockSize);
          this.render();
        },
        SevenSegment.RESIZE_DEBOUNCE_MS,
        { leading: true, trailing: true },
      ),
    );
    resizeObserver.observe(this, { box: 'content-box' });
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) {
      return;
    }
    switch (name) {
      case SevenSegmentAttributes.Format:
        this.#format = String(newValue);
        break;
      case SevenSegmentAttributes.Mask:
        this.#mask = JSON.parse(String(newValue));
        break;
      case SevenSegmentAttributes.DisplayText:
        this.setText(String(newValue));
        break;
      default:
        break;
    }
    this.render();
  }

  private render() {
    const ctx = this.#canvas.getContext('2d');
    if (ctx == null) {
      return;
    }
    this.#style.innerHTML = `
        :host {
          display: flex;
          width: 100%;
          aspect-ratio: ${this.count} / 1.75;
          box-sizing: border-box;
          user-select: none;
          background: var(${Token.segmentBackground}, ${tokenDefaults[Token.segmentBackground]});
        }
        canvas {
          width: 100%;
          height: 100%;
          background: var(${Token.segmentBackground}, ${tokenDefaults[Token.segmentBackground]});
        }
    `;
    const style = getComputedStyle(this);
    const theme = createTheme(style);
    const props = { format: this.#format };
    render(theme, props, ctx, this.#mask);
  }

  setMask(mask: number[]) {
    this.#mask = mask;
    this.render();
  }

  setText(val: string) {
    const chars = Array.from(val);
    const masks = chars.map(
      c =>
        charMasks[c] ||
        charMasks[c.toLocaleUpperCase()] ||
        charMasks[c.toLocaleLowerCase()] ||
        charMasks[' '],
    );
    this.#mask = masks;
    this.render();
  }

  setNumber(val: number) {
    const v = String(val);
    this.setText(v);
  }
}
