import { useEffect, useState } from 'react';
import { organizationService } from '../../services/organizationService';
import { OrganizationStructure, AnggotaJurnal, Division } from '../../types';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const LINE = '#2D336B';

function Line({ h = 32 }: { h?: number }) {
  return (
    <div className="flex justify-center">
      <svg width="2" height={h} viewBox={`0 0 2 ${h}`}>
        <line x1="1" y1="0" x2="1" y2={h} stroke={LINE} strokeWidth="2" strokeOpacity="0.25" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function LevelCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="w-full border border-[#2D336B]/10 rounded-2xl px-8 py-7 bg-white/50">
      <div className="text-[10px] uppercase tracking-[0.2em] text-[#2D336B]/70 font-semibold text-center mb-5">{label}</div>
      <div className="flex justify-center gap-6 md:gap-10 flex-wrap">{children}</div>
    </div>
  );
}

function MemberCard({ member, size = 'md', onPhotoClick, showPosition = true, badge }: { member: AnggotaJurnal; size?: 'sm' | 'md' | 'lg'; onPhotoClick?: (m: AnggotaJurnal) => void; showPosition?: boolean; badge?: string }) {
  const imgSize = size === 'lg' ? 'w-20 h-20' : size === 'sm' ? 'w-12 h-12' : 'w-14 h-14';
  const imgRing = size === 'lg' ? 'ring-[3px] ring-[#2D336B]/15' : 'ring-[2px] ring-[#2D336B]/10';
  const textSize = size === 'lg' ? 'text-sm' : size === 'sm' ? 'text-[11px]' : 'text-xs';

  return (
    <div className="flex flex-col items-center gap-2">
      <button onClick={() => onPhotoClick?.(member)} className={`${imgSize} rounded-full overflow-hidden ${imgRing} shadow-lg transition-all duration-300 hover:ring-[#F4A261]/40 hover:scale-110 bg-white cursor-pointer focus:outline-none`}>
        <img src={member.photo || '/images/default-avatar.svg'} alt={member.full_name} className="w-full h-full object-cover" />
      </button>
      <div className="text-center max-w-[130px]">
        <p className={`font-semibold text-[#2D336B] leading-tight ${textSize}`}>{member.full_name}</p>
        {(showPosition || badge) && (
          <span className="inline-block px-3 py-0.5 rounded-full text-[10px] font-semibold mt-1.5 border leading-tight"
            style={{
              background: badge === 'Ketua Divisi' ? 'rgba(243, 162, 97, 0.15)' : 'rgba(45, 51, 107, 0.08)',
              color: badge === 'Ketua Divisi' ? '#C17C3A' : '#2D336B',
              borderColor: badge === 'Ketua Divisi' ? 'rgba(193, 124, 58, 0.3)' : 'rgba(45, 51, 107, 0.15)',
            }}
          >{badge || member.position}</span>
        )}
      </div>
    </div>
  );
}

function TBar({ down = true }: { down?: boolean }) {
  return (
    <div className="flex justify-center">
      <svg width="280" height="32" viewBox="0 0 280 32" className="overflow-visible">
        {down ? (
          <>
            <line x1="140" y1="0" x2="140" y2="20" stroke="#2D336B" strokeWidth="2" strokeOpacity="0.25" strokeLinecap="round" />
            <line x1="70" y1="20" x2="210" y2="20" stroke="#2D336B" strokeWidth="2" strokeOpacity="0.25" strokeLinecap="round" />
            <line x1="70" y1="20" x2="70" y2="32" stroke="#2D336B" strokeWidth="2" strokeOpacity="0.25" strokeLinecap="round" />
            <line x1="210" y1="20" x2="210" y2="32" stroke="#2D336B" strokeWidth="2" strokeOpacity="0.25" strokeLinecap="round" />
          </>
        ) : (
          <>
            <line x1="70" y1="0" x2="70" y2="10" stroke="#2D336B" strokeWidth="2" strokeOpacity="0.25" strokeLinecap="round" />
            <line x1="210" y1="0" x2="210" y2="10" stroke="#2D336B" strokeWidth="2" strokeOpacity="0.25" strokeLinecap="round" />
            <line x1="70" y1="10" x2="210" y2="10" stroke="#2D336B" strokeWidth="2" strokeOpacity="0.25" strokeLinecap="round" />
            <line x1="140" y1="10" x2="140" y2="32" stroke="#2D336B" strokeWidth="2" strokeOpacity="0.25" strokeLinecap="round" />
          </>
        )}
      </svg>
    </div>
  );
}

