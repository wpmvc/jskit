# ClassicEditor

`ClassicEditor` is a React component that seamlessly integrates the WordPress Classic Editor using the `wp.editor` API. This component provides a fully customizable TinyMCE editor for your React applications, enabling rich text editing capabilities.

[![npm](https://img.shields.io/npm/v/@wpmvc/classic-editor.svg)](https://www.npmjs.com/package/@wpmvc/classic-editor) [![downloads](http://img.shields.io/npm/dm/@wpmvc/classic-editor.svg?style=flat-square)](https://www.npmjs.com/package/@wpmvc/classic-editor) [![License](https://img.shields.io/npm/l/@wpmvc/classic-editor.svg)](https://www.npmjs.com/package/@wpmvc/classic-editor)

## Installation

To install the `@wpmvc/classic-editor` package, run:

```sh
npm install @wpmvc/classic-editor
```

## Usage

You can use the `ClassicEditor` component in your React application as follows:

```jsx
import { useState } from '@wordpress/element';
import ClassicEditor from '@wpmvc/classic-editor';

const MyComponent = () => {
  const [content, setContent] = useState('Initial content here');

  return (
    <div>
      <h2>My Custom Editor</h2>
      <ClassicEditor
        value={content}
        onChange={(newContent) => setContent(newContent)}
        height={300} // Optional, default is 250
        hasMedia={true} // Optional, allows media buttons
        useExtendStyles={true} // Optional, use extended CSS styles
      />
    </div>
  );
};

export default MyComponent;
```

### Props

The `ClassicEditor` component accepts the following props:

- **`value`** (string): The initial content of the editor.
- **`onChange`** (function): Callback function that is called when the content changes. It receives the updated content as an argument.
- **`height`** (number): The height of the TinyMCE editor in pixels. Defaults to `250`.
- **`useExtendStyles`** (boolean): If true, applies extended styles to the editor. Defaults to `false`.
- **`hasMedia`** (boolean): If true, includes media buttons in the editor. Defaults to `true`.

## PHP Integration

To use the WordPress Classic Editor in your custom theme or plugin, add the following PHP code to your `functions.php` file or the main plugin file:

```php
<?php
/**
 * Enqueue WordPress Classic Editor and Media for custom usage.
 */

// Ensure this code runs in the correct context
if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

// Add filter to allow rich text editor
add_filter( 'user_can_richedit', '__return_true' );

// Function to enqueue the editor and media scripts
function enqueue_wp_classic_editor_and_media() {
    // Enqueue the WordPress editor scripts
    wp_enqueue_editor();
    
    // Enqueue the WordPress media scripts
    wp_enqueue_media();
}

// Hook the function to an appropriate action
add_action( 'admin_enqueue_scripts', 'enqueue_wp_classic_editor_and_media' );
```

### Features

- Fully customizable TinyMCE editor
- Real-time content updates
- Optional media button integration
- Support for extended styling

## Dependencies

This component requires `react`. Ensure that your project includes this dependency.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you'd like to contribute to the project.

## Acknowledgments

- [TinyMCE](https://www.tiny.cloud/) for the rich text editor functionality.
- [React](https://reactjs.org/) for the component-based architecture.