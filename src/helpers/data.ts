import { Album, Image, SourceEntry, SourceImage } from '@src/@types/data';

export function parseData(entries: SourceEntry[]): Album[] {
	if (!entries) throw 'Feed is empty';

	return entries.map((e: SourceEntry) => {
		const parsedEntry = {
			Id: e.id.attributes['im:id'] ?? undefined,
			Artist: e['im:artist'].label ?? undefined,
			Images: e['im:image'].map((i: SourceImage) => {
				return {
					Url: i.label ?? undefined,
					Height: i.attributes.height ?? undefined,
				} as Image;
			}),
			Name: e['im:name'].label ?? undefined,
			Price: e['im:price'].label ?? undefined,
			Rights: e.rights.label ?? undefined,
			Title: e.title.label ?? undefined,
		} as unknown;

		return parsedEntry;
	}) as Album[];
}
