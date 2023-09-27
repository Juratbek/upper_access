import { FC } from 'react';

import classes from './StorysetImage.module.scss';
import { IStorysetImageProps } from './StorysetImage.types';

export const StorysetImage: FC<IStorysetImageProps> = ({ storysetUri, className, ...props }) => {
  return (
    <span className={className} role='storyset'>
      <img {...props} style={{ widows: '100%', height: '100%' }} />
      <br />
      <a
        className={`${classes['storyset-link']} link`}
        href={`https://storyset.com/${storysetUri}`}
        target='_blank'
        rel='noreferrer'
      >
        Data illustrations by Storyset
      </a>
    </span>
  );
};
