import { Notice } from '@wordpress/components';
import styled from 'styled-components';

export const StyledNotice = styled( Notice )`
	&.is-warning {
		background-color: var( --wpmvc-warning-100, #fef8ee );
		border-left-color: var( --wpmvc-warning-700, #f0b849 );
	}
	&.is-error {
		background-color: var( --wpmvc-error-100, #f4a2a2 );
		border-left-color: var( --wpmvc-error-700, #cc1818 );
	}
	&.is-success {
		background-color: var( --wpmvc-success-100, #eff9f1 );
		border-left-color: var( --wpmvc-success-700, #4ab866 );
	}
	&.is-info {
		background-color: var( --wpmvc-info-100, #fff );
		border-left-color: var(
			--wpmvc-info-700,
			var( --wp-admin-theme-color )
		);
	}
`;
