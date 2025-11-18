/**
 * WordPress dependencies
 */
import { Dropdown, MenuItem } from '@wordpress/components';

/**
 * Internal dependencies
 */
import {
	StyledInputContainer,
	StyledInputField,
	StyledMenuGroup,
} from './styles';
import { InputProps } from './types';
import EllipseHIcon from './ellipse-h-icon';

export default function Text( props: InputProps ) {
	const { variables = [], onChange, value, ...rest } = props;

	const handleSelect = ( variableValue: string ) => {
		// Optional: append variable to input value
		if ( onChange ) {
			onChange( value ? `${ value } ${ variableValue }` : variableValue );
		}
	};

	return (
		<StyledInputContainer>
			<StyledInputField
				{ ...rest }
				value={ value }
				onChange={ onChange }
				help={ props?.description }
				$isDisabled={ props.disabled }
				size="default"
				__next40pxDefaultSize
			/>
			{ !! variables.length && (
				<Dropdown
					popoverProps={ { placement: 'bottom-end' } }
					renderToggle={ ( { onToggle } ) => (
						<span
							className="wpmvc-text-toggle"
							onClick={ onToggle }
						>
							<EllipseHIcon />
						</span>
					) }
					renderContent={ () => (
						<StyledMenuGroup>
							{ variables.map(
								( variable: {
									value: string;
									label: string;
								} ) => (
									<MenuItem
										key={ variable.value }
										onClick={ () =>
											handleSelect( variable.value ?? '' )
										}
									>
										<span className="components-menu-item__item-label">
											{ variable.label ?? '' }
										</span>
										<span className="components-menu-item__item-value">
											{ variable.value ?? '' }
										</span>
									</MenuItem>
								)
							) }
						</StyledMenuGroup>
					) }
				/>
			) }
		</StyledInputContainer>
	);
}
