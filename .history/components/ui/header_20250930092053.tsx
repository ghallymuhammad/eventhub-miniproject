import Link from "next/link";
import Logo from "./logo";

export default function Header() {
  return (
    <header className="fixed top-2 z-30 w-full md:top-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-white/90 px-3 shadow-lg shadow-black/[0.03] backdrop-blur-xs before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(var(--color-gray-100),var(--color-gray-200))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
          {/* Site branding */}
          <div className="flex flex-1 items-center">
            <Logo />
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Events
            </Link>
            <Link
              href="/create-event"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Create Event
            </Link>
            <Link
              href="/transactions"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              My Tickets
            </Link>
            <Link
              href="/reviews"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Reviews
            </Link>
            <Link
              href="/organizer"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Dashboard
            </Link>
          </nav>

          {/* Desktop sign in links */}
          <ul className="flex flex-1 items-center justify-end gap-3">
            <li>
              <Link
                href="/signin"
                className="btn-sm bg-white text-gray-800 shadow-sm hover:bg-gray-50"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/signup"
                className="btn-sm bg-gray-800 text-gray-200 shadow-sm hover:bg-gray-900"
              >
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
