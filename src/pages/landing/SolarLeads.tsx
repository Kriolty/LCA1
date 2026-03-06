import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LandingLayout } from '../../components/layout/LandingLayout';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { supabase } from '../../lib/supabase';
import { captureUTMParams, trackUTM, getStoredUTMParams } from '../../lib/utmTracking';
import {
  Sun,
  TrendingUp,
  Shield,
  Target,
  CheckCircle,
  Zap,
  Users,
  DollarSign,
  ArrowRight,
} from 'lucide-react';

export const SolarLeads = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    location: '',
    monthlySalesTarget: '',
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
        vertical: 'Solar',
        source: 'solar_landing_page',
        status: 'new',
        notes: `Monthly sales target: ${formData.monthlySalesTarget}`,
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
            how we can help you grow your solar business with exclusive, high-quality leads.
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
      <section className="bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-yellow-100 px-4 py-2 rounded-full mb-6">
                <Sun className="h-5 w-5 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800">Solar Energy Leads</span>
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Power Your Solar Business with Exclusive Leads
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Connect with homeowners and businesses actively seeking solar installations.
                Pre-qualified, exclusive leads delivered to your territory.
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
                    <h3 className="font-semibold text-gray-900 mb-1">Pre-Qualified Leads</h3>
                    <p className="text-gray-600 text-sm">
                      Every lead is verified and actively seeking solar solutions
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
                  <div className="flex-shrink-0 p-3 bg-yellow-100 rounded-lg">
                    <Zap className="h-6 w-6 text-yellow-600" />
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
              Why Solar Installers Choose Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join hundreds of solar companies growing their business with our exclusive lead marketplace
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="inline-flex p-3 bg-green-100 rounded-lg mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                High Conversion Rates
              </h3>
              <p className="text-gray-600">
                Our leads convert at 3x industry average. Every contact is actively seeking
                solar quotes and ready to engage with your business.
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
                Every lead includes verified contact details, property information, and
                detailed solar requirements. Bad lead? We'll replace it free.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="inline-flex p-3 bg-yellow-100 rounded-lg mb-4">
                <Users className="h-8 w-8 text-yellow-600" />
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

      <section className="bg-gray-50 py-20" id="lead-form">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Start Receiving Solar Leads Today
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
                  placeholder="Solar Solutions Pty Ltd"
                />

                <Input
                  label="Contact Name"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  required
                  placeholder="John Smith"
                />

                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="john@solarsolutions.com.au"
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
                  placeholder="e.g., Sydney, NSW"
                />

                <Input
                  label="Monthly Sales Target"
                  value={formData.monthlySalesTarget}
                  onChange={(e) => setFormData({ ...formData, monthlySalesTarget: e.target.value })}
                  required
                  placeholder="e.g., 10 installations"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <DollarSign className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <p className="font-medium mb-1">Flexible Pricing</p>
                    <p>
                      Pay per lead from $25-$150 based on quality and exclusivity.
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
                Get Started with Solar Leads
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>

              <p className="text-center text-sm text-gray-500">
                By submitting this form, you agree to receive information about our services.
              </p>
            </form>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Ready to Grow Your Solar Business?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join Australia's leading solar companies who trust us to deliver exclusive,
            high-quality leads that convert.
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
