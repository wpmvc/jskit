import { createReduxStore, register, select } from '@wordpress/data';
import { produce } from 'immer';
import getCrudConfig from './config';
import { StoreConfig } from '../types';

export default function registerCrudStore( storeConfig: StoreConfig ) {
	if ( select( storeConfig.name ) ) {
		return;
	}

	const defaultConfig = getCrudConfig( storeConfig );

	// console.log(defaultConfig);

	const extendedConfig = produce( defaultConfig, ( config ) => {
		//override store
	} );

	const store = createReduxStore( storeConfig.name, extendedConfig );
	register( store );
}
