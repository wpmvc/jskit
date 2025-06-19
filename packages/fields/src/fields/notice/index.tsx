/**
 * External dependencies
 */
import { Notice as WpNotice } from '@wordpress/components';
import { NoticeFieldProps } from './types';

export default function Notice( { field }: NoticeFieldProps ): JSX.Element {
	const { status, notice, isDismissible, onRemove, className } = field;

	return (
		<WpNotice
			status={ status }
			isDismissible={ isDismissible }
			onRemove={ onRemove }
			className={ 'components-base-field ' + ( className ?? '' ) }
		>
			{ notice }
		</WpNotice>
	);
}
