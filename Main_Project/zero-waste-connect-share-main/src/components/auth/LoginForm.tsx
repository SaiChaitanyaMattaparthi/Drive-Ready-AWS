
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface LoginFormProps {
  onToggleMode: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onToggleMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !role) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await login(email, password, role);
      toast({
        title: "Success",
        description: "Welcome back to ZeroWaste Connect!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Login failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
        <CardDescription className="text-center">
          Sign in to your ZeroWaste Connect account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">I am a</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="donor">Food Donor</SelectItem>
                <SelectItem value="volunteer">Volunteer</SelectItem>
                <SelectItem value="admin">Administrator</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={onToggleMode}
            className="text-sm text-green-600 hover:text-green-500"
          >
            Don't have an account? Sign up
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
