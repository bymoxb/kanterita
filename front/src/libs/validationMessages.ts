export const VALIDATION_MESSAGES = {
  require: "Campo requerido",
  oneOf: "Opción no válida",
  matches: "Formato incorrecto",
  max: (length: number): string => `Máximo ${length} caracteres`,
  maxDate: (date: Date): string => `Fecha max. ${date.toLocaleDateString()}`,
  integer: "Solo se admiten valores enteros",
  email: "Correo electrónico inválido",
  firstname: "Nombre no válido",
  lastname: "Apellido no válido",
  ci: "Cédula incorrecta",
  positive: "Solo se adminiten valores positivos"
};
