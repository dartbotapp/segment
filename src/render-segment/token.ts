export interface Theme {
  elementSpacing: number;
  elementPadding: number;
  segmentBackground: string;
  segmentWidth: number;
  segmentInterval: number;
  bevelWidth: number;
  sideBevelEnabled: boolean;
  fillOff: string;
  fillOn: string;
  strokeOff: string;
  strokeOn: string;
  strokeWidth: number;
  shear: number;
  align: Align;
}

export enum Align {
  Left = 'left',
  Right = 'right',
}

export const enum Token {
  segmentBackground = '--dartbot-segment-bg',
  elementSpacing = '--dartbot-element-spacing',
  elementPadding = '--dartbot-element-padding',
  segmentWidth = '--dartbot-segment-width',
  segmentInterval = '--dartbot-segment-interval',
  bevelWidth = '--dartbot-bevel-width',
  sideBevelEnabled = '--dartbot-side-bevel-enabled',
  fillOn = '--dartbot-fill-on',
  fillOff = '--dartbot-fill-off',
  strokeOn = '--dartbot-stroke-on',
  strokeOff = '--dartbot-stroke-off',
  strokeWidth = '--dartbot-stroke-width',
  shear = '--dartbot-shear',
  align = '--dartbot-align',
}

export const tokenDefaults = {
  [Token.elementSpacing]: '2',
  [Token.elementPadding]: '2',
  [Token.segmentBackground]: '#000',
  [Token.segmentWidth]: '6',
  [Token.segmentInterval]: '.75',
  [Token.bevelWidth]: '.1',
  [Token.sideBevelEnabled]: '1',
  [Token.fillOn]: '#7f0',
  [Token.fillOff]: '#030',
  [Token.strokeOn]: 'black',
  [Token.strokeOff]: 'black',
  [Token.strokeWidth]: '0',
  [Token.shear]: '0',
  [Token.align]: Align.Left,
};

export const createTheme = (style: CSSStyleDeclaration): Theme => {
  const str = (t: Token) => style.getPropertyValue(t) || tokenDefaults[t];
  const num = (t: Token) => parseFloat(str(t));
  const bool = (t: Token) => str(t) === '1';

  return {
    elementSpacing: num(Token.elementSpacing),
    elementPadding: num(Token.elementPadding),
    segmentBackground: str(Token.segmentBackground),
    segmentWidth: num(Token.segmentWidth),
    segmentInterval: num(Token.segmentInterval),
    bevelWidth: num(Token.bevelWidth),
    sideBevelEnabled: bool(Token.sideBevelEnabled),
    fillOn: str(Token.fillOn),
    fillOff: str(Token.fillOff),
    strokeOn: str(Token.strokeOn),
    strokeOff: str(Token.strokeOff),
    strokeWidth: num(Token.strokeWidth),
    shear: num(Token.shear),
    align: str(Token.align) as Align,
  };
};
