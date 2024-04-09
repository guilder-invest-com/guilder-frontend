import bcrypt from 'bcryptjs';


export function hashPassword(password: string): string {
  const saltRounds = 4;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  return hashedPassword;
}
