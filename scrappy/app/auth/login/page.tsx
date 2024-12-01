'use client'
import { signInWithGoogle } from "../../lib/auth-actions"
import { FcGoogle } from 'react-icons/fc'


export default async function LoginPage() {

  return (
      <div className="mt-4 flex justify-center items-center w-full h-lvh">
        <div className="bg-gray-200 rounded-xl w-fit p-4 sm:p-10 text-center">
          <h2 className="text-black font-bold text-3xl">Login</h2>
          <h4 className="text-slate-700 mb-8 text-sm sm:text-base">Access your account securely with Google</h4>
          <button 
              type="button"
              onClick={() => {
                  signInWithGoogle();
              }}
              className="bg-button2 hover:bg-button2_hover p-4 rounded-full font-semibold text-main"
              >
            <span className="flex items-center gap-2">
              <FcGoogle className="h-5 w-5 bg-white rounded-full" /> 
              Sign in with Google
            </span>
          </button>
        </div>
      </div>
  )
}
