
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ValidationErrorProps {
  error: string | null;
}

export const ValidationError: React.FC<ValidationErrorProps> = ({ error }) => {
  if (!error) return null;
  
  return (
    <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
};
