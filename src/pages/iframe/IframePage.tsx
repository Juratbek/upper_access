import { Button } from 'components/lib';
import { useParams } from 'hooks';
import { CSSProperties, FC, useCallback, useEffect } from 'react';
import { ALLOWED_ORIGINS } from './IframePage.constants';

export const IFrame: FC = () => {
  const { getParam } = useParams();

  const openAccessPageInNewTab = (): void => {
    window.open(window.location.origin, '_blank');
  };

  const styles: CSSProperties = {
    width: getParam('width') ?? 100,
    height: getParam('height') ?? 40,
  };

  const origin = getParam('origin');

  const listener = useCallback(
    (event: MessageEvent): void => {
      if (!origin) {
        console.error('Origin is not provided');
      } else if (!ALLOWED_ORIGINS.includes(origin)) {
        console.error(`${origin} is not allowed to get auth informations`);
      } else {
        window.parent.postMessage(event.data, 'http://localhost:3001');
      }
    },
    [origin],
  );

  useEffect(() => {
    window.addEventListener('message', listener, false);

    return () => window.removeEventListener('message', listener);
  }, [listener]);

  return (
    <Button style={styles} onClick={openAccessPageInNewTab}>
      Profilga kirish
    </Button>
  );
};
