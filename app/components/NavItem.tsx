import clsx from "clsx";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const NavItem = ({ mobile }: { mobile?: boolean }) => {
  const { data: session, status } = useSession();
  console.log(session?.user);
  return (
    <ul
      className={clsx(
        "text-base justify-center flex gap-4 w-full items-center",
        mobile && "flex-col h-full"
      )}
    >
      <li className="py-2 text-center cursor-pointer hover:text-indigo-600 transition-colors">
        <Link href={"/admin"}>Admin</Link>
      </li>
      <li className="py-2 text-center cursor-pointer hover:text-indigo-600 transition-colors">
        <Link href={"/user"}>User</Link>
      </li>
      <li className="py-2 text-center cursor-pointer hover:text-indigo-600 transition-colors">
        <button onClick={() => signIn()}>Login</button>
      </li>
      <li className="py-2 text-center cursor-pointer hover:text-indigo-600 transition-colors">
        <button onClick={() => signOut()}>Logout</button>
      </li>
    </ul>
  );
};

export default NavItem;
