import { useDispatch, useSelect } from '@wordpress/data';
import { CrudSelectorConfig, StoreConfig } from './types';

export function useValuesStore( { name }: StoreConfig ) {
	const { remove, refresh, save } = useDispatch( name );
	return { remove, refresh, save };
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
	const { refresh, store } = useDispatch( name );
	return { refresh, store };
}

export function useCrudStoreData( {
	name,
	selector,
	params,
}: CrudSelectorConfig ) {
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
