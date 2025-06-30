/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { __experimentalDropdownContentWrapper as DropdownContentWrapper } from '@wordpress/components';
import { useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import ColorField from './color-field';
import TabPanel from './style';

export default function Popover( {
	element,
	attrKey,
	attributes,
	setAttributes,
	elementColors,
	preset,
}: any ) {
	const { colors } = element;

	const tabs = useMemo( () => {
		let tabs: any[] = [];
		Object.keys( colors ).map( ( key ) => {
			tabs.push( {
				name: key,
				title: colors[ key ].label,
				className: '',
			} );
		} );
		return tabs;
	}, [] );

	// const onSelect = (tabName) => {
	// 	console.log('Selecting tab', tabName);
	// };

	const onChange = ( colorKey: any, value: any ) => {
		setAttributes( {
			[ attrKey ]: {
				...attributes[ attrKey ],
				[ element.name ]: {
					...elementColors,
					[ colorKey ]: value ?? '',
				},
			},
		} );
	};

	return (
		<DropdownContentWrapper paddingSize="none">
			<div className="block-editor-panel-color-gradient-settings__dropdown-content">
				{ 1 === tabs.length ? (
					<ColorField
						onChange={ ( value: any ) =>
							onChange( tabs[ 0 ].name, value )
						}
						value={ elementColors?.[ tabs[ 0 ].name ] }
						colors={ preset }
					/>
				) : (
					<TabPanel
						className=""
						activeClass="active-tab"
						// onSelect={onSelect}
						tabs={ tabs }
					>
						{ ( tab: any ) => (
							<ColorField
								key={ tab.name }
								onChange={ ( value: any ) =>
									onChange( tab.name, value )
								}
								value={ elementColors?.[ tab.name ] }
								colors={ preset }
							/>
						) }
					</TabPanel>
				) }
			</div>
		</DropdownContentWrapper>
	);
}
