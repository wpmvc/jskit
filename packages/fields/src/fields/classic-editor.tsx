/**
 * External dependencies
 */
import ClassicEditor  from '@wpmvc/classic-editor';

/**
 * Internal dependencies
 */
import Label from '../components/label';
import { CommonFieldProps } from '../types/field';
import { getValue, isDisabled, updateAttribute } from '../utils';

const _ClassicEditor = ( props: CommonFieldProps ) => {
	const { field } = props;
	return (
		<>
			<Label { ...props } />
			<ClassicEditor
				// description={ field.description }
				value={ getValue( props ) }
				onChange={ ( value: any ) => updateAttribute( value, props ) }
				// disabled={ isDisabled( props ) }
				// required={ field?.required }
			/>
		</>
	);
}

export default _ClassicEditor;
