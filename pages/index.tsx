import Head from 'next/head';
import { useRouter } from 'next/router';
import Footer from '../components/Footer';
import { Main } from '../components/Main';

export default function Home() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/outlet-auth');
  };
  return (
    <>
      <Head>
        <title>Appsnetic | Welcome</title>
        <meta name='Sign Up | Log In' content='' />
      </Head>
      <Main nav={false}>
        <section >
          <div className='mx-auto max-w-screen-xl px-4 py-24 lg:flex lg:h-screen lg:items-center'>
            <div className='mx-auto max-w-xl text-center justify-center items-center '>
              <h1 className='font-extrabold text-5xl text-center'>
                Welcome 
              </h1>
              <h1 className='font-extrabold text-5xl text-center mt-4 mb-4'>
                to
              </h1>
              <h1 className='font-extrabold text-5xl text-center text-darkPurple'>
                EazyShare
              </h1>

              <p className='mt-4 text-2xl text-darkPurple font-semibold'>
              Sharing and Managing Files Made Eazy
              </p>

              <div className='mt-4'>
                <button
                  onClick={handleButtonClick}
                  className='p-4 rounded-lg text-center text-2xl font-bold justify-center items-center border-gray-200 bg-darkGreen  text-white shadow-sm focus:border-white'
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </section>
      </Main>
      <Footer />
    </>
  );
}
