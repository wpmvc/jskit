/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { useCallback, useEffect, useRef, useState } from '@wordpress/element';

/**
 * External dependencies
 */
import {
	DndContext,
	DragEndEvent,
	KeyboardSensor,
	PointerSensor,
	closestCenter,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {
	restrictToFirstScrollableAncestor,
	restrictToVerticalAxis,
	restrictToWindowEdges,
} from '@dnd-kit/modifiers';
import {
	SortableContext,
	arrayMove,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';

/**
 * Internal dependencies
 */
import clsx from 'clsx';
import Label from '../../components/label';
import SortableItem from './sortable-item';
import {
	ButtonContainer,
	Container,
	ItemList,
	Label as StyledLabel,
} from './styles';
import { Index, Item, RepeaterFieldProps } from './types';
import { getMaxId } from './utils';

export default function Repeater( props: RepeaterFieldProps ) {
	const { field, attributes, attrKey, setAttributes } = props;
	
	const attribute = attributes[ attrKey ] ?? [];
	const itemListRef = useRef< HTMLDivElement >( null ); // Ref for the scrollable list
	const [ newItemAdded, setNewItemAdded ] = useState( false );

	const sensors = useSensors(
		useSensor( PointerSensor ),
		useSensor( KeyboardSensor )
	);

	const handleDragEnd = useCallback(
		( event: DragEndEvent ) => {
			const { active, over } = event;
			if ( ! over || active.id === over.id ) return;
			const oldIndex = attribute.findIndex(
				( item: Item ) => item.id === active.id
			);
			const newIndex = attribute.findIndex(
				( item: Item ) => item.id === over.id
			);
			const newAttributes = arrayMove( attribute, oldIndex, newIndex );
			setAttributes( { [ attrKey ]: newAttributes } );
		},
		[ attribute, setAttributes, attrKey ]
	);

	useEffect( () => {
		if ( newItemAdded && itemListRef.current ) {
			// Scroll to bottom of the list
			itemListRef.current.scrollTo( {
				top: itemListRef.current.scrollHeight,
				behavior: 'smooth',
			} );
			setNewItemAdded( false );
		}
	}, [ attribute, newItemAdded ] );

	const addItem = useCallback( () => {
		const newItem = {
			id: getMaxId( attribute ) + 1,
			label: 'New Item',
			value: Date.now(),
			collapsed: true,
		};
		const newAttributes = [ ...attribute, newItem ];
		setAttributes( { [ attrKey ]: newAttributes } );
		setNewItemAdded( true );
	}, [ attribute, setAttributes, attrKey ] );

	const isDisabledRemove =
		( undefined === field?.preventEmpty || field.preventEmpty ) &&
		attribute.length === 1;

	const removeItem = useCallback(
		( id: number ) => {
			if ( isDisabledRemove ) {
				return;
			}
			const newAttributes = attribute.filter(
				( item: Item ) => item.id !== id
			);
			setAttributes( { [ attrKey ]: newAttributes } );
		},
		[ attribute, setAttributes, attrKey, isDisabledRemove ]
	);

	const duplicateItem = useCallback(
		( id: number ) => {
			const itemToDuplicate = attribute.find(
				( item: Item ) => item.id === id
			);
			if ( itemToDuplicate ) {
				const newItem = {
					...itemToDuplicate,
					id: getMaxId( attribute ) + 1,
				};
				const newAttributes = [ ...attribute, newItem ];
				setAttributes( { [ attrKey ]: newAttributes } );
			}
		},
		[ attribute, setAttributes, attrKey ]
	);

	const toggleCollapse = useCallback(
		( id: number ) => {
			const newAttributes = attribute.map( ( item: Item ) =>
				item.id === id ? { ...item, collapsed: ! item.collapsed } : item
			);
			setAttributes( { [ attrKey ]: newAttributes } );
		},
		[ attribute, setAttributes, attrKey ]
	);

	return (
		<div className={ `components-base-field wpmvc-repeater-wrapper` }>
			<StyledLabel className="repeater-label">
				{ /* @ts-ignore */ }
				<Label { ...props } />
			</StyledLabel>
			<Container
				className={ clsx(
					'repeater-container',
					{'repeater-container-header-active':field.showHeader}
				) }
			>
				<DndContext
					sensors={ sensors }
					collisionDetection={ closestCenter }
					onDragEnd={ handleDragEnd }
					modifiers={ [
						restrictToVerticalAxis,
						restrictToWindowEdges,
						restrictToFirstScrollableAncestor,
					] }
				>
					<SortableContext
						items={ attribute }
						strategy={ verticalListSortingStrategy }
					>
						<ItemList
							className="repeater-item-list"
							ref={ itemListRef }
						>
							{ attribute.map( ( item: Item, index: Index ) => (
								<>
								{
									(field.showHeader && Number(index) === 0) &&
									<div className="repeater-item-list__top">
										{/* <span className="repeater-item-list__top-title">Title</span> */}
										{
											Object.keys(field.quickFields).map((key) => (
												<span className="repeater-item-list__top-field-title" key={key}>{field?.quickFields[key]?.label}</span>
											))
										}
										<span className="repeater-item-list__top-action">Settings</span>
									</div>
								}
								<SortableItem
									key={ item.id }
									item={ item }
									repeaterProps={ props }
									onRemove={ removeItem }
									onDuplicate={ duplicateItem }
									onToggleCollapse={ toggleCollapse }
									isDisabledRemove={ isDisabledRemove }
								/>
								</>
							) ) }
						</ItemList>
					</SortableContext>
				</DndContext>
				{ ! field?.fixed && (
					<ButtonContainer className="repeater-button-container">
						<Button
							onClick={ addItem }
							variant="tertiary"
							size="small"
						>
							{ field?.addButtonText
								? field.addButtonText
								: '+ ADD ITEM' }
						</Button>
					</ButtonContainer>
				) }
			</Container>
		</div>
	);
}
