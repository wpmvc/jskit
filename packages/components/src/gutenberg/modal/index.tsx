import { StyledModal, ModalBody, ModalFooter } from './styles';
import { ModalTypes } from './types';

export default function Modal( {
	isOpen,
	title,
	onClose,
	size,
	children,
	footer,
	headerActions,
	isDismissible = true,
	isFullScreen = false,
	borderHeaderFooter = true,
}: ModalTypes ) {
	return (
		isOpen && (
			<StyledModal
				title={ title }
				onRequestClose={ onClose }
				size={ size }
				headerActions={ headerActions }
				shouldCloseOnClickOutside={ false }
				isDismissible={ isDismissible }
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
