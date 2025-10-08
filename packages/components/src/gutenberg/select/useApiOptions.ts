/**
 * WordPress dependencies
 */
import { useEffect, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

type Option = { label: string; value: any };

type UseApiOptionsArgs = {
	optionsApi?: string;
	onFetchSuccess?: ( options: any[] ) => void;
};

export function useApiOptions( {
	optionsApi,
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

		apiFetch( { path: optionsApi } )
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
	}, [ optionsApi ] );

	return { options, isLoading };
}
