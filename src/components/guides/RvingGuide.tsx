/* eslint-disable @next/next/no-img-element */
import { ArrowRight, Backpack, Dumbbell, MapPin, ShieldCheck, Thermometer, Eye, Siren, Wind, Home, Tent, Repeat } from "lucide-react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

const G = "/images/guides/rving";

const CHALLENGES = [
  { icon: Thermometer, title: "Temperature Control", text: "RVs can heat up like a greenhouse in the summer or get chilly on cold nights. Leaving your dog unattended for even a short time can be nerve-wracking." },
  { icon: Eye, title: "Keeping an Eye on Them", text: "Whether you’re inside the RV or outside enjoying a campfire, it’s not always easy to monitor your dog’s activity." },
  { icon: Siren, title: "Emergencies", text: "What if you’re out hiking and the temperature inside the RV rises unexpectedly? Or worse, what if your dog manages to slip out unnoticed?" },
  { icon: Wind, title: "Air Quality Issues", text: "Wildfires, pollen, and other air quality concerns can affect your dog’s health more than you realize." },
  { icon: Home, title: "Limited Space", text: "RVs aren’t as spacious as your home, so finding ways to keep your dog entertained and comfortable is important." },
  { icon: Tent, title: "Campsite Rules", text: "Not all campgrounds are dog-friendly, and some have specific rules about leash requirements or areas where pets can’t go." },
];

const TIPS = [
  { icon: Backpack, title: "Pack a Doggie Go-Bag", text: "Include essentials like food, water, toys, and a first-aid kit. Don’t forget their favorite chew toy!" },
  { icon: MapPin, title: "Plan Dog-Friendly Stops", text: "Research campgrounds and parks that welcome pets. Bonus points for finding spots with off-leash areas!" },
  { icon: Repeat, title: "Stick to a Routine", text: "Maintaining a consistent routine helps your pet feel secure during your RV adventure. Regular feeding, walks, and playtime provide comfort and stability, reducing stress on the road." },
  { icon: ShieldCheck, title: "Keep Them Secure", text: "Invest in a dog harness or travel crate to keep your pup safe while driving." },
  { icon: Dumbbell, title: "Exercise Often", text: "Make time for walks and play breaks during your stops to keep your dog happy and healthy." },
];

function Pic({ src, mob, alt }: { src: string; mob?: string; alt: string }) {
  return (
    <picture>
      {mob && <source media="(max-width: 639px)" srcSet={`${G}/${mob}`} />}
      <img src={`${G}/${src}`} alt={alt} loading="lazy" className="h-auto w-full" />
    </picture>
  );
}

