/**
 * WordPress dependencies
 */
import { RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Label from '../../components/label';
import {
	getValue,
	isDisabled,
	memoCallback,
	updateAttribute,
} from '../../utils';
import { memo } from 'react';
import { SliderFieldProps } from './types';

const Slider = memo( ( props: SliderFieldProps ) => {
	const { field } = props;

	const { max = 100, min = 0 } = field;

	return (
		<RangeControl
			//@ts-ignore
			label={ <Label { ...props } /> }
			max={ max }
			min={ min }
			value={ getValue( props ) }
			onChange={ ( value: any ) => updateAttribute( value, props ) }
			disabled={ isDisabled( props ) }
			className={ field?.className }
			required={ field?.required }
		/>
	);
}, memoCallback );

export default Slider;
