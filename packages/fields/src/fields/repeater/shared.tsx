import { useMemo } from '@wordpress/element';
import { Icon, copy, dragHandle, trash } from '@wordpress/icons';
import clsx from 'clsx';
import { PrivateFields } from '..';
import { Action, ItemHeaderActions, ItemHeaderContent, SortButton } from './styles';
import { ActionsProps, Item, RepeaterFieldProps, RepeaterFieldType } from './types';

export function getItemLabel( field: RepeaterFieldType, item: Item ): string | null {
	if ( field?.hideLabel ) return null;
	const key = field?.labelField ?? 'defaultField';
	return ( item[ key ] ?? `Item #${ item.id }` ) as string;
}

export function useQuickFields( field?: RepeaterFieldType & { quickFields?: any; showHeader?: boolean } ) {
	return useMemo( () => {
		const quickFields = ( field as any )?.quickFields as any;
		// Do not strip label; return as-is for header rendering consistency
		return quickFields;
	}, [ field ] );
}

export type RepeaterItemHeaderProps = {
	item: Item;
	field: RepeaterFieldType;
	repeaterProps: RepeaterFieldProps;
	quickFields?: any;
	setAttributes: ( attrs: any ) => void;
	actionsComponent?: React.ComponentType< ActionsProps >;
	onDuplicate?: ( id: number ) => void;
	onRemove?: ( id: number ) => void;
	isDisabledRemove?: boolean;
	isOverlay?: boolean;
	dragAttributes?: any;
	dragListeners?: any;
};

export function RepeaterItemHeader( props: RepeaterItemHeaderProps ) {
	const {
		item,
		field,
		repeaterProps,
		quickFields,
		setAttributes,
		actionsComponent: ActionsComponent,
		onDuplicate,
		onRemove,
		isDisabledRemove,
		isOverlay,
		dragAttributes,
		dragListeners,
	} = props;

	return (
		<ItemHeaderContent className="repeater-header-content">
			<div className="repeater-header-content__inner">
				<span className="repeater-item-label">
					<SortButton
						{ ...( dragListeners || {} ) }
						{ ...( dragAttributes || {} ) }
						className="repeater-sort-button"
					>
						<Icon icon={ dragHandle } />
					</SortButton>
					{ getItemLabel( field, item ) && (
						<span>{ getItemLabel( field, item ) }</span>
					) }
				</span>

				{ quickFields && (
					<PrivateFields
						{ ...repeaterProps }
						attributes={ item }
						setAttributes={ setAttributes }
						fields={ quickFields }
					/>
				) }

				{ ActionsComponent && (
					<ItemHeaderActions className="header-actions">
						<Action className="edit" onClick={ ( e: any ) => e.stopPropagation() }>
							<ActionsComponent
								onDuplicate={ isOverlay ? () => {} : ( id: number ) => onDuplicate?.( id ) }
								onRemove={ isOverlay ? () => {} : ( id: number ) => onRemove?.( id ) }
								item={ item }
							/>
						</Action>
					</ItemHeaderActions>
				) }

				{ ! field?.fixed && ! ActionsComponent && (
					<ItemHeaderActions className="header-actions">
						<Action
							onClick={ ( event: any ) => {
								event.stopPropagation();
								if ( ! isOverlay ) onDuplicate?.( item.id );
							} }
							className="copy"
						>
							<Icon icon={ copy } />
						</Action>
						<Action
							onClick={ ( event: any ) => {
								event.stopPropagation();
								if ( ! isOverlay && ! isDisabledRemove ) onRemove?.( item.id );
							} }
							className={ clsx( 'remove', { disabled: isDisabledRemove } ) }
						>
							<Icon icon={ trash } />
						</Action>
					</ItemHeaderActions>
				) }
			</div>
		</ItemHeaderContent>
	);
}
