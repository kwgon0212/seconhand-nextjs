import Link from "next/link";

interface FloatingActionButtonProps {
  href: string;
  children: React.ReactNode;
}
const FloatingActionButton = ({
  href,
  children,
}: FloatingActionButtonProps) => {
  return (
    <Link
      href={href}
      className="fixed bottom-5 right-5 text-2xl flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 via-blue-500 to-cyan-400 text-white shadow-[0_10px_35px_-12px_rgba(59,130,246,0.8)] transition-all duration-200 hover:translate-y-[-2px] hover:shadow-[0_12px_40px_-12px_rgba(59,130,246,0.9)] active:translate-y-0 active:shadow-[0_8px_28px_-12px_rgba(59,130,246,0.75)] focus:outline-none focus:ring-4 focus:ring-blue-200/70"
    >
      {children}
    </Link>
  );
};

export default FloatingActionButton;
