/**
 * External dependencies
 */
import { has, isEmpty, isObject } from 'lodash';
import { FieldProps } from './types/field';

export function isResponsive( fieldProps: FieldProps ): boolean {
	const { field } = fieldProps;
	return has( field, 'isResponsive' ) && field.isResponsive === true;
}

export function getValue(
	fieldProps: FieldProps,
	defaultValue: any = undefined
): any {
	const { attrKey, attributes, device } = fieldProps;
	// @ts-ignore
	if ( isResponsive( fieldProps ) ) {
		if ( device !== undefined && device !== null ) {
			return (
				attributes[ attrKey ]?.[ device ] ??
				attributes[ attrKey ] ??
				defaultValue
			);
		}

		return ! isEmpty( attributes[ attrKey ] )
			? attributes[ attrKey ]
			: defaultValue;
	}
	return attributes[ attrKey ];
}

export function updateAttribute( value: any, fieldProps: FieldProps ) {
	if ( isDisabled( fieldProps ) ) {
		return;
	}

	const { attrKey, setAttributes, attributes, device, field, metaData } =
		fieldProps;
	const defaultValues = metaData?.attributes[ attrKey ]?.default;

	let updatedValues = {} as any;

	if ( isResponsive( fieldProps ) ) {
		if ( ! defaultValues?.desktop ) {
			if ( isObject( value ) ) {
				value = {
					...( defaultValues || {} ),
					...value,
				};
			}
		}

		let attribute = attributes[ attrKey ] || {};

		if ( isObject( value ) && ! Array.isArray( value ) ) {
			updatedValues = {
				desktop: attribute?.desktop ?? {},
				tablet: attribute?.tablet ?? {},
				mobile: attribute?.mobile ?? {},
				[ device as string ]: value ?? {},
			};
		} else {
			updatedValues = {
				desktop: attribute?.desktop,
				tablet: attribute?.tablet,
				mobile: attribute?.mobile,
				[ device as string ]: value,
			};
		}
	} else {
		if ( isObject( value ) && ! Array.isArray( value ) ) {
			value = {
				...( defaultValues || {} ),
				...value,
			};
		}
		updatedValues = value;
	}

	setAttributes( {
		[ attrKey ]: updatedValues,
	} );

	//@ts-ignore
	if ( field?.onChange ) {
		//@ts-ignore
		field.onChange( fieldProps );
	}

	return updatedValues;
}

export function isDisabled( fieldProps: FieldProps ): boolean {
	const { field, isProAvailable } = fieldProps;

	//@ts-ignore
	if ( !! field.isPro && ! isProAvailable ) {
		return true;
	}

	//@ts-ignore
	if ( typeof field.disabled === 'function' ) {
		//@ts-ignore
		return field.disabled( fieldProps );
	}

	//@ts-ignore
	return !! field.disabled;
}

// export function memoCallback(
// 	prevProps: FieldProps,
// 	nextProps: FieldProps
// ): boolean {
// 	return (
// 		prevProps.attributes[ prevProps.attrKey ] ===
// 			nextProps.attributes[ nextProps.attrKey ] &&
// 		prevProps.device === nextProps.device &&
// 		isDisabled( prevProps ) === isDisabled( nextProps )
// 	);
// }
