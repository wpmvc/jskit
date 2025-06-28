/**
 * WordPress dependencies
 */
import { ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { SwitchProps } from './types';

export default function Switch( props: SwitchProps ) {
	return (
		<ToggleControl
			{ ...props }
			help={ props.description }
			__nextHasNoMarginBottom
		/>
	);
}
