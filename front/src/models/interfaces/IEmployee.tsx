import { IVaccine } from ".";

export interface IEmployeeForm {
  id?: number,
  //
  ci: string,
  email: string,
  firstname: string,
  lastname: string,
  //
  birthday?: Date | null,
  address?: string | null,
  phone?: string | null,
  vaccination_status?: boolean | null,
  //
  vaccine_type?: number | null,
  doses_number?: number | null,
  vaccination_date?: Date | null,
}

export interface IEmployee {
  id: number,
  ci: string,
  firstname: string,
  lastname: string,
  email: string,
  //
  birthday?: Date | null,
  address?: string | null,
  phone?: string | null,
  vaccine: IVaccine | null,
}
