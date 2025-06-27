import { Notice } from '@wordpress/components';
import styled from 'styled-components';

export const StyledNotice = styled( Notice )`
	&.is-error {
		background: var( --wpmvc-danger-200 );
		border-left-color: var( --wpmvc-danger-500 );
	}
`;
