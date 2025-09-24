import { BaseField, BaseFieldProps, Options } from '../../types/field';

// Fields with required options
export type SelectFieldType = BaseField & {
	type: 'select';
	options: Options;
	isMulti?: boolean;
	menuPosition?: 'fixed' | 'absolute';
    optionsApi?: string;
    mapOptions?: (
        data: any,
        attributes: Record< string, any >
    ) => Array< { label: string; value: any } >;
    async?: boolean;
    searchParam?: string; // query key for search input, e.g., 'search' or 'q'
    minChars?: number; // minimum characters before requesting
    debounceMs?: number; // reserved for future debouncing
    defaultOptions?: boolean | Array< { label: string; value: any } >; // AsyncSelect defaultOptions
};

// Typed props for each specific field
export type SelectFieldProps = BaseFieldProps & {
	field: SelectFieldType;
	isMulti?: boolean;
};
