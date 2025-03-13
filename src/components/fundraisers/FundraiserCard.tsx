
import React from 'react';
import { Calendar, Share2, MoreHorizontal, Users } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DonorType, FundraiserType } from './data';

interface FundraiserCardProps {
  fundraiser: FundraiserType;
  visibleDonors: DonorType[];
  remainingDonorNames: string[];
  otherDonorsCount: number;
  onShare: (fundraiser: FundraiserType) => void;
  onDoubleClick: () => void;
  onContribute: () => void;
}

const FundraiserCard = ({
  fundraiser,
  visibleDonors,
  remainingDonorNames,
  otherDonorsCount,
  onShare,
  onDoubleClick,
  onContribute,
}: FundraiserCardProps) => {
  const progress = Math.min(Math.round((fundraiser.raised / fundraiser.goal) * 100), 100);

  const statusColor = {
    active: "bg-green-100 text-green-700",
    upcoming: "bg-blue-100 text-blue-700",
    completed: "bg-gray-100 text-gray-700"
  };

  return (
    <Card
      className="overflow-hidden transition-all hover:shadow-subtle animate-scale-in cursor-pointer"
      onDoubleClick={onDoubleClick}
    >
      <div className="overflow-hidden">
        <AspectRatio ratio={16 / 9}>
          <img
            src={fundraiser.image}
            alt={fundraiser.title}
            className="object-cover w-full h-full transition-transform hover:scale-105"
          />
        </AspectRatio>
      </div>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge className={statusColor[fundraiser.status]}>
            {fundraiser.status.charAt(0).toUpperCase() + fundraiser.status.slice(1)}
          </Badge>
          <div className="flex items-center gap-1">
            {fundraiser.status === 'active' && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  onShare(fundraiser);
                }}
                title="Share fundraiser"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => {
                  e.stopPropagation();
                  onShare(fundraiser);
                }}>Share</DropdownMenuItem>
                {fundraiser.status === 'active' && (
                  <DropdownMenuItem>Mark Completed</DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <CardTitle className="text-lg font-medium">{fundraiser.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {fundraiser.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{fundraiser.date}</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">${fundraiser.raised} of ${fundraiser.goal}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {visibleDonors.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>Recent Donors</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex -space-x-2">
                {visibleDonors.map((donor) => (
                  <Avatar key={donor.id} className="border-2 border-background h-8 w-8">
                    <AvatarImage src={donor.avatar} alt={donor.name} />
                    <AvatarFallback>{donor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              
              {(remainingDonorNames.length > 0 || otherDonorsCount > 0) && (
                <span className="text-xs text-muted-foreground">
                  {remainingDonorNames.length > 0 ? (
                    <>
                      +{remainingDonorNames.join(', ')}
                      {otherDonorsCount > 0 && ` and ${otherDonorsCount} others`}
                    </>
                  ) : (
                    otherDonorsCount > 0 && `+${otherDonorsCount} others`
                  )}
                </span>
              )}
            </div>
          </div>
        )}

        {fundraiser.status === 'active' && (
          <div className="flex gap-2">
            <Button 
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation();
                onContribute();
              }}
            >
              Contribute
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onShare(fundraiser);
              }}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        )}

        {fundraiser.status === 'upcoming' && (
          <Button variant="outline" className="w-full">Get Notified</Button>
        )}

        {fundraiser.status === 'completed' && (
          <Button variant="outline" className="w-full">View Results</Button>
        )}
      </CardContent>
    </Card>
  );
};

export default FundraiserCard;
