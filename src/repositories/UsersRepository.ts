import { UserRole } from "@enum/userRole"
import { Repository } from "typeorm"
import { User } from "../models/User"

export class UsersRepository extends Repository<User> {
  
}