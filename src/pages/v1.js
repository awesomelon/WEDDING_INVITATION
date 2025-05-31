import React, { useState, useEffect } from 'react';

const WeddingInvitation = () => {
  const [showGroomAccount, setShowGroomAccount] = useState(false);
  const [showBrideAccount, setShowBrideAccount] = useState(false);
  const [copiedText, setCopiedText] = useState('');

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(''), 2000);
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-amber-50 to-amber-100'>
      <div className='max-w-md mx-auto bg-white shadow-2xl'>
        {/* Header Section */}
        <header className='relative h-screen flex flex-col items-center justify-center text-center p-8 bg-gradient-to-b from-amber-50 via-white to-amber-50'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='absolute top-10 left-10 w-20 h-20 bg-amber-200 rounded-full opacity-20 animate-pulse'></div>
            <div
              className='absolute bottom-20 right-10 w-32 h-32 bg-amber-300 rounded-full opacity-20 animate-pulse'
              style={{ animationDelay: '1s' }}
            ></div>
            <div
              className='absolute top-1/2 left-1/3 w-16 h-16 bg-amber-100 rounded-full opacity-30 animate-pulse'
              style={{ animationDelay: '2s' }}
            ></div>
          </div>

          <div className='relative z-10'>
            <p className='text-sm text-amber-600 tracking-widest mb-8 font-light'>WEDDING DAY</p>
            <h1 className='text-5xl font-thin text-gray-800 mb-4'>
              <span className='font-light'>신랑</span>
              <span className='mx-4 text-amber-500'>♥</span>
              <span className='font-light'>신부</span>
            </h1>
            <div className='w-24 h-0.5 bg-amber-400 mx-auto my-8'></div>
            <p className='text-lg text-gray-600 mb-2'>2025년 O월 O일</p>
            <p className='text-md text-gray-500'>토요일 오후 O시</p>
          </div>
        </header>

        {/* Greeting Section */}
        <section className='py-20 px-8 bg-white'>
          <h2 className='text-2xl font-light text-center text-amber-700 mb-10'>마음을 전합니다</h2>
          <div className='text-center text-gray-600 leading-loose space-y-4'>
            <p>
              O월의 어느 멋진 날,
              <br />
              저희 두 사람이 이제 믿음과 사랑으로
              <br />한 길을 가고자 합니다.
            </p>

            <p className='my-6'>
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

            <p>
              넓은 마음으로 양해 부탁드리며
              <br />
              저희 두 사람 축복하고 격려해 주시면
              <br />
              더없는 기쁨으로 간직하고
              <br />
              예쁘게 살겠습니다.
            </p>
          </div>

          <div className='text-center mt-12 text-gray-700'>
            <p className='mb-2'>
              OOO · OOO의 장남 <span className='font-medium'>OOO</span>
            </p>
            <p>
              OOO · OOO의 장녀 <span className='font-medium'>OOO</span>
            </p>
          </div>
        </section>

        {/* Polaroid Gallery */}
        <section className='py-20 px-8 bg-gradient-to-b from-white to-amber-50'>
          <h2 className='text-2xl font-light text-center text-amber-700 mb-16'>우리의 이야기</h2>

          <div className='space-y-8'>
            {/* Polaroid 1 */}
            <div className='transform rotate-2 hover:rotate-0 transition-transform duration-300'>
              <div className='bg-white p-4 shadow-xl max-w-xs mx-auto'>
                <div className='bg-gray-200 h-64 flex items-center justify-center text-gray-500'>
                  <span>Photo 1</span>
                </div>
                <p className='text-center mt-4 text-gray-600 font-handwriting'>첫 만남의 순간</p>
              </div>
            </div>

            {/* Polaroid 2 */}
            <div className='transform -rotate-3 hover:rotate-0 transition-transform duration-300'>
              <div className='bg-white p-4 shadow-xl max-w-xs mx-auto'>
                <div className='bg-gray-200 h-64 flex items-center justify-center text-gray-500'>
                  <span>Photo 2</span>
                </div>
                <p className='text-center mt-4 text-gray-600 font-handwriting'>함께한 여행</p>
              </div>
            </div>

            {/* Polaroid 3 */}
            <div className='transform rotate-1 hover:rotate-0 transition-transform duration-300'>
              <div className='bg-white p-4 shadow-xl max-w-xs mx-auto'>
                <div className='bg-gray-200 h-64 flex items-center justify-center text-gray-500'>
                  <span>Photo 3</span>
                </div>
                <p className='text-center mt-4 text-gray-600 font-handwriting'>약속의 날</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className='py-20 px-8 bg-white'>
          <div className='max-w-sm mx-auto text-center'>
            <p className='text-lg text-gray-600 italic leading-relaxed'>
              "두 사람이 함께 있되
              <br />
              각자의 고독을 지킬 수 있을 때<br />
              그들은 진정으로 사랑하고 있는 것이다"
            </p>
            <p className='mt-6 text-sm text-gray-500'>- 라이너 마리아 릴케 -</p>
          </div>
        </section>

        {/* Account Section */}
        <section className='py-20 px-8 bg-gradient-to-b from-white to-amber-50'>
          <h2 className='text-2xl font-light text-center text-amber-700 mb-10'>마음 전하실 곳</h2>
          <p className='text-center text-gray-600 mb-10'>
            축하의 마음을 전해주신다면
            <br />
            저희에게 큰 힘이 되겠습니다
          </p>

          <div className='flex gap-4 justify-center'>
            <button
              onClick={() => setShowGroomAccount(!showGroomAccount)}
              className='px-8 py-3 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors'
            >
              신랑측
            </button>
            <button
              onClick={() => setShowBrideAccount(!showBrideAccount)}
              className='px-8 py-3 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors'
            >
              신부측
            </button>
          </div>

          {/* Groom Accounts */}
          {showGroomAccount && (
            <div className='mt-8 bg-white p-6 rounded-lg shadow-md'>
              <h3 className='font-medium mb-4 text-gray-700'>신랑측 계좌번호</h3>
              <div className='space-y-3 text-sm'>
                <div className='flex justify-between items-center p-3 bg-gray-50 rounded'>
                  <span>부: OOO</span>
                  <button
                    onClick={() => handleCopy('000-0000-0000')}
                    className='text-amber-600 hover:text-amber-700'
                  >
                    {copiedText === '000-0000-0000' ? '복사됨!' : 'OO은행 000-0000-0000'}
                  </button>
                </div>
                <div className='flex justify-between items-center p-3 bg-gray-50 rounded'>
                  <span>모: OOO</span>
                  <button
                    onClick={() => handleCopy('000-0000-0000')}
                    className='text-amber-600 hover:text-amber-700'
                  >
                    {copiedText === '000-0000-0000' ? '복사됨!' : 'OO은행 000-0000-0000'}
                  </button>
                </div>
                <div className='flex justify-between items-center p-3 bg-gray-50 rounded'>
                  <span>신랑: OOO</span>
                  <button
                    onClick={() => handleCopy('000-0000-0000')}
                    className='text-amber-600 hover:text-amber-700'
                  >
                    {copiedText === '000-0000-0000' ? '복사됨!' : 'OO은행 000-0000-0000'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Bride Accounts */}
          {showBrideAccount && (
            <div className='mt-8 bg-white p-6 rounded-lg shadow-md'>
              <h3 className='font-medium mb-4 text-gray-700'>신부측 계좌번호</h3>
              <div className='space-y-3 text-sm'>
                <div className='flex justify-between items-center p-3 bg-gray-50 rounded'>
                  <span>부: OOO</span>
                  <button
                    onClick={() => handleCopy('000-0000-0000')}
                    className='text-amber-600 hover:text-amber-700'
                  >
                    {copiedText === '000-0000-0000' ? '복사됨!' : 'OO은행 000-0000-0000'}
                  </button>
                </div>
                <div className='flex justify-between items-center p-3 bg-gray-50 rounded'>
                  <span>모: OOO</span>
                  <button
                    onClick={() => handleCopy('000-0000-0000')}
                    className='text-amber-600 hover:text-amber-700'
                  >
                    {copiedText === '000-0000-0000' ? '복사됨!' : 'OO은행 000-0000-0000'}
                  </button>
                </div>
                <div className='flex justify-between items-center p-3 bg-gray-50 rounded'>
                  <span>신부: OOO</span>
                  <button
                    onClick={() => handleCopy('000-0000-0000')}
                    className='text-amber-600 hover:text-amber-700'
                  >
                    {copiedText === '000-0000-0000' ? '복사됨!' : 'OO은행 000-0000-0000'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Share Section */}
        <section className='py-20 px-8 bg-white'>
          <h2 className='text-2xl font-light text-center text-amber-700 mb-10'>공유하기</h2>
          <div className='flex gap-4 max-w-sm mx-auto'>
            <button className='flex-1 py-4 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors'>
              카카오톡
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('링크가 복사되었습니다!');
              }}
              className='flex-1 py-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors'
            >
              링크 복사
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className='py-8 text-center text-sm text-gray-500 bg-amber-50'>
          <p>2025 Wedding Invitation</p>
        </footer>
      </div>
    </div>
  );
};

export default WeddingInvitation;
