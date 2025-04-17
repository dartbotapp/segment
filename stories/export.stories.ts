import type { StoryObj, Meta } from '@storybook/html';
import '../src/seven-segment';

export type DartboardProps = {};

const meta = {
  title: 'Components/Dartboard',
} satisfies Meta<DartboardProps>;

export default meta;
type Story = StoryObj<DartboardProps>;

export const ExportUrl: Story = {
  name: 'extract-url',
  tags: ['hidden'],
  render: (_, { id }) => `
<div id="${id}">
  <div style="margin-bottom: 1em;">
    <a href="#" download onclick="click">Click to Download Image</a>
  </div>
  <div>
    <seven-segment displayText="hello"></seven-segment>
  </div>
</div>
<script defer>
  (() => {
    const segments = document.querySelectorAll('#${id} seven-segment')[0];
    const link = document.querySelectorAll('#${id} a')[0];
    setTimeout(() => {
      link.href = segments.toDataURL('image/png');
    }, 10);
  })();
</script>
  `,
};

export const ExportBlob: Story = {
  name: 'extract-blob',
  tags: ['hidden'],
  render: (_, { id }) => `
<div id="${id}">
  <div style="margin-bottom: 1em;">
    <button>Click to Download From Blob</button>
  </div>
  <div>
    <seven-segment displayText="hello"></seven-segment>
  </div>
</div>
<script defer>
  (() => {
    const link = document.querySelectorAll('#${id} button')[0];
    link.addEventListener('click', click);
    async function click(e) {
      e.preventDefault();
      const segments = document.querySelectorAll('#${id} seven-segment')[0];
      const link = document.querySelectorAll('#${id} a')[0];
      const blob = await segments.toBlob('image/png');
      const anchor = document.createElement('a');
      anchor.download = 'segment.png';
      anchor.href = URL.createObjectURL(blob);
      anchor.click();
      URL.revokeObjectURL(anchor.href);
    }
  })();
</script>
  `,
};
