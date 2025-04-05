import { Decorator } from '@storybook/html';

export const themeDecorator: Decorator = (story, context) => `
<style data-dartbot-remove>
  #${context.name} {
    seven-segment {
      --dartbot-wire-show: 0;
    }
  }
</style>
${story()}
`;
