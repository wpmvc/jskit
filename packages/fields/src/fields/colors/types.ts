import { BaseField, BaseFieldProps } from '../../types/field';

export type ColorsFieldType = BaseField & {
	type: 'colors';
	items: { [ key: string ]: any };
	colors: any;
	insidePanel?: boolean;
};

export type ColorsFieldProps = BaseFieldProps & {
	field: ColorsFieldType;
};
