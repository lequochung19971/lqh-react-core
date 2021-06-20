export enum ProvinceType {
  tinh = 'tinh',
  thanhPho = 'thanh-pho',
}

export enum DistrictType {
  huyen = 'huyen',
  thanhPho = 'thanh-pho',
  thiXa = 'thi-xa',
  quan = 'quan',
}

export enum WardType {
  xa = 'xa',
  thiTran = 'thi-tran',
  phuong = 'phuong',
}

export type AddressType = ProvinceType | DistrictType | WardType;

export const provinceTypes: AddressType[] | string[] = [ProvinceType.tinh, ProvinceType.thanhPho];
export const districtTypes: AddressType[] | string[] = [
  DistrictType.huyen,
  DistrictType.quan,
  DistrictType.thanhPho,
  DistrictType.thiXa,
];
export const wardTypes: AddressType[] | string[]= [WardType.xa, WardType.thiTran, WardType.phuong];
