/**
 * WordPress dependencies
 */
import { Tooltip } from '@wordpress/components';
import { memo } from '@wordpress/element';
import { Icon, copy, dragHandle, trash } from '@wordpress/icons';

/**
 * External dependencies
 */
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import { findIndex } from 'lodash';

/**
 * Internal dependencies
 */
import { PrivateFields } from '..';
import {
	Action,
	ItemContainer,
	ItemHeader,
	ItemHeaderActions,
	ItemHeaderContent,
	SortButton,
} from './styles';
import { ActionsProps, SortableItemProps } from './types';

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
	let quickFields = field?.quickFields;
	if ( field?.showHeader && quickFields && ! Array.isArray( quickFields ) ) {
		quickFields = Object.fromEntries(
			Object.entries( quickFields as Record< string, any > ).map(
				( [ key, config ] ) => {
					const { label: _omitLabel, ...restConfig } = config || {};
					return [ key, restConfig ];
				}
			)
		) as typeof quickFields;
	}

	const ActionsComponent = ( field?.actions as unknown ) as
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
			} }
			$dragging={ isDragging ? 1 : 0 }
			className={ clsx( 'repeater-item', {
				'repeater-item--compact': field?.quickFields,
				'repeater-item--dragging': isDragging,
			} ) }
		>
			<ItemHeader
				$fixed={ field?.fixed ? field.fixed.toString() : 'false' }
				onClick={ () => onToggleCollapse( item.id ) }
				className={ clsx( 'repeater-header', {
					'repeater-header--has-clone':
						field?.allowDuplication === undefined ||
						field?.allowDuplication,
					'repeater-top-header-active': field?.showHeader
				} ) }
			>
				<ItemHeaderContent className="repeater-header-content">
					<div className="repeater-header-content__inner">
						<span className="repeater-item-label">
							<SortButton
								{ ...listeners }
								{ ...dragAttributes }
								className="repeater-sort-button"
							>
								<Icon icon={ dragHandle } />
							</SortButton>
							{ ! field?.hideLabel &&
								( <span> {item[ field?.labelField ?? 'defaultField' ] ??
									`Item #${ item.id }`} </span>) }
						</span>
					
						{ quickFields && (
							<PrivateFields
								{ ...repeaterProps }
								attributes={ attribute[ itemIndex ] }
								setAttributes={ updateAttributes }
								fields={ quickFields }
							/>
						) }
						{ ActionsComponent && (
							<ItemHeaderActions className="header-actions">
								<Action className="edit">
									<ActionsComponent onDuplicate={ onDuplicate } onRemove={ onRemove } item={ item } />
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
					</div>
				</ItemHeaderContent>
				
			</ItemHeader>
			{ ( field.fields && ! item.collapsed ) && (
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
						fields={ field?.fields }
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
