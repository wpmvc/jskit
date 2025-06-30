/**
 * External dependencies
 */
//@ts-ignore
import { BoxControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import Label from '../components/label';
import { CommonFieldProps } from '../types/field';
import { getValue, isDisabled, updateAttribute } from '../utils';
import styled from 'styled-components';

const StyledBoxField = styled( BoxControl )< {
	$disabled: boolean;
} >`
	${ ( { $disabled } ) =>
		$disabled &&
		`
		pointer-events: none;
		opacity: 0.5;
	` }
`;

/**
 * Normalize values: append 'px' if value is a non-empty string without a unit
 */
function normalizedValue( value: any ) {
	return Object.fromEntries(
		Object.entries( value ).map( ( [ key, val ] ) => {
			if (
				typeof val === 'string' &&
				val.trim() !== '' &&
				! /[a-z%]+$/i.test( val )
			) {
				return [ key, `${ val }px` ];
			}
			return [ key, val ];
		} )
	);
}

export default function Dimension( props: CommonFieldProps ): JSX.Element {
	return (
		<StyledBoxField
			//@ts-ignore
			label={ <Label { ...props } /> }
			values={ getValue( props, {} ) }
			onChange={ ( value: any ) => {
				updateAttribute( normalizedValue( value ), props );
			} }
			$disabled={ isDisabled( props ) }
		/>
	);
}
