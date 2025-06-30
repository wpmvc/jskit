export type TabItem = {
	label: string;
	key: string;
	children: React.ReactNode;
	icon?: React.ReactNode;
	disabled?: boolean;
};

export type TabsProps = {
	items: {
		[ key: string ]: TabItem;
	};
	activeKey?: string;
	onChange?: ( key: string ) => void;
	className?: string;
	style?: React.CSSProperties;
};
