import 'reflect-metadata';
import { Expose, Type } from 'class-transformer';
import { Address } from './Address.model';
import { BaseModel } from './Base.model';

export class IDCardModel extends BaseModel {
  @Expose()
  idNumber!: string;

  @Expose()
  createDate!: string;

  @Expose()
  @Type(() => Address)
  createPlace!: Address;

  constructor(props?: IDCardModel) {
    super(props);
  }
}
