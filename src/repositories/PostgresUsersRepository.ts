import { UserRole } from "@enum/userRole"
import { Repository } from "typeorm"
import { User } from "../models/User"

export class PostgresUsersRepository extends Repository<User> {
  getUserRole():UserRole|void {
    return 
  }
}