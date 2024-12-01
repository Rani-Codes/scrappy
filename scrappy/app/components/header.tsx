import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className="text-main">
        <div className="sm:flex justify-between font-semibold text-xl mx-4 items-center">
            <div className="flex justify-center items-center">
                <Image
                    src="/scrappy_logo.png"
                    width={100}
                    height={100}
                    alt="Picture of the mascot, scrappy"
                    />
                <h3 className="font-bold text-3xl flex ">
                    Scrappy <span className="text-base flex items-end">@UCDavis</span>
                </h3>
            </div>
            <Link href='/auth/login' className="p-1">
                <h3 className="font-bold cursor-pointer hover:text-slate-300 hidden sm:block">Sign in with Google</h3>
            </Link>
        </div>
    </div>
  )
}

export default Header