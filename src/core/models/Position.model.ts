import 'reflect-metadata';
import { Departments } from '@core/enums/Departments.enum';
import { Positions } from '@core/enums/Positions.enum';
import { Expose } from 'class-transformer';
import { BaseModel } from './Base.model';

export class PositionModel extends BaseModel {
  @Expose()
  id!: Positions;
  
  @Expose()
  name!: string
  
  @Expose()
  departmentId!: Departments;
}