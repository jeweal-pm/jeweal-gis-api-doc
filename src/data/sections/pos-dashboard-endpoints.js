const POS_HEADERS = [
  { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
  { name: "Pos-Authorization", type: "string", required: true, in: "header", description: "JWT from generatePOSAuthToken (POS session)." },
  { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
  { name: "accept", type: "string", required: false, in: "header", description: "application/json, text/plain, */*" },
];

const DATE_RANGE_BODY = {
  start_date: "2026-05-11",
  end_date: "2026-06-09",
};

const DATE_RANGE_PARAMS = [
  { name: "start_date", type: "string", required: true, description: "Range start date (YYYY-MM-DD)." },
  { name: "end_date", type: "string", required: true, description: "Range end date (YYYY-MM-DD)." },
];

function graphEndpoint(id, step, pathSuffix, title, description, sampleData) {
  return {
    id,
    method: "POST",
    path: `/POS/dashboard/${pathSuffix}`,
    title,
    description: `Step ${step} — ${description}`,
    requestBody: DATE_RANGE_BODY,
    response: { success: true, data: sampleData },
    params: [...POS_HEADERS, ...DATE_RANGE_PARAMS],
  };
}

export default [
  {
    id: "dashboard-header",
    method: "POST",
    path: "/POS/dashboard/header",
    title: "Get Dashboard Header",
    description: "Step 1 — Summary KPIs for the POS dashboard header (sales, orders, customers) for the selected date range.",
    requestBody: DATE_RANGE_BODY,
    response: {
      success: true,
      data: {
        total_sales: 144000,
        total_orders: 12,
        total_customers: 8,
        average_order_value: 12000,
      },
    },
    params: [...POS_HEADERS, ...DATE_RANGE_PARAMS],
  },
  {
    id: "dashboard-top-products",
    method: "POST",
    path: "/POS/dashboard/top-products",
    title: "Get Top Products",
    description: "Step 2 — Best-selling products for the selected date range.",
    requestBody: { ...DATE_RANGE_BODY, limit: 10 },
    response: {
      success: true,
      data: [
        { SKU: "CLEO-B1WGBC-S", name: "Cleo Diamond Slim Slip-On Bracelet", qty: 5, amount: 72000 },
      ],
    },
    params: [
      ...POS_HEADERS,
      ...DATE_RANGE_PARAMS,
      { name: "limit", type: "number", required: false, description: "Max products to return (e.g. 10)." },
    ],
  },
  {
    id: "dashboard-top-customers",
    method: "POST",
    path: "/POS/dashboard/top-customers",
    title: "Get Top Customers",
    description: "Step 3 — Highest-spending customers for the selected date range.",
    requestBody: { ...DATE_RANGE_BODY, limit: "10" },
    response: {
      success: true,
      data: [
        { customer_id: "69d38581135009caf45c2c64", name: "Tanu yadav Yadav", total_spent: 48000 },
      ],
    },
    params: [
      ...POS_HEADERS,
      ...DATE_RANGE_PARAMS,
      { name: "limit", type: "string", required: false, description: "Max customers to return (e.g. \"10\")." },
    ],
  },
  graphEndpoint(
    "dashboard-customer-category",
    4,
    "customer-category",
    "Get Customer Category",
    "Customer category breakdown chart data.",
    [{ category: "VIP", count: 12 }, { category: "Regular", count: 45 }]
  ),
  graphEndpoint(
    "dashboard-sale-overview-graph",
    5,
    "sale-overview-graph",
    "Get Sale Overview Graph",
    "Sales overview time-series for the dashboard chart.",
    [{ date: "2026-06-01", amount: 24000 }]
  ),
  graphEndpoint(
    "dashboard-customer-graphs",
    6,
    "customer-graphs",
    "Get Customer Graphs",
    "New vs returning customer graph data.",
    [{ label: "New", value: 15 }, { label: "Returning", value: 32 }]
  ),
  graphEndpoint(
    "dashboard-total-sale-graph",
    7,
    "total-sale-graph",
    "Get Total Sale Graph",
    "Total sales graph data by period.",
    [{ date: "2026-06-01", total: 24000 }]
  ),
  graphEndpoint(
    "dashboard-segment-graph",
    8,
    "segment-graph",
    "Get Segment Graph",
    "Sales segment breakdown graph data.",
    [{ segment: "Rings", amount: 80000 }]
  ),
  graphEndpoint(
    "dashboard-wishlist-graph",
    9,
    "wishlist-graph",
    "Get Wishlist Graph",
    "Wishlist activity graph data.",
    [{ date: "2026-06-01", count: 3 }]
  ),
  graphEndpoint(
    "dashboard-salesperson-graph",
    10,
    "salesperson-graph",
    "Get Salesperson Graph",
    "Sales by salesperson graph data.",
    [{ sales_person_id: "6965e02731676f953a14c3c6", name: "Born Born", amount: 96000 }]
  ),
  graphEndpoint(
    "dashboard-payment-method-graph",
    11,
    "payment-method-graph",
    "Get Payment Method Graph",
    "Payment method breakdown graph data.",
    [{ method: "cash", amount: 120000 }, { method: "credit_card", amount: 24000 }]
  ),
  graphEndpoint(
    "dashboard-credit-note-graph",
    12,
    "credit-note-graph",
    "Get Credit Note Graph",
    "Credit note usage graph data.",
    [{ date: "2026-06-01", amount: 5000 }]
  ),
  graphEndpoint(
    "dashboard-debit-note-graph",
    13,
    "debit-note-graph",
    "Get Debit Note Graph",
    "Debit note graph data.",
    [{ date: "2026-06-01", amount: 2000 }]
  ),
  graphEndpoint(
    "dashboard-deposit-graph",
    14,
    "deposit-graph",
    "Get Deposit Graph",
    "Deposit orders graph data.",
    [{ date: "2026-06-01", amount: 15000 }]
  ),
  graphEndpoint(
    "dashboard-custom-order-graph",
    15,
    "custom-order-graph",
    "Get Custom Order Graph",
    "Custom order graph data.",
    [{ date: "2026-06-01", count: 2 }]
  ),
  graphEndpoint(
    "dashboard-repair-order-graph",
    16,
    "repair-order-graph",
    "Get Repair Order Graph",
    "Repair order graph data.",
    [{ date: "2026-06-01", count: 1 }]
  ),
  graphEndpoint(
    "dashboard-exchange-graph",
    17,
    "exchange-graph",
    "Get Exchange Graph",
    "Exchange order graph data.",
    [{ date: "2026-06-01", count: 1 }]
  ),
  graphEndpoint(
    "dashboard-refund-graph",
    18,
    "refund-graph",
    "Get Refund Graph",
    "Refund graph data.",
    [{ date: "2026-06-01", amount: 8000 }]
  ),
  graphEndpoint(
    "dashboard-reserved-graph",
    19,
    "reserved-graph",
    "Get Reserved Graph",
    "Reserve order graph data.",
    [{ date: "2026-06-01", count: 3 }]
  ),
  graphEndpoint(
    "dashboard-cash-register-graph",
    20,
    "cash-register-graph",
    "Get Cash Register Graph",
    "Cash register activity graph data.",
    [{ date: "2026-06-01", opening: 10000, closing: 45000 }]
  ),
];
