import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Hammer, Landmark, Sparkles, Check, Copy, MessageCircle, HeartHandshake, ShieldCheck, ArrowRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { usePageMeta } from '../hooks/usePageMeta';
import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';

export default function Development() {
  const { content } = useContent();
  const { development, donation, temple } = content;
  const b = donation.bank || {};
  const [copiedKey, setCopiedKey] = useState(null);

  usePageMeta('Temple Development – Taamra Aachchhadana', `Taamra Aachchhadana copper roofing project for Sandhya Mantapa at ${temple.name}, ${temple.village}.`);

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
    `Namaskara, I would like to contribute towards the Taamra Aachchhadana (Copper Roofing Project) at Shree Veer Vittal Mukhyaprana Temple, Maraballi.\n\nRequired details for acknowledgement:\n- Full Name:\n- Postal Address:\n- Contact Number:\n- UTR / Reference Number:\n- Transaction ID:\n- Date of Transfer:`
  );

  return (
    <>
      <PageHero
        eyebrow="Sacred Initiative"
        title="Taamra Aachchhadana"
        subtitle="Copper Roofing Project for the Sandhya Mantapa"
        crumb="Development"
      />

      {/* Overview & Sacred Appeal */}
      <section className="section">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full bg-saffron-500/10 px-4 py-1.5 text-sm font-semibold text-saffron-700">
                <Hammer className="h-4 w-4" aria-hidden="true" /> Development Initiative
              </div>
              <h2 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">
                Covering the Sandhya Mantapa with Sacred Copper Sheets
              </h2>
              <p className="mt-6 text-lg text-ink-700/85 leading-relaxed">
                {development.description}
              </p>
              <p className="mt-4 text-ink-700/80 leading-relaxed">
                The Sandhya Mantapa is an integral part of the temple architecture where daily sandhya vandana, religious rites, and community prayer gatherings take place. Installing durable copper sheets will ensure long-term preservation, traditional sanctity, and protection against coastal monsoons for generations to come.
              </p>

              {/* Total Estimated Cost Highlight */}
              <div className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-gold-300/60 bg-cream-100 p-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-saffron-600">Total Estimated Cost</p>
                  <p className="font-display text-4xl font-bold text-maroon-950 sm:text-5xl">{development.totalCostFormatted}</p>
                </div>
                <div className="h-10 w-px bg-cream-300 hidden sm:block" aria-hidden="true" />
                <p className="max-w-xs text-sm text-ink-700/80">
                  Estimated budget covering materials, craftsmanship, structural work, and specialized roofing labour.
                </p>
              </div>
            </Reveal>

            {/* Sacred Appeal Card */}
            <Reveal delay={0.1} className="relative overflow-hidden rounded-3xl border-2 border-gold-400/50 bg-maroon-950 p-8 text-cream-100 shadow-soft sm:p-10">
              <div className="border-temple mb-6" aria-hidden="true" />
              <div className="flex items-center gap-3">
                <Sparkles className="h-7 w-7 text-gold-300" aria-hidden="true" />
                <h3 className="font-display text-2xl font-semibold !text-cream-50">Appeal to Devotees</h3>
              </div>
              <blockquote className="mt-6 border-l-2 border-gold-400/60 pl-5 font-serif text-lg italic text-cream-100/95 leading-relaxed">
                "{development.appeal}"
              </blockquote>
              <p className="mt-6 font-display text-base font-semibold text-gold-300">
                — Shree Veer Vittal Mukhyaprana Trust
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#contribute" className="btn-primary">
                  Contribute Now <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link to="/contact" className="btn-ghost">
                  Contact Trust
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Budget Breakdown Section */}
      <section className="section bg-cream-200/50">
        <div className="container-x">
          <SectionHeading
            eyebrow="Financial Transparency"
            title="Estimated Project Budget"
            subtitle="Carefully budgeted breakdown for the execution of the Taamra Aachchhadana copper roofing work."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {development.items.map((item, idx) => (
              <Reveal key={item.category} delay={idx * 0.08} className="card flex flex-col p-7 transition hover:-translate-y-1 hover:shadow-soft">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-saffron-500/10 text-saffron-700">
                    <Hammer className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="font-display text-3xl font-bold text-maroon-900">{item.amountFormatted}</span>
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold text-maroon-950">{item.category}</h3>
                <p className="mt-2 flex-1 text-ink-700/80 leading-relaxed">{item.description}</p>
                <div className="mt-6 border-t border-cream-300 pt-4 text-xs font-semibold uppercase tracking-wider text-saffron-600">
                  Component #{idx + 1}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mx-auto mt-10 max-w-2xl rounded-2xl border border-gold-300/60 bg-cream-50 p-6 text-center shadow-sm">
            <p className="font-display text-2xl font-semibold text-maroon-900">
              Total Project Cost: <span className="gold-text">{development.totalCostFormatted}</span>
            </p>
            <p className="mt-2 text-sm text-ink-700/80">
              Every offering directly supports this development initiative. Contributions of any amount are accepted with humble gratitude.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Bank & Contribution Details */}
      <section id="contribute" className="section scroll-mt-24">
        <div className="container-x">
          <div className="mx-auto max-w-4xl">
            <SectionHeading
              eyebrow="Direct Contributions"
              title="Bank & Transfer Details"
              subtitle="Devotees can transfer their contributions directly to the official trust account via NEFT, RTGS, IMPS, or UPI."
            />

            <Reveal className="mt-10 overflow-hidden rounded-3xl border border-gold-300/50 bg-maroon-950 text-cream-100 shadow-soft">
              <div className="border-temple" aria-hidden="true" />
              <div className="p-8 sm:p-10">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-gold-200">Beneficiary Trust</span>
                    <h3 className="mt-1 font-display text-2xl font-bold text-cream-50 sm:text-3xl">{b.accountName}</h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-4 py-1 text-xs font-semibold text-emerald-300">
                    <ShieldCheck className="h-4 w-4" aria-hidden="true" /> Official Account
                  </span>
                </div>

                <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center justify-between rounded-xl bg-white/5 p-4">
                    <div>
                      <dt className="text-xs uppercase tracking-widest text-gold-200">Bank Name</dt>
                      <dd className="mt-1 font-semibold text-cream-50">{b.bankName}</dd>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-white/5 p-4">
                    <div>
                      <dt className="text-xs uppercase tracking-widest text-gold-200">Branch</dt>
                      <dd className="mt-1 font-semibold text-cream-50">{b.branch}</dd>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-white/5 p-4 sm:col-span-2">
                    <div>
                      <dt className="text-xs uppercase tracking-widest text-gold-200">Account Number</dt>
                      <dd className="mt-1 font-mono text-xl font-bold tracking-wider text-cream-50 sm:text-2xl">{b.accountNumber}</dd>
                    </div>
                    <button
                      onClick={() => copy(b.accountNumber, 'acc')}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-gold-300/40 bg-white/10 px-3 py-1.5 text-xs font-medium text-gold-200 hover:bg-white/20"
                      aria-label="Copy Account Number"
                    >
                      {copiedKey === 'acc' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                      {copiedKey === 'acc' ? 'Copied' : 'Copy'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-white/5 p-4">
                    <div>
                      <dt className="text-xs uppercase tracking-widest text-gold-200">IFSC Code</dt>
                      <dd className="mt-1 font-mono text-lg font-semibold text-cream-50">{b.ifsc}</dd>
                    </div>
                    <button
                      onClick={() => copy(b.ifsc, 'ifsc')}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-gold-300/40 bg-white/10 px-3 py-1.5 text-xs font-medium text-gold-200 hover:bg-white/20"
                      aria-label="Copy IFSC Code"
                    >
                      {copiedKey === 'ifsc' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                      {copiedKey === 'ifsc' ? 'Copied' : 'Copy'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-white/5 p-4">
                    <div className="min-w-0 pr-2">
                      <dt className="text-xs uppercase tracking-widest text-gold-200">UPI ID</dt>
                      <dd className="mt-1 truncate font-mono text-sm font-semibold text-cream-50 sm:text-base">{b.upiId}</dd>
                    </div>
                    <button
                      onClick={() => copy(b.upiId, 'upi')}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-gold-300/40 bg-white/10 px-3 py-1.5 text-xs font-medium text-gold-200 hover:bg-white/20"
                      aria-label="Copy UPI ID"
                    >
                      {copiedKey === 'upi' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                      {copiedKey === 'upi' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </dl>

                {/* WhatsApp Confirmation Instructions */}
                <div className="mt-8 rounded-2xl border border-gold-400/30 bg-maroon-900/60 p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-6 w-6 text-emerald-400" aria-hidden="true" />
                    <h4 className="font-display text-xl font-semibold !text-cream-50">Share Payment Details on WhatsApp</h4>
                  </div>
                  <p className="mt-2 text-sm text-cream-100/85 leading-relaxed">
                    Devotees making donations through NEFT, RTGS or IMPS should share their payment details through WhatsApp so the trust can record your contribution and seva details.
                  </p>
                  <div className="mt-4 rounded-xl bg-maroon-950/80 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gold-200">Required Information:</p>
                    <ul className="mt-2 grid grid-cols-2 gap-2 text-sm text-cream-100/90 sm:grid-cols-3">
                      <li>• Full Name</li>
                      <li>• Postal Address</li>
                      <li>• Contact Number</li>
                      <li>• UTR / Reference Number</li>
                      <li>• Transaction ID</li>
                      <li>• Date of Transfer</li>
                    </ul>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <a
                      href={`https://wa.me/919980150877?text=${whatsappMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" /> Share Details on WhatsApp (99801 50877)
                    </a>
                    <Link to="/contact" className="btn-ghost">
                      Contact Trust Members
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
