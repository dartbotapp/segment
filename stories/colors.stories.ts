import type { StoryObj, Meta } from '@storybook/html';
import { baseDecorator, transform, zoomDecorator } from './decorators';
import '../src/seven-segment';
import { Token } from '../src/render-segment/token';

export type DartboardProps = {};

const meta = {
  title: 'Components/Colors',
  decorators: [baseDecorator],
  parameters: {
    docs: { source: { transform } },
  },
} satisfies Meta<DartboardProps>;

export default meta;
type Story = StoryObj<DartboardProps>;

export const Default: Story = {
  name: 'color-pallets',
  tags: ['hidden'],
  render: () => `<seven-segment></seven-segment>`,
};

export const SegmentColor: Story = {
  name: 'segment-color',
  tags: ['hidden'],
  render: (_, { id }) => `
<style>
  #${id} {
    seven-segment:nth-child(1) {
      --dartbot-fill-on: #f00;
      --dartbot-fill-off: #322;
    }
    seven-segment:nth-child(2) {
      --dartbot-fill-on: #ddd;
      --dartbot-fill-off: #444;
    }
    seven-segment:nth-child(3) {
      --dartbot-fill-on: #f0f;
      --dartbot-fill-off: #154;
    }
  }
</style>
<div id="${id}">
  <seven-segment displaytext="hello"></seven-segment>
  <seven-segment displaytext="hello"></seven-segment>
  <seven-segment displaytext="hello"></seven-segment>
</div>
  `,
};

export const StrokeColors: Story = {
  name: 'stroke-colors',
  tags: ['hidden'],
  render: (_, { id }) => `
<style>
  #${id} {
    seven-segment {
      ${Token.fillOn}: transparent;
      ${Token.fillOff}: transparent;
      ${Token.strokeWidth}: 4;
      ${Token.segmentInterval}: 2;
    }
    seven-segment:nth-child(1) {
      ${Token.strokeOn}:rgb(255, 255, 255);
      ${Token.strokeOff}:rgb(48, 48, 48);
    }
    seven-segment:nth-child(2) {
      ${Token.strokeOn}: gold;
      ${Token.strokeOff}: orangered;
    }
    seven-segment:nth-child(3) {
      ${Token.strokeOn}: #00f0ff;
      ${Token.strokeOff}: #5b5b5b;
    }
  }
</style>
<div id="${id}">
  <seven-segment displaytext="hello"></seven-segment>
  <seven-segment displaytext="hello"></seven-segment>
  <seven-segment displaytext="hello"></seven-segment>
</div>
  `,
};

export const BackgroundColors: Story = {
  name: 'background-colors',
  tags: ['hidden'],
  render: (_, { id }) => `
<style>
  #${id} {
    seven-segment {
      ${Token.fillOn}: red;
      ${Token.fillOff}: #500;
    }
    seven-segment:nth-child(1) {
      ${Token.segmentBackground}: #000;
    }
    seven-segment:nth-child(2) {
      ${Token.segmentBackground}: orange;
    }
    seven-segment:nth-child(3) {
      ${Token.segmentBackground}: transparent;
    }
  }
</style>
<div id="${id}">
  <seven-segment displaytext="hello"></seven-segment>
  <seven-segment displaytext="hello"></seven-segment>
  <seven-segment displaytext="hello"></seven-segment>
</div>
  `,
};
