import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-4xl font-semibold">This page wandered off.</h1>
      <p className="mt-3 text-muted">Let&apos;s get you back on track.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">Home</Link>
        <Link href="/shop" className="btn-secondary">Shop all</Link>
        <Link href="/find-your-waggle" className="btn-secondary">Find Your Waggle</Link>
      </div>
    </div>
  );
}
