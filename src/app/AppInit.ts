import { HttpInit } from '@http';
// import { allYupMethods } from '@shared/utils/yup';
// import { yupAddMethods } from '@shared/utils/yup/yupAddMethods';

export default function AppInit(): void {
  HttpInit();

	// For using Yup to handle validation. If not, you can remove.
	// yupAddMethods(allYupMethods);
}
