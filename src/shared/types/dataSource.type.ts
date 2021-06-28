export type DataSource<T = unknown> = {
	label?: string;
	value?: T;
	[key: string]: any;
}