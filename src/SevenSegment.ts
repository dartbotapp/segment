import { charMasks } from './render-segment/char-masks';
import { render } from './render-segment/render-segment';
import { createTheme, Token, tokenDefaults } from './render-segment/token';
import { debounce } from './utils';

export enum SevenSegmentAttributes {
  Format = 'format',
  DisplayText = 'displaytext',
}

export class SevenSegment extends HTMLElement {
  static readonly RESIZE_DEBOUNCE_MS = 100;

  static get observedAttributes() {
    return [SevenSegmentAttributes.Format, SevenSegmentAttributes.DisplayText];
  }

  #canvas: HTMLCanvasElement;

  #style: HTMLStyleElement;

  #shadow: ShadowRoot;

  #format: string;

  #mask: number[] = [];

  constructor() {
    super();
    this.#format = '#####';
    this.#shadow = this.attachShadow({ mode: 'open' });
    this.#shadow.innerHTML = `
      <style></style>
      <canvas></canvas>
    `;
    this.#canvas = this.#shadow.querySelector('canvas')!;
    this.#style = this.#shadow.querySelector('style')!;
    this.setStyle();

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
        this.setStyle();
        break;
      case SevenSegmentAttributes.DisplayText:
        this.setText(String(newValue));
        break;
      default:
        break;
    }
    this.render();
  }

  render() {
    const ctx = this.#canvas.getContext('2d');
    if (ctx == null) {
      return;
    }
    const style = getComputedStyle(this);
    const theme = createTheme(style);
    const props = { format: this.#format };
    render(theme, props, ctx, this.#mask);
  }

  /**
   * Turn on specific segments by setting the bit to 1
   * @param mask Array of segment masks
   */
  setMask(mask: number[]) {
    this.#mask = mask;
    this.render();
  }

  /**
   *
   * @param val
   */
  setText(val: string) {
    const chars = Array.from(val);
    const masks = chars.map(
      c =>
        charMasks[c] ||
        charMasks[c.toLocaleUpperCase()] ||
        charMasks[c.toLocaleLowerCase()] ||
        0,
    );
    this.#mask = masks;
    this.render();
  }

  /**
   * Return the image data encoded as a data URL.
   * @param type The image format. Default is `image/png`.
   * @param quality The image quality. Default is `1.0`.
   */
  toDataURL(type?: string, quality?: number): string {
    return this.#canvas.toDataURL(type, quality);
  }

  /**
   * Return the image data as a Blob.
   * @param type The image format. Default is `image/png`.
   * @param quality The image quality. Default is `1.0`.
   */
  toBlob(type?: string, quality?: number): Promise<Blob> {
    return new Promise<Blob>(resolve => {
      this.#canvas.toBlob(
        blob => {
          resolve(blob!);
        },
        type,
        quality,
      );
    });
  }

  /**
   * Set the base styles for the component
   *
   */
  private setStyle() {
    const count = this.#format.match(/#/g)?.length || 0;
    const bg = `var(${Token.segmentBackground}, ${tokenDefaults[Token.segmentBackground]})`;
    this.#style.innerHTML = `
      :host {
        display: flex;
        width: 100%;
        aspect-ratio: ${count} / 1.75;
        box-sizing: border-box;
        user-select: none;
        background: ${bg};
      }
      canvas {
        width: 100%;
        height: 100%;
        background: ${bg};
      }
    `;
  }
}
