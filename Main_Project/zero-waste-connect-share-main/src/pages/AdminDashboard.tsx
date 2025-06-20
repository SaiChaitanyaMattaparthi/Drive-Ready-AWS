
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Users, Package, TrendingUp, AlertTriangle } from 'lucide-react';
import { User, Donation } from '@/types/donation';

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => {
    // Mock data for admin dashboard
    const mockUsers: User[] = [
      {
        id: '1',
        email: 'maria@restaurant.com',
        name: 'Maria Rodriguez',
        role: 'donor',
        phone: '+1-555-0101',
        createdAt: '2024-01-15T10:00:00Z',
        totalDonations: 15,
      },
      {
        id: '2',
        email: 'john@volunteer.com',
        name: 'John Smith',
        role: 'volunteer',
        phone: '+1-555-0102',
        createdAt: '2024-01-20T14:30:00Z',
        totalClaims: 8,
      },
      {
        id: '3',
        email: 'sarah@kitchen.com',
        name: 'Sarah Johnson',
        role: 'donor',
        phone: '+1-555-0103',
        createdAt: '2024-02-01T09:15:00Z',
        totalDonations: 7,
      },
    ];

    const mockDonations: Donation[] = [
      {
        id: '1',
        donorId: '1',
        donorName: 'Maria Rodriguez',
        title: 'Fresh Bread',
        description: 'Daily fresh bread',
        quantity: '20 loaves',
        expiryTime: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
        location: {
          address: '123 Main St',
          coordinates: { lat: 40.7128, lng: -74.0060 }
        },
        status: 'delivered',
        createdAt: '2024-02-20T08:00:00Z',
        claimedBy: '2',
        volunteerName: 'John Smith',
        deliveredAt: '2024-02-20T10:30:00Z',
      },
      {
        id: '2',
        donorId: '3',
        donorName: 'Sarah Johnson',
        title: 'Vegetable Soup',
        description: 'Healthy soup',
        quantity: '5 liters',
        expiryTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        location: {
          address: '456 Oak Ave',
          coordinates: { lat: 40.7589, lng: -73.9851 }
        },
        status: 'claimed',
        createdAt: '2024-02-21T12:00:00Z',
        claimedBy: '2',
        volunteerName: 'John Smith',
      },
    ];

    setUsers(mockUsers);
    setDonations(mockDonations);
  }, []);

  const stats = {
    totalUsers: users.length,
    totalDonors: users.filter(u => u.role === 'donor').length,
    totalVolunteers: users.filter(u => u.role === 'volunteer').length,
    totalDonations: donations.length,
    activeDonations: donations.filter(d => d.status === 'open' || d.status === 'claimed').length,
    completedDonations: donations.filter(d => d.status === 'delivered').length,
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'donor': return 'bg-blue-100 text-blue-800';
      case 'volunteer': return 'bg-green-100 text-green-800';
      case 'admin': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800';
      case 'claimed': return 'bg-yellow-100 text-yellow-800';
      case 'delivered': return 'bg-blue-100 text-blue-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout title="Admin Dashboard">
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                {stats.totalDonors} donors, {stats.totalVolunteers} volunteers
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalDonations}</div>
              <p className="text-xs text-muted-foreground">
                {stats.activeDonations} active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.totalDonations > 0 
                  ? Math.round((stats.completedDonations / stats.totalDonations) * 100)
                  : 0}%
              </div>
              <p className="text-xs text-muted-foreground">
                {stats.completedDonations} completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reports</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                No pending reports
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="donations">Donations</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h4 className="font-semibold">{user.name}</h4>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-xs text-gray-500">
                            Joined: {new Date(user.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getRoleColor(user.role)}>
                          {user.role}
                        </Badge>
                        {user.role === 'donor' && user.totalDonations && (
                          <span className="text-sm text-gray-600">
                            {user.totalDonations} donations
                          </span>
                        )}
                        {user.role === 'volunteer' && user.totalClaims && (
                          <span className="text-sm text-gray-600">
                            {user.totalClaims} claims
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="donations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Donation Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {donations.map((donation) => (
                    <div key={donation.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">{donation.title}</h4>
                        <p className="text-sm text-gray-600">{donation.description}</p>
                        <p className="text-xs text-gray-500">
                          By {donation.donorName} • {donation.quantity}
                        </p>
                        <p className="text-xs text-gray-500">
                          Created: {new Date(donation.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(donation.status)}>
                          {donation.status.toUpperCase()}
                        </Badge>
                        {donation.volunteerName && (
                          <span className="text-sm text-gray-600">
                            → {donation.volunteerName}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Analytics charts</p>
                      <p className="text-sm text-gray-500">(Integration with CloudWatch)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Impact Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Meals Saved</span>
                    <span className="font-bold">47</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Communities</span>
                    <span className="font-bold">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Food Waste Reduced</span>
                    <span className="font-bold">125 kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Response Time</span>
                    <span className="font-bold">32 min</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
