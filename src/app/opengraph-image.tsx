import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const runtime = 'nodejs';

export const alt = 'Engageo — AI missed-call recovery for Indian clinics';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage(): Promise<ImageResponse> {
  const logoData = await readFile(join(process.cwd(), 'public', 'logo.png'));
  const logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: '#0F0D0B',
          color: '#FEFCFA',
          fontFamily: 'system-ui, sans-serif',
          padding: 80,
          position: 'relative',
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            top: -260,
            left: 300,
            width: 900,
            height: 600,
            borderRadius: 9999,
            background:
              'radial-gradient(closest-side, rgba(61,90,254,0.45) 0%, rgba(61,90,254,0) 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -200,
            right: -120,
            width: 600,
            height: 600,
            borderRadius: 9999,
            background:
              'radial-gradient(closest-side, rgba(232,85,42,0.28) 0%, rgba(232,85,42,0) 70%)',
          }}
        />

        {/* Logo row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: '-0.02em',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src={logoBase64} width={48} height={48} style={{ borderRadius: 10 }} />
          <span>Engageo</span>
        </div>

        {/* Headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 'auto',
            maxWidth: 980,
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: '#6B80FF',
              marginBottom: 26,
            }}
          >
            Missed Call Recovery · Clinics India
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              fontSize: 82,
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: '-0.035em',
            }}
          >
            Every unanswered clinic call, booked back in{' '}
            <span style={{ color: '#EC7550' }}>8 seconds.</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 32,
              marginTop: 44,
              fontSize: 22,
              color: 'rgba(254,252,250,0.7)',
            }}
          >
            <span>Live in 47+ Indian clinics</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>Dental · Derm · IVF · Physio</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
