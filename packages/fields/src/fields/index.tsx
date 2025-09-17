/**
 * WordPress dependencies
 */
import { ComponentType, Fragment } from '@wordpress/element';

/**
 * External dependencies
 */
import { has } from 'lodash';
import { Field, FieldProps, FieldRootProps } from '../types/field';

/**
 * Internal dependencies
 */
import clsx from 'clsx';
import styled, { CSSProperties } from 'styled-components';
import Border from './border';
import Checkbox from './checkbox';
import PickColor from './color-picker';
import Colors from './colors';
import Dimension from './dimension';
import Group from './group';
import ImageChoice from './image-choice';
import Label from './label';
import Notice from './notice';
import Number from './number';
import Panel from './panel';
import Radio from './radio';
import Repeater from './repeater';
import Row from './row';
import Select from './select';
import Slider from './slider';
import Switch from './switch';
import Tabs from './tabs';
import Text from './text';
import ToggleGroup from './toggle-group';

/**
 * Mapping of field types to their respective components
 * Sorted by field type for consistent rendering order
 */
const defaultComponents: {
	//@ts-ignore
	[ key: string ]: ComponentType< FieldProps >;
} = {
	text: Text,
	number: Number,
	switch: Switch,
	checkbox: Checkbox,
	tabs: Tabs,
	color: PickColor,
	colors: Colors,
	group: Group,
	border: Border,
	dimension: Dimension,
	notice: Notice,
	panel: Panel,
	radio: Radio,
	select: Select,
	slider: Slider,
	toggleGroup: ToggleGroup,
	repeater: Repeater,
	row: Row,
	imageChoice: ImageChoice,
	label: Label,
};

const StyledFields = styled.div`
	.wpmvc-field {
		&:not( .panel-field ),
		&:has( + :not( .panel-field ) ) {
			padding-bottom: 20px;
		}

		&:has( :last-child:not( .panel-field ) ):last-child {
			padding-bottom: 0px;
		}

		.components-panel__body {
			border-top: 0;
		}

		&.row {
			padding-bottom: 0;
		}
	}
`;
/**
 * PrivateFields component that dynamically renders various field components
 * based on the `fields` prop provided.
 *
 * @param {FieldProps} props Component props
 * @returns {JSX.Element | null} Rendered field components or null
 */
export function PrivateFields( props: FieldProps ): JSX.Element | null {
	const { fields, attributes, components } = props;
	/**
	 * Memoized list of field keys to prevent unnecessary recalculation
	 * on re-renders.
	 */
	const _fields = fields ?? {};
	const fieldKeys = Object.keys( _fields );

	// Early return if no fields exist
	if ( fieldKeys.length === 0 ) {
		return null;
	}

	return (
		<Fragment>
			{ fieldKeys.map( ( key ) => {
				const field: Field = _fields[ key ] ?? {};

				// Dynamically select the field component based on the field.type
				const FieldView = components[ field.type ];

				// If no field component exists, log an error and skip rendering
				if ( ! FieldView ) {
					console.error(
						`No field component found for type: ${ field.type }`
					);
					return null;
				}

				// Skip rendering if the condition for the field is not met
				if (
					has( field, 'condition' ) &&
					field.condition &&
					! field.condition( attributes )
				) {
					return null; // Field is hidden based on the condition
				}

				// Return the actual field component with the necessary props
				return (
					<div
						key={ key }
						className={ clsx(
							'wpmvc-field',
							`${ field.type }-field`,
							field?.className
						) }
						style={ field.style }
					>
						<FieldView
							{ ...props }
							attrKey={ key }
							field={ field }
							attributes={ attributes }
						/>
					</div>
				);
			} ) }
		</Fragment>
	);
}

/**
 * @param {FieldRootProps} props Component props
 * @returns {JSX.Element | null} Rendered field components or null
 */
export default function Fields(
	props: FieldRootProps & { style?: CSSProperties | undefined }
): JSX.Element | null {
	const { components = {} } = props;
	return (
		<StyledFields style={ props.style }>
			{ /* @ts-ignore */ }
			<PrivateFields
				{ ...props }
				components={ { ...defaultComponents, ...components } }
			/>
		</StyledFields>
	);
}
