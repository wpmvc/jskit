import { BaseField, BaseFieldProps, Options } from '../../types/field';

export type RadioFieldType = BaseField & {
	type: 'radio';
	options: Options;
};

export type RadioFieldProps = BaseFieldProps & {
	field: RadioFieldType;
};
