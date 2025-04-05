import type { StoryObj, Meta } from '@storybook/html';
import '../src/seven-segment';

export type DartboardProps = {};

const meta = {
  title: 'Components/Dartboard',
} satisfies Meta<DartboardProps>;

export default meta;
type Story = StoryObj<DartboardProps>;

export const AttributeText: Story = {
  name: 'attribute-text',
  tags: ['hidden'],
  render: (_, { id }) => `
<div id="${id}">
  <seven-segment displayText="hello"></seven-segment>
</div>
  `,
};

export const ApiText: Story = {
  name: 'api-text',
  tags: ['hidden'],
  render: (_, { id }) => `
<div id="${id}">
  <seven-segment></seven-segment>
</div>
<script defer>
(() => {
  const segments = document.querySelectorAll('#${id} seven-segment');
  segments[0].setText('hello');
})();
</script>
  `,
};

export const ApiMask: Story = {
  name: 'api-mask',
  tags: ['hidden'],
  render: (_, { id }) => `
<div id="${id}">
  <seven-segment></seven-segment>
</div>
<script defer>
(() => {
  const segments = document.querySelectorAll('#${id} seven-segment');
  segments[0].setMask([
    0b1110110,
    0b1111001,
    0b0111000,
    0b0111000,
    0b0111111
  ]);
})();
</script>
  `,
};

export const ApiSegment: Story = {
  name: 'api-segment',
  tags: ['hidden'],
  render: (_, { id }) => `
<div id="${id}">
  <seven-segment format="#######"></seven-segment>
</div>
<script defer>
(() => {
  const segments = document.querySelectorAll('#${id} seven-segment');
  segments[0].setMask([
    0b0000001,
    0b0000010,
    0b0000100,
    0b0001000,
    0b0010000,
    0b0100000,
    0b1000000
  ]);
})();
</script>
  `,
};

export const Format: Story = {
  name: 'format',
  tags: ['hidden'],
  render: (_, { id }) => `
<div id="${id}">
  <seven-segment format="#######" displayText="1234567890"></seven-segment>
  <seven-segment format="##############" displayText="1234567890"></seven-segment>
</div>
  `,
};
