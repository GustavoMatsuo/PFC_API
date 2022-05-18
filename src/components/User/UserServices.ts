import { User } from "@models"
import { IUserServices } from "@interfaces"
import { IMailProvider } from '@providers/IMailProvider'
import { ICreateUserRequestDTO, IUpdateUserRequestDTO } from './UserDTO'
import { PostgresUsersRepository } from "@repositories/PostgresUsersRepository"

export class UserServices implements IUserServices {
  private usersRepository: PostgresUsersRepository
  private mailProvider:IMailProvider

  constructor(
    usersRepository:PostgresUsersRepository,
    mailProvider:IMailProvider,
  ) {
    this.usersRepository = usersRepository
    this.mailProvider = mailProvider
  }

  async index():Promise<Array<User>> {
    const userList = await this.usersRepository.find()

    return userList
  }

  async create(data:ICreateUserRequestDTO):Promise<void> {
    const userAlreadyExists = await this.usersRepository.findOneBy({
      email: data.email
    })

    if (userAlreadyExists) {
      throw new Error('User already exists.')
    }

    const user = new User({...data, status: true})

    await this.usersRepository.save(user)
  }

  async update(data:IUpdateUserRequestDTO):Promise<void> {
    const userExists = await this.usersRepository.findOneBy({id: data.id})

    if (!userExists) {
      throw new Error('User not found.')
    }

    const user = new User(data)

    await this.usersRepository.update(data.id, user)
  }

  async delete(id:string):Promise<void> {
    const userExists = await this.usersRepository.findBy({id: id})

    if (!userExists) {
      throw new Error('User not found.')
    }

    await this.usersRepository.delete(id)
  }

  async changeStatus(id:string):Promise<void> {
    let userExists = await this.usersRepository.findOneBy({id: id})

    if (!userExists) {
      throw new Error('User not found.')
    }

    userExists.status = !userExists.status

    await this.usersRepository.update(id, userExists)
  }
}
