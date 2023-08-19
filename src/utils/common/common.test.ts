import { getClassName } from './common';

describe('getClassName', () => {
  it('should combine class names', () => {
    const className = getClassName('mt-2', 'mb-1');
    expect(className).toEqual('mt-2 mb-1');
  });
  it('should check for condition', () => {
    const shouldBeAdded = true;
    const className = getClassName('mt-2', shouldBeAdded && 'mb-1');
    expect(className).toEqual('mt-2 mb-1');
  });
  it('should check for condition', () => {
    const shouldBeAdded = false;
    const className = getClassName('mt-2', shouldBeAdded && 'mb-1');
    expect(className).toEqual('mt-2');
  });
});
