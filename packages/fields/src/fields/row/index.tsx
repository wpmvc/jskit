/**
 * WordPress dependencies
 */
import styled from 'styled-components';
import { PrivateFields } from '..';
import { size } from 'lodash';
import { CommonFieldProps } from '../../types/field';

const StyledRow = styled.div< {
	$perRow?: number;
} >`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 20px;

	> .wpmvc-field {
		flex: 0 0 100%;

		@media ( min-width: 768px ) {
			flex: 0 0
				${ ( { $perRow = 2 } ) =>
					`calc(${ 100 / $perRow }% - ${
						( ( $perRow - 1 ) * 20 ) / $perRow
					}px)` };
		}
	}
`;

export default function Row( props: CommonFieldProps ): JSX.Element {
	const { field } = props;
	return (
		<StyledRow $perRow={ size( field.fields ) }>
			<PrivateFields { ...props } fields={ field.fields } />
		</StyledRow>
	);
}
