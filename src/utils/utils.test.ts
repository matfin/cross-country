import { slugify } from './utils';

describe('Test utils', (): void => {
  it('should convert strings to slugs', (): void => {
    expect(slugify()).toEqual('');
    expect(slugify('Run around Howth')).toEqual('run-around-howth');
    expect(slugify('Run around Peenemünde')).toEqual('run-around-peenemunde');
  });
});
