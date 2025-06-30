/**
 * WordPress dependencies
 */
import { __experimentalToggleGroupControlOption as ToggleGroupControlOption } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ToggleGroupProps } from './types';
import { StyledToggleGroup } from './styles';

export default function ToggleGroup( props: ToggleGroupProps ): JSX.Element {
	return (
		<StyledToggleGroup
			//@ts-ignore
			{ ...props }
			isBlock
			size="__unstable-large"
			$disabled={ props.disabled }
			help={ props.description }
			__nextHasNoMarginBottom
		>
			{ props.options.map( ( option: any, index: any ) => {
				return (
					<ToggleGroupControlOption
						key={ index }
						value={ option.value }
						label={ option.label }
					/>
				);
			} ) }
		</StyledToggleGroup>
	);
}
