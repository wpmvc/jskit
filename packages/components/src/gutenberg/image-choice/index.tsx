/**
 * WordPress dependencies
 */
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {
	BadgeGroup,
	ContentContainer,
	DemoLink,
	ImageChoiceBox,
	ImageChoiceItem,
	ImageChoiceWrapper,
	ImageContainer,
	ProBadge,
	SoonBadge,
	StyledChoice,
} from './styles';
import { ImageChoiceProps } from './types';

export default function ImageChoice( {
	label,
	options,
	value,
	onChange,
	className,
	perRow = options.length,
}: ImageChoiceProps ) {
	const id = useInstanceId( ImageChoice, 'wpmvc-image-choice' );
	return (
		<div
			className={ className }
			style={ { display: 'flex', flexDirection: 'column', gap: '8px' } }
		>
			{ label && <label>{ label }</label> }

			<ImageChoiceWrapper role="radiogroup" aria-label={ label }>
				{ options.map( ( option, index ) => {
					const inputId = `${ id }-${ index }`;
					const isChecked = value === option.value;

					return (
						<ImageChoiceItem
							key={ option.value }
							$perRow={ perRow }
						>
							<label
								htmlFor={ inputId }
								style={ { display: 'block' } }
							>
								<ImageChoiceBox
									role="radio"
									aria-checked={ isChecked }
									tabIndex={ 0 }
									$checked={ isChecked }
								>
									<ImageContainer>
										{ ! option.isPro &&
											! option.isComingSoon && (
												<StyledChoice
													id={ inputId }
													name={ id }
													value={ option.value }
													checked={ isChecked }
													onChange={ () =>
														onChange( option.value )
													}
												/>
											) }

										{ ( option.isPro ||
											option.isComingSoon ) && (
											<BadgeGroup>
												{ option.isPro && (
													<ProBadge>
														{ __( 'PRO' ) }
													</ProBadge>
												) }
												{ option.isComingSoon && (
													<SoonBadge>
														{ __( 'Coming Soon' ) }
													</SoonBadge>
												) }
											</BadgeGroup>
										) }

										<img
											src={ option.image }
											alt={ option.label }
										/>
									</ImageContainer>
									<ContentContainer>
										<span>{ option.label }</span>
										{ option.demo && (
											<DemoLink
												href={ option.demo.url }
												target="_blank"
												rel="noopener noreferrer"
												onClick={ ( e ) =>
													e.stopPropagation()
												}
											>
												{ option.demo.label }
											</DemoLink>
										) }
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
