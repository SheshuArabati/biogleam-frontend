import { Helmet } from 'react-helmet-async';
import PricingCard from '../components/PricingCard';

export default function Pricing() {
  return (
    <>
      <Helmet>
        <title>Pricing — Biogleam | Shine Your Brand Online</title>
        <meta
          name="description"
          content="Biogleam — Shine Your Brand Online. Simple, transparent pricing for custom websites and web applications."
        />
      </Helmet>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Pricing</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the package that fits your needs. All packages include a 14-day trial period.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: 'Starter',
                price: '₹25,000',
                description: 'Perfect for small businesses getting started online.',
                features: [
                  'Up to 5 pages',
                  'Responsive design',
                  'Basic SEO',
                  'Contact form',
                  '2 weeks delivery',
                  '3 months support',
                ],
                ctaText: 'Get Started',
                popular: false,
              },
              {
                name: 'Pro',
                price: '₹50,000',
                description: 'Ideal for businesses needing advanced features.',
                features: [
                  'Unlimited pages',
                  'Custom design',
                  'Advanced SEO',
                  'Booking/ordering system',
                  'Payment integration',
                  '4-6 weeks delivery',
                  '6 months support',
                ],
                ctaText: 'Get Started',
                popular: true,
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                description: 'Tailored solutions for complex requirements.',
                features: [
                  'Custom web app',
                  'API development',
                  'Third-party integrations',
                  'Dedicated support',
                  'SLA guarantee',
                  '8+ weeks delivery',
                  '12 months support',
                ],
                ctaText: 'Contact Us',
                popular: false,
              },
            ].map((pricing, index) => (
              <PricingCard key={pricing.name} index={index} {...pricing} />
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Not sure which package is right for you?{' '}
              <a href="/contact" className="text-accent font-semibold hover:underline">
                Get a custom quote
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
