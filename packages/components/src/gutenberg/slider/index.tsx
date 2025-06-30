/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';
import {
	RangeControl,
	Flex,
	FlexItem,
	__experimentalSpacer as Spacer,
	__experimentalUseCustomUnits as useCustomUnits,
	__experimentalUnitControl as UnitControl,
	__experimentalParseQuantityAndUnitFromRawValue as parseQuantityAndUnitFromRawValue,
	FlexBlock,
	BaseControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { SliderProps } from './types';
import { StyledSlider } from './styles';

/**
 * Slider unit settings (max and step) for each unit type
 */
const RANGE_CONTROL_SETTINGS: Record< string, { max: number; step: number } > =
	{
		px: { max: 1000, step: 1 },
		'%': { max: 100, step: 1 },
		vw: { max: 100, step: 1 },
		vh: { max: 100, step: 1 },
		em: { max: 50, step: 0.1 },
		rem: { max: 50, step: 0.1 },
		svw: { max: 100, step: 1 },
		lvw: { max: 100, step: 1 },
		dvw: { max: 100, step: 1 },
		svh: { max: 100, step: 1 },
		lvh: { max: 100, step: 1 },
		dvh: { max: 100, step: 1 },
		vi: { max: 100, step: 1 },
		svi: { max: 100, step: 1 },
		lvi: { max: 100, step: 1 },
		dvi: { max: 100, step: 1 },
		vb: { max: 100, step: 1 },
		svb: { max: 100, step: 1 },
		lvb: { max: 100, step: 1 },
		dvb: { max: 100, step: 1 },
		vmin: { max: 100, step: 1 },
		svmin: { max: 100, step: 1 },
		lvmin: { max: 100, step: 1 },
		dvmin: { max: 100, step: 1 },
		vmax: { max: 100, step: 1 },
		svmax: { max: 100, step: 1 },
		lvmax: { max: 100, step: 1 },
		dvmax: { max: 100, step: 1 },
	};

// Default unit options if customUnits is not passed
const DEFAULT_UNITS = Object.keys( RANGE_CONTROL_SETTINGS );

export default function Slider( {
	label = __( 'Slider' ),
	value,
	onChange,
	unit = false,
	customUnits,
	min,
	max,
	className,
	description,
	disabled,
	required,
}: SliderProps ) {
	/**
	 * Parse the value into quantity (number) and unit (string)
	 * Example: "50%" => [50, "%"]
	 */
	const [ quantity = 0, currentUnit ] = useMemo(
		() => parseQuantityAndUnitFromRawValue( value ),
		[ value ]
	);

	// Get unit list (either default or custom)
	const units = useCustomUnits( {
		availableUnits: customUnits ?? DEFAULT_UNITS,
	} );

	// Final unit to use if unit support is enabled
	const selectedUnit = unit
		? currentUnit || units?.[ 0 ]?.value || 'px'
		: undefined;

	// Determine range settings
	const rangeSettings = RANGE_CONTROL_SETTINGS[ selectedUnit ?? 'px' ] || {
		max: 100,
		step: 0.1,
	};

	/**
	 * Handle slider value change
	 * Append unit if enabled
	 */
	const handleSliderChange = ( next: number ) => {
		onChange( unit ? `${ next }${ selectedUnit }` : next );
	};

	/**
	 * Handle unit switcher change
	 */
	const handleUnitChange = ( newUnit: string ) => {
		const [ currentValue, currentUnit ] =
			parseQuantityAndUnitFromRawValue( value );

		if ( [ 'em', 'rem' ].includes( newUnit ) && currentUnit === 'px' ) {
			// Convert px to em/rem (assume 16px root)
			//@ts-ignore
			onChange( ( currentValue / 16 ).toFixed( 2 ) + newUnit );
		} else if (
			//@ts-ignore
			[ 'em', 'rem' ].includes( currentUnit ) &&
			newUnit === 'px'
		) {
			// Convert em/rem to px
			//@ts-ignore
			onChange( Math.round( currentValue * 16 ) + newUnit );
			//@ts-ignore
		} else if ( DEFAULT_UNITS.includes( newUnit ) && currentValue > 100 ) {
			// Cap viewport units to 100
			onChange( '100' + newUnit );
		}
	};

	return (
		<StyledSlider className={ className }>
			<BaseControl.VisualLabel as="legend">
				{ label }
			</BaseControl.VisualLabel>
			<Flex>
				<FlexBlock>
					<Spacer marginX={ 2 } marginBottom={ 0 } marginLeft={ 0 }>
						<RangeControl
							value={ quantity }
							min={ min ?? 0 }
							max={ max ?? rangeSettings.max }
							step={ rangeSettings.step }
							withInputField={ ! unit }
							//@ts-ignore
							onChange={ handleSliderChange }
							disabled={ disabled }
							required={ required }
							help={ description }
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
					</Spacer>
				</FlexBlock>

				{ /* Show unit switcher only if unit mode is enabled */ }
				{ unit && (
					<FlexItem style={ { maxWidth: 88 } }>
						<UnitControl
							value={ value }
							units={ units }
							//@ts-ignore
							onChange={ onChange }
							//@ts-ignore
							onUnitChange={ handleUnitChange }
							min={ min ?? 0 }
							size="__unstable-large"
							disabled={ disabled }
							__nextHasNoMarginBottom
						/>
					</FlexItem>
				) }
			</Flex>
		</StyledSlider>
	);
}
