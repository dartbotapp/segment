import type { StoryObj, Meta } from '@storybook/html';
import { tokenDefaults, Token, Align } from '../src/render-segment/token';
import '../src/seven-segment';

export type DartboardProps = {
  [token in Token]: string | number | boolean | null;
} & { format: string; displayText: string; align: Align };

const meta = {
  title: 'Playground',
  render: () => `<seven-segment></seven-segment>`,
  args: {},
} satisfies Meta<DartboardProps>;

export default meta;
type Story = StoryObj<DartboardProps>;

export const Playground: Story = {
  name: 'Playground',
  args: {
    format: '########',
    displayText: 'hello',
    [Token.align]: tokenDefaults[Token.align],
    [Token.segmentBackground]: tokenDefaults[Token.segmentBackground],
    [Token.fillOn]: tokenDefaults[Token.fillOn],
    [Token.fillOff]: tokenDefaults[Token.fillOff],
    [Token.strokeWidth]: parseFloat(tokenDefaults[Token.strokeWidth]),
    [Token.strokeOn]: null,
    [Token.strokeOff]: tokenDefaults[Token.strokeOff],
    [Token.shear]: parseFloat(tokenDefaults[Token.shear]),
    [Token.elementPadding]: parseFloat(tokenDefaults[Token.elementPadding]),
    [Token.elementSpacing]: parseFloat(tokenDefaults[Token.elementSpacing]),
    [Token.segmentWidth]: parseFloat(tokenDefaults[Token.segmentWidth]),
    [Token.segmentInterval]: parseFloat(tokenDefaults[Token.segmentInterval]),
    [Token.bevelWidth]: parseFloat(tokenDefaults[Token.bevelWidth]),
    [Token.sideBevelEnabled]: tokenDefaults[Token.sideBevelEnabled] === '1',
  },
  argTypes: {
    [Token.fillOn]: {
      description: 'Color of the segment when turned on',
      control: { type: 'color' },
      defaultValue: tokenDefaults[Token.fillOn],
    },
    [Token.fillOff]: {
      description: 'Color of the segment when turned off',
      control: { type: 'color' },
      defaultValue: tokenDefaults[Token.fillOff],
    },
    [Token.shear]: {
      description: 'Shear angle of the segments',
      control: { type: 'range', min: -180, max: 180, step: 1 },
      defaultValue: tokenDefaults[Token.shear],
    },
    [Token.elementPadding]: {
      description: 'Padding around the segments',
      control: { type: 'range', min: 0, max: 20, step: 0.5 },
      defaultValue: tokenDefaults[Token.elementPadding],
    },
    [Token.elementSpacing]: {
      description: 'Spacing between the segments',
      control: { type: 'range', min: 0, max: 20, step: 0.5 },
      defaultValue: tokenDefaults[Token.elementSpacing],
    },
    [Token.strokeOn]: {
      description: 'Stroke color of the segment when turned on',
      control: { type: 'color' },
      defaultValue: tokenDefaults[Token.strokeOn],
    },
    [Token.strokeOff]: {
      description: 'Stroke color of the segment when turned off',
      control: { type: 'color' },
      defaultValue: tokenDefaults[Token.strokeOff],
    },
    [Token.strokeWidth]: {
      description: 'Stroke width of the segments',
      control: { type: 'range', min: 0, max: 40, step: 1 },
      defaultValue: tokenDefaults[Token.strokeWidth],
    },
    [Token.segmentBackground]: {
      description: 'Background color of the segments',
      control: { type: 'color' },
      defaultValue: tokenDefaults[Token.segmentBackground],
    },
    [Token.segmentWidth]: {
      description: 'Width of the segments',
      control: { type: 'range', min: 0, max: 100, step: 1 },
      defaultValue: tokenDefaults[Token.segmentWidth],
    },
    [Token.segmentInterval]: {
      description: 'Interval between the segments',
      control: { type: 'range', min: 0, max: 10, step: 0.1 },
      defaultValue: tokenDefaults[Token.segmentInterval],
    },
    [Token.bevelWidth]: {
      description: 'Width of the bevel on the segments',
      control: { type: 'range', min: 0, max: 1, step: 0.01 },
      defaultValue: tokenDefaults[Token.bevelWidth],
    },
    [Token.sideBevelEnabled]: {
      description: 'Enable or disable side bevel on the segments',
      control: { type: 'boolean' },
      defaultValue: tokenDefaults[Token.sideBevelEnabled] === '1',
    },
    format: {
      description: 'Format of the display',
      control: { type: 'text' },
      defaultValue: '########',
    },
    displayText: {
      description: 'Text to display on the segments',
      control: { type: 'text' },
      defaultValue: 'hello',
    },
    [Token.align]: {
      description: 'Alignment of the segments',
      options: ['left', 'right'],
      control: { type: 'radio' },
    },
  },
  render: (params, { id }) => {
    const style = `
      .story-playground {
        seven-segment {
          ${Token.fillOn}: ${params[Token.fillOn]};
          ${Token.fillOff}: ${params[Token.fillOff]};
          ${Token.shear}: ${params[Token.shear]};
          ${Token.elementPadding}: ${params[Token.elementPadding]};
          ${Token.elementSpacing}: ${params[Token.elementSpacing]};
          ${Token.strokeOn}: ${params[Token.strokeOn]};
          ${Token.strokeOff}: ${params[Token.strokeOff]};
          ${Token.strokeWidth}: ${params[Token.strokeWidth]};
          ${Token.segmentBackground}: ${params[Token.segmentBackground]};
          ${Token.segmentWidth}: ${params[Token.segmentWidth]};
          ${Token.segmentInterval}: ${params[Token.segmentInterval]};
          ${Token.bevelWidth}: ${params[Token.bevelWidth]};
          ${Token.sideBevelEnabled}: ${params[Token.sideBevelEnabled] ? '1' : '0'};
          ${Token.align}: ${params[Token.align]};
        }
      }
    `;
    const template = `
      <style>
      ${style}
      </style>
      <div id="${id}" class="story-playground">
        <seven-segment displayText="${params.displayText}" format="${params.format}"></seven-segment>
      </div>
    `;
    return template;
  },
};

export const Increment: Story = {
  name: 'Increment',
  decorators: [],
  tags: ['hidden'],
  render: (_, { id }) => `
<style>
  #${id} > seven-segment {
    ${Token.align}: right;
    ${Token.elementPadding}: 2;
    ${Token.elementSpacing}: 3;
    ${Token.segmentWidth}: 6;
  }
</style>
<div id="${id}">
  <seven-segment></seven-segment>
</div>
<script>
  (() => {
    console.log('increment');
    const count = 5;
    const max = Math.pow(10, count) - 1;
    const segments = document.querySelectorAll('#${id} seven-segment')[0];
    segments.setAttribute('format', '#'.repeat(count));
    let i = performance.now();
    function update(){
      const now = performance.now();
      const interval = (Math.floor((now - i) / 10) % max);
      const value = max - interval;
      segments.setText((value).toString());
      requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  })();
</script>
  `,
};
