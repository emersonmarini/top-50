import axios from 'axios';
import { useEffect, useState } from 'react';

import { parseData } from '@helpers/data';

import { Album } from '@src/@types/data';

const useFetchAlbums = (): {
	loading: boolean;
	error: string | null;
	data: Album[];
} => {
	const [loading, setLoading] = useState<boolean>(false);
	const [data, setData] = useState<any>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		setLoading(true);

		const fetchData = async () => {
			try {
				const response = await axios.get(
					'https://itunes.apple.com/us/rss/topalbums/limit=50/json',
				);

				const data = parseData(response?.data.feed.entry);
				setData(data);
			} catch (error: any) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		void fetchData().then((r) => r);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { loading, error, data };
};

export { useFetchAlbums };
