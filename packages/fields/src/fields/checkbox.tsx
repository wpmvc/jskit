/**
 * WordPress dependencies
 */
import { CheckboxControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { CommonFieldProps } from '../types/field';
import Label from '../components/label';
import { getValue, isDisabled, updateAttribute } from '../utils';
import styled from 'styled-components';

const StyledCheckboxField = styled( CheckboxControl )< {
	isDisabled: string;
} >`
	${ ( props ) =>
		'true' === props.isDisabled &&
		`
		pointer-events: none;
		opacity: 0.5;
	` }
`;

export default function Checkbox( props: CommonFieldProps ): JSX.Element {
	const { field } = props;

	return (
		<StyledCheckboxField
			//@ts-ignore
			label={ <Label { ...props } /> }
			isDisabled={ isDisabled( props ) ? 'true' : 'false' }
			checked={ getValue( props ) }
			onChange={ ( value: boolean ) => updateAttribute( value, props ) }
			className={ field?.className }
			required={ field?.required }
		/>
	);
}
