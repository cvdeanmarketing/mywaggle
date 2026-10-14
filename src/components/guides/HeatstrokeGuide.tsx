/* eslint-disable @next/next/no-img-element */
import { AlertTriangle, ArrowRight, Check, Droplets, Fan, Siren, Sun, Thermometer, X, Zap } from "lucide-react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Faq } from "@/components/ui/Faq";

const G = "/images/guides/heat";

const ZONES = [
  { range: "101–102.5°F", label: "Normal", cls: "bg-mint/15 text-ink" },
  { range: "103–104°F", label: "Caution", cls: "bg-amber-100 text-ink" },
  { range: "104–106°F", label: "Heatstroke", cls: "bg-orange-200 text-ink" },
  { range: "106°F+", label: "Emergency", cls: "bg-red-600 text-white" },
];

const RV_CURVE = [
  { t: "Start", f: "75°F", label: "Safe" },
  { t: "+10 min", f: "88°F", label: "Caution" },
  { t: "+20 min", f: "100°F", label: "Danger" },
  { t: "+30 min", f: "107°F", label: "Critical" },
];

const EARLY = ["Heavy panting or rapid breathing", "Searching for shade or cool surfaces", "Lying flat, limbs spread wide", "Loss of interest in food or play", "Excessive drooling", "Slight unsteadiness"];
const SEVERE = ["Bright red or pale gums", "Vomiting or bloody diarrhea", "Collapse or inability to stand", "Seizures", "Red/purple spots on skin (petechiae)", "Labored breathing", "Confusion or unresponsiveness"];

const DEHYDRATION = [
  { level: "Mild", loss: "<5% loss", text: "No visible signs. Slightly increased thirst. Easy to miss." },
  { level: "Moderate", loss: "5–9% loss", text: "Dry, tacky gums. Reduced energy. Skin tent springs back slowly. Capillary refill >2 seconds." },
  { level: "Severe", loss: ">9% loss", text: "Sunken eyes. Skin doesn’t rebound. Extreme lethargy. Cardiovascular shock. Can be fatal within hours." },
];

const RISK = [
  { who: "Bulldogs, Pugs, Boxers", level: "Extreme", w: "100%" },
  { who: "French Bulldogs", level: "Extreme", w: "100%" },
  { who: "Overweight dogs", level: "High", w: "75%" },
  { who: "Senior dogs (7+)", level: "High", w: "75%" },
  { who: "Huskies, Malamutes", level: "Moderate", w: "50%" },
  { who: "Puppies under 6 months", level: "Moderate", w: "50%" },
  { who: "Short-coated, fit adults", level: "Lower", w: "25%" },
];

const PREVENT = [
  { icon: Thermometer, title: "Monitor temperature in real time", text: "Don’t guess. A monitor gives you an objective reading of what your pet is actually experiencing — not what you think it might be." },
  { icon: Droplets, title: "Never let water run dry", text: "Refill with cool water whenever you check in. Warm water provides little cooling benefit when your dog needs it most." },
  { icon: Fan, title: "Use a fan alongside AC", text: "Moving air over a dog’s body dramatically improves cooling through panting. A fan uses far less power and keeps working through minor fluctuations." },
  { icon: Sun, title: "Park with afternoon sun in mind", text: "Morning shade becomes afternoon sun. Check where the sun will be in 3 hours before you park and walk away." },
  { icon: AlertTriangle, title: "Exercise in early morning only", text: "Test the pavement with your palm. If it’s too hot for 5 seconds, it’s too hot for paws — and your dog’s body will overheat just as fast." },
  { icon: Zap, title: "Set up a power-loss alert", text: "When shore power fails, your AC dies first — and Wi-Fi monitors go silent with it. Use a 4G monitor with backup battery to get alerted before temperatures climb." },
];

