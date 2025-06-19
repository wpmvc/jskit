import { BaseField, BaseFieldProps, FieldsType } from '../../types/field';

export type GroupFieldType = BaseField & {
	type: 'group';
	fields: FieldsType;
	isRow?: boolean;
};

export type GroupFieldProps = BaseFieldProps & {
	field: GroupFieldType;
};
