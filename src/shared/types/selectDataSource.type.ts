import { MenuItemProps } from '@mui/material';
import { DataSource } from './dataSource.type';

export type SelectDataSource<T = unknown> = MenuItemProps & DataSource<T>;
