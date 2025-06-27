import { Button } from '@wordpress/components';
import styled from 'styled-components';

export const StyledButton = styled( Button )`
	&.is-primary {
		background: var( --wpmvc-primary-500 );
	}

	&.is-secondary {
		color: var( --wpmvc-primary-500 );
		box-shadow:
			inset 0 0 0 1px var( --wpmvc-primary-500 ),
			0 0 0 currentColor;
	}
`;
