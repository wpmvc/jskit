import { BaseField, BaseFieldProps } from '../../types/field';

export type NoticeFieldType = Omit< BaseField, 'label' > & {
	type: 'notice';
	notice: string;
	status?: 'warning' | 'success' | 'error' | 'info';
	isDismissible?: boolean;
	onRemove?: () => void;
};

export type NoticeFieldProps = BaseFieldProps & {
	field: NoticeFieldType;
};
