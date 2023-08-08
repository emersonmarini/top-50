import AlbumsList from '@src/modules/AlbumsList/AlbumsList';

import styles from './App.less';

function App() {
	return (
		<section className={styles.main}>
			<h1 className={styles.h1}>Top 50 Albums</h1>
			<AlbumsList />
		</section>
	);
}

export default App;
