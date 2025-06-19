import { BaseField, BaseFieldProps, Field } from '../../types/field';

export type NoticeFieldType = BaseField & {
	type: 'notice';
	notice: string;
	status: 'warning' | 'success' | 'error' | 'info';
	isDismissible?: boolean;
	onRemove: () => void;
	addMarginBottom?: boolean;
};

export type NoticeFieldProps = BaseFieldProps & {
	field: NoticeFieldType;
};
