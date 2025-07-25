import { useEffect, useState } from '@wordpress/element';
//@ts-ignore
import { DataViews } from '@wordpress/dataviews/wp';
import { has, map } from 'lodash';
import { Column, TableType } from './types';

const defaultLayouts = {
	table: {
		layout: {
			styles: {},
			primaryField: 'id',
		},
	},
};

const Table = ( {
	items,
	total,
	isLoading,
	fields,
	refresh,
	actions,
	queryParams,
	titleField,
	mediaField,
	layoutType,
	layout,
	layouts,
}: TableType ) => {
	let defaultView = {
		search: '',
		page: 1,
		perPage: 10,
		layout: layout ?? defaultLayouts.table.layout,
		fields: map( fields, 'id' ).filter(value => {
			return value !== titleField && value !== mediaField;
		}),
		sort: {},
		type: layoutType ?? 'table',
	};

	if ( titleField ) {
		//@ts-ignore
		defaultView.titleField = titleField;
	}

	if ( mediaField ) {
		//@ts-ignore
		defaultView.mediaField = mediaField;
	}

	const [ view, setView ] = useState( defaultView );

	const [ processedFields, setProcessedFields ] = useState< Array< Column > >(
		[]
	);

	useEffect( () => {
		const updatedFields = fields.map( ( field ) => {
			if ( ! has( field, 'enableSorting' ) ) {
				return Object.assign( { enableSorting: false }, field );
			}
			return field;
		} );
		setProcessedFields( updatedFields );
	}, [ fields ] );

	useEffect( () => {
		setView( ( prev ) => ( {
			...prev,
			...queryParams,
		} ) );
	}, [ queryParams ] );

	useEffect( () => {
		refresh( {
			search: view.search,
			page: view.page,
			perPage: view.perPage,
			sort: view.sort,
		} );
	}, [ view.search, view.page, view.perPage, view.sort ] );

	const handleChangeView = ( newView: any ) => {
		setView( ( prev ) => ( {
			...prev,
			...newView,
		} ) );
	};

	return (
		<DataViews
			data={ items }
			fields={ processedFields }
			view={ view }
			onChangeView={ handleChangeView }
			defaultLayouts={ layouts ?? defaultLayouts }
			actions={ actions }
			paginationInfo={ {
				totalItems: total,
				totalPages: Math.ceil( total / view.perPage ),
			} }
			isLoading={ isLoading }
		/>
	);
};

export default Table;
