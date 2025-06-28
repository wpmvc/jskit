import { __experimentalVStack as VStack } from '@wordpress/components';
import styled from 'styled-components';

const StyleRadioField = styled( VStack )< {
	$disabled?: boolean;
	$variation?: 'normal' | 'boxed';
	$perRow?: number;
} >`
	${ ( { $variation, $perRow = 2 } ) =>
		'boxed' === $variation &&
		`
	display: flex;
	flex-direction: row !important;
	flex-wrap: wrap;
	gap: 20px !important;

	.components-radio-control__option-wrapper {	
		flex: 0 0 100%;
		border: 1px solid #e3e3f1;
		padding: 16px 16px;
		border-radius: 4px;
		box-sizing: border-box;

		@media ( min-width: 768px ) {
			flex: 0 0 ${ `calc(${ 100 / $perRow }% - ${
				( ( $perRow - 1 ) * 20 ) / $perRow
			}px)` };
		}
	}

	.components-radio-control__option-description {
		margin-bottom: 0;
	}
	` }

	${ ( props ) =>
		props.$disabled &&
		`pointer-events: none;
		opacity: 0.5;
		` }
`;

export default StyleRadioField;
