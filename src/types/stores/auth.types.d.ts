import type { Response, State } from '@tp/index.types'

/**
 * Sign up payload.
 *
 * @property {string} email - Email
 * @property {string} password - Password
 * @property {string} first_name - First Name
 * @property {string} last_name - Last Name
 * @property {string} phone - Phone
 */
interface SignUpPayload {
  email: string
  password: string
  first_name: string
  last_name: string
  phone: string
}
/**
 * The state of the sign up store.
 *
 * @property {boolean} error - The error state of the store.
 * @property {boolean} loading - The loading state of the store.
 * @property {boolean} show - The show state of the store.
 */
interface SignUpState extends State<null> { }
/**
 * The response of the sign up.
 *
 * @property {string} message - The message of the response.
 */
interface SignUpResponse extends Response<null> { }

/**
 * Data of a sign in.
 *
 * @property {object of array} user - User data
 * @property {string} user.email - Email
 * @property {string} user.first_name - First Name
 * @property {string} user.last_name - Last Name
 * @property {string} user.phone - Phone
 * @property {object} token - Token data
 * @property {string} token.accessToken - Access Token
 */
interface SignInData {
  user: {
    email: string
    first_name: string
    last_name: string
    phone: string
    role: 'admin' | 'user'
  }[]
  token: {
    accessToken: string
  }
}

/**
 * Sign in payload.
 *
 * @property {string} email - Email
 * @property {string} password - Password
 */
interface SignInPayload {
  email: string
  password: string
}
/**
 * The state of the sign in store.
 *
 * @property {boolean} error - The error state of the store.
 * @property {boolean} loading - The loading state of the store.
 * @property {boolean} show - The show state of the store.
 */
interface SignInState extends State<null> { }
/**
 * The response of the sign in.
 *
 * @property {SignInData} data - The data of the response.
 * @property {string} message - The message of the response.
 */
interface SignInResponse extends Response<SignInData> { }

/**
 * Sign out payload.
 *
 * @property {string} email - Email
 */
interface SignOutPayload {
  email: string
}
/**
 * The state of the sign out store.
 *
 * @property {boolean} error - The error state of the store.
 * @property {boolean} loading - The loading state of the store.
 * @property {boolean} show - The show state of the store.
 */
interface SignOutState extends State<null> { }
/**
 * The response of the sign out.
 *
 * @property {string} message - The message of the response.
 */
interface SignOutResponse extends Response<null> { }

/**
 * Forget password payload.
 *
 * @property {string} email - Email
 */
interface ForgetPayload {
  email: string
}
/**
 * The state of the forget password store.
 *
 * @property {boolean} error - The error state of the store.
 * @property {boolean} loading - The loading state of the store.
 * @property {boolean} show - The show state of the store.
 */
interface ForgetState extends State<null> { }
/**
 * The response of the forget password.
 *
 * @property {string} message - The message of the response.
 */
interface ForgetResponse extends Response<null> { }

/**
 * Reset password payload.
 *
 * @property {string} email - Email
 * @property {string} password - Password
 * @property {string} new_password - New Password
 */
interface ResetPayload {
  email: string
  password: string
  new_password: string
}
/**
 * The state of the reset password store.
 *
 * @property {boolean} error - The error state of the store.
 * @property {boolean} loading - The loading state of the store.
 * @property {boolean} show - The show state of the store.
 */
interface ResetState extends State<null> { }
/**
 * The response of the reset password.
 *
 * @property {string} message - The message of the response.
 */
interface ResetResponse extends Response<null> { }
