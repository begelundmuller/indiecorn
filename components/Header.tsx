import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import React, { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuAlt1Icon, XIcon } from "@heroicons/react/outline";
import Avatar from "./Avatar";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive = (pathname: string) => router.pathname === pathname;

  const { data: session, status } = useSession();

  const navigation = [];
  if (status === "authenticated") {
    navigation.push(
      { name: "Drafts", href: "/drafts", button: false },
      { name: "New post", href: "/create", button: false }
    );
  } else if (status === "unauthenticated") {
    navigation.push({
      name: "Sign in",
      href: "/api/auth/signin",
      button: true,
    });
  }

  const userNavigation = [
    { name: "Your Profile", href: "#" },
    { name: "Settings", href: "#" },
    { name: "Sign out", href: "/api/auth/signout" },
  ];

  return (
    <Disclosure
      as="nav"
      className="flex-shrink-0 bg-white dark:bg-black border-b border-gray-300 dark:border-gray-700"
    >
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              {/* Logo section */}
              <div className="flex items-center px-2 lg:px-0">
                <div className="flex-shrink-0">
                  <Link href="/">
                    <a data-active={isActive("/")}>
                      <div className="h-8 w-8">
                        <Image
                          width="100%"
                          height="100%"
                          src="/favicons/apple-touch-icon.png"
                          alt="Logo"
                        />
                      </div>
                    </a>
                  </Link>
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="flex lg:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 xx-btn-primary">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuAlt1Icon
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
              </div>

              {/* Links section */}
              <div className="hidden lg:block lg:w-80">
                <div className="flex items-center justify-end">
                  <div className="flex">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <a
                          className={clsx(
                            "px-3 py-2 rounded-md font-medium",
                            item.button && "xx-btn-primary",
                            !item.button &&
                              "text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white",
                            !item.button &&
                              isActive(item.href) &&
                              "text-black dark:text-white"
                          )}
                          aria-current={
                            isActive(item.href) ? "page" : undefined
                          }
                        >
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </div>

                  {/* Profile dropdown */}
                  {status === "authenticated" && (
                    <Menu as="div" className="ml-4 relative flex-shrink-0">
                      <div>
                        <Menu.Button className="bg-sky-500 flex text-sm rounded-full text-white focus:outline-none hover:ring-2 hover:ring-sky-500">
                          <span className="sr-only">Open user menu</span>
                          <div className="h-8 w-8">
                            <Avatar
                              name={session.user.name}
                              image={session.user.image}
                            />
                          </div>
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <Link href={item.href}>
                                  <a
                                    className={clsx(
                                      "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200",
                                      active ? "font-medium" : ""
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={clsx(
                    "block px-3 py-2 rounded-md text-base font-medium text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800",
                    isActive(item.href) && "bg-gray-100 dark:bg-gray-900"
                  )}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            {status === "authenticated" && (
              <div className="pt-4 pb-3 border-t border-gray-300 dark:border-gray-700">
                <div className="px-2 space-y-1">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
