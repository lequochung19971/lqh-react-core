import { NavigatorConfig } from '@shared/types';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import DashboardIcon from '@material-ui/icons/Dashboard';
export const navigators: NavigatorConfig[] = [
	{ name: 'Sample', path: '/sample', icon: <DashboardIcon /> },
	{ name: 'Employee', path: '/employee', icon: <AssignmentIndIcon /> }
];
