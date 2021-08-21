import { MenuItemProps } from '@material-ui/core';
import { DataSource } from './dataSource.type';

export type SelectDataSource<T = unknown> = MenuItemProps & DataSource<T>;
