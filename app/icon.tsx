import { ImageResponse } from 'next/og';

import { BrandMark } from '@/components/brand-mark';

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
          background: '#090909'
        }}
      >
        <div
          style={{
            width: 360,
            height: 360,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <BrandMark />
        </div>
      </div>
    ),
    size
  );
}
