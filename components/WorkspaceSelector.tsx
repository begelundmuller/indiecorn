import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/solid";
import { Workspace } from "@prisma/client";
import clsx from "clsx";
import Link from "next/link";
import React, { Fragment } from "react";
import useSWR from "swr";

import fetcher from "lib/fetcher";

type Props = {
  currentWorkspace?: Workspace;
};

const WorkspaceSelector: React.FC<Props> = ({ currentWorkspace }) => {
  const { data } = useSWR<Workspace[]>("/api/workspaces", fetcher);

  return (
    <Menu as="div" className="relative inline-block text-left min-w-[200px]">
      <div>
        <Menu.Button className="inline-flex justify-between w-full px-4 py-2 xx-btn-secondary">
          {currentWorkspace?.name || "Select workspace"}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
          <div className="py-1">
            {data?.map((workspace) => (
              <Menu.Item key={workspace.id}>
                {({ active }) => (
                  <div>
                    <Link href="/w/[id]" as={`/w/${workspace.id}`}>
                      <a
                        className={clsx(
                          "block px-4 py-2 text-sm text-gray-700",
                          active ? "bg-gray-200" : ""
                        )}
                      >
                        {workspace.name}
                      </a>
                    </Link>
                  </div>
                )}
              </Menu.Item>
            ))}
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link href="/w/create">
                  <a
                    className={clsx(
                      "group flex items-center px-4 py-2 text-sm text-gray-700",
                      active ? "bg-gray-200" : ""
                    )}
                  >
                    <PlusIcon className="mr-3 h-5 w-5" aria-hidden="true" />
                    New workspace
                  </a>
                </Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default WorkspaceSelector;
