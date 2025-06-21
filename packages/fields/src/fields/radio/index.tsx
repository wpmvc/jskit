/**
 * WordPress dependencies
 */
import { memo } from 'react';
import { useInstanceId } from '@wordpress/compose';

/**
 * External dependencies
 */
import { isFunction, size } from 'lodash';

/**
 * Internal dependencies
 */
import { RadioFieldProps } from './types';
import { getValue, memoCallback, updateAttribute } from '../../utils';
import Fields from '..';
import Label from '../../components/label';
import StyleRadioField from './styles';

function generateOptionDescriptionId( radioGroupId: string, index: number ) {
	return `${ radioGroupId }-${ index }-option-description`;
}

function generateOptionId( radioGroupId: string, index: number ) {
	return `${ radioGroupId }-${ index }`;
}

const Radio = memo( ( props: RadioFieldProps ) => {
	const id = useInstanceId( Radio, 'wpmvc-radio-control' );
	const { field, attributes } = props;
	const { options, perRow } = field || {};
	const _options = isFunction( options ) ? options( attributes ) : options;
	const value = getValue( props );

	return (
		<div
			id={ id }
			className="components-radio-control"
			style={ { display: 'flex', flexDirection: 'column', gap: '8px' } }
		>
			<label>
				{ /* @ts-ignore */ }
				<Label { ...props } />
			</label>
			<StyleRadioField
				spacing={ 3 }
				className="components-radio-control__group-wrapper"
				$variation={ field.variation }
				$isDisabled={ false }
				$perRow={ perRow ? perRow : size( _options ) }
			>
				{ _options.map( ( option, index ) => {
					const hasFields =
						field.variation === 'boxed' &&
						//@ts-ignore
						option.fields &&
						value === option.value;
					return (
						<div
							key={ generateOptionId( id, index ) }
							className="components-radio-control__option-wrapper"
						>
							<div
								className="components-radio-control__option"
								style={ {
									marginBottom: hasFields ? 12 : 0,
								} }
							>
								<input
									id={ generateOptionId( id, index ) }
									className="components-radio-control__input"
									type="radio"
									name={ id }
									value={ option.value }
									onChange={ () =>
										updateAttribute( option.value, props )
									}
									checked={ option.value === value }
									aria-describedby={
										!! option.description
											? generateOptionDescriptionId(
													id,
													index
											  )
											: undefined
									}
								/>
								<label
									className="components-radio-control__label"
									htmlFor={ generateOptionId( id, index ) }
								>
									{ option.label }
								</label>
								{ option.description && (
									<p
										id={ generateOptionDescriptionId(
											id,
											index
										) }
										className="components-radio-control__option-description"
									>
										{ option.description }
									</p>
								) }
							</div>
							{ hasFields && (
								<Fields
									{ ...props }
									//@ts-ignore
									fields={ option.fields }
									style={ {
										marginLeft: 16,
										paddingTop: 16,
										borderTop: '1px solid #e3e3f1',
									} }
								/>
							) }
						</div>
					);
				} ) }
			</StyleRadioField>
		</div>
	);
}, memoCallback );

export default Radio;
