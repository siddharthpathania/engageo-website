import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon(): ImageResponse {
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
          fontSize: 120,
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
