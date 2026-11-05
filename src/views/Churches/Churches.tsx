'use client';
import { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import Image from 'next/image';
import Page from '@/components/Page/Page';
import PageBanner from '@/components/Page/Components/PageBanner';
import PageTitle from '@/components/Page/Components/PageTitle';
import { Eyebrow } from '@/components/Page/Components/SectionHeading';
import ContactLinks from '@/components/ContactLinks/ContactLinks';
import { churches, churchSlug } from '@/config/churches';
import { churchInfo } from '@/config/church';
import { sundayServicesInOrder } from '@/views/Home/Components/HeroSection';
import { directionsUrl } from '@/views/Home/Components/AboutPreview';
import { gold, wineShadow } from '@/theme/tokens';
import type { SisterChurch } from '@/types';

const ALL = 'All';

const contactOf = (church: SisterChurch) => ({
  phone: church.contact?.phone ?? church.pastorPhone,
  whatsapp: church.contact?.whatsapp ?? church.pastorWhatsapp,
  email: church.contact?.email,
  facebook: church.contact?.facebook,
  instagram: church.contact?.instagram,
  youtube: church.contact?.youtube,
  website: church.contact?.website,
});

function MainChurchCard({ church }: { church: SisterChurch }) {
  const sundays = sundayServicesInOrder(churchInfo.services);
  const phone = church.pastorPhone ?? church.contact?.phone;

  return (
    <Box
      id={churchSlug(church.location)}
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1.1fr 1fr' },
        borderRadius: '28px',
        overflow: 'hidden',
        backgroundColor: 'background.paper',
        boxShadow: wineShadow,
        border: '1px solid',
        borderColor: 'divider',
        scrollMarginTop: 96,
      }}
    >
      <Box sx={{ position: 'relative', minHeight: { xs: 240, md: 380 } }}>
        <Image
          src="/church-group.jpg"
          alt={`${church.location} congregation`}
          fill
          sizes="(max-width: 900px) 100vw, 640px"
          style={{ objectFit: 'cover' }}
        />
      </Box>
      <Box sx={{ p: { xs: 3, md: 5 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Eyebrow>Main church</Eyebrow>
        <Typography variant="h2" sx={{ fontSize: { xs: '2.4rem', md: '3rem' }, mb: 1.5 }}>
          {church.location}
        </Typography>
        <Typography sx={{ color: 'text.secondary', lineHeight: 1.6, mb: 2.5 }}>{churchInfo.address}</Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 3, rowGap: 1, mb: 3 }}>
          {sundays.map((s) => (
            <Typography key={s.title} sx={{ fontSize: '0.92rem' }}>
              <Box component="span" sx={{ fontWeight: 700 }}>
                {s.parsed!.start} {s.parsed!.meridiem}
              </Box>{' '}
              <Box component="span" sx={{ color: 'text.secondary' }}>
                {s.title}
              </Box>
            </Typography>
          ))}
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            py: 2,
            mb: 3,
            borderTop: '1px solid',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: 56,
              height: 56,
              borderRadius: '50%',
              overflow: 'hidden',
              flexShrink: 0,
              border: '2px solid',
              borderColor: gold,
            }}
          >
            <Image src="/leaders_photos/biju_cherian.jpg" alt={church.pastor} fill sizes="56px" style={{ objectFit: 'cover', objectPosition: 'center top' }} />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography sx={{ fontWeight: 600 }}>{church.pastor}</Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: '0.88rem' }}>Senior Pastor, overseeing every branch</Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', alignItems: 'center' }}>
          <Button href={directionsUrl} target="_blank" rel="noopener noreferrer" variant="contained" color="primary" startIcon={<NearMeOutlinedIcon />}>
            Get directions
          </Button>
          {phone && (
            <Button href={`tel:${phone.replace(/\s/g, '')}`} variant="outlined" color="primary" startIcon={<PhoneOutlinedIcon />} sx={{ borderColor: 'divider' }}>
              Call us
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}

function BranchCard({ church }: { church: SisterChurch }) {
  const slug = churchSlug(church.location);
  const town = church.location.split(',')[0].trim();
  const contact = contactOf(church);

  return (
    <Box
      component="article"
      id={slug}
      sx={{
        scrollMarginTop: 96,
        borderRadius: '22px',
        overflow: 'hidden',
        backgroundColor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 200ms ease, transform 200ms ease',
        '&:hover, &:focus-within': { boxShadow: wineShadow, transform: 'translateY(-3px)' },
        '&:target': { outline: `2px solid ${gold}`, outlineOffset: 3 },
      }}
    >
      <Box sx={{ position: 'relative', aspectRatio: '16 / 9' }}>
        <Image src={`/branch_photos/${slug}.jpg`} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 400px" style={{ objectFit: 'cover' }} />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(42, 17, 21, 0.88) 0%, rgba(42, 17, 21, 0.25) 55%, rgba(75, 30, 38, 0.15) 100%)',
          }}
        />
        <Box sx={{ position: 'absolute', left: 20, right: 20, bottom: 14, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 1 }}>
          <Typography component="h3" sx={{ color: '#FFFFFF', fontWeight: 400, fontSize: '1.75rem', letterSpacing: '-0.03em' }}>
            {town}
          </Typography>
          {church.county && (
            <Typography sx={{ color: gold, fontWeight: 600, fontSize: '0.8rem', textAlign: 'right' }}>{church.county}</Typography>
          )}
        </Box>
      </Box>

      <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1 }}>
        <Box>
          <Typography sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>Pastor</Typography>
          <Typography sx={{ fontWeight: 600 }}>{church.pastor || 'To be confirmed'}</Typography>
        </Box>
        <Box sx={{ mt: 'auto' }}>
          {Object.values(contact).some(Boolean) ? (
            <ContactLinks contact={contact} label={`${town} branch`} />
          ) : (
            <Typography sx={{ color: 'text.secondary', fontSize: '0.88rem' }}>
              For details, call the Manchester church on {churchInfo.phone}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default function Churches() {
  const motherChurch = churches.find((c) => c.isMotherChurch);
  const branches = useMemo(() => churches.filter((c) => !c.isMotherChurch), []);
  const counties = useMemo(
    () => [ALL, ...Array.from(new Set(branches.map((b) => b.county).filter(Boolean) as string[]))],
    [branches]
  );
  const [county, setCounty] = useState(ALL);

  // A deep link to one branch must never land on a filtered-out card.
  useEffect(() => {
    const reset = () => {
      if (window.location.hash) setCounty(ALL);
    };
    window.addEventListener('hashchange', reset);
    return () => window.removeEventListener('hashchange', reset);
  }, []);

  const visible = county === ALL ? branches : branches.filter((b) => b.county === county);

  return (
    <Page>
      <PageBanner>
        <Box sx={{ pb: { xs: 8, md: 12 } }}>
          <PageTitle
            title="A church near you"
            subtitle={`${churches.length} congregations across England and Wales. Find the one nearest you, who leads it and how to get in touch.`}
          />
        </Box>
      </PageBanner>

      <Box sx={{ backgroundColor: 'background.default', pb: { xs: 9, md: 12 } }}>
        <Container maxWidth="lg">
          {motherChurch && (
            <Box sx={{ mt: { xs: -7, md: -11 }, mb: { xs: 8, md: 11 }, position: 'relative' }}>
              <MainChurchCard church={motherChurch} />
            </Box>
          )}

          <Box
            sx={{
              display: 'flex',
              alignItems: { xs: 'flex-start', md: 'flex-end' },
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 3,
              mb: 4,
            }}
          >
            <Typography variant="h2" sx={{ fontSize: { xs: '2.3rem', md: '3rem' } }}>
              Our branches
            </Typography>
            <Box role="group" aria-label="Filter branches by county" sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {counties.map((c) => {
                const selected = c === county;
                return (
                  <Box
                    key={c}
                    component="button"
                    aria-pressed={selected}
                    onClick={() => setCounty(c)}
                    sx={{
                      font: 'inherit',
                      fontSize: '0.88rem',
                      fontWeight: 500,
                      px: 2,
                      py: 0.9,
                      borderRadius: 999,
                      cursor: 'pointer',
                      border: '1px solid',
                      borderColor: selected ? 'primary.main' : 'divider',
                      backgroundColor: selected ? 'primary.main' : 'background.paper',
                      color: selected ? 'primary.contrastText' : 'text.primary',
                      transition: 'background-color 160ms ease, border-color 160ms ease',
                      '&:hover': { borderColor: 'primary.main' },
                    }}
                  >
                    {c}
                  </Box>
                );
              })}
            </Box>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }, gap: 2.5 }}>
            {visible.map((church) => (
              <BranchCard key={church.location} church={church} />
            ))}
          </Box>
        </Container>
      </Box>
    </Page>
  );
}
