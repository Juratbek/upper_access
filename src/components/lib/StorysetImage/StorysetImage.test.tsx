import { render, screen } from '@testing-library/react';
import { StorysetImage } from '.';

describe('StorysetImage', () => {
  it('render', () => {
    render(<StorysetImage width={500} height={500} src='/storyset/otp.svg' storysetUri='user' />);
    const storysetImage = screen.getByRole('storyset');
    expect(storysetImage).toBeVisible();

    const br = storysetImage.querySelector('br');
    expect(br).toBeVisible();

    const img = storysetImage.querySelector('img') as HTMLImageElement;
    expect(img).toBeVisible();
    expect(img.width).toEqual(500);
    expect(img.height).toEqual(500);
    expect(img.src).toContain('/storyset/otp.svg');

    const a = storysetImage.querySelector('a');
    expect(a).toBeVisible();
    expect(a).toHaveTextContent('Data illustrations by Storyset');
    expect(a?.href).toEqual('https://storyset.com/user');
    expect(a?.target).toEqual('_blank');
    expect(a?.rel).toEqual('noreferrer');
  });
});
