/**
 * External dependencies
 */
import { isFunction } from 'lodash';
import { MultiValue, SingleValue } from 'react-select';
import { Select as SelectComponent } from '@wpmvc/components';

/**
 * Internal dependencies
 */
import Label from '../../components/label';
import { getValue, isDisabled, updateAttribute } from '../../utils';
import { StyledHelpText, StyledLabel, Wrapper } from './styles';
import { SelectFieldProps } from './types';

export default function Select( props: SelectFieldProps ) {
	const { field, attributes } = props;
	const { options, description, label, optionsApi, onFetchSuccess } =
		field || {};
	const isMulti = Boolean( field?.isMulti );
	const normalizedOptions = isFunction( options )
		? options( attributes )
		: options || [];

	const value = getValue( props );

	return (
		<div className="components-base-control">
			<Wrapper className="components-base-field">
				{ label && (
					<StyledLabel className="components-base-control__label">
						{ /* @ts-ignore */ }
						<Label { ...props } />
					</StyledLabel>
				) }

				<SelectComponent
					value={ value }
					options={ normalizedOptions }
					onChange={ ( value: any ) =>
						updateAttribute( value, props )
					}
					className={ field?.select?.className }
					classNamePrefix={ field?.select?.classNamePrefix }
					isDisabled={ isDisabled( props ) }
					isMulti={ isMulti }
					optionsApi={
						isFunction( optionsApi )
							? optionsApi( attributes )
							: optionsApi
					}
					onFetchSuccess={ onFetchSuccess }
					styles={ field?.select?.styles }
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
