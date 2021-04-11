import 'reflect-metadata';
import { Expose } from 'class-transformer';
import { BaseModel } from './Base.model';

export class DepartmentModel extends BaseModel {
  @Expose()
  id!: string;
  
  @Expose()
  name!: string;

  constructor(props?: DepartmentModel) {
    super(props);
  }
}
