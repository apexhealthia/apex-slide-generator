import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

/* ───────── BRAND — Preto / Dourado / Branco ───────── */
const B = {
  black:      '#0A0A0A',
  darkGray:   '#141414',
  midGray:    '#1E1E1E',
  gold:       '#C9A84C',
  goldLight:  '#E8D48B',
  goldDark:   '#A68A3E',
  white:      '#FFFFFF',
  whiteOff:   '#F0ECE3',
  whiteMuted: '#B8B0A0',
  green:      '#4ADE80',
  greenDark:  '#166534',
  accent:     '#D4AF37',
};

/* ───────── HELPERS ───────── */
function decode(raw: string): Record<string, unknown> {
  try {
    const json = Buffer.from(raw, 'base64').toString('utf-8');
    return JSON.parse(json);
  } catch {
    return {};
  }
}

/* ───────── COVER SLIDE ───────── */
function CoverSlide({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div
      style={{
        width: '1080px',
        height: '1080px',
        display: 'flex',
        flexDirection: 'column',
        background: `linear-gradient(160deg, ${B.black} 0%, ${B.darkGray} 50%, ${B.midGray} 100%)`,
        padding: '0',
        position: 'relative',
        fontFamily: 'sans-serif',
      }}
    >
      {/* Top gold accent line */}
      <div style={{ display: 'flex', width: '1080px', height: '4px', background: `linear-gradient(90deg, ${B.gold}, ${B.goldLight}, ${B.gold})` }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '40px 60px 0', gap: '16px' }}>
        <div style={{
          display: 'flex',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${B.gold}, ${B.goldDark})`,
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          fontWeight: 800,
          color: B.black,
        }}>A</div>
        <span style={{ fontSize: '22px', fontWeight: 700, color: B.gold, letterSpacing: '3px', textTransform: 'uppercase' }}>
          APEX HEALTH IA
        </span>
      </div>

      {/* Main content area */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        padding: '0 60px',
        gap: '24px',
      }}>
        {/* Decorative gold bar */}
        <div style={{ display: 'flex', width: '80px', height: '4px', background: B.gold, borderRadius: '2px' }} />

        {/* Title */}
        <div style={{
          display: 'flex',
          fontSize: '58px',
          fontWeight: 800,
          color: B.white,
          lineHeight: 1.15,
          maxWidth: '900px',
        }}>
          {title}
        </div>

        {/* Subtitle */}
        <div style={{
          display: 'flex',
          fontSize: '26px',
          fontWeight: 400,
          color: B.whiteMuted,
          lineHeight: 1.5,
          maxWidth: '800px',
        }}>
          {subtitle}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 60px 40px',
      }}>
        <span style={{ fontSize: '16px', color: B.whiteMuted }}>@apexhealthia</span>
        <span style={{ fontSize: '16px', color: B.gold }}>Deslize para ler →</span>
      </div>
    </div>
  );
}
/* ───────── CONTENT SLIDE ───────── */
function ContentSlide({ title, bullets, slideNum, totalSlides }: {
  title: string; bullets: string[]; slideNum: number; totalSlides: number;
}) {
  return (
    <div
      style={{
        width: '1080px',
        height: '1080px',
        display: 'flex',
        flexDirection: 'column',
        background: B.black,
        fontFamily: 'sans-serif',
        position: 'relative',
      }}
    >
      {/* Top gold line */}
      <div style={{ display: 'flex', width: '1080px', height: '3px', background: B.gold }} />

      {/* Header row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '32px 60px 0',
      }}>
        <span style={{ fontSize: '18px', fontWeight: 700, color: B.gold, letterSpacing: '2px' }}>APEX HEALTH IA</span>
        <span style={{ fontSize: '16px', color: B.whiteMuted }}>{slideNum}/{totalSlides}</span>
      </div>

      {/* Title */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '32px 60px 0',
        gap: '12px',
      }}>
        <div style={{ display: 'flex', width: '60px', height: '3px', background: B.gold, borderRadius: '2px' }} />
        <div style={{
          display: 'flex',
          fontSize: '42px',
          fontWeight: 800,
          color: B.white,
          lineHeight: 1.2,
        }}>
          {title}
        </div>
      </div>

      {/* Bullets */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '36px 60px',
        gap: '20px',
        flex: 1,
      }}>
        {bullets.map((b, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '20px',
              background: B.darkGray,
              borderRadius: '16px',
              padding: '24px 28px',
              borderLeft: `4px solid ${B.gold}`,
            }}
          >
            <div style={{
              display: 'flex',
              minWidth: '36px',
              height: '36px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${B.gold}, ${B.goldDark})`,
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              fontWeight: 800,
              color: B.black,
            }}>
              {i + 1}
            </div>
            <div style={{
              display: 'flex',
              fontSize: '24px',
              fontWeight: 500,
              color: B.whiteOff,
              lineHeight: 1.45,
              flex: 1,
            }}>
              {b}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        display: 'flex',
        padding: '0 60px 32px',
        justifyContent: 'flex-end',
      }}>
        <span style={{ fontSize: '14px', color: B.whiteMuted }}>@apexhealthia</span>
      </div>
    </div>
  );
}
/* ───────── STAT SLIDE ───────── */
function StatSlide({ value, label, source, slideNum, totalSlides }: {
  value: string; label: string; source: string; slideNum: number; totalSlides: number;
}) {
  return (
    <div
      style={{
        width: '1080px',
        height: '1080px',
        display: 'flex',
        flexDirection: 'column',
        background: `linear-gradient(170deg, ${B.black} 0%, ${B.darkGray} 100%)`,
        fontFamily: 'sans-serif',
        position: 'relative',
      }}
    >
      {/* Top gold line */}
      <div style={{ display: 'flex', width: '1080px', height: '3px', background: B.gold }} />

      {/* Header row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '32px 60px 0',
      }}>
        <span style={{ fontSize: '18px', fontWeight: 700, color: B.gold, letterSpacing: '2px' }}>APEX HEALTH IA</span>
        <span style={{ fontSize: '16px', color: B.whiteMuted }}>{slideNum}/{totalSlides}</span>
      </div>

      {/* Center stat */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        padding: '0 60px',
      }}>
        {/* Gold decorative element */}
        <div style={{
          display: 'flex',
          width: '100px',
          height: '3px',
          background: `linear-gradient(90deg, transparent, ${B.gold}, transparent)`,
        }} />

        {/* The big number */}
        <div style={{
          display: 'flex',
          fontSize: '120px',
          fontWeight: 900,
          background: `linear-gradient(135deg, ${B.gold} 0%, ${B.goldLight} 50%, ${B.gold} 100%)`,
          backgroundClip: 'text',
          color: 'transparent',
          lineHeight: 1,
        }}>
          {value}
        </div>

        {/* Label */}
        <div style={{
          display: 'flex',
          fontSize: '32px',
          fontWeight: 600,
          color: B.white,
          textAlign: 'center',
          lineHeight: 1.35,
          maxWidth: '700px',
          justifyContent: 'center',
        }}>
          {label}
        </div>

        {/* Source */}
        {source && (
          <div style={{
            display: 'flex',
            fontSize: '16px',
            color: B.whiteMuted,
            marginTop: '8px',
            padding: '8px 24px',
            borderRadius: '20px',
            border: `1px solid ${B.midGray}`,
          }}>
            Fonte: {source}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        display: 'flex',
        padding: '0 60px 32px',
        justifyContent: 'flex-end',
      }}>
        <span style={{ fontSize: '14px', color: B.whiteMuted }}>@apexhealthia</span>
      </div>
    </div>
  );
}
/* ───────── CTA SLIDE ───────── */
function CtaSlide({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div
      style={{
        width: '1080px',
        height: '1080px',
        display: 'flex',
        flexDirection: 'column',
        background: `linear-gradient(160deg, ${B.black} 0%, ${B.darkGray} 40%, ${B.black} 100%)`,
        fontFamily: 'sans-serif',
        position: 'relative',
      }}
    >
      {/* Top gold line */}
      <div style={{ display: 'flex', width: '1080px', height: '4px', background: `linear-gradient(90deg, ${B.gold}, ${B.goldLight}, ${B.gold})` }} />

      {/* Center content */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: '32px',
        padding: '0 80px',
      }}>
        {/* Gold logo circle */}
        <div style={{
          display: 'flex',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${B.gold}, ${B.goldDark})`,
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '36px',
          fontWeight: 900,
          color: B.black,
        }}>A</div>

        <span style={{ fontSize: '20px', fontWeight: 700, color: B.gold, letterSpacing: '4px' }}>APEX HEALTH IA</span>

        {/* Title */}
        <div style={{
          display: 'flex',
          fontSize: '48px',
          fontWeight: 800,
          color: B.white,
          textAlign: 'center',
          lineHeight: 1.25,
          justifyContent: 'center',
        }}>
          {title || 'Quer dominar a IA na sa\u00fade?'}
        </div>

        {/* Subtitle */}
        <div style={{
          display: 'flex',
          fontSize: '24px',
          color: B.whiteMuted,
          textAlign: 'center',
          lineHeight: 1.5,
          justifyContent: 'center',
        }}>
          {subtitle || 'Siga para receber conte\u00fado exclusivo sobre ferramentas e tend\u00eancias.'}
        </div>

        {/* CTA Button */}
        <div style={{
          display: 'flex',
          padding: '20px 56px',
          borderRadius: '50px',
          background: `linear-gradient(135deg, ${B.gold}, ${B.goldDark})`,
          fontSize: '24px',
          fontWeight: 800,
          color: B.black,
          marginTop: '8px',
        }}>
          Siga @apexhealthia
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ display: 'flex', width: '1080px', height: '4px', background: `linear-gradient(90deg, ${B.gold}, ${B.goldLight}, ${B.gold})` }} />
    </div>
  );
}
/* ───────── STORY SLIDE (9:16) ───────── */
function StorySlide({ title, highlight, source }: {
  title: string; highlight: string; source?: string;
}) {
  return (
    <div
      style={{
        width: '1080px',
        height: '1920px',
        display: 'flex',
        flexDirection: 'column',
        background: `linear-gradient(180deg, ${B.black} 0%, ${B.darkGray} 50%, ${B.black} 100%)`,
        fontFamily: 'sans-serif',
        position: 'relative',
      }}
    >
      {/* Top gold line */}
      <div style={{ display: 'flex', width: '1080px', height: '4px', background: B.gold }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '60px 60px 0', gap: '16px' }}>
        <div style={{
          display: 'flex',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${B.gold}, ${B.goldDark})`,
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          fontWeight: 800,
          color: B.black,
        }}>A</div>
        <span style={{ fontSize: '22px', fontWeight: 700, color: B.gold, letterSpacing: '3px' }}>APEX HEALTH IA</span>
      </div>

      {/* Center content */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 60px',
        gap: '40px',
      }}>
        <div style={{ display: 'flex', width: '80px', height: '3px', background: B.gold }} />

        {/* Title */}
        <div style={{
          display: 'flex',
          fontSize: '52px',
          fontWeight: 800,
          color: B.white,
          textAlign: 'center',
          lineHeight: 1.25,
          justifyContent: 'center',
          maxWidth: '900px',
        }}>
          {title}
        </div>

        {/* Highlight box */}
        <div style={{
          display: 'flex',
          background: B.darkGray,
          borderRadius: '20px',
          borderLeft: `5px solid ${B.gold}`,
          padding: '36px 40px',
          maxWidth: '900px',
        }}>
          <div style={{
            display: 'flex',
            fontSize: '28px',
            fontWeight: 500,
            color: B.whiteOff,
            lineHeight: 1.5,
          }}>
            {highlight}
          </div>
        </div>

        {source && (
          <div style={{
            display: 'flex',
            fontSize: '18px',
            color: B.whiteMuted,
          }}>
            Fonte: {source}
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 60px 80px',
        gap: '16px',
      }}>
        <div style={{
          display: 'flex',
          padding: '16px 48px',
          borderRadius: '50px',
          background: `linear-gradient(135deg, ${B.gold}, ${B.goldDark})`,
          fontSize: '22px',
          fontWeight: 800,
          color: B.black,
        }}>
          Veja o carrossel completo ↑
        </div>
        <span style={{ fontSize: '16px', color: B.whiteMuted }}>@apexhealthia</span>
      </div>
    </div>
  );
}
/* ───────── ROUTE HANDLER ───────── */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const raw = searchParams.get('d') ?? '';
  const data = decode(raw);

  const slideType = (data.type as string) ?? 'cover';

  /* Determine dimensions based on slide type */
  const isStory = slideType === 'story';
  const width = 1080;
  const height = isStory ? 1920 : 1080;

  let element: JSX.Element;

  switch (slideType) {
    case 'cover':
      element = (
        <CoverSlide
          title={(data.title as string) ?? 'T\u00edtulo do Post'}
          subtitle={(data.subtitle as string) ?? 'Subt\u00edtulo'}
        />
      );
      break;

    case 'content':
      element = (
        <ContentSlide
          title={(data.title as string) ?? 'Conte\u00fado'}
          bullets={
            Array.isArray(data.bullets)
              ? (data.bullets as string[])
              : [(data.bullets as string) ?? 'Item 1']
          }
          slideNum={(data.slideNum as number) ?? 2}
          totalSlides={(data.totalSlides as number) ?? 7}
        />
      );
      break;

    case 'stat':
      element = (
        <StatSlide
          value={(data.value as string) ?? '0%'}
          label={(data.label as string) ?? 'Estat\u00edstica'}
          source={(data.source as string) ?? ''}
          slideNum={(data.slideNum as number) ?? 3}
          totalSlides={(data.totalSlides as number) ?? 7}
        />
      );
      break;

    case 'cta':
      element = (
        <CtaSlide
          title={(data.title as string) ?? ''}
          subtitle={(data.subtitle as string) ?? ''}
        />
      );
      break;

    case 'story':
      element = (
        <StorySlide
          title={(data.title as string) ?? 'Novo Post'}
          highlight={(data.highlight as string) ?? 'Confira o carrossel completo!'}
          source={data.source as string}
        />
      );
      break;

    default:
      element = (
        <CoverSlide title="Apex Health IA" subtitle="Conte\u00fado indispon\u00edvel" />
      );
  }

  return new ImageResponse(element, { width, height });
}
