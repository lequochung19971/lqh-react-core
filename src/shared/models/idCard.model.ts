import { Expose, Type } from 'class-transformer';
import 'reflect-metadata';
import { Address } from './address.model';
import { BaseModel } from './base.model';

export class IDCardModel extends BaseModel {
  @Expose()
  idNumber!: string;

  @Expose()
  createDate!: string;

  @Expose()
  @Type(() => Address)
  createPlace!: Address;

  constructor(props?: IDCardModel) {
    super();
    if (props) {
      this.doMapping(props);
    }
  }
}
