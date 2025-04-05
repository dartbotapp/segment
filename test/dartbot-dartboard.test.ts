import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import { SevenSegment } from '../src/SevenSegment.js';
import '../src/seven-segment.js';

describe('SevenSegment', () => {
  it('has a default header "Hey there" and counter 5', async () => {
    const el = await fixture<SevenSegment>(
      html`<seven-segment></seven-segment>`,
    );

    expect(el).to.exist;
  });
});
