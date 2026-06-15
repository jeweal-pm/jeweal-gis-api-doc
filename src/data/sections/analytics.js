const REPORT_HEADERS = [
  { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
  { name: "Pos-Authorization", type: "string", required: true, in: "header", description: "JWT for the current POS session (location, user, currency)." },
  { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
  { name: "accept", type: "string", required: false, in: "header", description: "application/json, text/plain, */*" },
];

const PAGINATION_PARAMS = [
  { name: "page", type: "integer", required: true, description: "Page number (1-based)." },
  { name: "limit", type: "integer", required: true, description: "Rows per page." },
];

function reportEndpoint({ id, path, title, description, paginated = true }) {
  return {
    id,
    method: "POST",
    path: `/Inventory/reports/${path}`,
    title,
    description,
    requestBody: paginated ? { page: 1, limit: 10 } : {},
    response: paginated
      ? { code: 200, data: [], total: 0, page: 1, limit: 10 }
      : { code: 200, data: {} },
    params: [...REPORT_HEADERS, ...(paginated ? PAGINATION_PARAMS : [])],
  };
}

export default {
  id: "analytics",
  label: "Analytics",
  icon: "📈",
  color: "#0891b2",
  description: "Inventory analytics and sales reports. All routes are POST under /Inventory/reports. Send admin JWT in authorization and POS session JWT in Pos-Authorization.",
  subsections: [
    {
      id: "analytics-reports",
      label: "Report",
      color: "#0891b2",
      endpoints: [
        reportEndpoint({
          id: "analytics-brief-report",
          path: "briefReport",
          title: "Brief Summary",
          description: "Paginated brief sales summary report.",
        }),
        reportEndpoint({
          id: "analytics-invoice-summary",
          path: "invoiceSummary",
          title: "Invoice Summary",
          description: "Invoice summary totals and breakdown.",
          paginated: false,
        }),
        reportEndpoint({
          id: "analytics-customer-summary",
          path: "customerSummary",
          title: "Customer Summary",
          description: "Paginated customer sales summary.",
        }),
        reportEndpoint({
          id: "analytics-sales-by-location",
          path: "salesByLocation",
          title: "Sales by Location",
          description: "Sales aggregated by store/location.",
        }),
        reportEndpoint({
          id: "analytics-sales-by-sku",
          path: "salesBySKU",
          title: "Sales by SKU",
          description: "Sales aggregated by product SKU.",
        }),
        reportEndpoint({
          id: "analytics-sales-by-metal",
          path: "salesByMetal",
          title: "Sales by Metal",
          description: "Sales aggregated by metal type.",
        }),
        reportEndpoint({
          id: "analytics-sales-by-metal-stone",
          path: "salesByMetalStone",
          title: "Sales by Metal & Stone",
          description: "Sales aggregated by metal and stone combination.",
        }),
        reportEndpoint({
          id: "analytics-sales-by-stone",
          path: "salesByStone",
          title: "Sales by Stone",
          description: "Sales aggregated by stone type.",
        }),
        reportEndpoint({
          id: "analytics-sales-by-size",
          path: "salesBySize",
          title: "Sales by Size",
          description: "Sales aggregated by item size.",
        }),
        reportEndpoint({
          id: "analytics-sales-by-collection",
          path: "salesByCollection",
          title: "Sales by Collection",
          description: "Sales aggregated by product collection.",
        }),
        reportEndpoint({
          id: "analytics-sales-by-style",
          path: "salesByStyle",
          title: "Sales by Style",
          description: "Sales aggregated by product style.",
        }),
        reportEndpoint({
          id: "analytics-sales-by-salesperson",
          path: "salesBySalesperson",
          title: "Sales by Salesperson",
          description: "Sales aggregated by salesperson.",
        }),
        reportEndpoint({
          id: "analytics-sales-by-item",
          path: "salesByItem",
          title: "Sales by Item",
          description: "Sales aggregated by item master.",
        }),
        reportEndpoint({
          id: "analytics-sales-by-stock-aging",
          path: "salesByStockAging",
          title: "Sales by Stock Aging",
          description: "Sales breakdown by inventory stock-aging buckets.",
        }),
        reportEndpoint({
          id: "analytics-sales-by-price-range",
          path: "salesByPriceRange",
          title: "Item Price Range",
          description: "Sales aggregated by item price range.",
        }),
      ],
    },
  ],
};
