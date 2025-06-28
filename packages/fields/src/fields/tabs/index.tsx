/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { PrivateFields } from '..';
import { TabsFieldProps } from './types';
import { Tabs as TabsComponent } from '@wpmvc/components';

export default function Tabs( props: TabsFieldProps ): JSX.Element {
	const { field } = props;
	const { items } = field;

	const itemsWithChildren = Object.entries( items ).reduce(
		( acc, [ key, item ] ) => {
			acc[ key ] = {
				...item,
				//@ts-ignore
				children: <PrivateFields { ...props } fields={ item.fields } />,
			};
			return acc;
		},
		{} as { [key: string]: any }
	);

	return <TabsComponent items={ itemsWithChildren } />;
}
