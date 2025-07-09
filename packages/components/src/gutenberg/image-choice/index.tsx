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
import {
    ChoiceAction,
    ContentContainer,
    ImageChoiceBox,
    ImageChoiceItem,
    ImageChoiceWrapper,
    ImageContainer,
    StyledChoice,
} from './styles';
import type { ImageChoiceProps } from './types';

function generateOptionId( imageChoiceId: string, index: number ) {
	return `${ imageChoiceId }-${ index }-image-choice`;
}

export default function ImageChoice( {
	label,
	options,
	value,
	onChange,
	className,
	perRow,
}: ImageChoiceProps ) {

    const id = useInstanceId( ImageChoice, 'wpmvc-image-choice' );

	return (
		<div
			className={ className }
			style={ {
				display: 'flex',
				flexDirection: 'column',
				gap: '8px',
				maxWidth: '300px',
			} }
		>
			{ label && <label>{ label }</label> }
			<ImageChoiceWrapper>
				{ options.map( ( option, index ) => {
					return (
						<ImageChoiceItem
							key={ option.value }
							$perRow={ perRow ? perRow : size( options ) }
						>
							<label
								htmlFor={ `image-choice-${ option?.value }` }
							>
								<StyledChoice
									type="radio"
									id={ generateOptionId(id, index) }
									name={ id }
									value={ option.value }
									checked={ option.value === value }
									onChange={ () => {
										onChange( option.value );
									} }
								/>
								<ImageChoiceBox>
									<ImageContainer>
										<img
											src={ option.image }
											alt={ option.label }
										/>
									</ImageContainer>

									<ContentContainer>
										<h3>{ option.label }</h3>
										<ChoiceAction>
											{ option.demo && (
												<a
													href={ option.demo?.url }
													target="__blank"
												>
													{ option.demo?.label }
												</a>
											) }
											{ option.pro &&
												option.pro?.status && (
													<a
														href={ option.pro?.url }
														target="__blank"
													>
														{ option.pro?.label }
													</a>
												) }
										</ChoiceAction>
									</ContentContainer>
								</ImageChoiceBox>
							</label>
						</ImageChoiceItem>
					);
				} ) }
			</ImageChoiceWrapper>
		</div>
	);
}
