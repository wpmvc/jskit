import {
	__experimentalInputControl as InputControl,
	MenuGroup,
} from '@wordpress/components';
import styled from 'styled-components';

export const StyledInputField = styled( InputControl )< {
	$isDisabled: boolean;
} >`
	${ ( props ) =>
		props.$isDisabled &&
		`
		pointer-events: none;
		opacity: 0.5;
	` }
`;

export const StyledInputContainer = styled.div`
	position: relative;
	.components-dropdown {
		position: absolute;
		right: 10px;
		bottom: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2px;
		cursor: pointer;
	}
	.wpmvc-text-toggle {
		line-height: 0.5;
		svg {
			width: 16px;
			height: 16px;
		}
	}
`;

export const StyledMenuGroup = styled( MenuGroup )`
	&.components-menu-group {
		padding: 0;
	}
	.components-menu-item__button {
		height: 44px;
		box-shadow: 0 0;
	}
	.components-menu-item__item {
		justify-content: flex-start;
		gap: 10px;
	}
	.components-menu-item__item-label {
		text-align: left;
		width: 80px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
`;
