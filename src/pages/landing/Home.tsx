import { useNavigate } from 'react-router-dom';
import { LandingLayout } from '../../components/layout/LandingLayout';
import { Button } from '../../components/ui/Button';
import {
  Sun,
  Home as HomeIcon,
  DollarSign,
  Waves,
  TrendingUp,
  Shield,
  Target,
  CheckCircle,
  Zap,
  Users,
  BarChart3,
  ArrowRight,
} from 'lucide-react';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <LandingLayout>
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Australia's Premier B2B Lead Marketplace
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-12">
              Connect with exclusive, pre-qualified business leads across Solar, Property,
              Finance, Spas, and more. Pay only for leads that match your territory.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button
                size="lg"
                onClick={() => navigate('/register')}
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-white text-white hover:bg-blue-700"
              >
                See How It Works
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Lead Categories
            </h2>
            <p className="text-xl text-gray-600">
              Choose from our exclusive lead verticals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div
              onClick={() => navigate('/solar')}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
            >
              <div className="inline-flex p-4 bg-yellow-100 rounded-xl mb-6 group-hover:scale-110 transition-transform">
                <Sun className="h-10 w-10 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Solar Energy</h3>
              <p className="text-gray-600 mb-6">
                Pre-qualified homeowners and businesses seeking solar installations.
                Territory-exclusive leads delivered in real-time.
              </p>
              <div className="text-blue-600 font-medium flex items-center group-hover:translate-x-2 transition-transform">
                Learn More <ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </div>

            <div
              onClick={() => navigate('/property')}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
            >
              <div className="inline-flex p-4 bg-blue-100 rounded-xl mb-6 group-hover:scale-110 transition-transform">
                <HomeIcon className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Property Investment</h3>
              <p className="text-gray-600 mb-6">
                Verified property investors seeking residential, commercial, and development
                opportunities across Australia.
              </p>
              <div className="text-blue-600 font-medium flex items-center group-hover:translate-x-2 transition-transform">
                Learn More <ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </div>

            <div
              onClick={() => navigate('/finance')}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
            >
              <div className="inline-flex p-4 bg-green-100 rounded-xl mb-6 group-hover:scale-110 transition-transform">
                <DollarSign className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Finance & Loans</h3>
              <p className="text-gray-600 mb-6">
                Qualified borrowers seeking home loans, business finance, personal loans,
                and refinancing solutions.
              </p>
              <div className="text-blue-600 font-medium flex items-center group-hover:translate-x-2 transition-transform">
                Learn More <ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </div>

            <div
              onClick={() => navigate('/spas')}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
            >
              <div className="inline-flex p-4 bg-cyan-100 rounded-xl mb-6 group-hover:scale-110 transition-transform">
                <Waves className="h-10 w-10 text-cyan-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Spas & Hot Tubs</h3>
              <p className="text-gray-600 mb-6">
                Homeowners ready to purchase spa and hot tub installations.
                High-value leads with verified budgets.
              </p>
              <div className="text-blue-600 font-medium flex items-center group-hover:translate-x-2 transition-transform">
                Learn More <ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in minutes and start receiving qualified leads today
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sign Up</h3>
              <p className="text-gray-600">
                Create your free account in minutes. No credit card required to get started.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Set Preferences</h3>
              <p className="text-gray-600">
                Configure your target locations, lead types, and quality preferences.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Receive Leads</h3>
              <p className="text-gray-600">
                Get instant notifications via dashboard, email, and SMS when leads match.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-2xl font-bold mb-4">
                4
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Close Deals</h3>
              <p className="text-gray-600">
                Contact your leads immediately and convert them to customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Leads Club?</h2>
            <p className="text-xl text-blue-100">
              The only lead marketplace built specifically for Australian businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex p-4 bg-blue-500 rounded-xl mb-4">
                <Shield className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-blue-100">
                Every lead is verified and pre-qualified. Bad lead? We'll replace it free.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex p-4 bg-blue-500 rounded-xl mb-4">
                <Target className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Territory Exclusive</h3>
              <p className="text-blue-100">
                Leads are never sold to multiple buyers. You get exclusive access to your territory.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex p-4 bg-blue-500 rounded-xl mb-4">
                <Zap className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-Time Delivery</h3>
              <p className="text-blue-100">
                Leads delivered instantly to your dashboard with immediate notifications.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">
              Pay only for leads you receive. No setup fees, no monthly minimums.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Standard Leads</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$25-$50</span>
                <span className="text-gray-600">/lead</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-600">Verified contact details</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-600">Basic qualification</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-600">24-hour delivery</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-600 text-white rounded-2xl p-8 transform scale-105 shadow-2xl">
              <div className="inline-block bg-blue-500 px-3 py-1 rounded-full text-sm font-medium mb-4">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-2">Premium Leads</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$75-$100</span>
                <span className="text-blue-100">/lead</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-blue-200" />
                  <span>Fully qualified</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-blue-200" />
                  <span>Territory exclusive</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-blue-200" />
                  <span>Instant delivery</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-blue-200" />
                  <span>Quality guarantee</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Auction Leads</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$50-$150</span>
                <span className="text-gray-600">/lead</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-600">High-value opportunities</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-600">Competitive bidding</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-600">Premium quality</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join hundreds of Australian businesses who trust Leads Club to deliver
            exclusive, high-quality leads that convert.
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/register')}
          >
            Get Started Free
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </section>
    </LandingLayout>
  );
};
