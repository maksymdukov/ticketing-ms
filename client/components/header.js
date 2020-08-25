import Link from "next/link";

export const Header = ({ currentUser }) => {
  const links = [
    !currentUser && { label: "Sign up", href: "/auth/signup" },
    !currentUser && { label: "Sign in", href: "/auth/signin" },
    currentUser && { label: "Sell tickets", href: "/tickets/new" },
    currentUser && { label: "My orders", href: "/orders" },
    currentUser && { label: "Sign out", href: "/auth/signout" },
  ];
  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/">
        <a className="navbar-brand">GitTix</a>
      </Link>

      <div className="d-flex justify-cintent-end">
        <ul className="nav d-flex aligh-items-center">
          {links.map(
            (link) =>
              link && (
                <li key={link.label} className="nav-item">
                  <Link href={link.href}>
                    <a className="nav-link">{link.label}</a>
                  </Link>
                </li>
              )
          )}
        </ul>
      </div>
    </nav>
  );
};
