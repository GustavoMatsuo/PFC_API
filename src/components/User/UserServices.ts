import { User } from "@models"
import { IUserServices } from "@interfaces"
import { IMailProvider } from '@providers/IMailProvider'
import { ICreateUserDTO, ILoginUserDTO, IUpdateUserDTO } from '@dto/UserDTO'
import { UsersRepository } from "@repositories"

export class UserServices implements IUserServices {
  private usersRepository: UsersRepository
  private mailProvider:IMailProvider

  constructor(
    usersRepository:UsersRepository,
    mailProvider:IMailProvider,
  ) {
    this.usersRepository = usersRepository
    this.mailProvider = mailProvider
  }

  async index(limit, skip):Promise<Array<User>> {
    const limitNum = limit? Number.parseInt(limit) : null
    const skipNum = skip? Number.parseInt(skip) : null

    const userList = await this.usersRepository.find({
      take: limitNum,
      skip: skipNum
    })

    return userList
  }

  async login(data:ILoginUserDTO):Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        email: data.email,
        password: data.password
      },
    })

    if(user && !user.status){
      throw new Error('User disabled.')
    }

    return user
  }

  async create(data:ICreateUserDTO):Promise<void> {
    const userAlreadyExists = await this.usersRepository.findOneBy({
      email: data.email
    })

    if (userAlreadyExists) {
      throw new Error('User already exists.')
    }

    const user = new User({...data, status: true})

    await this.usersRepository.save(user)
  }

  async update(data:IUpdateUserDTO):Promise<void> {
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
