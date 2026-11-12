import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HandHeart, Landmark, Flower2, Hammer, Check, Copy, MessageCircle, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { usePageMeta } from '../hooks/usePageMeta';
import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';

export default function Donate() {
  const { content } = useContent();
  const { donation, temple, development, annualSeva } = content;
  usePageMeta('Donation & Seva Contributions', `Bank details and donation instructions for ${temple.name}, ${temple.village}.`);

  const b = donation.bank || {};
  const [copiedKey, setCopiedKey] = useState(null);

  const copy = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      // clipboard blocked
    }
  };

  const whatsappMsg = encodeURIComponent(
    `Namaskara, I have made a contribution to Shree Veer Vittal Mukhyaprana Trust.\n\nDonation Details:\n- Purpose: (Taamra Aachchhadana / Annual Seva / Temple Pooja)\n- Full Name:\n- Postal Address:\n- Contact Number:\n- UTR / Reference Number:\n- Transaction ID:\n- Date of Transfer:`
  );

  return (
    <>
      <PageHero
        eyebrow="Seva Through Giving"
        title="Donations & Seva Contributions"
        subtitle={donation.intro}
        crumb="Donate"
      />

      {/* Purpose Cards */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="Offerings & Seva"
            title="Ways to Support the Temple"
            subtitle="Your generous contributions help sustain traditional worship, the annual seva arrangement, and sacred development initiatives."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Reveal delay={0} className="card flex flex-col justify-between p-7 text-left">
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-saffron-500/10 text-saffron-700">
                  <Hammer className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="mt-4 block text-xs font-semibold uppercase tracking-wider text-saffron-700">Development Project</span>
                <h3 className="mt-1 font-display text-2xl font-bold text-maroon-950">Taamra Aachchhadana</h3>
                <p className="mt-3 text-ink-700/80 leading-relaxed">
                  Support covering the Sandhya Mantapa rooftop with sacred copper sheets. Total estimated project cost: ₹30,00,000.
                </p>
              </div>
              <Link to="/development" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-saffron-700 hover:text-maroon-900">
                View Project Details <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Reveal>

            <Reveal delay={0.08} className="card flex flex-col justify-between p-7 text-left border-2 border-gold-400/50">
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-200/50 text-maroon-900">
                  <HeartHandshake className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="mt-4 block text-xs font-semibold uppercase tracking-wider text-saffron-700">Annual Worship</span>
                <h3 className="mt-1 font-display text-2xl font-bold text-maroon-950">Annual Seva (₹1,025)</h3>
                <p className="mt-3 text-ink-700/80 leading-relaxed">
                  Participate in the annual seva arrangement under which worship is performed on a designated day every year on your family's behalf.
                </p>
              </div>
              <Link to="/seva" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-saffron-700 hover:text-maroon-900">
                Annual Seva Info <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Reveal>

            <Reveal delay={0.16} className="card flex flex-col justify-between p-7 text-left">
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-saffron-500/10 text-saffron-700">
                  <Flower2 className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="mt-4 block text-xs font-semibold uppercase tracking-wider text-saffron-700">General Worship</span>
                <h3 className="mt-1 font-display text-2xl font-bold text-maroon-950">Temple Worship & Maintenance</h3>
                <p className="mt-3 text-ink-700/80 leading-relaxed">
                  Support traditional daily poojas, flowers, oil lamps, naivedya, and regular maintenance of the temple shrine.
                </p>
              </div>
              <a href="#bank-details" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-saffron-700 hover:text-maroon-900">
                Transfer Details <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Reveal>
          </div>

          {/* Bank Details Section */}
          <div id="bank-details" className="scroll-mt-24">
            <Reveal className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-3xl border border-gold-300/50 bg-maroon-950 text-cream-100 shadow-soft">
              <div className="border-temple" aria-hidden="true" />
              <div className="p-8 sm:p-12">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <HandHeart className="h-8 w-8 text-gold-300" aria-hidden="true" />
                    <div>
                      <span className="text-xs uppercase tracking-widest text-gold-200">Official Bank Details</span>
                      <h2 className="text-2xl font-bold !text-cream-50 sm:text-3xl">Shree Veer Vittal Mukhyaprana Trust</h2>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3.5 py-1 text-xs font-semibold text-emerald-300">
                    <ShieldCheck className="h-4 w-4" aria-hidden="true" /> Verified Account
                  </span>
                </div>

                <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center justify-between rounded-xl bg-white/5 p-4">
                    <div>
                      <dt className="text-xs uppercase tracking-widest text-gold-200">Account Name</dt>
                      <dd className="mt-1 font-semibold text-cream-50">{b.accountName}</dd>
                    </div>
                    <button onClick={() => copy(b.accountName, 'accName')} className="rounded-lg bg-white/10 p-2 text-gold-200 hover:bg-white/20" title="Copy Account Name">
                      {copiedKey === 'accName' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-white/5 p-4">
                    <div>
                      <dt className="text-xs uppercase tracking-widest text-gold-200">Bank & Branch</dt>
                      <dd className="mt-1 font-semibold text-cream-50">{b.bankName}, {b.branch}</dd>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-white/5 p-4 sm:col-span-2">
                    <div>
                      <dt className="text-xs uppercase tracking-widest text-gold-200">Account Number</dt>
                      <dd className="mt-1 font-mono text-xl font-bold tracking-wider text-cream-50 sm:text-2xl">{b.accountNumber}</dd>
                    </div>
                    <button onClick={() => copy(b.accountNumber, 'accNo')} className="inline-flex items-center gap-1.5 rounded-lg border border-gold-300/40 bg-white/10 px-3 py-1.5 text-xs font-medium text-gold-200 hover:bg-white/20">
                      {copiedKey === 'accNo' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                      {copiedKey === 'accNo' ? 'Copied' : 'Copy'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-white/5 p-4">
                    <div>
                      <dt className="text-xs uppercase tracking-widest text-gold-200">IFSC Code</dt>
                      <dd className="mt-1 font-mono text-lg font-semibold text-cream-50">{b.ifsc}</dd>
                    </div>
                    <button onClick={() => copy(b.ifsc, 'ifsc')} className="inline-flex items-center gap-1.5 rounded-lg border border-gold-300/40 bg-white/10 px-3 py-1.5 text-xs font-medium text-gold-200 hover:bg-white/20">
                      {copiedKey === 'ifsc' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                      {copiedKey === 'ifsc' ? 'Copied' : 'Copy'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-white/5 p-4">
                    <div className="min-w-0 pr-2">
                      <dt className="text-xs uppercase tracking-widest text-gold-200">UPI ID</dt>
                      <dd className="mt-1 truncate font-mono text-sm font-semibold text-cream-50 sm:text-base">{b.upiId}</dd>
                    </div>
                    <button onClick={() => copy(b.upiId, 'upiId')} className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-gold-300/40 bg-white/10 px-3 py-1.5 text-xs font-medium text-gold-200 hover:bg-white/20">
                      {copiedKey === 'upiId' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                      {copiedKey === 'upiId' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </dl>

                {/* WhatsApp Confirmation Instructions */}
                <div className="mt-8 rounded-2xl border border-gold-400/30 bg-maroon-900/60 p-6 sm:p-8">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-6 w-6 text-emerald-400" aria-hidden="true" />
                    <h3 className="font-display text-2xl font-semibold !text-cream-50">Donation Instructions</h3>
                  </div>
                  <p className="mt-2 text-sm text-cream-100/85 leading-relaxed">
                    Devotees making donations through NEFT, RTGS or IMPS should share their payment details through WhatsApp so that the temple trust can acknowledge your contribution and record your seva details.
                  </p>

                  <div className="mt-5 rounded-xl bg-maroon-950/80 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gold-200">Required Information to Share:</p>
                    <ul className="mt-3 grid grid-cols-1 gap-2.5 text-sm text-cream-100/90 sm:grid-cols-2 md:grid-cols-3">
                      <li className="flex items-center gap-2">• Full Name</li>
                      <li className="flex items-center gap-2">• Postal Address</li>
                      <li className="flex items-center gap-2">• Contact Number</li>
                      <li className="flex items-center gap-2">• UTR / Reference Number</li>
                      <li className="flex items-center gap-2">• Transaction ID</li>
                      <li className="flex items-center gap-2">• Date of Transfer</li>
                    </ul>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <a
                      href={`https://wa.me/919980150877?text=${whatsappMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" /> Share Details on WhatsApp (+91 99801 50877)
                    </a>
                    <Link to="/contact" className="btn-ghost">
                      <Landmark className="h-4 w-4" aria-hidden="true" /> Contact Trust Members
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
