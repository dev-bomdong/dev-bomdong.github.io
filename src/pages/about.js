import React from 'react';
import Layout from '../layout';
import Seo from '../components/seo';
import './style.scss';

const IconGitHub = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const IconLinkedIn = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const IconMail = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m2 7 10 7 10-7"/>
  </svg>
);

const contacts = [
  { key: 'github', label: 'GitHub', icon: <IconGitHub />, href: 'https://github.com/dev-bomdong', external: true },
  { key: 'linkedin', label: 'LinkedIn', icon: <IconLinkedIn />, href: 'https://www.linkedin.com/in/donghee-kim-38b684221', external: true },
  { key: 'email', label: 'dongdh02076@gmail.com', icon: <IconMail />, href: 'mailto:dongdh02076@gmail.com', external: false },
];

const career = [
  {
    period: '2026.01 — present',
    duration: '4개월',
    company: 'Shopl & Company',
    role: 'Product Manager',
    bullets: [],
  },
  {
    period: '2022.08 — 2025.12',
    duration: '3년 4개월',
    company: 'Shopl & Company',
    role: 'Frontend Engineer',
    bullets: [
      '현장직 인사 관리 및 협업을 지원하는 B2B SaaS 서비스(SHOPL) 프론트엔드 개발',
      '현장 시설 디지털 관리 B2B SaaS 솔루션(하다) 프론트엔드 개발',
    ],
  },
  {
    period: '2021.12 — 2022.07',
    duration: '8개월',
    company: '반장창고',
    role: 'Frontend Engineer',
    bullets: [
      '인테리어 솔루션 서비스 하우스텝 영업 인력을 위한 자재 관리 어드민 개발',
    ],
  },
  {
    period: '2018.05 — 2021.07',
    duration: '3년 2개월',
    company: '김앤장 법률사무소',
    role: '비서 (비개발 직군)',
    bullets: [
      '법률 프로젝트 데이터 관리 및 업무 흐름 파악, 국·영문 문서 작성',
      '잦은 일정 변경을 관련 부서와 신속히 소통하며 시간에 민감한 법률 업무 원활화 기여',
    ],
  },
];

function AboutPage() {
  return (
    <Layout>
      <Seo title="About — Donghee Kim" />
      <div className="home-wrap">
        <div className="about-hero">
          <p className="about-hero__name">Donghee Kim</p>
        </div>

        <div className="about-section">
          <p className="about-section__title">Experience</p>
          <div className="about-career">
            {career.map((c) => (
              <div key={`${c.company}-${c.role}`} className="about-career-row">
                <div className="about-career-row__left">
                  <span className="about-career-row__period">{c.period}</span>
                  <span className="about-career-row__duration">({c.duration})</span>
                </div>
                <div className="about-career-row__info">
                  <span className="about-career-row__company">{c.company}</span>
                  <span className="about-career-row__role">{c.role}</span>
                  {c.bullets.length > 0 && (
                    <ul className="about-career-row__bullets">
                      {c.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="about-section">
          <p className="about-section__title">Contacts</p>
          <div className="about-contacts">
            {contacts.map((c) => (
              <a
                key={c.key}
                href={c.href}
                className="about-contact-row"
                aria-label={c.label}
                {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span className="about-contact-row__icon">{c.icon}</span>
                <span className="about-contact-row__label">{c.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AboutPage;
