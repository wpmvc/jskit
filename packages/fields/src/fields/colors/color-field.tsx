/**
 * WordPress dependencies
 */
import {
	BaseControl,
	ColorPalette,
	GradientPicker,
	__experimentalVStack as VStack,
} from '@wordpress/components';

export default function ColorField( { onChange, value }: any ) {
	const showTitle = false;
	const label = 'Hello';
	const isGradient = false;
	return (
		<BaseControl
			__nextHasNoMarginBottom
			className="block-editor-color-gradient-field"
		>
			<fieldset className="block-editor-color-gradient-field__fieldset">
				<VStack spacing={ 1 }>
					{ showTitle && (
						<legend>
							<div className="block-editor-color-gradient-field__color-indicator">
								<BaseControl.VisualLabel>
									{ label }
								</BaseControl.VisualLabel>
							</div>
						</legend>
					) }
					<div className="block-editor-color-gradient-field__panel">
						{ isGradient ? (
							<GradientPicker
								onChange={ onChange }
								value={ value }
								__experimentalIsRenderedInSidebar={ true }
								headingLevel={ 3 }
								clearable={ true }
							/>
						) : (
							<ColorPalette
								__experimentalIsRenderedInSidebar={ true }
								onChange={ onChange }
								value={ value }
								// onChange={
								// 	canChooseAGradient
								// 		? (newColor) => {
								// 				onColorChange(newColor);
								// 				onGradientChange();
								// 			}
								// 		: onColorChange
								// }
								// {...{ colors, disableCustomColors }}
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
