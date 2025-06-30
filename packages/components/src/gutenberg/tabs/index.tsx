import { useState, useMemo } from '@wordpress/element';
import { StyledTabPanel } from './styled';
import type { TabsProps } from './types';
import clsx from 'clsx';

export default function Tabs( {
	items,
	activeKey,
	onChange,
	className,
	style,
}: TabsProps ): JSX.Element {
	const allItems = useMemo( () => Object.entries( items ), [ items ] );

	const firstEnabledKey =
		activeKey ??
		allItems.find( ( [ _, item ] ) => ! item.disabled )?.[ 0 ] ??
		'';

	const [ selectedKey, setSelectedKey ] =
		useState< string >( firstEnabledKey );

	const handleSelect = ( key: string ) => {
		if ( items[ key ]?.disabled ) return;
		setSelectedKey( key );
		onChange?.( key );
	};

	const tabList = allItems.map( ( [ key, item ] ) => ( {
		name: key,
		title: (
			<span className="tab-title">
				{ item.icon && <span className="tab-icon">{ item.icon }</span> }
				<span className="tab-label">{ item.label }</span>
			</span>
		),
		disabled: item.disabled,
	} ) );

	const selectedTabIndex = tabList.findIndex(
		( tab ) => tab.name === selectedKey
	);

	return (
		<StyledTabPanel
			className={ clsx( className, `selected-tab--${ selectedKey }` ) }
			style={ style }
			//@ts-ignore
			tabs={ tabList }
			onSelect={ handleSelect }
			tabsLength={ tabList.length }
			selectedTabIndex={ selectedTabIndex }
		>
			{ () => items[ selectedKey ]?.children ?? null }
		</StyledTabPanel>
	);
}
