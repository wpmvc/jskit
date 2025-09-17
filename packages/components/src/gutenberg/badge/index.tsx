import { BadgeContent, BadgeStyle } from './style';
import { BadgeProps } from './type';

export default function Badge({
	children,
	className,
	variant = 'default',
}: BadgeProps) {
	return (
		<BadgeStyle $variant={variant} className={className}>
			<BadgeContent>{children}</BadgeContent>
		</BadgeStyle>
	);
}
