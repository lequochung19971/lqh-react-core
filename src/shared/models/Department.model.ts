import 'reflect-metadata';
import { Expose } from 'class-transformer';
import { BaseModel } from './base.model';

export class DepartmentModel extends BaseModel {
  @Expose()
  id!: string;
  
  @Expose()
  name!: string;

  constructor(props?: DepartmentModel) {
    super();
    if (props) {
      this.doMapping(props);
    }
  }
}
