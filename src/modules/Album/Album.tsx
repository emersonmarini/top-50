import { memo } from 'react';

import { Album as AlbumType } from '@src/@types/data';

import styles from './Album.less';

function Album({ children: album }: { children: AlbumType }) {
	if (!album) return null;

	return (
		<li className={styles.root}>
			<div>{album.Title}</div>
			<div>
				<img
					alt={`$Cover art for album: ${album.Name}`}
					src={album.Images[0].Url}
				/>
			</div>
			<div>{album.Artist}</div>
			<div>{album.Rights}</div>
			<div>{album.Price}</div>
		</li>
	);
}

export default memo(Album);
