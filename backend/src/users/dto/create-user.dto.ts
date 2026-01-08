export class CreateUserDto {
  email: string;
  password: string;
  role?: string; // 'admin' veya 'user' (zorunlu değil, boş gelirse 'user' olur)
}