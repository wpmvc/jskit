export type ClipboardProps = {
	text: string;
	className?: string;
	timeout?: number;
	onCopied?: () => void;
};
