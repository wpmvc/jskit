/**
 * External dependencies
 */
import { isFunction } from 'lodash';
import { Radio as RadioComponent } from '@wpmvc/components';

/**
 * Internal dependencies
 */
import { Option, RadioFieldProps } from './types';
import { getValue, updateAttribute } from '../../utils';
import Fields from '..';
import Label from '../../components/label';

const Radio = ( props: RadioFieldProps ) => {
	const { field, attributes } = props;
	const { options, perRow } = field || {};

	const evaluatedOptions = isFunction( options )
		? options( attributes )
		: options;

	//@ts-ignore
	const _options = ( evaluatedOptions || [] ).map( ( option: Option ) => {
		if ( ! option?.fields ) {
			return option;
		}
		//@ts-ignore
		option.after = (
			<Fields
				{ ...props }
				//@ts-ignore
				fields={ option.fields }
				style={ {
					marginLeft: 16,
					paddingTop: 16,
					borderTop: '1px solid #e3e3f1',
				} }
			/>
		);
		return option;
	} );

	return (
		<RadioComponent
			// @ts-ignore
			variation={ field.variation }
			perRow={ perRow }
			// @ts-ignore
			label={ <Label { ...props } /> }
			onChange={ ( updatedValue: any ) => {
				updateAttribute( updatedValue, props );
			} }
			value={ getValue( props ) }
			options={ _options }
		/>
	);
};

export default Radio;
