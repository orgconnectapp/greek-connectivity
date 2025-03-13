
import React from 'react';
import StatCard from './StatCard';
import { DollarSign, LineChart, Users } from 'lucide-react';

interface StatsListProps {
  stats: Array<{
    title: string;
    value: string;
    icon: typeof DollarSign | typeof LineChart | typeof Users;
    change: string;
    up: boolean | null;
  }>;
}

const StatsList = ({ stats }: StatsListProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {stats.map((stat, i) => (
        <StatCard
          key={i}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          change={stat.change}
          up={stat.up}
        />
      ))}
    </div>
  );
};

export default StatsList;
