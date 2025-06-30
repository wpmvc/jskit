import {
	BaseField,
	BaseFieldProps,
	Option as BaseOption,
	FieldsType,
	Options,
} from '../../types/field';

export type Option = BaseOption & {
	fields?: FieldsType;
};

type Field = BaseField & {
	type: 'radio';
	variation?: 'normal';
	options: Options | ( ( attributes: Record< string, any > ) => Options );
};

type BoxedRadioFieldType = BaseField & {
	type: 'radio';
	variation: 'boxed';
	perRow?: number;
	options:
		| Options< Option >
		| ( ( attributes: Record< string, any > ) => Options< Option > );
};

export type RadioFieldType = Field | BoxedRadioFieldType;

export type RadioFieldProps = BaseFieldProps & {
	field: RadioFieldType;
};
