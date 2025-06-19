/**
 * WordPress dependencies
 */
import { PanelBody } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { PrivateFields } from '..';
import { PanelFieldProps } from './types';

export default function Panel( props: PanelFieldProps ): JSX.Element {
	const { field } = props;
	return (
		<PanelBody
			title={ field.label }
			initialOpen={ ! field.label ? true : field?.initialOpen ?? false }
		>
			<PrivateFields { ...props } fields={ field.fields } />
		</PanelBody>
	);
}
