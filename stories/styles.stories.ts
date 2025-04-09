import type { StoryObj, Meta } from '@storybook/html';
import { baseDecorator, transform, zoomDecorator } from './decorators';
import '../src/seven-segment';
import { Token } from '../src/render-segment/token';

export type DartboardProps = {};

const meta = {
  title: 'Components/Dartboard',
  decorators: [zoomDecorator, baseDecorator],
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

export const Align: Story = {
  name: 'segment-align',
  tags: ['hidden'],
  render: (_, { id }) => `
<style>
  #${id} {
    seven-segment:nth-child(1) {
      --dartbot-align: left;
    }
    seven-segment:nth-child(2) {
      --dartbot-align: right;
    }
  }
</style>
<div id="${id}">
  <seven-segment displaytext="left" format="#######"></seven-segment>
  <seven-segment displaytext="right" format="#######"></seven-segment>
</div>
  `,
};

export const AlignOver: Story = {
  name: 'segment-align-over',
  tags: ['hidden'],
  render: (_, { id }) => `
<style>
  #${id} {
    seven-segment:nth-child(1) {
      --dartbot-align: left;
    }
    seven-segment:nth-child(2) {
      --dartbot-align: right;
    }
  }
</style>
<div id="${id}">
  <seven-segment displaytext="1234567890" format="#######"></seven-segment>
  <seven-segment displaytext="1234567890" format="#######"></seven-segment>
</div>
  `,
};

export const SegmentWidth: Story = {
  name: 'segment-width',
  tags: ['hidden'],
  render: (_, { id }) => `
<style>
  #${id} {
    seven-segment:nth-child(1) {
      --dartbot-segment-width: 1;
    }
    seven-segment:nth-child(2) {
      --dartbot-segment-width: 4;
    }
    seven-segment:nth-child(3) {
      --dartbot-segment-width: 8;
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

export const StrokeWidth: Story = {
  name: 'stroke-width',
  tags: ['hidden'],
  render: (_, { id }) => `
<style>
  #${id} {
    seven-segment {
      ${Token.fillOn}: transparent;
      ${Token.fillOff}: transparent;
      ${Token.strokeOn}:rgb(255, 255, 255);
      ${Token.strokeOff}:rgb(48, 48, 48);
      ${Token.strokeWidth}: 4;
      ${Token.segmentInterval}: 3;
    }
    seven-segment:nth-child(1) {
      ${Token.strokeWidth}: 1;
    }
    seven-segment:nth-child(2) {
      ${Token.strokeWidth}: 5;
    }
    seven-segment:nth-child(3) {
      ${Token.strokeWidth}: 8;
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

export const SegmentInterval: Story = {
  name: 'segment-interval',
  tags: ['hidden'],
  render: (_, { id }) => `
<style>
  #${id} {
    seven-segment:nth-child(1) {
      --dartbot-segment-interval: 0;
    }
    seven-segment:nth-child(2) {
      --dartbot-segment-interval: 2;
    }
    seven-segment:nth-child(3) {
      --dartbot-segment-interval: 5;
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

export const SegmentBevelWidth: Story = {
  name: 'segment-bevel-width',
  tags: ['hidden'],
  render: (_, { id }) => `
<style>
  #${id} {
    seven-segment:nth-child(1) {
      ${Token.bevelWidth}: 0;
    }
    seven-segment:nth-child(2) {
      ${Token.bevelWidth}: .25;
    }
    seven-segment:nth-child(3) {
      ${Token.bevelWidth}: .7;
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

export const ElementShear: Story = {
  name: 'element-shear',
  tags: ['hidden'],
  render: (_, { id }) => `
<style>
  #${id} {
    seven-segment:nth-child(1) {
      ${Token.shear}: 0;
    }
    seven-segment:nth-child(2) {
      ${Token.shear}: 20;
    }
    seven-segment:nth-child(3) {
      ${Token.shear}: -20;
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

export const ElementSpacing: Story = {
  name: 'element-spacing',
  tags: ['hidden'],
  render: (_, { id }) => `
<style>
  #${id} {
    seven-segment {
      ${Token.bevelWidth}: 0;
    }
    seven-segment:nth-child(1) {
      ${Token.elementSpacing}: 0;
    }
    seven-segment:nth-child(2) {
      ${Token.elementSpacing}: 2;
    }
    seven-segment:nth-child(3) {
      ${Token.elementSpacing}: 5;
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

export const ElementPadding: Story = {
  name: 'element-padding',
  tags: ['hidden'],
  render: (_, { id }) => `
<style>
  #${id} {
    seven-segment:nth-child(1) {
      ${Token.elementPadding}: 0;
    }
    seven-segment:nth-child(2) {
      ${Token.elementPadding}: 2;
    }
    seven-segment:nth-child(3) {
      ${Token.elementPadding}: 5;
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
