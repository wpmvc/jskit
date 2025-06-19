/**
 * External dependencies
 */
//@ts-ignore
import { HeightControl } from '@wordpress/block-editor';
import styled from 'styled-components';

/**
 * Internal dependencies
 */
import { CommonFieldProps } from '../types/field';
import Label from '../components/label';
import { getValue, isDisabled, updateAttribute } from '../utils';

const StyledHeightField = styled( HeightControl )< {
	isDisabled: string;
} >`
	${ ( props ) =>
		'true' === props.isDisabled &&
		`
		pointer-events: none;
		opacity: 0.5;
	` }
`;

export default function Height( props: CommonFieldProps ): JSX.Element {
	const { field } = props;

	return (
		<StyledHeightField
			label={ <Label { ...props } /> }
			value={ getValue( props ) }
			onChange={ ( value: any ) => updateAttribute( value, props ) }
			isDisabled={ isDisabled( props ) ? 'true' : 'false' }
			className={ field?.className }
			required={ field?.required }
		/>
	);
}
