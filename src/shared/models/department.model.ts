import { Expose } from 'class-transformer';
import 'reflect-metadata';
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
