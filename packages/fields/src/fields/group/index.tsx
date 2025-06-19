/**
 * WordPress dependencies
 */
import styled from 'styled-components';
import { GroupFieldProps } from './types';
import { PrivateFields } from '..';
import { size } from 'lodash';
import Label from '../../components/label';

const GroupFields = styled.div< {
	$perRow?: number;
	$isRow?: boolean;
} >`
	/* Layout */
	display: flex;
	flex-direction: ${ ( { $isRow } ) => ( $isRow ? 'row' : 'column' ) };
	flex-wrap: wrap;
	gap: 20px;

	/* Box Model */
	background: white;
	border: 1px solid rgba( 0, 0, 0, 0.13 );
	border-radius: 4px;
	padding: 24px;

	${ ( { $isRow, $perRow = 2 } ) =>
		$isRow
			? `
        > .wpmvc-field {
          flex: 0 0 100%;

          @media (min-width: 768px) {
            flex: 0 0 calc(${ 100 / $perRow }% - ${
				( ( $perRow - 1 ) * 20 ) / $perRow
			}px);
          }
        }
      `
			: '' }
`;

const StyledGroup = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

export default function Group( props: GroupFieldProps ): JSX.Element {
	const { field } = props;
	return (
		<StyledGroup className="components-base-field">
			<label>
				{ /* @ts-ignore */ }
				<Label { ...props } />
			</label>
			<GroupFields
				$perRow={ size( field.fields ) }
				$isRow={ field.isRow }
			>
				<PrivateFields { ...props } fields={ field.fields } />
			</GroupFields>
		</StyledGroup>
	);
}
