import { ImageChoice as ImageChoiceComponent } from '@wpmvc/components';
import { ImageChoiceProps } from './types';
import { getValue, updateAttribute } from '../../utils';
import { isFunction } from 'lodash';
import Label from '../../components/label';

export default function ImageChoice( props: ImageChoiceProps ): JSX.Element {
	const { field, attributes } = props;
	const { options, perRow } = field || {};

	const _options = isFunction( options ) ? options( attributes ) : options;

	return (
		<ImageChoiceComponent
			// @ts-ignore
			label={ <Label { ...props } /> }
			onChange={ ( updatedValue: any ) => {
				updateAttribute( updatedValue, props );
			} }
			perRow={ perRow }
			value={ getValue( props ) }
			options={ _options }
		/>
	);
}
