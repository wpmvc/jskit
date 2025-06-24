/**
 * WordPress dependencies
 */
import { __experimentalInputControl as InputControl } from '@wordpress/components';

/**
 * External dependencies
 */
// import styled, { css } from 'styled-components';

/**
 * Internal dependencies
 */
import {
	getValue,
	isDisabled,
	memoCallback,
	updateAttribute,
} from '../../utils';
import Label from '../../components/label';
import styled from 'styled-components';
import { memo } from 'react';
import { TextFieldProps } from './types';

// const StyledInput = styled( InputControl )< { isInvalid: boolean } >`
// 	${ ( { isInvalid } ) =>
// 		isInvalid &&
// 		css`
// 			.components-input-field__backdrop {
// 				border-color: red !important;
// 			}

// 			.components-base-field__help {
// 				color: red !important;
// 			}
// 		` }
// `;
const StyledInputField = styled( InputControl )< {
	$isDisabled: boolean;
} >`
	${ ( props ) =>
		props.$isDisabled &&
		`
		pointer-events: none;
		opacity: 0.5;
	` }
`;

const Text = memo( ( props: TextFieldProps ) => {
	const { field } = props;
	const { helpText } = field || {};

	return (
		<StyledInputField
			//@ts-ignore
			label={ <Label { ...props } /> }
			help={ helpText }
			size="__unstable-large"
			value={ getValue( props ) }
			onChange={ ( value: any ) => updateAttribute( value, props ) }
			$isDisabled={ isDisabled( props ) }
			className={ field?.className }
			onClick={ ( event: React.MouseEvent ) => event.stopPropagation() }
			required={ field?.required }
			labelPosition={ field?.labelPosition }
		/>
	);
}, memoCallback );

export default Text;
