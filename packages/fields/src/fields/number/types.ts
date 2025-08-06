import { LabelPosition } from '@wordpress/components/build-types/input-control/types';
import { BaseField, BaseFieldProps } from '../../types/field';

export type NumberFieldType = BaseField & {
	type: 'number';
	precision?: boolean;
	min?: number | ((attributes: Record<string, any>) => number);
	max?: number | ((attributes: Record<string, any>) => number);
	labelPosition?: LabelPosition;
};

export type NumberFieldProps = BaseFieldProps & {
	field: NumberFieldType;
};
