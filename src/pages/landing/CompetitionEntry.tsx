import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LandingLayout } from '../../components/layout/LandingLayout';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { supabase } from '../../lib/supabase';
import { captureUTMParams } from '../../lib/utmTracking';
import { Trophy, CheckCircle, AlertCircle } from 'lucide-react';

interface Competition {
  id: string;
  name: string;
  description: string;
  prize_description: string;
  prize_value: number;
  start_date: string;
  end_date: string;
  terms_conditions: string;
  consent_text: string;
  target_audience: string;
  status: string;
}

export const CompetitionEntry = () => {
  const [searchParams] = useSearchParams();
  const competitionId = searchParams.get('id');

  const [competition, setCompetition] = useState<Competition | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    business_name: '',
    abn: '',
    industry: '',
    audience_type: 'consumer',
    consent_voice: false,
    consent_sms: false,
    consent_email: false,
    terms_accepted: false,
  });

  useEffect(() => {
    captureUTMParams();
    if (competitionId) {
      loadCompetition();
    }
  }, [competitionId]);

  const loadCompetition = async () => {
    try {
      const { data, error } = await supabase
        .from('competitions')
        .select('*')
        .eq('id', competitionId)
        .eq('status', 'active')
        .single();

      if (error) throw error;

      const now = new Date();
      const startDate = new Date(data.start_date);
      const endDate = new Date(data.end_date);

      if (now < startDate || now > endDate) {
        setError('This competition is not currently accepting entries');
        setLoading(false);
        return;
      }

      setCompetition(data);
    } catch (error) {
      console.error('Error loading competition:', error);
      setError('Competition not found or is no longer active');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.terms_accepted) {
      alert('Please accept the terms and conditions');
      return;
    }

    if (!formData.consent_voice && !formData.consent_sms && !formData.consent_email) {
      alert('Please provide at least one consent option');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('competition_entries')
        .insert({
          competition_id: competitionId,
          ...formData,
          consent_timestamp: new Date().toISOString(),
          entry_source: 'web',
        });

      if (error) throw error;

      setSubmitted(true);
    } catch (error: any) {
      console.error('Error submitting entry:', error);
      setError(error.message || 'Failed to submit entry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <LandingLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        </div>
      </LandingLayout>
    );
  }

  if (error && !competition) {
    return (
      <LandingLayout>
        <div className="min-h-screen flex items-center justify-center px-4">
          <Card className="max-w-md w-full p-8 text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Competition Not Available</h2>
            <p className="text-gray-600">{error}</p>
          </Card>
        </div>
      </LandingLayout>
    );
  }

  if (submitted) {
    return (
      <LandingLayout>
        <div className="min-h-screen flex items-center justify-center px-4">
          <Card className="max-w-md w-full p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Entry Submitted!</h2>
            <p className="text-gray-600 mb-4">
              Thank you for entering {competition?.name}. Good luck!
            </p>
            <p className="text-sm text-gray-500">
              We'll contact you via your preferred communication methods if you're selected as a winner.
            </p>
          </Card>
        </div>
      </LandingLayout>
    );
  }

  return (
    <LandingLayout>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{competition?.name}</h1>
            <p className="text-xl text-gray-600">{competition?.description}</p>
          </div>

          <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="text-center py-8">
              <p className="text-sm text-gray-600 uppercase font-semibold mb-2">Prize</p>
              <p className="text-3xl font-bold text-gray-900 mb-2">{competition?.prize_description}</p>
              <p className="text-2xl font-semibold text-blue-600">
                Valued at \${competition?.prize_value.toFixed(2)}
              </p>
            </div>
          </Card>

          <Card>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Entry Type</h3>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="consumer"
                      checked={formData.audience_type === 'consumer'}
                      onChange={(e) => setFormData({...formData, audience_type: e.target.value})}
                      className="mr-2"
                    />
                    <span>Individual/Consumer</span>
                  </label>
                  {competition?.target_audience !== 'consumer' && (
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="business"
                        checked={formData.audience_type === 'business'}
                        onChange={(e) => setFormData({...formData, audience_type: e.target.value})}
                        className="mr-2"
                      />
                      <span>Business</span>
                    </label>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  value={formData.first_name}
                  onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                  required
                />
                <Input
                  label="Last Name"
                  value={formData.last_name}
                  onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
                <Input
                  label="Phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                />
              </div>

              {formData.audience_type === 'business' && (
                <>
                  <Input
                    label="Business Name"
                    value={formData.business_name}
                    onChange={(e) => setFormData({...formData, business_name: e.target.value})}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="ABN (Optional)"
                      value={formData.abn}
                      onChange={(e) => setFormData({...formData, abn: e.target.value})}
                    />
                    <Input
                      label="Industry"
                      value={formData.industry}
                      onChange={(e) => setFormData({...formData, industry: e.target.value})}
                    />
                  </div>
                </>
              )}

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Marketing Consent</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-blue-800">{competition?.consent_text}</p>
                </div>

                <div className="space-y-3">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      checked={formData.consent_voice}
                      onChange={(e) => setFormData({...formData, consent_voice: e.target.checked})}
                      className="mt-1 mr-3"
                    />
                    <span className="text-sm text-gray-700">
                      I consent to receive voice calls for marketing purposes
                    </span>
                  </label>

                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      checked={formData.consent_sms}
                      onChange={(e) => setFormData({...formData, consent_sms: e.target.checked})}
                      className="mt-1 mr-3"
                    />
                    <span className="text-sm text-gray-700">
                      I consent to receive SMS messages for marketing purposes
                    </span>
                  </label>

                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      checked={formData.consent_email}
                      onChange={(e) => setFormData({...formData, consent_email: e.target.checked})}
                      className="mt-1 mr-3"
                    />
                    <span className="text-sm text-gray-700">
                      I consent to receive emails for marketing purposes
                    </span>
                  </label>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    checked={formData.terms_accepted}
                    onChange={(e) => setFormData({...formData, terms_accepted: e.target.checked})}
                    className="mt-1 mr-3"
                    required
                  />
                  <span className="text-sm text-gray-700">
                    I accept the{' '}
                    <button type="button" className="text-blue-600 hover:underline">
                      terms and conditions
                    </button>
                    {' '}and confirm that all information provided is accurate
                  </span>
                </label>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                loading={submitting}
                disabled={!formData.terms_accepted}
              >
                Submit Entry
              </Button>
            </form>
          </Card>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Your information is secure and will only be used for this competition and marketing with your consent.</p>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
};
