import { ImageResponse } from 'next/og';

import { siteConfig } from '@/lib/site';

export const size = {
  width: 1200,
  height: 630
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background:
            'radial-gradient(circle at top left, rgba(85,107,47,0.4), transparent 26%), linear-gradient(180deg, #0d0d0d 0%, #090909 100%)',
          color: '#f7f6f2',
          padding: 64,
          fontFamily: 'Inter'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 999,
              border: '2px solid rgba(185, 151, 91, 0.95)'
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: 18, letterSpacing: 6, textTransform: 'uppercase', opacity: 0.75 }}>
              Blue Lotus Experience
            </div>
            <div style={{ fontSize: 14, opacity: 0.55 }}>Kodaikanal · October 2026</div>
          </div>
        </div>

        <div style={{ display: 'flex', maxWidth: 850, flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontFamily: 'serif',
              fontSize: 86,
              lineHeight: 0.95,
              letterSpacing: -2
            }}
          >
            Come home to yourself.
          </div>
          <div style={{ fontSize: 28, lineHeight: 1.5, maxWidth: 700, color: '#d5d0c8' }}>
            Two days in the forests of Kodaikanal. Limited to eleven participants.
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, opacity: 0.65 }}>
          <span>Your body is your temple.</span>
          <span>{siteConfig.url.replace('https://', '')}</span>
        </div>
      </div>
    ),
    size
  );
}
