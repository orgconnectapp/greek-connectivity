
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { verifyEmail } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus('error');
        setErrorMessage('Invalid verification link. No token provided.');
        return;
      }

      try {
        await verifyEmail(token);
        setStatus('success');
      } catch (error) {
        setStatus('error');
        setErrorMessage('Verification failed. The link may have expired or is invalid.');
      }
    };

    verify();
  }, [token, verifyEmail]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <Card className="w-full max-w-md animate-fade-up">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Email Verification</CardTitle>
          <CardDescription>
            {status === 'loading' 
              ? 'Verifying your email address...' 
              : status === 'success' 
              ? 'Your email has been verified!' 
              : 'Verification Failed'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6">
          {status === 'loading' && (
            <Loader2 className="h-16 w-16 text-primary animate-spin" />
          )}
          {status === 'success' && (
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          )}
          {status === 'error' && (
            <>
              <XCircle className="h-16 w-16 text-destructive" />
              <p className="mt-4 text-center text-muted-foreground">{errorMessage}</p>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          {status !== 'loading' && (
            <Button 
              onClick={() => navigate(status === 'success' ? '/organizations' : '/auth')}
              className="w-full"
            >
              {status === 'success' ? 'Continue to Organizations' : 'Back to Login'}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyEmail;
