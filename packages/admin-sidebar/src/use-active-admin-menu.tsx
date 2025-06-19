// @ts-ignore
import { useLayoutEffect } from '@wordpress/element';
import { ActiveMenuConfig } from './types';

declare global {
	interface Window {
		// @ts-ignore
		jQuery: JQueryStatic;
	}
}

// @ts-ignore
let prevMenu: JQuery | null = null;

/**
 * Custom hook to manage active state for WordPress admin sidebar menu
 * @param config Configuration options
 */
export default function useActiveAdminMenu( config: ActiveMenuConfig ) {
	const { pageTopLevelID, rootPaths = [ '/' ], location, navigate } = config;

	const $ = window.jQuery;

	useLayoutEffect( () => {
		const $firstMenu = $( pageTopLevelID ).find( 'a.wp-first-item' );
		// @ts-ignore
		const handler = ( ev: JQuery.Event ) => {
			ev.preventDefault();
			navigate( rootPaths[ 0 ] );
		};

		$firstMenu.off( 'click' ).on( 'click', handler );

		return () => {
			$firstMenu.off( 'click', handler );
		};
	}, [ navigate, pageTopLevelID, rootPaths, $ ] );

	useLayoutEffect( () => {
		const $scope = $( pageTopLevelID );
		const pathname = location.pathname;
		// @ts-ignore
		let $currentMenu: JQuery | null = null;

		if ( rootPaths.includes( pathname ) ) {
			$currentMenu = $scope.find( 'a.wp-first-item' );
		} else {
			$scope
				.find( 'a' )
				.not( '.wp-first-item, .wp-has-submenu' )
				.each( ( _: any, menu: any ) => {
					const $menu = $( menu );
					const url = $menu.attr( 'href' )?.split( '#' )[ 1 ];
					if ( url && pathname.startsWith( url ) ) {
						$currentMenu = $menu;
						return false;
					}
				} );
		}

		if ( ! $currentMenu || ( prevMenu && prevMenu.is( $currentMenu ) ) )
			return;

		$scope.find( 'li, a' ).removeClass( 'current' );
		$currentMenu.addClass( 'current' ).parent().addClass( 'current' );
		prevMenu = $currentMenu;
	}, [ location, pageTopLevelID, rootPaths, $ ] );
}
