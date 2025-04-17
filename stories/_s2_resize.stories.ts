import type { StoryObj, Meta } from '@storybook/html';
import { baseDecorator, themeDecorator, transform } from './decorators';
import '../src/seven-segment';

const meta = {
  title: 'Resize',
  decorators: [baseDecorator, themeDecorator],
  parameters: {
    docs: { source: { transform } },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Dimensions: Story = {
  name: 'story-dimensions',
  tags: ['hidden'],
  render: (_, { id }) => `
<style data-dartbot-remove>
  #${id} {
    seven-segment {
      border: .1em dashed #0002;
    }
  }
</style>
<style>
  #${id} {
    seven-segment:nth-child(1) {
      width: 10em;
      height: 18em;
    }
    seven-segment:nth-child(2) {
      width: 18em;
      height: 4em;
    }
    seven-segment:nth-child(3) {
      width: 22em;
      height: 12em;
    }
  }
</style>
<div id="${id}">
  <seven-segment displayText="hello"></seven-segment>
  <seven-segment displayText="hello"></seven-segment>
  <seven-segment displayText="hello"></seven-segment>
</div>
`,
};

export const Dynamic: Story = {
  name: 'Resize',
  tags: ['hidden'],
  decorators: [],
  render: (_, { id }) => `
<style data-dartbot-remove>
#${id} {
  border: 2px dashed #0002;
  display: flex;
  width: 100%;
  overflow: auto;
  seven-segment {
    width 100%;
    height: 100%;
    --dartbot-element-spacing: 1;
    --dartbot-element-padding: 1;
    --dartbot-segment-width: 6;
  }
}
</style>
<style>
  #${id} {
    resize: both;
  }
</style>
<pre>Click and drag the bottom right corner to resize</pre>
<div id="${id}">
  <seven-segment format="###############" displayText="Havana Oh Na Na"></seven-segment>
</div>
  `,
};

export const Width: Story = {
  name: 'story-width',
  tags: ['hidden'],
  decorators: [],
  render: (_, { id }) => `
<style data-dartbot-remove>
  #${id} {
    seven-segment {
      border: 2px dashed #0002;
    }
  }
</style>
<style>
  #${id} {
    seven-segment:nth-child(1) {
      width: 30em;
    }
    seven-segment:nth-child(2) {
      width: 20em;
    }
    seven-segment:nth-child(3) {
      width: 10em;
    }
  }
</style>
<div id="${id}">
  <seven-segment displayText="size" format="######"></seven-segment>
  <seven-segment displayText="size" format="######"></seven-segment>
  <seven-segment displayText="size" format="######"></seven-segment>
</div>
`,
};

export const AspectRatio: Story = {
  name: 'story-aspect',
  tags: ['hidden'],
  render: (_, { id }) => `
<style data-dartbot-remove>
  #${id} {
    seven-segment {
      border: 2px dashed #0002;
    }
  }
</style>
<style>
  #${id} {
    seven-segment:nth-child(1) {
      aspect-ratio: 1 / 1;
      width: 20em;
    }
    seven-segment:nth-child(2) {
      aspect-ratio: 21 / 9;
      width: 20em;
    }
  }
</style>
<div id="${id}">
  <seven-segment displayText="aspect" format="######"></seven-segment>
  <seven-segment displayText="aspect" format="######"></seven-segment>
</div>
`,
};
