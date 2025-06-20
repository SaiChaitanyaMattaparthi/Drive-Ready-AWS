
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import DonationCard from '@/components/DonationCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, List, History } from 'lucide-react';
import { Donation } from '@/types/donation';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const VolunteerDashboard: React.FC = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [claimedDonations, setClaimedDonations] = useState<Donation[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Load mock available donations
    const mockDonations: Donation[] = [
      {
        id: '3',
        donorId: 'donor1',
        donorName: 'Maria Restaurant',
        title: 'Fresh Bread and Pastries',
        description: 'End of day bread and pastries, still fresh',
        quantity: '20 items',
        expiryTime: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
        location: {
          address: '789 Food St, New York, NY',
          coordinates: { lat: 40.7505, lng: -73.9934 }
        },
        imageUrl: `https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=300&fit=crop`,
        status: 'open',
        createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
      },
      {
        id: '4',
        donorId: 'donor2',
        donorName: 'Community Kitchen',
        title: 'Cooked Rice and Vegetables',
        description: 'Nutritious meal portions ready for distribution',
        quantity: '15 portions',
        expiryTime: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
        location: {
          address: '321 Help Ave, New York, NY',
          coordinates: { lat: 40.7282, lng: -74.0776 }
        },
        status: 'open',
        createdAt: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
      },
      {
        id: '5',
        donorId: 'donor3',
        donorName: 'Sarah from Brooklyn',
        title: 'Homemade Soup',
        description: 'Vegetable soup made with organic ingredients',
        quantity: '2 liters',
        expiryTime: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
        location: {
          address: '654 Home Rd, Brooklyn, NY',
          coordinates: { lat: 40.6782, lng: -73.9442 }
        },
        status: 'open',
        createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      }
    ];

    // Mock claimed donations
    const mockClaimedDonations: Donation[] = [
      {
        id: '6',
        donorId: 'donor4',
        donorName: 'Local Cafe',
        title: 'Sandwiches and Salads',
        description: 'Fresh sandwiches and salads',
        quantity: '8 items',
        expiryTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        location: {
          address: '987 Cafe St, New York, NY',
          coordinates: { lat: 40.7614, lng: -73.9776 }
        },
        status: 'claimed',
        createdAt: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
        claimedBy: user!.id,
        volunteerName: user!.name,
        claimedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      }
    ];

    setDonations(mockDonations);
    setClaimedDonations(mockClaimedDonations);
  }, [user]);

  const handleClaimDonation = async (donationId: string) => {
    const donation = donations.find(d => d.id === donationId);
    if (!donation) return;

    const claimedDonation: Donation = {
      ...donation,
      status: 'claimed',
      claimedBy: user!.id,
      volunteerName: user!.name,
      claimedAt: new Date().toISOString(),
    };

    setDonations(prev => prev.filter(d => d.id !== donationId));
    setClaimedDonations(prev => [claimedDonation, ...prev]);

    toast({
      title: "Success",
      description: "Donation claimed successfully!",
    });
  };

  const handleUpdateStatus = async (donationId: string, status: 'delivered') => {
    setClaimedDonations(prev => 
      prev.map(d => 
        d.id === donationId 
          ? { ...d, status, deliveredAt: new Date().toISOString() }
          : d
      )
    );

    toast({
      title: "Success",
      description: "Donation marked as delivered!",
    });
  };

  const stats = {
    available: donations.length,
    claimed: claimedDonations.filter(d => d.status === 'claimed').length,
    delivered: claimedDonations.filter(d => d.status === 'delivered').length,
  };

  return (
    <Layout title="Volunteer Dashboard">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Available Donations</h3>
            <p className="text-3xl font-bold text-green-600">{stats.available}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">My Claims</h3>
            <p className="text-3xl font-bold text-yellow-600">{stats.claimed}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Delivered</h3>
            <p className="text-3xl font-bold text-purple-600">{stats.delivered}</p>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="available" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="available">
              <List className="h-4 w-4 mr-2" />
              Available
            </TabsTrigger>
            <TabsTrigger value="map">
              <MapPin className="h-4 w-4 mr-2" />
              Map View
            </TabsTrigger>
            <TabsTrigger value="history">
              <History className="h-4 w-4 mr-2" />
              My Claims
            </TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Available Food Donations</h3>
            </div>
            
            {donations.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No donations available</h3>
                <p className="text-gray-600">Check back later for new food donations in your area.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {donations.map((donation) => (
                  <DonationCard
                    key={donation.id}
                    donation={donation}
                    onClaim={handleClaimDonation}
                    userRole="volunteer"
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="map" className="space-y-4">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4">Map View</h3>
              <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Interactive map with donation locations</p>
                  <p className="text-sm text-gray-500">(Integration with AWS Location Service)</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">My Claimed Donations</h3>
            </div>
            
            {claimedDonations.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No claimed donations</h3>
                <p className="text-gray-600">Start helping by claiming your first donation!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {claimedDonations.map((donation) => (
                  <DonationCard
                    key={donation.id}
                    donation={donation}
                    onUpdateStatus={handleUpdateStatus}
                    userRole="volunteer"
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default VolunteerDashboard;
