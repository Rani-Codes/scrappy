'use client'
import Header from "./components/header";
import Image from "next/image";
import { Carousel, Card } from "@/app/components/ui/apple-cards-carousel";
import Link from "next/link";


export default function Home() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <>
        <Header/>
        <div className="w-full h-full py-10">
          <h2 className="max-w-7xl pl-4 mx-auto text-3xl md:text-4xl font-bold text-main dark:text-neutral-200 font-sans">
            Capture Your Memories with Scrappy the Scrapbook
          </h2>
          <Carousel items={cards} />
          <div className="w-full flex justify-center">
            <Link href='/signup'>
            <button className="bg-button p-4 text-lg font-semibold text-white_tone rounded hover:shadow-2xl">
              Join Scrappy Today!
            </button>
            </Link>
          </div>
        </div>
    </>
  );
}




const DummyContent = () => {
  return (
    <>
          <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                This project was designed, developed, or iterated upon at hack nights at UC Davis.
              </span>{" "}
              "Scrappy" is the perfect way to capture and share all the amazing ideas and projects 
              from hack nights at UC Davis! It's a creative space to showcase your work, see what 
              others are building, and keep a record of how your projects evolve. Plus, by logging 
              your progress, you'll have a clear view of how far you've come with each new idea and
              iteration. So whether you're refining last week's hack or dreaming up something new,
              Scrappy is here to help you and your peers inspire and support one another!
            </p>
            <Image
              src="/scrappy_logo.png"
              alt="The logo of the website, a gear holding a wrench"
              height="500"
              width="500"
              className="md:w-1/3 md:h-1/3 h-full w-full mx-auto object-contain"
            />
          </div>
    </>
  );
};

const data = [
  {
    category: "Command Line Tool",
    title: "Ascii Image Converter",
    src: "/demo1.jpeg",
    content: <DummyContent />,
  },
  {
    category: "Student Photoshoot Marketplace",
    title: "Camoora",
    src: "/demo2.png",
    content: <DummyContent />,
  },
  {
    category: "Website Design",
    title: "Personal Portfolio",
    src: "/demo5.png",
    content: <DummyContent />,
  },
  {
    category: "Methane Calculator",
    title: "Cowculator",
    src: "/demo3.jpeg",
    content: <DummyContent />,
  },
  {
    category: "Anti-productivity site",
    title: "Distraction tool",
    src: "/demo4.jpeg",
    content: <DummyContent />,
  },
  {
    category: "Deal locator",
    title: "Deals In Davis",
    src: "/demo7.jpeg",
    content: <DummyContent />,
  },
];