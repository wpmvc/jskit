import styled from 'styled-components';

export const Container = styled.div`
	width: 100%;
	max-width: 100%;
	&.repeater-container-header-active {
		.repeater-item-list {
			gap: 0px;
			max-height: 100%;
			overflow-y: auto;
		}
		.repeater-item {
			border: 0px;
			&:not( :last-child ) {
				border-bottom: 1px solid #f0f0f0;
			}
		}
	}
`;

export const ItemList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 6px;
	max-height: 300px;
	overflow-y: auto;
	.repeater-item-list__top {
		display: flex;
		gap: 15px;
		background-color: #f9fafb;
		.repeater-item-list__top-title,
		.repeater-item-list__top-field-title {
			flex: 1;
			padding: 15px 10px;
		}
		.repeater-item-list__top-action {
			padding: 15px 10px;
		}
	}
`;

export const ItemContainer = styled.div< { $dragging: number } >`
	display: flex;
	flex-direction: column;
	position: relative;
	background: #fff;
	border: 1px solid #e0e0e0;

	z-index: ${ ( props ) => ( props.$dragging ? 999 : 1 ) };
	transition: all 0.2s ease;
	&.repeater-item--compact {
		.repeater-item-label {
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY( -50% );
		}
		.repeater-header-content__inner {
			.repeater-item-label + div {
				position: relative;
				left: 30px;
			}
		}
		.wpmvc-field:not( .panel-field ) {
			padding-bottom: 0;
		}
	}
	&.repeater-item--overlay {
		background-color: #f1f1f1;
	}
	&.repeater-item--dragging {
		opacity: 0.4;
	}
	.repeater-item {
		&:not( :last-child ) {
			margin-bottom: 8px;
		}
	}
	.repeater-item-content {
		.wpmvc-field {
			&:not( :last-child ) {
				margin-bottom: 15px;
			}
		}
	}
`;

export const ItemHeader = styled.div< { $fixed: string } >`
	position: relative;
	display: flex;
	justify-content: space-between;
	width: 100%;
	cursor: ${ ( props ) =>
		'true' === props.$fixed ? 'inherit' : 'pointer' };
	&.repeater-header--has-clone {
		.repeater-item-label {
			width: 102px;
		}
	}
	&.repeater-top-header-active {
		.repeater-header-content__inner {
			.wpmvc-field {
				flex: 1;
			}
		}
	}
`;

export const ItemHeaderContent = styled.div`
	flex: 1;
	.repeater-header-content__inner {
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		width: 100%;
		gap: 15px;
		padding: 8px 0;
		.repeater-item-label {
			display: flex;
			align-items: center;
		}
	}
	.repeater-item-label {
		font-weight: 500;
		color: #1e1e1e;
		padding: 0;
		word-wrap: break-word;
		word-break: break-word;
		flex: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		width: 145px;
	}
`;

export const ItemHeaderActions = styled.div`
	display: flex;
	flex: none;
`;

export const Input = styled.input`
	flex: 1;
	background: #f0f0f0;
	border: 1px solid #ccc;
	padding: 12px;
	color: #333;
	font-size: 14px;
	border-radius: 4px;
	outline: none;
	margin-bottom: 8px;

	&:focus {
		border-color: #007bff;
		box-shadow: 0 0 5px rgba( 0, 123, 255, 0.2 );
	}
`;

export const ButtonBase = styled.div`
	background: none;
	border: none;
	cursor: pointer;
	display: flex;
	align-items: center;
	color: #888;
	transition: color 0.2s ease;

	&:hover {
		color: #007bff;
	}
`;

export const SortButton = styled( ButtonBase )`
	cursor: grab;
	flex: none;
	padding: 0 6px;
`;

export const Action = styled( ButtonBase )`
	&.copy {
		border-left: 1px solid #e0e0e0;
	}
	&.remove {
		border-left: 1px solid #e0e0e0;
	}
`;

export const Label = styled.div`
	font-size: 11px;
	font-weight: 500;
	line-height: 1.4;
	text-transform: uppercase;
	margin-bottom: 8px;
	padding: 0;
`;

export const ButtonContainer = styled.div`
	display: flex;
	margin-top: 12px;
`;
