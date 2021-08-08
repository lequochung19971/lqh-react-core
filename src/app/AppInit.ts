import { HttpInit } from '@http';

export default function AppInit(): void {
  HttpInit();

  // For using Yup to handle validation. If not, you can remove.
  // yupAddMethods(allYupMethods);
}
