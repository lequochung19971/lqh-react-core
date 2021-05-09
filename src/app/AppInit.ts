import { HttpInit } from '@http';
import { allYupMethods } from '@shared/utils/yup';
import { YupAddMethods } from '@shared/utils/yup/YupAddMethods';

export default function AppInit(): void {
  HttpInit();

	// For using Yup to handle validation. If not, you can remove.
	YupAddMethods(allYupMethods);
}
