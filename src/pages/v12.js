import React, { useState, useEffect, useRef } from 'react';

import Image1 from '../images/1.JPG';
import Image2 from '../images/2.JPG';
import Image3 from '../images/3.JPG';
import Image4 from '../images/4.JPG';
import Image5 from '../images/5.JPG';
import Image6 from '../images/6.JPG';
import Image7 from '../images/7.JPG';
import Image8 from '../images/8.JPG';

const WeddingInvitation = () => {
  const [showGroomAccount, setShowGroomAccount] = useState(false);
  const [showBrideAccount, setShowBrideAccount] = useState(false);
  const [copiedId, setCopiedId] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set());

  // 스크롤 애니메이션을 위한 refs
  const sectionRefs = useRef([]);

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for fade-in animations
  useEffect(() => {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections((prev) => new Set([...prev, entry.target.id]));
        }
      });
    }, options);

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const handleCopy = async (text, id) => {
    try {
      // 최신 브라우저용 Clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // 폴백: 임시 textarea 생성하여 복사
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setCopiedId(id);
      alert(`${text} \n 복사되었습니다!`);
      setTimeout(() => setCopiedId(''), 2000);
    } catch (err) {
      console.error('복사 실패:', err);
      alert('복사 기능을 사용할 수 없습니다.');
    }
  };

  const addSectionRef = (el, index) => {
    if (el) sectionRefs.current[index] = el;
  };

  // 계좌 정보 데이터 구조화
  const groomAccounts = [
    { id: 'groom-father', label: '부: OOO', bank: 'OO은행', account: '000-0000-0000' },
    { id: 'groom-mother', label: '모: OOO', bank: 'OO은행', account: '000-0000-0000' },
    { id: 'groom', label: '신랑: 방재호', bank: 'OO은행', account: '000-0000-0000' },
  ];

  const brideAccounts = [
    { id: 'bride-father', label: '부: OOO', bank: 'OO은행', account: '000-0000-0000' },
    { id: 'bride-mother', label: '모: OOO', bank: 'OO은행', account: '000-0000-0000' },
    { id: 'bride', label: '신부: 김하정', bank: 'OO은행', account: '000-0000-0000' },
  ];

  return (
    <div className='min-h-screen' style={{ backgroundColor: '#fefefe' }}>
      <div className='max-w-md mx-auto' style={{ backgroundColor: '#fefefe' }}>
        {/* Header Section - Style 2 */}
        <header className='relative h-screen flex items-center justify-center'>
          {/* 배경 그라데이션 */}
          <div
            className='absolute inset-0'
            style={{
              background: 'linear-gradient(to bottom right, #fdf8f3, #fefefe, #f9f0e6)',
            }}
          ></div>

          {/* 중앙 콘텐츠 */}
          <div className='relative z-10 text-center px-8'>
            <div className='bg-white bg-opacity-95 px-8 py-12 rounded-2xl shadow-2xl'>
              <p
                className='text-sm tracking-wider mb-3 animate-fadeIn'
                style={{ color: '#94562f' }}
              >
                두 사람의 결혼식
              </p>
              <div
                className='w-px h-12 mx-auto mb-6 animate-expandHeight'
                style={{ backgroundColor: '#d9a77e' }}
              ></div>

              <h1
                className='text-4xl font-light mb-8 animate-fadeInUp'
                style={{ color: '#6b3e22' }}
              >
                <span className='block mb-2'>방재호</span>
                <span className='block'>김하정</span>
              </h1>

              {/* 웨딩 이미지 */}
              <div className='mb-8 overflow-hidden rounded-xl shadow-lg animate-fadeIn'>
                <div
                  className='w-72 h-72 mx-auto flex items-center justify-center'
                  style={{
                    background: 'linear-gradient(to bottom right, #f0dcc6, #f9f0e6)',
                    color: '#94562f',
                  }}
                >
                  <img src={Image2} alt='Image 1' />
                </div>
              </div>

              {/* 날짜와 장소 */}
              <div className='space-y-2 animate-fadeInUp' style={{ color: '#6b3e22' }}>
                <p className='text-lg font-light'>2025. 06. 28. SAT PM 1:00</p>
                <p className='text-sm' style={{ color: '#94562f' }}>
                  제주도에서...
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Greeting Section - Style 2 */}
        <section
          ref={(el) => addSectionRef(el, 0)}
          id='greeting'
          className={`py-24 px-8 transition-all duration-1000 ${
            visibleSections.has('greeting')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
          style={{
            background: 'linear-gradient(to bottom, #fefefe, #fdf8f3)',
          }}
        >
          <div className='text-center mb-12'>
            <p className='text-sm tracking-wider mb-3' style={{ color: '#94562f' }}>
              INVITATION
            </p>
            <div className='w-16 h-px mx-auto' style={{ backgroundColor: '#c78656' }}></div>
          </div>

          <div className='text-center mb-8'>
            <h3 className='text-lg font-light' style={{ color: '#6b3e22' }}>
              마음을 전합니다
            </h3>
          </div>

          <div
            className='text-center leading-relaxed space-y-6 max-w-sm mx-auto'
            style={{ color: '#6b3e22' }}
          >
            <p className='animate-fadeIn' style={{ animationDelay: '0.2s' }}>
              6월의 어느 멋진 날,
              <br />
              저희 두 사람이 이제 믿음과 사랑으로
              <br />한 길을 가고자 합니다.
            </p>

            <p className='animate-fadeIn' style={{ animationDelay: '0.4s' }}>
              지금까지 늘 곁에서 아껴주셨던
              <br />
              고마운 분들을 모시고
              <br />
              혼인의 예를 갖추어야 하나
              <br />
              양가 부모님과 가족들만 모시고
              <br />
              작은 결혼식을 올리게 되었습니다.
            </p>

            <p className='animate-fadeIn' style={{ animationDelay: '0.6s' }}>
              넓은 마음으로 양해 부탁드리며
              <br />
              저희 두 사람 축복하고 격려해 주시면
              <br />
              더없는 기쁨으로 간직하고
              <br />
              예쁘게 살겠습니다.
            </p>
          </div>
          <div
            className='w-px h-16 mx-auto my-12 animate-expandHeight'
            style={{ backgroundColor: '#d9a77e' }}
          ></div>

          <div
            className='text-center text-gray-700 animate-fadeIn'
            style={{ animationDelay: '0.8s', color: '#6b3e22' }}
          >
            <div className='flex justify-center items-center gap-8'>
              <div>
                <p className='text-sm mb-1' style={{ color: '#94562f' }}>
                  신랑측
                </p>
                <p>
                  방호준 · 김경희의 장남 <span className='font-medium'>방재호</span>
                </p>
              </div>
              <div className='w-px h-12' style={{ backgroundColor: '#d9a77e' }}></div>
              <div>
                <p className='text-sm mb-1' style={{ color: '#94562f' }}>
                  신부측
                </p>
                <p>
                  김광현 · 박덕현의 차녀 <span className='font-medium'>김하정</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section - Style 2 */}
        <section
          ref={(el) => addSectionRef(el, 1)}
          id='gallery'
          className={`py-24 px-8 bg-white transition-all duration-1000 ${
            visibleSections.has('gallery') ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundColor: '#fefefe' }}
        >
          <div className='text-center mb-12'>
            <p className='text-sm tracking-wider mb-3' style={{ color: '#94562f' }}>
              OUR MOMENTS
            </p>
            <div className='w-16 h-px mx-auto' style={{ backgroundColor: '#c78656' }}></div>
          </div>

          <div className='grid grid-cols-2 gap-3 max-w-sm mx-auto'>
            {/* 이미지 그리드 */}
            <div className='col-span-2 overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300'>
              <div
                className='w-full h-64 bg-gradient-to-br from-amber-100 to-orange-100 hover:scale-105 transition-transform duration-500 flex items-center justify-center text-gray-600'
                style={{
                  backgroundImage: `url(${Image5})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              ></div>
            </div>

            <div className='overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300'>
              <div
                className='w-full h-40 bg-gradient-to-br from-orange-100 to-amber-100 hover:scale-105 transition-transform duration-500 flex items-center justify-center text-gray-600 text-sm'
                style={{
                  backgroundImage: `url(${Image4})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              ></div>
            </div>

            <div className='overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300'>
              <div
                className='w-full h-40 bg-gradient-to-br from-amber-100 to-yellow-100 hover:scale-105 transition-transform duration-500 flex items-center justify-center text-gray-600 text-sm'
                style={{
                  backgroundImage: `url(${Image1})`,
                  backgroundSize: 'cover',
                  backgroundPosition: '100%',
                  backgroundRepeat: 'no-repeat',
                }}
              ></div>
            </div>

            <div className='overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300'>
              <div
                className='w-full h-40 bg-gradient-to-br from-yellow-100 to-orange-100 hover:scale-105 transition-transform duration-500 flex items-center justify-center text-gray-600 text-sm'
                style={{
                  backgroundImage: `url(${Image7})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              ></div>
            </div>

            <div className='overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300'>
              <div
                className='w-full h-40 bg-gradient-to-br from-orange-100 to-amber-100 hover:scale-105 transition-transform duration-500 flex items-center justify-center text-gray-600 text-sm'
                style={{
                  backgroundImage: `url(${Image8})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'bottom',
                  backgroundRepeat: 'no-repeat',
                }}
              ></div>
            </div>
          </div>
        </section>

        {/* Calendar Section - Style 2 */}
        <section
          ref={(el) => addSectionRef(el, 2)}
          id='calendar'
          className={`py-24 px-8 transition-all duration-1000 ${
            visibleSections.has('calendar') ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: 'linear-gradient(to bottom, #fefefe, #fdf8f3)',
          }}
        >
          <div className='text-center mb-12'>
            <p className='text-sm tracking-wider mb-3' style={{ color: '#94562f' }}>
              SAVE THE DATE
            </p>
            <div className='w-16 h-px mx-auto' style={{ backgroundColor: '#c78656' }}></div>
          </div>

          <div className='max-w-sm mx-auto bg-white rounded-2xl shadow-lg p-6'>
            <div className='text-center mb-6'>
              <p className='text-2xl font-light' style={{ color: '#6b3e22' }}>
                2025년 06월
              </p>
            </div>

            {/* 간단한 달력 */}
            <div className='grid grid-cols-7 gap-1 text-center text-sm'>
              {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                <div key={day} className='font-medium py-2' style={{ color: '#94562f' }}>
                  {day}
                </div>
              ))}

              {/* 6월 달력 날짜들 */}
              {[...Array(30)].map((_, i) => {
                const date = i + 1;
                const isWeddingDay = date === 28;
                // 2025년 6월 1일은 일요일
                const dayOfWeek = new Date(2025, 5, date).getDay(); // 0: 일요일, 1: 월요일, ...

                return (
                  <div
                    key={i}
                    className={`py-2 ${isWeddingDay ? 'text-white rounded-full font-bold' : ''}`}
                    style={{
                      gridColumnStart: i === 0 ? dayOfWeek + 1 : 'auto',
                      backgroundColor: isWeddingDay ? '#b36d3f' : 'transparent',
                      color: isWeddingDay ? 'white' : '#6b3e22',
                    }}
                  >
                    {date}
                  </div>
                );
              })}
            </div>

            <div className='text-center mt-6'>
              <p className='font-medium' style={{ color: '#b36d3f' }}>
                토요일 오후 1시 00분
              </p>
            </div>
          </div>
        </section>

        {/* Account Section - Style 2 */}
        <section
          ref={(el) => addSectionRef(el, 3)}
          id='account'
          className={`py-24 px-8 transition-all duration-1000 ${
            visibleSections.has('account') ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: 'linear-gradient(to bottom, #fefefe, #fdf8f3)',
          }}
        >
          <div className='text-center mb-12'>
            <p className='text-sm tracking-wider mb-3' style={{ color: '#94562f' }}>
              CONGRATULATORY MONEY
            </p>
            <div className='w-16 h-px mx-auto' style={{ backgroundColor: '#c78656' }}></div>
          </div>

          <p className='text-center mb-10' style={{ color: '#94562f' }}>
            마음 전하실 곳
          </p>

          <div className='flex gap-4 justify-center mb-8'>
            <button
              onClick={() => setShowGroomAccount(!showGroomAccount)}
              className='px-8 py-3 text-white rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg'
              style={{ backgroundColor: '#b36d3f' }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#94562f')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#b36d3f')}
            >
              신랑측
            </button>
            <button
              onClick={() => setShowBrideAccount(!showBrideAccount)}
              className='px-8 py-3 text-white rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg'
              style={{ backgroundColor: '#b36d3f' }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#94562f')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#b36d3f')}
            >
              신부측
            </button>
          </div>

          {/* Groom Accounts */}
          <div
            className={`transition-all duration-500 overflow-hidden ${
              showGroomAccount ? 'max-h-96 opacity-100 mb-4' : 'max-h-0 opacity-0'
            }`}
          >
            <div className='bg-white p-6 rounded-2xl shadow-lg max-w-sm mx-auto'>
              <h3 className='font-medium mb-4 text-center' style={{ color: '#6b3e22' }}>
                신랑측 계좌번호
              </h3>
              <div className='space-y-3'>
                {groomAccounts.map((account) => (
                  <div
                    key={account.id}
                    className='flex justify-between items-center p-3 rounded-lg transition-colors'
                    style={{ backgroundColor: '#f9f0e6' }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = '#f0dcc6')}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = '#f9f0e6')}
                  >
                    <span style={{ color: '#6b3e22' }}>{account.label}</span>
                    <button
                      onClick={() => handleCopy(account.account, account.id)}
                      className='text-sm hover:scale-105 transition-transform'
                      style={{ color: '#b36d3f' }}
                    >
                      {copiedId === account.id ? '복사됨!' : `${account.bank} ${account.account}`}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bride Accounts */}
          <div
            className={`transition-all duration-500 overflow-hidden ${
              showBrideAccount ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className='bg-white p-6 rounded-2xl shadow-lg max-w-sm mx-auto'>
              <h3 className='font-medium mb-4 text-center' style={{ color: '#6b3e22' }}>
                신부측 계좌번호
              </h3>
              <div className='space-y-3'>
                {brideAccounts.map((account) => (
                  <div
                    key={account.id}
                    className='flex justify-between items-center p-3 rounded-lg transition-colors'
                    style={{ backgroundColor: '#f9f0e6' }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = '#f0dcc6')}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = '#f9f0e6')}
                  >
                    <span style={{ color: '#6b3e22' }}>{account.label}</span>
                    <button
                      onClick={() => handleCopy(account.account, account.id)}
                      className='text-sm hover:scale-105 transition-transform'
                      style={{ color: '#b36d3f' }}
                    >
                      {copiedId === account.id ? '복사됨!' : `${account.bank} ${account.account}`}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Message Section - Style 2 */}
        <section
          ref={(el) => addSectionRef(el, 4)}
          id='message'
          className={`py-24 px-8 transition-all duration-1000 ${
            visibleSections.has('message') ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundColor: '#fefefe' }}
        >
          <div className='text-center mb-12'>
            <p className='text-sm tracking-wider mb-3' style={{ color: '#94562f' }}>
              MESSAGE
            </p>
            <div className='w-16 h-px mx-auto' style={{ backgroundColor: '#c78656' }}></div>
          </div>

          <div className='max-w-sm mx-auto text-center'>
            <div className='rounded-2xl p-8' style={{ backgroundColor: '#f9f0e6' }}>
              <p className='italic leading-relaxed' style={{ color: '#6b3e22' }}>
                "사랑은 모든 것을 믿고
                <br />
                모든 것을 바라며
                <br />
                모든 것을 견디느니라"
              </p>
              <p className='mt-4 text-sm' style={{ color: '#94562f' }}>
                - 고린도전서 13:7 -
              </p>
            </div>
          </div>
        </section>

        {/* Share Section - Style 2 */}
        <section
          ref={(el) => addSectionRef(el, 5)}
          id='share'
          className={`py-24 px-8 transition-all duration-1000 ${
            visibleSections.has('share') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{
            background: 'linear-gradient(to bottom, #fefefe, #fdf8f3)',
          }}
        >
          <div className='text-center mb-12'>
            <p className='text-sm tracking-wider mb-3' style={{ color: '#94562f' }}>
              SHARE
            </p>
            <div className='w-16 h-px mx-auto' style={{ backgroundColor: '#c78656' }}></div>
          </div>

          <div className='flex gap-4 max-w-xs mx-auto'>
            <button
              className='flex-1 py-4 bg-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2'
              style={{
                border: '1px solid #b36d3f',
                color: '#b36d3f',
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#fdf8f3')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = 'white')}
              onClick={() => {
                handleCopy(window.location.href, 'copy-link');
              }}
            >
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3'
                />
              </svg>
              링크 복사
            </button>
          </div>
        </section>

        {/* Footer - Style 2 */}
        <footer className='py-12 text-center text-white' style={{ backgroundColor: '#6b3e22' }}>
          <p className='text-sm'>Thank you for celebrating with us</p>
          <p className='text-xs mt-2 opacity-80'>2025 Wedding Invitation</p>
        </footer>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes expandHeight {
          from {
            height: 0;
            opacity: 0;
          }
          to {
            height: 3rem;
            opacity: 1;
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
          animation-fill-mode: forwards;
        }

        .animate-expandHeight {
          animation: expandHeight 0.8s ease-out;
          animation-fill-mode: forwards;
        }
      `}</style>
    </div>
  );
};

export default WeddingInvitation;
