import colors from './colors';
import { ColorPalette, ColorPaletteOverride } from './types';

function generateColorVariations( baseColor: string ) {
	const steps = {
		50: `color-mix(in srgb, ${ baseColor } 10%, white)`,
		100: `color-mix(in srgb, ${ baseColor } 20%, white)`,
		200: `color-mix(in srgb, ${ baseColor } 30%, white)`,
		300: `color-mix(in srgb, ${ baseColor } 40%, white)`,
		400: `color-mix(in srgb, ${ baseColor } 60%, white)`,
		500: baseColor,
		600: `color-mix(in srgb, ${ baseColor } 90%, black)`,
		700: `color-mix(in srgb, ${ baseColor } 80%, black)`,
		800: `color-mix(in srgb, ${ baseColor } 70%, black)`,
		900: `color-mix(in srgb, ${ baseColor } 60%, black)`,
	};

	return steps;
}

export default function getConfig() {
	const DEFAULT_STATE: ColorPalette = {
		primary: generateColorVariations( colors.primary ),
		secondary: generateColorVariations( colors.secondary ),
		success: generateColorVariations( colors.success ),
		warning: generateColorVariations( colors.warning ),
		error: generateColorVariations( colors.error ),
		gray: generateColorVariations( colors.gray ),
		background: colors.background,
		text: colors.text,
	};

	return {
		reducer(
			state = DEFAULT_STATE,
			action: { type: string; payload?: ColorPaletteOverride }
		) {
			switch ( action.type ) {
				case 'SET_COLORS': {
					const generated: Partial< ColorPalette > = {};

					for ( const [ group, value ] of Object.entries(
						action.payload || {}
					) ) {
						if ( group in state ) {
							const key = group as keyof ColorPalette;

							if ( typeof value === 'string' ) {
								// Generate variations if it's a base color
								//@ts-ignore
								generated[ key ] =
									generateColorVariations( value );
							} else if ( typeof value === 'object' ) {
								// Merge with existing shades
								//@ts-ignore
								generated[ key ] = {
									...state[ key ],
									...value,
								};
							}
						}
					}

					return {
						...state,
						...generated,
					};
				}
				default:
					return state;
			}
		},

		actions: {
			setColors( overrides: ColorPaletteOverride ) {
				return {
					type: 'SET_COLORS',
					payload: overrides,
				};
			},
		},

		selectors: {
			getColors( state = DEFAULT_STATE ) {
				return state;
			},
		},
	};
}
