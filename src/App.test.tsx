import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('header', () => {
    const { container } = render(<App />);
    const header = container.querySelector('header');
    expect(header).toBeVisible();
  });
});
