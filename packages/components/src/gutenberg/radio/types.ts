type Option = { label: string; value: string; description?: string };

type Props = {
	label: string;
	value: any;
	onChange: any;
	description?: string;
	disabled?: boolean;
	className?: string;
	required?: boolean;
	options: Array< Option >;
};

type NormalVariation = Props & {
	variation: 'normal';
};

type BoxedVariation = Props & {
	variation: 'boxed';
	perRow?: number;
};

export type RadioProps = NormalVariation | BoxedVariation;
