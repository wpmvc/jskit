/**
 * WordPress dependencies
 */
import { memo } from 'react';

/**
 * External dependencies
 */
import { Switch as SwitchComponent } from '@wpmvc/components';
import styled from 'styled-components';

/**
 * Internal dependencies
 */
import Label from '../components/label';
import { CommonFieldProps } from '../types/field';
import { getValue, isDisabled, memoCallback, updateAttribute } from '../utils';

const StyledSwitch = styled( SwitchComponent )`
	.components-toggle-control__label {
		text-transform: uppercase;
	}
`;

const Switch = memo( ( props: CommonFieldProps ) => {
	const { field } = props;
	return (
		<StyledSwitch
			//@ts-ignore
			label={ <Label { ...props } /> }
			description={ field.description }
			checked={ getValue( props ) }
			onChange={ ( value: any ) => updateAttribute( value, props ) }
			disabled={ isDisabled( props ) }
			required={ field?.required }
		/>
	);
}, memoCallback );

export default Switch;
