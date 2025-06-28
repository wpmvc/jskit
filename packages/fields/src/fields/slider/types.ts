import { BaseField, BaseFieldProps } from '../../types/field';

export type SliderFieldType = BaseField & {
	type: 'slider';
	unit?: boolean;
	customUnits?: string[];
	min?: number;
	max?: number;
};

export type SliderFieldProps = BaseFieldProps & {
	field: SliderFieldType;
};
