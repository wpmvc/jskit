/**
 * WordPress dependencies
 */
import { useInstanceId } from '@wordpress/compose';

/**
 * External dependencies
 */
import { size } from 'lodash';

/**
 * Internal dependencies
 */
import StyleRadioField from './styles';
import { RadioProps } from './types';

function generateOptionDescriptionId( radioGroupId: string, index: number ) {
	return `${ radioGroupId }-${ index }-option-description`;
}

function generateOptionId( radioGroupId: string, index: number ) {
	return `${ radioGroupId }-${ index }`;
}

export default function Radio( {
	label,
	options,
	value,
	onChange,
	disabled,
	variation,
	//@ts-ignore
	perRow,
}: RadioProps ) {
	const id = useInstanceId( Radio, 'wpmvc-radio' );

	return (
		<div
			id={ id }
			className="components-radio-control"
			style={ { display: 'flex', flexDirection: 'column', gap: '8px' } }
		>
			{ label && <label>{ label }</label> }
			<StyleRadioField
				spacing={ 3 }
				className="components-radio-control__group-wrapper"
				$variation={ variation }
				$disabled={ disabled }
				$perRow={ perRow ? perRow : size( options ) }
			>
				{ options.map( ( option, index ) => {
					const hasAfter =
						variation === 'boxed' &&
						//@ts-ignore
						option?.after &&
						value === option.value;

					return (
						<div
							key={ generateOptionId( id, index ) }
							className="components-radio-control__option-wrapper"
						>
							<div
								className="components-radio-control__option"
								style={ {
									marginBottom: hasAfter ? 12 : 0,
								} }
							>
								<input
									id={ generateOptionId( id, index ) }
									className="components-radio-control__input"
									type="radio"
									name={ id }
									value={ option.value }
									onChange={ () => {
										onChange( option.value );
									} }
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
							{ /* @ts-ignore */ }
							{ hasAfter && option?.after }
						</div>
					);
				} ) }
			</StyleRadioField>
		</div>
	);
}
