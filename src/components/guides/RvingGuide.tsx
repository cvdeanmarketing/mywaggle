/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { BgVideo } from "./BgVideo";

const G = "/images/guides/rving";

/** The RV-shaped images carry their quote inside the artwork, so the quote goes in the alt text. */
function Rv({
  desk,
  mob,
  alt,
  quote,
}: {
  desk: string;
  mob: string;
  alt: string;
  quote: string;
}) {
  return (
    <section className="py-6 sm:py-12">
      <div className="container-page">
        <picture>
          <source media="(max-width: 767px)" srcSet={`${G}/${mob}`} />
          <img
            src={`${G}/${desk}`}
            alt={`${alt}: ${quote}`}
            className="mx-auto block h-auto max-w-full"
          />
        </picture>
      </div>
    </section>
  );
}

function Stack({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="relative isolate mb-8 overflow-hidden rounded-[25px] p-6 text-white sm:p-10">
      <BgVideo
        name={n}
        className="absolute inset-0 -z-20 size-full object-cover"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/[0.48]" />
      {children}
    </div>
  );
}

function Challenge({ title, text }: { title: string; text: string }) {
  return (
    <>
      <h5 className="mt-5 text-xl font-semibold text-white">{title}</h5>
      <p className="mt-1 text-base leading-[26px] text-white">{text}</p>
    </>
  );
}

