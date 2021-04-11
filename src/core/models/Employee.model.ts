import 'reflect-metadata';
import { Expose, Type } from 'class-transformer';
import { DepartmentModel } from './Department.model';
import { Positions } from '@core/enums/Positions.enum';
import { PositionModel } from './Position.model';
import { Gender } from '@core/enums/Gender.enum';
import { AddressModel } from './Address.model';
import { IDCardModel } from './IdCard.model';
import { BaseModel } from './Base.model';

export class EmployeeModel extends BaseModel {
  @Expose()
  _id!: string;

  @Expose()
  firstName!: string;

  @Expose()
  lastName!: string;

  @Expose({toClassOnly: true})
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
    super(props);
  }
}
