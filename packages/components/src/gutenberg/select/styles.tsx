import styled from 'styled-components';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;

	input:focus {
		box-shadow: none;
	}
`;

export const StyledLabel = styled.span`
	font-size: 11px;
	font-weight: 500;
	line-height: 1.4;
	text-transform: uppercase;
	display: block;
`;

export const StyledHelpText = styled.p`
	margin-top: 8px;
	margin-bottom: 0;
	font-size: 12px;
	color: rgb( 117, 117, 117 );
`;

export const Chevron = styled.svg< { $open?: boolean } >`
	transition: transform 0.2s ease;
	transform: ${ ( { $open } ) =>
		$open ? 'rotate(180deg)' : 'rotate(0deg)' };
`;
