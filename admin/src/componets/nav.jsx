'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation'


function NavBar() {
  const links = [
    {
      label: 'Overview',
      path: '/',
    },
    {
      label: 'Categories',
      path: '/categories',
    },
    {
      label: 'Products',
      path: '/products',
    },
    {
      label: 'Orders',
      path: '/orders',
    }
  ]

  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between p-3 h-[4rem] w-full border-b-[1px]">
      <h1>BRAND</h1>
      <nav className="flex space-x-20">
        <ul className="flex space-x-6 text-[15px] text-slate-500">
          {links.map(link => {
            const isActive = pathname === link.path;
            return (
              <li key={`${link.label}-${link.path}`} className="mb-1">
                <Link className={isActive ?' text-black' : undefined} href={link.path}>
                  { link.label }
                </Link>
          </li>
        )
      })}
        </ul>
        <div className="w-[30px] h-[30px] bg-black rounded-full"></div>
      </nav>
    </header>
  );
}

export default NavBar;