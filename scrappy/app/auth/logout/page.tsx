'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Page = () => {
  const router = useRouter();

  // Redirect function
  const handleRedirect = () => {
    router.push('/'); // Redirect to the home page
  };

  useEffect(() => {
    // Automatically redirect after 10 seconds
    const timer = setTimeout(() => {
      router.push('/');
    }, 10000);

    // Cleanup timeout if the user clicks the button before the time elapses
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className='flex flex-col justify-center items-center w-full my-20 text-center'>
      <h1 className='text-4xl'>You've successfully logged out</h1>
      <p className='text-lg my-2'>You'll be redirected to the homepage in 10 seconds</p>
      <button onClick={handleRedirect} className="bg-button p-4 my-6 text-lg font-semibold text-white_tone rounded hover:bg-sky-600">
        Go to home page
      </button>
    </div>
  );
};

export default Page;
