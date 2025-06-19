import { BaseField, BaseFieldProps, FieldsType } from '../../types/field';

export type TabsFieldType = BaseField & {
	type: 'tabs';
	items: {
		[ key: string ]: {
			fields: FieldsType;
			icon?: JSX.Element;
			label: string;
		};
	};
};

export type TabsFieldProps = BaseFieldProps & {
	field: TabsFieldType;
};
