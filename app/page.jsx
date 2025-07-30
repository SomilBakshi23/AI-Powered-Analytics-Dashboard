"use client";

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Navbar } from '@/components/dashboard/navbar';
import { OverviewCards } from '@/components/dashboard/overview-cards';
import { RevenueChart, SalesChart, DeviceChart } from '@/components/dashboard/charts';
import { DataTable } from '@/components/dashboard/data-table';
import { DateRangePicker } from '@/components/dashboard/date-range-picker';
import { OverviewCardsSkeleton, ChartSkeleton, TableSkeleton } from '@/components/dashboard/loading-skeleton';
import { Button } from '@/components/ui/button';
import { RefreshCw, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  generateOverviewData,
  generateRevenueData,
  generateSalesData,
  generateDeviceData,
  generateTableData,
  updateDataRealtime
} from '@/lib/mock-data';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [overviewData, setOverviewData] = useState(null);
  const [revenueData, setRevenueData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [deviceData, setDeviceData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [dateRange, setDateRange] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Initialize data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setOverviewData(generateOverviewData());
      setRevenueData(generateRevenueData());
      setSalesData(generateSalesData());
      setDeviceData(generateDeviceData());
      setTableData(generateTableData());
      setIsLoading(false);
    };

    loadData();
  }, []);

  // Real-time updates
  useEffect(() => {
    if (isLoading) return;

    const interval = setInterval(() => {
      setOverviewData(current => updateDataRealtime(current, 'overview'));
      setRevenueData(current => updateDataRealtime(current, 'revenue'));
      setSalesData(current => updateDataRealtime(current, 'sales'));
      setDeviceData(current => updateDataRealtime(current, 'devices'));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [isLoading]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setOverviewData(generateOverviewData());
    setRevenueData(generateRevenueData());
    setSalesData(generateSalesData());
    setDeviceData(generateDeviceData());
    setTableData(generateTableData());
    setIsRefreshing(false);
  };

  const handleDateRangeChange = (newDateRange) => {
    setDateRange(newDateRange);
    // In a real app, this would trigger a data refresh with the new date range
    console.log('Date range changed:', newDateRange);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto bg-muted/20">
          <div className="container mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                  Welcome back! Here's what's happening with your business today.
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <DateRangePicker onDateChange={handleDateRangeChange} />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="h-10 w-10"
                >
                  <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
                </Button>
              </div>
            </div>

            {/* Real-time indicator */}
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Live data • Updates every 5 seconds</span>
              <TrendingUp className="h-4 w-4 ml-2" />
            </div>

            {/* Overview Cards */}
            {isLoading ? (
              <OverviewCardsSkeleton />
            ) : (
              <OverviewCards data={overviewData} />
            )}

            {/* Charts */}
            <div className="grid gap-6 lg:grid-cols-3">
              {isLoading ? (
                <>
                  <ChartSkeleton className="col-span-1 lg:col-span-2" />
                  <ChartSkeleton />
                </>
              ) : (
                <>
                  <RevenueChart data={revenueData} />
                  <SalesChart data={salesData} />
                </>
              )}
            </div>

            {/* Device Chart */}
            <div className="grid gap-6 lg:grid-cols-3">
              {isLoading ? (
                <ChartSkeleton />
              ) : (
                <DeviceChart data={deviceData} />
              )}
              
              {/* Additional metrics could go here */}
              <div className="lg:col-span-2 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 p-6 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Avg. Order Value</p>
                        <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">$127.50</p>
                      </div>
                      <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 p-6 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-600 dark:text-green-400">Customer Satisfaction</p>
                        <p className="text-2xl font-bold text-green-900 dark:text-green-100">4.8/5.0</p>
                      </div>
                      <div className="h-12 w-12 bg-green-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">★</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Table */}
            {isLoading ? (
              <TableSkeleton />
            ) : (
              <DataTable data={tableData} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}