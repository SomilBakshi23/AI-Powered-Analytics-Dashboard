"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function OverviewCards({ data }) {
  const cards = [
    {
      title: 'Total Revenue',
      value: data.totalRevenue,
      change: data.revenueChange,
      icon: DollarSign,
      format: 'currency'
    },
    {
      title: 'Active Users',
      value: data.activeUsers,
      change: data.usersChange,
      icon: Users,
      format: 'number'
    },
    {
      title: 'Conversions',
      value: data.conversions,
      change: data.conversionsChange,
      icon: ShoppingCart,
      format: 'number'
    },
    {
      title: 'Growth Rate',
      value: data.growthRate,
      change: data.growthChange,
      icon: BarChart3,
      format: 'percentage'
    }
  ];

  const formatValue = (value, format) => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(value);
      case 'percentage':
        return `${value}%`;
      default:
        return new Intl.NumberFormat('en-US').format(value);
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        const isPositive = card.change >= 0;
        const TrendIcon = isPositive ? TrendingUp : TrendingDown;

        return (
          <Card key={index} className="relative overflow-hidden group hover:shadow-md transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <div className={cn(
                "h-8 w-8 rounded-lg flex items-center justify-center transition-colors",
                "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
              )}>
                <Icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">
                {formatValue(card.value, card.format)}
              </div>
              <div className="flex items-center text-xs">
                <TrendIcon className={cn(
                  "h-3 w-3 mr-1",
                  isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                )} />
                <span className={cn(
                  "font-medium",
                  isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                )}>
                  {Math.abs(card.change)}%
                </span>
                <span className="text-muted-foreground ml-1">vs last month</span>
              </div>
            </CardContent>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </Card>
        );
      })}
    </div>
  );
}