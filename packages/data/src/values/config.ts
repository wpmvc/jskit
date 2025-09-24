import apiFetch from '@wordpress/api-fetch';
import { produce } from 'immer';
import { StoreConfig } from '../types';
import { Actions, RemoveAction, SetAction, StoreState } from './types';

export default function getValuesConfig( { path }: StoreConfig ) {
	const INITIAL_STATE: StoreState = {
		path,
		values: {},
	};

	const actions = {
		set(
			keyOrObject: string | Record< string, any > | any,
			value?: any
		): SetAction {
			const values =
				typeof keyOrObject === 'string'
					? { [ keyOrObject ]: value }
					: keyOrObject;
			return { type: 'SET', values };
		},
		remove( key: string ): RemoveAction {
			return { type: 'REMOVE', key };
		},
	};

	return {
		reducer( state = INITIAL_STATE, action: Actions ) {
			return produce( state, ( draft: any ) => {
				switch ( action.type ) {
					case 'SET':
						// console.log( JSON.parse(JSON.stringify(draft.values)), action.values, state);
						// draft.values = {
						// 	...state.values,

						// }
						// draft.values = {
						// 	...action.values,
						// }
						Object.assign( draft.values, action.values );
						break;

					case 'REMOVE':
						delete draft.values[ action.key ];
						break;
				}
			} );
		},

		actions: {
			...actions,
			refresh: () => {
				return ( { dispatch }: { dispatch: any } ) => {
					//@ts-ignore
					dispatch.invalidateResolution( 'get' );
				};
			},
			save: ( data: Record< string, any > ) => {
				return async ( { dispatch }: { dispatch: any } ) => {
					let response = await apiFetch( {
						path,
						data,
						method: 'POST',
					} );
					dispatch.refresh();
					return response;
				};
			},
		},

		selectors: {
			get( state: StoreState ) {
				return state.values;
			},
			getByKey( state: StoreState ) {
				return state.values;
			},
		},

		resolvers: {
			get() {
				return async ( { dispatch }: { dispatch: typeof actions } ) => {
					const data = await apiFetch( { path } );
					dispatch.set( data );
				};
			},
		},
	};
}
