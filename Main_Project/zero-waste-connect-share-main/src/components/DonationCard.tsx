
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, User } from 'lucide-react';
import { Donation } from '@/types/donation';

interface DonationCardProps {
  donation: Donation;
  onClaim?: (donationId: string) => void;
  onUpdateStatus?: (donationId: string, status: 'delivered') => void;
  showActions?: boolean;
  userRole?: string;
}

const DonationCard: React.FC<DonationCardProps> = ({ 
  donation, 
  onClaim, 
  onUpdateStatus, 
  showActions = true,
  userRole 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800';
      case 'claimed': return 'bg-yellow-100 text-yellow-800';
      case 'delivered': return 'bg-blue-100 text-blue-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const isExpired = new Date(donation.expiryTime) < new Date();

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900">{donation.title}</h3>
          <Badge className={getStatusColor(donation.status)}>
            {donation.status.toUpperCase()}
          </Badge>
        </div>
        <p className="text-sm text-gray-600">{donation.description}</p>
      </CardHeader>

      <CardContent className="space-y-3">
        {donation.imageUrl && (
          <div className="w-full h-32 bg-gray-200 rounded-lg overflow-hidden">
            <img 
              src={donation.imageUrl} 
              alt={donation.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <User className="h-4 w-4 mr-2" />
            <span>Donated by {donation.donorName}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{donation.location.address}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Quantity: {donation.quantity}</span>
          </div>

          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-2" />
            <span className={isExpired ? 'text-red-600' : 'text-gray-600'}>
              Expires: {formatTime(donation.expiryTime)}
            </span>
          </div>

          {donation.volunteerName && (
            <div className="flex items-center text-sm text-gray-600">
              <User className="h-4 w-4 mr-2" />
              <span>Claimed by {donation.volunteerName}</span>
            </div>
          )}
        </div>
      </CardContent>

      {showActions && (
        <CardFooter className="pt-3">
          {userRole === 'volunteer' && donation.status === 'open' && !isExpired && (
            <Button 
              onClick={() => onClaim?.(donation.id)}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Claim This Donation
            </Button>
          )}
          
          {userRole === 'volunteer' && donation.status === 'claimed' && (
            <Button 
              onClick={() => onUpdateStatus?.(donation.id, 'delivered')}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Mark as Delivered
            </Button>
          )}

          {!showActions && (
            <div className="text-xs text-gray-500">
              Created: {formatTime(donation.createdAt)}
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default DonationCard;
