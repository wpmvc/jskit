import styled from 'styled-components';
import { BadgeVariant } from './type';

export const BadgeStyle = styled.div<{ $variant?: BadgeVariant }>`
	display: inline-flex;
	align-items: center;
	padding: 2px 8px;
	border-radius: 2px;
	font-size: 12px;
	font-weight: 500;
	line-height: 1;
	text-align: center;
	white-space: nowrap;
	vertical-align: baseline;

	/* Variant-specific styles */
	${({ $variant }) => {
		switch ($variant) {
			case 'info':
				return `
					background-color: var(--wpmvc-primary-200);
					color: var(--wpmvc-primary-500);
				`;
			case 'warning':
				return `
					background-color: var(--wpmvc-warning-200);
					color: var(--wpmvc-warning-500);
				`;
			case 'success':
				return `
					background-color: var(--wpmvc-success-200);
					color: var(--wpmvc-success-500);
				`;
			case 'error':
				return `
					background-color: var(--wpmvc-error-200);
					color: var(--wpmvc-error-500);
				`;
			default:
				return `
					background-color: #f0f0f0;
					color: #2f2f2f;
				`;
		}
	}}
`;

export const BadgeContent = styled.div`
	display: flex;
	align-items: center;
	gap: 4px;
`;