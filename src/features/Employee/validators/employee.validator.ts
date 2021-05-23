import { createValidator } from "@shared/utils/hookform/validationResolver";
import { IEmployeeForm } from "../types/employeeForm.interface";

export const required = createValidator<IEmployeeForm, any>(function required(value) {
	if (!value) {
		return {
			type: 'required',
			message: 'Required',
		};
	}
  return null;
});