import { ButtonProps } from '@wordpress/components/build-types/button/types';
import { StyledButton } from './styles';

/**
 * Reusable Button component
 *
 * A wrapper around the WordPress Button with consistent props and styling.
 */
export default function Button( props: ButtonProps ) {
	return <StyledButton { ...props } />;
}
