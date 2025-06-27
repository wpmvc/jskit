export type ModalTypes = {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
	size?: 'small' | 'medium' | 'large' | 'fill';
	footer?: React.ReactNode | null | JSX.Element;
	headerActions?: React.ReactNode | null | JSX.Element;
	isDismissible?: boolean;
	isFullScreen?: boolean;
	borderHeaderFooter?: boolean;
};
