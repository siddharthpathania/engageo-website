import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const runtime = 'nodejs';

export const size = { width: 192, height: 192 };
export const contentType = 'image/png';

export default async function Icon192(): Promise<ImageResponse> {
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
        <img alt="" src={logoBase64} width={192} height={192} style={{ borderRadius: 40 }} />
      </div>
    ),
    { ...size },
  );
}
