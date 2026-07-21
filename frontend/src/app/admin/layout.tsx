// Thin root wrapper for all /admin/* pages.
// No auth check here — auth lives in (protected)/layout.tsx so /admin/login is reachable.
export const metadata = { title: "ADI Admin" };
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
