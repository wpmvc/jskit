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
import { memo } from 'react';
import { TextFieldProps } from './types';
import { Text as TextComponent } from '@wpmvc/components';

const Text = ( props: TextFieldProps ) => {
	const { field } = props;

	return (
		<TextComponent
			//@ts-ignore
			label={ <Label { ...props } /> }
			description={ field.description }
			value={ getValue( props ) }
			onChange={ ( value: any ) => updateAttribute( value, props ) }
			disabled={ isDisabled( props ) }
			onClick={ ( event: React.MouseEvent ) => event.stopPropagation() }
			required={ field?.required }
			labelPosition={ field?.labelPosition }
		/>
	);
};

export default Text;