export function RvingGuide() {
  return (
    <>
      <header className="bg-clay-50">
        <div className="container-page pb-12 pt-8 text-center sm:pb-16">
          <div className="text-left">
            <Breadcrumbs items={[{ name: "Wag Reads", path: "/learn" }, { name: "RVing with Pets", path: "/learn/section/rving-with-pets" }]} />
          </div>
          <p className="eyebrow mt-10">Wag Reads</p>
          <h1 className="mt-3 text-[40px] font-semibold leading-[1.05] sm:text-6xl">RVing with Pets</h1>
          <p className="mt-3 font-display text-2xl font-semibold text-clay-700">The Ultimate Adventure for Pet Parents</p>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-ink/75">
            There’s nothing quite like hitting the open road with your furry best friend. RVing with dogs combines the thrill of adventure with the comfort of having your pup right by your side. It’s the perfect way to explore new destinations while creating lifelong memories. But let’s be honest: RVing with dogs isn’t all sunshine and wagging tails. There are unique challenges that come with the territory and that’s where Waggle steps in to make the journey smoother and stress-free.
          </p>
        </div>
      </header>

      <section className="container-page py-16 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-5 text-lg leading-relaxed text-ink/75">
            <h2 className="text-3xl font-semibold text-ink sm:text-4xl">Why RVing with Pets Is So Special?</h2>
            <p>Imagine cruising through the Rockies, the sun setting behind you, and your dog’s nose pressed eagerly against the window. RVing allows you to travel with your pet without the hassle of hotels or boarding facilities. From campgrounds to scenic parks, it’s all about sharing the adventure with your pup.</p>
            <p>RVing is more than just a way to travel, it’s a lifestyle that embraces freedom and exploration. It’s waking up to the sound of birds chirping outside your RV, stepping out into the fresh morning air, and setting off on a new trail with your dog leading the way. You can plan your routes to include national parks, dog-friendly beaches, and charming small towns. Plus, the flexibility of RV travel means you can adjust your plans on the fly, depending on your dog’s needs and your mood.</p>
            <p>For many pet parents, RVing is the ideal way to explore the great outdoors while ensuring their dog is always part of the action. Your RV becomes a home on wheels, offering the comfort and convenience you need for both short trips and extended adventures.</p>
          </div>
          <Pic src="sec-2.png" mob="sec-22-mob.png" alt="RV-shaped photo of a dog traveling with its family, with a note that 68% of RV owners travel with their pets" />
        </div>
      </section>

      <section className="bg-sand py-16 sm:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold sm:text-4xl">The Challenges of RVing with Pets</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink/75">From keeping them cool in hot weather to ensuring they’re safe while you’re out exploring, RVing with pets can get a little tricky. Here are some common concerns pet parents face:</p>
          </div>
          <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1fr_1.1fr]">
            <div className="grid gap-5">
              <img src={`${G}/para-1-img.png`} alt="Dog resting inside an RV" loading="lazy" className="w-full rounded-3xl" />
              <img src={`${G}/para-2-img.png`} alt="Dog looking out of an RV window" loading="lazy" className="w-full rounded-3xl" />
              <img src={`${G}/para-3-img.png`} alt="Dog at a campsite" loading="lazy" className="w-full rounded-3xl" />
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {CHALLENGES.map(({ icon: Icon, title, text }) => (
                <li key={title} className="rounded-3xl bg-paper p-6 shadow-sm">
                  <span className="flex size-11 items-center justify-center rounded-full bg-clay-50 text-clay"><Icon className="size-5" aria-hidden /></span>
                  <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <h2 className="text-center text-3xl font-semibold sm:text-4xl">Real Stories from the Road</h2>
        <div className="mx-auto mt-12 max-w-4xl space-y-12">
          <div>
            <p className="mb-5 text-center text-lg text-ink/75">Take it from Rachel and Max, who travel full-time in their RV with their Labrador, Bella.</p>
            <Pic src="sec-4.png" mob="sec-44-mob.png" alt="Rachel and Max with their Labrador Bella, in an RV-shaped photo with their story" />
          </div>
          <div>
            <p className="mb-5 text-center text-lg text-ink/75">And there’s James and his German Shepherd, Rocky, who love exploring national parks.</p>
            <Pic src="sec-5.png" mob="sec-55-mob.png" alt="James and his German Shepherd Rocky, in an RV-shaped photo with their story" />
          </div>
        </div>
      </section>

      <section className="bg-clay-50 py-16 sm:py-20">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold sm:text-4xl">Peace of Mind Guaranteed</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/75">With Waggle, you’re not just getting tech gadgets, you’re creating a safer, happier environment for your pet. Waggle helps eliminate the “what if” moments so you can focus on enjoying your journey.</p>
            <Link href="/shop" className="btn-primary mt-7 px-7 py-3.5 text-base">Shop Now <ArrowRight className="size-4" aria-hidden /></Link>
          </div>
          <img src={`${G}/rvwing_with_pets.png`} alt="Dog and RV with a Waggle device" loading="lazy" className="mx-auto h-auto w-full max-w-md" />
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold sm:text-4xl">Tips for a Pawsome RV Adventure</h2>
          <p className="mt-4 text-lg text-ink/75">While Waggle takes care of the technical stuff, here are some tips to make your RV trip even better:</p>
        </div>
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="grid grid-cols-2 gap-4">
            <img src={`${G}/tips-img.png`} alt="" loading="lazy" className="w-full rounded-3xl" />
            <img src={`${G}/tips-img-1.png`} alt="" loading="lazy" className="w-full rounded-3xl" />
            <img src={`${G}/tips-img-2.png`} alt="" loading="lazy" className="col-span-2 w-full rounded-3xl" />
          </div>
          <ol className="space-y-4">
            {TIPS.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="flex gap-4 rounded-3xl border border-line p-5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-signal-50 text-signal"><Icon className="size-5" aria-hidden /></span>
                <div>
                  <h3 className="text-lg font-semibold"><span className="text-signal">{i + 1}.</span> {title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-sand py-16 sm:py-20">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2">
          <img src={`${G}/ht-road.png`} alt="Dog looking out over the open road" loading="lazy" className="h-auto w-full rounded-3xl" />
          <div>
            <h2 className="text-3xl font-semibold sm:text-4xl">Ready to Hit the Road</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/75">RVing with pets is an experience like no other. It’s about seeing the world through their curious eyes and creating memories you’ll cherish forever. With Waggle by your side, you can focus on what matters most: enjoying the journey with your furry best friend.</p>
            <p className="mt-4 text-lg font-semibold">So, pack up the RV, grab the leash, and let’s roll. Adventure is calling, and it’s wagging its tail!</p>
          </div>
        </div>
      </section>
    </>
  );
}
