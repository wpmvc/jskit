/**
 * External dependencies
 */
//@ts-ignore
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Label from '../components/label';
import { CommonFieldProps } from '../types/field';
import { isDisabled } from '../utils';
import styled from 'styled-components';

const StyledBoxField = styled( BoxControl )< {
	isDisabled: string;
} >`
	${ ( props ) =>
		'true' === props.isDisabled &&
		`
		pointer-events: none;
		opacity: 0.5;
	` }
`;

export default function Dimension( props: CommonFieldProps ): JSX.Element {
	const { attrKey, field, attributes, setAttributes } = props;
	const [ values, setValues ] = useState< any >( attributes[ attrKey ] );

	const handleChange = ( value: any ) => {
		setValues( value );
		setAttributes( { [ attrKey ]: value } );
	};

	return (
		<StyledBoxField
			//@ts-ignore
			label={ <Label { ...props } /> }
			values={ values }
			onChange={ handleChange }
			isDisabled={ isDisabled( props ) ? 'true' : 'false' }
			className={ field?.className }
		/>
	);
}
