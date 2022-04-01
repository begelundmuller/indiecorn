import { ReactNode } from "react";

type Props = {
  title?: string;
  subtitle?: string;
  footer?: ReactNode;
  children?: ReactNode;
};

const FormCard: React.FC<Props> = ({ title, subtitle, children, footer }) => {
  return (
    <div className="border border-gray-300 dark:border-gray-700 sm:rounded-md sm:overflow-hidden">
      <div className="bg-white dark:bg-black py-6 px-4 space-y-6 sm:p-6">
        <div>
          <h3 className="text-lg leading-6 font-medium">{title}</h3>
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
        </div>
        {children}
      </div>
      {footer && (
        <div className="bg-white dark:bg-black border-t border-gray-300 dark:border-gray-700 px-4 sm:px-6 py-3 text-right">
          {footer}
        </div>
      )}
    </div>
  );
};

export default FormCard;
