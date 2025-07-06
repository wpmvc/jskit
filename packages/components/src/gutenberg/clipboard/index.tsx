/**
 * WordPress dependencies
 */
import { Icon } from '@wordpress/components';
import { useCopyToClipboard } from '@wordpress/compose';
import { useState } from '@wordpress/element';
import { check, copy } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { ActionIcon, ClipboardCopyWrapper, ClipboardText } from './styles';

/**
 * A reusable clipboard copy component that displays a visual feedback when text is copied.
 */

export default function Clipboard( {
	text,
	className = '',
	timeout = 2000,
	onCopied,
}: ClipboardProps ) {
	const [ isCopied, setIsCopied ] = useState( false );
	const copyRef = useCopyToClipboard( text, () => {
		setIsCopied( true );
		onCopied?.();
		setTimeout( () => setIsCopied( false ), timeout );
	} );

	return (
		<ClipboardCopyWrapper className={ `${ className }` }>
			<ClipboardText>{ text }</ClipboardText>
			<ActionIcon ref={ copyRef }>
				{ isCopied ? <Icon icon={ check } /> : <Icon icon={ copy } /> }
			</ActionIcon>
		</ClipboardCopyWrapper>
	);
}
