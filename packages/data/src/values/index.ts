import { createReduxStore, register, select } from '@wordpress/data';
import getValuesConfig from './config';
import { StoreConfig } from '../types';

export default function registerValuesStore( storeConfig: StoreConfig ) {
	if ( select( storeConfig.name ) ) {
		return;
	}

	const store = createReduxStore(
		storeConfig.name,
		getValuesConfig( storeConfig )
	);
	register( store );
}
