import { createReduxStore, register, select } from '@wordpress/data';
import getConfig from './config';

export default function registerColorsStore() {
	const storeName = 'wpmvc/colors';

	if ( select( storeName ) ) {
		return;
	}

	const store = createReduxStore( storeName, getConfig() );
	register( store );
}
