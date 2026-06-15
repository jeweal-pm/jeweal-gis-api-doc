const AUTH_HEADERS = [
  { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
  { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
  { name: "accept", type: "string", required: false, in: "header", description: "application/json, text/plain, */*" },
];

const POS_HEADERS = [
  { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
  { name: "Pos-Authorization", type: "string", required: true, in: "header", description: "JWT from generatePOSAuthToken (POS session)." },
  { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
  { name: "accept", type: "string", required: false, in: "header", description: "application/json, text/plain, */*" },
];

export default [
  {
    id: "receive-salespersons-graphql",
    method: "GRAPHQL",
    path: "/Inventory/graphql",
    title: "Get Sales Persons (GraphQL)",
    description: "Step 1 — Fetch salesperson dropdown options for the receive order.",
    requestBody: {
      query: "{\n          salespersons {\n              id\n              name \n          }\n        }",
      variables: {},
    },
    response: { data: { salespersons: [{ id: "6965e02731676f953a14c3c6", name: "Born Born" }] } },
    params: [
      ...POS_HEADERS,
      { name: "query", type: "string", required: true, description: "GraphQL query for salespersons." },
      { name: "variables", type: "object", required: false, description: "GraphQL variables (empty object)." },
    ],
  },
  {
    id: "receive-countries-graphql",
    method: "GRAPHQL",
    path: "/App/graphql",
    title: "Get Countries (GraphQL)",
    description: "Step 2 — Country list for customer and shipping address during receive checkout.",
    requestBody: {
      query: "{\n                   countries{\n                    name\n                    id\n                    sortname\n                    phoneCode  \n                    }\n                  }",
      variables: {},
    },
    response: {
      data: { countries: [{ id: "101", name: "United States", sortname: "US", phoneCode: "1" }] },
    },
    params: [
      ...AUTH_HEADERS,
      { name: "query", type: "string", required: true, description: "GraphQL query for countries." },
      { name: "variables", type: "object", required: false, description: "GraphQL variables (empty object)." },
    ],
  },
  {
    id: "receive-customer-list",
    method: "POST",
    path: "/Customer/customer/getList",
    title: "Get Customer List",
    description: "Step 3 — Search and load customers for receive processing.",
    requestBody: { name: [], search: "", country: [], city: [] },
    response: {
      success: true,
      total: 50,
      data: [{ _id: "69d38581135009caf45c2c64", name: "Tanu Yadav", email: "tanu@gis247.net", city: "New York" }],
    },
    params: [
      ...POS_HEADERS,
      { name: "search", type: "string", required: false, description: "Search keyword; empty returns all." },
      { name: "name", type: "array", required: false, description: "Filter by customer name." },
      { name: "country", type: "array", required: false, description: "Filter by country." },
      { name: "city", type: "array", required: false, description: "Filter by city." },
    ],
  },
  {
    id: "receive-layby-list-all",
    method: "POST",
    path: "/POS/receive/LayByList",
    title: "Get LayBy List (All)",
    description: "Step 4 — List all layby/installment orders eligible for receive (All tab).",
    requestBody: { type: "ALL", search: "" },
    response: {
      success: true,
      data: [
        {
          _id: "6a27dedb5dcbf9a8dcba11b7",
          order_no: "LB-2026-001",
          customer_name: "Tanu Yadav",
          type: "LayBy",
          balance_due: 5000,
        },
      ],
    },
    params: [
      ...POS_HEADERS,
      { name: "type", type: "string", required: true, description: "ALL — show all receive-eligible orders." },
      { name: "search", type: "string", required: false, description: "Search keyword; empty returns all." },
    ],
  },
  {
    id: "receive-layby-list-layby",
    method: "POST",
    path: "/POS/receive/LayByList",
    title: "Get LayBy List (LayBy)",
    description: "Step 5 — List layby orders only (LayBy tab).",
    requestBody: { type: "LayBy", search: "" },
    response: {
      success: true,
      data: [
        {
          _id: "6a27dedb5dcbf9a8dcba11b7",
          order_no: "LB-2026-001",
          customer_name: "Tanu Yadav",
          type: "LayBy",
          balance_due: 5000,
        },
      ],
    },
    params: [
      ...POS_HEADERS,
      { name: "type", type: "string", required: true, description: "LayBy — filter to layby orders only." },
      { name: "search", type: "string", required: false, description: "Search keyword; empty returns all." },
    ],
  },
  {
    id: "receive-layby-list-installment",
    method: "POST",
    path: "/POS/receive/LayByList",
    title: "Get LayBy List (Installment)",
    description: "Step 6 — List installment orders only (Installment tab).",
    requestBody: { type: "Installment", search: "" },
    response: {
      success: true,
      data: [
        {
          _id: "6a2800125dcbf9a8dcba22c8",
          order_no: "INS-2026-001",
          customer_name: "Tanu Yadav",
          type: "Installment",
          balance_due: 3000,
        },
      ],
    },
    params: [
      ...POS_HEADERS,
      { name: "type", type: "string", required: true, description: "Installment — filter to installment orders only." },
      { name: "search", type: "string", required: false, description: "Search keyword; empty returns all." },
    ],
  },
];
