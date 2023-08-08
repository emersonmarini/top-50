// The data contains several other fields, but for the purpose of this demo
// we're extracting just what's considered relevant for now.

// Data source types:
// These types represent the data as they're present in the feed
export type SourceLabel = {
	label: string;
};

export type SourceArtist = SourceLabel;

export type SourceImageAttributes = {
	height: number;
};

export type SourceImage = {
	attributes: SourceImageAttributes;
} & SourceLabel;

export type SourceName = SourceLabel;

export type SourcePrice = SourceLabel;

export type SourceReleaseDateAttributes = SourceLabel;

export type SourceReleaseDate = {
	attributes: SourceReleaseDateAttributes;
};

export type SourceRights = SourceLabel;

export type SourceTitle = SourceLabel;

export type SourceEntry = {
	'im:artist': SourceArtist;
	'im:image': SourceImage[];
	'im:name': SourceName;
	'im:price': SourcePrice;
	rights: SourceRights;
	title: SourceTitle;
};

// Display types:
// These types represent the data as it's displayed - ie: simplified.

export type Image = {
	Url?: string;
	Height?: number;
};

export type Album = {
	Artist?: string;
	Images: Image[];
	Name?: string;
	Price?: string;
	Rights?: string;
};
