import { CSSProperties } from 'react';

// Define the variant types
export type BadgeVariant = 'default' | 'info' | 'warning' | 'success' | 'error';

// Props interface
export interface BadgeProps {
	children: React.ReactNode;
	className?: string;
	variant?: BadgeVariant;
	style?: CSSProperties;
}
