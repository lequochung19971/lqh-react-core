import 'reflect-metadata';
import { Expose, Type } from "class-transformer";
import { BaseModel } from './Base.model';

export class AddressModel extends BaseModel {
  @Expose()
  @Type(() => Address)
  province!: Address;
  
  @Expose()
  @Type(() => Address)
  district!: Address;

  @Expose()
  @Type(() => Address)
  ward!: Address;

  constructor(props?: AddressModel) {
    super(props);
  }
}

export class Address extends BaseModel {
  @Expose()
  name?: string;
  
  @Expose()
  type?: string;
  
  @Expose()
  nameWithType?: string;
  
  @Expose()
  path?: string;
  
  @Expose()
  pathWithType?: string;
  
  @Expose()
  code?: string;
  
  @Expose()
  parentCode?: string;
  
  @Expose()
  slug?: string;

  constructor(props?: Address) {
    super(props);
  }
}
