import { BaseField, BaseFieldProps, Options } from '../../types/field';

// Fields with required options
export type SelectFieldType = BaseField & {
	type: 'select';
	options: Options;
	isMulti?: boolean;
};

// Typed props for each specific field
export type SelectFieldProps = BaseFieldProps & {
	field: SelectFieldType;
	isMulti?: boolean;
};
