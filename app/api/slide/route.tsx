import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

const BRAND = {
  primary: '#0ea5e9',
  dark: '#0c4a6e',
  text: '#1e293b',
  textLight: '#64748b',
  textMuted: '#94a3b8',
  bg: '#ffffff',
  bgSoft: '#f0f9ff',
  accent: '#38bdf8',
  border: '#e0f2fe',
};

function CoverSlide({ headline, subtitle }: { headline: string; subtitle?: string }) {
  return (
    <div style={{ width: '1080px', height: '1080px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(145deg, #f0f9ff 0%, #ffffff 50%, #e0f2fe 100%)', padding: '80px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', width: '120px', height: '4px', background: '#0ea5e9', borderRadius: '2px', marginBottom: '50px' }} />
      <div style={{ display: 'flex', fontSize: '26px', fontWeight: 700, color: '#0ea5e9', letterSpacing: '3px', marginBottom: '50px' }}>APEX HEALTH IA</div>
      <div style={{ display: 'flex', fontSize: headline.length > 60 ? '44px' : '52px', fontWeight: 800, color: '#1e293b', textAlign: 'center', lineHeight: 1.25, maxWidth: '900px' }}>{headline}</div>
      {subtitle && <div style={{ display: 'flex', fontSize: '24px', color: '#64748b', textAlign: 'center', marginTop: '30px', lineHeight: 1.5, maxWidth: '750px' }}>{subtitle}</div>}
      <div style={{ display: 'flex', position: 'absolute', bottom: '60px', fontSize: '20px', color: '#94a3b8' }}>@apexhealthia</div>
    </div>
  );
}

function ContentSlide({ slideNumber, totalSlides, title, bullets }: { slideNumber: number; totalSlides: number; title: string; bullets: string[] }) {
  return (
    <div style={{ width: '1080px', height: '1080px', display: 'flex', flexDirection: 'column', background: '#ffffff', padding: '70px 80px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'flex', fontSize: '20px', fontWeight: 700, color: '#0ea5e9', letterSpacing: '2px' }}>APEX HEALTH IA</div>
        <div style={{ display: 'flex', fontSize: '18px', color: '#94a3b8' }}>{slideNumber}/{totalSlides}</div>
      </div>
      <div style={{ display: 'flex', width: '80px', height: '4px', background: '#0ea5e9', borderRadius: '2px', marginBottom: '30px' }} />
      <div style={{ display: 'flex', fontSize: title.length > 40 ? '36px' : '42px', fontWeight: 800, color: '#1e293b', lineHeight: 1.25, marginBottom: '40px' }}>{title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1 }}>
        {bullets.map((bullet, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <div style={{ display: 'flex', width: '8px', height: '8px', borderRadius: '50%', background: '#0ea5e9', marginTop: '12px', flexShrink: 0 }} />
            <div style={{ display: 'flex', fontSize: '26px', color: '#1e293b', lineHeight: 1.55 }}>{bullet}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', fontSize: '18px', color: '#94a3b8', marginTop: '20px' }}>@apexhealthia</div>
    </div>
  );
}

function CtaSlide({ headline, body }: { headline: string; body?: string }) {
  return (
    <div style={{ width: '1080px', height: '1080px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(145deg, #0c4a6e 0%, #075985 100%)', padding: '80px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', fontSize: '24px', fontWeight: 700, color: '#38bdf8', letterSpacing: '3px', marginBottom: '50px' }}>APEX HEALTH IA</div>
      <div style={{ display: 'flex', fontSize: '48px', fontWeight: 800, color: '#ffffff', textAlign: 'center', lineHeight: 1.3, maxWidth: '850px', marginBottom: '30px' }}>{headline}</div>
      {body && <div style={{ display: 'flex', fontSize: '24px', color: '#bae6fd', textAlign: 'center', lineHeight: 1.5, maxWidth: '700px', marginBottom: '40px' }}>{body}</div>}
      <div style={{ display: 'flex', padding: '18px 50px', background: '#0ea5e9', borderRadius: '50px', fontSize: '24px', fontWeight: 700, color: '#ffffff' }}>Siga @apexhealthia</div>
    </div>
  );
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const dataParam = searchParams.get('data');
    if (!dataParam) {
      return new Response('Missing data param. Use ?data=base64json', { status: 400 });
    }
    const decoded = atob(dataParam);
    const slideData = JSON.parse(decoded);
    const { type = 'content', headline = '', subtitle = '', title = '', bullets = [], body = '', slideNumber = 1, totalSlides = 5 } = slideData;
    let element;
    switch (type) {
      case 'cover': element = <CoverSlide headline={headline} subtitle={subtitle} />; break;
      case 'cta': element = <CtaSlide headline={headline} body={body} />; break;
      default: element = <ContentSlide slideNumber={slideNumber} totalSlides={totalSlides} title={title || headline} bullets={Array.isArray(bullets) ? bullets : [bullets]} />; break;
    }
    return new ImageResponse(element, { width: 1080, height: 1080 });
  } catch (e: any) {
    return new Response('Error: ' + e.message, { status: 500 });
  }
}
