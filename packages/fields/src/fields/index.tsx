/**
 * WordPress dependencies
 */
import { Fragment, ComponentType } from '@wordpress/element';

/**
 * External dependencies
 */
import { has } from 'lodash';
import { FieldProps, Field, FieldRootProps } from '../types/field';

/**
 * Internal dependencies
 */
import Checkbox from './checkbox';
import Border from './border';
import Dimension from './dimension';
import Height from './height';
import Number from './number';
import Panel from './panel';
import PickColor from './color-picker';
import Radio from './radio';
import Select from './select';
import Slider from './slider';
import Switch from './switch';
import Text from './text';
import Colors from './colors';
import ToggleGroup from './toggle-group';
import Repeater from './repeater';
import Notice from './notice';
import Tabs from './tabs';
import styled, { CSSProperties } from 'styled-components';
import Group from './group';
import Row from './row';

/**
 * Mapping of field types to their respective components
 * Sorted by field type for consistent rendering order
 */
const defaultComponents: {
	//@ts-ignore
	[ key: string ]: ComponentType< FieldProps >;
} = {
	tabs: Tabs,
	color: PickColor,
	colors: Colors,
	group: Group,
	checkbox: Checkbox,
	border: Border,
	dimension: Dimension,
	height: Height,
	notice: Notice,
	number: Number,
	panel: Panel,
	radio: Radio,
	select: Select,
	slider: Slider,
	switch: Switch,
	text: Text,
	toggleGroup: ToggleGroup,
	repeater: Repeater,
	row: Row,
};

const StyledFields = styled.div`
	.wpmvc-field {
		&:not( .panel ),
		&:has( + :not( .panel ) ) {
			padding-bottom: 20px;
		}

		&:has( :last-child:not( .panel ) ):last-child {
			padding-bottom: 0px;
		}

		.components-panel__body {
			border-top: 0;
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
						className={ `wpmvc-field ${ field.type }` }
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
