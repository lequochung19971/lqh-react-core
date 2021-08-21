import { Expose, Type } from 'class-transformer';
import 'reflect-metadata';

import { BaseModel } from './base.model';

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
    super();
    if (props) {
      this.doMapping(props);
    }
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

  constructor(props?: object) {
    super();
    if (props) {
      this.doMapping(props);
    }
  }
}
