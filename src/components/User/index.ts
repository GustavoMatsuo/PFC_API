import { User } from "@models"
import { MailtrapMailProvider } from "@providers/implementations/MailtrapMailProvider"
import { UserServices } from "./UserServices"
import { UserController } from "./UserController"
import { db } from '../../config/database'

const postgresUsersRepository = db.getRepository(User)
const mailtrapMailProvider = new MailtrapMailProvider()

const userServices = new UserServices(
  postgresUsersRepository,
  mailtrapMailProvider
)

const userController = new UserController(
  userServices
)

export { userServices, userController }