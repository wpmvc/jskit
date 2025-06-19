import { Location, NavigateFunction } from 'react-router-dom';

export interface ActiveMenuConfig {
	pageTopLevelID?: string;
	rootPaths?: string[];
	location: Location;
	navigate: NavigateFunction;
}

export interface SidebarLayout {
	left: number;
	top: number;
}

export interface SidebarEventData {
	state: 'open' | 'folded' | 'responsive';
}
