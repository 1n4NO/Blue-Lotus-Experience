import Link from 'next/link';
import Image from 'next/image';

import { footerDetails } from '@/content/site';

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#070707]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 sm:px-8 lg:grid-cols-[1.4fr,1fr] lg:px-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo-mark.png"
              alt=""
              width={34}
              height={34}
              className="h-8 w-8 rounded-full object-cover"
            />
            <p className="font-ui text-[0.72rem] uppercase tracking-[0.34em] text-text">
              Blue Lotus Experience
            </p>
          </div>
          <p className="max-w-xl text-sm leading-7 text-muted">
            A quiet retreat practice rooted in slow living, silence, tea, forest walks, and
            human-scale connection.
          </p>
        </div>

        <div className="grid gap-4 text-sm text-muted sm:grid-cols-2">
          <Link
            href={footerDetails.instagram}
            className="group inline-flex items-center justify-between border-b border-white/10 pb-2 transition hover:text-text"
          >
            <span>Instagram</span>
            <span className="translate-x-0 transition duration-300 group-hover:translate-x-1">↗</span>
          </Link>
          <p className="border-b border-white/10 pb-2">{footerDetails.location}</p>
          <p className="border-b border-white/10 pb-2">Copyright 2026 Blue Lotus Experience</p>
        </div>
      </div>
    </footer>
  );
}
