/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import {
	Fragment,
	useCallback,
	useEffect,
	useRef,
	useState,
} from '@wordpress/element';

/**
 * External dependencies
 */
import {
	DndContext,
	DragEndEvent,
	DragOverlay,
	DragStartEvent,
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
import { __ } from '@wordpress/i18n';
import clsx from 'clsx';
import Label from '../../components/label';
import { useQuickFields } from './hooks';
import { RepeaterItemHeader } from './RepeaterItemHeader';
import SortableItem from './sortable-item';
import {
	ButtonContainer,
	Container,
	ItemContainer,
	ItemHeader,
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
	const [ activeId, setActiveId ] = useState< number | null >( null );
	const [ overlayWidth, setOverlayWidth ] = useState< number | null >( null );
	const quickFields = useQuickFields( field );

	const ActionsComponent = field?.actions as unknown as
		| React.ComponentType< any >
		| undefined;

	const sensors = useSensors(
		useSensor( PointerSensor ),
		useSensor( KeyboardSensor )
	);

	const handleDragStart = useCallback( ( event: DragStartEvent ) => {
		const { active } = event;
		setActiveId( ( active.id as number ) ?? null );
		// Measure the active item's width to mirror in overlay
		const el = document.querySelector(
			`.repeater-item[data-id="${ String( active.id ) }"]`
		) as HTMLElement | null;
		if ( el ) {
			setOverlayWidth( el.getBoundingClientRect().width );
		}
	}, [] );

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
			setActiveId( null );
			setOverlayWidth( null );
		},
		[ attribute, setAttributes, attrKey ]
	);

	const handleDragCancel = useCallback( () => {
		setActiveId( null );
		setOverlayWidth( null );
	}, [] );

	const renderOverlay = useCallback( () => {
		if ( activeId === null ) return null;
		const activeItem = attribute.find( ( it: Item ) => it.id === activeId );
		if ( ! activeItem ) return null;
		return (
			<ItemContainer
				$dragging={ 1 }
				className={ clsx( 'repeater-item repeater-item--overlay', {
					'repeater-item--compact': !! quickFields,
				} ) }
				style={ overlayWidth ? { width: overlayWidth } : undefined }
			>
				<ItemHeader
					$fixed={ field?.fixed ? field.fixed.toString() : 'false' }
					className={ clsx( 'repeater-header', {
						'repeater-header--has-clone':
							field?.allowDuplication === undefined ||
							field?.allowDuplication,
						'repeater-top-header-active': field?.showHeader,
					} ) }
				>
					<RepeaterItemHeader
						item={ activeItem }
						field={ field }
						repeaterProps={ props }
						quickFields={ quickFields }
						setAttributes={ () => {} }
						actionsComponent={ ActionsComponent }
						isOverlay={ true }
					/>
				</ItemHeader>
			</ItemContainer>
		);
	}, [ activeId, attribute, quickFields, overlayWidth, field, props ] );

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
			{ props?.field?.label && (
				<StyledLabel className="repeater-label">
					{ /* @ts-ignore */ }
					<Label { ...props } />
				</StyledLabel>
			) }

			<Container
				className={ clsx( 'repeater-container', {
					'repeater-container-header-active': field.showHeader,
				} ) }
			>
				<DndContext
					sensors={ sensors }
					collisionDetection={ closestCenter }
					onDragStart={ handleDragStart }
					onDragEnd={ handleDragEnd }
					onDragCancel={ handleDragCancel }
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
								<Fragment key={ item.id }>
									{ field.showHeader &&
										Number( index ) === 0 &&
										field?.quickFields && (
											<div className="repeater-item-list__top">
												{ Object.keys(
													field?.quickFields as Record<
														string,
														any
													>
												).map( ( key ) => (
													<span
														className="repeater-item-list__top-field-title"
														key={ key }
													>
														{
															(
																field?.quickFields as any
															 )[ key ]?.label
														}
													</span>
												) ) }
												<span className="repeater-item-list__top-action">
													{ __(
														'Settings',
														'fields'
													) }
												</span>
											</div>
										) }
									<SortableItem
										item={ item }
										repeaterProps={ props }
										onRemove={ removeItem }
										onDuplicate={ duplicateItem }
										onToggleCollapse={ toggleCollapse }
										isDisabledRemove={ isDisabledRemove }
										isHeaderClickable={
											field?.isHeaderClickable
										}
									/>
								</Fragment>
							) ) }
						</ItemList>
						<DragOverlay dropAnimation={ null }>
							{ renderOverlay() }
						</DragOverlay>
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
