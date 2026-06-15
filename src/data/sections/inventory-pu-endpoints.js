/** Purchase (PU) — API call order when opening, creating, and managing stock receive in Inventory. */

import { CREATE_PU_BODY } from "./inventory-pu-payloads";

const AUTH_HEADERS = [
  { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
  { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
];

const puEndpoints = [
  {
    id: "pu-inventory-filter",
    method: "POST",
    path: "/Inventory/my/filter",
    title: "Get Inventory Filter",
    description: "Loads saved inventory list filters for the current user (PU outstanding screen).",
    requestBody: { custom_filter_enable: false },
    response: { code: 200, data: { custom_filter_enable: false, filters: [] } },
    params: [...AUTH_HEADERS, { name: "custom_filter_enable", type: "boolean", required: false, description: "Whether custom filter is enabled" }],
  },
  {
    id: "pu-get-outstanding-list",
    method: "POST",
    path: "/Inventory/purchase/getPuOutStandingList",
    title: "Get PU Outstanding List",
    description: "Lists outstanding PO products pending receive with item/stone/collection/metal/location filters.",
    requestBody: {
      search: "",
      limit: 100,
      skip: 0,
      item: [],
      stone: [],
      collection: [],
      metal: [],
      location: [],
    },
    response: {
      code: 200,
      count: 1,
      data: [
        {
          id: "6a1ea3d94c02c31adc1ee3d8",
          po_no: "PO-04",
          SKU: "AVEN-B1RGCH-xxl",
          po_QTY: 10,
          due_days: 0,
          supplier_name: "Hamilton Jewelry MFG",
        },
      ],
    },
    params: [
      ...AUTH_HEADERS,
      { name: "search", type: "string", required: false, description: "Search keyword" },
      { name: "limit", type: "integer", required: false, description: "Page size" },
      { name: "skip", type: "integer", required: false, description: "Offset" },
      { name: "item", type: "array", required: false, description: "Filter by item ids" },
      { name: "stone", type: "array", required: false, description: "Filter by stone ids" },
      { name: "collection", type: "array", required: false, description: "Filter by collection ids" },
      { name: "metal", type: "array", required: false, description: "Filter by metal ids" },
      { name: "location", type: "array", required: false, description: "Filter by location ids" },
    ],
  },
  {
    id: "pu-gql-purchase-vouchers",
    method: "POST",
    path: "/Inventory/graphql",
    title: "Get Purchase Vouchers (GraphQL)",
    description: "Returns voucher types for Purchase (PU) transactions.",
    requestBody: {
      query: '{\n        vouchers(group: "Purchase") {\n          id\n          name \n      }\n        }',
      variables: {},
    },
    response: {
      data: {
        vouchers: [{ id: "6965e01b31676f953a14c361", name: "Purchase Voucher" }],
      },
    },
    params: [...AUTH_HEADERS, { name: "query", type: "string", required: true, description: "GraphQL query string" }],
  },
  {
    id: "pu-gql-suppliers",
    method: "POST",
    path: "/Inventory/graphql",
    title: "Get Suppliers (GraphQL)",
    description: "Lists suppliers for PU header selection.",
    requestBody: {
      query: "{\n        suppliers {\n          id\n          name \n          organization\n        }\n      }",
      variables: {},
    },
    response: {
      data: {
        suppliers: [{ id: "696b77ad8a3814a9ca0e4c44", name: "Supplier A", organization: "Demo Org" }],
      },
    },
    params: [...AUTH_HEADERS, { name: "query", type: "string", required: true, description: "GraphQL query string" }],
  },
  {
    id: "pu-gql-metals",
    method: "POST",
    path: "/App/graphql",
    title: "Get Metals (GraphQL)",
    description: "Loads metal master data used on PU line items.",
    requestBody: {
      query: "{\n         metals {\n             id\n             name \n             color\n         }\n     }",
      variables: {},
    },
    response: {
      data: {
        metals: [{ id: "6985da271ba49114d3a1878b", name: "Gold", color: "Yellow" }],
      },
    },
    params: [...AUTH_HEADERS, { name: "query", type: "string", required: true, description: "GraphQL query string" }],
  },
  {
    id: "pu-gql-colors",
    method: "POST",
    path: "/App/graphql",
    title: "Get Colors (GraphQL)",
    description: "Loads color master data for PU line items.",
    requestBody: {
      query: "{\n                colors {\n                    id\n                    name \n                }\n            }",
      variables: {},
    },
    response: {
      data: {
        colors: [{ id: "6985da371ba49114d3a187a3", name: "Yellow" }],
      },
    },
    params: [...AUTH_HEADERS, { name: "query", type: "string", required: true, description: "GraphQL query string" }],
  },
  {
    id: "pu-country-list",
    method: "POST",
    path: "/Auth/Web/country-list",
    title: "Get Country List",
    description: "Country dropdown for supplier/address fields on PU form.",
    requestBody: {},
    response: { code: 200, data: [{ id: "AE", name: "United Arab Emirates" }] },
    params: AUTH_HEADERS,
  },
  {
    id: "pu-get-create-purchase-list",
    method: "POST",
    path: "/Inventory/purchase/getCreatePurchaseList",
    title: "Get Create Purchase List",
    description: "Returns selected PO product lines for the PU creation screen.",
    requestBody: {
      po_product_id: ["6a1ea3d94c02c31adc1ee3d8"],
      search: "",
      limit: 100,
      skip: 0,
    },
    response: {
      code: 200,
      data: [
        {
          id: "6a1ea3d94c02c31adc1ee3d8",
          po_no: "PO-04",
          product_id: "690df58080aa26f3bac58ff3",
          SKU: "AVEN-B1RGCH-xxl",
          po_QTY: 10,
          price: 5250,
          amount_total: 52500,
        },
      ],
    },
    params: [
      ...AUTH_HEADERS,
      { name: "po_product_id", type: "array", required: true, description: "Array of PO product line ids from outstanding list" },
      { name: "search", type: "string", required: false, description: "Search keyword" },
      { name: "limit", type: "integer", required: false, description: "Page size" },
      { name: "skip", type: "integer", required: false, description: "Offset" },
    ],
  },
  {
    id: "pu-gql-voucher-by-id",
    method: "POST",
    path: "/Inventory/graphql",
    title: "Get Voucher by ID (GraphQL)",
    description: "Loads PU voucher details including allowed receive locations.",
    requestBody: {
      query: '{\n        voucherById(id: "6965e01b31676f953a14c361") {\n           id\n          name\n          locations{\n              id,\n              name,\n              type\n          }\n        }\n      }',
      variables: {},
    },
    response: {
      data: {
        voucherById: {
          id: "6965e01b31676f953a14c361",
          name: "Purchase Voucher",
          locations: [{ id: "6864eb6c46b97fcef1421d95", name: "Main Store", type: "Store" }],
        },
      },
    },
    params: [...AUTH_HEADERS, { name: "query", type: "string", required: true, description: "GraphQL query with voucher id" }],
  },
  {
    id: "pu-check-bulk-stock-id",
    method: "POST",
    path: "/Inventory/purchase/checkBulkStockID",
    title: "Check Bulk Stock IDs",
    description: "Validates stock ids with quantity and SKU before PU submission.",
    requestBody: {
      stockIds: [{ qty: 1, SKU: "AVEN-B1RGCH-xxl", stockid: "sssssss" }],
    },
    response: {
      code: 200,
      data: [{ stockid: "sssssss", valid: true, message: "available" }],
    },
    params: [
      ...AUTH_HEADERS,
      { name: "stockIds", type: "array", required: true, description: "Array of { qty, SKU, stockid }" },
    ],
  },
  {
    id: "pu-create",
    method: "POST",
    path: "/Inventory/purchase/createPU",
    title: "Create Purchase (Receive Stock)",
    description: "Submit PU with voucher, supplier, PO link, stock ids, stones, multi-location price details, and totals.",
    requestBody: CREATE_PU_BODY,
    response: { code: 200, message: "Purchase created", id: "6a292ea904b84f35df789c53" },
    params: [
      ...AUTH_HEADERS,
      { name: "voucher_id", type: "string", required: true, description: "PU voucher type ID" },
      { name: "location_id", type: "string", required: true, description: "Receiving location ID" },
      { name: "supplier_id", type: "string", required: true, description: "Supplier ID" },
      { name: "po_order_id", type: "string", required: false, description: "Linked PO order ID" },
      { name: "purchase_data", type: "array", required: true, description: "Receive lines with stock_id, quantity, Stones, PriceDetails, weights" },
      { name: "subtotal_amount", type: "string", required: false, description: "Formatted subtotal" },
      { name: "total_amount", type: "string", required: false, description: "Formatted grand total" },
    ],
  },
  {
    id: "pu-get-list",
    method: "POST",
    path: "/Inventory/purchase/getList",
    title: "Get Purchase List",
    description: "Paginated PU list filtered by date range, status, and search.",
    requestBody: {
      start_date: "2026-05-09T18:30:00.000Z",
      end_date: "2026-06-10T18:29:59.999Z",
      search: "",
      skip: 0,
      status: 2,
      limit: 100,
    },
    response: {
      code: 200,
      total: 1,
      data: [
        {
          _id: "6a292ea904b84f35df789c53",
          pu_number: "PU-2026-001",
          supplier: "Supplier A",
          status: 2,
          total: 5250,
        },
      ],
    },
    params: [
      ...AUTH_HEADERS,
      { name: "start_date", type: "string", required: false, description: "Start of date range (ISO)" },
      { name: "end_date", type: "string", required: false, description: "End of date range (ISO)" },
      { name: "search", type: "string", required: false, description: "Search keyword" },
      { name: "status", type: "integer", required: false, description: "1=Pending 2=Approved 3=Completed" },
      { name: "skip", type: "integer", required: false, description: "Offset" },
      { name: "limit", type: "integer", required: false, description: "Page size" },
    ],
  },
  {
    id: "pu-get-po-details",
    method: "POST",
    path: "/Inventory/po/getPODetails",
    title: "Get PO Details (linked order)",
    description: "Loads PO line items when viewing or editing a PU linked to a purchase order.",
    requestBody: {
      po_order_id: "6a1ea3d94c02c31adc1ee3c9",
      limit: 100,
      search: "",
      status: 1,
      show_all: true,
    },
    response: {
      code: 200,
      data: {
        po_order_id: "6a1ea3d94c02c31adc1ee3c9",
        items: [{ id: "6a1ea3d94c02c31adc1ee3d8", SKU: "AVEN-B1RGCH-xxl", po_QTY: 10 }],
      },
    },
    params: [
      ...AUTH_HEADERS,
      { name: "po_order_id", type: "string", required: true, description: "Purchase order ID" },
      { name: "show_all", type: "boolean", required: false, description: "Include all PO lines" },
      { name: "status", type: "integer", required: false, description: "PO line status filter" },
      { name: "search", type: "string", required: false, description: "Search keyword" },
      { name: "limit", type: "integer", required: false, description: "Page size" },
    ],
  },
  {
    id: "pu-get-pointer-by-shape-id",
    method: "POST",
    path: "/App/product/getPointerByShapeID",
    title: "Get Pointer by Shape ID",
    description: "Pointer options for a stone shape when editing PU line stones. Call once per shape id.",
    requestBody: { id: "6965e0c747448919d8611c2c" },
    response: { code: 200, data: [{ value: "0.01", label: "0.01" }] },
    params: [
      ...AUTH_HEADERS,
      { name: "id", type: "string", required: true, description: "Stone shape ID" },
    ],
  },
  {
    id: "pu-get-shape-to-stone-size",
    method: "POST",
    path: "/App/product/getShapeToStoneSize",
    title: "Get Shape to Stone Size",
    description: "Stone sizes available for a shape when editing PU line stones.",
    requestBody: { id: "6965e0c747448919d8611c2c" },
    response: {
      code: 200,
      data: [{ _id: "6965e0c747448919d8611c38", label: "xxl", name: "xxl" }],
    },
    params: [
      ...AUTH_HEADERS,
      { name: "id", type: "string", required: true, description: "Stone shape ID" },
    ],
  },
  {
    id: "pu-get-pointer-by-shape-id-alt",
    method: "POST",
    path: "/App/product/getPointerByShapeID",
    title: "Get Pointer by Shape ID (alternate shape)",
    description: "Second shape lookup during stone editing — same endpoint, different shape id (e.g. RD).",
    requestBody: { id: "69721110347a382e0944a59b" },
    response: { code: 200, data: [{ value: "0.01", label: "0.01" }] },
    params: [
      ...AUTH_HEADERS,
      { name: "id", type: "string", required: true, description: "Stone shape ID" },
    ],
  },
  {
    id: "pu-edit-status",
    method: "POST",
    path: "/Inventory/purchase/editPUStatus",
    title: "Update Purchase Status",
    description: "Approve or change status of an existing PU transaction.",
    requestBody: {
      pu_order_id: "6a292ea904b84f35df789c53",
      status: 1,
    },
    response: { code: 200, message: "Status Updated Successfully." },
    params: [
      ...AUTH_HEADERS,
      { name: "pu_order_id", type: "string", required: true, description: "Purchase (PU) order ID" },
      { name: "status", type: "integer", required: true, description: "1=Pending 2=Approved 3=Completed" },
    ],
  },
];

export default puEndpoints;
