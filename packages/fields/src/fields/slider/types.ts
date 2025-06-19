import { BaseField, BaseFieldProps } from '../../types/field';

export type SliderFieldType = BaseField & {
	type: 'slider';
	max?: number;
	min?: number;
};

export type SliderFieldProps = BaseFieldProps & {
	field: SliderFieldType;
};
