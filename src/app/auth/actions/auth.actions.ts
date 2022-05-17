import { Action } from '@ngrx/store';
import { User, Authenticate } from '../models/user';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  Logout = '[Auth] Logout',
  LoginComplete = '[Auth] Login Success',
  LoginError = '[Auth] Login Failure',
  LoginRedirect = '[Auth] Login Redirect',
  FetchedUsers = '[Auth] fetchUsers',
  FetchedUsersComplete = '[Auth] fetchUsers Complete',
  FetchedUsersError = '[Auth] fetchUsers Error',
  LoadOrderUser = '[Auth] Load User',
  LoadOrderUserComplete = '[Auth] Load User Complete',
  LoadOrderUserError = '[Auth] Load Use Error'

}

export class FetchedUsers implements Action {
  readonly type = AuthActionTypes.FetchedUsers;
  constructor(public payload: string) { }
}

export class FetchedUsersComplete implements Action {
  readonly type = AuthActionTypes.FetchedUsersComplete;
  constructor(public payload: Array<User>) { }
}

export class FetchedUsersError implements Action {
  readonly type = AuthActionTypes.FetchedUsersError;
  constructor(public payload: any) { }
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;
  constructor(public payload: Authenticate) { }
}
export class LoginComplete implements Action {
  readonly type = AuthActionTypes.LoginComplete;
  constructor(public payload: User) { }
}

export class LoginError implements Action {
  readonly type = AuthActionTypes.LoginError;
  constructor(public payload: string) { }
}

export class LoadOrderUser implements Action {
  readonly type = AuthActionTypes.LoadOrderUser;
  constructor(public payload: string) { }
}

export class LoadOrderUserComplete implements Action {
  readonly type = AuthActionTypes.LoadOrderUserComplete;
  constructor(public payload: User) { }
}

export class LoadOrderUserError implements Action {
  readonly type = AuthActionTypes.LoadOrderUserError;
  constructor(public payload: string) { }
}

export class LoginRedirect implements Action {
  readonly type = AuthActionTypes.LoginRedirect;
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export type AuthActionsUnion =
  | Login
  | LoginComplete
  | LoginError
  | LoginRedirect
  | Logout
  | FetchedUsers
  | FetchedUsersComplete
  | FetchedUsersError
  | LoadOrderUser
  | LoadOrderUserComplete 
  | LoadOrderUserError 
  ;
