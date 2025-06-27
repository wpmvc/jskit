// src/hooks/useColors.ts
import { useSelect } from '@wordpress/data';
import { ColorPalette } from './store/types';

/**
 * Hook to access global color palette with full IntelliSense support.
 */
export const useColors = (): ColorPalette =>
	useSelect( ( select ) => {
		const store = select( 'wpmvc/colors' ) as {
			getColors: () => ColorPalette;
		};
		return store.getColors();
	}, [] );
