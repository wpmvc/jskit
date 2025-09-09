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
