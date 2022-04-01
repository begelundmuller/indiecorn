import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Theme isn't available until the site has mounted
  useEffect(() => setMounted(true), []);

  return (
    <select
      id="theme"
      name="theme"
      className="mt-1 block w-full pl-3 pr-10 py-2 sm:text-sm text-base xx-btn-secondary"
      value={mounted ? theme : "system"}
      onChange={(e) => setTheme(e.target.value)}
    >
      <option value="system">System theme</option>
      <option value="light">Light theme</option>
      <option value="dark">Dark theme</option>
    </select>
  );
};

export default ThemeToggle;