const STEPS = [
  { t: "Move to a cool, shaded area immediately", d: "Get out of the hot environment first. Even moving into an air-conditioned vehicle helps. Prioritize this above everything else." },
  { t: "Call your vet at the same time", d: "Call ahead while cooling — not after. The vet can guide you over the phone and prepare so treatment starts the moment you arrive." },
  { t: "Pour cool (not cold) water over their body", d: "Avoid the head. Cool the neck, armpits, and groin. Not ice water — ice constricts blood vessels and slows cooling." },
  { t: "Use a fan to enhance cooling", d: "Moving air over wet fur dramatically increases evaporative cooling. Car AC vents pointed directly at your dog work well." },
  { t: "Offer small sips of cool water", d: "Let them drink on their own terms. Don’t force it — vomiting worsens dehydration and risks aspiration." },
  { t: "Get to a vet immediately — even if they seem better", d: "Dogs can appear to recover and then crash. Internal organ damage isn’t visible. Bloodwork, kidney function, and clotting checks are essential." },
];

const DO = ["Cool water — room temperature or slightly below", "Wet armpits, groin, and paw pads", "Use a fan while wetting the dog", "Let the dog sip water on their own", "Go to the vet even after apparent recovery"];
const DONT = ["Use ice or ice-cold water", "Wrap in wet towels — they trap heat", "Force your dog to drink", "Leave them unattended", "Skip the vet if they seem recovered"];

const FAQS = [
  { q: "Can dogs recover fully from heatstroke?", a: "Yes — especially when caught early. Dogs treated quickly for mild to moderate heatstroke often make a full recovery. Severe cases are different: temperatures above 106°F can damage kidneys, liver, intestines, and brain. Even after apparent recovery, some dogs develop organ complications days later. That’s why a vet visit is necessary even when your dog seems fine." },
  { q: "How hot is too hot for dogs?", a: "Be cautious above 85°F (29°C), especially with high humidity. But this varies a lot by breed. Brachycephalic dogs (Bulldogs, Pugs, French Bulldogs) can experience heat stress at 70–75°F during even light exercise. When it comes to RV interiors, the danger zone begins much earlier than most owners expect." },
  { q: "What temperature is dangerous for a dog left in an RV?", a: "On an 85°F day, a parked RV can reach 100°F in 10–15 minutes without AC. The rate depends on insulation, shade, and humidity. RVs typically heat up more slowly than cars — but can still reach dangerous temperatures within 20–30 minutes in direct sun." },
  { q: "Are certain breeds more prone to heatstroke?", a: "Yes. Brachycephalic breeds like Bulldogs, Pugs, Shih Tzus, and French Bulldogs are at highest risk because their shortened airways make efficient panting nearly impossible. Overweight dogs, seniors, puppies, and dogs with thick double coats also have significantly reduced heat tolerance." },
  { q: "What’s the difference between heatstroke and sunstroke?", a: "Sunstroke is heatstroke caused specifically by direct sun exposure. Both produce the same dangerous rise in core body temperature and are treated identically. Both are medical emergencies." },
  { q: "How do vets treat heatstroke in dogs?", a: "Treatment typically includes IV fluid therapy to rehydrate and stabilize blood pressure, oxygen supplementation, bloodwork to assess organ damage, active external cooling, and medications for complications. Dogs are usually monitored for 24–72 hours after admission." },
  { q: "How long do the effects of heatstroke last?", a: "Mild overheating may resolve within hours. Actual heatstroke with elevated core temperature can have effects lasting days — and in severe cases, months. Kidney damage, neurological effects, and clotting problems can emerge in the days following. Follow-up vet visits are important even after discharge." },
];

function Eyebrow({ children }: { children: string }) {
  return <p className="text-xs font-bold uppercase tracking-[0.16em] text-clay-700">{children}</p>;
}

