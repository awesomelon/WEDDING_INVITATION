import React, { useState, useEffect, useRef } from 'react';

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

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(''), 2000);
  };

  const addSectionRef = (el, index) => {
    if (el) sectionRefs.current[index] = el;
  };

  // 계좌 정보 데이터 구조화
  const groomAccounts = [
    { id: 'groom-father', label: '부: OOO', bank: 'OO은행', account: '000-0000-0000' },
    { id: 'groom-mother', label: '모: OOO', bank: 'OO은행', account: '000-0000-0000' },
    { id: 'groom', label: '신랑: 이지훈', bank: 'OO은행', account: '000-0000-0000' },
  ];

  const brideAccounts = [
    { id: 'bride-father', label: '부: OOO', bank: 'OO은행', account: '000-0000-0000' },
    { id: 'bride-mother', label: '모: OOO', bank: 'OO은행', account: '000-0000-0000' },
    { id: 'bride', label: '신부: 유수진', bank: 'OO은행', account: '000-0000-0000' },
  ];

  return (
    <div className='min-h-screen bg-white'>
      <div className='max-w-md mx-auto bg-white'>
        {/* Header Section - Style 2 */}
        <header className='relative h-screen flex items-center justify-center'>
          {/* 배경 그라데이션 */}
          <div className='absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50'></div>

          {/* 중앙 콘텐츠 */}
          <div className='relative z-10 text-center px-8'>
            <div className='bg-white bg-opacity-95 px-8 py-12 rounded-2xl shadow-2xl'>
              <p className='text-sm text-gray-500 tracking-wider mb-3 animate-fadeIn'>
                두 사람의 결혼식
              </p>
              <div className='w-px h-12 bg-gray-300 mx-auto mb-6 animate-expandHeight'></div>

              <h1 className='text-4xl font-light text-gray-800 mb-8 animate-fadeInUp'>
                <span className='block mb-2'>이지훈</span>
                <span className='block'>유수진</span>
              </h1>

              {/* 웨딩 이미지 */}
              <div className='mb-8 overflow-hidden rounded-xl shadow-lg animate-fadeIn'>
                <div className='w-72 h-72 mx-auto bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center text-gray-600'>
                  웨딩 사진
                </div>
              </div>

              {/* 날짜와 장소 */}
              <div className='text-gray-700 space-y-2 animate-fadeInUp'>
                <p className='text-lg font-light'>2024. 10. 26. SAT PM 1:30</p>
                <p className='text-sm text-gray-500'>잇츠카드 웨딩홀 6층 노블레스홀</p>
              </div>
            </div>
          </div>
        </header>

        {/* Greeting Section - Style 2 */}
        <section
          ref={(el) => addSectionRef(el, 0)}
          id='greeting'
          className={`py-24 px-8 bg-gradient-to-b from-white to-emerald-50/30 transition-all duration-1000 ${
            visibleSections.has('greeting')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className='text-center mb-12'>
            <p className='text-sm text-gray-500 tracking-wider mb-3'>INVITATION</p>
            <div className='w-16 h-px bg-emerald-400 mx-auto'></div>
          </div>

          <div className='text-center mb-8'>
            <h3 className='text-lg font-light text-gray-800'>마음을 전합니다</h3>
          </div>

          <div className='text-center text-gray-700 leading-relaxed space-y-6 max-w-sm mx-auto'>
            <p className='animate-fadeIn' style={{ animationDelay: '0.2s' }}>
              10월의 어느 멋진 날,
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

          <div className='w-px h-16 bg-gray-300 mx-auto my-12 animate-expandHeight'></div>

          <div
            className='text-center text-gray-700 animate-fadeIn'
            style={{ animationDelay: '0.8s' }}
          >
            <div className='flex justify-center items-center gap-8'>
              <div>
                <p className='text-sm text-gray-500 mb-1'>신랑측</p>
                <p>
                  OOO · OOO의 장남 <span className='font-medium'>이지훈</span>
                </p>
              </div>
              <div className='w-px h-12 bg-gray-300'></div>
              <div>
                <p className='text-sm text-gray-500 mb-1'>신부측</p>
                <p>
                  OOO · OOO의 장녀 <span className='font-medium'>유수진</span>
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
        >
          <div className='text-center mb-12'>
            <p className='text-sm text-gray-500 tracking-wider mb-3'>OUR MOMENTS</p>
            <div className='w-16 h-px bg-emerald-400 mx-auto'></div>
          </div>

          <div className='grid grid-cols-2 gap-3 max-w-sm mx-auto'>
            {/* 이미지 그리드 */}
            <div className='col-span-2 overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300'>
              <div className='w-full h-64 bg-gradient-to-br from-emerald-100 to-teal-100 hover:scale-105 transition-transform duration-500 flex items-center justify-center text-gray-600'>
                메인 사진
              </div>
            </div>

            <div className='overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300'>
              <div className='w-full h-40 bg-gradient-to-br from-teal-100 to-emerald-100 hover:scale-105 transition-transform duration-500 flex items-center justify-center text-gray-600 text-sm'>
                갤러리 1
              </div>
            </div>

            <div className='overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300'>
              <div className='w-full h-40 bg-gradient-to-br from-emerald-100 to-cyan-100 hover:scale-105 transition-transform duration-500 flex items-center justify-center text-gray-600 text-sm'>
                갤러리 2
              </div>
            </div>

            <div className='overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300'>
              <div className='w-full h-40 bg-gradient-to-br from-cyan-100 to-teal-100 hover:scale-105 transition-transform duration-500 flex items-center justify-center text-gray-600 text-sm'>
                갤러리 3
              </div>
            </div>

            <div className='overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300'>
              <div className='w-full h-40 bg-gradient-to-br from-teal-100 to-emerald-100 hover:scale-105 transition-transform duration-500 flex items-center justify-center text-gray-600 text-sm'>
                갤러리 4
              </div>
            </div>
          </div>
        </section>

        {/* Calendar Section - Style 2 */}
        <section
          ref={(el) => addSectionRef(el, 2)}
          id='calendar'
          className={`py-24 px-8 bg-gradient-to-b from-white to-emerald-50/30 transition-all duration-1000 ${
            visibleSections.has('calendar') ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className='text-center mb-12'>
            <p className='text-sm text-gray-500 tracking-wider mb-3'>SAVE THE DATE</p>
            <div className='w-16 h-px bg-emerald-400 mx-auto'></div>
          </div>

          <div className='max-w-sm mx-auto bg-white rounded-2xl shadow-lg p-6'>
            <div className='text-center mb-6'>
              <p className='text-2xl font-light text-gray-800'>2024년 10월</p>
            </div>

            {/* 간단한 달력 */}
            <div className='grid grid-cols-7 gap-1 text-center text-sm'>
              {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                <div key={day} className='text-gray-500 font-medium py-2'>
                  {day}
                </div>
              ))}

              {/* 10월 달력 날짜들 */}
              {[...Array(31)].map((_, i) => {
                const date = i + 1;
                const isWeddingDay = date === 26;
                const startDay = i === 0 ? 1 : 0; // 10월 1일이 화요일

                return (
                  <div
                    key={i}
                    className={`py-2 ${
                      isWeddingDay
                        ? 'bg-emerald-500 text-white rounded-full font-bold'
                        : 'text-gray-700'
                    }`}
                    style={{ gridColumnStart: i === 0 ? 3 : 'auto' }}
                  >
                    {date}
                  </div>
                );
              })}
            </div>

            <div className='text-center mt-6'>
              <p className='text-emerald-600 font-medium'>토요일 오후 1시 30분</p>
            </div>
          </div>
        </section>

        {/* Map Section - Style 2 */}
        <section
          ref={(el) => addSectionRef(el, 3)}
          id='location'
          className={`py-24 px-8 bg-white transition-all duration-1000 ${
            visibleSections.has('location') ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className='text-center mb-12'>
            <p className='text-sm text-gray-500 tracking-wider mb-3'>LOCATION</p>
            <div className='w-16 h-px bg-emerald-400 mx-auto'></div>
          </div>

          <div className='text-center mb-8'>
            <h3 className='text-xl font-light text-gray-800 mb-2'>잇츠카드 웨딩홀</h3>
            <p className='text-gray-600'>6층 노블레스홀</p>
            <p className='text-gray-500 text-sm mt-2'>서울특별시 강남구 논현로 OOO</p>
          </div>

          {/* 지도 영역 */}
          <div className='mb-8 rounded-xl overflow-hidden shadow-lg'>
            <div className='w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-600'>
              지도 영역
            </div>
          </div>

          {/* 교통 정보 */}
          <div className='grid grid-cols-3 gap-4 text-center text-sm'>
            <div className='bg-emerald-50 rounded-lg p-4'>
              <div className='text-emerald-600 mb-2'>
                <svg
                  className='w-6 h-6 mx-auto'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
                  />
                </svg>
              </div>
              <p className='font-medium text-gray-700'>지하철</p>
              <p className='text-gray-600 text-xs mt-1'>O호선 OO역</p>
            </div>

            <div className='bg-emerald-50 rounded-lg p-4'>
              <div className='text-emerald-600 mb-2'>
                <svg
                  className='w-6 h-6 mx-auto'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4'
                  />
                </svg>
              </div>
              <p className='font-medium text-gray-700'>버스</p>
              <p className='text-gray-600 text-xs mt-1'>OOO, OOO번</p>
            </div>

            <div className='bg-emerald-50 rounded-lg p-4'>
              <div className='text-emerald-600 mb-2'>
                <svg
                  className='w-6 h-6 mx-auto'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M5 13l4 4L19 7'
                  />
                </svg>
              </div>
              <p className='font-medium text-gray-700'>주차</p>
              <p className='text-gray-600 text-xs mt-1'>2시간 무료</p>
            </div>
          </div>
        </section>

        {/* Account Section - Style 2 */}
        <section
          ref={(el) => addSectionRef(el, 4)}
          id='account'
          className={`py-24 px-8 bg-gradient-to-b from-white to-emerald-50/30 transition-all duration-1000 ${
            visibleSections.has('account') ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className='text-center mb-12'>
            <p className='text-sm text-gray-500 tracking-wider mb-3'>CONGRATULATORY MONEY</p>
            <div className='w-16 h-px bg-emerald-400 mx-auto'></div>
          </div>

          <p className='text-center text-gray-600 mb-10'>마음 전하실 곳</p>

          <div className='flex gap-4 justify-center mb-8'>
            <button
              onClick={() => setShowGroomAccount(!showGroomAccount)}
              className='px-8 py-3 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-all duration-300 hover:scale-105 hover:shadow-lg'
            >
              신랑측
            </button>
            <button
              onClick={() => setShowBrideAccount(!showBrideAccount)}
              className='px-8 py-3 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-all duration-300 hover:scale-105 hover:shadow-lg'
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
              <h3 className='font-medium mb-4 text-gray-800 text-center'>신랑측 계좌번호</h3>
              <div className='space-y-3'>
                {groomAccounts.map((account) => (
                  <div
                    key={account.id}
                    className='flex justify-between items-center p-3 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors'
                  >
                    <span className='text-gray-700'>{account.label}</span>
                    <button
                      onClick={() => handleCopy(account.account, account.id)}
                      className='text-emerald-600 hover:text-emerald-700 text-sm hover:scale-105 transition-transform'
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
              <h3 className='font-medium mb-4 text-gray-800 text-center'>신부측 계좌번호</h3>
              <div className='space-y-3'>
                {brideAccounts.map((account) => (
                  <div
                    key={account.id}
                    className='flex justify-between items-center p-3 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors'
                  >
                    <span className='text-gray-700'>{account.label}</span>
                    <button
                      onClick={() => handleCopy(account.account, account.id)}
                      className='text-emerald-600 hover:text-emerald-700 text-sm hover:scale-105 transition-transform'
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
          ref={(el) => addSectionRef(el, 5)}
          id='message'
          className={`py-24 px-8 bg-white transition-all duration-1000 ${
            visibleSections.has('message') ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className='text-center mb-12'>
            <p className='text-sm text-gray-500 tracking-wider mb-3'>MESSAGE</p>
            <div className='w-16 h-px bg-emerald-400 mx-auto'></div>
          </div>

          <div className='max-w-sm mx-auto text-center'>
            <div className='bg-emerald-50 rounded-2xl p-8'>
              <p className='text-gray-700 italic leading-relaxed'>
                "사랑은 모든 것을 믿고
                <br />
                모든 것을 바라며
                <br />
                모든 것을 견디느니라"
              </p>
              <p className='mt-4 text-sm text-gray-500'>- 고린도전서 13:7 -</p>
            </div>
          </div>
        </section>

        {/* Share Section - Style 2 */}
        <section
          ref={(el) => addSectionRef(el, 6)}
          id='share'
          className={`py-24 px-8 bg-gradient-to-b from-white to-emerald-50 transition-all duration-1000 ${
            visibleSections.has('share') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className='text-center mb-12'>
            <p className='text-sm text-gray-500 tracking-wider mb-3'>SHARE</p>
            <div className='w-16 h-px bg-emerald-400 mx-auto'></div>
          </div>

          <div className='flex gap-4 max-w-xs mx-auto'>
            <button
              className='flex-1 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium flex items-center justify-center gap-2'
              style={{
                backgroundColor: '#FEE500',
                color: '#000000',
              }}
            >
              <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M12 3c5.5 0 10 3.58 10 8s-4.5 8-10 8c-1.24 0-2.43-.18-3.53-.5C5.55 21 2 21 2 21c2.33-2.33 2.7-3.9 2.75-4.5C3.05 15.07 2 13.13 2 11c0-4.42 4.5-8 10-8z' />
              </svg>
              카카오톡
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('링크가 복사되었습니다!');
              }}
              className='flex-1 py-4 bg-white border border-emerald-500 text-emerald-600 rounded-xl hover:bg-emerald-50 transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2'
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
        <footer className='py-12 text-center bg-emerald-600 text-white'>
          <p className='text-sm'>Thank you for celebrating with us</p>
          <p className='text-xs mt-2 opacity-80'>2024 Wedding Invitation</p>
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
