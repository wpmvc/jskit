import { BaseField, BaseFieldProps } from '../../types/field';

/**
 * Types for the props of the Border component.
 */
export type BorderFieldType = BaseField & {
	type: 'border';
	options?: string[];
	insidePanel?: boolean;
};

export type BorderFieldProps = BaseFieldProps & {
	field: BorderFieldType;
};
