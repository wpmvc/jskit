import {
	BaseField,
	BaseFieldProps,
	Option as BaseOption,
	FieldsType,
	Options,
} from '../../types/field';

type Option = BaseOption & {
	fields?: FieldsType;
};

type Field = BaseField & {
	type: 'radio';
	variation?: 'normal';
	options: Options;
};

type BoxedRadioFieldType = BaseField & {
	type: 'radio';
	variation: 'boxed';
	perRow?: number;
	options: Options< Option >;
};

export type RadioFieldType = Field | BoxedRadioFieldType;

export type RadioFieldProps = BaseFieldProps & {
	field: RadioFieldType;
};
