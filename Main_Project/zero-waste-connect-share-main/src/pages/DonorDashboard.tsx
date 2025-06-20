
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import DonationForm from '@/components/DonationForm';
import DonationCard from '@/components/DonationCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, History } from 'lucide-react';
import { Donation } from '@/types/donation';
import { useAuth } from '@/contexts/AuthContext';

const DonorDashboard: React.FC = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Load mock donations for the current user
    const mockDonations: Donation[] = [
      {
        id: '1',
        donorId: user!.id,
        donorName: user!.name,
        title: 'Fresh Vegetable Sandwiches',
        description: 'Freshly made sandwiches with vegetables',
        quantity: '10 sandwiches',
        expiryTime: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
        location: {
          address: '123 Main St, New York, NY',
          coordinates: { lat: 40.7128, lng: -74.0060 }
        },
        status: 'claimed',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        claimedBy: 'vol1',
        volunteerName: 'John Volunteer',
        claimedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '2',
        donorId: user!.id,
        donorName: user!.name,
        title: 'Leftover Pizza',
        description: 'Margherita and pepperoni pizza slices',
        quantity: '12 slices',
        expiryTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        location: {
          address: '456 Oak Ave, New York, NY',
          coordinates: { lat: 40.7589, lng: -73.9851 }
        },
        status: 'open',
        createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      }
    ];
    setDonations(mockDonations);
  }, [user]);

  const handleSubmitDonation = async (donationData: any) => {
    const newDonation: Donation = {
      id: Math.random().toString(36).substr(2, 9),
      ...donationData,
      status: 'open',
      createdAt: new Date().toISOString(),
    };

    setDonations(prev => [newDonation, ...prev]);
    setShowForm(false);
  };

  const stats = {
    total: donations.length,
    open: donations.filter(d => d.status === 'open').length,
    claimed: donations.filter(d => d.status === 'claimed').length,
    delivered: donations.filter(d => d.status === 'delivered').length,
  };

  return (
    <Layout title="Donor Dashboard">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Total Donations</h3>
            <p className="text-3xl font-bold text-green-600">{stats.total}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Open</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.open}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Claimed</h3>
            <p className="text-3xl font-bold text-yellow-600">{stats.claimed}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Delivered</h3>
            <p className="text-3xl font-bold text-purple-600">{stats.delivered}</p>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="donations" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="donations">
              <History className="h-4 w-4 mr-2" />
              My Donations
            </TabsTrigger>
            <TabsTrigger value="new">
              <Plus className="h-4 w-4 mr-2" />
              New Donation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="donations" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Donation History</h3>
            </div>
            
            {donations.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No donations yet</h3>
                <p className="text-gray-600 mb-4">Start making a difference by submitting your first donation!</p>
                <Button onClick={() => setShowForm(true)} className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Donation
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {donations.map((donation) => (
                  <DonationCard
                    key={donation.id}
                    donation={donation}
                    showActions={false}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="new">
            <DonationForm onSubmit={handleSubmitDonation} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default DonorDashboard;
