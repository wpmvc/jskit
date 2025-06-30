import { __experimentalToggleGroupControl as ToggleGroupControl } from '@wordpress/components';
import styled from 'styled-components';

export const StyledToggleGroup = styled( ToggleGroupControl )< {
	$disabled?: boolean;
} >`
	button {
		z-index: 0;
	}
	${ ( props ) =>
		props.$disabled &&
		`
		pointer-events: none;
		opacity: 0.5;
	` }
`;
