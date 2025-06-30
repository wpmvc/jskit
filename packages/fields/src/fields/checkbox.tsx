/**
 * WordPress dependencies
 */
import { Checkbox as CheckboxComponent } from '@wpmvc/components';

/**
 * Internal dependencies
 */
import { CommonFieldProps } from '../types/field';
import Label from '../components/label';
import { getValue, isDisabled, updateAttribute } from '../utils';

export default function Checkbox( props: CommonFieldProps ): JSX.Element {
	const { field } = props;

	return (
		<CheckboxComponent
			//@ts-ignore
			label={ <Label { ...props } /> }
			description={ field.description }
			disabled={ isDisabled( props ) }
			checked={ getValue( props ) }
			onChange={ ( value: boolean ) => updateAttribute( value, props ) }
			required={ field?.required }
		/>
	);
}
