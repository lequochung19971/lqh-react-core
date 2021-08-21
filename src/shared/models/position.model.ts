import { Expose } from 'class-transformer';
import 'reflect-metadata';
import { Departments } from '@shared/enums/departments.enum';
import { Positions } from '@shared/enums/positions.enum';
import { BaseModel } from './base.model';

export class PositionModel extends BaseModel {
  @Expose()
  id!: Positions;

  @Expose()
  name!: string;

  @Expose()
  departmentId!: Departments;
}
