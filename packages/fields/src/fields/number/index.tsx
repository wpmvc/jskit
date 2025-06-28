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

export default function Number( props: NumberFieldProps ): JSX.Element {
	const { field } = props;

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
			min={ field?.min }
			max={ field?.max }
			required={ field?.required }
			labelPosition={ field?.labelPosition }
		/>
	);
}
