import { FC } from 'react';

export const Footer: FC = () => {
  return (
    <footer>
      <div className='container text-center'>
        <p className='text-gray'>
          Saytni ishlatishda xatolik yuz berdimi?
          <br />
          Iltimos bu haqda{' '}
          <a href='https://t.me/upper_contact_bot' target='_blank'>
            telegram botimizga
          </a>{' '}
          habar bering
        </p>
      </div>
    </footer>
  );
};
