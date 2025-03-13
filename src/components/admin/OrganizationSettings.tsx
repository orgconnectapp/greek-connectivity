
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const OrganizationSettings = () => {
  const [headerImage, setHeaderImage] = useState<string>('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3');
  const [uploading, setUploading] = useState(false);
  
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploading(true);
      
      // Create a temporary URL for the selected image
      const imageUrl = URL.createObjectURL(file);
      setHeaderImage(imageUrl);
      
      // Simulate upload process
      setTimeout(() => {
        setUploading(false);
      }, 1500);
      
      // In a real application, you would upload the file to a server here
      // const formData = new FormData();
      // formData.append('headerImage', file);
      // uploadToServer(formData).then(response => {
      //   setHeaderImage(response.imageUrl);
      //   setUploading(false);
      // });
    }
  };
  
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Organization Settings</h2>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Organization Header Image</label>
        <AspectRatio ratio={16 / 5} className="bg-muted rounded-md overflow-hidden">
          <img
            src={headerImage}
            alt="Organization header"
            className="h-full w-full object-cover"
          />
        </AspectRatio>
        <div className="mt-2">
          <label htmlFor="headerImageUpload" className="cursor-pointer">
            <div className="flex items-center gap-2 text-sm">
              <Button type="button" disabled={uploading}>
                <Upload className="h-4 w-4 mr-2" />
                {uploading ? 'Uploading...' : 'Upload New Header'}
              </Button>
              <span className="text-muted-foreground text-xs">Recommended size: 1600 x 500px</span>
            </div>
            <input
              id="headerImageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Organization Name</label>
          <Input defaultValue="Alpha Phi Omega" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Chapter Designation</label>
          <Input defaultValue="Gamma Alpha" />
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Organization Description</label>
        <textarea 
          className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2"
          defaultValue="Alpha Phi Omega is a national co-educational service fraternity founded on the principles of leadership, friendship, and service."
        />
      </div>
      
      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  );
};

export default OrganizationSettings;
