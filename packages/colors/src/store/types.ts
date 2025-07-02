export type RGBA =
	| `rgba(${ number }, ${ number }, ${ number }, ${ number })`
	| string;

export type Shade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

type StandardShades = Record< Shade, RGBA >;

export type ColorPalette = {
	primary: StandardShades;
	secondary: StandardShades;
	success: StandardShades;
	warning: StandardShades;
	danger: StandardShades;
	gray: StandardShades;
	background: {
		light: RGBA;
		dark: RGBA;
	};
	text: {
		light: RGBA;
		dark: RGBA;
		muted: RGBA;
	};
};

export type ColorPaletteOverride = {
	[ K in keyof ColorPalette ]?: string | Partial< Record< string, RGBA > >;
};
