import { SiBloglovin } from "@meronex/icons/si/";

export default function Header() {
  return (
    <header className="flex bg-[#344D67] p-8">
      <div className="flex items-center text-yellow-100 text-lg">
        <p className="mr-2">my</p>
        <SiBloglovin size={42} color="#fef9c3" />
        logger
      </div>
    </header>
  );
}
