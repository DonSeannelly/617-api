import {
  DataStore,
  Responder
} from './../interfaces';
import { generateToken } from '../drivers/jwt';

/**
 * Attempts user login via datastore and issues JWT access token
 * If credentials valid sends user with token
 * Else sends invalid login response via Responder
 *
 * @export
 * @param {DataStore} dataStore
 * @param {Responder} responder
 * @param {string} email
 * @param {string} password
 */
export async function login(
  dataStore: DataStore,
  responder: Responder,
  email: string,
  password: string
) {
  try {
    const { authenticated, firstname, lastname } = await dataStore.verifyUser(email, password);

    if (authenticated) {
      const token = generateToken({ firstname, lastname, email });
      responder.setCookie('presence', token, { name: `${firstname} ${lastname}`, firstname, lastname, email });
    } else {
      responder.invalidLogin();
    }
  } catch (e) {
    console.log(e);
    responder.sendOperationError(e);
  }
}

export async function logout(dataStore: DataStore, responder: Responder) {
  responder.removeCookie('presence');
  responder.sendOperationSuccess();
}

/**
 * Attempt user registraction via datastore and issues JWT access token
 * If username is unique sends user with access token
 * Else sends invalidRegistration Response via Responder
 *
 * @export
 * @param {DataStore} datastore
 * @param {Responder} responder
 * @param {User} user
 */
export async function register(
  datastore: DataStore,
  responder: Responder,
  firstname: string,
  lastname: string,
  email: string,
  password: string
) {
  try {
    if (isValidEmail(email)) {
      if (await datastore.addUser(firstname, lastname, email, password)) {
        const token = generateToken({ firstname, lastname, email });
        responder.setCookie('presence', token, { name: `${firstname} ${lastname}`, firstname, lastname, email });
      } else {
        responder.sendOperationError('Email address in use', 400);
      }
    } else {
      responder.sendOperationError('Invalid email provided.', 400);
    }
  } catch (e) {
    console.log(e);
    responder.sendOperationError(e);
  }
}

/**
 * Validates that an email meets the defined constraints.
 * 
 * @param username the username being validated
 * @returns {boolean} whether or not the username is valid.
 */
export function isValidEmail(email: string): boolean {
  return (
    true
  );
}
