import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LandingLayout } from '../../components/layout/LandingLayout';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { supabase } from '../../lib/supabase';
import { captureUTMParams, trackUTM, getStoredUTMParams } from '../../lib/utmTracking';
import {
  Home,
  TrendingUp,
  Shield,
  Target,
  CheckCircle,
  MapPin,
  Users,
  DollarSign,
  ArrowRight,
} from 'lucide-react';

export const PropertyLeads = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    location: '',
    propertyTypes: '',
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
        vertical: 'Property',
        source: 'property_landing_page',
        status: 'new',
        notes: `Property types: ${formData.propertyTypes}`,
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Thank You!</h1>
          <p className="text-xl text-gray-600 mb-8">
            We'll contact you within 24 hours to discuss your property investment lead requirements.
          </p>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </LandingLayout>
    );
  }

  return (
    <LandingLayout>
      <section className="bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full mb-6">
                <Home className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Property Investment Leads</span>
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Connect with Serious Property Investors
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Access verified leads from investors actively seeking residential, commercial,
                and development opportunities across Australia.
              </p>
              <Button size="lg" onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}>
                Get Started
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-green-100 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Verified Investors</h3>
                    <p className="text-gray-600 text-sm">
                      Pre-qualified leads with proven investment capacity
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-blue-100 rounded-lg">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Location Targeting</h3>
                    <p className="text-gray-600 text-sm">
                      Leads matched to your specific markets and regions
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-cyan-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">High-Value Deals</h3>
                    <p className="text-gray-600 text-sm">
                      Average deal size $500K+, serious investors only
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
              Property Investment Lead Types
            </h2>
            <p className="text-xl text-gray-600">
              We deliver qualified leads across all property investment categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Residential Investment
              </h3>
              <p className="text-gray-600 mb-4">
                Houses, apartments, and units for buy-and-hold or renovation strategies.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>First-time investors</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Portfolio builders</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Renovation opportunities</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Commercial Property
              </h3>
              <p className="text-gray-600 mb-4">
                Retail, office, and industrial properties with strong yield potential.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Income-focused investors</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>SMSF investors</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Institutional buyers</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Development Sites
              </h3>
              <p className="text-gray-600 mb-4">
                Land and properties suitable for subdivision or development projects.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Developers</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Subdivision opportunities</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Joint venture partners</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20" id="lead-form">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Start Receiving Property Leads
            </h2>
            <p className="text-xl text-gray-600">
              Connect with qualified property investors in your target markets
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
                />
                <Input
                  label="Contact Name"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <Input
                  label="Phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
                <Input
                  label="Target Location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                  placeholder="e.g., Melbourne, VIC"
                />
                <Input
                  label="Property Types"
                  value={formData.propertyTypes}
                  onChange={(e) => setFormData({ ...formData, propertyTypes: e.target.value })}
                  required
                  placeholder="e.g., Residential, Commercial"
                />
              </div>

              <Button type="submit" size="lg" className="w-full" loading={submitting}>
                Get Started
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </form>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
};
