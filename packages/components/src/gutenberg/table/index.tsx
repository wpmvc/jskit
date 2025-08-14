import { useEffect, useMemo, useState } from '@wordpress/element';
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
	if ( ! layoutType ) {
		layoutType = 'table';
	}

	const defaultFieldIds = useMemo(
		() =>
			map( fields, 'id' ).filter(
				( id ) => id !== titleField && id !== mediaField
			),
		[ fields, titleField, mediaField ]
	);

	const initialView = useMemo( () => {
		const baseView: any = {
			search: '',
			page: 1,
			perPage: 10,
			layout: layout ?? defaultLayouts.table.layout,
			fields: defaultFieldIds,
			sort: {},
			type: layoutType,
		};

		if ( titleField ) baseView.titleField = titleField;
		if ( mediaField ) baseView.mediaField = mediaField;

		return baseView;
	}, [ layout, layoutType, defaultFieldIds, titleField, mediaField ] );

	const [ view, setView ] = useState( initialView );

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
		setView( ( prev: any ) => ( {
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
		setView( ( prev: any ) => ( {
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
