export enum ProvinceType {
  tinh = 'tinh',
  thanhPho = 'thanh-pho'
}

export enum DistrictType {
  huyen = 'huyen',
  thanhPho = 'thanh-pho',
  thiXa = 'thi-xa',
  quan = 'quan'
}

export enum WardType {
  xa = 'xa',
  thiTran = 'thi-tran',
  phuong = 'phuong'
}

export type AddressTypes = ProvinceType | DistrictType | WardType;