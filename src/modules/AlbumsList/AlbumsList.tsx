import { memo } from 'react';

import { useFetchAlbums } from '@hooks/useFetchAlbums';

import styles from './AlbumsList.less';

function AlbumsList() {
	const { data, loading } = useFetchAlbums();
	// eslint-disable-next-line no-console
	console.log(data);
	return !loading ? <ul className={styles.root} /> : null;
}

export default memo(AlbumsList);
