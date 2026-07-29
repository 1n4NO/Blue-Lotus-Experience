import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180
};

export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#090909',
          color: '#f7f6f2'
        }}
      >
        <div
          style={{
            width: 144,
            height: 144,
            borderRadius: 72,
            border: '3px solid rgba(185, 151, 91, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 64
          }}
        >
          𓆸
        </div>
      </div>
    ),
    size
  );
}
