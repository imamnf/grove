/* eslint-disable unused-imports/no-unused-vars */
import type {
  ForgetPayload,
  ForgetResponse,
  ForgetState,
  ResetPayload,
  ResetResponse,
  ResetState,
  SignInData,
  SignInPayload,
  SignInResponse,
  SignInState,
  SignOutPayload,
  SignOutResponse,
  SignOutState,
  SignUpPayload,
  SignUpResponse,
  SignUpState,
} from '@tpStr/auth.types'
import { useToast } from 'primevue/usetoast'
import { type Router, useRouter } from 'vue-router/auto'

import { useMenuStore } from './menu.store'

export const useAuthStore = defineStore('auth', () => {
  const toast = useToast()

  /**
   * The menu store instance.
   */
  const menuStore = useMenuStore()

  /**
   * The base URL for all API requests.
   *
   * @type {string}
   */
  const url: string = `${import.meta.env.VITE_API_BASE_URL}/auth`
  /**
   * The router instance.
   *
   * @type {Router}
   */
  const router: Router = useRouter()

  /*****************
   *               *
   * -> Sign Up <- *
   *               *
   ****************/

  /**
   * The sign up state of the auth store.
   *
   * @property {SignUpState[null]} data - The data of the sign up state.
   * @property {boolean} error - The error state of the sign up state.
   * @property {boolean} loading - The loading state of the sign up state.
   * @property {boolean} show - The show state of the sign up state.
   */
  const signUpState = reactive<SignUpState>({
    error: false,
    loading: false,
    show: false,
  })

  /**
   * The function of the sign up action.
   *
   * @param {SignUpPayload} payload - The payload of signing up.
   * @returns {Promise<void>}
   */
  const signUp = async (payload: SignUpPayload): Promise<void> => {
    signUpState.error = false
    signUpState.loading = true
    signUpState.show = false

    try {
      const { status } = await $api<SignUpResponse>(`${url}/sign-up`, { method: 'POST', body: payload })

      if (status === 200) {
        signUpState.show = true
      }
      else {
        signUpState.error = true
      }
    }
    catch (e: any) {
      signUpState.error = true
    }
    finally {
      signUpState.loading = false
    }
  }

  /*****************
   *               *
   * -> Sign In <- *
   *               *
   ****************/

  /**
   * The sign in state of the auth store.
   *
   * @property {SignInState[null]} data - The data of the sign up state.
   * @property {boolean} error - The error state of the sign up state.
   * @property {boolean} loading - The loading state of the sign up state.
   * @property {boolean} show - The show state of the sign up state.
   */
  const signInState = reactive<SignInState>({
    error: false,
    loading: false,
    show: false,
  })
  const user = useLocalStorage('user', null, {
    serializer: {
      read: (v: string) => (v ? JSON.parse(v) : null),
      write: (v: SignInData['user']) => JSON.stringify(v),
    },
  })
  const accessToken = useSessionStorage<string | null>('accessToken', null)

  /**
   * The function of the sign in action.
   *
   * @param {SignInPayload} payload - The payload of signing in.
   * @returns {Promise<void>}
   */
  const signIn = async (payload: SignInPayload): Promise<void> => {
    signInState.error = false
    signInState.loading = true
    signInState.show = false

    try {
      const { data, status } = await $api<SignInResponse>(`${url}/sign-in`, { method: 'POST', body: payload })

      if (status === 200) {
        toast.add({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 })

        // Wait for toast to finish
        await new Promise(resolve => setTimeout(resolve, 3000))

        accessToken.value = data.data?.token.accessToken
        user.value = data.data?.user

        await menuStore.getAllMenu()
        await router.push('/dashboard')
      }
      else {
        signInState.error = true
      }
    }
    catch (e: any) {
      signInState.error = true
    }
    finally {
      signInState.loading = false
      signInState.show = true
    }
  }
  /******************
   *                *
   * -> Sign Out <- *
   *               *
   *****************/

  /**
   * The function of the sign in action.
   *
   * @param {SignOutState[null]} payload - The payload of signing out.
   * @returns {Promise<void>}
   */
  const signOutState = reactive<SignOutState>({
    error: false,
    loading: false,
    show: false,
  })

  /**
   * The function of the sign out action.
   *
   * @param {SignOutPayload} payload - The payload of signing out.
   * @returns {Promise<void>}
   */
  const signOut = async (payload: SignOutPayload): Promise<void> => {
    signOutState.error = false
    signOutState.loading = true
    signOutState.show = false

    try {
      const { status } = await $api<SignOutResponse>(`${url}/sign-out`, { method: 'DELETE', body: payload })

      if (status === 200) {
        signOutState.show = true
      }
      else {
        signOutState.error = true
      }
    }
    catch (error: any) {
      signOutState.error = true
    }
    finally {
      signOutState.loading = false
    }
  }

  /**
   *  Forget Password
   */

  // State
  const forgetState = reactive<ForgetState>({
    error: false,
    loading: false,
    show: false,
  })

  // Action
  const forgetPassword = async (payload: ForgetPayload) => {
    forgetState.error = false
    forgetState.loading = true
    forgetState.show = false

    try {
      const { status, data } = await $api<ForgetResponse>(`${url}/forget-password`, { method: 'POST', body: payload })

      if (status === 200) {
        forgetState.data = data.data
      }
      else {
        forgetState.error = true
      }
    }
    catch (error: any) {
      forgetState.error = true
    }
    finally {
      forgetState.loading = false
      forgetState.show = true
    }
  }

  /**
   *  Reset Password
   */

  // State
  const resetState = reactive<ResetState>({
    error: false,
    loading: false,
    show: false,
  })

  // Action
  const resetPassword = async (payload: ResetPayload) => {
    resetState.error = false
    resetState.loading = true
    resetState.show = false

    try {
      const { data, status } = await $api<ResetResponse>(`${url}/reset-password`, { method: 'PUT', body: payload })

      if (status === 200) {
        resetState.data = data.data
      }
      else {
        resetState.error = true
      }
    }
    catch (error: any) {
      resetState.error = true
    }
    finally {
      resetState.loading = false
      resetState.show = true
    }
  }

  return {
    // Sign Up
    signUpState,
    signUp,

    // Sign In
    signInState,
    user,
    accessToken,
    signIn,

    // Sign Out
    signOutState,
    signOut,

    // Forget Password
    forgetState,
    forgetPassword,

    // Reset Password
    resetState,
    resetPassword,
  }
})
