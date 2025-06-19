# @wpmvc/admin-sidebar  

[![npm](https://img.shields.io/npm/v/@wpmvc/admin-sidebar.svg)](https://www.npmjs.com/package/@wpmvc/admin-sidebar) [![downloads](https://img.shields.io/npm/dm/@wpmvc/admin-sidebar.svg)](https://www.npmjs.com/package/@wpmvc/admin-sidebar) [![License](https://img.shields.io/npm/l/@wpmvc/admin-sidebar.svg)](https://www.npmjs.com/package/@wpmvc/admin-sidebar) [![Bundle Size](https://img.shields.io/bundlephobia/minzip/@wpmvc/admin-sidebar)](https://bundlephobia.com/package/@wpmvc/admin-sidebar) [![TypeScript](https://img.shields.io/badge/types-Typescript-blue)](https://www.typescriptlang.org/)  

Professional React hooks for WordPress admin interfaces with complete sidebar management and responsive layout control.

## Features

✨ **Dual Hook System**
- `useActiveAdminMenu` - Intelligent menu highlighting
- `useAdminSidebarLayout` - Real-time sidebar state tracking

🚀 **Seamless Integration**
- HashRouter support
- Automatic responsive layout adjustments

⚡ **Performance Optimized**
- Lightweight (under 2KB gzipped)
- Zero unnecessary re-renders
- Efficient DOM operations

---

## Installation  

```bash  
npm install @wpmvc/admin-sidebar react-router-dom  
# or  
yarn add @wpmvc/admin-sidebar react-router-dom  
```  

---

## Usage  

### With React Router  

```tsx  
import { HashRouter, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useActiveAdminMenu, useAdminSidebarLayout } from '@wpmvc/admin-sidebar';

const Layout = () => {
	// Required hooks
	const navigate = useNavigate();
	const location = useLocation();
	const { left, top } = useAdminSidebarLayout();

	// Initialize menu management
	useActiveAdminMenu( {
		pageTopLevelID: '#toplevel_page_my-plugin',
		rootPaths: [ '#/', '#/dashboard' ],
		navigate,
		location,
	} );

	return (
		<div
			style={ {
				marginLeft: left,
				marginTop: top,
				transition: 'margin-left 0.3s ease',
			} }
		>
			<Outlet />
		</div>
	);
};

// Entry point
export default () => (
	<HashRouter>
		<Route element={ <Layout /> }>
			{ /* Add your route items */ }
		</Route>
	</HashRouter>
);
```  

---

## 📚 API Reference  

### `useActiveAdminMenu(config: ActiveMenuConfig)`  

**Required Configuration:**  

| Prop | Type | Description |  
|------|------|-------------|  
| `pageTopLevelID` | `string` | Exact jQuery selector for menu wrapper |  
| `rootPaths` | `string[]` | Base paths (must include `#` prefix) |  
| `navigate` | | From `useNavigate()` |  
| `location` | | From `useLocation()` |  


---

### `useAdminSidebarLayout(): SidebarLayout`  

**Return Object:**  

| Property | Type | Example Value |  
|----------|------|--------------|  
| `left` | `number` | `190px` (expanded) |  
| `top` | `number` | `32px` (admin bar) | 

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you'd like to contribute to the project.
