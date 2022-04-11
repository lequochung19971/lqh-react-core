import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { NavigatorConfig } from '@shared/types';

export const navigators: NavigatorConfig[] = [
  { name: 'Sample', path: '/sample', icon: <DashboardIcon /> },
  { name: 'Employee', path: '/employee', icon: <AssignmentIndIcon /> },
  { name: 'Sample Dialog', path: '/sample/dialog', icon: <AssignmentIndIcon /> },
];
