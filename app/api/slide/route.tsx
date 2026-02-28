import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// ── Brand colors ──
const BRAND = {
  primary: '#0ea5e9',    // sky-500
  dark: '#0c4a6e',       // sky-900
  text: '#1e293b',       // slate-800
  textLight: '#64748b',  // slate-500
  textMuted: '#94a3b8',  // slate-400
  bg: '#ffffff',
  bgSoft: '#f0f9ff',     // sky-50
  accent: '#38bdf8',     // sky-400
  border: '#e0f2fe',     // sky-100
};

// ── Helper: decode base64 to UTF-8 string (Edge-compatible) ──
function decodeBase64UTF8(base64: string): string {
  const binaryStr = atob(base64);
  const bytes = new Uint8Array(binaryStr.length);
  for (let i = 0; i < binaryStr.length; i++) {
    bytes[i] = binaryStr.charCodeAt(i);
  }
  return new TextDecoder('utf-8').decode(bytes);
}

// ── Slide renderers ──

function CoverSlide({ headline, subtitle }: { headline: string; subtitle?: string }) {
  return (
    <div
      style={{
        width: '1080px',
        height: '1080px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(145deg, ${BRAND.bgSoft} 0%, ${BRAND.bg} 50%, ${BRAND.border} 100%)`,
        padding: '80px',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Top accent line */}
      <div style={{ display: 'flex', width: '120px', height: '4px', background: BRAND.primary, borderRadius: '2px', marginBottom: '50px' }} />

      {/* Brand */}
      <div style={{
        display: 'flex',
        fontSize: '26px',
        fontWeight: 700,
        color: BRAND.primary,
        letterSpacing: '3px',
        marginBottom: '50px',
        textTransform: 'uppercase' as const,
      }}>
        APEX HEALTH IA
      </div>

      {/* Headline */}
      <div style={{
        display: 'flex',
        fontSize: headline.length > 60 ? '44px' : '52px',
        fontWeight: 800,
        color: BRAND.text,
        textAlign: 'center',
        lineHeight: 1.25,
        maxWidth: '900px',
      }}>
        {headline}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <div style={{
          display: 'flex',
          fontSize: '24px',
          color: BRAND.textLight,
          textAlign: 'center',
          marginTop: '30px',
          lineHeight: 1.5,
          maxWidth: '750px',
        }}>
          {subtitle}
        </div>
      )}

      {/* Footer */}
      <div style={{
        display: 'flex',
        position: 'absolute',
        bottom: '60px',
        fontSize: '20px',
        color: BRAND.textMuted,
      }}>
        @apexhealthia
      </div>
    </div>
  );
}

function ContentSlide({ slideNumber, totalSlides, title, bullets }: {
  slideNumber: number;
  totalSlides: number;
  title: string;
  bullets: string[];
}) {
  return (
    <div
      style={{
        width: '1080px',
        height: '1080px',
        display: 'flex',
        flexDirection: 'column',
        background: BRAND.bg,
        padding: '70px 80px',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Header bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px',
      }}>
        <div style={{
          display: 'flex',
          fontSize: '20px',
          fontWeight: 700,
          color: BRAND.primary,
          letterSpacing: '2px',
        }}>
          APEX HEALTH IA
        </div>
        <div style={{
          display: 'flex',
          fontSize: '18px',
          color: BRAND.textMuted,
        }}>
          {slideNumber}/{totalSlides}
        </div>
      </div>

      {/* Accent line */}
      <div style={{ display: 'flex', width: '80px', height: '4px', background: BRAND.primary, borderRadius: '2px', marginBottom: '30px' }} />

      {/* Title */}
      <div style={{
        display: 'flex',
        fontSize: title.length > 40 ? '36px' : '42px',
        fontWeight: 800,
        color: BRAND.text,
        lineHeight: 1.25,
        marginBottom: '40px',
      }}>
        {title}
      </div>

      {/* Bullets */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        flex: 1,
      }}>
        {bullets.map((bullet, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '16px',
          }}>
            <div style={{
              display: 'flex',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: BRAND.primary,
              marginTop: '12px',
              flexShrink: 0,
            }} />
            <div style={{
              display: 'flex',
              fontSize: '26px',
              color: BRAND.text,
              lineHeight: 1.55,
            }}>
              {bullet}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        display: 'flex',
        fontSize: '18px',
        color: BRAND.textMuted,
        marginTop: '20px',
      }}>
        @apexhealthia
      </div>
    </div>
  );
}

function CtaSlide({ headline, body }: { headline: string; body?: string }) {
  return (
    <div
      style={{
        width: '1080px',
        height: '1080px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(145deg, ${BRAND.dark} 0%, #075985 100%)`,
        padding: '80px',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Brand */}
      <div style={{
        display: 'flex',
        fontSize: '24px',
        fontWeight: 700,
        color: BRAND.accent,
        letterSpacing: '3px',
        marginBottom: '50px',
        textTransform: 'uppercase' as const,
      }}>
        APEX HEALTH IA
      </div>

      {/* Headline */}
      <div style={{
        display: 'flex',
        fontSize: '48px',
        fontWeight: 800,
        color: '#ffffff',
        textAlign: 'center',
        lineHeight: 1.3,
        maxWidth: '850px',
        marginBottom: '30px',
      }}>
        {headline}
      </div>

      {/* Body */}
      {body && (
        <div style={{
          display: 'flex',
          fontSize: '24px',
          color: '#bae6fd',
          textAlign: 'center',
          lineHeight: 1.5,
          maxWidth: '700px',
          marginBottom: '40px',
        }}>
          {body}
        </div>
      )}

      {/* CTA button-like element */}
      <div style={{
        display: 'flex',
        padding: '18px 50px',
        background: BRAND.primary,
        borderRadius: '50px',
        fontSize: '24px',
        fontWeight: 700,
        color: '#ffffff',
      }}>
        Siga @apexhealthia
      </div>
    </div>
  );
}

// ── Main handler ──

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const dataParam = searchParams.get('data');

    if (!dataParam) {
      return new Response('Missing "data" query parameter. Provide base64-encoded JSON.', { status: 400 });
    }

    // Decode base64 → UTF-8 string → JSON
    const decoded = decodeBase64UTF8(dataParam);
    const slideData = JSON.parse(decoded);

    const {
      type = 'content',
      headline = '',
      subtitle = '',
      title = '',
      bullets = [],
      body = '',
      slideNumber = 1,
      totalSlides = 5,
    } = slideData;

    let element;

    switch (type) {
      case 'cover':
        element = <CoverSlide headline={headline} subtitle={subtitle} />;
        break;
      case 'cta':
        element = <CtaSlide headline={headline} body={body} />;
        break;
      case 'content':
      default:
        element = <ContentSlide
          slideNumber={slideNumber}
          totalSlides={totalSlides}
          title={title || headline}
          bullets={Array.isArray(bullets) ? bullets : [bullets]}
        />;
        break;
    }

    return new ImageResponse(element, {
      width: 1080,
      height: 1080,
    });
  } catch (e: any) {
    return new Response(`Error generating slide: ${e.message}`, { status: 500 });
  }
}
