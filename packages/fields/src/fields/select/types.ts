import { BaseField, BaseFieldProps, Options } from '../../types/field';

// Fields with required options
export type SelectFieldType = BaseField & {
	type: 'select';
	options: Options;
	isMulti?: boolean;
	menuPosition?: 'fixed' | 'absolute';
	optionsApi?: string | ( ( attributes: Record< string, any > ) => string );
	onFetchSuccess?: ( options: Options ) => void;
	select?: {
		className?: string;
		classNamePrefix?: string;
		styles?: any;
	};
};

// Typed props for each specific field
export type SelectFieldProps = BaseFieldProps & {
	field: SelectFieldType;
	isMulti?: boolean;
};
