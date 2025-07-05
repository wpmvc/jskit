import { useEffect, useMemo } from '@wordpress/element';
import { useColors } from './hooks';
import registerColorsStore from './store';
import { ColorPalette, ColorPaletteOverride } from './store/types';
import { dispatch } from '@wordpress/data';

function generateCSSVariables(
	colors: ColorPalette,
	prefix = 'wpmvc',
	parentKey = ''
): string {
	let css = '';
	for ( const key in colors ) {
		// @ts-ignore
		const value = colors[ key ];

		if ( typeof value === 'string' ) {
			const varName = `--${ prefix }-${ parentKey }${ key }`;
			css += `${ varName }: ${ value };\n`;
		} else if ( typeof value === 'object' ) {
			css += generateCSSVariables(
				value,
				prefix,
				`${ parentKey }${ key }-`
			);
		}
	}

	return css;
}

type ColorVariablesProps = {
	colors?: ColorPaletteOverride;
};

export default function ColorVariables( { colors }: ColorVariablesProps ) {
	registerColorsStore();

	const storeColors = useColors();

	const css = useMemo( () => {
		return generateCSSVariables( storeColors );
	}, [ storeColors ] );

	useEffect( () => {
		if ( colors ) {
			(
				dispatch( 'wpmvc/colors' ) as {
					setColors: ( colors: ColorPaletteOverride ) => void;
				}
			 ).setColors( colors );
		}
	}, [ colors ] );

	const style = {
		__html: `:root {\n${ css }}`,
	};

	return <style id="wpmvc-color-vars" dangerouslySetInnerHTML={ style } />;
}
