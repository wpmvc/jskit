/**
 * WordPress dependencies
 */
import { useEffect, useRef, createRoot } from '@wordpress/element';
import { ToggleControl, Spinner } from '@wordpress/components';
import { SwitchProps } from './types';

export default function Switch( props: SwitchProps ) {
	const { isLoading, description, ...rest } = props;
	const ref = useRef< HTMLDivElement >( null );
	const rootRef = useRef< ReturnType< typeof createRoot > | null >( null );

	useEffect( () => {
		const thumb = ref.current?.querySelector(
			'.components-form-toggle__thumb'
		);

		if ( ! thumb ) return;

		// Defer unmount to avoid race condition warning
		if ( rootRef.current ) {
			const prevRoot = rootRef.current;
			rootRef.current = null;
			queueMicrotask( () => {
				prevRoot.unmount();
			} );
		}

		if ( isLoading ) {
			const container = document.createElement( 'div' );
			Object.assign( container.style, {
				position: 'absolute',
				top: 'calc(50% - 1px)',
				left: '50%',
				transform: 'translate(-50%, -50%) scale(0.5)',
				width: '100%',
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				pointerEvents: 'none',
				zIndex: '2',
			} );

			thumb.appendChild( container );
			const newRoot = createRoot( container );
			newRoot.render( <Spinner /> );
			rootRef.current = newRoot;
		}
	}, [ isLoading ] );

	return (
		<div ref={ ref }>
			<ToggleControl
				{ ...rest }
				help={ description }
				__nextHasNoMarginBottom
			/>
		</div>
	);
}
