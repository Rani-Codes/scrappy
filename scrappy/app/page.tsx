import Header from "./components/header";

export default function Home() {
  return (
    <>
        <Header/>
        <div className="flex justify-center items-center mt-12">
          <div className="w-1/2 text-center">
            <h1 className="text-5xl font-bold text-[#094067]">Capture Your Memories with Scrappy the Scrapbook</h1>
          </div>
        </div>
        <div className="flex justify-center items-center">
        </div>
    </>
  );
}
