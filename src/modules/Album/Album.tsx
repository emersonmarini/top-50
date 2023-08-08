import { memo, ReactNode } from 'react';

import styles from './Album.less';

function Album({ children }: { children: ReactNode }) {
	return <li className={styles.root}>{children}</li>;
}

export default memo(Album);
