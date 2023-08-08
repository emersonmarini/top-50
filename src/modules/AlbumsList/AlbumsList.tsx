import { memo } from 'react';

import { useFetchAlbums } from '@hooks/useFetchAlbums';

import Album from '@src/modules/Album';

import styles from './AlbumsList.less';

function AlbumsList() {
	const { data, loading } = useFetchAlbums();
	// TODO: Display a spinner when loading and display a friendly message when data isn't available.
	if (!data || loading) return null;

	return (
		<ul className={styles.root}>
			{data.map((a) => {
				return <Album key={a.Id}>{a}</Album>;
			})}
		</ul>
	);
}

export default memo(AlbumsList);
