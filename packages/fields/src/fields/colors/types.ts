import { BaseField, BaseFieldProps } from '../../types/field';

export type ColorItem = {
	label: string;
	showByDefault?: boolean;
	isGradient?: boolean;
	colors: Record< string, { label: string } >;
};

export type ColorsFieldType = BaseField & {
	type: 'colors';
	items: Record< string, ColorItem >;
	colors: any;
	insidePanel?: boolean;
};

export type ColorsFieldProps = BaseFieldProps & {
	field: ColorsFieldType;
};
