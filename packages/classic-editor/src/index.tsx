import {
	useEffect,
	useRef,
	useState,
	forwardRef,
	useImperativeHandle,
} from '@wordpress/element';
import EditorWrapper from './editor-wrapper';
import { useInstanceId } from '@wordpress/compose';

type ClassicEditorProps = {
	value: string;
	onChange: ( value: string ) => void;
	height?: number;
	useExtendStyles?: boolean;
	hasMedia?: boolean;
};

export interface ClassicEditorRef {
	insertContent: ( content: string ) => void;
	focus: () => void;
}

declare global {
	interface Window {
		wp: {
			editor: {
				initialize: ( id: string, settings: any ) => void;
				remove: ( id: string ) => void;
			};
		};
	}
}

const ClassicEditor: React.ForwardRefExoticComponent<
	ClassicEditorProps & React.RefAttributes< ClassicEditorRef >
> = forwardRef< ClassicEditorRef, ClassicEditorProps >(
	(
		{
			value,
			onChange,
			height = 250,
			useExtendStyles = false,
			hasMedia = true,
		},
		ref
	) => {
		const [ isEditorReady, setIsEditorReady ] = useState( false );
		const editorRef = useRef< any >( null );

		const editorId = useInstanceId( ClassicEditor, 'wpmvc-classic-editor' );

		const hasWpEditor = !! window.wp?.editor;

		const setupEditor = ( editor: any ) => {
			editorRef.current = editor;

			editor.on( 'init', () => {
				editor.setContent( value );
			} );

			editor.on( 'change', () => {
				onChange( editor.getContent() );
			} );

			setIsEditorReady( true );
		};

		// Expose editor methods to parent component
		useImperativeHandle(
			ref,
			() => ( {
				insertContent: ( content: string ) => {
					if ( editorRef.current ) {
						editorRef.current.insertContent( content );
					}
				},
				focus: () => {
					if ( editorRef.current ) {
						editorRef.current.focus();
					}
				},
			} ),
			[ editorRef.current ]
		);

		const initEditor = () => {
			window.wp.editor.remove( editorId );

			window.wp.editor.initialize( editorId, {
				tinymce: {
					height,
					toolbar1:
						'formatselect,table,bold,italic,bullist,numlist,link,blockquote,alignleft,aligncenter,alignright,underline,strikethrough,forecolor,removeformat,codeformat,outdent,indent,undo,redo',
					menubar: false,
					setup: setupEditor,
				},
				quicktags: true,
				mediaButtons: hasMedia,
			} );
		};

		useEffect( () => {
			if (
				editorRef.current &&
				value !== editorRef.current.getContent()
			) {
				editorRef.current.setContent( value );
			}
		}, [ value ] );

		useEffect( () => {
			if ( isEditorReady ) {
				setTimeout( () => {
					editorRef.current.setContent( value );
				}, 500 );
			}
		}, [ isEditorReady ] );

		useEffect( () => {
			if ( hasWpEditor ) {
				initEditor();
			}

			return () => {
				if ( hasWpEditor ) {
					window.wp.editor.remove( editorId );
				}
			};
		}, [ hasWpEditor ] );

		return (
			<EditorWrapper $extend={ useExtendStyles }>
				<textarea className="wpmvc-classic-editor" id={ editorId } />
			</EditorWrapper>
		);
	}
);

export default ClassicEditor;
