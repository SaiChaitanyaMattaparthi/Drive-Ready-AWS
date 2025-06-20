
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface DonationFormProps {
  onSubmit: (donationData: any) => void;
}

const DonationForm: React.FC<DonationFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    quantity: '',
    expiryTime: '',
    address: '',
    imageFile: null as File | null,
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleChange = (field: string, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleChange('imageFile', file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.quantity || !formData.expiryTime || !formData.address) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const expiryDate = new Date(formData.expiryTime);
    if (expiryDate <= new Date()) {
      toast({
        title: "Error",
        description: "Expiry time must be in the future",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const donationData = {
        ...formData,
        donorId: user!.id,
        donorName: user!.name,
        location: {
          address: formData.address,
          coordinates: { lat: 40.7128 + Math.random() * 0.1, lng: -74.0060 + Math.random() * 0.1 }
        },
        imageUrl: formData.imageFile ? URL.createObjectURL(formData.imageFile) : undefined,
      };

      await onSubmit(donationData);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        quantity: '',
        expiryTime: '',
        address: '',
        imageFile: null,
      });

      toast({
        title: "Success",
        description: "Food donation submitted successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit donation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const minDateTime = new Date();
  minDateTime.setHours(minDateTime.getHours() + 1);
  const minDateTimeString = minDateTime.toISOString().slice(0, 16);

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-green-600">
          Submit Food Donation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Food Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Fresh Vegetable Sandwiches"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the food items, any special notes..."
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity *</Label>
            <Input
              id="quantity"
              placeholder="e.g., 10 sandwiches, 5 kg rice"
              value={formData.quantity}
              onChange={(e) => handleChange('quantity', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expiryTime">Expiry Date & Time *</Label>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <Input
                id="expiryTime"
                type="datetime-local"
                min={minDateTimeString}
                value={formData.expiryTime}
                onChange={(e) => handleChange('expiryTime', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Pickup Address *</Label>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <Input
                id="address"
                placeholder="Enter pickup address"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Food Image (Optional)</Label>
            <div className="flex items-center space-x-2">
              <Upload className="h-4 w-4 text-gray-400" />
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            {formData.imageFile && (
              <p className="text-sm text-gray-600">
                Selected: {formData.imageFile.name}
              </p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full bg-green-600 hover:bg-green-700" 
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Donation'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DonationForm;
