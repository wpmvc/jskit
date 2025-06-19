/**
 * WordPress dependencies
 */
import { RadioControl } from '@wordpress/components';
import {
	getValue,
	isDisabled,
	memoCallback,
	updateAttribute,
} from '../../utils';
import Label from '../../components/label';
import styled from 'styled-components';
import { memo } from 'react';
import { isFunction } from 'lodash';
import { RadioFieldProps } from './types';

const StyleRadioField = styled( RadioControl )< {
	isDisabled: string;
} >`
	${ ( props ) =>
		'true' === props.isDisabled &&
		`
		pointer-events: none;
		opacity: 0.5;
	` }
`;

const Radio = memo( ( props: RadioFieldProps ) => {
	const { field, attributes } = props;
	const { options } = field || {};

	return (
		<StyleRadioField
			//@ts-ignore
			label={ <Label { ...props } /> }
			options={ isFunction( options ) ? options( attributes ) : options }
			selected={ getValue( props ) }
			onChange={ ( value: string ) => updateAttribute( value, props ) }
			isDisabled={ isDisabled( props ) ? 'true' : 'false' }
			className={ field?.className }
			required={ field?.required }
		/>
	);
}, memoCallback );

export default Radio;
