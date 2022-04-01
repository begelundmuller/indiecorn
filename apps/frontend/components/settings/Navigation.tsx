import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

type Item = {
  name: string;
  href: string;
  as?: string;
  icon?: React.ComponentType<React.ComponentProps<"svg">>;
};

type Props = {
  items: Item[];
};

const Navigation: React.FC<Props> = ({ items }) => {
  const router = useRouter();
  const isActive = (pathname: string) => router.pathname === pathname;

  return (
    <nav className="space-y-1">
      {items.map((item) => (
        <Link key={item.name} href={item.href} as={item.as}>
          <a
            className={clsx(
              isActive(item.href)
                ? "text-black dark:text-white"
                : "text-gray-600 dark:text-gray-400",
              "group rounded-md px-3 py-2 flex items-center text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-900"
            )}
            aria-current={isActive(item.href) ? "page" : undefined}
          >
            <item.icon
              className={clsx(
                isActive(item.href)
                  ? "text-black dark:text-white"
                  : "text-gray-600 dark:text-gray-400",
                "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
              )}
              aria-hidden="true"
            />
            <span className="truncate">{item.name}</span>
          </a>
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
