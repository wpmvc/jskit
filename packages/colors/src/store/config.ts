import colors from './colors';
import { ColorPalette } from './types';

const DEFAULT_STATE: ColorPalette = {
	primary: colors.primary,
	secondary: colors.secondary,
	success: colors.success,
	warning: colors.warning,
	danger: colors.danger,
	gray: colors.gray,
	background: colors.background,
	text: colors.text,
};

export default function getConfig() {
	return {
		reducer( state = DEFAULT_STATE, action: any ) {
			switch ( action.type ) {
				case 'SET_COLORS':
					return {
						...state,
						colors: {
							...state,
							...Object.fromEntries(
								Object.entries( action.payload ).map(
									( [ group, value ] ) => [
										group,
										{
											...( state as any )[ group ],
											...( value as object ),
										},
									]
								)
							),
						},
					};
				default:
					return state;
			}
		},
		actions: {
			setColors( overrides: Partial< ColorPalette > ) {
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
