import IVaccineType from "./IVaccineType";

interface IVaccine {
  id: number,
  vaccination_date: Date,
  doses_number: number,
  vaccineType: IVaccineType
}

export default IVaccine;
