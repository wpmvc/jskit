/**
 * WordPress dependencies
 */
import { useMemo, useState } from '@wordpress/element';

/**
 * External dependencies
 */
import { isFunction } from 'lodash';
import Select, { components } from 'react-select';

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
	attributes?: any;
	defaultValue?: any;
	placeholder?: any;
	options?: any[];
	onChange: any;
	className?: string;
	classNamePrefix?: string;
	isDisabled?: boolean;
	isSearchable?: boolean;
	isMulti?: boolean;
	menuPosition?: 'fixed' | 'absolute';
	styles?: any;
	optionsApi?: string;
}

export default function SelectComponent( props: props ) {
    const { options, optionsApi, styles } = props;
    const [ menuIsOpen, setMenuIsOpen ] = useState( false );
    const { options: fetchedOptions, isLoading } = useApiOptions( {
        optionsApi: optionsApi
    } );
    const normalizedOptions = useMemo( () => {
        if ( fetchedOptions ) return fetchedOptions;
        return isFunction( options ) ? options( props.attributes ) : options || [];
    }, [ fetchedOptions, options ] );

    return (
		<Select
			{ ...props }
			options= { normalizedOptions }
			isLoading={ isLoading }
			menuIsOpen={ menuIsOpen || undefined }
			classNamePrefix={props.classNamePrefix || 'wpmvc'}
			menuPosition={ props?.menuPosition }
			menuPortalTarget={ props?.menuPosition === 'fixed' ? document.body : undefined }
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
	);
}