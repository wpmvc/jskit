/**
 * WordPress dependencies
 */
import { useEffect, useState } from '@wordpress/element';
import { isFunction } from 'lodash';

type Option = { label: string; value: any };

type UseApiOptionsArgs = {
	optionsApi?: string | ( ( attributes: Record< string, any > ) => string );
	attributes: Record< string, any >;
	onFetchSuccess?: ( options: Option[] ) => void;
};

export function useApiOptions( {
	optionsApi,
	attributes,
	onFetchSuccess,
}: UseApiOptionsArgs ) {
	const [ options, setOptions ] = useState< Option[] | null >( null );
	const [ isLoading, setIsLoading ] = useState( false );

	useEffect( () => {
		if ( ! optionsApi ) {
			setOptions( null );
			setIsLoading( false );
			return;
		}

		let isCancelled = false;
		setIsLoading( true );

		const apiFetch = ( window as any )?.wp?.apiFetch as
			| ( ( options: any ) => Promise< any > )
			| undefined;

		if ( ! apiFetch ) {
			// eslint-disable-next-line no-console
			console.error( 'wp.apiFetch is not available' );
			setIsLoading( false );
			setOptions( [] );
			return;
		}

		apiFetch( {
			path: isFunction( optionsApi )
				? optionsApi( attributes )
				: optionsApi,
		} )
			.then( ( data: any ) => {
				if ( isCancelled ) return;
				setOptions( data );
				onFetchSuccess?.( data );
			} )
			.catch( ( err: any ) => {
				if ( isCancelled ) return;
				// eslint-disable-next-line no-console
				console.error( 'Select options fetch failed:', err );
				setOptions( [] );
			} )
			.finally( () => {
				if ( isCancelled ) return;
				setIsLoading( false );
			} );

		return () => {
			isCancelled = true;
		};
	}, [ optionsApi, attributes ] );

	return { options, isLoading };
}
