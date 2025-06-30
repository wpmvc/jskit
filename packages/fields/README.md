# JSKit Fields

JSKit Fields is a flexible, extensible React field/component library for building dynamic, maintainable forms in WordPress plugins and applications. It supports a wide range of field types, grouping, conditional logic, and custom layouts—all with a simple, declarative configuration.

---

## Installation

Install via your preferred package manager:

```bash
npm install @wpmvc/fields
# or
yarn add @wpmvc/fields
# or
pnpm add @wpmvc/fields
```

---

## Features

- **Comprehensive field types:** Text, number, switch, checkbox, color, select, radio, slider, toggle group, repeater, tabs, group, panel, border, dimension, notice, row, and more.
- **Composable:** Nest fields inside groups, panels, tabs, repeaters, and rows.
- **Declarative config:** Define your form structure with a simple JS object.
- **Conditional logic:** Show/hide fields based on attribute values.
- **TypeScript support:** Strongly typed for safety and autocompletion.

---

## Field Types Overview

Below is a quick reference table of all available field types. Click any field type to jump to its configuration and usage example.

| Field Type    | Description                | Example Section      |
|---------------|---------------------------|----------------------|
| text          | Single line text input     | [Text](#text)        |
| number        | Numeric input              | [Number](#number)    |
| switch        | Toggle switch              | [Switch](#switch)    |
| checkbox      | Checkbox input             | [Checkbox](#checkbox)|
| tabs          | Tabbed field groups        | [Tabs](#tabs)        |
| color         | Color picker               | [Color](#color)      |
| colors        | Color palette/group        | [Colors](#colors)    |
| group         | Grouped fields             | [Group](#group)      |
| border        | Border settings            | [Border](#border)    |
| dimension     | Dimension input            | [Dimension](#dimension)|
| notice        | Info/warning/error notice  | [Notice](#notice)    |
| panel         | Collapsible panel group    | [Panel](#panel)      |
| radio         | Radio button group         | [Radio](#radio)      |
| select        | Dropdown select            | [Select](#select)    |
| slider        | Range slider               | [Slider](#slider)    |
| toggleGroup   | Toggle button group        | [Toggle Group](#togglegroup)|
| repeater      | Repeatable field group     | [Repeater](#repeater)|
| row           | Row layout for fields      | [Row](#row)          |

---

## Usage Example

You can use JSKit Fields by passing a `fields` config and state handlers to the `<Fields />` component.

**Recommended: Use the `useAttributes` hook to manage attributes state.**

```tsx
import { Fields, useAttributes } from '@wpmvc/fields';

const fields = {
  text: {
    type: 'text',
    label: 'Text Field',
    description: 'A simple text input',
    required: true,
  },
  // ...other fields
};

function MyForm() {
  const [attributes, setAttributes] = useAttributes({});

  return (
    <Fields
      fields={fields}
      attributes={attributes}
      setAttributes={setAttributes}
    />
  );
}
```

---

## Registering Custom Components

You can extend or override field types by passing a `components` prop to `<Fields />`.  
This allows you to register your own custom field components or replace existing ones.

```tsx
import { Fields, useAttributes } from '@wpmvc/fields';
import MyCustomField from './MyCustomField';

const fields = {
  custom: {
    type: 'custom',
    label: 'Custom Field',
    description: 'This is a custom field.',
  },
};

const components = {
  custom: MyCustomField,
  // You can override built-in types too, e.g. text: MyTextField
};

function MyForm() {
  const [attributes, setAttributes] = useAttributes({});

  return (
    <Fields
      fields={fields}
      attributes={attributes}
      setAttributes={setAttributes}
      components={components}
    />
  );
}
```

---

## Using Fields in Gutenberg Block InspectorControls

You can easily use JSKit Fields inside a Gutenberg block’s `InspectorControls` panel to provide a dynamic, extensible settings UI for your block.

```tsx
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { Fields, useAttributes } from '@wpmvc/fields';

const fields = {
  text: {
    type: 'text',
    label: 'Text Field',
    description: 'A simple text input',
    required: true,
  },
  color: {
    type: 'color',
    label: 'Color Picker',
    description: 'Pick a color',
  },
  // ...add more fields as needed
};

export default function Edit({ attributes, setAttributes }) {
  return (
    <>
      <InspectorControls>
          <Fields
            fields={fields}
            attributes={attributes}
            setAttributes={setAttributes}
          />
      </InspectorControls>
      {/* ...your block output... */}
    </>
  );
}
```

**Tips:**
- Pass your block’s `attributes` and `setAttributes` directly to `<Fields />` for seamless integration.
- You can use all field types and custom components as shown in previous sections.

---

## Field Configuration Examples

Each field type is configured using a simple JavaScript object. You can nest, combine, and customize these fields to create advanced forms.

---

### <a name="text"></a>Text

A single-line text input.

```js
{
  type: 'text',
  label: 'Text Field',
  description: 'A simple text input',
  required: true,
}
```

---

### <a name="number"></a>Number

A numeric input with optional min, max, and step.

```js
{
  type: 'number',
  label: 'Number Field',
  min: 0,
  max: 100,
  description: 'A number input',
}
```

---

### <a name="switch"></a>Switch

A boolean toggle switch.

```js
{
  type: 'switch',
  label: 'Switch Field',
  description: 'A toggle switch',
}
```

---

### <a name="checkbox"></a>Checkbox

A single checkbox input.

```js
{
  type: 'checkbox',
  label: 'Checkbox Field',
  description: 'A single checkbox',
}
```

---

### <a name="tabs"></a>Tabs

Tabbed navigation for grouping fields.

```js
{
  type: 'tabs',
  label: 'Tabs Field',
  items: {
    tab1: { label: 'Tab 1', fields: {} },
    tab2: {
      label: 'Tab 2',
      fields: {
        tab1: { type: 'text', label: 'Tab 1 Content' },
        tab2: { type: 'number', label: 'Tab 2 Content' },
      },
    },
  },
}
```

---

### <a name="color"></a>Color

A color picker input.

```js
{
  type: 'color',
  label: 'Color Picker',
  description: 'Pick a color',
}
```

---

### <a name="colors"></a>Colors

A palette or group of color pickers.

```js
{
  type: 'colors',
  label: 'Color Palette',
  items: {
    color: {
      label: 'Color',
      showByDefault: true,
      colors: {
        default: { label: 'Default' },
        hover: { label: 'Hover' },
      },
    },
    background: {
      label: 'Background',
      showByDefault: false,
      colors: {
        default: { label: 'Default' },
        hover: { label: 'Hover' },
      },
    },
  },
  description: 'Choose from palette',
}
```

---

### <a name="group"></a>Group

Group multiple fields together.

```js
{
  type: 'group',
  label: 'Group Field',
  fields: {
    groupText: { type: 'text', label: 'Group Text' },
    groupNumber: { type: 'number', label: 'Group Number' },
  },
}
```

---

### <a name="border"></a>Border

Border settings input.

```js
{
  type: 'border',
  label: 'Border Field',
  description: 'Set border properties',
}
```

---

### <a name="dimension"></a>Dimension

Input for width, height, or other dimensions.

```js
{
  type: 'dimension',
  label: 'Dimension Field',
  description: 'Set width and height',
}
```

---

### <a name="notice"></a>Notice

Display an informational, warning, or error notice.

```js
{
  type: 'notice',
  notice: 'This is an info notice.',
  status: 'info', // can be 'info', 'warning', 'error', etc.
}
```

---

### <a name="panel"></a>Panel

A collapsible panel for grouping fields.

```js
{
  type: 'panel',
  label: 'Panel Field',
  fields: {
    panelText: { type: 'text', label: 'Panel Text' },
    panelSwitch: { type: 'switch', label: 'Panel Switch' },
  },
}
```

---

### <a name="radio"></a>Radio

A group of radio buttons.

```js
{
  type: 'radio',
  label: 'Radio Field',
  options: [
    { label: 'Radio 1', value: '1' },
    { label: 'Radio 2', value: '2' },
  ],
  description: 'Choose one',
}
```

---

### <a name="select"></a>Select

A dropdown select input.

```js
{
  type: 'select',
  label: 'Select Field',
  options: [
    { label: 'Select 1', value: '1' },
    { label: 'Select 2', value: '2' },
  ],
  description: 'Select an option',
}
```

---

### <a name="slider"></a>Slider

A range slider input.

```js
{
  type: 'slider',
  label: 'Slider Field',
  min: 0,
  max: 10,
  description: 'Slide to choose',
}
```

---

### <a name="togglegroup"></a>Toggle Group

A group of toggle buttons.

```js
{
  type: 'toggleGroup',
  label: 'Toggle Group Field',
  options: [
    { label: 'A', value: 'a' },
    { label: 'B', value: 'b' },
    { label: 'C', value: 'c' },
  ],
  description: 'Toggle between options',
}
```

---

### <a name="repeater"></a>Repeater

Repeatable group of fields.

```js
{
  type: 'repeater',
  label: 'Repeater Field',
  fields: {
    repeaterText: { type: 'text', label: 'Repeater Text' },
    repeaterNumber: { type: 'number', label: 'Repeater Number' },
  },
  description: 'Add multiple items',
}
```

---

### <a name="row"></a>Row

Layout fields in a row.

```js
{
  type: 'row',
  label: 'Row Field',
  fields: {
    rowText: { type: 'text', label: 'Row Text' },
    rowSwitch: { type: 'number', label: 'Row Number' },
  },
}
```

---

## Tips & Best Practices

- **Nesting:** You can nest fields inside `group`, `panel`, `tabs`, `repeater`, and `row` for advanced layouts.
- **Conditional Logic:** Add a `condition` function to any field to control its visibility based on current attributes.
- **Custom Components:** Pass a `components` prop to `<Fields />` to override or extend field types.
- **TypeScript:** All field configs are fully typed for safety and autocompletion.

---

## License
MIT