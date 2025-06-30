/**
 * WordPress dependencies
 */
import { useCallback, useEffect, useRef, useState } from '@wordpress/element';
import { Button } from '@wordpress/components';

/**
 * External dependencies
 */
import {
	DndContext,
	closestCenter,
	useSensor,
	useSensors,
	PointerSensor,
	KeyboardSensor,
	DragEndEvent,
} from '@dnd-kit/core';
import {
	SortableContext,
	verticalListSortingStrategy,
	arrayMove,
} from '@dnd-kit/sortable';
import {
	restrictToVerticalAxis,
	restrictToWindowEdges,
	restrictToFirstScrollableAncestor,
} from '@dnd-kit/modifiers';

/**
 * Internal dependencies
 */
import Label from '../../components/label';
import SortableItem from './sortable-item';
import { getMaxId } from './utils';
import { Item, RepeaterFieldProps } from './types';
import {
	ButtonContainer,
	Container,
	ItemList,
	Label as StyledLabel,
} from './styles';

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
			<Container className="repeater-container">
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
							{ attribute.map( ( item: Item ) => (
								<SortableItem
									key={ item.id }
									item={ item }
									repeaterProps={ props }
									onRemove={ removeItem }
									onDuplicate={ duplicateItem }
									onToggleCollapse={ toggleCollapse }
									isDisabledRemove={ isDisabledRemove }
								/>
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
