import { Modal } from '@wordpress/components';
import { ColorWrapper } from '@wpmvc/colors';
import styled from 'styled-components';

export const StyledModal = styled( Modal )< {
	$headerBorder?: boolean;
} >`
	.components-modal__header {
		height: 64px;
		padding: 0px 32px;
		${ ( { $headerBorder } ) =>
			$headerBorder && `border-bottom: 1px solid rgba( 0, 0, 0, 0.13 );` }
	}
	.components-modal__header + div {
		overflow: auto;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.components-modal__header-heading {
		font-size: 16px;
	}

	.components-modal__content {
		padding: 0px;
		margin-top: 64px;
	}
`;

export const ModalBody = styled( ColorWrapper )`
	padding: 24px 32px;
	overflow-y: auto;
`;

export const ModalFooter = styled( ColorWrapper )< {
	$border?: boolean;
} >`
	padding: 14px 32px;
	margin-top: auto;
	background: #fff;
	width: 100%;
	${ ( { $border } ) =>
		$border && `border-top: 1px solid rgba( 0, 0, 0, 0.13 );` }
`;
