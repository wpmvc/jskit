/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	BaseControl,
	ColorPalette,
	GradientPicker,
	__experimentalVStack as VStack,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';

export default function ColorField( {
	onChange,
	value,
	colors,
	isGradientEnabled,
}: any ) {
	const isGradient = value.search( 'gradient' ) !== -1;
	return (
		<BaseControl
			__nextHasNoMarginBottom
			className="block-editor-color-gradient-control"
		>
			<fieldset className="block-editor-color-gradient-control__fieldset">
				<VStack spacing={ 1 }>
					<div className="block-editor-color-gradient-control__panel">
						{ isGradientEnabled && (
							<ToggleGroupControl
								label=""
								onChange={ ( value: any ) => {
									if ( value === 'gradient' ) {
										onChange(
											'linear-gradient(135deg,rgb(122,220,180) 0%,rgb(0,208,130) 100%)'
										);
									} else {
										onChange( '#ffffff' );
									}
								} }
								value={ isGradient ? 'gradient' : 'solid' }
								style={ {
									border: '1px solid var(--wp-components-color-gray-600, #0003)',
									marginTop: '-12px',
								} }
							>
								<ToggleGroupControlOption
									value="solid"
									label={ __( 'Solid' ) }
								/>
								<ToggleGroupControlOption
									value="gradient"
									label={ __( 'Gradient' ) }
								/>
							</ToggleGroupControl>
						) }
						{ isGradientEnabled && isGradient ? (
							<GradientPicker
								onChange={ onChange }
								value={ value }
							/>
						) : (
							<ColorPalette
								__experimentalIsRenderedInSidebar={ true }
								onChange={ onChange }
								value={ value }
								colors={ colors }
								clearable={ true }
								enableAlpha={ true }
								headingLevel={ 3 }
							/>
						) }
					</div>
				</VStack>
			</fieldset>
		</BaseControl>
	);
}
