import { v4 as uuidv4 } from 'uuid';
import { UserWithMethods } from './User'; // Ajusta la ruta según tu estructura de proyecto

export default function createUser(
  name: string,
  lastname: string,
  email: string,
  password: string,
  roles: string[],
  id: string = '', // Mover `id` al final para cumplir con `default-param-last`
): UserWithMethods {
  const userId = id || uuidv4(); // Crear una variable local `userId`

  return {
    id: userId,
    name,
    lastname,
    email,
    password,
    roles,
    changePassword(newPassword: string) {
      this.password = newPassword;
    },
  };
}
