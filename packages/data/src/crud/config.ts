import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { produce } from 'immer';
import {
	Actions,
	ResetAction,
	SetIndexQueryParamsAction,
	SetItemAction,
	SetItemsAction,
	State,
} from './types';
import { StoreConfig } from '../types';

export default function getCrudConfig( { path }: StoreConfig ) {
	const DEFAULT_STATE: State = {
		path,
		item: null,
		items: [],
		indexQueryParams: {
			search: '',
			page: 1,
			perPage: 10,
			sort: {}
		},
	};

	const actions = {
		setItem( item: any ): SetItemAction {
			return { type: 'SET_ITEM', item };
		},
		setItems( items: any ): SetItemsAction {
			return { type: 'SET_ITEMS', items };
		},
		reset(): ResetAction {
			return { type: 'RESET' };
		},
		setIndexQueryParams( params: any ): SetIndexQueryParamsAction {
			return { type: 'SET_INDEX_QUERY_PARAMS', params };
		},
	};

	return {
		reducer( state: State = DEFAULT_STATE, action: Actions ): State {
			return produce( state, ( draft ) => {
				switch ( action.type ) {
					case 'SET_ITEM':
						draft.item = action.item;
						break;
					case 'SET_ITEMS':
						draft.items = action.items;
						break;
					case 'RESET':
						draft.items = [];
						draft.item = null;
						break;
					case 'SET_INDEX_QUERY_PARAMS':
						draft.indexQueryParams = action.params;
						break;
				}
			} );
		},

		actions: {
			...actions,

			store( payload: any ) {
				return async ( { dispatch }: { dispatch: typeof actions } ) => {
					const response = await apiFetch( {
						path,
						method: 'POST',
						data: payload,
					} );

					//@ts-ignore
					dispatch.invalidateResolution( 'get' );

					return response;
				};
			},

			update( id: string, payload: any ) {
				return async ( { dispatch }: { dispatch: typeof actions } ) => {
					const response = await apiFetch( {
						path: `${ path }/${ id }`,
						method: 'PATCH',
						data: payload,
					} );

					//@ts-ignore
					dispatch.invalidateResolution( 'get' );

					return response;
				};
			},

			destroy( id: string ) {
				return async ( { dispatch }: { dispatch: typeof actions } ) => {
					const response = await apiFetch( {
						path: `${ path }/${ id }`,
						method: 'DELETE',
					} );

					//@ts-ignore
					dispatch.invalidateResolution( 'get' );
					return response;
				};
			},

			refresh: ( params?: any ) => {
				return ( { dispatch }: { dispatch: typeof actions } ) => {
					if ( params ) {
						dispatch.reset();
						dispatch.setIndexQueryParams( params );
					}

					//@ts-ignore
					dispatch.invalidateResolution( 'get' );
					//@ts-ignore
					dispatch.invalidateResolution( 'show' );
				};
			},
			resetQueryParamsAndRefresh: () => {
				return ( { dispatch }: { dispatch: typeof actions } ) => {
					dispatch.setIndexQueryParams(
						DEFAULT_STATE.indexQueryParams
					);
					//@ts-ignore
					dispatch.invalidateResolution( 'get' );
					//@ts-ignore
					dispatch.invalidateResolution( 'show' );
				};
			},
		},

		selectors: {
			get( state: State ) {
				return state.items;
			},

			getIndexQueryParams( state: State ) {
				return state.indexQueryParams;
			},

			getItem( state: State ) {
				return state.item;
			},

			show( state: State ) {
				return state.item;
			},

			getPath( state: State ) {
				return state.path;
			},
		},

		resolvers: {
			get() {
				return async ( {
					dispatch,
					select,
				}: {
					dispatch: typeof actions;
					select: any;
				} ) => {
					const data = await apiFetch( {
						path: addQueryArgs(
							path,
							select.getIndexQueryParams()
						),
					} );

					dispatch.setItems( data );
				};
			},
			show( { id }: { id: string } ) {
				return async ( { dispatch }: { dispatch: typeof actions } ) => {
					const fullPath = `${ path }/${ id }`;
					const data = await apiFetch( { path: fullPath } );
					dispatch.setItem( data );
				};
			},
		},
	};
}
