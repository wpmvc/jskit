/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';

/**
 * External dependencies
 */
import Select, { components, MultiValue, SingleValue } from 'react-select';

/**
 * Internal dependencies
 */
import { Chevron } from './styles';
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

type props = {
	value?: any;
	onChange: any;
	placeholder?: any;
	options?: any[];
	className?: string;
	classNamePrefix?: string;
	isDisabled?: boolean;
	isMulti?: boolean;
	menuPosition?: 'fixed' | 'absolute';
	styles?: any;
	optionsApi?: string;
	onFetchSuccess?: ( options: any[] ) => void;
};

export default function SelectComponent( props: props ) {
	const {
		options,
		optionsApi,
		styles,
		onFetchSuccess,
		value: rawValue,
		onChange,
		isMulti,
	} = props;
	const [ menuIsOpen, setMenuIsOpen ] = useState( false );
	const { options: fetchedOptions, isLoading } = useApiOptions( {
		optionsApi: optionsApi,
		onFetchSuccess: onFetchSuccess,
	} );

	const normalizedOptions = fetchedOptions || options;

	const value = isMulti
		? ( rawValue || [] )
				.map(
					( val: any ) =>
						normalizedOptions?.find(
							( opt: any ) => opt.value === val
						)
				)
				.filter( Boolean ) ||
		  // Ensure empty array if nothing selected
		  []
		: // using 2 equal instead of 3 equal to avoid type mismatch
		  normalizedOptions?.find( ( opt: any ) => opt.value == rawValue ) ??
		  null;

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
			onChange( values );
		} else {
			onChange( ( newValue as any )?.value ?? null );
		}
	};

	return (
		<Select
			{ ...props }
			options={ normalizedOptions }
			onChange={ handleChange }
			value={ value }
			isLoading={ isLoading }
			menuIsOpen={ menuIsOpen || undefined }
			classNamePrefix={ props.classNamePrefix || 'wpmvc' }
			menuPosition={ props?.menuPosition || 'fixed' }
			menuPortalTarget={ document.body }
			onMenuOpen={ () => setMenuIsOpen( true ) }
			onMenuClose={ () => setMenuIsOpen( false ) }
			components={ {
				DropdownIndicator: DropdownIndicator( menuIsOpen ),
				ClearIndicator: () => null,
				IndicatorSeparator: () => null,
			} }
			styles={ {
				menu: ( base ) => ( {
					...base,
					zIndex: 10,
					...styles?.menu,
				} ),
				menuPortal: ( base ) => ( {
					...base,
					zIndex: 100000,
				} ),
				control: ( baseStyles, state ) => {
					return {
						...baseStyles,
						...styles?.control,
					};
				},
			} }
			theme={ ( theme ) => ( {
				...theme,
				colors: {
					...theme.colors,
					primary:
						'var(--wpmvc-primary-500, var(--wp-admin-theme-color))', // selected
					primary25:
						'var(--wpmvc-primary-100, color-mix(in srgb, var(--wp-admin-theme-color) 15%, transparent))', // lightest hover
					primary50:
						'var(--wpmvc-primary-200, color-mix(in srgb, var(--wp-admin-theme-color) 40%, transparent))', // hover/focus
					primary75:
						'var(--wpmvc-primary-400, color-mix(in srgb, var(--wp-admin-theme-color) 60%, transparent))', // selected + focus
				},
			} ) }
		/>
	);
}
