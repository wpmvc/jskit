import { useState, useCallback } from '@wordpress/element';

type Attributes = Record< string, any >;

export function useAttributes(
	defaultValues: Attributes = {}
): [ Attributes, ( newValues: Attributes ) => void, () => void ] {
	const [ attributes, setAttributesState ] =
		useState< Attributes >( defaultValues );

	const setAttributes = useCallback( ( newValues: Attributes ) => {
		setAttributesState( ( prev ) => ( {
			...prev,
			...newValues,
		} ) );
	}, [] );

	const resetAttributes = useCallback( () => {
		setAttributesState( defaultValues );
	}, [ defaultValues ] );

	return [ attributes, setAttributes, resetAttributes ];
}
