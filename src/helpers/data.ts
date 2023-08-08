import { Data, Entry } from '@src/@types/data';

export function parseData(entries: any): Data {
	if (!entries) throw 'Feed is empty';

	const parsedEntries: Entry[] = entries.map((e: any) => {
		return {
			Entry: {
				Artist: e['im:artist'],
				Image: e['im:image'],
				Name: e['im:name'],
				Price: e['im:price'],
				Rights: e['rights'],
			},
		};
	});

	return { Entries: parsedEntries };
}
