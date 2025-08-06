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

	const min = isFunction( field?.min ) ? field.min( attributes ) : field?.min;
	const max = isFunction( field?.max ) ? field.max( attributes ) : field?.max;

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
			min={ min }
			max={ max }
			required={ field?.required }
			labelPosition={ field?.labelPosition }
		/>
	);
}
