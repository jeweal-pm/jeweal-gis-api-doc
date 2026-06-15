export default {
      id: "dashboard",
      label: "Dashboard",
      icon: "📊",
      color: "#14b8a6",
      description: "Dashboard widgets and chart data. All routes are POST. Send JWT in the authorization header (lowercase name matches browser/UAT). Base URL uses UAT; change apiData.baseUrl if you point elsewhere.",
      subsections: [
        {
          id: "dashboard-header-settings",
          label: "Header & default settings",
          color: "#14b8a6",
          endpoints: [
            {
              id: "dashboard-header-statics",
              method: "POST",
              path: "/dashboard/headerStatics",
              title: "Header statics",
              description: "KPI strip: growth %, formatted sales, orders count, customer count, product count.",
              requestBody: {},
              response: {
                code: 200,
                statics: {
                  growth: 73.07692307692307,
                  sales: "1,541,282",
                  order: "57",
                  Customer: 67,
                  product: 11088
                }
              },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login. UAT sends header name as lowercase `authorization` with the raw token (no Bearer prefix required)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "accept", type: "string", required: false, in: "header", description: "application/json, text/plain, */*" }
              ]
            },
            {
              id: "dashboard-default-setting",
              method: "POST",
              path: "/dashboard/defaultSetting",
              title: "Default setting",
              description: "Which dashboard widgets/cards are enabled (1 = on). Keys match widget identifiers in the admin UI.",
              requestBody: {},
              response: {
                code: 200,
                settings: {
                  TotalSales: 1,
                  SalesTheMost: 1,
                  Inventory: 1,
                  SummaryPurchaseOrder: 1,
                  PurchaseOrder: 1,
                  Purchase: 1,
                  CustomOrder: 1,
                  OrdersTheMost: 1,
                  SalesBySalesperson: 1,
                  PaymentMethod: 1,
                  AllLocations: 1,
                  AgeandGender: 1,
                  SpecifiedOccasion: 1,
                  Device: 1,
                  Lifestage: 1
                }
              },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login (raw token in lowercase `authorization` header for UAT)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "accept", type: "string", required: false, in: "header", description: "application/json, text/plain, */*" }
              ]
            }
          ]
        },
        {
          id: "dashboard-sales",
          label: "Sales analytics",
          color: "#0d9488",
          endpoints: [
            {
              id: "dashboard-totalsales-statics",
              method: "POST",
              path: "/dashboard/totalsalesStatics",
              title: "Total sales statics",
              description: "Chart data for total sales by duration and graph type. Optional location filter (empty string = all).",
              requestBody: { graphtype: "Chart", duration: "Monthly", location: "" },
              response: {
                code: 200,
                statics: [
                  { label: "Week 1", value: 125000 },
                  { label: "Week 2", value: 142500 }
                ],
                note: "Replace with your live series; shape depends on graphtype/duration."
              },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT (lowercase `authorization` in UAT)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "graphtype", type: "string", required: true, description: "e.g. Chart" },
                { name: "duration", type: "string", required: true, description: "e.g. Monthly" },
                { name: "location", type: "string", required: false, description: "Location id or empty for all" }
              ]
            },
            {
              id: "dashboard-sales-most-statics",
              method: "POST",
              path: "/dashboard/salesMostStatics",
              title: "Sales the most statics",
              description: "Top performers (e.g. by Collection, Metal) for chart widgets.",
              requestBody: { graphtype: "Chart", duration: "Monthly", type: "Collection", topNumber: 5 },
              response: {
                code: 200,
                statics: [
                  { name: "Diamond Rings", amount: 320000 },
                  { name: "Gold Chains", amount: 210000 }
                ],
                note: "Replace with live top-N rows from your API."
              },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT (lowercase `authorization` in UAT)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "graphtype", type: "string", required: true, description: "e.g. Chart" },
                { name: "duration", type: "string", required: true, description: "e.g. Monthly" },
                { name: "type", type: "string", required: true, description: "e.g. Collection" },
                { name: "topNumber", type: "integer", required: true, description: "How many rows to return" }
              ]
            }
          ]
        },
        {
          id: "dashboard-inventory",
          label: "Inventory",
          color: "#64748b",
          endpoints: [
            {
              id: "dashboard-inventory-statics",
              method: "POST",
              path: "/dashboard/inventoryStatics",
              title: "Inventory statics",
              description: "Inventory chart by duration and graph type; optional location.",
              requestBody: { duration: "Monthly", graphtype: "Chart", location: "" },
              response: {
                code: 200,
                statics: [
                  { label: "In stock", value: 820 },
                  { label: "Low stock", value: 34 }
                ],
                note: "Replace with live inventory chart payload."
              },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT (lowercase `authorization` in UAT)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "duration", type: "string", required: true, description: "e.g. Monthly" },
                { name: "graphtype", type: "string", required: true, description: "e.g. Chart" },
                { name: "location", type: "string", required: false, description: "Location id or empty" }
              ]
            },
            {
              id: "dashboard-inventory-stock-statics",
              method: "POST",
              path: "/dashboard/invetoryStockStatics",
              title: "Inventory stock statics",
              description: "Stock breakdown by type (e.g. Locations). Path spelling matches backend: invetoryStockStatics.",
              requestBody: { graphtype: "Chart", type: "Locations" },
              response: {
                code: 200,
                statics: [
                  { location: "Main Store", qty: 4100 },
                  { location: "Warehouse", qty: 1200 }
                ],
                note: "Replace with live per-location (or other dimension) stock data."
              },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT (lowercase `authorization` in UAT)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "graphtype", type: "string", required: true, description: "e.g. Chart" },
                { name: "type", type: "string", required: true, description: "e.g. Locations" }
              ]
            }
          ]
        }
      ]
    };
