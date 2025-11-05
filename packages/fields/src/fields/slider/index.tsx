/**
 * WordPress dependencies
 */
import { Slider as SliderComponent } from '@wpmvc/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Label from '../../components/label';
import { getValue, isDisabled, updateAttribute } from '../../utils';
import { SliderFieldProps } from './types';

const Slider = ( props: SliderFieldProps ) => {
	const { field } = props;

	const { max = 100, min = 0 } = field;

	return (
		<SliderComponent
			//@ts-ignore
			label={ <Label { ...props } /> }
			max={ max }
			min={ min }
			value={ getValue( props ) }
			onChange={ ( value: any ) => updateAttribute( value, props ) }
			disabled={ isDisabled( props ) }
			required={ field?.required }
			unit={ field.unit }
			customUnits={ field.customUnits }
			description={ field.description }
		/>
	);
};

export default Slider;
