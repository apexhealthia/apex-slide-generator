import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// ── Brand colors ──
const BRAND = {
  primary: '#0ea5e9',    // sky-500
  primaryDark: '#0284c7', // sky-600
  dark: '#0c4a6e',       // sky-900
  darker: '#082f49',     // sky-950
  text: '#1e293b',       // slate-800
  textLight: '#475569',  // slate-600
  textMuted: '#94a3b8',  // slate-400
  bg: '#ffffff',
  bgSoft: '#f0f9ff',     // sky-50
  bgWarm: '#f8fafc',     // slate-50
  accent: '#38bdf8',     // sky-400
  border: '#e0f2fe',     // sky-100
  highlight: '#fef3c7',  // amber-100
  highlightText: '#92400e', // amber-800
  green: '#10b981',
  greenBg: '#ecfdf5',
};

// ── UTF-8 safe base64 decode (Edge runtime) ──
function decodeBase64UTF8(base64: string): string {
  const binaryStr = atob(base64);
  const bytes = new Uint8Array(binaryStr.length);
  for (let i = 0; i < binaryStr.length; i++) {
    bytes[i] = binaryStr.charCodeAt(i);
  }
  return new TextDecoder('utf-8').decode(bytes);
}

// ── COVER SLIDE ──
function CoverSlide({ headline, subtitle, tag, source }: {
  headline: string;
  subtitle?: string;
  tag?: string;
  source?: string;
}) {
  return (
    <div style={{
      width: '1080px', height: '1080px', display: 'flex', flexDirection: 'column',
      background: `linear-gradient(160deg, ${BRAND.bgSoft} 0%, ${BRAND.bg} 40%, ${BRAND.border} 100%)`,
      padding: '70px 80px', fontFamily: 'Inter, sans-serif', position: 'relative',
    }}>
      {/* Top bar: brand + tag */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div style={{ display: 'flex', fontSize: '22px', fontWeight: 700, color: BRAND.primary, letterSpacing: '2.5px' }}>
          APEX HEALTH IA
        </div>
        {tag && (
          <div style={{
            display: 'flex', padding: '8px 20px', background: BRAND.primary, borderRadius: '20px',
            fontSize: '16px', fontWeight: 600, color: '#ffffff', letterSpacing: '0.5px',
          }}>
            {tag}
          </div>
        )}
      </div>

      {/* Accent line */}
      <div style={{ display: 'flex', width: '80px', height: '4px', background: BRAND.primary, borderRadius: '2px', marginBottom: '50px' }} />

      {/* Main content area - centered */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
        {/* Headline */}
        <div style={{
          display: 'flex', fontSize: headline.length > 80 ? '40px' : headline.length > 50 ? '46px' : '52px',
          fontWeight: 800, color: BRAND.text, lineHeight: 1.2, marginBottom: '30px', maxWidth: '920px',
        }}>
          {headline}
        </div>

        {/* Subtitle / teaser */}
        {subtitle && (
          <div style={{
            display: 'flex', fontSize: '24px', color: BRAND.textLight, lineHeight: 1.55,
            maxWidth: '800px', borderLeft: `4px solid ${BRAND.accent}`, paddingLeft: '20px',
          }}>
            {subtitle}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', fontSize: '18px', color: BRAND.textMuted }}>
          @apexhealthia
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', color: BRAND.primary, fontWeight: 600 }}>
          Deslize para ler →
        </div>
      </div>

      {/* Source attribution */}
      {source && (
        <div style={{
          display: 'flex', position: 'absolute', bottom: '30px', left: '80px', right: '80px',
          fontSize: '14px', color: BRAND.textMuted, borderTop: `1px solid ${BRAND.border}`, paddingTop: '12px',
        }}>
          Fonte: {source}
        </div>
      )}
    </div>
  );
}

// ── CONTENT SLIDE (rich) ──
function ContentSlide({ slideNumber, totalSlides, title, intro, bullets, highlight }: {
  slideNumber: number;
  totalSlides: number;
  title: string;
  intro?: string;
  bullets: string[];
  highlight?: string;
}) {
  const hasManyBullets = bullets.length >= 4;
  const bulletFontSize = hasManyBullets ? '22px' : '24px';
  const bulletGap = hasManyBullets ? '16px' : '20px';

  return (
    <div style={{
      width: '1080px', height: '1080px', display: 'flex', flexDirection: 'column',
      background: BRAND.bg, padding: '60px 70px', fontFamily: 'Inter, sans-serif',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'flex', fontSize: '18px', fontWeight: 700, color: BRAND.primary, letterSpacing: '2px' }}>
          APEX HEALTH IA
        </div>
        <div style={{ display: 'flex', fontSize: '16px', color: BRAND.textMuted }}>
          {slideNumber}/{totalSlides}
        </div>
      </div>

      {/* Accent line */}
      <div style={{ display: 'flex', width: '60px', height: '3px', background: BRAND.primary, borderRadius: '2px', marginBottom: '24px' }} />

      {/* Title */}
      <div style={{
        display: 'flex', fontSize: title.length > 45 ? '32px' : '36px',
        fontWeight: 800, color: BRAND.text, lineHeight: 1.2, marginBottom: intro ? '16px' : '24px',
      }}>
        {title}
      </div>

      {/* Intro paragraph */}
      {intro && (
        <div style={{
          display: 'flex', fontSize: '20px', color: BRAND.textLight, lineHeight: 1.5,
          marginBottom: '24px', paddingBottom: '20px', borderBottom: `1px solid ${BRAND.border}`,
        }}>
          {intro}
        </div>
      )}

      {/* Highlight box (optional stat/fact) */}
      {highlight && (
        <div style={{
          display: 'flex', padding: '16px 24px', background: BRAND.highlight, borderRadius: '12px',
          marginBottom: '24px', fontSize: '20px', fontWeight: 700, color: BRAND.highlightText, lineHeight: 1.4,
        }}>
          {highlight}
        </div>
      )}

      {/* Bullets */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: bulletGap, flex: 1 }}>
        {bullets.map((bullet, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '28px', height: '28px', borderRadius: '50%',
              background: BRAND.bgSoft, border: `2px solid ${BRAND.primary}`,
              fontSize: '14px', fontWeight: 700, color: BRAND.primary, flexShrink: 0, marginTop: '2px',
            }}>
              {i + 1}
            </div>
            <div style={{
              display: 'flex', fontSize: bulletFontSize, color: BRAND.text, lineHeight: 1.5, flex: 1,
            }}>
              {bullet}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', fontSize: '16px', color: BRAND.textMuted, marginTop: '16px' }}>
        @apexhealthia
      </div>
    </div>
  );
}

// ── STAT SLIDE (key number highlight) ──
function StatSlide({ slideNumber, totalSlides, statValue, statLabel, description, source }: {
  slideNumber: number;
  totalSlides: number;
  statValue: string;
  statLabel: string;
  description?: string;
  source?: string;
}) {
  return (
    <div style={{
      width: '1080px', height: '1080px', display: 'flex', flexDirection: 'column',
      background: `linear-gradient(160deg, ${BRAND.bgSoft} 0%, ${BRAND.bg} 100%)`,
      padding: '60px 70px', fontFamily: 'Inter, sans-serif',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'flex', fontSize: '18px', fontWeight: 700, color: BRAND.primary, letterSpacing: '2px' }}>
          APEX HEALTH IA
        </div>
        <div style={{ display: 'flex', fontSize: '16px', color: BRAND.textMuted }}>
          {slideNumber}/{totalSlides}
        </div>
      </div>

      <div style={{ display: 'flex', width: '60px', height: '3px', background: BRAND.primary, borderRadius: '2px', marginBottom: '40px' }} />

      {/* Centered stat */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          display: 'flex', fontSize: '96px', fontWeight: 800, color: BRAND.primary, lineHeight: 1, marginBottom: '16px',
        }}>
          {statValue}
        </div>
        <div style={{
          display: 'flex', fontSize: '32px', fontWeight: 700, color: BRAND.text, textAlign: 'center',
          lineHeight: 1.3, marginBottom: '30px', maxWidth: '800px',
        }}>
          {statLabel}
        </div>
        {description && (
          <div style={{
            display: 'flex', fontSize: '22px', color: BRAND.textLight, textAlign: 'center',
            lineHeight: 1.5, maxWidth: '700px', padding: '24px 30px',
            background: BRAND.bgWarm, borderRadius: '16px', border: `1px solid ${BRAND.border}`,
          }}>
            {description}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', fontSize: '16px', color: BRAND.textMuted }}>@apexhealthia</div>
        {source && <div style={{ display: 'flex', fontSize: '14px', color: BRAND.textMuted }}>Fonte: {source}</div>}
      </div>
    </div>
  );
}

// ── CTA SLIDE ──
function CtaSlide({ headline, body, bullets }: {
  headline: string;
  body?: string;
  bullets?: string[];
}) {
  return (
    <div style={{
      width: '1080px', height: '1080px', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: `linear-gradient(160deg, ${BRAND.darker} 0%, ${BRAND.dark} 50%, #075985 100%)`,
      padding: '70px 80px', fontFamily: 'Inter, sans-serif',
    }}>
      {/* Brand */}
      <div style={{
        display: 'flex', fontSize: '22px', fontWeight: 700, color: BRAND.accent,
        letterSpacing: '3px', marginBottom: '40px',
      }}>
        APEX HEALTH IA
      </div>

      {/* Headline */}
      <div style={{
        display: 'flex', fontSize: headline.length > 60 ? '38px' : '44px',
        fontWeight: 800, color: '#ffffff', textAlign: 'center', lineHeight: 1.25,
        maxWidth: '850px', marginBottom: '24px',
      }}>
        {headline}
      </div>

      {/* Body */}
      {body && (
        <div style={{
          display: 'flex', fontSize: '22px', color: '#bae6fd', textAlign: 'center',
          lineHeight: 1.5, maxWidth: '750px', marginBottom: '30px',
        }}>
          {body}
        </div>
      )}

      {/* Key takeaways */}
      {bullets && bullets.length > 0 && (
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '12px',
          marginBottom: '36px', width: '100%', maxWidth: '700px',
        }}>
          {bullets.map((b, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '12px 20px', background: 'rgba(255,255,255,0.08)', borderRadius: '10px',
            }}>
              <div style={{ display: 'flex', fontSize: '18px', color: BRAND.accent }}>✓</div>
              <div style={{ display: 'flex', fontSize: '19px', color: '#e0f2fe', lineHeight: 1.4 }}>{b}</div>
            </div>
          ))}
        </div>
      )}

      {/* CTA buttons */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <div style={{
          display: 'flex', padding: '16px 40px', background: BRAND.primary, borderRadius: '50px',
          fontSize: '22px', fontWeight: 700, color: '#ffffff',
        }}>
          Siga @apexhealthia
        </div>
      </div>

      {/* Bottom text */}
      <div style={{
        display: 'flex', fontSize: '18px', color: '#7dd3fc', marginTop: '30px', textAlign: 'center',
      }}>
        Salve este post · Compartilhe com quem precisa saber
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

    const decoded = decodeBase64UTF8(dataParam);
    const slideData = JSON.parse(decoded);

    const {
      type = 'content',
      headline = '',
      subtitle = '',
      tag = '',
      source = '',
      title = '',
      intro = '',
      bullets = [],
      highlight = '',
      body = '',
      statValue = '',
      statLabel = '',
      description = '',
      slideNumber = 1,
      totalSlides = 5,
    } = slideData;

    let element;

    switch (type) {
      case 'cover':
        element = <CoverSlide headline={headline} subtitle={subtitle} tag={tag} source={source} />;
        break;
      case 'stat':
        element = <StatSlide slideNumber={slideNumber} totalSlides={totalSlides}
          statValue={statValue} statLabel={statLabel} description={description} source={source} />;
        break;
      case 'cta':
        element = <CtaSlide headline={headline} body={body} bullets={Array.isArray(bullets) ? bullets : []} />;
        break;
      case 'content':
      default:
        element = <ContentSlide
          slideNumber={slideNumber} totalSlides={totalSlides}
          title={title || headline}
          intro={intro}
          bullets={Array.isArray(bullets) ? bullets : [bullets]}
          highlight={highlight}
        />;
        break;
    }

    return new ImageResponse(element, { width: 1080, height: 1080 });
  } catch (e: any) {
    return new Response(`Error generating slide: ${e.message}`, { status: 500 });
  }
}
