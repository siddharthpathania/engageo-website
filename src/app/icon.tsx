import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const runtime = 'nodejs';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default async function Icon(): Promise<ImageResponse> {
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
        <img src={logoBase64} width={32} height={32} style={{ borderRadius: 4 }} />
      </div>
    ),
    { ...size },
  );
}
