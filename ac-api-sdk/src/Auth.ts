import gql from './gql'
import Emitter from './Emitter'

interface AuthEvents {
  onUser: (user: IUser) => void
  onLogin: (user: IUser) => void
  onLogout: () => void
}

export default class Auth extends Emitter {

  _fetch: FFetch

  constructor(app: IApp) {
    super()
    this._fetch = app.$fetch
  }

  on<K extends keyof AuthEvents, T extends AuthEvents[K]>(event: K, cb: T) {
    super.on(event, cb)
  }

  /**
   * Returns the currently logged in user
   *
   * @returns Promise with the user's profile if successful.
   */
  async profile(): Promise<IUser> {
    const {me} = await this._fetch(gql.queries.profile)
    return me
  }

  /**
   * Authenticate a user with the given credentials.
   * Note: Once logged in, all future queries will be automatically authenticated.
   *
   * @param username Usually the email of the user
   * @param password The password for the user
   *
   * @emits onLogin Arguments include the user's profile.
   * @emits onUser Arguments include the user's profile.
   *
   * @returns Promise with the user's profile if successful.
   */
  async login(username: string, password: string, remember: boolean = false):Promise<IUser | null> {
    let auth = await this._fetch(gql.mutations.login, {
      username,
      password,
      remember
    })
    const { user, success } = auth.login
    if (success) {
      this.emit('onLogin', user)
      this.emit('onUser', user)
      return user
    } else return null
  }

  /**
   * Unauthenticates the current user, invalidating the access token.
   *
   * @emits onLogout Argument is NULL
   * @emits onUser Argument is NULL
   *
   * @returns Object<status, message>
   */
  async logout() {
    this.emit('onLogout', null)
    this.emit('onUser', null)
    return await this._fetch(gql.mutations.logout)
  }

  /**
   * Register a new user
   *
   * NOTE: It is a good idea to include chekcs for password confirmation and email confirmation client side.
   *
   * @param name Fullname of the user
   * @param email Email address also used as username
   * @param password The password for the user
   *
   * @emits onRegister Arguments include the user's profile.
   * @emits onUser Arguments include the user's profile.
   *
   * @returns Promise with the user's profile if successful.
   */
  async register(name: string, email: string, password: string, remember: boolean = false):Promise<IUser | null> {
    let auth = await this._fetch(gql.mutations.register, {
      name,
      email,
      password,
      remember
    })
    const { user, success } = auth.register
    if (success) {
      this.emit('onRegister', user)
      this.emit('onUser', user)
      return user
    } else return null
    return await this._fetch(gql.mutations.register)
  }

  /**
   * Requests a password reset link to be sent to the given email address
   *
   * @returns Object<status, message>
   */
  async reset(email: string) {
    return await this._fetch(gql.mutations.resetPassword, { email })
  }
}