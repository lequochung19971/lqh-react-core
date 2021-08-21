import { Expose, Type } from 'class-transformer';
import 'reflect-metadata';
import { Gender } from '@shared/enums/gender.enum';
import { Positions } from '@shared/enums/positions.enum';
import { AddressModel } from './address.model';
import { BaseModel } from './base.model';
import { DepartmentModel } from './department.model';
import { IDCardModel } from './idCard.model';
import { PositionModel } from './position.model';

export class EmployeeModel extends BaseModel {
  @Expose()
  _id!: string;

  @Expose()
  firstName!: string;

  @Expose()
  lastName!: string;

  @Expose({ toClassOnly: true })
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @Expose()
  dob!: string;

  @Expose()
  age!: string;

  @Expose()
  email!: string;

  @Expose()
  phone!: string;

  @Expose()
  @Type(() => DepartmentModel)
  department!: DepartmentModel;

  @Expose()
  @Type(() => PositionModel)
  position!: Positions;

  @Expose()
  gender!: Gender;

  @Expose()
  @Type(() => AddressModel)
  addressInfo!: AddressModel;

  @Expose()
  @Type(() => IDCardModel)
  idCardInfo!: IDCardModel;

  @Expose()
  password?: string;

  @Expose()
  avatar?: string | File;

  confirmPassword?: string;

  constructor(props?: EmployeeModel) {
    super();
    if (props) {
      this.doMapping(props);
    }
  }
}
