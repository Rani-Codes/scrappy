"use client";
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/'); // Redirect to the home page
  };

  return (
    <div>
      <h1>You've successfully logged out</h1>
      <button onClick={handleRedirect}>
        Go to home page
      </button>
    </div>
  );
};

export default Page;
