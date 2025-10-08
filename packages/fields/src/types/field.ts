import { CSSProperties } from 'react';
import { BorderFieldProps, BorderFieldType } from '../fields/border/types';
import { ColorsFieldProps, ColorsFieldType } from '../fields/colors/types';
import { GroupFieldProps, GroupFieldType } from '../fields/group/types';
import {
	ImageChoiceProps,
	ImageChoiceType,
} from '../fields/image-choice/types';
import { NoticeFieldProps, NoticeFieldType } from '../fields/notice/types';
import { NumberFieldProps, NumberFieldType } from '../fields/number/types';
import { PanelFieldProps, PanelFieldType } from '../fields/panel/types';
import { RadioFieldProps, RadioFieldType } from '../fields/radio/types';
import {
	RepeaterFieldProps,
	RepeaterFieldType,
} from '../fields/repeater/types';
import { RowFieldProps, RowFieldType } from '../fields/row/types';
import { SelectFieldProps, SelectFieldType } from '../fields/select/types';
import { SliderFieldProps, SliderFieldType } from '../fields/slider/types';
import { TabsFieldProps, TabsFieldType } from '../fields/tabs/types';
import { TextFieldProps, TextFieldType } from '../fields/text/types';
import {
	ToggleGroupFieldProps,
	ToggleGroupFieldType,
} from '../fields/toggle-group/types';

// Field types
export type FieldType =
	| 'tabs'
	| 'color'
	| 'colors'
	| 'checkbox'
	| 'border'
	| 'group'
	| 'dimension'
	| 'notice'
	| 'number'
	| 'panel'
	| 'radio'
	| 'select'
	| 'slider'
	| 'switch'
	| 'text'
	| 'toggleGroup'
	| 'repeater'
	| 'imageChoice'
	| 'row'
	| 'classicEditor';

export type Option = { label: string; value: string; description?: string };

// Options type used for select, radio, toggleGroup
export type Options< T = Option > =
	| Array< T >
	| ( ( attributes: Record< string, any > ) => Array< T > );

export type Device = 'desktop' | 'tablet' | 'mobile';

// Shared base for all fields
export type BaseField = {
	label: string;
	condition?: ( attributes: Record< string, any > ) => boolean;
	onChange?: ( props: FieldProps ) => void;
	disabled?: boolean | ( ( attributes: Record< string, any > ) => boolean );
	description?: string;
	className?: string;
	isResponsive?: boolean;
	isPro?: boolean;
	required?: boolean;
	style?: CSSProperties | undefined;
};

// All other field types (no options, no isMulti)
export type OtherFieldType = BaseField & {
	type:
		| 'color'
		| 'checkbox'
		| 'dimension'
		| 'slider'
		| 'switch'
		| 'classicEditor';
};

// Union of all field types
export type Field =
	| BorderFieldType
	| ColorsFieldType
	| GroupFieldType
	| NoticeFieldType
	| NumberFieldType
	| PanelFieldType
	| RadioFieldType
	| RepeaterFieldType
	| RowFieldType
	| SelectFieldType
	| SliderFieldType
	| TabsFieldType
	| TextFieldType
	| ToggleGroupFieldType
	| ImageChoiceType
	| OtherFieldType;

// Record of field config
export type FieldsType = Record< string, Field >;

export type FieldRootProps = {
	attributes: Record< string, any >;
	setAttributes: ( attributes: Record< string, any > ) => void;
	device?: Device;
	fields: FieldsType;
	metaData?: Record< string, any >;
	clientId?: string;
	placement?: 'left-start' | 'right-start';
	offset?: number;
	components?: Record< string, any >;
	isProAvailable?: boolean;
};
// Props shared across all fields
export type BaseFieldProps = FieldRootProps & {
	attrKey: string;
	field: Record< string, any >;
	components: Record< string, any >;
};

export type CommonFieldProps = BaseFieldProps & {
	field: OtherFieldType;
};

// Main FieldProps union
export type FieldProps =
	| BaseFieldProps
	| BorderFieldProps
	| ColorsFieldProps
	| GroupFieldProps
	| NoticeFieldProps
	| NumberFieldProps
	| PanelFieldProps
	| RadioFieldProps
	| RadioFieldProps
	| RepeaterFieldProps
	| RowFieldProps
	| SelectFieldProps
	| SliderFieldProps
	| TabsFieldProps
	| TextFieldProps
	| ToggleGroupFieldProps
	| ImageChoiceProps
	| CommonFieldProps;
