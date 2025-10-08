/**
 * WordPress dependencies
 */
import { memo } from '@wordpress/element';

/**
 * External dependencies
 */
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import { findIndex, isEmpty, isFunction, isPlainObject } from 'lodash';

/**
 * Internal dependencies
 */
import { PrivateFields } from '..';
import { useQuickFields } from './hooks';
import { RepeaterItemHeader } from './RepeaterItemHeader';
import { ItemContainer, ItemHeader } from './styles';
import { ActionsProps, SortableItemProps } from './types';

const SortableItem = ( {
	item,
	onRemove,
	onDuplicate,
	onToggleCollapse,
	repeaterProps,
	isDisabledRemove,
	isHeaderClickable = true,
}: SortableItemProps ) => {
	const {
		attributes: dragAttributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable( { id: item.id } );

	const { attrKey, attributes, field, setAttributes } = repeaterProps;
	const attribute = attributes[ attrKey ];
	const itemIndex = findIndex( attribute, { id: item.id } );
	const quickFields = useQuickFields( field );

	const ActionsComponent = field?.actions as unknown as
		| React.ComponentType< ActionsProps >
		| undefined;

	const updateAttributes = ( newAttributes: any ) => {
		const updatedValues = [ ...attribute ];
		updatedValues[ itemIndex ] = {
			...updatedValues[ itemIndex ],
			...newAttributes,
		};
		setAttributes( { [ attrKey ]: updatedValues } );

		if ( field?.onChange ) {
			field.onChange( {
				...repeaterProps,
				updatedValues,
				repeaterIndex: itemIndex,
			} );
		}
	};

	return (
		<ItemContainer
			ref={ setNodeRef }
			style={ {
				transform: CSS.Transform.toString( transform ),
				transition,
				// opacity: isDragging ? 0 : undefined,
			} }
			$dragging={ isDragging ? 1 : 0 }
			className={ clsx( 'repeater-item', {
				'repeater-item--compact': field?.quickFields,
				'repeater-item--dragging': isDragging,
			} ) }
			data-id={ item.id }
		>
			<ItemHeader
				$fixed={ field?.fixed ? field.fixed.toString() : 'false' }
				onClick={
					isHeaderClickable
						? ( e ) => {
								e.preventDefault();
								onToggleCollapse( item.id );
						  }
						: undefined
				}
				className={ clsx( 'repeater-header', {
					'repeater-header--has-clone':
						field?.allowDuplication === undefined ||
						field?.allowDuplication,
					'repeater-top-header-active': field?.showHeader,
				} ) }
			>
				<RepeaterItemHeader
					item={ attribute[ itemIndex ] }
					field={ field }
					repeaterProps={ repeaterProps }
					quickFields={ quickFields }
					setAttributes={ updateAttributes }
					actionsComponent={ ActionsComponent }
					onDuplicate={ onDuplicate }
					onRemove={ onRemove }
					onToggleCollapse={ onToggleCollapse }
					isDisabledRemove={ isDisabledRemove }
					dragListeners={ listeners }
					dragAttributes={ dragAttributes }
				/>
			</ItemHeader>

			{ ( () => {
				// Check if fields are missing
				if ( ! field?.fields ) return false;

				// Get fields object (either from function call or direct object)
				const fieldsObject = isFunction( field.fields )
					? field.fields( attribute[ itemIndex ] )
					: field.fields;

				// Validate fields object is a non-empty plain object
				return (
					isPlainObject( fieldsObject ) &&
					! isEmpty( fieldsObject ) &&
					! item.collapsed
				);
			} )() && (
				<div
					style={ {
						padding: '15px 25px',
						borderTop: '1px solid #e0e0e0',
					} }
					className="repeater-item-content"
				>
					<PrivateFields
						{ ...repeaterProps }
						attributes={ attribute[ itemIndex ] }
						setAttributes={ updateAttributes }
						fields={
							isFunction( field.fields )
								? field?.fields( attribute[ itemIndex ] )
								: field?.fields
						}
					/>
				</div>
			) }
		</ItemContainer>
	);
};

// Create a named export with explicit typing
export const MemoizedSortableItem = memo(
	SortableItem
) as React.NamedExoticComponent< SortableItemProps >;

// Keep default export for backward compatibility
export default MemoizedSortableItem;
