import { BaseField, BaseFieldProps, FieldsType } from '../../types/field';

export type PanelFieldType = BaseField & {
	type: 'panel';
	initialOpen?: boolean;
	fields: FieldsType;
};

export type PanelFieldProps = BaseFieldProps & {
	field: PanelFieldType;
};
