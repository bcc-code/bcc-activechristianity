var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import gql from './gql';
import Emitter from './Emitter';
export default class Auth extends Emitter {
    constructor(app) {
        super();
        this._fetch = app.$fetch;
    }
    on(event, cb) {
        super.on(event, cb);
    }
    /**
     * Returns the currently logged in user
     *
     * @returns Promise with the user's profile if successful.
     */
    profile() {
        return __awaiter(this, void 0, void 0, function* () {
            const { me } = yield this._fetch(gql.queries.profile);
            return me;
        });
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
    login(username, password, remember = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let auth = yield this._fetch(gql.mutations.login, {
                username,
                password,
                remember
            });
            const { user, success } = auth.login;
            if (success) {
                this.emit('onLogin', user);
                this.emit('onUser', user);
                return user;
            }
            else
                return null;
        });
    }
    /**
     * Unauthenticates the current user, invalidating the access token.
     *
     * @emits onLogout Argument is NULL
     * @emits onUser Argument is NULL
     *
     * @returns Object<status, message>
     */
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            this.emit('onLogout', null);
            this.emit('onUser', null);
            return yield this._fetch(gql.mutations.logout);
        });
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
    register(name, email, password, remember = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let auth = yield this._fetch(gql.mutations.register, {
                name,
                email,
                password,
                remember
            });
            const { user, success } = auth.register;
            if (success) {
                this.emit('onRegister', user);
                this.emit('onUser', user);
                return user;
            }
            else
                return null;
            return yield this._fetch(gql.mutations.register);
        });
    }
    /**
     * Requests a password reset link to be sent to the given email address
     *
     * @returns Object<status, message>
     */
    reset(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._fetch(gql.mutations.resetPassword, { email });
        });
    }
}
