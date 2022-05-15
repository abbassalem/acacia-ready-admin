import { AuthActionsUnion, AuthActionTypes } from './../actions/auth.actions';
import { User } from '../models/user';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
  loggedIn: boolean;
  user: User ;
  pending: boolean;
  errors: any;
  fetchedUsers: Array<User>
}

export const initialState: State = {
  loggedIn: false,
  user: null,
  pending: false,
  errors: '',
  fetchedUsers: new Array<User>()
}

export const selectAuthState = createFeatureSelector<State>('auth');

export function reducer(state = initialState, action: AuthActionsUnion): State {
  
  switch (action.type) {

    case AuthActionTypes.Login: {
      return {
        ...state,
        pending: true
      };
    }
    case AuthActionTypes.LoginComplete: {
      return {
        ...state,
        loggedIn: true,
        pending: false,
        user: action.payload,
      };
    }

    case AuthActionTypes.LoginError: {
      return {
        ...state,
        pending: false
      };
    }

    case AuthActionTypes.Logout: {
      return initialState;
    }

    case AuthActionTypes.FetchedUsers: {
      return state;
    }

    case AuthActionTypes.FetchedUsersComplete: {
      return { ... state, fetchedUsers: action.payload}
    }

    case AuthActionTypes.FetchedUsersError: {
      return state;
    }
    

    default: {
      return state;
    }
  }
}

export const getFetchedUsers = createSelector(selectAuthState, (state: State) => state.fetchedUsers);
export const getLoggedIn = (state: State) => state.loggedIn;
export const getUser = (state: State) => state.user;
export const getPending = (state: State) => state.pending;
export const getErrors = (state: State) => state.errors;


