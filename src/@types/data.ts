// The data contains several other fields, but for the purpose of this demo
// we're extracting just what's considered relevant for now.

export type Label = {
	Label: string;
};

export type Artist = Label;

export type ImageAttributes = {
	Height: number;
};

export type Image = {
	Attributes: ImageAttributes;
} & Label;

export type Name = Label;

export type PriceAttributes = {
	Amount: number;
	Currency: string;
};

export type Price = {
	Attributes: PriceAttributes;
} & Label;

export type ReleaseDateAttributes = Label;

export type ReleaseDate = {
	Attributes: ReleaseDateAttributes;
};

export type Rights = Label;

export type Entry = {
	Artist: Artist;
	Image: Image[];
	Name: Name;
	Price: Price;
	Rights: Rights;
};

export type Data = {
	Entries: Entry[];
};
