export function validateEmployee(data: {
  full_name: string;
  email: string;
}) {
  const errors: string[] = [];

  if (!data.full_name.trim()) {
    errors.push("Nombre obligatorio");
  }

  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      data.email
    )
  ) {
    errors.push("Email incorrecto");
  }

  return errors;
}