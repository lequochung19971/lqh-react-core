import { HttpInit } from '@http';
import { YupAddMethods } from '@shared/utils/YupAddMethods';
import { allYupMethods } from '@shared/validations';

export default function AppInit(): void {
  HttpInit();
	YupAddMethods(allYupMethods);
}
