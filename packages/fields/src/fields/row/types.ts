import { BaseField, BaseFieldProps, FieldsType } from '../../types/field';

export type RowFieldType = BaseField & {
	type: 'row';
	fields: FieldsType;
};

export type RowFieldProps = BaseFieldProps & {
	field: RowFieldType;
};
