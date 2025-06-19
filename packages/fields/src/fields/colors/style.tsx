import { TabPanel as WpTabPanel } from '@wordpress/components';
import styled from 'styled-components';

const TabPanel = styled( WpTabPanel )`
	.active-tab {
		color: var(
			--wp-components-color-accent,
			var( --wp-admin-theme-color, #3858e9 )
		);
	}
`;

export default TabPanel;
