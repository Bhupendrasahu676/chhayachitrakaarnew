import { siteContent } from "@/data/site-content";
import { MotionImage } from "./motion-image";

export function StoryImageCluster() {
  const [main, left, right] = siteContent.featuredStory.images;

  return (
    <div className="relative mx-auto mt-14 min-h-[620px] max-w-6xl sm:mt-20 lg:min-h-[760px]">
      <MotionImage
        src={main.src}
        alt={main.alt}
        width={1300}
        height={1650}
        sizes="(min-width: 1024px) 58vw, 92vw"
        className="relative z-10 mx-auto aspect-[4/5] w-[76%] rounded-t-full rounded-b-[2rem] shadow-[0_40px_120px_rgba(66,48,33,0.24)] sm:w-[58%]"
        drift="up"
      />
      <MotionImage
        src={left.src}
        alt={left.alt}
        width={900}
        height={1100}
        sizes="(min-width: 1024px) 24vw, 44vw"
        className="absolute left-0 top-[18%] z-20 aspect-[3/4] w-[42%] rounded-[1.4rem] shadow-[0_28px_80px_rgba(66,48,33,0.18)] sm:w-[28%]"
        drift="right"
      />
      <MotionImage
        src={right.src}
        alt={right.alt}
        width={900}
        height={1100}
        sizes="(min-width: 1024px) 23vw, 40vw"
        className="absolute bottom-[7%] right-0 z-20 aspect-[4/5] w-[38%] rounded-[1.4rem] shadow-[0_28px_80px_rgba(66,48,33,0.18)] sm:w-[26%]"
        drift="left"
      />
      <div className="absolute left-1/2 top-10 h-[86%] w-px -translate-x-1/2 bg-[rgba(55,45,36,0.12)]" />
    </div>
  );
}
