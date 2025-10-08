import { StyledCheckbox } from './styles';
import { CheckboxProps } from './types';

export default function Checkbox( props: CheckboxProps ): JSX.Element {
	return (
		<StyledCheckbox
			//@ts-ignore
			{ ...props }
			$disabled={ props.disabled }
			help={ props.description }
		/>
	);
}
