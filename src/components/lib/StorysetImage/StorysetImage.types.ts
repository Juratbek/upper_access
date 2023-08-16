import { ImgHTMLAttributes } from 'react';

export interface IStorysetImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  storysetUri: string;
}
