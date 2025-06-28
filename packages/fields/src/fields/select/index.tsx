/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import Select, { components, MultiValue, SingleValue } from 'react-select';
import { isFunction } from 'lodash';

/**
 * Internal dependencies
 */
import Label from '../../components/label';
import { getValue, isDisabled, updateAttribute } from '../../utils';
import { SelectFieldProps } from './types';
import { Chevron, StyledHelpText, StyledLabel, Wrapper } from './styles';

const DropdownIndicator = ( menuIsOpen: boolean ) => ( props: any ) => (
	<components.DropdownIndicator { ...props }>
		<Chevron
			$open={ menuIsOpen }
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<polyline points="6 9 12 15 18 9" />
		</Chevron>
	</components.DropdownIndicator>
);

export default function SelectComponent( props: SelectFieldProps ) {
	const { field, attributes } = props;
	const { options, description, label } = field || {};
	const [ menuIsOpen, setMenuIsOpen ] = useState( false );

	const isMulti = Boolean( field?.isMulti );
	const normalizedOptions = isFunction( options )
		? options( attributes )
		: options || [];

	const rawValue = getValue( props );
	const value = isMulti
		? ( rawValue || [] )
				.map( ( val: any ) =>
					normalizedOptions.find( ( opt ) => opt.value === val )
				)
				.filter( Boolean )
		: normalizedOptions.find( ( opt ) => opt.value === rawValue );

	const handleChange = (
		newValue:
			| SingleValue< {
					value: any;
					label: string;
			  } >
			| MultiValue< { value: any; label: string } >
	) => {
		if ( isMulti ) {
			const values = Array.isArray( newValue )
				? newValue.map( ( option ) => option.value )
				: [];
			updateAttribute( values, props );
		} else {
			updateAttribute( ( newValue as any )?.value ?? null, props );
		}
	};

	return (
		<div className="components-base-control">
			<Wrapper className="components-base-field">
				{ label && (
					<StyledLabel className="components-base-control__label">
						{ /* @ts-ignore */ }
						<Label { ...props } />
					</StyledLabel>
				) }

				<Select
					options={ normalizedOptions }
					value={ value }
					onChange={ handleChange }
					isDisabled={ isDisabled( props ) }
					isMulti={ isMulti }
					menuIsOpen={ menuIsOpen || undefined }
					onMenuOpen={ () => setMenuIsOpen( true ) }
					onMenuClose={ () => setMenuIsOpen( false ) }
					components={ {
						DropdownIndicator: DropdownIndicator( menuIsOpen ),
						ClearIndicator: () => null,
						IndicatorSeparator: () => null,
					} }
					styles={ {
						menuPortal: ( base ) => ( { ...base, zIndex: 9999 } ),
						control: ( base, state ) => ( {
							...base,
							boxShadow: 'none',
							borderColor: state.isFocused
								? '#3858E9'
								: '#dcdcde',
							borderWidth: '1px',
							borderStyle: 'solid',
							backgroundColor: 'white',
							transition: 'border-color 0.2s ease',
							'&:hover': {
								borderColor: '#3858E9',
							},
						} ),
					} }
				/>
			</Wrapper>

			{ description && (
				<StyledHelpText className="components-base-control__help">
					{ description }
				</StyledHelpText>
			) }
		</div>
	);
}
