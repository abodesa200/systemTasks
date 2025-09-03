
import Image from "next/image";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="h-screen bg-zinc-900">
      <div className="h-screen relative p-4 overflow-hidden transition-all duration-500">
        <div className="flex h-screen  relative z-10">
          {/* Premium 3D Logo Section */}
          <div className="hidden lg:flex relative items-center justify-center flex-1 px-5 pt-4 lg:py-4">
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={"/logo.png"}
                width={400}
                height={400}
                className="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] object-contain p-1 rounded-full
                 bg-zinc-800  "
                alt="logo"
                priority
              />
            </div>
          </div>

          {/* Login Card */}
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
