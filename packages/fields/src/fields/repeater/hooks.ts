import { useMemo } from '@wordpress/element';
import { RepeaterFieldType } from "./types";

export function useQuickFields( field?: RepeaterFieldType & { quickFields?: any; showHeader?: boolean } ) {
	return useMemo( () => {
		let quickFields = ( field as any )?.quickFields as any;
		if (field?.showHeader && quickFields && !Array.isArray(quickFields)) {
			quickFields = Object.fromEntries(
				Object.entries(quickFields as Record<string, any>).map(([key, config]) => {
					const { label: _omitLabel, ...restConfig } = config || {};
					return [key, restConfig];
				})
			) as typeof quickFields;
		}
		
		return quickFields;
	}, [ field ] );
}