type Option = { label: string; value: string };

export type ToggleGroupProps = {
	label: string;
	value: string | number;
	options: Array< Option >;
	onChange: any;
	description?: string;
	disabled?: boolean;
	className?: string;
	required?: boolean;
};
