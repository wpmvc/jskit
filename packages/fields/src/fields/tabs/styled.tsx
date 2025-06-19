import { TabPanel } from '@wordpress/components';
import styled from 'styled-components';

// Styled component with TypeScript support
export const StyledTabPanel = styled( TabPanel )< {
	tabsLength: number;
	selectedTabIndex: number;
} >`
	.components-tab-panel__tabs {
		display: flex;
		border-top: calc( 0.1em + 1px ) solid #f2f4f5;
		position: relative;

		&:after {
			position: absolute;
			content: '';
			width: calc( 100% / ${ ( props ) => props.tabsLength } );
			height: 2px;
			background: #007cba;
			bottom: 0;
			left: calc(
				( 100% / ${ ( props ) => props.tabsLength } ) *
					${ ( props ) => props.selectedTabIndex }
			);
			transition: 0.3s ease;
		}

		.components-button {
			display: block;
			flex: 1;
			height: auto !important;
			padding: 15px;
			border-right: 1px solid #d6d9dd;

			&:last-child {
				border-right: none;
			}

			&:after {
				content: none;
			}

			svg {
				fill: none;
				width: 18px;
				height: 18px;
			}

			.tab-title {
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 6px;
			}

			&.is-active,
			&:hover {
				color: #0085ba;

				svg g path {
					fill: #0085ba;
				}
			}

			&.is-active:after {
				content: none;
			}
		}
	}
`;
