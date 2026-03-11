import React, { useState, ChangeEvent, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { ContactFormState } from '../types.ts';

const INITIAL_FORM: ContactFormState = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

interface FormFieldProps {
  label: string;
  name: keyof ContactFormState;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label, name, type = 'text', placeholder, value, onChange, required,
}) => (
  <div className="form-field">
    <label htmlFor={`contact-${name}`} className="form-field__label">
      {label}
      {required && <span className="form-field__required" aria-hidden="true"> *</span>}
    </label>
    <input
      id={`contact-${name}`}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="form-field__input"
      aria-label={label}
    />
  </div>
);

interface TextareaFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextareaField: React.FC<TextareaFieldProps> = ({ value, onChange }) => (
  <div className="form-field">
    <label htmlFor="contact-message" className="form-field__label">Message</label>
    <textarea
      id="contact-message"
      name="message"
      placeholder="Tell us about your project or inquiry…"
      value={value}
      onChange={onChange}
      rows={4}
      className="form-field__textarea"
      aria-label="Message"
    />
  </div>
);

const ContactSection: React.FC = () => {
  const [form, setForm] = useState<ContactFormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(false);

    emailjs.send(
      'service_rd0mfzb',
      'template_352f6eg',
      {
        from_name:  form.name,
        from_email: form.email,
        phone:      form.phone || 'Not provided',
        message:    form.message,
      },
      'gjIkXTojwaoHdXxyi'
    )
    .then(() => {
      setSubmitting(false);
      setSubmitted(true);
      setForm(INITIAL_FORM);
    })
    .catch(() => {
      setSubmitting(false);
      setError(true);
    });
  };

  return (
    <section id="contact" className="contact-section" aria-label="Contact us">
      <div className="container">
        <div className="contact-section__grid">
          <div className="contact-section__intro">
            <h2 className="section-title section-title--white">
              We'd Love{' '}
              <span className="text-accent">To Hear</span>
              <br />
              From You.
            </h2>
          </div>

          <form
            className="contact-form"
            onSubmit={handleSubmit}
            noValidate
            aria-label="Contact form"
          >
            <FormField
              label="Name"
              name="name"
              placeholder="Your full name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <FormField
              label="Email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
            <FormField
              label="Phone"
              name="phone"
              type="tel"
              placeholder="+1 (000) 000-0000"
              value={form.phone}
              onChange={handleChange}
            />
            <TextareaField value={form.message} onChange={handleChange} />

            {!submitted ? (
              <button
                type="submit"
                className="btn btn--primary btn--full"
                disabled={submitting}
                aria-busy={submitting}
              >
                {submitting ? 'Sending…' : 'Send Message'}
              </button>
            ) : (
              <p className="contact-form__success" role="status" aria-live="polite">
                ✓ Message sent! We'll be in touch soon.
              </p>
            )}

            {error && (
              <p className="contact-form__error" role="alert">
                Something went wrong. Please try again or email us directly at info@chausobjekt.com
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
