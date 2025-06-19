/**
 * Internal dependencies
 */
import { Item } from './types';

/**
 * Gets the maximum ID from an array of items
 */
export function getMaxId( attribute: Item[] ) {
	return attribute.reduce(
		( max: number, item: Item ) => ( item.id > max ? item.id : max ),
		0
	);
}

/**
 * Splits fields into header and body fields
 */
export function splitFields(
	fields: Record< string, any >,
	showFieldInHeader?: boolean
) {
	const [ firstKey, ...restKeys ] = Object.keys( fields );
	return showFieldInHeader
		? {
				headerFields: { [ firstKey ]: fields[ firstKey ] },
				bodyFields: Object.fromEntries(
					Object.entries( fields ).slice( 1 )
				),
		  }
		: { headerFields: {}, bodyFields: fields };
}
