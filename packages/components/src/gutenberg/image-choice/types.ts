type Demo = {
	label: string;
	url: string;
};

export type Option = {
	label: string;
	value: string;
	demo?: Demo;
	isPro?: boolean;
	isComingSoon?: boolean;
	image: string;
};

export type ImageChoiceProps = {
	label: string;
	value: string;
	onChange: ( value: string ) => void;
	className?: string;
	options: Option[];
	perRow?: number;
};
