import Emitter from './Emitter';
interface AuthEvents {
    onUser: (user: IUser) => void;
    onLogin: (user: IUser) => void;
    onLogout: () => void;
}
export default class Auth extends Emitter {
    _fetch: FFetch;
    constructor(app: IApp);
    on<K extends keyof AuthEvents, T extends AuthEvents[K]>(event: K, cb: T): void;
    /**
     * Returns the currently logged in user
     *
     * @returns Promise with the user's profile if successful.
     */
    profile(): Promise<IUser>;
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
    login(username: string, password: string, remember?: boolean): Promise<IUser | null>;
    /**
     * Unauthenticates the current user, invalidating the access token.
     *
     * @emits onLogout Argument is NULL
     * @emits onUser Argument is NULL
     *
     * @returns Object<status, message>
     */
    logout(): Promise<any>;
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
    register(name: string, email: string, password: string, remember?: boolean): Promise<IUser | null>;
    /**
     * Requests a password reset link to be sent to the given email address
     *
     * @returns Object<status, message>
     */
    reset(email: string): Promise<any>;
}
export {};
