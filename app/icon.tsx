import { ImageResponse } from 'next/og';
import fs from 'node:fs';
import path from 'node:path';

export const runtime = 'nodejs';

const logoDataUrl = `data:image/png;base64,${fs
  .readFileSync(path.join(process.cwd(), 'public/images/logo-mark-round.png'))
  .toString('base64')}`;

export const size = {
  width: 512,
  height: 512
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent'
        }}
      >
        <img
          src={logoDataUrl}
          alt=""
          width="100%"
          height="100%"
          style={{
            objectFit: 'contain'
          }}
        />
      </div>
    ),
    size
  );
}
