/**
 * WordPress dependencies
 */
import { memo } from 'react';
import { ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import styled from 'styled-components';

/**
 * Internal dependencies
 */
import { CommonFieldProps } from '../types/field';
import Label from '../components/label';
import { getValue, isDisabled, memoCallback, updateAttribute } from '../utils';

// Styled ToggleControl component
const StyledToggleField = styled( ToggleControl )`
	// .components-toggle-field__label {
	// 	order: -1;
	// }
`;

const Switch = memo( ( props: CommonFieldProps ) => {
	const { field } = props;
	return (
		<StyledToggleField
			label={ <Label { ...props } /> }
			help={ field.helpText }
			checked={ getValue( props ) }
			onChange={ ( value: any ) => updateAttribute( value, props ) }
			disabled={ isDisabled( props ) }
			className={ field?.className }
			required={ field?.required }
			__nextHasNoMarginBottom
		/>
	);
}, memoCallback );

export default Switch;
