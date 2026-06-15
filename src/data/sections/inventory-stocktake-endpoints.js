/** Stock Take — API call order when opening and running a stock take in Inventory. */

const AUTH_HEADERS = [
  { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
  { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
];

const stockTakeEndpoints = [
  {
    id: "st-gql-vouchers",
    method: "POST",
    path: "/Inventory/graphql",
    title: "Get Stock Take Vouchers (GraphQL)",
    description: "Returns voucher types for Stock Take transactions.",
    requestBody: {
      query: '{\n        vouchers(group: "Stock_Take") {\n          id\n          name \n      }\n        }',
      variables: {},
    },
    response: {
      data: {
        vouchers: [{ id: "6965e01b31676f953a14c362", name: "Stock Take Voucher" }],
      },
    },
    params: [...AUTH_HEADERS, { name: "query", type: "string", required: true, description: "GraphQL query string" }],
  },
  {
    id: "st-inventory-filter",
    method: "POST",
    path: "/Inventory/my/filter",
    title: "Get Inventory Filter",
    description: "Loads filter options (items, collections, metals, stones, locations, sizes) for the stock take list screen.",
    requestBody: { custom_filter_enable: false },
    response: {
      code: 200,
      data: {
        items: [{ _id: "63b1a2c4d5e6f7a8b9c0d1e2", name: "Ring" }],
        collections: [{ _id: "63b1a2c4d5e6f7a8b9c0d1e3", name: "Classic" }],
        metals: [{ _id: "5f2a1c3b4e8d7f0012345601", name: "Gold" }],
        stones: [{ _id: "63b1a2c4d5e6f7a8b9c0d1e4", name: "Diamond" }],
        locations: [{ _id: "68cab537f1f31057aecf0629", name: "Heart & Arrow" }],
        sizes: [{ _id: "636c6e81f358a963864565b6", name: "7" }],
      },
    },
    params: [
      ...AUTH_HEADERS,
      { name: "custom_filter_enable", type: "boolean", required: false, description: "Include custom user-defined filters when true" },
    ],
  },
  {
    id: "st-list-new",
    method: "POST",
    path: "/Inventory/stocktake/list_new",
    title: "Stock Take List",
    description: "Returns the stock take summary list filtered by item, collection, metal, stone, location, and size.",
    requestBody: {
      item: [],
      collection: [],
      metal: [],
      stone: [],
      location: [],
      size: [],
    },
    response: {
      code: 200,
      total: 1,
      data: [
        {
          _id: "69c763e1e3db978456e8fd08",
          stock_take_no: "ST-001",
          location_name: "Heart & Arrow",
          total_items: 45,
          matched: 40,
          missing: 3,
          extra: 2,
          status: 1,
          createdAt: "30/03/2026",
        },
      ],
    },
    params: [
      ...AUTH_HEADERS,
      { name: "item", type: "array", required: false, description: "Filter by item IDs" },
      { name: "collection", type: "array", required: false, description: "Filter by collection IDs" },
      { name: "metal", type: "array", required: false, description: "Filter by metal IDs" },
      { name: "stone", type: "array", required: false, description: "Filter by stone IDs" },
      { name: "location", type: "array", required: false, description: "Filter by location IDs" },
      { name: "size", type: "array", required: false, description: "Filter by size IDs" },
    ],
  },
  {
    id: "st-pu-details",
    method: "POST",
    path: "/Inventory/stocktake/stockTakePuDetailes_new",
    title: "Stock Take PO Product Details",
    description: "Returns full stock take detail for a PO product line — expected vs scanned quantities.",
    requestBody: { poProductId: "6a17c7f6709fac36f62d18aa" },
    response: {
      code: 200,
      data: {
        _id: "6a17c7f6709fac36f62d18aa",
        stock_id: "ST-2025-001",
        item_name: "Diamond Ring",
        metal: "Gold",
        size: "7",
        location_name: "Heart & Arrow",
        expected_qty: 1,
        scanned_qty: 1,
        status: "matched",
      },
    },
    params: [
      ...AUTH_HEADERS,
      { name: "poProductId", type: "string", required: true, description: "PO product document ID" },
    ],
  },
];

export default stockTakeEndpoints;
