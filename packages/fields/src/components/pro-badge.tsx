import { __ } from '@wordpress/i18n';
import styled from 'styled-components';

const StyledBadge = styled.span`
	background-color: #ff9800;
	color: white;
	font-size: 10px;
	font-weight: bold;
	padding: 2px 6px;
	border-radius: 4px;
	margin-left: 6px;
	text-transform: uppercase;
`;

export default function ProBadge() {
	return <StyledBadge>{ __( 'Pro' ) }</StyledBadge>;
}
