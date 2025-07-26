import React, { useState, useEffect } from 'react'
import { createClient } from './blink/client'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Textarea } from './components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { 
  Star, 
  Shield, 
  Clock, 
  Users, 
  CheckCircle, 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin,
  Award,
  TrendingUp,
  Zap,
  Target,
  X
} from 'lucide-react'

const blink = createClient({
  projectId: 'growth-community-question-collector-owqqcbb6',
  authRequired: true
})

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
    budget: ''
  })
  const [showExitIntent, setShowExitIntent] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechStart Inc",
      result: "300% increase in qualified leads",
      text: "Kinds transformed our business. We went from 10 leads per month to 40+ qualified prospects. The ROI has been incredible.",
      rating: 5
    },
    {
      name: "Michael Chen",
      company: "Growth Solutions",
      result: "$2.5M additional revenue",
      text: "Working with Kinds was the best decision we made. Their strategies generated $2.5M in additional revenue in just 8 months.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      company: "Digital Dynamics",
      result: "450% ROI in 6 months",
      text: "The team at Kinds doesn't just deliver results - they exceed expectations. Our ROI has been phenomenal.",
      rating: 5
    }
  ]

  // Auth state management
  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0) {
        setShowExitIntent(true)
      }
    }
    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [])

  // Testimonial rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      blink.auth.login()
      return
    }

    try {
      await blink.db.leads.create({
        id: `lead_${Date.now()}`,
        userId: user.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        service: formData.service,
        message: formData.message,
        budget: formData.budget,
        createdAt: new Date().toISOString(),
        status: 'new'
      })
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: '',
        budget: ''
      })
      
      alert('Thank you! We\'ll contact you within 24 hours.')
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Something went wrong. Please try again.')
    }
  }

  const services = [
    {
      title: "Lead Generation System",
      description: "Get 50+ qualified leads per month or we work for free",
      price: "Starting at $2,997/month",
      features: [
        "Guaranteed 50+ qualified leads monthly",
        "Complete funnel optimization",
        "24/7 lead tracking dashboard",
        "Dedicated account manager",
        "30-day money-back guarantee"
      ],
      popular: true
    },
    {
      title: "Conversion Optimization",
      description: "Double your website conversion rate in 90 days",
      price: "Starting at $4,997",
      features: [
        "Complete website audit",
        "A/B testing implementation",
        "Conversion rate optimization",
        "Landing page redesign",
        "Performance guarantee"
      ],
      popular: false
    },
    {
      title: "Growth Acceleration",
      description: "Scale your business 10x with proven systems",
      price: "Starting at $9,997/month",
      features: [
        "Complete growth strategy",
        "Multi-channel marketing",
        "Sales team training",
        "Technology implementation",
        "Executive coaching included"
      ],
      popular: false
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Urgency Bar */}
      <div className="bg-accent text-white py-2 px-4 text-center text-sm font-medium">
        🔥 LIMITED TIME: Get 50% OFF Setup Fees - Only 7 Spots Left This Month! 
        <Button variant="ghost" size="sm" className="ml-2 text-white hover:text-accent-foreground">
          Claim Now →
        </Button>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">Kinds</h1>
              <Badge variant="secondary" className="ml-2">Premium</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span className="font-medium">4.9/5</span>
                <span className="ml-1">(247 reviews)</span>
              </div>
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                (555) 123-4567
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-primary/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <Badge variant="secondary" className="mr-2">
                  <Award className="h-3 w-3 mr-1" />
                  #1 Rated Service
                </Badge>
                <Badge variant="outline">
                  <Users className="h-3 w-3 mr-1" />
                  500+ Happy Clients
                </Badge>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Get <span className="text-primary">50+ Qualified Leads</span> Every Month
                <span className="text-accent"> Or We Work For Free</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Join 500+ businesses that increased their revenue by an average of 
                <span className="font-bold text-primary"> 340%</span> using our proven lead generation system.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="text-lg px-8 py-6">
                  <Zap className="h-5 w-5 mr-2" />
                  Get My Free Strategy Call
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  <Target className="h-5 w-5 mr-2" />
                  View Case Studies
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  30-Day Guarantee
                </div>
                <div className="flex items-center">
                  <Shield className="h-4 w-4 text-blue-500 mr-2" />
                  No Setup Fees
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-orange-500 mr-2" />
                  Results in 30 Days
                </div>
              </div>
            </div>

            <div className="lg:pl-8">
              <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl">Get Your Free Strategy Session</CardTitle>
                  <CardDescription className="text-base">
                    Discover how to 3x your leads in the next 90 days
                  </CardDescription>
                  <div className="flex justify-center items-center mt-2">
                    <Badge variant="destructive" className="animate-pulse">
                      <Clock className="h-3 w-3 mr-1" />
                      Limited Spots Available
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="First Name*"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                      <Input
                        type="email"
                        placeholder="Email Address*"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                      />
                    </div>
                    <Input
                      type="tel"
                      placeholder="Phone Number*"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                    <Input
                      placeholder="Company Name"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                    />
                    <select
                      className="w-full p-3 border border-input rounded-md bg-background"
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      required
                    >
                      <option value="">Monthly Marketing Budget*</option>
                      <option value="5k-10k">$5,000 - $10,000</option>
                      <option value="10k-25k">$10,000 - $25,000</option>
                      <option value="25k-50k">$25,000 - $50,000</option>
                      <option value="50k+">$50,000+</option>
                    </select>
                    <Textarea
                      placeholder="Tell us about your biggest challenge..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows={3}
                    />
                    <Button type="submit" size="lg" className="w-full text-lg py-6">
                      <ArrowRight className="h-5 w-5 mr-2" />
                      Book My Free Strategy Call
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      🔒 Your information is 100% secure. We'll never share it.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="bg-muted/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground mb-6">
            Trusted by industry leaders and growing businesses worldwide
          </p>
          <div className="flex justify-center items-center space-x-12 opacity-60">
            {['Google Partner', 'Facebook Partner', 'HubSpot Certified', 'Salesforce Partner'].map((logo) => (
              <div key={logo} className="text-lg font-semibold text-muted-foreground">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Choose Your Growth Path
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every package comes with our 30-day money-back guarantee and dedicated support
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className={`relative ${service.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                {service.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                  <div className="text-3xl font-bold text-primary mt-4">{service.price}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={service.popular ? "default" : "outline"}>
                    Get Started Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Real Results From Real Clients
            </h2>
            <p className="text-xl text-muted-foreground">
              See how we've helped businesses like yours achieve extraordinary growth
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-white shadow-xl">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-2xl font-medium text-foreground mb-6 leading-relaxed">
                    "{testimonials[currentTestimonial].text}"
                  </blockquote>
                  <div className="flex items-center justify-center space-x-4">
                    <div>
                      <div className="font-bold text-lg">{testimonials[currentTestimonial].name}</div>
                      <div className="text-muted-foreground">{testimonials[currentTestimonial].company}</div>
                    </div>
                    <Badge variant="secondary" className="text-primary font-bold">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {testimonials[currentTestimonial].result}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Ready to 10x Your Business Growth?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join 500+ successful businesses that chose Kinds for explosive growth
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              <Phone className="h-5 w-5 mr-2" />
              Call Now: (555) 123-4567
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 text-white border-white hover:bg-white hover:text-primary">
              <Mail className="h-5 w-5 mr-2" />
              Get Free Consultation
            </Button>
          </div>
          <p className="text-sm mt-6 opacity-75">
            🔒 30-day money-back guarantee • No long-term contracts • Results guaranteed
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Kinds</h3>
              <p className="text-muted-foreground mb-4">
                The #1 growth partner for ambitious businesses
              </p>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="text-sm">4.9/5 from 247+ reviews</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Lead Generation</li>
                <li>Conversion Optimization</li>
                <li>Growth Strategy</li>
                <li>Marketing Automation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About Us</li>
                <li>Case Studies</li>
                <li>Testimonials</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  (555) 123-4567
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  hello@kinds.net
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  New York, NY
                </div>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Kinds. All rights reserved. Built for maximum conversion and growth.</p>
          </div>
        </div>
      </footer>

      {/* Exit Intent Popup */}
      {showExitIntent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full bg-white">
            <CardHeader className="text-center relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-2"
                onClick={() => setShowExitIntent(false)}
              >
                <X className="h-4 w-4" />
              </Button>
              <CardTitle className="text-2xl text-accent">Wait! Don't Leave Yet!</CardTitle>
              <CardDescription>
                Get our FREE "50 Leads in 30 Days" blueprint before you go
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input placeholder="Enter your email" type="email" />
                <Button className="w-full" size="lg">
                  Send Me The Free Blueprint
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  No spam. Unsubscribe anytime. 🔒 100% secure.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default App