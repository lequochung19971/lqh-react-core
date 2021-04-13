import { NavigatorConfig } from '@shared/types';
import PersonIcon from '@material-ui/icons/Person';

export const navigators: NavigatorConfig[] = [
	{ name: 'Sample', path: '/sample', icon: <PersonIcon /> },
	{ name: 'Employee', path: '/employee', icon: <PersonIcon /> }
];
