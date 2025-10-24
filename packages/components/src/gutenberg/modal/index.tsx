import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { close } from '@wordpress/icons';
import { ModalBody, ModalFooter, StyledModal } from './styles';
import { ModalTypes } from './types';

import { ColorWrapper } from '@wpmvc/colors';

export default function Modal( {
	isOpen,
	title,
	className = '',
	onClose,
	size,
	children,
	footer,
	headerActions,
	isDismissible = true,
	isFullScreen = false,
	borderHeaderFooter = true,
}: ModalTypes ) {
	const ModalHeaderActions = () => {
		return (
			<ColorWrapper>
				<div style={ { display: 'flex', gap: 8 } }>
					{ headerActions }
					{ isDismissible && (
						<Button
							size="compact"
							onClick={ onClose }
							icon={ close }
							label={ __( 'Close' ) }
						/>
					) }
				</div>
			</ColorWrapper>
		);
	};

	return (
		isOpen && (
			<StyledModal
				title={ title }
				className={ className }
				onRequestClose={ onClose }
				size={ size }
				headerActions={ <ModalHeaderActions /> }
				shouldCloseOnClickOutside={ false }
				isDismissible={ false }
				isFullScreen={ isFullScreen }
				$headerBorder={ borderHeaderFooter }
			>
				<ModalBody>{ children }</ModalBody>
				{ footer && (
					<ModalFooter $border={ borderHeaderFooter }>
						{ footer }
					</ModalFooter>
				) }
			</StyledModal>
		)
	);
}
