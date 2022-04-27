export enum TokenType {
  Bearer = 'Bearer',
}

export enum AuthLocalStorageKeys {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
}

export enum AuthUrIs {
  CHANGE_PASSWORD = '/auth/password/change',
  RESET_PASSWORD = '/auth/password/reset',
  SET_PASSWORD = '/auth/setPassword',
  REGISTRATION = '/auth/registration',
  LOGIN = '/auth/login',
  REFRESH_TOKEN = '/auth/login',
}
