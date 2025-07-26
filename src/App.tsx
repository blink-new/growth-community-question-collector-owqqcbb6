import React, { useState, useEffect } from 'react';
import { Phone, Mail, Star, CheckCircle, ArrowRight, Users, Award, Shield, Clock, X, Menu, ChevronDown } from 'lucide-react';
import { blink } from './blink/client';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
  created_at: string;
  user_id: string;
}

const testimonials = [
  {
    name: "Sarah Johnson",
    company: "TechStart Inc",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "Kindsy transformed our business completely. We saw a 340% increase in qualified leads within 60 days. Their team is absolutely phenomenal!",
    result: "340% increase in leads"
  },
  {
    name: "Michael Chen",
    company: "GrowthCorp",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "ROI was incredible - $2.5M in new revenue in just 6 months. The best investment we've ever made for our company's growth.",
    result: "$2.5M new revenue"
  },
  {
    name: "Emily Rodriguez",
    company: "ScaleUp Solutions",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "Their conversion optimization strategies delivered a 450% ROI. Professional, results-driven, and exceeded all expectations.",
    result: "450% ROI achieved"
  }
];

const services = [
  {
    title: "Lead Generation System",
    price: "Starting at $2,997",
    popular: false,
    features: [
      "Custom lead magnet creation",
      "High-converting landing pages",
      "Email automation sequences",
      "Lead scoring & qualification",
      "CRM integration & setup",
      "Performance tracking dashboard"
    ],
    cta: "Get More Leads"
  },
  {
    title: "Conversion Optimization",
    price: "Starting at $4,997",
    popular: true,
    features: [
      "Complete funnel audit & optimization",
      "A/B testing implementation",
      "Conversion rate improvements",
      "User experience optimization",
      "Sales page redesign",
      "90-day performance guarantee"
    ],
    cta: "Boost Conversions"
  },
  {
    title: "Growth Acceleration",
    price: "Starting at $7,997",
    popular: false,
    features: [
      "Full marketing strategy development",
      "Multi-channel campaign management",
      "Advanced analytics & reporting",
      "Team training & consultation",
      "Ongoing optimization support",
      "Dedicated account manager"
    ],
    cta: "Accelerate Growth"
  }
];

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  // Auth state management
  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user);
      setIsLoading(state.isLoading);
    });
    return unsubscribe;
  }, []);

  // Testimonial rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShowExitIntent(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      blink.auth.login();
      return;
    }

    setIsSubmitting(true);
    try {
      await blink.db.leads.create({
        ...formData,
        user_id: user.id,
        created_at: new Date().toISOString()
      });
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', service: '', budget: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Urgency Bar */}
      <div className="bg-red-600 text-white py-2 px-4 text-center text-sm font-medium">
        🔥 LIMITED TIME: 50% OFF Setup Fees - Only 7 Spots Left This Month! 
        <span className="ml-2 font-bold">Ends in 3 Days</span>
      </div>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-800">Kindsy</div>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#services" className="text-gray-700 hover:text-blue-800 px-3 py-2 text-sm font-medium">Services</a>
                <a href="#testimonials" className="text-gray-700 hover:text-blue-800 px-3 py-2 text-sm font-medium">Results</a>
                <a href="#contact" className="text-gray-700 hover:text-blue-800 px-3 py-2 text-sm font-medium">Contact</a>
                <a href="tel:+4917684457440" className="bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-900 transition-colors">
                  Call Now
                </a>
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-blue-800"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#services" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-800">Services</a>
              <a href="#testimonials" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-800">Results</a>
              <a href="#contact" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-800">Contact</a>
              <a href="tel:+4917684457440" className="block px-3 py-2 text-base font-medium bg-blue-800 text-white rounded-lg">Call Now</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">4.9/5 from 247+ reviews</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Get 50+ Qualified Leads Every Month 
                <span className="text-blue-800"> Or We Work For Free</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Our proven system has generated over <strong>$50M in revenue</strong> for 500+ businesses. 
                See a <strong>340% average increase</strong> in qualified leads within 60 days - guaranteed.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a 
                  href="#contact" 
                  className="bg-blue-800 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-900 transition-colors flex items-center justify-center"
                >
                  Get Free Strategy Call
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
                <a 
                  href="#case-studies" 
                  className="border-2 border-blue-800 text-blue-800 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center"
                >
                  View Case Studies
                </a>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  30-Day Money-Back Guarantee
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  No Setup Fees
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Free Strategy Session</h3>
                  <p className="text-gray-600">Discover how to 3x your leads in 60 days</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Budget Range</option>
                    <option value="under-5k">Under $5,000</option>
                    <option value="5k-10k">$5,000 - $10,000</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-plus">$25,000+</option>
                  </select>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-red-600 text-white px-6 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Booking...' : 'Book Free Strategy Call'}
                  </button>
                </form>

                {submitStatus === 'success' && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 text-center">Thank you! We'll contact you within 24 hours.</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 text-center">Something went wrong. Please try again.</p>
                  </div>
                )}

                <p className="text-xs text-gray-500 text-center mt-4">
                  🔒 Your information is 100% secure and will never be shared
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-gray-600 font-medium">Trusted by 500+ Growing Businesses</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">Google Partner</div>
              <div className="text-sm text-gray-600">Certified Agency</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">Facebook Partner</div>
              <div className="text-sm text-gray-600">Marketing Expert</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">BBB A+</div>
              <div className="text-sm text-gray-600">Accredited Business</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">HubSpot</div>
              <div className="text-sm text-gray-600">Certified Partner</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Growth Package
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each package is designed to deliver measurable results and ROI. 
              All packages include our 90-day performance guarantee.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`relative bg-white rounded-2xl shadow-lg border-2 p-8 ${
                  service.popular ? 'border-blue-500 transform scale-105' : 'border-gray-200'
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <div className="text-3xl font-bold text-blue-800 mb-4">{service.price}</div>
                </div>

                <ul className="space-y-4 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a 
                  href="#contact"
                  className={`block w-full text-center px-6 py-4 rounded-lg font-semibold transition-colors ${
                    service.popular 
                      ? 'bg-blue-800 text-white hover:bg-blue-900' 
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {service.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Real Results From Real Clients
            </h2>
            <p className="text-xl text-gray-600">
              See how we've helped businesses like yours achieve extraordinary growth
            </p>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <img 
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div className="flex-1 text-center md:text-left">
                  <div className="flex justify-center md:justify-start text-yellow-400 mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-xl text-gray-700 mb-4 italic">
                    "{testimonials[currentTestimonial].text}"
                  </blockquote>
                  <div className="font-semibold text-gray-900">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-gray-600 mb-2">
                    {testimonials[currentTestimonial].company}
                  </div>
                  <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {testimonials[currentTestimonial].result}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-blue-800' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ready to 3x Your Leads in 60 Days?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Book your free strategy session now and discover the exact system we use to generate 
              50+ qualified leads every month for our clients.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="bg-blue-800 text-white rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-bold mb-4">What You'll Get On This Call:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Complete audit of your current marketing</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Custom growth strategy for your business</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Identify your biggest growth opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Roadmap to 3x your leads in 60 days</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-6">
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-blue-800 mr-4" />
                  <div>
                    <div className="font-semibold text-gray-900">Call Us Now</div>
                    <a href="tel:+4917684457440" className="text-blue-800 hover:underline">
                      +49 176 84457440
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-blue-800 mr-4" />
                  <div>
                    <div className="font-semibold text-gray-900">Email Us</div>
                    <a href="mailto:hello@kindsy.net" className="text-blue-800 hover:underline">
                      hello@kindsy.net
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-6 w-6 text-blue-800 mr-4" />
                  <div>
                    <div className="font-semibold text-gray-900">Response Time</div>
                    <div className="text-gray-600">Within 2 hours (business days)</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Service</option>
                    <option value="lead-generation">Lead Generation</option>
                    <option value="conversion-optimization">Conversion Optimization</option>
                    <option value="growth-acceleration">Growth Acceleration</option>
                  </select>
                </div>

                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Budget Range</option>
                  <option value="under-5k">Under $5,000</option>
                  <option value="5k-10k">$5,000 - $10,000</option>
                  <option value="10k-25k">$10,000 - $25,000</option>
                  <option value="25k-plus">$25,000+</option>
                </select>

                <textarea
                  name="message"
                  placeholder="Tell us about your business and goals..."
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 text-white px-6 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Book Free Strategy Call Now'}
                </button>
              </form>

              {submitStatus === 'success' && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 text-center font-semibold">
                    🎉 Success! We'll contact you within 2 hours to schedule your free strategy call.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-center">Something went wrong. Please try again or call us directly.</p>
                </div>
              )}

              <p className="text-xs text-gray-500 text-center mt-4">
                🔒 Your information is 100% secure. We respect your privacy and will never spam you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Exit Intent Popup */}
      {showExitIntent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full relative">
            <button
              onClick={() => setShowExitIntent(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Wait! Don't Leave Empty-Handed</h3>
              <p className="text-gray-600 mb-6">
                Get our FREE "Lead Generation Blueprint" that shows you exactly how to get 50+ qualified leads every month.
              </p>
              
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="w-full bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors">
                  Get Free Blueprint
                </button>
              </div>
              
              <p className="text-xs text-gray-500 mt-4">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">Kindsy</div>
              <p className="text-gray-400 mb-4">
                Helping businesses generate more leads and grow faster with proven marketing strategies.
              </p>
              <div className="flex space-x-4">
                <a href="tel:+4917684457440" className="text-gray-400 hover:text-white">
                  <Phone className="h-5 w-5" />
                </a>
                <a href="mailto:hello@kindsy.net" className="text-gray-400 hover:text-white">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#services" className="hover:text-white">Lead Generation</a></li>
                <li><a href="#services" className="hover:text-white">Conversion Optimization</a></li>
                <li><a href="#services" className="hover:text-white">Growth Acceleration</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#testimonials" className="hover:text-white">Case Studies</a></li>
                <li><a href="#contact" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <div>Phone: +49 176 84457440</div>
                <div>Email: hello@kindsy.net</div>
                <div>Response: Within 2 hours</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Kindsy. All rights reserved. | 30-Day Money-Back Guarantee</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;