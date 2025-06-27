import { useMemo } from '@wordpress/element';
import { useColors } from './hooks';
import { ColorPalette } from './store/types';
import registerColorsStore from './store';

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

export default function ColorVariables() {
	registerColorsStore();

	const colors = useColors();

	const css = useMemo( () => {
		return generateCSSVariables( colors );
	}, [ colors ] );

	const style = {
		__html: `:root {\n${ css }}`,
	};

	return <style id="wpmvc-color-vars" dangerouslySetInnerHTML={ style } />;
}
