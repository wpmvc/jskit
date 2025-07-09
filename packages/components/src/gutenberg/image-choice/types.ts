type Demo = {
	label: string;
	url: string;
};

type Pro = {
	status: boolean;
	label: string;
	url: string;
};

type Option = {
	label: string;
	value: string;
	demo?: Demo;
	pro?: Pro;
	image: string;
};

export type ImageChoiceProps = {
	label: string;
	value: any;
	onChange: ()=>void;
	className?: string;
	options: Array< Option > | (() => Array<Option>);
	perRow?: number;
};
