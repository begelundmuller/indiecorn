import { ExclamationIcon } from "@heroicons/react/outline";
import { ReactNode } from "react";

type Props = {
  title: string;
  children?: ReactNode;
};

const Alert: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="rounded-md bg-red-100 dark:bg-red-900 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationIcon className="h-5 w-5 text-red-700 dark:text-red-300" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-700 dark:text-red-300">{title}</h3>
          <div className="mt-2 text-sm text-red-600 dark:text-red-400">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