export function HeatstrokeGuide() {
  return (
    <>
      <header className="relative isolate overflow-hidden bg-ink text-white">
        <img src={`${G}/1108099.jpg`} alt="" className="absolute inset-0 -z-10 size-full object-cover opacity-40" />
        <div className="container-page pb-16 pt-8 sm:pb-24">
          <div className="text-left [&_*]:!text-white/80">
            <Breadcrumbs items={[{ name: "Wag Reads", path: "/learn" }, { name: "Heatstroke in Pets", path: "/learn/section/heatstroke" }]} />
          </div>
          <div className="mx-auto mt-12 max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-1.5 text-xs font-bold uppercase tracking-wider"><Siren className="size-4" aria-hidden /> Pet Safety Alert</p>
            <h1 className="mt-5 text-[40px] font-semibold leading-[1.05] sm:text-6xl">Heatstroke in Dogs</h1>
            <p className="mt-5 text-lg leading-relaxed text-white/85">What every RV owner needs to know before the trip — how to spot it, stop it, and never face it again.</p>
          </div>
          <dl className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
            {[["~50%", "of dogs with severe heatstroke don’t survive"], ["15 min", "is all it takes in a parked RV on an 85°F day"], ["2,000+", "dogs die from heatstroke in the US every year — most were left in a vehicle"]].map(([v, l]) => (
              <div key={v} className="rounded-3xl bg-white/10 p-6 text-center backdrop-blur">
                <dt className="font-display text-4xl font-semibold">{v}</dt>
                <dd className="mt-2 text-sm text-white/80">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <section className="container-page py-16 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-4 text-lg leading-relaxed text-ink/75">
            <Eyebrow>The basics</Eyebrow>
            <h2 className="text-3xl font-semibold text-ink sm:text-4xl">What is heatstroke in dogs?</h2>
            <p>Heatstroke happens when your dog’s body temperature climbs faster than they can bring it back down. It’s not just discomfort — it can cause irreversible organ damage within minutes, and it can be fatal if untreated.</p>
            <p>One thing worth knowing upfront: many people use “heatstroke” and “hyperthermia” interchangeably, but they’re not the same. Hyperthermia just means elevated body temperature — and that can be caused by infections too, not just heat. This matters because the first aid for each is different. When in doubt, call your vet.</p>
          </div>
          <img src={`${G}/1805164.jpg`} alt="Panting dog resting in the shade" loading="lazy" className="aspect-[4/3] w-full rounded-3xl object-cover" />
        </div>
        <div className="mt-10 rounded-3xl bg-clay-50 p-6 sm:p-8">
          <p className="font-display text-xl font-semibold">The distinction that matters</p>
          <p className="mt-2 text-ink/75">Hyperthermia = body temp too high (any cause). Heatstroke = hyperthermia from environmental heat. Infection-driven fever needs different treatment. If your dog hasn’t been exposed to heat but has a high temperature — that’s a vet call, not a cooling situation.</p>
        </div>
        <h3 className="mt-12 text-center text-xl font-semibold">Dog body temperature risk zones</h3>
        <ul className="mt-5 grid gap-3 sm:grid-cols-4">
          {ZONES.map((z) => (
            <li key={z.label} className={`rounded-2xl p-5 text-center ${z.cls}`}>
              <p className="font-display text-xl font-semibold">{z.range}</p>
              <p className="mt-1 text-sm font-bold uppercase tracking-wider">{z.label}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-sand py-16 sm:py-20">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2">
          <img src={`${G}/1458916.jpg`} alt="Dog looking out of a vehicle window" loading="lazy" className="aspect-[4/3] w-full rounded-3xl object-cover" />
          <div className="space-y-4 text-lg leading-relaxed text-ink/75">
            <Eyebrow>The hidden risk</Eyebrow>
            <h2 className="text-3xl font-semibold text-ink sm:text-4xl">How fast does an RV heat up?</h2>
            <p>On an 85°F day, a parked RV interior can hit 102°F in under 15 minutes once the air conditioning stops — whether from a power failure, a tripped breaker, or just being parked without hookups.</p>
            <p>The real danger isn’t just heat — it’s humidity. Dogs cool themselves by panting. High humidity prevents evaporation, which means panting stops working. A humid 85°F RV can be more dangerous than a dry 95°F one.</p>
          </div>
        </div>
        <div className="container-page mt-10">
          <p className="text-center text-sm font-semibold text-muted">RV interior temperature — power off, windows cracked · Outside: 85°F · No AC · Partial shade</p>
          <ol className="mx-auto mt-4 grid max-w-4xl gap-3 sm:grid-cols-4">
            {RV_CURVE.map((s, i) => (
              <li key={s.t} className="rounded-2xl bg-paper p-5 text-center shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-muted">{s.t}</p>
                <p className={`mt-1 font-display text-3xl font-semibold ${i === 0 ? "text-ink" : i === 1 ? "text-amber-600" : "text-red-600"}`}>{s.f}</p>
                <p className="text-sm font-bold">{s.label}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Recognize it</Eyebrow>
          <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">Symptoms of heatstroke in dogs</h2>
          <p className="mt-4 text-lg text-ink/75">Heatstroke doesn’t start dramatically. Early signs look like a tired dog on a warm day, which is exactly why it catches owners off guard. Knowing both stages can save your pet’s life.</p>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr_0.9fr]">
          <div className="rounded-3xl border border-line p-6">
            <h3 className="text-xl font-semibold">Early signs</h3>
            <ul className="mt-4 space-y-2.5">{EARLY.map((s) => <li key={s} className="flex gap-2.5"><Check className="mt-1 size-4 shrink-0 text-amber-600" aria-hidden />{s}</li>)}</ul>
          </div>
          <div className="rounded-3xl border-2 border-red-600/40 bg-red-50 p-6">
            <h3 className="text-xl font-semibold text-red-700">Severe — act now</h3>
            <ul className="mt-4 space-y-2.5">{SEVERE.map((s) => <li key={s} className="flex gap-2.5"><AlertTriangle className="mt-1 size-4 shrink-0 text-red-600" aria-hidden />{s}</li>)}</ul>
          </div>
          <img src={`/images/guides/rving/para-1-img.png`} alt="Dog resting inside an RV" loading="lazy" className="size-full min-h-64 rounded-3xl object-cover" />
        </div>
        <p className="mt-6 rounded-2xl bg-red-600 p-5 font-semibold text-white">If you see severe signs, don’t wait. Call your vet immediately and start cooling at the same time. Severe heatstroke can cause organ failure within minutes.</p>

        <div className="mt-16 text-center">
          <Eyebrow>Closely linked</Eyebrow>
          <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">Heatstroke and dehydration</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-ink/75">As a dog overheats, they lose water rapidly through panting. Once dehydration sets in, the cooling mechanism breaks down. Heat drives dehydration, dehydration drives more heat.</p>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {DEHYDRATION.map((d) => (
            <li key={d.level} className="rounded-3xl bg-sand p-6">
              <p className="font-display text-2xl font-semibold">{d.level}</p>
              <p className="text-sm font-bold text-signal">{d.loss}</p>
              <p className="mt-2 text-sm text-muted">{d.text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted">To check capillary refill time: press firmly on your dog’s gums until they turn white, release, and count. Under 2 seconds is healthy. Anything longer means dehydration is setting in.</p>
      </section>

      <section className="bg-sand py-16 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>Know your dog</Eyebrow>
            <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">Which dogs are most at risk?</h2>
            <p className="mt-4 text-lg text-ink/75">Any dog can get heatstroke. But some breeds reach dangerous temperatures faster, and at much lower ambient temperatures, than others.</p>
            <div className="mt-6 rounded-3xl bg-paper p-6">
              <p className="font-display text-lg font-semibold">Flat-faced breeds need special attention</p>
              <p className="mt-2 text-sm text-muted">Brachycephalic dogs (Bulldogs, Pugs, French Bulldogs, Shih Tzus) can’t pant efficiently due to their shortened airways. They can develop heatstroke during light exercise at just 70–75°F. For these breeds, monitoring isn’t optional.</p>
            </div>
          </div>
          <ul className="space-y-3 self-center">
            {RISK.map((r) => (
              <li key={r.who} className="rounded-2xl bg-paper p-4">
                <div className="flex justify-between text-sm"><span className="font-semibold">{r.who}</span><span className="font-bold text-clay-700">{r.level}</span></div>
                <div className="mt-2 h-2 rounded-full bg-sand"><div className="h-2 rounded-full bg-clay" style={{ width: r.w }} /></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Prevent it</Eyebrow>
          <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">Prevention of heatstroke in dogs</h2>
          <p className="mt-4 text-lg text-ink/75">Heatstroke is almost entirely preventable. These habits become second nature once you’ve done a few trips with your dog.</p>
        </div>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PREVENT.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-3xl border border-line p-6">
              <span className="flex size-11 items-center justify-center rounded-full bg-signal-50 text-signal"><Icon className="size-5" aria-hidden /></span>
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 grid items-center gap-8 rounded-3xl bg-ink p-8 text-white lg:grid-cols-[1fr_auto]">
          <div>
            <p className="font-display text-2xl font-semibold">The most overlooked risk: shore power failure</p>
            <p className="mt-3 text-white/80">Most owners focus on temperature. The real danger begins with a power interruption — AC goes off, temperatures start climbing, and a Wi-Fi monitor goes silent at the exact moment you need it most. A 4G cellular monitor with a backup battery solves this.</p>
          </div>
          <Link href="/products/pet-monitor-pro-plus" className="btn-primary px-7 py-3.5 text-base">Shop Pet Monitor <ArrowRight className="size-4" aria-hidden /></Link>
        </div>
      </section>

      <section className="bg-red-50 py-16 sm:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Emergency response</Eyebrow>
            <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">First aid for heatstroke in dogs</h2>
            <p className="mt-4 text-lg text-ink/75">Don’t wait to see if they improve. The window where first aid makes a real difference is short. Do these in order.</p>
          </div>
          <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1.3fr_1fr]">
            <ol className="space-y-3">
              {STEPS.map((s, i) => (
                <li key={s.t} className="flex gap-4 rounded-3xl bg-paper p-5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-red-600 font-display text-lg font-semibold text-white">{i + 1}</span>
                  <div><h3 className="text-lg font-semibold">{s.t}</h3><p className="mt-1 text-sm text-muted">{s.d}</p></div>
                </li>
              ))}
            </ol>
            <div className="space-y-4">
              <img src={`/images/guides/rving/para-3-img.png`} alt="Dog outdoors at a campsite" loading="lazy" className="aspect-[4/3] w-full rounded-3xl object-cover" />
              <div className="rounded-3xl bg-paper p-6">
                <p className="font-display text-lg font-semibold text-mint">Do</p>
                <ul className="mt-2 space-y-2 text-sm">{DO.map((d) => <li key={d} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-mint" aria-hidden />{d}</li>)}</ul>
                <p className="mt-5 font-display text-lg font-semibold text-red-600">Don’t</p>
                <ul className="mt-2 space-y-2 text-sm">{DONT.map((d) => <li key={d} className="flex gap-2"><X className="mt-0.5 size-4 shrink-0 text-red-600" aria-hidden />{d}</li>)}</ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>RV owners</Eyebrow>
          <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">Monitoring your pet in an RV</h2>
          <div className="mt-4 space-y-4 text-lg leading-relaxed text-ink/75">
            <p>There’s a realistic limit to personal vigilance. You can’t watch the temperature every minute. You can’t be in the RV and on the trail at the same time. And if your RV loses shore power, you may have no idea until you return.</p>
            <p><strong className="text-ink">What separates 4G monitoring from Wi-Fi:</strong> when shore power fails, your Wi-Fi router goes down. A Wi-Fi sensor goes silent at the exact moment you most need it. A 4G monitor with a backup battery keeps alerting regardless.</p>
            <p><strong className="text-ink">Two alerts, two layers of protection.</strong> Power loss alert: fires the instant your RV loses shore power — before temperatures even start climbing. Temperature alert: fires when conditions cross your threshold.</p>
          </div>
        </div>
      </section>

      <section className="bg-sand py-16 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[0.7fr_1.6fr]">
          <h2 className="text-3xl font-semibold sm:text-4xl">Frequently asked questions</h2>
          <Faq items={FAQS} withSchema />
        </div>
      </section>
    </>
  );
}
