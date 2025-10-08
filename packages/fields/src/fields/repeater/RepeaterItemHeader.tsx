import { Tooltip } from '@wordpress/components';
import { Icon, copy, dragHandle, trash } from '@wordpress/icons';
import clsx from 'clsx';
import { PrivateFields } from '..';
import {
	Action,
	ItemHeaderActions,
	ItemHeaderContent,
	SortButton,
} from './styles';
import { RepeaterItemHeaderProps } from './types';
import { getItemLabel } from './utils';

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
		onToggleCollapse,
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
						<Action
							className="edit"
							onClick={ ( e: any ) => e.stopPropagation() }
						>
							<ActionsComponent
								onDuplicate={
									isOverlay
										? () => {}
										: ( id: number ) => onDuplicate?.( id )
								}
								onRemove={
									isOverlay
										? () => {}
										: ( id: number ) => onRemove?.( id )
								}
								onToggleCollapse={
									isOverlay
										? () => {}
										: ( id: number ) =>
												onToggleCollapse?.( id )
								}
								item={ item }
							/>
						</Action>
					</ItemHeaderActions>
				) }

				{ ! field?.fixed && ! ActionsComponent && (
					<ItemHeaderActions className="header-actions">
						{ ( undefined === field?.allowDuplication ||
							field.allowDuplication ) && (
							<Action
								onClick={ ( event: any ) => {
									event.stopPropagation();
									if ( ! isOverlay ) onDuplicate?.( item.id );
								} }
								className="copy"
							>
								<Icon icon={ copy } />
							</Action>
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
								onClick={ ( event: any ) => {
									event.stopPropagation();
									if ( ! isOverlay && ! isDisabledRemove )
										onRemove?.( item.id );
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
	);
}