export function RvingGuide() {
  return (
    <>
      {/* Banner */}
      <section className="relative">
        <div className="relative h-[55vh] overflow-hidden sm:h-[85vh]">
          <BgVideo
            name="hero"
            className="absolute inset-0 size-full object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-transparent from-[59%] to-black"
          />
          <div className="absolute inset-x-0 bottom-[5%] z-10 px-4 text-center text-white">
            <h1 className="text-[25px] font-semibold sm:text-[45px]">
              RVing{" "}
              <span className="text-[18px] font-normal sm:text-[30px]">
                with
              </span>{" "}
              Pets
            </h1>
            <h4 className="font-display text-lg font-normal sm:text-[30px]">
              The Ultimate Adventure for Pet Parents
            </h4>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-6 sm:py-12">
        <div className="container-page">
          <p className="text-justify text-base leading-[26px] text-black">
            There’s nothing quite like hitting the open road with your furry
            best friend. RVing with dogs combines the thrill of adventure with
            the comfort of having your pup right by your side. It’s the perfect
            way to explore new destinations while creating lifelong memories.
            But let’s be honest: RVing with dogs isn’t all sunshine and wagging
            tails. There are unique challenges that come with the territory and
            that’s where Waggle steps in to make the journey smoother and
            stress-free.
          </p>
          <div className="mt-8 grid items-center gap-8 lg:grid-cols-2 sm:mt-11">
            <div>
              <h4 className="mb-4 font-display text-xl font-semibold leading-8 text-signal sm:text-[24px]">
                Why RVing with Pets Is So Special?
              </h4>
              <div className="space-y-4 text-justify text-base leading-[26px] text-black">
                <p>
                  Imagine cruising through the Rockies, the sun setting behind
                  you, and your dog’s nose pressed eagerly against the window.
                  RVing allows you to travel with your pet without the hassle of
                  hotels or boarding facilities. From campgrounds to scenic
                  parks, it’s all about sharing the adventure with your pup.
                </p>
                <p>
                  RVing is more than just a way to travel, it’s a lifestyle that
                  embraces freedom and exploration. It’s waking up to the sound
                  of birds chirping outside your RV, stepping out into the fresh
                  morning air, and setting off on a new trail with your dog
                  leading the way. You can plan your routes to include national
                  parks, dog-friendly beaches, and charming small towns. Plus,
                  the flexibility of RV travel means you can adjust your plans
                  on the fly, depending on your dog’s needs and your mood.
                </p>
                <p>
                  For many pet parents, RVing is the ideal way to explore the
                  great outdoors while ensuring their dog is always part of the
                  action. Your RV becomes a home on wheels, offering the comfort
                  and convenience you need for both short trips and extended
                  adventures.
                </p>
              </div>
            </div>
            <BgVideo
              name="intro"
              className="w-full max-w-full rounded-[25px] shadow-[var(--shadow-lift)]"
            />
          </div>
        </div>
      </section>

      <Rv
        desk="sec-2.png"
        mob="sec-22-mob.png"
        alt="RV-shaped photo of a family and their dog"
        quote="Did you know? According to a survey by Go RVing, 68% of RV owners travel with their pets, and dogs are the most common travel companions. That’s millions of pet parents hitting the road every year, creating unforgettable memories with their furry friends."
      />

      {/* Challenges: three stacked video cards */}
      <section className="py-6 sm:py-12">
        <div className="container-page">
          <Stack n="c1">
            <div className="grid items-center gap-6 lg:grid-cols-2">
              <div>
                <h3 className="text-[22px] font-semibold text-white">
                  The Challenges of RVing with Pets
                </h3>
                <p className="mt-2 text-base leading-[26px] text-white">
                  From keeping them cool in hot weather to ensuring they’re safe
                  while you’re out exploring, RVing with Pets can get a little
                  tricky. Here are some common concerns pet parents face:
                </p>
                <Challenge
                  title="Temperature Control"
                  text="RVs can heat up like a greenhouse in the summer or get chilly on cold nights. Leaving your dog unattended for even a short time can be nerve-wracking"
                />
                <Challenge
                  title="Keeping an Eye on Them"
                  text="Whether you’re inside the RV or outside enjoying a campfire, it’s not always easy to monitor your dog’s activity."
                />
              </div>
              <img
                src={`${G}/para-1-img.png`}
                alt="Dog resting inside an RV"
                loading="lazy"
                className="w-full rounded-[10px]"
              />
            </div>
          </Stack>
          <Stack n="c2">
            <div className="grid items-center gap-6 lg:grid-cols-2">
              <img
                src={`${G}/para-2-img.png`}
                alt="Dog looking out of an RV window"
                loading="lazy"
                className="w-full rounded-[10px]"
              />
              <div>
                <Challenge
                  title="Emergencies"
                  text="What if you’re out hiking and the temperature inside the RV rises unexpectedly? Or worse, what if your dog manages to slip out unnoticed?"
                />
                <Challenge
                  title="Air Quality Issues"
                  text="Wildfires, pollen, and other air quality concerns can affect your dog’s health more than you realize."
                />
              </div>
            </div>
          </Stack>
          <Stack n="c3">
            <div className="grid items-center gap-6 lg:grid-cols-2">
              <div>
                <Challenge
                  title="Limited Space"
                  text="RVs aren’t as spacious as your home, so finding ways to keep your dog entertained and comfortable is important."
                />
                <Challenge
                  title="Campsite Rules"
                  text="Not all campgrounds are dog-friendly, and some have specific rules about leash requirements or areas where Pets can’t go."
                />
              </div>
              <img
                src={`${G}/para-3-img.png`}
                alt="Dog at a campsite"
                loading="lazy"
                className="w-full rounded-[10px]"
              />
            </div>
          </Stack>
        </div>
      </section>

      {/* Real stories */}
      <section className="py-6 sm:py-12">
        <h2 className="mb-6 text-center font-display text-xl font-semibold text-signal sm:mb-9 sm:text-[35px]">
          Real Stories from the Road
        </h2>
        <div className="relative isolate overflow-hidden">
          <BgVideo name="story1" className="block w-full" />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-l from-transparent from-[58%] to-black"
          />
          <div className="absolute bottom-2.5 left-5 z-10 max-w-[400px] sm:bottom-[50px] sm:left-[50px]">
            <h4 className="font-display text-lg font-normal text-white sm:text-[22px]">
              Take it from Rachel and Max, who travel full-time in their RV with
              their Labrador, Bella.
            </h4>
          </div>
        </div>
      </section>
      <Rv
        desk="sec-4.png"
        mob="sec-44-mob.png"
        alt="RV-shaped photo of Rachel, Max and their Labrador Bella"
        quote="“Last summer, we were camping in Arizona, and the temperature inside the RV climbed quickly when our AC stopped working. Thankfully, our Waggle Pet Monitor alerted us while we were out hiking, and we rushed back to make sure Bella was safe. Waggle truly saved the day!”"
      />
      <section className="py-6 sm:py-12">
        <div className="relative isolate overflow-hidden">
          <BgVideo name="story2" className="block w-full" />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-l from-transparent from-[58%] to-black"
          />
          <div className="absolute bottom-2.5 left-5 z-10 max-w-[400px] sm:bottom-[50px] sm:left-[50px]">
            <h4 className="font-display text-lg font-normal text-white sm:text-[22px]">
              And there’s James and his German Shepherd, Rocky, who love
              exploring national parks.
            </h4>
          </div>
        </div>
      </section>
      <Rv
        desk="sec-5.png"
        mob="sec-55-mob.png"
        alt="RV-shaped photo of James and his German Shepherd Rocky"
        quote="“Having the WaggleCam gives us so much peace of mind. I can check on Rocky anytime, whether we’re grabbing groceries or relaxing by the campfire.”"
      />

      {/* Peace of mind */}
      <section className="pt-6 sm:pt-12">
        <div className="container-page">
          <div className="grid items-center gap-8 rounded-[25px] bg-[#F5F5F5] p-5 sm:p-[50px] md:grid-cols-2">
            <div>
              <h2 className="mb-6 font-display text-[28px] font-semibold text-signal sm:text-[35px]">
                Peace of Mind Guaranteed
              </h2>
              <p className="text-justify text-base leading-[26px] text-black">
                With Waggle, you’re not just getting tech gadgets, you’re
                creating a safer, happier environment for your pet. Waggle helps
                eliminate the “what if” moments so you can focus on enjoying
                your journey.
              </p>
              <div className="mt-11">
                <Link
                  href="/shop"
                  className="inline-block rounded-[10px] bg-black px-6 py-[15px] text-lg font-medium text-white transition-colors hover:bg-ink-3"
                >
                  Shop Now
                </Link>
              </div>
            </div>
            <img
              src={`${G}/rvwing_with_pets.png`}
              alt="Pet parent with a dog and a Waggle device"
              loading="lazy"
              className="mx-auto h-auto w-full max-w-md"
            />
          </div>
        </div>
      </section>

      {/* Tips */}
      <section
        className="py-6 sm:py-[100px]"
        style={{
          backgroundImage: `url(${G}/rv-sec-bg.png)`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="container-page space-y-6 sm:space-y-[50px]">
          <div className="grid items-center gap-6 lg:grid-cols-[5fr_2fr_5fr]">
            <div className="rounded-[25px] bg-[#EBF5FF] p-5">
              <h3 className="font-display text-[25px] font-semibold text-[#221B14]">
                Tips for a Pawsome RV Adventure
              </h3>
              <p className="mt-2 text-base leading-[26px]">
                While Waggle takes care of the technical stuff, here are some
                tips to make your RV trip even better:
              </p>
              <h5 className="mt-4 text-lg font-semibold">
                Pack a Doggie Go-Bag
              </h5>
              <p className="text-base leading-[26px]">
                Include essentials like food, water, toys, and a first-aid kit.
                Don’t forget their favorite chew toy!
              </p>
            </div>
            <span className="hidden lg:block" />
            <img
              src={`${G}/tips-img.png`}
              alt=""
              loading="lazy"
              className="w-full max-w-full"
            />
          </div>
          <div className="grid items-center gap-6 lg:grid-cols-[5fr_2fr_5fr]">
            <img
              src={`${G}/tips-img-1.png`}
              alt=""
              loading="lazy"
              className="w-full max-w-full"
            />
            <span className="hidden lg:block" />
            <div className="rounded-[25px] bg-[#F9F0E6] p-5">
              <h5 className="text-lg font-semibold">Plan Dog-Friendly Stops</h5>
              <p className="text-base leading-[26px]">
                Research campgrounds and parks that welcome Pets. Bonus points
                for finding spots with off-leash areas!
              </p>
              <h5 className="mt-4 text-lg font-semibold">Stick to a Routine</h5>
              <p className="text-base leading-[26px]">
                Maintaining a consistent routine helps your pet feel secure
                during your RV adventure. Regular feeding, walks, and playtime
                provide comfort and stability, reducing stress on the road.
              </p>
            </div>
          </div>
          <div className="grid items-center gap-6 lg:grid-cols-[5fr_2fr_5fr]">
            <div className="rounded-[25px] bg-[#EFEFED] p-5 sm:py-[45px]">
              <h5 className="text-lg font-semibold">Keep Them Secure</h5>
              <p className="text-base leading-[26px]">
                Invest in a dog harness or travel crate to keep your pup safe
                while driving.
              </p>
              <h5 className="mt-4 text-lg font-semibold">Exercise Often</h5>
              <p className="text-base leading-[26px]">
                Make time for walks and play breaks during your stops to keep
                your dog happy and healthy.
              </p>
            </div>
            <span className="hidden lg:block" />
            <img
              src={`${G}/tips-img-2.png`}
              alt=""
              loading="lazy"
              className="w-full max-w-full"
            />
          </div>
        </div>
      </section>

      {/* Ready to hit the road */}
      <section className="py-6 sm:py-12">
        <div className="container-page grid items-center gap-8 md:grid-cols-2">
          <img
            src={`${G}/ht-road.png`}
            alt="Pet parents and their dog ready for the road"
            loading="lazy"
            className="h-auto w-full max-w-full"
          />
          <div>
            <h3 className="mb-3 font-display text-[25px] font-semibold text-signal sm:mb-5 sm:text-[35px]">
              Ready to Hit the Road
            </h3>
            <p className="text-justify text-base leading-[26px] text-black">
              RVing with Pets is an experience like no other. It’s about seeing
              the world through their curious eyes and creating memories you’ll
              cherish forever. With Waggle by your side, you can focus on what
              matters most:enjoying the journey with your furry best friend.
            </p>
            <p className="mt-4 text-justify text-base leading-[26px] text-black">
              So, pack up the RV, grab the leash, and let’s roll. Adventure is
              calling, and it’s wagging its tail!
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
