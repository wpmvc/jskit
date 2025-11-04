import { ColorPicker, Dropdown, Button } from '@wordpress/components';
//@ts-ignore
import { useViewportMatch } from '@wordpress/compose';
import { CommonFieldProps } from '../types/field';

export default function PickColor( {
	attrKey,
	field,
	attributes,
	setAttributes,
	placement,
	offset,
}: CommonFieldProps ): JSX.Element {
	function dropdownProps() {
		const isMobile = useViewportMatch( 'medium', '<' );
		return ! isMobile
			? {
					placement: placement ? placement : 'left-start',
					offset: offset ? offset : 259,
			  }
			: {};
	}

	return (
		<div className="wpmvc-field-color-picker">
			<span className="wpmvc-field-label">{ field.label }</span>

			<Dropdown
				className="wpmvc-field-color-picker-dropdown"
				contentClassName="wpmvc-field-color-picker-dropdown-content"
				popoverProps={ dropdownProps() }
				renderToggle={ ( { isOpen, onToggle }: any ) => (
					<Button
						onClick={ onToggle }
						aria-expanded={ isOpen }
						className="wpmvc-field-color-picker-trigger"
					>
						<span className="wpmvc-field-color-picker-value">
							{ attributes[ attrKey ] }
						</span>
						<span
							className="wpmvc-field-color-picker-color"
							style={ { background: attributes[ attrKey ] } }
						></span>
					</Button>
				) }
				renderContent={ () => (
					<div className="wpmvc-field-color-picker-input">
						<ColorPicker
							color={ attributes[ attrKey ] }
							onChange={ ( value: string ) => {
								setAttributes( { [ attrKey ]: value } );
							} }
						/>
					</div>
				) }
			/>
		</div>
	);
}