function DivGroup({ division, onPhotoClick }: { division: Division & { anggota_jurnals: AnggotaJurnal[] }; onPhotoClick?: (m: AnggotaJurnal) => void }) {
  const head = division.anggota_jurnals.find(a =>
    a.position === `Ketua divisi ${division.name.toLowerCase()}` ||
    a.position === `Ketua divisi ${division.slug}`
  );
  const members = division.anggota_jurnals.filter(a => a.id !== head?.id);

  return (
    <div className="min-w-[180px] bg-white border border-[#2D336B]/15 rounded-xl shadow-sm overflow-hidden">
      <div className="px-5 pt-3 text-center">
        <div className="text-[9px] uppercase tracking-[0.15em] text-[#2D336B]/60 font-semibold mb-1">{division.name}</div>
      </div>
      <div className="px-5 pb-3 text-center">
        {head && <MemberCard member={head} size="md" onPhotoClick={onPhotoClick} badge="Ketua Divisi" />}
        {!head && <p className="text-[#2D336B]/50 text-xs">-</p>}
      </div>
      {members.length > 0 && (
        <div className="mx-3 mb-3 bg-[#2D336B]/5 border border-[#2D336B]/8 rounded-lg px-4 pt-2 pb-3">
          <div className="text-[9px] uppercase tracking-[0.15em] text-[#2D336B]/60 font-semibold text-center mb-2">Anggota</div>
          <div className="flex flex-col items-center gap-3">
            {members.map(m => (
              <div key={m.id} className="w-full bg-white border border-[#2D336B]/8 rounded-lg px-3 py-2.5 shadow-sm">
                <MemberCard member={m} size="sm" onPhotoClick={onPhotoClick} showPosition={false} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function OrganizationPage() {
  const [data, setData] = useState<OrganizationStructure | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [preview, setPreview] = useState<AnggotaJurnal | null>(null);

  useEffect(() => {
    organizationService.getStructure()
      .then(setData)
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    document.body.style.overflow = preview ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [preview]);

  if (isLoading) return <div className="container-custom py-24 text-center"><LoadingSpinner size="lg" /></div>;
  if (!data) return null;

  const ketua = data.leaders.filter(l => l.position === 'Ketua');
  const wakil = data.leaders.filter(l => l.position === 'Wakil');
  const sekretaris = data.leaders.filter(l => l.position.startsWith('Sekretaris'));
  const bendahara = data.leaders.filter(l => l.position.startsWith('Bendahara'));
  const secondRow = [...sekretaris, ...bendahara];

  return (
    <div className="container-custom py-24">
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-8 bg-secondary rounded-full" />
          <h1 className="font-display text-section text-text">Kepengurusan Jurnalistik</h1>
        </div>
        <p className="text-muted mb-10 ml-4">Ekstrakurikuler Jurnalistik SMKN 2 Karanganyar</p>
      </div>

      <div className="max-w-7xl mx-auto bg-white rounded-[2rem] shadow-lg shadow-[#2D336B]/5 border border-[#2D336B]/5 p-8 md:p-12 lg:p-16">
        <div className="flex flex-col items-center">

          {ketua.length > 0 && (
            <div className="animate-fade-in max-w-xs w-full">
              <LevelCard label="Ketua">
                {ketua.map(k => <MemberCard key={k.id} member={k} size="md" onPhotoClick={setPreview} />)}
              </LevelCard>
            </div>
          )}
          {ketua.length > 0 && wakil.length > 0 && <Line h={36} />}

          {wakil.length > 0 && (
            <div className="animate-slide-up max-w-xs w-full">
              <LevelCard label="Wakil Ketua">
                {wakil.map(w => <MemberCard key={w.id} member={w} size="md" onPhotoClick={setPreview} />)}
              </LevelCard>
            </div>
          )}
          {wakil.length > 0 && secondRow.length > 0 && (
            sekretaris.length > 0 && bendahara.length > 0
              ? <TBar />
              : <Line h={36} />
          )}

          {secondRow.length > 0 && (
            <div className="w-full animate-slide-up flex justify-center gap-6">
              {sekretaris.length > 0 && (
                <div className="flex-1 max-w-[300px]">
                  <LevelCard label="Sekretaris">
                    {sekretaris.map(s => <MemberCard key={s.id} member={s} size="md" onPhotoClick={setPreview} />)}
                  </LevelCard>
                </div>
              )}
              {bendahara.length > 0 && (
                <div className="flex-1 max-w-[300px]">
                  <LevelCard label="Bendahara">
                    {bendahara.map(b => <MemberCard key={b.id} member={b} size="md" onPhotoClick={setPreview} />)}
                  </LevelCard>
                </div>
              )}
            </div>
          )}
          {(ketua.length > 0 || wakil.length > 0 || secondRow.length > 0) && data.divisions.length > 0 && (
            sekretaris.length > 0 && bendahara.length > 0
              ? <TBar down={false} />
              : <Line h={36} />
          )}

          {data.divisions.length > 0 && (
            <div className="w-full animate-slide-up">
              <LevelCard label="Divisi">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {data.divisions.map((div, i) => (
                    <div key={div.id} style={{ animationDelay: `${i * 80}ms` }}>
                      <DivGroup division={div as any} onPhotoClick={setPreview} />
                    </div>
                  ))}
                </div>
              </LevelCard>
            </div>
          )}

          {ketua.length === 0 && data.divisions.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-[#2D336B]/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#2D336B]/10">
                <svg className="w-8 h-8 text-[#2D336B]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-display text-xl text-[#2D336B] mb-2">Belum ada pengurus</h3>
              <p className="text-[#2D336B]/70 text-sm">Data kepengurusan belum diisi oleh admin.</p>
            </div>
          )}

        </div>
      </div>

      {preview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setPreview(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-fade-in"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative">
              <img src={preview.photo || '/images/default-avatar.svg'} alt={preview.full_name} className="w-full aspect-square object-cover" />
              <button
                onClick={() => setPreview(null)}
                className="absolute top-3 right-3 w-9 h-9 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 text-center">
              <h3 className="font-display text-xl text-[#2D336B] mb-1">{preview.full_name}</h3>
              <span className="inline-block px-3 py-1 bg-[#2D336B]/5 text-[#2D336B] rounded-full text-xs font-medium border border-[#2D336B]/10">{preview.position}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
