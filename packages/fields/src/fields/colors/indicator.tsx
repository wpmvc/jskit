/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import {
	__experimentalHStack as HStack,
	__experimentalZStack as ZStack,
	ColorIndicator,
	Button,
	FlexItem,
	Flex,
} from '@wordpress/components';

/**
 * External dependencies
 */
import clsx from 'clsx';

function LabeledColorIndicators( { label, elementColors }: any ) {
	return (
		<HStack justify="flex-start">
			<ZStack isLayered={ false } offset={ -8 }>
				{ Object.keys( elementColors ).map( ( key ) => (
					<Flex expanded={ false } key={ key }>
						<ColorIndicator colorValue={ elementColors[ key ] } />
					</Flex>
				) ) }
			</ZStack>
			<FlexItem
				className="block-editor-panel-color-gradient-settings__color-name"
				title={ label }
			>
				{ label }
			</FlexItem>
		</HStack>
	);
}

export default function Indicator( {
	isOpen,
	onToggle,
	label,
	elementColors,
}: any ) {
	const toggleProps = {
		onClick: onToggle,
		className: clsx(
			'block-editor-panel-color-gradient-settings__dropdown',
			{ 'is-open': isOpen }
		),
		'aria-expanded': isOpen,
		'aria-label': sprintf(
			/* translators: %s is the type of color property, e.g., "background" */
			__( 'Color %s styles' ),
			label
		),
	};

	return (
		<Button { ...toggleProps }>
			<LabeledColorIndicators
				elementColors={ elementColors }
				label={ label }
			/>
		</Button>
	);
}
