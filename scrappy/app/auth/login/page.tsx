'use client'
import { signInWithGoogle } from "../../lib/auth-actions"


export default async function LoginPage() {

  return (
      <div className="mt-4">
        <button 
            type="button"
            onClick={() => {
                signInWithGoogle();
            }}
            >
            Sign in with Google
        </button>
      </div>
  )
}
