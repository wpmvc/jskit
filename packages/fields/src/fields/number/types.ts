import { BaseField, BaseFieldProps } from '../../types/field';

export type NumberFieldType = BaseField & {
	type: 'number';
	precision?: boolean;
	min?: number;
	max?: number;
};

export type NumberFieldProps = BaseFieldProps & {
	field: NumberFieldType;
};
