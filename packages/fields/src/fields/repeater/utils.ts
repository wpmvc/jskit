/**
 * Internal dependencies
 */
import { Item, RepeaterFieldType } from './types';

/**
 * Gets the maximum ID from an array of items
 */
export function getMaxId( attribute: Item[] ) {
	return attribute.reduce(
		( max: number, item: Item ) => ( item.id > max ? item.id : max ),
		0
	);
}

export function getItemLabel(
	field: RepeaterFieldType,
	item: Item
): string | null {
	if ( field?.hideLabel ) return null;
	const key = field?.labelField ?? 'defaultField';
	return ( item[ key ] ?? `Item #${ item.id }` ) as string;
}
