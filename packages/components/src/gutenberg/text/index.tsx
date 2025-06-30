/**
 * WordPress dependencies
 */
import { StyledInputField } from './styles';
import { InputProps } from './types';

export default function Text( props: InputProps ) {
	return (
		<StyledInputField
			{ ...props }
			help={ props?.description }
			$isDisabled={ props.disabled }
			size="default"
			__next40pxDefaultSize
		/>
	);
}
