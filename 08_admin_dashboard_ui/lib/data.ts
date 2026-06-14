export const statsCards = [
  {
    title: "Total Revenue",
    value: "$84,250",
    change: "+12.5%",
    up: true,
    icon: "💰",
    color: "green",
    sub: "vs last month",
  },
  {
    title: "Active Users",
    value: "24,318",
    change: "+8.2%",
    up: true,
    icon: "👥",
    color: "blue",
    sub: "vs last month",
  },
  {
    title: "New Orders",
    value: "1,847",
    change: "+3.1%",
    up: true,
    icon: "📦",
    color: "purple",
    sub: "vs last month",
  },
  {
    title: "Bounce Rate",
    value: "24.8%",
    change: "-2.4%",
    up: false,
    icon: "📉",
    color: "red",
    sub: "vs last month",
  },
];

export const revenueData = [
  { month: "Jan", revenue: 42000, orders: 820 },
  { month: "Feb", revenue: 38000, orders: 740 },
  { month: "Mar", revenue: 55000, orders: 1100 },
  { month: "Apr", revenue: 47000, orders: 950 },
  { month: "May", revenue: 63000, orders: 1250 },
  { month: "Jun", revenue: 58000, orders: 1180 },
  { month: "Jul", revenue: 71000, orders: 1400 },
  { month: "Aug", revenue: 67000, orders: 1320 },
  { month: "Sep", revenue: 84250, orders: 1847 },
];

export const trafficData = [
  { name: "Organic", value: 42, color: "#6c63ff" },
  { name: "Direct", value: 28, color: "#10b981" },
  { name: "Social", value: 18, color: "#f59e0b" },
  { name: "Referral", value: 12, color: "#3b82f6" },
];

export const recentOrders = [
  {
    id: "#ORD-001",
    customer: "Ahmed Khan",
    product: "Pro Plan",
    amount: "$299",
    status: "Completed",
    avatar: "AK",
  },
  {
    id: "#ORD-002",
    customer: "Sara Ali",
    product: "Basic Plan",
    amount: "$99",
    status: "Pending",
    avatar: "SA",
  },
  {
    id: "#ORD-003",
    customer: "Bilal Ahmed",
    product: "Enterprise",
    amount: "$999",
    status: "Completed",
    avatar: "BA",
  },
  {
    id: "#ORD-004",
    customer: "Fatima Noor",
    product: "Pro Plan",
    amount: "$299",
    status: "Cancelled",
    avatar: "FN",
  },
  {
    id: "#ORD-005",
    customer: "Usman Sheikh",
    product: "Basic Plan",
    amount: "$99",
    status: "Completed",
    avatar: "US",
  },
  {
    id: "#ORD-006",
    customer: "Zainab Malik",
    product: "Enterprise",
    amount: "$999",
    status: "Pending",
    avatar: "ZM",
  },
];

export const topProducts = [
  { name: "Enterprise Plan", sales: 284, revenue: "$284,000", pct: 92 },
  { name: "Pro Plan", sales: 573, revenue: "$171,027", pct: 78 },
  { name: "Basic Plan", sales: 990, revenue: "$98,010", pct: 60 },
];

export const navItems = [
  { icon: "📊", label: "Dashboard", active: true },
  { icon: "👥", label: "Users", active: false },
  { icon: "📦", label: "Orders", active: false },
  { icon: "📈", label: "Analytics", active: false },
  { icon: "🛍️", label: "Products", active: false },
  { icon: "💬", label: "Messages", active: false },
  { icon: "⚙️", label: "Settings", active: false },
];
