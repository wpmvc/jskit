/**
 * External dependencies
 */
import { Number as NumberComponent } from '@wpmvc/components';

/**
 * Internal dependencies
 */
import Label from '../../components/label';
import { getValue, isDisabled, updateAttribute } from '../../utils';
import { NumberFieldProps } from './types';
import { isFunction } from 'lodash';

export default function Number( props: NumberFieldProps ): JSX.Element {
	const { field, attributes } = props;

	const handleChange = ( value: any ) => {
		if ( field.precision ) {
			updateAttribute( value ? parseFloat( value ) : undefined, props );
			return;
		}

		const integerValue = parseInt( value, 10 );

		if ( ! isNaN( integerValue ) ) {
			updateAttribute( integerValue, props );
		}
	};

	const getMinValue = () => {
		if ( isFunction( field?.min ) ) {
			try {
				return field.min( attributes );
			} catch ( error ) {
				console.warn( 'Error evaluating min function:', error );
				return undefined;
			}
		}
		return field?.min;
	};

	const getMaxValue = () => {
		if ( isFunction( field?.max ) ) {
			try {
				return field.max( attributes );
			} catch ( error ) {
				console.warn( 'Error evaluating max function:', error );
				return undefined;
			}
		}
		return field?.max;
	};

	return (
		<NumberComponent
			//@ts-ignore
			label={ <Label { ...props } /> }
			description={ field.description }
			size="__unstable-large"
			step={ 1 }
			value={ getValue( props ) }
			onChange={ handleChange }
			disabled={ isDisabled( props ) }
			min={ getMinValue() }
			max={ getMaxValue() }
			required={ field?.required }
			labelPosition={ field?.labelPosition }
		/>
	);
}
