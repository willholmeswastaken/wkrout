import Link from "next/link";
import { Dumbbell } from "lucide-react";
import { SignInButton } from "./sign-in";

export function PageHeader() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <Link href="/" className="flex items-center group">
          <Dumbbell className="h-6 w-6 text-orange-500 mr-2 group-hover:scale-110 transition-transform" />
          <h1 className="text-2xl font-bold group-hover:text-orange-500 transition-colors">
            Wrkout
          </h1>
        </Link>
        <SignInButton />
      </div>
      <div className="border-b border-border mb-8" />
    </>
  );
}
