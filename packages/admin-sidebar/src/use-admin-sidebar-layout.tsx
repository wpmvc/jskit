//@ts-ignore
import { useLayoutEffect, useCallback, useState } from '@wordpress/element';
import { SidebarEventData, SidebarLayout } from './types';
//@ts-ignore
import { select } from '@wordpress/data';
//@ts-ignore
import { store } from '@wordpress/viewport';

declare global {
	interface Window {
		//@ts-ignore
		jQuery: JQueryStatic;
	}
}

const DEFAULT_LAYOUT: SidebarLayout = {
	left: 0,
	top: 0,
};

const SELECTORS = {
	ADMIN_MENU_WRAP: '#adminmenuwrap',
	ADMIN_BAR: '#wpadminbar',
	MENU_TOGGLE: '#wp-admin-bar-menu-toggle',
	RESPONSIVE_OPEN: '.wp-responsive-open',
};

const CUSTOM_EVENTS = {
	SIDEBAR_STATE: 'wp-menu-state-set wp-collapse-menu',
	RESPONSIVE_CLICK: 'click.wp-responsive',
};

const getSidebarWidth = () => {
	const $ = window.jQuery;
	return $( SELECTORS.ADMIN_MENU_WRAP ).outerWidth() || 0;
};

const getAdminBarHeight = () => {
	const $ = window.jQuery;
	return $( SELECTORS.ADMIN_BAR ).outerHeight() || 0;
};

/**
 * Hook to track WordPress admin sidebar status and calculate content layout
 */
export default function useAdminSidebarLayout(): SidebarLayout {
	const [ layout, setLayout ] = useState< SidebarLayout >( DEFAULT_LAYOUT );
	const $ = window.jQuery;

	const isSmall = (
		select( store ) as { isViewportMatch: ( query: string ) => boolean }
	 ).isViewportMatch( '< medium' );

	const calculateLayout = useCallback( ( sidebarWidth: number ) => {
		setLayout( {
			left: sidebarWidth,
			top: getAdminBarHeight(),
		} );
	}, [] );

	const calculateResponsiveLayout = useCallback( () => {
		const sidebarWidth = document.querySelector( SELECTORS.RESPONSIVE_OPEN )
			? getSidebarWidth()
			: 0;
		calculateLayout( sidebarWidth );
	}, [ calculateLayout ] );

	const handleSidebarStatusChange = useCallback(
		//@ts-ignore
		( _event: JQuery.Event, eventData: SidebarEventData ) => {
			if ( eventData.state === 'open' || eventData.state === 'folded' ) {
				calculateLayout( getSidebarWidth() );
			} else if ( eventData.state === 'responsive' ) {
				calculateResponsiveLayout();
			}
		},
		[ calculateLayout, calculateResponsiveLayout ]
	);

	const handleResponsiveClick = useCallback( () => {
		calculateResponsiveLayout();
	}, [ calculateResponsiveLayout ] );

	useLayoutEffect( () => {
		if ( isSmall ) {
			calculateResponsiveLayout();
		} else {
			calculateLayout( getSidebarWidth() );
		}

		// Set up event listeners
		$( document ).on(
			CUSTOM_EVENTS.SIDEBAR_STATE,
			handleSidebarStatusChange
		);
		$( SELECTORS.MENU_TOGGLE ).on(
			CUSTOM_EVENTS.RESPONSIVE_CLICK,
			handleResponsiveClick
		);

		// Clean up event listeners
		return () => {
			$( document ).off(
				CUSTOM_EVENTS.SIDEBAR_STATE,
				handleSidebarStatusChange
			);
			$( SELECTORS.MENU_TOGGLE ).off(
				CUSTOM_EVENTS.RESPONSIVE_CLICK,
				handleResponsiveClick
			);
		};
	}, [
		isSmall,
		calculateLayout,
		calculateResponsiveLayout,
		handleSidebarStatusChange,
		handleResponsiveClick,
	] );

	return layout;
}
