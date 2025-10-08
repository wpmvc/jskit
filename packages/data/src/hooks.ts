import { useDispatch, useSelect } from '@wordpress/data';
import { CrudSelectorConfig, StoreConfig } from './types';

export function useValuesStore( { name }: StoreConfig ) {
	const { set, remove, refresh, save } = useDispatch( name );
	return { set, remove, refresh, save };
}

export function useValuesStoreData( { name }: StoreConfig ) {
	const { data, isResolved } = useSelect(
		( select: any ) => {
			const { get, hasFinishedResolution } = select( name );
			return {
				data: get(),
				isResolved: hasFinishedResolution( 'get' ),
			};
		},
		[ name ]
	);

	return { data, isResolved };
}

export function useCrudStore( { name }: StoreConfig ) {
	const {
		refresh,
		resetQueryParamsAndRefresh,
		create,
		update,
		updateItem,
		setItem,
		destroy,
	} = useDispatch( name );
	return {
		refresh,
		resetQueryParamsAndRefresh,
		create,
		update,
		updateItem,
		setItem,
		destroy,
	};
}

export function useCrudStoreData( { name, selector }: CrudSelectorConfig ) {
	const { data, isResolved } = useSelect(
		( select: any ) => {
			const { hasFinishedResolution, get, show } = select( name );
			const data = 'get' === selector ? get() : show();

			return {
				data,
				isResolved: hasFinishedResolution( selector ),
			};
		},
		[ name ]
	);

	return { data, isResolved };
}

export function useCrudQueryParams( { name }: { name: string } ) {
	return useSelect(
		( select: any ) => {
			const { getQueryParams } = select( name );
			return getQueryParams();
		},
		[ name ]
	);
}
