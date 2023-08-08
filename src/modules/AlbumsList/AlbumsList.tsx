import { memo } from 'react';

import { useFetchAlbums } from '@hooks/useFetchAlbums';

import styles from './AlbumsList.less';

function AlbumsList() {
	const { data, error, loading } = useFetchAlbums();
	if (error) return <p>{error}</p>;
	console.log(data);
	return !loading ? <ul className={styles.root} /> : null;
}

export default memo(AlbumsList);
