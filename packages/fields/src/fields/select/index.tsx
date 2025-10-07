/**
 * WordPress dependencies
 */
import { useMemo, useState } from '@wordpress/element';

/**
 * External dependencies
 */
import { isFunction } from 'lodash';
import Select, { components, MultiValue, SingleValue } from 'react-select';

/**
 * Internal dependencies
 */
import Label from '../../components/label';
import { getValue, isDisabled, updateAttribute } from '../../utils';
import { Chevron, StyledHelpText, StyledLabel, Wrapper } from './styles';
import { SelectFieldProps } from './types';
import { useApiOptions } from './useApiOptions';

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
    const { options, description, label, styles } = field || {};
    const [ menuIsOpen, setMenuIsOpen ] = useState( false );
    const { options: fetchedOptions, isLoading } = useApiOptions( {
        optionsApi: field?.optionsApi,
        attributes: attributes
    } );
    const isMulti = Boolean( field?.isMulti );
    const normalizedOptions = useMemo( () => {
        if ( fetchedOptions ) return fetchedOptions;
        return isFunction( options ) ? options( attributes ) : options || [];
    }, [ fetchedOptions, options ] );

	const rawValue = getValue( props );
	const value = isMulti
		? ( rawValue || [] )
				.map( ( val: any ) =>
					normalizedOptions.find( ( opt ) => opt.value === val )
				)
				.filter( Boolean ) ||
		  // Ensure empty array if nothing selected
		  []
		  // using 2 equal instead of 3 equal to avoid type mismatch
		: normalizedOptions.find( ( opt ) => opt.value == rawValue ) ?? null;

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
					className={field?.className}
					classNamePrefix={field?.classNamePrefix}
					isDisabled={ isDisabled( props ) }
					isMulti={ isMulti }
                    isLoading={ isLoading }
					menuIsOpen={ menuIsOpen || undefined }
					menuPosition={ field?.menuPosition }
					menuPortalTarget={ field?.menuPosition === 'fixed' ? document.body : undefined }
					onMenuOpen={ () => setMenuIsOpen( true ) }
					onMenuClose={ () => setMenuIsOpen( false ) }
					components={ {
						DropdownIndicator: DropdownIndicator( menuIsOpen ),
						ClearIndicator: () => null,
						IndicatorSeparator: () => null,
					} }
					styles={ {
						menuPortal: ( base ) => ( {
							...base,
							zIndex: 100000,
						} ),
						control: (baseStyles, state) =>{
							return {
								...baseStyles,
								...styles?.control,
							}
					},
					} }
					theme={ ( theme ) => ( {
						...theme,
						colors: {
							...theme.colors,
							primary: 'var(--wp-admin-theme-color)', // selected
							primary75:
								'color-mix(in srgb, var(--wp-admin-theme-color) 60%, transparent)', // selected + focus
							primary50:
								'color-mix(in srgb, var(--wp-admin-theme-color) 40%, transparent)', // hover/focus
							primary25:
								'color-mix(in srgb, var(--wp-admin-theme-color) 15%, transparent)', // lightest hover
						},
					} ) }
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
