
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AuthPage from './AuthPage';
import DonorDashboard from './DonorDashboard';
import VolunteerDashboard from './VolunteerDashboard';
import AdminDashboard from './AdminDashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Users, Utensils, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Zero<span className="text-green-600">Waste</span> Connect
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            Connecting communities to redistribute surplus food from donors to those in need,
            <br />reducing waste and fighting hunger together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3"
              onClick={handleGetStarted}
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">1,200+</div>
              <div className="text-gray-600">Meals Saved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">350+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600">Communities</div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="text-center hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Utensils className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-xl text-green-600">For Donors</CardTitle>
              <CardDescription>
                Restaurants, individuals, and event hosts can easily donate surplus food
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Quick donation form</li>
                <li>• Real-time status tracking</li>
                <li>• Photo uploads</li>
                <li>• Pickup scheduling</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl text-blue-600">For Volunteers</CardTitle>
              <CardDescription>
                Connect with nearby food donations and help deliver to those in need
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Map view of donations</li>
                <li>• One-click claiming</li>
                <li>• Delivery tracking</li>
                <li>• Impact analytics</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-xl text-purple-600">For Communities</CardTitle>
              <CardDescription>
                Building stronger, more sustainable communities through food sharing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Reduce food waste</li>
                <li>• Fight hunger</li>
                <li>• Build connections</li>
                <li>• Environmental impact</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to make a difference?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of users already making an impact in their communities.
          </p>
          <Button 
            size="lg" 
            className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3"
            onClick={handleGetStarted}
          >
            Start Your Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const Index: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!user) {
    return <LandingPage />;
  }

  // Route to appropriate dashboard based on user role
  switch (user.role) {
    case 'donor':
      return <DonorDashboard />;
    case 'volunteer':
      return <VolunteerDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <AuthPage />;
  }
};

export default Index;
