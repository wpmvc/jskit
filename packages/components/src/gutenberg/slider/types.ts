export type SliderProps = {
	label: string;
	value: string | number;
	onChange: ( value: string | number ) => void;
	unit?: boolean;
	customUnits?: string[];
	min?: number;
	max?: number;
	className?: string;
	description?: string;
	disabled?: boolean;
	required?: boolean;
};
