import { ImageResponse } from 'next/og';

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
          background: '#090909',
          color: '#f7f6f2',
          position: 'relative'
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 48,
            borderRadius: 256,
            border: '4px solid rgba(185, 151, 91, 0.95)'
          }}
        />
        <div
          style={{
            width: 220,
            height: 220,
            borderRadius: 120,
            background:
              'radial-gradient(circle at 50% 45%, rgba(185,151,91,0.36), rgba(9,9,9,0.1) 56%), linear-gradient(180deg, rgba(85,107,47,0.85), rgba(7,7,7,0.2))',
            boxShadow: '0 16px 60px rgba(0, 0, 0, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: 999,
              border: '1px solid rgba(247,246,242,0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 72,
              fontFamily: 'serif'
            }}
          >
            𓆸
          </div>
        </div>
      </div>
    ),
    size
  );
}
