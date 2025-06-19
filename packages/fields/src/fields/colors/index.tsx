/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
//@ts-ignore
import { useViewportMatch } from '@wordpress/compose';
import {
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
	Dropdown,
} from '@wordpress/components';

/**
 * External dependencies
 */
import { isEqual } from 'lodash';

/**
 * Internal dependencies
 */
import Popover from './popover';
import Indicator from './indicator';
import { ColorsFieldProps } from './types';

export default function Colors( {
	attrKey,
	metaData,
	field,
	attributes,
	setAttributes,
	placement,
	offset,
}: ColorsFieldProps ): JSX.Element {
	const panelId = attrKey;
	const resetAll = () => {
		setAttributes( {
			[ attrKey ]: metaData?.attributes?.[ attrKey ]?.default ?? {},
		} );
	};

	const hasValue = ( elementName: any ) => {
		const elementColors = attributes[ attrKey ]?.[ elementName ] ?? {};
		const elementDefaultColors =
			metaData?.attributes[ attrKey ]?.default?.[ elementName ] ?? {};

		return ! isEqual( elementColors, elementDefaultColors );
	};

	const onDeselect = ( elementName: any ) => {
		const elementDefaultColors =
			metaData?.attributes[ attrKey ]?.default?.[ elementName ] ?? {};

		setAttributes( {
			[ attrKey ]: {
				...attributes[ attrKey ],
				[ elementName ]: elementDefaultColors,
			},
		} );
	};

	function dropdownProps() {
		const isMobile = useViewportMatch( 'medium', '<' );
		return ! isMobile
			? {
					popoverProps: {
						placement: placement ? placement : 'left-start',
						// For non-mobile, inner sidebar width (248px) - button width (24px) - border (1px) + padding (16px) + spacing (20px)
						offset: offset ? offset : 259,
					},
			  }
			: {};
	}

	const _dropdownProps = dropdownProps();

	return (
		<ToolsPanel
			label={ field.label }
			resetAll={ resetAll }
			panelId={ panelId }
			hasInnerWrapper
			headingLevel={ 2 }
			className="color-block-support-panel"
			__experimentalFirstVisibleItemClass="first"
			__experimentalLastVisibleItemClass="last"
			dropdownMenuProps={ { ..._dropdownProps, label: field.label } }
			style={ {
				...( field?.insidePanel
					? {
							paddingLeft: 0,
							paddingRight: 0,
							paddingTop: 0,
							border: 0,
					  }
					: {} ),
			} }
		>
			<div className="color-block-support-panel__inner-wrapper">
				{ Object.keys( field.items ).map( ( name ) => {
					const element = field.items[ name ];
					element.name = name;
					const elementColors =
						attributes[ attrKey ]?.[ element.name ] ?? {};
					const { label } = element;

					return (
						<ToolsPanelItem
							key={ name }
							hasValue={ () => hasValue( name ) }
							panelId={ panelId }
							label={ label }
							onDeselect={ () => onDeselect( name ) }
							className="block-editor-tools-panel-color-gradient-settings__item"
							isShownByDefault={ element.showByDefault }
						>
							<Dropdown
								popoverProps={ {
									placement: placement
										? placement
										: 'left-start',
									offset: 36,
									shift: true,
								} }
								className="block-editor-tools-panel-color-gradient-settings__dropdown"
								renderToggle={ ( {
									isOpen,
									onToggle,
								}: any ) => {
									return (
										<Indicator
											isOpen={ isOpen }
											onToggle={ onToggle }
											label={ label }
											elementColors={ elementColors }
										/>
									);
								} }
								renderContent={ () => {
									return (
										<Popover
											element={ element }
											attrKey={ attrKey }
											attributes={ attributes }
											setAttributes={ setAttributes }
											elementColors={ elementColors }
										/>
									);
								} }
							/>
						</ToolsPanelItem>
					);
				} ) }
			</div>
		</ToolsPanel>
	);
}
