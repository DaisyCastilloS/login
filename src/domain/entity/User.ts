export interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  roles: string[];
}

export interface UserWithMethods extends User {
  changePassword: (newPassword: string) => void;
}
