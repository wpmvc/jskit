import styled from 'styled-components';

export const ImageChoiceWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
`;

export const ImageChoiceItem = styled.div< { $perRow: number } >`
	flex: 0 0 100%;

	@media ( min-width: 768px ) {
		flex: 0 0
			calc(
				${ ( { $perRow } ) => 100 / $perRow }% -
					${ ( { $perRow } ) => ( ( $perRow - 1 ) * 20 ) / $perRow }px
			);
	}
`;

export const StyledChoice = styled.input.attrs( { type: 'radio' } )`
	position: absolute;
	top: 8px;
	right: 8px;
	width: 18px;
	height: 18px;
	margin: 0;
	cursor: pointer;
	accent-color: var( --wpmvc-primary-500 );
`;

export const ImageChoiceBox = styled.div< { $checked: boolean } >`
	position: relative;
	border-radius: 4px;
	background-color: #fff;
	border: 1px solid
		${ ( { $checked } ) =>
			$checked
				? 'var(--wpmvc-primary-500)'
				: 'var(--wpmvc-gray-200, #dadbdd)' };
	transition: border-color 0.2s ease;
	cursor: pointer;

	&:hover {
		border-color: var( --wpmvc-primary-500 );
	}

	&:focus-within {
		outline: none;
	}
`;

export const ImageContainer = styled.div`
	width: 100%;
	aspect-ratio: 1 / 1;
	overflow: hidden;
	background-color: var( --wpmvc-gray-200 );
	position: relative;

	/* Only top corners rounded */
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
`;

export const ContentContainer = styled.div`
	padding: 8px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-top: 1px solid var( --wpmvc-gray-100 );
	font-size: 14px;
`;

export const DemoLink = styled.a`
	font-size: 12px;
	color: var( --wpmvc-primary-500 );
	text-decoration: none;

	&:hover {
		text-decoration: underline;
	}
`;
