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
  const [copiedText, setCopiedText] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set());

  // 스크롤 애니메이션을 위한 refs
  const sectionRefs = useRef([]);
  const polaroidRefs = useRef([]);

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

  // 폴라로이드 스크롤 애니메이션 - 화면 밖에서 들어오는 효과
  useEffect(() => {
    const handlePolaroidScroll = () => {
      polaroidRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const elementTop = rect.top;
          const elementHeight = rect.height;

          // 요소가 화면에 나타나기 시작하는 시점
          const startAppear = windowHeight;
          // 요소가 완전히 화면에 들어온 시점
          const fullyVisible = windowHeight * 0.7;

          if (elementTop < startAppear) {
            // 진입 진행도 계산 (0: 화면 밖, 1: 완전히 들어옴)
            const progress = Math.min(
              1,
              Math.max(0, (startAppear - elementTop) / (startAppear - fullyVisible))
            );

            // 각 사진마다 다른 방향에서 들어오기
            let translateX = 0;
            let translateY = 0;

            switch (index % 6) {
              case 0: // 왼쪽에서
                translateX = -100 * (1 - progress);
                break;
              case 1: // 오른쪽에서
                translateX = 100 * (1 - progress);
                break;
              case 2: // 위에서
                translateY = -100 * (1 - progress);
                break;
              case 3: // 왼쪽 아래에서
                translateX = -80 * (1 - progress);
                translateY = 80 * (1 - progress);
                break;
              case 4: // 오른쪽 아래에서
                translateX = 80 * (1 - progress);
                translateY = 80 * (1 - progress);
                break;
              case 5: // 아래에서
                translateY = 100 * (1 - progress);
                break;
            }

            // 회전과 스케일 효과
            const rotation = (index % 2 === 0 ? 1 : -1) * (1 - progress) * 15;
            const scale = 0.7 + progress * 0.3;
            const opacity = progress;

            ref.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotation}deg) scale(${scale})`;
            ref.style.opacity = opacity;
            ref.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
          } else {
            // 화면 밖에 있을 때
            ref.style.opacity = '0';
            ref.style.transform = 'translate(0, 100px) scale(0.7)';
          }
        }
      });
    };

    window.addEventListener('scroll', handlePolaroidScroll);
    handlePolaroidScroll(); // 초기 실행

    return () => window.removeEventListener('scroll', handlePolaroidScroll);
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(''), 2000);
  };

  const addSectionRef = (el, index) => {
    if (el) sectionRefs.current[index] = el;
  };

  const addPolaroidRef = (el, index) => {
    if (el) polaroidRefs.current[index] = el;
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-amber-50 to-amber-100'>
      <div className='max-w-md mx-auto bg-white shadow-2xl'>
        {/* Header Section with Parallax */}
        <header
          className='relative h-screen flex flex-col items-center justify-center text-center p-8 bg-gradient-to-b from-amber-50 via-white to-amber-50 overflow-hidden'
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          {/* Animated background elements */}
          <div className='absolute inset-0 overflow-hidden'>
            <div
              className='absolute top-10 left-10 w-20 h-20 bg-amber-200 rounded-full opacity-20 animate-pulse'
              style={{
                transform: `translate(${scrollY * 0.2}px, ${scrollY * 0.1}px)`,
              }}
            ></div>
            <div
              className='absolute bottom-20 right-10 w-32 h-32 bg-amber-300 rounded-full opacity-20 animate-pulse'
              style={{
                transform: `translate(-${scrollY * 0.3}px, -${scrollY * 0.2}px)`,
                animationDelay: '1s',
              }}
            ></div>
            <div
              className='absolute top-1/2 left-1/3 w-16 h-16 bg-amber-100 rounded-full opacity-30 animate-pulse'
              style={{
                transform: `translate(${scrollY * 0.15}px, ${scrollY * 0.25}px)`,
                animationDelay: '2s',
              }}
            ></div>
          </div>

          <div className='relative z-10'>
            <p
              className='text-sm text-amber-600 tracking-widest mb-8 font-light opacity-0 animate-fadeInUp'
              style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
            >
              WEDDING DAY
            </p>
            <h1
              className='text-5xl font-thin text-gray-800 mb-4 opacity-0 animate-fadeInUp'
              style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
            >
              <span className='font-light'>신랑</span>
              <span className='mx-4 text-amber-500 inline-block animate-heartbeat'>♥</span>
              <span className='font-light'>신부</span>
            </h1>
            <div
              className='w-24 h-0.5 bg-amber-400 mx-auto my-8 opacity-0 animate-expandWidth'
              style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
            ></div>
            <p
              className='text-lg text-gray-600 mb-2 opacity-0 animate-fadeInUp'
              style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
            >
              2025년 O월 O일
            </p>
            <p
              className='text-md text-gray-500 opacity-0 animate-fadeInUp'
              style={{ animationDelay: '1s', animationFillMode: 'forwards' }}
            >
              토요일 오후 O시
            </p>
          </div>
        </header>

        {/* Greeting Section */}
        <section
          ref={(el) => addSectionRef(el, 0)}
          id='greeting'
          className={`py-20 px-8 bg-white transition-all duration-1000 ${
            visibleSections.has('greeting')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className='text-2xl font-light text-center text-amber-700 mb-10 animate-slideInFromLeft'>
            마음을 전합니다
          </h2>
          <div className='text-center text-gray-600 leading-loose space-y-4'>
            <p className='animate-fadeIn' style={{ animationDelay: '0.2s' }}>
              O월의 어느 멋진 날,
              <br />
              저희 두 사람이 이제 믿음과 사랑으로
              <br />한 길을 가고자 합니다.
            </p>

            <p className='my-6 animate-fadeIn' style={{ animationDelay: '0.4s' }}>
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
            className='text-center mt-12 text-gray-700 animate-fadeIn'
            style={{ animationDelay: '0.8s' }}
          >
            <p className='mb-2'>
              OOO · OOO의 장남 <span className='font-medium'>OOO</span>
            </p>
            <p>
              OOO · OOO의 장녀 <span className='font-medium'>OOO</span>
            </p>
          </div>
        </section>

        {/* Collage Gallery with Enhanced Animations */}
        <section
          ref={(el) => addSectionRef(el, 1)}
          id='gallery'
          className={`py-20 px-6 bg-gradient-to-b from-white to-amber-50 transition-all duration-1000 ${
            visibleSections.has('gallery') ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h2 className='text-2xl font-light text-center text-amber-700 mb-16 animate-slideInFromRight'>
            우리의 이야기
          </h2>

          {/* Overlapping Collage Layout */}
          <div className='max-w-4xl mx-auto relative' style={{ minHeight: '900px' }}>
            {/* Photo 1 - Top Left (왼쪽에서 들어옴) */}
            <div
              ref={(el) => addPolaroidRef(el, 0)}
              className='absolute top-0 left-0 w-48 h-56 sm:w-56 sm:h-64 transition-all duration-700 hover:z-50'
              style={{
                zIndex: 10,
                opacity: 0,
                transform: 'translate(-100px, 0) scale(0.7)',
              }}
            >
              <div className='relative w-full h-full rounded-lg overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110'>
                <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300'></div>
                <div className='bg-gray-200 w-full h-full flex items-center justify-center text-gray-500'>
                  <span>
                    <img src={Image1} alt='봄날의 약속' />
                  </span>
                </div>
                <div className='absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 hover:opacity-100 transition-opacity duration-300'>
                  <p className='text-sm font-light'>봄날의 약속</p>
                </div>
              </div>
            </div>

            {/* Photo 2 - Top Right (오른쪽에서 들어옴) */}
            <div
              ref={(el) => addPolaroidRef(el, 1)}
              className='absolute top-8 right-0 sm:right-10 w-52 h-48 sm:w-60 sm:h-56 transition-all duration-700 hover:z-50'
              style={{
                zIndex: 15,
                opacity: 0,
                transform: 'translate(100px, 0) scale(0.7)',
              }}
            >
              <div className='relative w-full h-full rounded-lg overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110'>
                <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300'></div>
                <div className='bg-gray-200 w-full h-full flex items-center justify-center text-gray-500'>
                  <span>
                    <img src={Image2} alt='설레는 순간' />
                  </span>
                </div>
                <div className='absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 hover:opacity-100 transition-opacity duration-300'>
                  <p className='text-sm font-light'>설레는 순간</p>
                </div>
              </div>
            </div>

            {/* Photo 3 - Center (위에서 들어옴) */}
            <div
              ref={(el) => addPolaroidRef(el, 2)}
              className='absolute top-32 left-1/2 transform -translate-x-1/2 w-56 h-64 sm:w-64 sm:h-72 transition-all duration-700 hover:z-50'
              style={{
                zIndex: 20,
                opacity: 0,
                transform: 'translate(-50%, -100px) scale(0.7)',
              }}
            >
              <div className='relative w-full h-full rounded-lg overflow-hidden shadow-3xl hover:shadow-4xl transition-all duration-500 hover:scale-110'>
                <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300'></div>
                <div className='bg-gray-200 w-full h-full flex items-center justify-center text-gray-500'>
                  <span>
                    <img src={Image3} alt='영원을 꿈꾸며' />
                  </span>
                </div>
                <div className='absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 hover:opacity-100 transition-opacity duration-300'>
                  <p className='text-sm font-light'>영원을 꿈꾸며</p>
                </div>
              </div>
            </div>

            {/* Photo 4 - Middle Left (왼쪽 아래에서 들어옴) */}
            <div
              ref={(el) => addPolaroidRef(el, 3)}
              className='absolute top-64 sm:top-72 left-2 sm:left-10 w-48 h-56 sm:w-56 sm:h-64 transition-all duration-700 hover:z-50'
              style={{
                zIndex: 18,
                opacity: 0,
                transform: 'translate(-80px, 80px) scale(0.7)',
              }}
            >
              <div className='relative w-full h-full rounded-lg overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110'>
                <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300'></div>
                <div className='bg-gray-200 w-full h-full flex items-center justify-center text-gray-500'>
                  <span>
                    <img src={Image4} alt='행복한 미소' />
                  </span>
                </div>
                <div className='absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 hover:opacity-100 transition-opacity duration-300'>
                  <p className='text-sm font-light'>행복한 미소</p>
                </div>
              </div>
            </div>

            {/* Photo 5 - Middle Right (오른쪽 아래에서 들어옴) */}
            <div
              ref={(el) => addPolaroidRef(el, 4)}
              className='absolute top-80 sm:top-96 right-2 sm:right-8 w-52 h-48 sm:w-60 sm:h-56 transition-all duration-700 hover:z-50'
              style={{
                zIndex: 16,
                opacity: 0,
                transform: 'translate(80px, 80px) scale(0.7)',
              }}
            >
              <div className='relative w-full h-full rounded-lg overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110'>
                <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300'></div>
                <div className='bg-gray-200 w-full h-full flex items-center justify-center text-gray-500'>
                  <span>
                    <img src={Image5} alt='함께하는 기쁨' />
                  </span>
                </div>
                <div className='absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 hover:opacity-100 transition-opacity duration-300'>
                  <p className='text-sm font-light'>함께하는 기쁨</p>
                </div>
              </div>
            </div>

            {/* Photo 6 - Bottom Center (아래에서 들어옴) */}
            <div
              ref={(el) => addPolaroidRef(el, 5)}
              className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-56 h-48 sm:w-64 sm:h-56 transition-all duration-700 hover:z-50'
              style={{
                zIndex: 14,
                opacity: 0,
                transform: 'translate(-50%, 100px) scale(0.7)',
              }}
            >
              <div className='relative w-full h-full rounded-lg overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110'>
                <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300'></div>
                <div className='bg-gray-200 w-full h-full flex items-center justify-center text-gray-500'>
                  <span>
                    <img src={Image6} alt='새로운 시작' />
                  </span>
                </div>
                <div className='absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 hover:opacity-100 transition-opacity duration-300'>
                  <p className='text-sm font-light'>새로운 시작</p>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className='absolute top-20 right-20 w-32 h-32 bg-amber-200 rounded-full opacity-10 blur-3xl animate-pulse'></div>
            <div
              className='absolute bottom-40 left-20 w-40 h-40 bg-amber-300 rounded-full opacity-10 blur-3xl animate-pulse'
              style={{ animationDelay: '1s' }}
            ></div>
          </div>
        </section>

        {/* Quote Section with Fade Effect */}
        <section
          ref={(el) => addSectionRef(el, 2)}
          id='quote'
          className={`py-20 px-8 bg-white transition-all duration-1000 ${
            visibleSections.has('quote') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className='max-w-sm mx-auto text-center'>
            <p className='text-lg text-gray-600 italic leading-relaxed animate-fadeIn'>
              "두 사람이 함께 있되
              <br />
              각자의 고독을 지킬 수 있을 때<br />
              그들은 진정으로 사랑하고 있는 것이다"
            </p>
            <p
              className='mt-6 text-sm text-gray-500 animate-fadeIn'
              style={{ animationDelay: '0.3s' }}
            >
              - 라이너 마리아 릴케 -
            </p>
          </div>
        </section>

        {/* Account Section with Slide Animations */}
        <section
          ref={(el) => addSectionRef(el, 3)}
          id='account'
          className={`py-20 px-8 bg-gradient-to-b from-white to-amber-50 transition-all duration-1000 ${
            visibleSections.has('account') ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h2 className='text-2xl font-light text-center text-amber-700 mb-10 animate-slideInFromLeft'>
            마음 전하실 곳
          </h2>
          <p className='text-center text-gray-600 mb-10 animate-fadeIn'>
            축하의 마음을 전해주신다면
            <br />
            저희에게 큰 힘이 되겠습니다
          </p>

          <div className='flex gap-4 justify-center animate-slideInFromBottom'>
            <button
              onClick={() => setShowGroomAccount(!showGroomAccount)}
              className='px-8 py-3 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-all duration-300 hover:scale-105 hover:shadow-lg'
            >
              신랑측
            </button>
            <button
              onClick={() => setShowBrideAccount(!showBrideAccount)}
              className='px-8 py-3 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-all duration-300 hover:scale-105 hover:shadow-lg'
            >
              신부측
            </button>
          </div>

          {/* Groom Accounts with Slide Animation */}
          <div
            className={`transition-all duration-500 overflow-hidden ${
              showGroomAccount ? 'max-h-96 opacity-100 mt-8' : 'max-h-0 opacity-0'
            }`}
          >
            <div className='bg-white p-6 rounded-lg shadow-md animate-slideInFromLeft'>
              <h3 className='font-medium mb-4 text-gray-700'>신랑측 계좌번호</h3>
              <div className='space-y-3 text-sm'>
                <div className='flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors'>
                  <span>부: OOO</span>
                  <button
                    onClick={() => handleCopy('000-0000-0000')}
                    className='text-amber-600 hover:text-amber-700 hover:scale-105 transition-transform'
                  >
                    {copiedText === '000-0000-0000' ? '복사됨!' : 'OO은행 000-0000-0000'}
                  </button>
                </div>
                <div className='flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors'>
                  <span>모: OOO</span>
                  <button
                    onClick={() => handleCopy('000-0000-0000')}
                    className='text-amber-600 hover:text-amber-700 hover:scale-105 transition-transform'
                  >
                    {copiedText === '000-0000-0000' ? '복사됨!' : 'OO은행 000-0000-0000'}
                  </button>
                </div>
                <div className='flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors'>
                  <span>신랑: OOO</span>
                  <button
                    onClick={() => handleCopy('000-0000-0000')}
                    className='text-amber-600 hover:text-amber-700 hover:scale-105 transition-transform'
                  >
                    {copiedText === '000-0000-0000' ? '복사됨!' : 'OO은행 000-0000-0000'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bride Accounts with Slide Animation */}
          <div
            className={`transition-all duration-500 overflow-hidden ${
              showBrideAccount ? 'max-h-96 opacity-100 mt-8' : 'max-h-0 opacity-0'
            }`}
          >
            <div className='bg-white p-6 rounded-lg shadow-md animate-slideInFromRight'>
              <h3 className='font-medium mb-4 text-gray-700'>신부측 계좌번호</h3>
              <div className='space-y-3 text-sm'>
                <div className='flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors'>
                  <span>부: OOO</span>
                  <button
                    onClick={() => handleCopy('000-0000-0000')}
                    className='text-amber-600 hover:text-amber-700 hover:scale-105 transition-transform'
                  >
                    {copiedText === '000-0000-0000' ? '복사됨!' : 'OO은행 000-0000-0000'}
                  </button>
                </div>
                <div className='flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors'>
                  <span>모: OOO</span>
                  <button
                    onClick={() => handleCopy('000-0000-0000')}
                    className='text-amber-600 hover:text-amber-700 hover:scale-105 transition-transform'
                  >
                    {copiedText === '000-0000-0000' ? '복사됨!' : 'OO은행 000-0000-0000'}
                  </button>
                </div>
                <div className='flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors'>
                  <span>신부: OOO</span>
                  <button
                    onClick={() => handleCopy('000-0000-0000')}
                    className='text-amber-600 hover:text-amber-700 hover:scale-105 transition-transform'
                  >
                    {copiedText === '000-0000-0000' ? '복사됨!' : 'OO은행 000-0000-0000'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Share Section */}
        <section
          ref={(el) => addSectionRef(el, 4)}
          id='share'
          className={`py-20 px-8 bg-white transition-all duration-1000 ${
            visibleSections.has('share') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className='text-2xl font-light text-center text-amber-700 mb-10 animate-fadeIn'>
            공유하기
          </h2>
          <div className='flex gap-4 max-w-sm mx-auto animate-slideInFromBottom'>
            <button className='flex-1 py-4 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-all duration-300 hover:scale-105 hover:shadow-lg'>
              카카오톡
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('링크가 복사되었습니다!');
              }}
              className='flex-1 py-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-300 hover:scale-105 hover:shadow-lg'
            >
              링크 복사
            </button>
          </div>
        </section>

        {/* Footer with Fade */}
        <footer
          className='py-8 text-center text-sm text-gray-500 bg-amber-50 opacity-0 animate-fadeIn'
          style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
        >
          <p>2025 Wedding Invitation</p>
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

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes expandWidth {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 6rem;
            opacity: 1;
          }
        }

        @keyframes heartbeat {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
          animation-fill-mode: forwards;
          opacity: 0;
        }

        .animate-slideInFromLeft {
          animation: slideInFromLeft 0.8s ease-out;
        }

        .animate-slideInFromRight {
          animation: slideInFromRight 0.8s ease-out;
        }

        .animate-slideInFromBottom {
          animation: slideInFromBottom 0.8s ease-out;
        }

        .animate-expandWidth {
          animation: expandWidth 0.8s ease-out;
        }

        .animate-heartbeat {
          animation: heartbeat 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default WeddingInvitation;
