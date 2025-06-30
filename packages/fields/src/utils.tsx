/**
 * External dependencies
 */
import { has } from 'lodash';
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
			return attributes[ attrKey ]?.[ device ] ?? defaultValue;
		}
		return defaultValue;
	}
	return attributes[ attrKey ];
}

export function updateAttribute( value: any, fieldProps: FieldProps ) {
	if ( isDisabled( fieldProps ) ) {
		return;
	}

	const { attrKey, setAttributes, attributes, device, field } = fieldProps;

	const updatedValues = isResponsive( fieldProps )
		? { ...attributes[ attrKey ], [ device as string ]: value }
		: value;

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

export function memoCallback(
	prevProps: FieldProps,
	nextProps: FieldProps
): boolean {
	return (
		prevProps.attributes[ prevProps.attrKey ] ===
			nextProps.attributes[ nextProps.attrKey ] &&
		prevProps.device === nextProps.device &&
		isDisabled( prevProps ) === isDisabled( nextProps )
	);
}
