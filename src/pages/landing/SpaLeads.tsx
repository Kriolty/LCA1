import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LandingLayout } from '../../components/layout/LandingLayout';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { supabase } from '../../lib/supabase';
import { captureUTMParams, trackUTM, getStoredUTMParams } from '../../lib/utmTracking';
import {
  Waves,
  TrendingUp,
  Shield,
  Target,
  CheckCircle,
  Droplets,
  Users,
  DollarSign,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const SpaLeads = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    location: '',
    installationTypes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    captureUTMParams();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const utmParams = getStoredUTMParams();

      const { data: prospectData, error } = await supabase.from('prospects').insert({
        business_name: formData.businessName,
        contact_name: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        vertical: 'Spas',
        source: 'spa_landing_page',
        status: 'new',
        notes: `Installation types: ${formData.installationTypes}`,
      }).select().single();

      if (error) throw error;

      if (prospectData) {
        await trackUTM(prospectData.id);
      }

      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <LandingLayout>
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex p-4 bg-green-100 rounded-full mb-6">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Thank You for Your Interest!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            We've received your information and will be in touch within 24 hours to discuss
            how we can help you grow your spa business with exclusive, high-quality leads.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button onClick={() => navigate('/')}>
              Back to Home
            </Button>
            <Button variant="outline" onClick={() => navigate('/login')}>
              Sign In
            </Button>
          </div>
        </div>
      </LandingLayout>
    );
  }

  return (
    <LandingLayout>
      <section className="bg-gradient-to-br from-cyan-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-cyan-100 px-4 py-2 rounded-full mb-6">
                <Waves className="h-5 w-5 text-cyan-600" />
                <span className="text-sm font-medium text-cyan-800">Spa & Hot Tub Leads</span>
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Grow Your Spa Business with Premium Leads
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Connect with homeowners actively seeking spa and hot tub installations.
                Pre-qualified, exclusive leads delivered to your service area.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}>
                  Get Started
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
                <Button variant="outline" size="lg" onClick={() => navigate('/register')}>
                  View Pricing
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-green-100 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Pre-Qualified Buyers</h3>
                    <p className="text-gray-600 text-sm">
                      Every lead is verified and ready to purchase a spa or hot tub
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-blue-100 rounded-lg">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Territory Exclusivity</h3>
                    <p className="text-gray-600 text-sm">
                      Leads matched to your service areas with no competition
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-cyan-100 rounded-lg">
                    <Sparkles className="h-6 w-6 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Real-Time Delivery</h3>
                    <p className="text-gray-600 text-sm">
                      Receive leads instantly via dashboard, email, and SMS
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Spa Installers Choose Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join dozens of spa retailers and installers growing their business with our exclusive lead marketplace
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="inline-flex p-3 bg-green-100 rounded-lg mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                High-Value Sales
              </h3>
              <p className="text-gray-600">
                Average spa installation value $8,000-$25,000. Every lead represents
                a significant revenue opportunity for your business.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="inline-flex p-3 bg-blue-100 rounded-lg mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Quality Guaranteed
              </h3>
              <p className="text-gray-600">
                Every lead includes property type, available space, budget range, and timeline.
                Bad lead? We'll replace it free.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="inline-flex p-3 bg-cyan-100 rounded-lg mb-4">
                <Users className="h-8 w-8 text-cyan-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Dedicated Support
              </h3>
              <p className="text-gray-600">
                Our team helps optimize your lead flow, territory settings, and provides
                ongoing support to maximize your ROI.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-blue-50 to-cyan-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Lead Types We Deliver
            </h2>
            <p className="text-xl text-gray-600">
              All leads are pre-qualified with property details, budget, and timeline
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="inline-flex p-3 bg-cyan-100 rounded-lg mb-4">
                <Droplets className="h-8 w-8 text-cyan-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Hot Tub Installations
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span>Above-ground hot tubs</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span>In-ground spa installations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span>Portable spa solutions</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span>Luxury spa packages</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="inline-flex p-3 bg-blue-100 rounded-lg mb-4">
                <Waves className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Swim Spas
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span>Exercise swim spas</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span>Dual-zone swim spas</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span>Compact fitness spas</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span>Premium wellness systems</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20" id="lead-form">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Start Receiving Spa Leads Today
            </h2>
            <p className="text-xl text-gray-600">
              Fill out the form below and we'll set up your account within 24 hours
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Business Name"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  required
                  placeholder="Premium Spas Australia"
                />

                <Input
                  label="Contact Name"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  required
                  placeholder="Sarah Johnson"
                />

                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="sarah@premiumspas.com.au"
                />

                <Input
                  label="Phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  placeholder="0400 000 000"
                />

                <Input
                  label="Service Area"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                  placeholder="e.g., Gold Coast, QLD"
                />

                <Input
                  label="Installation Types"
                  value={formData.installationTypes}
                  onChange={(e) => setFormData({ ...formData, installationTypes: e.target.value })}
                  required
                  placeholder="e.g., Hot Tubs, Swim Spas"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <DollarSign className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <p className="font-medium mb-1">Flexible Pricing</p>
                    <p>
                      Pay per lead from $40-$200 based on lead quality and exclusivity.
                      No setup fees, no monthly minimums.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                loading={submitting}
              >
                Get Started with Spa Leads
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>

              <p className="text-center text-sm text-gray-500">
                By submitting this form, you agree to receive information about our services.
              </p>
            </form>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Ready to Grow Your Spa Business?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join Australia's leading spa retailers and installers who trust us to deliver exclusive,
            high-quality leads that convert into sales.
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/register')}
          >
            Create Your Account
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </section>
    </LandingLayout>
  );
};
