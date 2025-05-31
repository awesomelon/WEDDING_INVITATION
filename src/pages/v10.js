import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check, MessageCircle } from 'lucide-react';

// 이미지는 실제 프로젝트에서 import 해주세요
import Image1 from '../images/1.JPG';
import Image2 from '../images/2.JPG';
import Image3 from '../images/3.JPG';

const WeddingInvitation = () => {
  const [showGroomAccount, setShowGroomAccount] = useState(false);
  const [showBrideAccount, setShowBrideAccount] = useState(false);
  const [copiedText, setCopiedText] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set());

  const sectionRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(''), 2000);
  };

  const addSectionRef = (el, index) => {
    if (el) sectionRefs.current[index] = el;
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-md mx-auto bg-white shadow-xl'>
        {/* Header Section */}
        <header
          className='relative h-screen flex flex-col items-center justify-center text-center p-8 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden'
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          {/* Minimal animated background elements */}
          <div className='absolute inset-0 overflow-hidden'>
            <div
              className='absolute top-20 left-20 w-16 h-16 bg-gray-100 rounded-full opacity-10 animate-pulse'
              style={{
                transform: `translate(${scrollY * 0.2}px, ${scrollY * 0.1}px)`,
              }}
            ></div>
            <div
              className='absolute bottom-20 right-20 w-24 h-24 bg-gray-100 rounded-full opacity-10 animate-pulse'
              style={{
                transform: `translate(-${scrollY * 0.3}px, -${scrollY * 0.2}px)`,
                animationDelay: '1s',
              }}
            ></div>
          </div>

          <div className='relative z-10'>
            <p
              className='text-xs text-gray-500 tracking-[0.3em] mb-8 font-light uppercase opacity-0 animate-fadeInUp'
              style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
            >
              Wedding Invitation
            </p>
            <h1
              className='text-4xl font-thin text-gray-800 mb-6 opacity-0 animate-fadeInUp'
              style={{ animationDelay: '0.4s', animationFillMode: 'forwards', fontFamily: 'serif' }}
            >
              <span className='font-light'>신랑</span>
              <span className='mx-4 text-gray-400 inline-block animate-heartbeat text-2xl'>♥</span>
              <span className='font-light'>신부</span>
            </h1>
            <div
              className='w-16 h-px bg-gray-300 mx-auto my-8 opacity-0 animate-expandWidth'
              style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
            ></div>
            <p
              className='text-base text-gray-700 mb-2 opacity-0 animate-fadeInUp'
              style={{ animationDelay: '0.8s', animationFillMode: 'forwards', fontFamily: 'serif' }}
            >
              2025년 O월 O일
            </p>
            <p
              className='text-sm text-gray-600 opacity-0 animate-fadeInUp'
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
          <h2
            className='text-xl font-light text-center text-gray-800 mb-12 animate-slideInFromLeft'
            style={{ fontFamily: 'serif' }}
          >
            초대합니다
          </h2>
          <div
            className='text-center text-gray-700 leading-loose space-y-6'
            style={{ fontFamily: 'serif' }}
          >
            <p className='animate-fadeIn' style={{ animationDelay: '0.2s' }}>
              O월의 어느 멋진 날,
              <br />
              저희 두 사람이 이제 믿음과 사랑으로
              <br />한 길을 가고자 합니다.
            </p>

            <p className='my-8 animate-fadeIn' style={{ animationDelay: '0.4s' }}>
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
            className='text-center mt-12 text-gray-800 animate-fadeIn'
            style={{ animationDelay: '0.8s', fontFamily: 'serif' }}
          >
            <p className='mb-2'>
              OOO · OOO의 장남 <span className='font-medium'>OOO</span>
            </p>
            <p>
              OOO · OOO의 장녀 <span className='font-medium'>OOO</span>
            </p>
          </div>
        </section>

        {/* Gallery Section */}
        <section
          ref={(el) => addSectionRef(el, 1)}
          id='gallery'
          className={`py-20 px-8 bg-gray-50 transition-all duration-1000 ${
            visibleSections.has('gallery') ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h2
            className='text-xl font-light text-center text-gray-800 mb-16 animate-slideInFromRight'
            style={{ fontFamily: 'serif' }}
          >
            우리의 이야기
          </h2>

          <div className='space-y-8 max-w-sm mx-auto'>
            {/* 실제 프로젝트에서는 import한 이미지를 사용하세요 */}
            <div className='overflow-hidden rounded-sm shadow-md hover:shadow-lg transition-shadow duration-300'>
              <div className='w-full h-64 bg-gray-200 flex items-center justify-center'>
                <span className='text-gray-400'>
                  <img src={Image1} alt='Image 1' />
                </span>
              </div>
            </div>

            <div className='overflow-hidden rounded-sm shadow-md hover:shadow-lg transition-shadow duration-300'>
              <div className='w-full h-64 bg-gray-200 flex items-center justify-center'>
                <span className='text-gray-400'>
                  <img src={Image2} alt='Image 2' />
                </span>
              </div>
            </div>

            <div className='overflow-hidden rounded-sm shadow-md hover:shadow-lg transition-shadow duration-300'>
              <div className='w-full h-64 bg-gray-200 flex items-center justify-center'>
                <span className='text-gray-400'>
                  <img src={Image3} alt='Image 3' />
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section
          ref={(el) => addSectionRef(el, 2)}
          id='quote'
          className={`py-20 px-8 bg-white transition-all duration-1000 ${
            visibleSections.has('quote') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className='max-w-sm mx-auto text-center'>
            <p
              className='text-base text-gray-700 italic leading-relaxed animate-fadeIn'
              style={{ fontFamily: 'serif' }}
            >
              "두 사람이 함께 있되
              <br />
              각자의 고독을 지킬 수 있을 때<br />
              그들은 진정으로 사랑하고 있는 것이다"
            </p>
            <p
              className='mt-6 text-sm text-gray-600 animate-fadeIn'
              style={{ animationDelay: '0.3s' }}
            >
              - 라이너 마리아 릴케 -
            </p>
          </div>
        </section>

        {/* Account Section */}
        <section
          ref={(el) => addSectionRef(el, 3)}
          id='account'
          className={`py-20 px-8 bg-gray-50 transition-all duration-1000 ${
            visibleSections.has('account') ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h2
            className='text-xl font-light text-center text-gray-800 mb-10 animate-slideInFromLeft'
            style={{ fontFamily: 'serif' }}
          >
            마음 전하실 곳
          </h2>
          <p className='text-center text-gray-700 mb-10 animate-fadeIn'>
            축하의 마음을 전해주신다면
            <br />
            저희에게 큰 힘이 되겠습니다
          </p>

          <div className='flex gap-4 justify-center animate-slideInFromBottom'>
            <button
              onClick={() => setShowGroomAccount(!showGroomAccount)}
              className='px-8 py-3 bg-gray-800 text-white rounded-sm hover:bg-gray-900 transition-all duration-300 hover:shadow-lg font-light'
            >
              신랑측
            </button>
            <button
              onClick={() => setShowBrideAccount(!showBrideAccount)}
              className='px-8 py-3 bg-gray-800 text-white rounded-sm hover:bg-gray-900 transition-all duration-300 hover:shadow-lg font-light'
            >
              신부측
            </button>
          </div>

          {/* Groom Accounts */}
          <div
            className={`transition-all duration-500 overflow-hidden ${
              showGroomAccount ? 'max-h-96 opacity-100 mt-8' : 'max-h-0 opacity-0'
            }`}
          >
            <div className='bg-white p-6 rounded-sm shadow-md animate-slideInFromLeft'>
              <h3 className='font-medium mb-4 text-gray-800'>신랑측 계좌번호</h3>
              <div className='space-y-3 text-sm'>
                <div className='flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors'>
                  <span className='text-gray-700'>부: OOO</span>
                  <div className='flex items-center gap-2'>
                    <span className='text-gray-600'>OO은행 000-0000-0000</span>
                    <button
                      onClick={() => handleCopy('000-0000-0000')}
                      className='text-gray-500 hover:text-gray-700 transition-colors'
                    >
                      {copiedText === '000-0000-0000' ? (
                        <Check size={18} className='text-green-600' />
                      ) : (
                        <Copy size={18} />
                      )}
                    </button>
                  </div>
                </div>
                <div className='flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors'>
                  <span className='text-gray-700'>모: OOO</span>
                  <div className='flex items-center gap-2'>
                    <span className='text-gray-600'>OO은행 000-0000-0000</span>
                    <button
                      onClick={() => handleCopy('000-0000-0000')}
                      className='text-gray-500 hover:text-gray-700 transition-colors'
                    >
                      {copiedText === '000-0000-0000' ? (
                        <Check size={18} className='text-green-600' />
                      ) : (
                        <Copy size={18} />
                      )}
                    </button>
                  </div>
                </div>
                <div className='flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors'>
                  <span className='text-gray-700'>신랑: OOO</span>
                  <div className='flex items-center gap-2'>
                    <span className='text-gray-600'>OO은행 000-0000-0000</span>
                    <button
                      onClick={() => handleCopy('000-0000-0000')}
                      className='text-gray-500 hover:text-gray-700 transition-colors'
                    >
                      {copiedText === '000-0000-0000' ? (
                        <Check size={18} className='text-green-600' />
                      ) : (
                        <Copy size={18} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bride Accounts */}
          <div
            className={`transition-all duration-500 overflow-hidden ${
              showBrideAccount ? 'max-h-96 opacity-100 mt-8' : 'max-h-0 opacity-0'
            }`}
          >
            <div className='bg-white p-6 rounded-sm shadow-md animate-slideInFromRight'>
              <h3 className='font-medium mb-4 text-gray-800'>신부측 계좌번호</h3>
              <div className='space-y-3 text-sm'>
                <div className='flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors'>
                  <span className='text-gray-700'>부: OOO</span>
                  <div className='flex items-center gap-2'>
                    <span className='text-gray-600'>OO은행 000-0000-0000</span>
                    <button
                      onClick={() => handleCopy('000-0000-0000')}
                      className='text-gray-500 hover:text-gray-700 transition-colors'
                    >
                      {copiedText === '000-0000-0000' ? (
                        <Check size={18} className='text-green-600' />
                      ) : (
                        <Copy size={18} />
                      )}
                    </button>
                  </div>
                </div>
                <div className='flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors'>
                  <span className='text-gray-700'>모: OOO</span>
                  <div className='flex items-center gap-2'>
                    <span className='text-gray-600'>OO은행 000-0000-0000</span>
                    <button
                      onClick={() => handleCopy('000-0000-0000')}
                      className='text-gray-500 hover:text-gray-700 transition-colors'
                    >
                      {copiedText === '000-0000-0000' ? (
                        <Check size={18} className='text-green-600' />
                      ) : (
                        <Copy size={18} />
                      )}
                    </button>
                  </div>
                </div>
                <div className='flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors'>
                  <span className='text-gray-700'>신부: OOO</span>
                  <div className='flex items-center gap-2'>
                    <span className='text-gray-600'>OO은행 000-0000-0000</span>
                    <button
                      onClick={() => handleCopy('000-0000-0000')}
                      className='text-gray-500 hover:text-gray-700 transition-colors'
                    >
                      {copiedText === '000-0000-0000' ? (
                        <Check size={18} className='text-green-600' />
                      ) : (
                        <Copy size={18} />
                      )}
                    </button>
                  </div>
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
          <h2
            className='text-xl font-light text-center text-gray-800 mb-10 animate-fadeIn'
            style={{ fontFamily: 'serif' }}
          >
            공유하기
          </h2>
          <div className='flex gap-4 max-w-sm mx-auto animate-slideInFromBottom'>
            <button
              className='flex-1 py-4 rounded-sm transition-all duration-300 hover:shadow-lg font-medium flex items-center justify-center gap-2'
              style={{
                backgroundColor: '#FEE500',
                color: '#000000',
              }}
            >
              <MessageCircle size={20} />
              카카오톡
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('링크가 복사되었습니다!');
              }}
              className='flex-1 py-4 bg-gray-100 text-gray-800 rounded-sm hover:bg-gray-200 transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2'
            >
              <Copy size={18} />
              링크 복사
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer
          className='py-8 text-center text-xs text-gray-500 bg-gray-50 opacity-0 animate-fadeIn'
          style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
        >
          <p>© 2025 Wedding Invitation</p>
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
            width: 4rem;
            opacity: 1;
          }
        }

        @keyframes heartbeat {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
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
