/**
 * WordPress dependencies
 */
import { useEffect, useState } from '@wordpress/element';

type Option = { label: string; value: any };

type UseApiOptionsArgs = {
	optionsApi?: string;
};

export function useApiOptions( {
	optionsApi
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
			| ( ( options: any ) => Promise<any> )
			| undefined;

		if ( ! apiFetch ) {
			// eslint-disable-next-line no-console
			console.error( 'wp.apiFetch is not available' );
			setIsLoading( false );
			setOptions( [] );
			return;
		}

		apiFetch( { path: optionsApi } )
			.then( ( data: any ) => {
				if ( isCancelled ) return;
				setOptions( data );
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


