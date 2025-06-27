export type RGBA =
	| `rgba(${ number }, ${ number }, ${ number }, ${ number })`
	| string;

type Shade =
	| '50'
	| '100'
	| '200'
	| '300'
	| '400'
	| '500'
	| '600'
	| '700'
	| '800'
	| '900';

export type ColorPalette = {
	primary: Record< Shade, RGBA >;
	secondary: Record< Shade, RGBA >;
	success: Record< '100' | '200' | '500' | '700', RGBA >;
	warning: Record< '100' | '200' | '500' | '700', RGBA >;
	danger: Record< '100' | '200' | '500' | '700', RGBA >;
	gray: Record< Shade, RGBA >;
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
