import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { api } from '../../lib/api';
import { useContent } from '../../context/ContentContext';

const empty = { name: '', phone: '', email: '', subject: 'General enquiry', message: '' };
const SUBJECTS = ['General enquiry', 'Seva booking enquiry', 'Festival / event enquiry', 'Donation enquiry', 'Other'];

export default function ContactForm({ defaultSubject }) {
  const { content, backendOnline } = useContent();
  const [form, setForm] = useState({ ...empty, subject: defaultSubject && SUBJECTS.includes(defaultSubject) ? defaultSubject : empty.subject, message: defaultSubject && !SUBJECTS.includes(defaultSubject) ? `Enquiry about: ${defaultSubject}\n\n` : '' });
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle'); // idle | sending | sent | error
  const [errMsg, setErrMsg] = useState('');

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const er = {};
    if (form.name.trim().length < 2) er.name = 'Please enter your name.';
    if (!form.phone.trim() && !form.email.trim()) er.phone = 'Please give a phone number or email so we can reply.';
    if (form.phone.trim() && !/^[+\d][\d\s-]{6,}$/.test(form.phone.trim())) er.phone = 'Please enter a valid phone number.';
    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim())) er.email = 'Please enter a valid email.';
    if (form.message.trim().length < 5) er.message = 'Please write a short message.';
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (!backendOnline) {
      // No backend: open the visitor's email app with the message prefilled.
      const body = `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\n\n${form.message}`;
      window.location.href = `mailto:${content.contact.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
      setState('sent');
      return;
    }
    setState('sending');
    try {
      await api('/api/contact', { method: 'POST', body: form });
      setState('sent');
      setForm(empty);
    } catch (err) {
      setErrMsg(err.message);
      setState('error');
    }
  };

  if (state === 'sent') {
    return (
      <div className="card flex flex-col items-center p-10 text-center" role="status">
        <CheckCircle2 className="h-14 w-14 text-emerald-600" aria-hidden="true" />
        <p className="mt-4 font-display text-3xl text-maroon-900">Thank you</p>
        <p className="mt-2 max-w-sm text-ink-700/80">{backendOnline ? 'Your message has been received. The temple office will get back to you soon.' : 'Your email app should open with the message ready to send.'}</p>
        <button onClick={() => setState('idle')} className="btn-outline mt-6">Send another message</button>
      </div>
    );
  }

  const field = (k, label, props = {}) => (
    <div>
      <label htmlFor={`cf-${k}`} className="label">{label}</label>
      <input id={`cf-${k}`} className="input" value={form[k]} onChange={set(k)} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `cf-${k}-err` : undefined} {...props} />
      {errors[k] && <p id={`cf-${k}-err`} className="mt-1 text-sm text-maroon-600">{errors[k]}</p>}
    </div>
  );

  return (
    <form onSubmit={submit} noValidate className="card space-y-5 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        {field('name', 'Full name *', { autoComplete: 'name' })}
        {field('phone', 'Phone', { type: 'tel', autoComplete: 'tel', inputMode: 'tel' })}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {field('email', 'Email', { type: 'email', autoComplete: 'email' })}
        <div>
          <label htmlFor="cf-subject" className="label">Subject</label>
          <select id="cf-subject" className="input" value={form.subject} onChange={set('subject')}>
            {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="cf-message" className="label">Message *</label>
        <textarea id="cf-message" rows={5} className="input resize-y" value={form.message} onChange={set('message')} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'cf-message-err' : undefined} />
        {errors.message && <p id="cf-message-err" className="mt-1 text-sm text-maroon-600">{errors.message}</p>}
      </div>
      {state === 'error' && (
        <p className="flex items-center gap-2 rounded-xl bg-maroon-50 p-3 text-sm text-maroon-700" role="alert"><AlertCircle className="h-4 w-4" aria-hidden="true" /> {errMsg || 'Something went wrong. Please try again.'}</p>
      )}
      <button type="submit" disabled={state === 'sending'} className="btn-primary w-full sm:w-auto">
        {state === 'sending' ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
        {state === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
