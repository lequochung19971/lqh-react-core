import 'reflect-metadata';
import { Departments } from '@shared/enums/departments.enum';
import { Positions } from '@shared/enums/positions.enum';
import { Expose } from 'class-transformer';
import { BaseModel } from './base.model';

export class PositionModel extends BaseModel {
  @Expose()
  id!: Positions;
  
  @Expose()
  name!: string
  
  @Expose()
  departmentId!: Departments;
}