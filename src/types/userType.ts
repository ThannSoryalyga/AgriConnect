export interface IUser {
  full_name: string;
  email: string;
  password: string;
  phone: string;
  address?: string;
  role?: string;
  status: "Active" | "Inactive";
  created_by?: string;
  createAt: Date;
  updatedAt: Date;
}
