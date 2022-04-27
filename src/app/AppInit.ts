import { HttpInit, setCsrfTokenToHeaders } from '@http';

export default function AppInit(): void {
  HttpInit();
  setCsrfTokenToHeaders();

  // For using Yup to handle validation. If not, you can remove.
  // yupAddMethods(allYupMethods);
}
