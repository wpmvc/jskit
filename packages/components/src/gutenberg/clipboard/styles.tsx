import styled from 'styled-components';

export const ClipboardCopyWrapper = styled.div`
	position: relative;
	width: fit-content;
	min-width: 120px;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 10px;
	border-radius: 2px;
	background-color: var( --wpmvc-gray-50 );
`;

export const ActionIcon = styled.span`
	line-height: 0.8;
	min-height: 30px;
	display: flex;
	align-items: center;
	border-left: 1px solid var( --wpmvc-gray-300 );
	padding-left: 10px;
	margin-left: 10px;
	cursor: copy;
	svg {
		width: 16px;
		height: 16px;
	}
`;
