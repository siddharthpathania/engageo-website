import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = { width: 192, height: 192 };
export const contentType = 'image/png';

export default function Icon192(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #3D5AFE 0%, #6B80FF 100%)',
          borderRadius: 40,
          color: '#FFFFFF',
          fontSize: 128,
          fontWeight: 700,
          fontFamily: 'system-ui, sans-serif',
          letterSpacing: '-0.04em',
        }}
      >
        E
      </div>
    ),
    { ...size },
  );
}
