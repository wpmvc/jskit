import styled from 'styled-components';

interface EditorWrapperProps {
	$extend?: boolean;
}

const EditorWrapper = styled.div< EditorWrapperProps >`
	${ ( props ) =>
		props.$extend &&
		`
		border: 1px solid #dadbdd;
		border-radius: 8px;
		overflow: hidden;
		position: relative;
		background-color: #fff;

		.wp-editor-tabs,
		.wp-media-buttons {
			padding: 8px;
		}

		.wp-editor-container {
			border: 0;
		}

		.wp-switch-editor {
			height: auto;
			margin: 0 0 0 4px;
			background-color: transparent;
			padding: 7px 14px;
			font-size: 14px;
			border-radius: 5px;
			line-height: inherit;
			border-color: transparent;
			float: none;
			font-weight: 500;
		}

		.tmce-active .switch-tmce,
		.html-active .switch-html {
			background-color: #ededed;
			border-color: #dadbdd;
			color: #1e1f21;
		}

		.mce-top-part {
			background: #f1f1f0;

			&:before {
				box-shadow: none;
			}
		}

		.mce-toolbar-grp {
			border: 0;
		}

		.wpmvc-classic-editor {
			padding: 15px;
			border: none;

			&:focus {
				box-shadow: none;
				border: none;
			}
		}
	` }

	.mce-toolbar .mce-btn i {
		font-family: 'dashicons' !important;
	}

	.mce-ico {
		font-family: 'tinymce', Arial !important;
	}

	.wpmvc-classic-editor {
		visibility: visible !important;
		width: 100%;
	}
`;

export default EditorWrapper;
