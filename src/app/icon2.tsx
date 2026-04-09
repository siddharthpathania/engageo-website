import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const runtime = 'nodejs';

export const size = { width: 512, height: 512 };
export const contentType = 'image/png';

export default async function Icon512(): Promise<ImageResponse> {
  const logoData = await readFile(join(process.cwd(), 'public', 'logo.png'));
  const logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src={logoBase64} width={512} height={512} style={{ borderRadius: 112 }} />
      </div>
    ),
    { ...size },
  );
}
