import styled from 'styled-components';

export const ImageChoiceWrapper = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 20px;
`;

export const ImageChoiceItem = styled.div< { $perRow: number } >`
	flex: 0 0 100%;
	padding: 0;
	border-radius: 4px;
	box-sizing: border-box;

	@media ( min-width: 768px ) {
		flex: 0 0
			${ ( { $perRow } ) =>
				`calc(${ 100 / $perRow }% - ${
					( ( $perRow - 1 ) * 20 ) / $perRow
				}px)` };
	}
`;

export const StyledChoice = styled.input.attrs( { type: 'radio' } )`
	&[type='radio'] {
		display: none;
	}
`;

export const ImageChoiceBox = styled.div`
	border-radius: 4px;
	background-color: #fff;
	border: 1px solid var( --wpmvc-gray-200, #dadbdd );
	&:hover {
		border-color: var( --wpmvc-primary-500 );
	}
	${ StyledChoice }:checked + & {
		border-color: var( --wpmvc-primary-500 );
	}
`;

export const ImageContainer = styled.div`
	width: 100%;
	aspect-ratio: 3 / 3;
	overflow: hidden;
	border-radius: 4px;
	background-color: var( --wpmvc-gray-200 );
	img {
		display: block;
		max-width: 100%;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

export const ContentContainer = styled.span`
	position: relative;
	display: inline-block;
	width: 100%;
	box-sizing: border-box;
	border-top: 1px solid var( --wpmvc-gray-100 );
	padding: 6px 8px;
	h3 {
		font-size: 14px;
		font-weight: 500;
		margin: 0;
		transition: opacity 0.2s ease;
		opacity: 1;
		visibility: visible;
		${ ImageChoiceBox }:hover & {
			opacity: 0;
			visibility: hidden;
		}
	}
`;

export const ChoiceAction = styled.span`
	position: absolute;
	left: 10px;
	right: 10px;
	width: calc( 100% - 20px );
	top: 50%;
	display: flex;
	transform: translateY( -50% );
	transition: opacity 0.2s ease;
	opacity: 0;
	visibility: hidden;
	${ ImageChoiceBox }:hover & {
		opacity: 1;
		visibility: visible;
	}
	a {
		text-decoration: none;
		color: var( --wpmvc-primary-500 );
		& + a {
			margin-left: auto;
		}
	}
`;
