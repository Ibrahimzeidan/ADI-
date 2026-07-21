// Locale-aware navigation helpers — automatically prefix links with /ar or /en.
// Import Link, useRouter, usePathname from HERE (not from next/link or next/navigation)
// whenever navigating between pages. Anchor links (#section) can still use next/link.

import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
