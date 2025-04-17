import type { StoryObj, Meta } from '@storybook/html';
import { baseDecorator, themeDecorator, transform } from './decorators';
import '../src/seven-segment';

const meta = {
  title: 'Components/Dartboard',
  decorators: [baseDecorator, themeDecorator],
  parameters: {
    docs: { source: { transform } },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Padding: Story = {
  name: 'story-padding',
  tags: ['hidden'],
  render: (_, { id }) => `
    <style data-dartbot-remove>
    #${id} {
      column-gap: 2px;
      seven-segment {
        border: 2px dashed #0002;
        background: #d0e2cc;
        --dartbot-element-spacing:1;
      }
    }
    </style>
    <style>
      #${id} {
        seven-segment:nth-child(1) {
          padding: 0em;
        }
        seven-segment:nth-child(2) {
          padding: .5em;
        }
        seven-segment:nth-child(3) {
          padding: 1em;
        }
      }
    </style>
    <div id="${id}">
      <seven-segment displayText="pad 1"></seven-segment>
      <seven-segment displayText="pad 2"></seven-segment>
      <seven-segment displayText="pad 3"></seven-segment>
    </div>
  `,
};

export const Margin: Story = {
  name: 'story-margin',
  tags: ['hidden'],
  render: (_, { id }) => `
    <style data-dartbot-remove>
    #${id} {
      background: #f443;
      seven-segment {
        background: #d0e2cc;
        --dartbot-canvas-bg: #fff;
      }
    }
    </style>
    <style>
      #${id} {
        seven-segment:nth-child(1) {
          margin: 0em;
        }
        seven-segment:nth-child(2) {
          margin: .5em;
        }
        seven-segment:nth-child(3) {
          margin: 1em;
        }
      }
    </style>
    <div id="${id}">
      <seven-segment displayText="mar 1"></seven-segment>
      <seven-segment displayText="mar 2"></seven-segment>
      <seven-segment displayText="mar 3"></seven-segment>
    </div>
  `,
};

export const Border: Story = {
  name: 'story-border',
  tags: ['hidden'],
  render: (_, { id }) => `
    <style data-dartbot-remove>
    #${id} {
      column-gap: .25em;
    }
    </style>
    <style>
      #${id} {
        seven-segment {
          border: 0 dashed orange;
        }
        seven-segment:nth-child(1) {
          border-width: 0em;
        }
        seven-segment:nth-child(2) {
          border-width: .5em;
        }
        seven-segment:nth-child(3) {
          border-width: 1em;
        }
      }
    </style>
    <div id="${id}">
      <seven-segment displayText="b1"></seven-segment>
      <seven-segment displayText="b2"></seven-segment>
      <seven-segment displayText="b3"></seven-segment>
    </div>
  `,
};

export const Filters: Story = {
  name: 'story-filters',
  tags: ['hidden'],
  render: (_, { id }) => `
    <style data-dartbot-remove>
      #${id} {
        seven-segment {
          transition: filter .5s;
        }
      }
    </style>
    <style>
      #${id} {
        seven-segment {
          --dartbot-element-spacing:1
        }
        seven-segment:hover {
          filter: unset!important;
        }
        seven-segment:nth-child(1) {
          filter: drop-shadow(2px 2px 10px black);
        }
        seven-segment:nth-child(2) {
          filter: opacity(.2);
        }
        seven-segment:nth-child(3) {
          filter: invert(1);
        }
      }
    </style>
    <div id="${id}">
      <seven-segment displayText="1234"></seven-segment>
      <seven-segment displayText="1234"></seven-segment>
      <seven-segment displayText="1234"></seven-segment>
    </div>
  `,
};

export const Transform: Story = {
  name: 'story-transform',
  tags: ['hidden'],
  render: (_, { id }) => `
    <style data-dartbot-remove>
      #${id} {
        overflow: hidden;
        seven-segment {
          transition: transform .5s ease-out;
        }
      }
    </style>
    <style>
      #${id} {
        seven-segment:hover {
          transform: unset!important;
        }
        seven-segment:nth-child(1) {
          transform: rotate(10deg);
        }
        seven-segment:nth-child(2) {
          transform: rotate3d(1, 0, 0, 45deg)
        }
        seven-segment:nth-child(3) {
          transform: skew(10deg, 5deg);
        }
      }
    </style>
    <div id="${id}">
      <seven-segment displayText="1234"></seven-segment>
      <seven-segment displayText="1234"></seven-segment>
      <seven-segment displayText="1234"></seven-segment>
    </div>
  `,
};
