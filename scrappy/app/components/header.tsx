import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className="text-main">
        <div className="flex justify-between font-semibold text-xl mx-4 items-center">
            <div className="flex justify-center items-center">
                <Image
                    src="/scrappy_logo.png"
                    width={100}
                    height={100}
                    alt="Picture of the mascot, scrappy"
                    />
                <Link href='/' className="p-1">
                    <h3 className="font-bold text-3xl cursor-pointer hover:text-slate-500">
                        Scrappy <span className="text-base">@UCDavis</span>
                    </h3>
                </Link>
            </div>
            <div className="flex gap-6">
                <Link href='/login' className="p-1">
                    <h3 className="font-bold cursor-pointer hover:text-slate-500">Login</h3>
                </Link>
                <Link href='/signup' className="p-1">
                    <h3 className="font-bold cursor-pointer hover:text-slate-500">Signup</h3>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Header