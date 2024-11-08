import Image from "next/image";

const Header = () => {
  return (
    <div className="text-[#094067] bg-[#d8eefe]">
        <div className="flex justify-between font-semibold text-xl mx-4 items-center">
            <div className="flex justify-center items-center">
                <Image
                    src="/scrappy_logo.png"
                    width={100}
                    height={100}
                    alt="Picture of the mascot, scrappy"
                    />
                <h3 className="font-bold text-3xl">Scrappy <span className="text-base">@UCDavis</span></h3>
            </div>
            <div className="flex gap-6">
                <h3>Login</h3>
                <h3>Signup</h3>
            </div>
        </div>
    </div>
  )
}

export default Header