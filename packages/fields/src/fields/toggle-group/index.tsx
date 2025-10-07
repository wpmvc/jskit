/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Label from '../../components/label';
import { getValue, isDisabled, updateAttribute } from '../../utils';
import { ToggleGroupFieldProps } from './types';

/**
 * External dependencies
 */
import { isFunction } from 'lodash';
import { ToggleGroup as WPMVCToggleGroup } from '@wpmvc/components';

export default function ToggleGroup(
	props: ToggleGroupFieldProps
): JSX.Element {
	const { field, attributes } = props;
	const { options, description } = field;

	const toggleOptions = isFunction( options )
		? options( attributes )
		: options;

	return (
		<WPMVCToggleGroup
			{ ...field }
			//@ts-ignore
			label={ <Label { ...props } /> }
			description={ description }
			value={ getValue( props ) }
			onChange={ ( value: any ) => updateAttribute( value, props ) }
			disabled={ isDisabled( props ) }
			options={ toggleOptions }
		/>
	);
}
