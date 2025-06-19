import { BaseField, BaseFieldProps, Options } from '../../types/field';

export type ToggleGroupFieldType = BaseField & {
	type: 'toggleGroup';
	options: Options;
};

export type ToggleGroupFieldProps = BaseFieldProps & {
	field: ToggleGroupFieldType;
};
