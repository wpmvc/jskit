/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { PrivateFields } from '..';
import { TabsFieldProps } from './types';
import { StyledTabPanel } from './styled';

export default function Tabs( props: TabsFieldProps ): JSX.Element {
	const { field } = props;
	const [ selectedTab, setSelectedTab ] = useState< string >( '' );

	const renderTabContent = ( tabName: string ) => {
		return (
			<PrivateFields
				{ ...props }
				fields={ field.items[ tabName ].fields }
			/>
		);
	};

	const tabs = Object.keys( field.items ).map( ( key ) => ( {
		name: key,
		title: (
			<span className="tab-title">
				{ field.items[ key ]?.icon }
				{ field.items[ key ].label }
			</span>
		),
	} ) );

	const selectedTabIndex = tabs.findIndex(
		( tab ) => tab.name === selectedTab
	);

	return (
		<StyledTabPanel
			className={ `field-tabs field-tabs--${ selectedTab }` }
			//@ts-ignore
			tabs={ tabs }
			onSelect={ setSelectedTab }
			tabsLength={ tabs.length }
			selectedTabIndex={ selectedTabIndex }
		>
			{ ( tab ) => renderTabContent( tab.name ) }
		</StyledTabPanel>
	);
}
