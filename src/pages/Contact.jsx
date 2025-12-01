import { Helmet } from 'react-helmet-async';
import ContactForm from '../components/ContactForm';

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact — Biogleam | Shine Your Brand Online</title>
        <meta
          name="description"
          content="Get in touch with Biogleam — Shine Your Brand Online. Request a custom quote on your website or web application project."
        />
      </Helmet>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Get in Touch</h1>
            <p className="text-xl text-gray-600">
              Tell us about your project and we'll get back to you within 24 hours.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <ContactForm />
          </div>

          <div className="mt-12 text-center text-gray-600">
            <p className="mb-2">
              <strong>Email:</strong>{' '}
              <a href="mailto:hello@biogleam.com" className="text-accent hover:underline">
                hello@biogleam.com
              </a>
            </p>
            <p>
              <strong>Response time:</strong> Within 24 hours
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
