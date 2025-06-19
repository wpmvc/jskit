import { useEffect, useRef, useMemo, useState } from '@wordpress/element';
import EditorWrapper from './editor-wrapper';

type ClassicEditorProps = {
	value: string;
	onChange: ( value: string ) => void;
	height?: number;
	useExtendStyles?: boolean;
	hasMedia?: boolean;
};

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

export default function ClassicEditor( {
	value,
	onChange,
	height = 250,
	useExtendStyles = false,
	hasMedia = true,
}: ClassicEditorProps ) {
	const [ isEditorReady, setIsEditorReady ] = useState( false );
	const editorRef = useRef< any >( null );

	const editorId = useMemo(
		() => `wp_editor_${ Date.now() + Math.floor( Math.random() * 1000 ) }`,
		[]
	);

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
		if ( editorRef.current && value !== editorRef.current.getContent() ) {
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
