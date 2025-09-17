/**
 * Internal dependencies
 */
import { BaseField, BaseFieldProps, FieldsType } from '../../types/field';

/**
 * Represents an item in the repeater list.
 */
export type Item = {
	id: number;
	collapsed: boolean;
	[ key: string ]: any;
};

export type Index = {
	index: number;
};

export type RepeaterFieldType = BaseField & {
	type: 'repeater';
	fixed?: boolean;
	allowDuplication?: boolean;
	hideLabel?: boolean;
	showHeader?: boolean;
	labelField?: string;
	addButtonText?: boolean;
	preventEmpty?: boolean; // default: true
	fields: FieldsType;
	actions?: () => React.ReactElement;
	className?: string;
	showActionTooltip?: boolean;
};

export type RepeaterFieldProps = BaseFieldProps & {
	field: RepeaterFieldType;
	[ key: string ]: any;
};

export type SortableItemProps = {
	item: Item;
	onRemove: ( id: number ) => void;
	onDuplicate: ( id: number ) => void;
	onToggleCollapse: ( id: number ) => void;
	repeaterProps: RepeaterFieldProps;
	isDisabledRemove: boolean;
};

export type ActionsProps = {
	onDuplicate: ( id: number ) => void;
	onRemove: ( id: number ) => void;
	item: Item;
};

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