import { BadgeContent, BadgeStyle } from './style';
import { BadgeProps } from './type';

export default function Badge( {
	children,
	className,
	variant = 'default',
	style,
}: BadgeProps ) {
	return (
		<BadgeStyle
			$variant={ variant }
			className={ className }
			style={ style }
		>
			<BadgeContent>{ children }</BadgeContent>
		</BadgeStyle>
	);
}
