/**
 * CopyToClipboard Component
 *
 * A reusable clipboard copy component that displays a visual feedback when text is copied.
 * It supports three states: default, copying (loading), and copied.
 *
 * @component CopyToClipboard
 */

/**
 * WordPress dependencies
 */
import { Icon } from '@wordpress/components';
import { useCopyToClipboard } from '@wordpress/compose';
import { useState } from '@wordpress/element';

/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
import { check, copy } from '@wordpress/icons';
import { ActionIcon, ClipboardCopyWrapper, ClipboardText } from './styles';
import { ClipboardTypes } from './types';

export default function Clipboard( {
	text,
	className = '',
	timeout = 2000,
}: ClipboardTypes ) {
	const [ isCopied, setIsCopied ] = useState( false );
	const copyRef = useCopyToClipboard( text, () => {
		setIsCopied( true );
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
