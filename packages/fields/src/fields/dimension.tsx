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

export default function Dimension( props: CommonFieldProps ): JSX.Element {
	const { field } = props;
	return (
		<StyledBoxField
			//@ts-ignore
			label={ <Label { ...props } /> }
			values={ getValue( props, {} ) }
			onChange={ ( value: any ) => updateAttribute( value, props ) }
			$disabled={ isDisabled( props ) }
		/>
	);
}
