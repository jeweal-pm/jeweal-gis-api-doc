const POS_HEADERS = [
  { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
  { name: "Pos-Authorization", type: "string", required: true, in: "header", description: "JWT from generatePOSAuthToken (POS session)." },
  { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
  { name: "accept", type: "string", required: false, in: "header", description: "application/json, text/plain, */*" },
];

export default [
  {
    id: "faro-discover",
    method: "POST",
    path: "/POS/catalog/discover",
    title: "Discover",
    description: "AI-assisted catalog discovery — submit a natural-language shopping intent and receive matching product suggestions.",
    requestBody: {
      intent: "I'm shopping for my wife.",
      limit: 20,
    },
    response: {
      success: true,
      code: 200,
      data: [
        {
          _id: "6382c636962d9c3c2332fd6c",
          name: "1 ct Aura round-cut diamond ring",
          sku: "RG025",
          price: 12000,
          in_stock: true,
        },
      ],
    },
    params: [
      ...POS_HEADERS,
      { name: "intent", type: "string", required: true, description: "Natural-language shopping intent (e.g. gift occasion, recipient, style)." },
      { name: "limit", type: "integer", required: false, description: "Maximum number of suggestions to return (default 20)." },
    ],
  },
  {
    id: "faro-search",
    method: "POST",
    path: "/POS/catalog/search",
    title: "Search",
    description: "Semantic catalog search with optional filters — search by query text and refine with stock and attribute filters.",
    requestBody: {
      distill: true,
      limit: 20,
      queryText: "metal",
      filters: {
        inStock: true,
      },
    },
    response: {
      success: true,
      code: 200,
      total: 12,
      data: [
        {
          _id: "6382c636962d9c3c2332fd6c",
          name: "NOBLE Diamond Ring",
          sku: "RG026",
          price: 2850,
          metal: "Gold 18K",
          in_stock: true,
        },
      ],
    },
    params: [
      ...POS_HEADERS,
      { name: "queryText", type: "string", required: true, description: "Search query text." },
      { name: "distill", type: "boolean", required: false, description: "When true, refine/normalize results through the Faro search pipeline." },
      { name: "limit", type: "integer", required: false, description: "Maximum number of results (default 20)." },
      { name: "filters", type: "object", required: false, description: "Optional filters such as inStock, category, metal, or price range." },
      { name: "filters.inStock", type: "boolean", required: false, description: "Return only in-stock items when true." },
    ],
  },
];
