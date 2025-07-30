// Mock data generators and initial data
export function generateRevenueData() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => ({
    name: month,
    revenue: Math.floor(Math.random() * 100) + 50
  }));
}

export function generateSalesData() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map(day => ({
    day,
    sales: Math.floor(Math.random() * 100) + 20
  }));
}

export function generateDeviceData() {
  return [
    { name: 'Desktop', value: Math.floor(Math.random() * 500) + 200 },
    { name: 'Mobile', value: Math.floor(Math.random() * 800) + 400 },
    { name: 'Tablet', value: Math.floor(Math.random() * 300) + 100 },
    { name: 'Smart TV', value: Math.floor(Math.random() * 150) + 50 },
    { name: 'Other', value: Math.floor(Math.random() * 100) + 30 }
  ];
}

export function generateTableData() {
  const statuses = ['completed', 'pending', 'cancelled'];
  const customers = [
    'John Smith', 'Sarah Johnson', 'Michael Brown', 'Emily Davis', 'David Wilson',
    'Lisa Anderson', 'James Taylor', 'Maria Garcia', 'Robert Martinez', 'Jennifer White',
    'William Lopez', 'Elizabeth Lee', 'Christopher Hall', 'Linda Young', 'Daniel King'
  ];

  return Array.from({ length: 50 }, (_, i) => ({
    id: String(10001 + i),
    customer: customers[Math.floor(Math.random() * customers.length)],
    amount: Math.floor(Math.random() * 5000) + 100,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()
  }));
}

export function generateOverviewData() {
  return {
    totalRevenue: Math.floor(Math.random() * 100000) + 50000,
    revenueChange: (Math.random() * 20 - 10).toFixed(1),
    activeUsers: Math.floor(Math.random() * 10000) + 5000,
    usersChange: (Math.random() * 30 - 15).toFixed(1),
    conversions: Math.floor(Math.random() * 1000) + 500,
    conversionsChange: (Math.random() * 25 - 12.5).toFixed(1),
    growthRate: (Math.random() * 15 + 5).toFixed(1),
    growthChange: (Math.random() * 10 - 5).toFixed(1)
  };
}

// Real-time data update function
export function updateDataRealtime(currentData, type) {
  const variance = 0.1; // 10% variance
  
  switch (type) {
    case 'overview':
      return {
        ...currentData,
        totalRevenue: Math.max(0, currentData.totalRevenue + (Math.random() - 0.5) * currentData.totalRevenue * variance),
        activeUsers: Math.max(0, Math.floor(currentData.activeUsers + (Math.random() - 0.5) * currentData.activeUsers * variance)),
        conversions: Math.max(0, Math.floor(currentData.conversions + (Math.random() - 0.5) * currentData.conversions * variance))
      };
    
    case 'revenue':
      return currentData.map(item => ({
        ...item,
        revenue: Math.max(0, item.revenue + (Math.random() - 0.5) * item.revenue * variance)
      }));
    
    case 'sales':
      return currentData.map(item => ({
        ...item,
        sales: Math.max(0, Math.floor(item.sales + (Math.random() - 0.5) * item.sales * variance))
      }));
    
    case 'devices':
      return currentData.map(item => ({
        ...item,
        value: Math.max(0, Math.floor(item.value + (Math.random() - 0.5) * item.value * variance))
      }));
    
    default:
      return currentData;
  }
}