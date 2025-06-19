/**
 * WordPress dependencies
 */
import { memo } from '@wordpress/element';
import { Icon, copy, trash } from '@wordpress/icons';
import { Tooltip } from '@wordpress/components';

/**
 * External dependencies
 */
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { findIndex, isEmpty } from 'lodash';
import clsx from 'clsx';

/**
 * Internal dependencies
 */
import { PrivateFields } from '..';
import { SortableItemProps } from './types';
import { splitFields } from './utils';
import {
	Action,
	ItemContainer,
	ItemHeader,
	ItemHeaderActions,
	ItemHeaderContent,
	SortButton,
} from './styles';

const SortableItem = ( {
	item,
	onRemove,
	onDuplicate,
	onToggleCollapse,
	repeaterProps,
	isDisabledRemove,
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

	const { headerFields, bodyFields } = splitFields(
		field.fields as Record< string, any >,
		field?.showFieldInHeader
	);

	return (
		<ItemContainer
			ref={ setNodeRef }
			style={ {
				transform: CSS.Transform.toString( transform ),
				transition,
			} }
			$dragging={ isDragging ? 1 : 0 }
			className={ clsx( 'repeater-item', {
				'repeater-item--compact': field?.showFieldInHeader,
			} ) }
		>
			<ItemHeader
				$fixed={ field?.fixed ? field.fixed.toString() : 'false' }
				onClick={ () => onToggleCollapse( item.id ) }
				className={ clsx( 'repeater-header', {
					'repeater-header--has-clone':
						field?.allowDuplication === undefined ||
						field?.allowDuplication,
				} ) }
			>
				<ItemHeaderContent className="repeater-header-content">
					<SortButton
						{ ...listeners }
						{ ...dragAttributes }
						className="repeater-sort-button"
					>
						<span className="dashicons dashicons-move"></span>
					</SortButton>
					<span className="repeater-item-label">
						{ ! field?.hideLabel &&
							( item[ field?.labelField ?? 'defaultField' ] ??
								`Item #${ item.id }` ) }
						{ field?.showFieldInHeader && (
							<PrivateFields
								{ ...repeaterProps }
								attributes={ attribute[ itemIndex ] }
								setAttributes={ updateAttributes }
								fields={ headerFields }
							/>
						) }
					</span>
				</ItemHeaderContent>
				{ field?.actions && (
					<ItemHeaderActions className="header-actions">
						<Action className="edit">
							<field.actions />
						</Action>
					</ItemHeaderActions>
				) }
				{ ! field?.fixed && ! field?.actions && (
					<ItemHeaderActions className="header-actions">
						{ ( undefined === field?.allowDuplication ||
							field.allowDuplication ) && (
							<Tooltip
								text={
									field?.showActionTooltip
										? 'Duplicate Item'
										: ''
								}
								delay={ 0 }
							>
								<Action
									onClick={ ( event ) => {
										event.stopPropagation();
										onDuplicate( item.id );
									} }
									className="copy"
								>
									<Icon icon={ copy } />
								</Action>
							</Tooltip>
						) }
						<Tooltip
							text={
								field?.showActionTooltip && ! isDisabledRemove
									? 'Delete Item'
									: ''
							}
							delay={ 0 }
							placement="bottom-end"
							className="tooltip-bottom-end"
						>
							<Action
								onClick={ ( event ) => {
									event.stopPropagation();
									onRemove( item.id );
								} }
								className={ clsx( 'remove', {
									disabled: isDisabledRemove,
								} ) }
							>
								<Icon icon={ trash } />
							</Action>
						</Tooltip>
					</ItemHeaderActions>
				) }
			</ItemHeader>
			{ ! isEmpty( bodyFields ) && ! item.collapsed && (
				<div
					style={ {
						padding: 10,
						borderTop: '1px solid #e0e0e0',
					} }
					className="repeater-item-content"
				>
					<PrivateFields
						{ ...repeaterProps }
						attributes={ attribute[ itemIndex ] }
						setAttributes={ updateAttributes }
						fields={ bodyFields }
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
