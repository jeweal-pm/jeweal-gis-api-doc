import {
  REPAIR_ADD_TO_CART_BODY,
  REPAIR_EDIT_CART_BODY,
  REPAIR_SAVE_BODY,
  REPAIR_SAVE_SERVICE_LABOUR_BODY,
} from "./pos-repair-payloads";

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
    id: "repair-get-sales-order-list",
    method: "POST",
    path: "/POS/repair/getSalesOrderList",
    title: "Get Sales Order List (Repair)",
    description: "Step 1 — Load prior sales orders for the selected customer to pick items for repair.",
    requestBody: { customer_id: "69d38581135009caf45c2c64" },
    response: {
      success: true,
      data: [
        {
          cart_id: "6a27e447364b1a07266f008e",
          ref_no: "E-COM17",
          order_id: "6a27e455364b1a07266f010d",
          SKU: "CLEO-B1WGBC-S",
          name: "Cleo Diamond Slim Slip-On Bracelet",
        },
      ],
    },
    params: [
      ...POS_HEADERS,
      { name: "customer_id", type: "string", required: true, description: "Customer ID whose sales history is loaded." },
    ],
  },
  {
    id: "repair-cart-clear",
    method: "POST",
    path: "/POS/customOrder/cartClear",
    title: "Clear Cart",
    description: "Step 2 — Clear the POS cart before starting a repair order.",
    requestBody: {},
    response: { success: true, message: "Cart cleared" },
    params: [...POS_HEADERS],
  },
  {
    id: "repair-salespersons-graphql",
    method: "GRAPHQL",
    path: "/Inventory/graphql",
    title: "Get Sales Persons (GraphQL)",
    description: "Step 3 — Fetch salesperson dropdown options for the repair order.",
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
    id: "repair-customer-list",
    method: "POST",
    path: "/Customer/customer/getList",
    title: "Get Customer List",
    description: "Step 4 — Search and load customers for repair processing.",
    requestBody: { name: [], search: "", country: [], city: [] },
    response: {
      success: true,
      total: 50,
      data: [{ _id: "69d38581135009caf45c2c64", name: "Tanu yadav Yadav", email: "tanu@gis247.net", city: "New York" }],
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
    id: "repair-add-items-to-cart",
    method: "POST",
    path: "/POS/repair/addItemsToCart",
    title: "Add Repair Items To Cart",
    description:
      "Step 5 — Add selected sales-order line items to the repair cart with order_type repair_order. Each cart_ids entry includes reports, product_details, and stock metadata.",
    requestBody: REPAIR_ADD_TO_CART_BODY,
    response: {
      success: true,
      message: "Repair items added to cart",
      custom_cart_id: "6a27e9959ea841c77650f0c6",
    },
    params: [
      ...POS_HEADERS,
      { name: "cart_ids", type: "array", required: true, description: "Sales order lines with cart_id, reports, product_details, ref_no, order_id, SKU, stock_id, Qty, amount." },
      { name: "customer_id", type: "string", required: true, description: "Customer ID." },
      { name: "sales_person_id", type: "string", required: true, description: "Salesperson ID." },
      { name: "order_type", type: "string", required: true, description: "Must be repair_order." },
    ],
  },
  {
    id: "repair-get-cart-items",
    method: "POST",
    path: "/POS/customOrder/getCartItems",
    title: "Get Cart Items",
    description:
      "Step 6 — Load current repair cart lines. Called again after editing cart details and before checkout.",
    requestBody: {},
    response: {
      success: true,
      data: [
        {
          custom_cart_id: "6a27e9959ea841c77650f0c6",
          type: "repair_order",
          SKU: "CLEO-B1WGBC-S",
          price: "1000",
          Service_labour_total_charges: 100,
        },
      ],
    },
    params: [...POS_HEADERS],
  },
  {
    id: "repair-types-graphql",
    method: "GRAPHQL",
    path: "/App/graphql",
    title: "Get Repair Types (GraphQL)",
    description: "Step 7 — Load repair type options for custom repair design.",
    requestBody: {
      query: "{\n        Repair{\n            id\n            name\n            \n        }\n      }",
      variables: {},
    },
    response: { data: { Repair: [{ id: "60e93ea00e55ff1e5f7a5263", name: "Resize" }] } },
    params: [
      ...AUTH_HEADERS,
      { name: "query", type: "string", required: true, description: "GraphQL query for Repair types." },
      { name: "variables", type: "object", required: false, description: "GraphQL variables (empty object)." },
    ],
  },
  {
    id: "repair-service-labour-graphql",
    method: "GRAPHQL",
    path: "/App/graphql",
    title: "Get Service Labour (GraphQL)",
    description: "Step 8 — Load service/labour charge options for repair.",
    requestBody: {
      query: "{\n            ServiceLabour{\n                   name\n                   code\n                   id\n               }\n    }",
      variables: {},
    },
    response: {
      data: {
        ServiceLabour: [{ id: "696b15758bc37f95e66ade44", name: "aassss", code: "aassss" }],
      },
    },
    params: [
      ...AUTH_HEADERS,
      { name: "query", type: "string", required: true, description: "GraphQL query for ServiceLabour." },
      { name: "variables", type: "object", required: false, description: "GraphQL variables (empty object)." },
    ],
  },
  {
    id: "repair-metals-graphql",
    method: "GRAPHQL",
    path: "/App/graphql",
    title: "Get Metals (GraphQL)",
    description: "Step 9 — Metal options for repair item configuration.",
    requestBody: {
      query: "{\n         metals {\n             id\n             name \n             color\n         }\n     }",
      variables: {},
    },
    response: {
      data: { metals: [{ id: "6985da271ba49114d3a18793", name: "White gold", color: "WG" }] },
    },
    params: [
      ...AUTH_HEADERS,
      { name: "query", type: "string", required: true, description: "GraphQL query for metals." },
      { name: "variables", type: "object", required: false, description: "GraphQL variables (empty object)." },
    ],
  },
  {
    id: "repair-colors-graphql",
    method: "GRAPHQL",
    path: "/App/graphql",
    title: "Get Colors (GraphQL)",
    description: "Step 10 — Color options for repair item configuration.",
    requestBody: {
      query: "{\n                colors {\n                    id\n                    name \n                }\n            }",
      variables: {},
    },
    response: { data: { colors: [{ id: "6985da371ba49114d3a187a6", name: "RG" }] } },
    params: [
      ...AUTH_HEADERS,
      { name: "query", type: "string", required: true, description: "GraphQL query for colors." },
      { name: "variables", type: "object", required: false, description: "GraphQL variables (empty object)." },
    ],
  },
  {
    id: "repair-shape-to-stone-size",
    method: "POST",
    path: "/App/product/getShapeToStoneSize",
    title: "Get Shape To Stone Size",
    description: "Step 11 — Shape and stone size mapping for the repair product shape.",
    requestBody: { id: "698b1fb73bd3b0a7a19512bf" },
    response: {
      success: true,
      data: { shape_id: "698b1fb73bd3b0a7a19512bf", stone_sizes: [] },
    },
    params: [
      ...POS_HEADERS,
      { name: "id", type: "string", required: true, description: "Shape ID from product Stones." },
    ],
  },
  {
    id: "repair-save-service-labour",
    method: "POST",
    path: "/POS/customOrder/saveServiceLabour",
    title: "Save Service Labour",
    description: "Step 12 — Attach service/labour charges and remark to a repair cart line.",
    requestBody: REPAIR_SAVE_SERVICE_LABOUR_BODY,
    response: {
      success: true,
      message: "Service labour saved",
      cart_id: "6a27e9959ea841c77650f0c6",
    },
    params: [
      ...POS_HEADERS,
      { name: "cart_id", type: "string", required: true, description: "Repair cart line ID (custom_cart_id)." },
      { name: "service_labour", type: "object", required: true, description: "service_remark, service_laburelist (id, name, code, scrviceamount), product_price." },
      { name: "service_saved", type: "boolean", required: true, description: "Set true when labour is saved." },
    ],
  },
  {
    id: "repair-edit-cart-item",
    method: "POST",
    path: "/POS/customOrder/editCartItemDetails",
    title: "Edit Cart Item Details",
    description:
      "Step 13 — Update repair cart line with product details, repair_list, service_labour, remark, delivery_date, and custom_design.",
    requestBody: REPAIR_EDIT_CART_BODY,
    response: {
      success: true,
      message: "Cart item updated",
      custom_cart_id: "6a27e9959ea841c77650f0c6",
    },
    params: [
      ...POS_HEADERS,
      { name: "product_details", type: "object", required: true, description: "Full product snapshot with Stones, PriceDetails, remark." },
      { name: "customer_id", type: "string", required: true, description: "Customer ID." },
      { name: "sales_person_id", type: "string", required: true, description: "Salesperson ID." },
      { name: "location_id", type: "string", required: true, description: "Store location ID." },
      { name: "parentCartId", type: "string", required: true, description: "Original sales-order cart_id." },
      { name: "type", type: "string", required: true, description: "repair_order." },
      { name: "order_type", type: "string", required: true, description: "repair_order." },
      { name: "custom_design", type: "object", required: false, description: "repair_list array of repair type IDs." },
      { name: "service_labour", type: "object", required: false, description: "Saved service labour charges." },
      { name: "custom_cart_id", type: "string", required: true, description: "Repair cart line ID." },
    ],
  },
  {
    id: "repair-cash-method-list",
    method: "POST",
    path: "/POS/checkout/payment/getCashMethodList",
    title: "Get Cash Payment Methods",
    description: "Step 14 — Load cash payment method options for repair checkout.",
    requestBody: {},
    response: {
      success: true,
      data: [{ _id: "6981ed2e079ff3d4b43cc3bd", name: "Cash", Paymentmethod_type: "cash" }],
    },
    params: [...POS_HEADERS],
  },
  {
    id: "repair-credit-note",
    method: "POST",
    path: "/POS/checkout/creditnote/getCreditNote",
    title: "Get Credit Notes",
    description: "Step 15 — Load customer credit notes available at repair checkout.",
    requestBody: { customer_id: "69d38581135009caf45c2c64" },
    response: {
      success: true,
      data: [],
    },
    params: [
      ...POS_HEADERS,
      { name: "customer_id", type: "string", required: true, description: "Customer ID." },
    ],
  },
  {
    id: "repair-exchange-rates",
    method: "POST",
    path: "/POS/common/exchange-rates",
    title: "Get Exchange Rates",
    description: "Step 16 — Currency exchange rates for repair checkout.",
    requestBody: {},
    response: {
      success: true,
      data: [{ from: "THB", to: "USD", rate: 0.028 }],
    },
    params: [...POS_HEADERS],
  },
  {
    id: "repair-save-order",
    method: "POST",
    path: "/POS/customOrder/saveCustomOrder",
    title: "Save Repair Order",
    description:
      "Step 17 — Finalise the repair order with payment. order_type repair_order; cart lines include service_labour, custom_design.repair_list, and repair price.",
    requestBody: REPAIR_SAVE_BODY,
    response: {
      success: true,
      order_id: "6a27ea105dcbf9a8dcba12a0",
      order_no: "RPR-2026-001",
      message: "Repair order saved",
    },
    params: [
      ...POS_HEADERS,
      { name: "sell_info", type: "object", required: true, description: "cart (repair_order lines), summary_order (labour, tax, deposit), status_type repair_order, totalamount." },
      { name: "payment_info", type: "object", required: true, description: "debited_amount, pay_data, balance_due, balance_deposit." },
      { name: "order_type", type: "string", required: true, description: "Must be repair_order." },
      { name: "customer_id", type: "string", required: true, description: "Customer ID." },
      { name: "sales_person_id", type: "string", required: true, description: "Salesperson ID." },
      { name: "paymentMathod", type: "string", required: true, description: "e.g. Full_Payment." },
      { name: "shippingInfo", type: "object", required: true, description: "billing_address and shipping_address." },
    ],
  },
];
