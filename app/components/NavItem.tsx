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
        <Link href={"/admin"}>관리자</Link>
      </li>
      <li className="py-2 text-center cursor-pointer hover:text-indigo-600 transition-colors">
        <Link href={"/user"}>사용자</Link>
      </li>

      <li className="py-2 text-center cursor-pointer hover:text-indigo-600 transition-colors">
        {session?.user ? (
          <button onClick={() => signOut()}>로그아웃</button>
        ) : (
          <button onClick={() => signIn()}>로그인</button>
        )}
      </li>
    </ul>
  );
};

export default NavItem;
