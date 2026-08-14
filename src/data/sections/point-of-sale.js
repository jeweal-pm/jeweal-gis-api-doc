import exchangeEndpoints from './pos-exchange-endpoints';
import refundEndpoints from './pos-refund-endpoints';
import reserveEndpoints from './pos-reserve-endpoints';
import receiveDepositEndpoints from './pos-receive-deposit-endpoints';
import receiveReceiveEndpoints from './pos-receive-receive-endpoints';
import repairEndpoints from './pos-repair-endpoints';
import quickviewEndpoints from './pos-quickview-endpoints';
import dashboardEndpoints from './pos-dashboard-endpoints';
import faroEndpoints from './pos-faro-endpoints';
import { CATALOG_SAVE_BODY } from './pos-catalog-payloads';

export default {
      id: "pos",
      label: "Point of Sale",
      icon: "🛒",
      color: "#ef4444",
      description: "POS menu and operations — ordered to match the GIS POS home screen (POS → Custom → Exchange → Refund → Reserve → Receive → Catalog → …). Missing modules are placeholders until APIs are added.",
      subsections: [
        {
                  id: "pos-dashboard",
                  label: "Dashboard",
                  color: "#f59e0b",
                  endpoints: dashboardEndpoints
                },
        {
                  id: "pos-order",
                  label: "POS",
                  color: "#ef4444",
                  endpoints: [
                    {
                      id: "pos-service-labour",
                      method: "POST",
                      path: "/App/graphql",
                      title: "Get Service Labour (GraphQL)",
                      description: "Fetch service labour types (name, code, id) via GraphQL.",
                      requestBody: { query: "{\n  ServiceLabour {\n    name\n    code\n    id\n  }\n}", variables: {} },
                      response: { data: { ServiceLabour: [{ id: "sl_001", name: "Ring Sizing", code: "RS" }, { id: "sl_002", name: "Polishing", code: "PL" }] } },
                      params: [
                        { name: "query", type: "string", required: true, description: "GraphQL query string" },
                        { name: "variables", type: "object", required: false, description: "GraphQL variables" }
                      ]
                    },
                    {
                      id: "pos-salespersons",
                      method: "POST",
                      path: "/Inventory/graphql",
                      title: "Get Sales Persons (GraphQL)",
                      description: "Fetch available sales persons via GraphQL.",
                      requestBody: { query: "{\n  salespersons {\n    id\n    name\n  }\n}", variables: {} },
                      response: { data: { salespersons: [{ id: "6965e02731676f953a14c3c6", name: "Born Born" }] } },
                      params: [
                        { name: "query", type: "string", required: true, description: "GraphQL query string" },
                        { name: "variables", type: "object", required: false, description: "GraphQL variables" }
                      ]
                    },
                    {
                      id: "pos-custom-order-count",
                      method: "POST",
                      path: "/POS/customOrder/customOrderCount",
                      title: "Get Custom Order Count",
                      description: "Retrieve the count of custom orders for a customer.",
                      requestBody: { customer_id: "69d38581135009caf45c2c64" },
                      response: { success: true, count: 3 },
                      params: [
                        { name: "customer_id", type: "string", required: true, description: "Customer ID" }
                      ]
                    },
                    {
                      id: "pos-get-cart-items",
                      method: "POST",
                      path: "/POS/customOrder/getCartItems",
                      title: "Get Cart Items",
                      description: "Retrieve current cart items for the active POS session.",
                      requestBody: { withOrder: false },
                      response: { success: true, data: [{ _id: "cart_001", product_id: "69e8679947eeb2a0a68b14c0", name: "1 ct Aura round-cut diamond ring", price: 12000, qty: 1 }] },
                      params: [
                        { name: "withOrder", type: "boolean", required: false, description: "Include saved order items" }
                      ]
                    },
                    {
                      id: "pos-in-stock-items",
                      method: "POST",
                      path: "/POS/home/inStockItems",
                      title: "Get In-Stock Items by Stock ID",
                      description: "Look up a POS inventory item by stock ID (supports partial/tag search).",
                      requestBody: { stock_id: "T" },
                      response: { success: true, data: [{ stock_id: "T7", sku: "RG025-T", name: "1 ct Aura round-cut diamond ring", price: 12000 }] },
                      params: [
                        { name: "stock_id", type: "string", required: true, description: "Stock ID or partial tag to search" }
                      ]
                    },
                    {
                      id: "pos-add-item-to-cart",
                      method: "POST",
                      path: "/POS/customOrder/addItemToCart",
                      title: "Add Item to Cart",
                      description: "Add an inventory or catalog product to the POS cart for a customer.",
                      requestBody: { product_id: "69e8679947eeb2a0a68b14c0", type: "inventory", customer_id: "69d38581135009caf45c2c64", order_type: "pos_order", sales_person_id: "6965e02731676f953a14c3c6", sessioncartid: "" },
                      response: { success: true, cart_id: "69f896466ca7da3481f1efa6", message: "Item added to cart" },
                      params: [
                        { name: "product_id", type: "string", required: true, description: "PO product ID" },
                        { name: "type", type: "string", required: true, description: "inventory | catalog" },
                        { name: "customer_id", type: "string", required: false, description: "Customer ID" },
                        { name: "order_type", type: "string", required: true, description: "pos_order | custom_order | reserve" },
                        { name: "sales_person_id", type: "string", required: false, description: "Sales person ID" },
                        { name: "sessioncartid", type: "string", required: false, description: "Existing session cart ID" }
                      ]
                    },
                    {
                      id: "pos-credit-note",
                      method: "POST",
                      path: "/POS/checkout/creditnote/getCreditNote",
                      title: "Get Credit Notes",
                      description: "Retrieve available credit notes for a customer at POS checkout.",
                      requestBody: { customer_id: "69d38581135009caf45c2c64" },
                      response: { success: true, data: [{ _id: "cn_001", code: "CN-001", balance: 500, expires_at: "2026-12-31" }] },
                      params: [
                        { name: "customer_id", type: "string", required: true, description: "Customer ID" }
                      ]
                    },
                    {
                      id: "pos-cash-method-list",
                      method: "POST",
                      path: "/POS/checkout/payment/getCashMethodList",
                      title: "Get Cash Method List",
                      description: "Retrieve available payment methods for POS checkout.",
                      requestBody: {},
                      response: { success: true, data: [{ _id: "6981ed2e079ff3d4b43cc3bd", name: "Cash", type: "cash" }, { _id: "pm_002", name: "Credit Card", type: "credit_card" }, { _id: "pm_003", name: "Bank Transfer", type: "bank" }] },
                      params: []
                    },
                    {
                      id: "pos-exchange-rates",
                      method: "POST",
                      path: "/POS/common/exchange-rates",
                      title: "Get Exchange Rates",
                      description: "Retrieve current currency exchange rates for POS pricing.",
                      requestBody: {},
                      response: { success: true, data: [{ from: "USD", to: "INR", rate: 83.5 }] },
                      params: []
                    },
                    {
                      id: "pos-save-order",
                      method: "POST",
                      path: "/POS/customOrder/saveCustomOrder",
                      title: "Save POS Order",
                      description: "Finalise and save a standard POS sale with cart, payment and shipping details.",
                      requestBody: {
                        sell_info: {
                          cart: [{ product_id: "69ca679f181f1a5843bd0cec", po_product_id: "69e8679947eeb2a0a68b14c0", type: "pos_order", order_type: "pos_order", customer_id: "69d38581135009caf45c2c64", sales_person_id: "6965e02731676f953a14c3c6", location_id: "6864eb6c46b97fcef1421d95", product_type: "inventory", price: 12000, retailprice_Inc: 12000, Qty: 1, delivery_date: "2026-05-25T12:51:19.515Z", sessioncartid: "", custom_design: { description: "", engraving_text: "", engraving_position: "", engraving_logo: "", font: "", logo_position: "" }, service_labour: { service_remark: "", service_laburelist: [], product_price: 12000 } }],
                          deletecart_ids: [],
                          summary_order: { labour: 0, shipping: 0, loyality_points: 0, customer_id: { id: "69d38581135009caf45c2c64", name: "Tanu Yadav" }, sales_person_id: { value: "6965e02731676f953a14c3c6", label: "Born Born" }, discount: 0, discount_percent: 0, deposit: 0, deposit_amount: 0, tax_amount: "2400.00", tax_amount_int: 2400, tax_prect: 20, tax_type: "Exclusive", Sub_Total: 12000 },
                          status_type: "pos_order",
                          totalamount: 14400,
                          service_labour: []
                        },
                        payment_info: { debited_amount: { cash: 14400, bank: 0, credit_card: 0, credit_notes: 0 }, pay_data: { cash: { payment_method_id: "6981ed2e079ff3d4b43cc3bd", Paymentmethod_type: "cash", amount: 14400 }, bank: [], IB: [], credit_card: [], credit_note: [], gift_card: "" }, balance_due: 0, balance_deposit: 14400 },
                        transaction_date: "2026-05-04T12:51:37.783Z",
                        paymentMathod: "Full_Payment",
                        customer_id: "69d38581135009caf45c2c64",
                        sales_person_id: "6965e02731676f953a14c3c6",
                        order_type: "pos_order",
                        order_id: "",
                        quatation_id: "",
                        shippingInfo: { billing_address: { UDID: "69e1ce0df0826b65b879b356d8", address: "123 Main St", country: { label: "United States", value: "231" }, state: "New York", city: "New York", zipcode: "10001", tax_number: "767", is_default: 1, fullAddress: "123 Main St, New York, New York, United States, 10001" }, shipping_address: { UDID: "69e1ce18adfb785ae083cc41dc", address: "123 Main St", country: { label: "United States", value: "231" }, state: "New York", city: "New York", zipcode: "10022", tax_number: "888", is_default: 1, fullAddress: "456 Park Ave, New York, New York, United States, 10022" } }
                      },
                      response: { success: true, order_id: "ord_pos_001", order_number: "PS-2026-001", total: 14400, message: "POS order saved successfully" },
                      params: [
                        { name: "sell_info", type: "object", required: true, description: "Cart items and order summary" },
                        { name: "sell_info.cart", type: "array", required: true, description: "Array of POS cart items" },
                        { name: "payment_info", type: "object", required: true, description: "Payment method breakdown" },
                        { name: "paymentMathod", type: "string", required: true, description: "Full_Payment | Layby | Deposit" },
                        { name: "order_type", type: "string", required: true, description: "pos_order" },
                        { name: "transaction_date", type: "string", required: true, description: "Transaction date ISO format" },
                        { name: "shippingInfo", type: "object", required: false, description: "Billing and shipping address" }
                      ]
                    }
                  ]
                },
        {
                  id: "pos-park",
                  label: "Park",
                  color: "#6366f1",
                  endpoints: [
                    {
                      id: "save-park",
                      method: "POST",
                      path: "/POS/park/savepark",
                      title: "Park Bill",
                      description: "Temporarily hold an open cart/bill to serve another customer.",
                      requestBody: { sell_info: { cart: [{ product_details: { product_id: "63b3b2c6bcee1678e27a7622", Metal: "6355fbddc734e545a850dd02" }, qty: 1, price: 2850 }], customer_id: "63999f0eb171ab1086ccf6a3", sales_person_id: "6379ae9e28021528d413c0df" } },
                      response: { success: true, park_id: "park_001", message: "Bill parked successfully" },
                      params: [
                        { name: "sell_info", type: "object", required: true, description: "Current cart data to park" }
                      ]
                    },
                    {
                      id: "remove-park",
                      method: "POST",
                      path: "/POS/park/removePark",
                      title: "Remove Parked Bill",
                      description: "Remove/restore a parked bill back to active cart.",
                      requestBody: { park_id: "63ff3baf0e0e8cfbc036e42f" },
                      response: { success: true, message: "Parked bill restored" },
                      params: [
                        { name: "park_id", type: "string", required: true, description: "Parked bill ID" }
                      ]
                    }
                  ]
                },
        {
                  id: "pos-checkout",
                  label: "Checkout",
                  color: "#10b981",
                  endpoints: [
                    {
                      id: "get-credit-note",
                      method: "POST",
                      path: "/POS/checkout/creditnote/getCreditNote",
                      title: "Get Credit Notes",
                      description: "Retrieve available credit notes for a customer at checkout.",
                      requestBody: { customer_id: "66700d13fcca1e37260dbf8f" },
                      response: { success: true, data: [{ _id: "cn_001", code: "CN-001", balance: 500, expires_at: "2026-12-31" }] },
                      params: [
                        { name: "customer_id", type: "string", required: true, description: "Customer ID" }
                      ]
                    }
                  ]
                },
        {
                  id: "pos-cash-register",
                  label: "Cash Register",
                  color: "#f59e0b",
                  endpoints: [
                    {
                      id: "create-cash-register",
                      method: "POST",
                      path: "/POS/cashRegister/createCashRagister",
                      title: "Open Cash Register",
                      description: "Open a new POS cash register session with a float amount.",
                      requestBody: { float_Amount: 1500 },
                      response: { success: true, data: { _id: "cr_001", float_Amount: 1500, status: "open", opened_at: "2026-03-24T08:00:00Z" } },
                      params: [
                        { name: "float_Amount", type: "float", required: true, description: "Opening float amount in local currency" }
                      ]
                    },
                    {
                      id: "cash-register-info",
                      method: "POST",
                      path: "/POS/cashRegister/cashRegister",
                      title: "Get Cash Register Info",
                      description: "Retrieve current cash register session details.",
                      requestBody: {},
                      response: { success: true, data: { _id: "cr_001", float_Amount: 1500, total_sales: 8500, status: "open" } },
                      params: []
                    },
                    {
                      id: "save-cash-register",
                      method: "POST",
                      path: "/POS/cashRegister/savecashRegister",
                      title: "Close / Save Cash Register",
                      description: "Close the cash register at end of day with counted amounts and sales summary.",
                      requestBody: { id: "6424081b9e734e975b53fd46", float: { actual_float: 1000, total_cashBalance: 1200, net_cash_enclosed: 1200 }, payment: { cash: { expected: 100, counted: 100, difference: 0 }, credit_card: { expected: 100, counted: 100, difference: 0 }, bank: { expected: 100, counted: 100, difference: 0 } }, sales_summary: { sales: 8500, giftcard: 0, deposit: 0, custom_order: 1200, creditnote: 0, no_transaction: 0, num_cust: 4, totalNetSale: 9700, avg_sales: 2425 } },
                      response: { success: true, message: "Cash register closed", data: { _id: "cr_001", status: "closed", closed_at: "2026-03-24T22:00:00Z" } },
                      params: [
                        { name: "id", type: "string", required: true, description: "Cash register session ID" },
                        { name: "float", type: "object", required: true, description: "Float amounts for closing" },
                        { name: "payment", type: "object", required: true, description: "Expected vs counted by payment type" },
                        { name: "sales_summary", type: "object", required: true, description: "Daily sales summary totals" }
                      ]
                    },
                    {
                      id: "close-cash-register-popup",
                      method: "POST",
                      path: "/POS/cashRegister/closeCashRegisterByPopup",
                      title: "Close Cash Register (Quick)",
                      description: "Quick close cash register session from popup.",
                      requestBody: { Closure_id: "641c1abc0fbb19cfeed88979" },
                      response: { success: true, message: "Cash register closed" },
                      params: [
                        { name: "Closure_id", type: "string", required: true, description: "Cash register closure ID" }
                      ]
                    },
                    {
                      id: "create-cashflow",
                      method: "POST",
                      path: "/POS/cashRegister/createCashflow",
                      title: "Create Cash Flow",
                      description: "Record a cash in or cash out transaction during the register session.",
                      requestBody: { type: "IN", hod: 1, amount: 200, remark: "Cash from safe" },
                      response: { success: true, data: { _id: "cf_001", type: "IN", amount: 200 } },
                      params: [
                        { name: "type", type: "string", required: true, description: "IN = cash added | OUT = cash removed" },
                        { name: "amount", type: "float", required: true, description: "Cash amount" },
                        { name: "hod", type: "integer", required: false, description: "Head of department flag" },
                        { name: "remark", type: "string", required: false, description: "Reason for cash movement" }
                      ]
                    },
                    {
                      id: "get-float",
                      method: "POST",
                      path: "/POS/cashRegister/getFloat",
                      title: "Get Float",
                      description: "Get current float balance in the cash register.",
                      requestBody: {},
                      response: { success: true, data: { float_Amount: 1500, cash_in: 200, cash_out: 0, current_float: 1700 } },
                      params: []
                    }
                  ]
                },
        {
                  id: "pos-custom-order",
                  label: "Custom",
                  color: "#6366f1",
                  endpoints: [
                    {
                      id: "get-custom-order-list",
                      method: "POST",
                      path: "/POS/customOrder/getOrderList",
                      title: "Get Custom Order List",
                      description: "Retrieve custom orders.",
                      requestBody: { date: "2024-05-10T12:53:44.673Z", order_type: "custom_order" },
                      response: { success: true, data: [{ _id: "co_001", order_number: "CUS-001", customer: "John Doe", status: "pending", total: 5000 }] },
                      params: [
                        { name: "order_type", type: "string", required: true, description: "custom_order | reserve" },
                        { name: "date", type: "string", required: false, description: "Filter date" }
                      ]
                    },
                    {
                      id: "add-item-to-custom-cart",
                      method: "POST",
                      path: "/POS/customOrder/addItemToCart",
                      title: "Add Item to Custom Order Cart",
                      description: "Add a catalog item to a custom order cart.",
                      requestBody: { product_id: "6382d0c9962d9c3c23330c39", type: "catalog", customer_id: "65153b7aed2ad528022035f1", sales_person_id: "6379ae9e28021528d413c0df", order_type: "custom_order" },
                      response: { success: true, cart_id: "cart_001", message: "Item added to custom order cart" },
                      params: [
                        { name: "product_id", type: "string", required: true, description: "Product ID" },
                        { name: "type", type: "string", required: true, description: "inventory | catalog" },
                        { name: "customer_id", type: "string", required: true, description: "Customer ID" },
                        { name: "order_type", type: "string", required: true, description: "custom_order" }
                      ]
                    },
                    {
                      id: "save-custom-order",
                      method: "POST",
                      path: "/POS/customOrder/saveCustomOrder",
                      title: "Save Custom Order",
                      description: "Finalize and save a custom jewelry order.",
                      requestBody: { sell_info: { cart: [{ product_details: { product_id: "665ea40569f759d88cca0675", Metal: "6355fb99243c42797d24c534", engraving: "Forever Yours" }, qty: 1, price: 5000, deposit: 1000 }], customer_id: "65153b7aed2ad528022035f1", sales_person_id: "6379ae9e28021528d413c0df", delivery_date: "2026-05-01", order_type: "custom_order" } },
                      response: { success: true, order_id: "co_001", order_number: "CUS-2026-001", deposit_paid: 1000, balance_due: 4000 },
                      params: [
                        { name: "sell_info", type: "object", required: true, description: "Custom order cart data" },
                        { name: "sell_info.delivery_date", type: "string", required: false, description: "Promised delivery date" }
                      ]
                    },
                    {
                      id: "upload-design",
                      method: "POST",
                      path: "/POS/customOrder/uploadDesign",
                      title: "Upload Custom Design",
                      description: "Upload design image reference for a custom order.",
                      requestBody: { Data: [{ data_url: "https://gis247.s3.amazonaws.com/2023in0076/POSOrder/1716895981005.png" }], name: "custom_order_canvas" },
                      response: { success: true, message: "Design uploaded", url: "https://gis247.s3.amazonaws.com/2023in0076/designs/abc.png" },
                      params: [
                        { name: "Data", type: "array", required: true, description: "Array of image URLs" },
                        { name: "name", type: "string", required: true, description: "Design reference name" }
                      ]
                    }
                  ]
                },
        {
                  id: "pos-exchange",
                  label: "Exchange",
                  color: "#f97316",
                  description: "POS exchange flow — voucher login → customer lookup → select prior orders → load cart → save exchange order.",
                  endpoints: exchangeEndpoints
                },
        {
                  id: "pos-refund",
                  label: "Refund",
                  color: "#38bdf8",
                  description: "POS refund flow — customer lookup → select order → payment methods → save refund.",
                  endpoints: refundEndpoints
                },
        {
                  id: "pos-reserve",
                  label: "Reserve",
                  color: "#f59e0b",
                  endpoints: reserveEndpoints
                },
        {
                  id: "pos-receive",
                  label: "Receive",
                  color: "#22c55e",
                  description: "POS receive order flows — Receive or Deposit.",
                  childGroups: [
                    {
                      id: "receive-deposit",
                      label: "Deposit",
                      endpoints: receiveDepositEndpoints,
                    },
                    {
                      id: "receive-receive",
                      label: "Receive",
                      endpoints: receiveReceiveEndpoints,
                    },
                  ],
                },
        {
                  id: "pos-home",
                  label: "Catalog",
                  color: "#ef4444",
                  endpoints: [
                    {
                      id: "get-item-list-category",
                      method: "POST",
                      path: "/POS/home/getItemListwithCategory",
                      title: "Get Item List with Category",
                      description: "Retrieve product list filtered by item category for POS browsing.",
                      requestBody: { category_id: "636c763ff358a963864565be", type: "inventory" },
                      response: { success: true, data: [{ _id: "prod_001", name: "NOBLE Diamond Ring", sku: "RG026", price: 2850, in_stock: 3 }] },
                      params: [
                        { name: "category_id", type: "string", required: true, description: "Item category ID" },
                        { name: "type", type: "string", required: true, description: "inventory | catalog" }
                      ]
                    },
                    {
                      id: "item-details",
                      method: "POST",
                      path: "/POS/home/itemDetails",
                      title: "Get Item Details",
                      description: "Retrieve full product details for a POS item.",
                      requestBody: { id: "6382c636962d9c3c2332fd6c", type: "catalog" },
                      response: { success: true, data: { _id: "prod_001", name: "NOBLE Diamond Ring", sku: "RG026", price: 2850, metal: "Gold 18K", stone: "1ct Round Diamond" } },
                      params: [
                        { name: "id", type: "string", required: true, description: "Product ID" },
                        { name: "type", type: "string", required: true, description: "inventory | catalog" }
                      ]
                    },
                    {
                      id: "pos-search",
                      method: "POST",
                      path: "/POS/home/search",
                      title: "POS Product Search",
                      description: "Search products in the POS catalog.",
                      requestBody: { type: "catalog", limit: 50, skip: 0, sale: "top_sale", search: "diamond ring", category_id: "636c763ff358a963864565be" },
                      response: { success: true, total: 5, data: [{ _id: "prod_001", name: "NOBLE Diamond Ring", sku: "RG026", price: 2850 }] },
                      params: [
                        { name: "search", type: "string", required: true, description: "Search keyword" },
                        { name: "type", type: "string", required: false, description: "inventory | catalog" },
                        { name: "limit", type: "integer", required: false, description: "Records per page" },
                        { name: "skip", type: "integer", required: false, description: "Records to skip" }
                      ]
                    },
                    {
                      id: "in-stock-items",
                      method: "POST",
                      path: "/POS/home/inStockItems",
                      title: "Get In-Stock Items by Stock ID",
                      description: "Retrieve item details by stock ID for POS lookup.",
                      requestBody: { stock_id: "100201" },
                      response: { success: true, data: { stock_id: "100201", sku: "RG026", name: "NOBLE Diamond Ring", price: 2850, location: "Main Store" } },
                      params: [
                        { name: "stock_id", type: "string", required: true, description: "Stock ID to look up" }
                      ]
                    },
                    {
                      id: "add-to-cart",
                      method: "POST",
                      path: "/POS/home/addTocart",
                      title: "Add Item to Cart",
                      description: "Add a single jewelry product to the POS cart with selected metal, size and stone.",
                      requestBody: { metal: ["6355fbddc734e545a850dd02"], size: ["636c6e81f358a963864565b6"], stone: ["6356061d2572146aa404d2d2"], parentproduct_id: "6382c636962d9c3c2332fd6c", customer_id: "63999f0eb171ab1086ccf6a3", sales_person_id: "6379ae9e28021528d413c0df", order_type: "pos_order" },
                      response: { success: true, cart_id: "cart_001", message: "Item added to cart" },
                      params: [
                        { name: "metal", type: "array", required: false, description: "Selected metal color IDs" },
                        { name: "size", type: "array", required: false, description: "Selected size IDs" },
                        { name: "stone", type: "array", required: false, description: "Selected stone IDs" },
                        { name: "parentproduct_id", type: "string", required: true, description: "Product ID" },
                        { name: "customer_id", type: "string", required: false, description: "Customer ID" },
                        { name: "order_type", type: "string", required: true, description: "pos_order | custom_order | reserve" }
                      ]
                    },
                    {
                      id: "collection",
                      method: "POST",
                      path: "/POS/home/collection",
                      title: "Get POS Collections",
                      description: "Retrieve product collections for POS browsing.",
                      requestBody: { type: "inventory" },
                      response: { success: true, data: [{ _id: "col_001", name: "CLASSIC", count: 25 }, { _id: "col_002", name: "NEW ARRIVALS", count: 10 }] },
                      params: [
                        { name: "type", type: "string", required: true, description: "inventory | catalog" }
                      ]
                    },
                    {
                      id: "get-catalog-pdf",
                      method: "POST",
                      path: "/POS/customOrder/getCatalogPdf",
                      title: "Get Catalog PDF",
                      description: "Generate and retrieve a catalog PDF for a customer, including billing and shipping address details.",
                      requestBody: {
                        customer_id: "69d38581135009caf45c2c64",
                        type: "wishlist",
                        shippingInfo: {
                          billing_address: {
                            UDID: "69e1ce0df0826b65b879b356d8",
                            address: "123 Main St",
                            country: { label: "United States", value: "231" },
                            state: "New York",
                            city: "New York",
                            zipcode: "10001",
                            tax_number: "767",
                            is_default: 1,
                            fullAddress: "123 Main St, New York, New York, United States, 10001"
                          },
                          shipping_address: {
                            UDID: "69e1ce18adfb785ae083cc41dc",
                            address: "123 Main St",
                            country: { label: "United States", value: "231" },
                            state: "New York",
                            city: "New York",
                            zipcode: "10022",
                            tax_number: "888",
                            is_default: 1,
                            fullAddress: "456 Park Ave, New York, New York, United States, 10022"
                          }
                        }
                      },
                      response: { success: true, message: "PDF generated successfully", pdf_url: "https://gis247.net/uploads/catalog/catalog_69d38581135009caf45c2c64.pdf" },
                      params: [
                        { name: "customer_id", type: "string", required: true, description: "Customer ID to generate catalog for" },
                        { name: "type", type: "string", required: true, description: "Catalog type e.g. wishlist" },
                        { name: "shippingInfo.billing_address", type: "object", required: true, description: "Billing address details" },
                        { name: "shippingInfo.shipping_address", type: "object", required: true, description: "Shipping address details" }
                      ]
                    },
                    {
                      id: "catalog-save-order",
                      method: "POST",
                      path: "/POS/customOrder/saveCustomOrder",
                      title: "Save Catalog Order",
                      description: "Finalise a catalog sale. order_type must be custom_order; cart lines use product_type catalog.",
                      requestBody: CATALOG_SAVE_BODY,
                      response: {
                        success: true,
                        order_id: "6a27e83a364b1a07266f0f60",
                        order_no: "CO-2026-001",
                        message: "Catalog order saved",
                      },
                      params: [
                        { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                        { name: "Pos-Authorization", type: "string", required: true, in: "header", description: "JWT from generatePOSAuthToken (POS session)." },
                        { name: "sell_info", type: "object", required: true, description: "Cart (product_type catalog), summary_order, status_type custom_order, totalamount." },
                        { name: "payment_info", type: "object", required: true, description: "debited_amount, pay_data, balance_due, balance_deposit." },
                        { name: "order_type", type: "string", required: true, description: "Must be custom_order for catalog checkout." },
                        { name: "customer_id", type: "string", required: true, description: "Customer ID." },
                        { name: "sales_person_id", type: "string", required: true, description: "Salesperson ID." },
                        { name: "shippingInfo", type: "object", required: true, description: "billing_address and shipping_address." },
                      ]
                    }
                  ]
                },
        {
                  id: "pos-wishlist",
                  label: "Wishlist",
                  color: "#ec4899",
                  endpoints: [
                    {
                      id: "update-wishlist",
                      method: "POST",
                      path: "/POS/wishlist/updateWishlist",
                      title: "Add / Remove Wishlist",
                      description: "Add or remove a product from a customer's wishlist.",
                      requestBody: { customer_id: "663b65c34f7cd8fe8f2a5ef8", SKU: "GRS-001", type: "catalog", product_id: "664308091cf844d217afd479", isWishlist: 1 },
                      response: { success: true, message: "Wishlist updated" },
                      params: [
                        { name: "customer_id", type: "string", required: true, description: "Customer ID" },
                        { name: "SKU", type: "string", required: true, description: "Product SKU" },
                        { name: "isWishlist", type: "integer", required: true, description: "1=add 0=remove" },
                        { name: "type", type: "string", required: true, description: "inventory | catalog" }
                      ]
                    },
                    {
                      id: "get-product-wishlist",
                      method: "POST",
                      path: "/POS/wishlist/getProductWishList",
                      title: "Get Customer Wishlist",
                      description: "Retrieve all wishlist items for a customer.",
                      requestBody: { customer_id: "63c0b25994303d931d46d5fd" },
                      response: { success: true, data: [{ sku: "RG026", name: "NOBLE Diamond Ring", price: 2850, added_at: "2026-03-24" }] },
                      params: [
                        { name: "customer_id", type: "string", required: true, description: "Customer ID" }
                      ]
                    }
                  ]
                },
        {
                  id: "pos-repair",
                  label: "Repair",
                  color: "#14b8a6",
                  endpoints: repairEndpoints
                },
        {
                  id: "pos-quotation",
                  label: "Quotation",
                  color: "#0ea5e9",
                  endpoints: [
                    {
                      id: "save-quotation",
                      method: "POST",
                      path: "/POS/quatation/saveQuatation",
                      title: "Save Quotation",
                      description: "Create or update a customer price quotation.",
                      requestBody: { sell_info: { cart: [{ product_details: { product_id: "65693b812181af188f08edad", Metal: "636d1f451b6e080747386611", Stones: [] }, qty: 1, price: 31800 }], customer_id: "63999f0eb171ab1086ccf6a3", sales_person_id: "6379ae9e28021528d413c0df", valid_days: 30 } },
                      response: { success: true, quotation_id: "qt_001", quotation_number: "QT-2026-001", valid_until: "2026-04-23", total: 31800 },
                      params: [
                        { name: "sell_info", type: "object", required: true, description: "Quotation cart data" },
                        { name: "sell_info.valid_days", type: "integer", required: false, description: "Quotation validity in days" }
                      ]
                    },
                    {
                      id: "get-quotation-sub-list",
                      method: "POST",
                      path: "/POS/quatation/getQuatationSubList",
                      title: "Get Quotation Details",
                      description: "Retrieve detailed items of a quotation.",
                      requestBody: { quatation_id: "6412bda13657e722a128bf4f" },
                      response: { success: true, data: { _id: "qt_001", quotation_number: "QT-2026-001", items: [{ name: "NOBLE Diamond Ring", price: 31800 }], total: 31800 } },
                      params: [
                        { name: "quatation_id", type: "string", required: true, description: "Quotation ID" }
                      ]
                    }
                  ]
                },
        {
                  id: "pos-gift-card",
                  label: "Gift Card",
                  color: "#ec4899",
                  endpoints: [
                    {
                      id: "create-gift-card",
                      method: "POST",
                      path: "/POS/giftCard/createGiftCard",
                      title: "Create Gift Card",
                      description: "Issue a new gift card for a customer.",
                      requestBody: { customer_id: "63999f0eb171ab1086ccf6a3", sales_person_id: "6379ae9e28021528d413c0df", coupon_amount: "1000", coupon_code: 1234567, coupon_expire_date: "2027-03-04T05:48:10.590Z", remarks: "Birthday gift" },
                      response: { success: true, data: { _id: "gc_001", code: "GC-1234567", value: 1000, expires_at: "2027-03-04" } },
                      params: [
                        { name: "customer_id", type: "string", required: true, description: "Customer ID" },
                        { name: "coupon_amount", type: "string", required: true, description: "Gift card value" },
                        { name: "coupon_code", type: "integer", required: false, description: "Gift card code (auto-generated if empty)" },
                        { name: "coupon_expire_date", type: "string", required: true, description: "Expiry date ISO format" }
                      ]
                    },
                    {
                      id: "get-gift-card",
                      method: "POST",
                      path: "/POS/giftCard/getGiftCard",
                      title: "Get Gift Cards",
                      description: "Retrieve gift cards for a customer.",
                      requestBody: { customer_id: "63ac13fa680ae0592fc3be23", limit: 100 },
                      response: { success: true, data: [{ _id: "gc_001", code: "GC-1234567", value: 1000, balance: 1000, expires_at: "2027-03-04" }] },
                      params: [
                        { name: "customer_id", type: "string", required: true, description: "Customer ID" },
                        { name: "limit", type: "integer", required: false, description: "Records to return" }
                      ]
                    }
                  ]
                },
        {
                  id: "pos-appointments",
                  label: "Appointment",
                  color: "#0ea5e9",
                  endpoints: [
                    {
                      id: "appointment-list",
                      method: "POST",
                      path: "/Customer/appointment/list",
                      title: "Get Appointment List",
                      description: "Retrieve a paginated list of customer appointments with optional filters for date, location and status.",
                      requestBody: { search: "", limit: 100, skip: 0, date: null, location: [], status: [] },
                      response: { success: true, total: 8, data: [{ _id: "appt_001", customer: "Tanu Yadav", date: "2026-05-10", time: "10:00", location: "Main Store", status: "confirmed" }] },
                      params: [
                        { name: "search", type: "string", required: false, description: "Search keyword" },
                        { name: "limit", type: "integer", required: false, description: "Records per page" },
                        { name: "skip", type: "integer", required: false, description: "Records to skip" },
                        { name: "date", type: "string", required: false, description: "Filter by date (ISO format or null)" },
                        { name: "location", type: "array", required: false, description: "Filter by location IDs" },
                        { name: "status", type: "array", required: false, description: "Filter by status values" }
                      ]
                    }
                  ]
                },
        {
                  id: "pos-customer",
                  label: "Customer",
                  color: "#ec4899",
                  description: "Customer lookup and selection on the POS screen.",
                  endpoints: [
                    {
                      id: "pos-customer-list",
                      method: "POST",
                      path: "/Customer/customer/getList",
                      title: "Get Customer List",
                      description: "Search and retrieve the customer list for POS order assignment.",
                      requestBody: { name: [], search: "", country: [], city: [] },
                      response: { success: true, total: 50, data: [{ _id: "69d38581135009caf45c2c64", name: "Tanu Yadav", email: "tanu@gis247.net", city: "New York" }] },
                      params: [
                        { name: "search", type: "string", required: false, description: "Search keyword" },
                        { name: "name", type: "array", required: false, description: "Filter by customer name" },
                        { name: "country", type: "array", required: false, description: "Filter by country" },
                        { name: "city", type: "array", required: false, description: "Filter by city" }
                      ]
                    }
                  ]
                },
        {
                  id: "pos-quickview",
                  label: "Quickview",
                  color: "#a855f7",
                  endpoints: quickviewEndpoints
                },
        {
                  id: "pos-deposit",
                  label: "Deposit",
                  color: "#84cc16",
                  endpoints: [
                    {
                      id: "add-deposit-to-cart",
                      method: "POST",
                      path: "/POS/deposit/addDeposittocart",
                      title: "Add Deposit to Cart",
                      description: "Record a customer deposit (down payment) in the POS cart.",
                      requestBody: { Ref_No: "DEP-001", customer_id: "63999f0eb171ab1086ccf6a3", amount: "1000", transaction_type: "cash", remark: "Deposit for custom ring", sales_person_id: "6379ae9e28021528d413c0df", order_type: "deposit" },
                      response: { success: true, cart_id: "cart_001", message: "Deposit added to cart" },
                      params: [
                        { name: "customer_id", type: "string", required: true, description: "Customer ID" },
                        { name: "amount", type: "string", required: true, description: "Deposit amount" },
                        { name: "transaction_type", type: "string", required: true, description: "cash | credit_card | bank" },
                        { name: "remark", type: "string", required: false, description: "Notes" }
                      ]
                    }
                  ]
                },
        {
                  id: "pos-faro",
                  label: "Faro",
                  color: "#0ea5e9",
                  endpoints: faroEndpoints
                },
        {
                  id: "pos-mix-match",
                  label: "Mix and Match",
                  color: "#7c3aed",
                  endpoints: [
                    {
                      id: "mm-diamond-list",
                      method: "POST",
                      path: "/POS/diamond/getList",
                      title: "Get Diamond List",
                      description: "Retrieve a filtered list of diamonds for Mix & Match selection.",
                      requestBody: { length: 0, limit: 20, skip: 0, CUT: ["6965e0c747448919d8611c32","6965e0c747448919d8611c33"], Clarity: ["6965e0c747448919d8611c35","696dcbacc93bad0ed27cbd8b"], Stonecolor: ["6965e00b31676f953a14c339","6965e00b31676f953a14c348"], Polish: ["6378846f1ce86bed3b006adc","6378846f1ce86bed3b006b04"], Symmetry: ["6375cf6b3c04c60444751a40","6378846f1ce86bed3b006adf"], fluorescence: ["6375cf6b3c04c604447519f3","6378846f1ce86bed3b006b0a"], Lbs: ["GIA"], Status: [1, 0], Shape: ["637c8a69d3001af825b71960","637c8a3dd3001af825b7195c"], Price: [{ min: 0, max: 20000 }], Carat: [{ min: 0.1, max: 1.07 }], Depth: [{ min: 0, max: 63 }], Table: [{ min: 0, max: 69 }], customer_id: "69d38581135009caf45c2c64", type: "mix_match" },
                      response: { success: true, total: 15, data: [{ _id: "69f1c3d54d4947fb9298737c", Shape: "Round", Carat: 1.01, Colour: "I", Clarity: "Si1", Price: 20000, StockID: 1100003 }] },
                      params: [
                        { name: "CUT", type: "array", required: false, description: "Cut grade IDs" },
                        { name: "Clarity", type: "array", required: false, description: "Clarity grade IDs" },
                        { name: "Stonecolor", type: "array", required: false, description: "Stone colour IDs" },
                        { name: "Polish", type: "array", required: false, description: "Polish grade IDs" },
                        { name: "Symmetry", type: "array", required: false, description: "Symmetry grade IDs" },
                        { name: "fluorescence", type: "array", required: false, description: "Fluorescence IDs" },
                        { name: "Lbs", type: "array", required: false, description: "Lab grading bodies e.g. GIA" },
                        { name: "Status", type: "array", required: false, description: "Stock status flags [1,0]" },
                        { name: "Shape", type: "array", required: false, description: "Diamond shape IDs" },
                        { name: "Price", type: "array", required: false, description: "Price range [{min, max}]" },
                        { name: "Carat", type: "array", required: false, description: "Carat weight range [{min, max}]" },
                        { name: "Depth", type: "array", required: false, description: "Depth % range [{min, max}]" },
                        { name: "Table", type: "array", required: false, description: "Table % range [{min, max}]" },
                        { name: "customer_id", type: "string", required: false, description: "Customer ID" },
                        { name: "type", type: "string", required: true, description: "mix_match" },
                        { name: "limit", type: "integer", required: false, description: "Records per page" },
                        { name: "skip", type: "integer", required: false, description: "Records to skip" }
                      ]
                    },
                    {
                      id: "mm-diamond-filters",
                      method: "POST",
                      path: "/Inventory/diamond/getFilters",
                      title: "Get Diamond Filters",
                      description: "Retrieve all available filter options for diamond search (cut, clarity, shape, colour, etc.).",
                      requestBody: {},
                      response: { success: true, data: { CUT: [], Clarity: [], Stonecolor: [], Polish: [], Symmetry: [], fluorescence: [], Shape: [] } },
                      params: []
                    },
                    {
                      id: "mm-diamond-details",
                      method: "POST",
                      path: "/Inventory/diamond/getDetails",
                      title: "Get Diamond Details",
                      description: "Retrieve full grading and pricing details for a single diamond.",
                      requestBody: { id: "69f1c3d54d4947fb9298737c" },
                      response: { success: true, data: { _id: "69f1c3d54d4947fb9298737c", Shape: "Round", Carat: 1.01, Colour: "I", Clarity: "Si1", Cut: "Good", Polish: "Ex", Symmetry: "Good", Depth: 59.5, Table: 69, GradedBy: "GIA", Certification: "2286042991", Price: 20000 } },
                      params: [
                        { name: "id", type: "string", required: true, description: "Diamond ID" }
                      ]
                    },
                    {
                      id: "mm-salespersons",
                      method: "POST",
                      path: "/Inventory/graphql",
                      title: "Get Sales Persons (GraphQL)",
                      description: "Fetch available sales persons via GraphQL.",
                      requestBody: { query: "{\n  salespersons {\n    id\n    name\n  }\n}", variables: {} },
                      response: { data: { salespersons: [{ id: "6965e02731676f953a14c3c6", name: "Alice" }] } },
                      params: [
                        { name: "query", type: "string", required: true, description: "GraphQL query string" },
                        { name: "variables", type: "object", required: false, description: "GraphQL variables" }
                      ]
                    },
                    {
                      id: "mm-countries",
                      method: "POST",
                      path: "/App/graphql",
                      title: "Get Countries (GraphQL)",
                      description: "Fetch country list (name, id, sortname, phoneCode) via GraphQL.",
                      requestBody: { query: "{\n  countries {\n    name\n    id\n    sortname\n    phoneCode\n  }\n}", variables: {} },
                      response: { data: { countries: [{ id: "101", name: "United States", sortname: "US", phoneCode: "1" }] } },
                      params: [
                        { name: "query", type: "string", required: true, description: "GraphQL query string" },
                        { name: "variables", type: "object", required: false, description: "GraphQL variables" }
                      ]
                    },
                    {
                      id: "mm-item-list",
                      method: "POST",
                      path: "/POS/home/itemList",
                      title: "Get Mix Match Item List",
                      description: "Retrieve item categories available for Mix & Match selection.",
                      requestBody: { type: "mixAndMatch" },
                      response: { success: true, data: [{ _id: "6965df0c31676f953a14bf38", name: "Ring", code: "R" }] },
                      params: [
                        { name: "type", type: "string", required: true, description: "mixAndMatch" }
                      ]
                    },
                    {
                      id: "mm-product-list-by-item",
                      method: "POST",
                      path: "/POS/customOrder/mixAndMatch/getProductListByItem",
                      title: "Get Product List By Item",
                      description: "Retrieve jewelry products available for a given item category in Mix & Match.",
                      requestBody: { item: "6965df0c31676f953a14bf38", type: "inventory", limit: 40, sale: "top_sale", customer_id: "69d38581135009caf45c2c64", skip: 0 },
                      response: { success: true, total: 12, data: [{ _id: "69f84a89d9ba9df882d43370", name: "1 ct Aura round-cut diamond ring", SKU: "RG026", price: 12000 }] },
                      params: [
                        { name: "item", type: "string", required: true, description: "Item category ID" },
                        { name: "type", type: "string", required: true, description: "inventory | catalog" },
                        { name: "customer_id", type: "string", required: false, description: "Customer ID" },
                        { name: "limit", type: "integer", required: false, description: "Records per page" },
                        { name: "skip", type: "integer", required: false, description: "Records to skip" },
                        { name: "sale", type: "string", required: false, description: "Sort order e.g. top_sale" }
                      ]
                    },
                    {
                      id: "mm-product-detail-by-id",
                      method: "POST",
                      path: "/POS/customOrder/mixAndMatch/getProductDetailById",
                      title: "Get Product Detail By ID",
                      description: "Retrieve full details for a Mix & Match jewelry product with optional variant selections.",
                      requestBody: { product_id: "69f84a89d9ba9df882d43370", Metal: "", Size: "", Stone: "", type: "inventory" },
                      response: { success: true, data: { _id: "69f84a89d9ba9df882d43370", name: "1 ct Aura round-cut diamond ring", SKU: "RG026", Metal: "Rose Gold", Size: "51", Stone: "Diamond", price: 12000 } },
                      params: [
                        { name: "product_id", type: "string", required: true, description: "Product ID" },
                        { name: "type", type: "string", required: true, description: "inventory | catalog" },
                        { name: "Metal", type: "string", required: false, description: "Metal option ID" },
                        { name: "Size", type: "string", required: false, description: "Size option ID" },
                        { name: "Stone", type: "string", required: false, description: "Stone option ID" }
                      ]
                    },
                    {
                      id: "mm-get-item-detail",
                      method: "POST",
                      path: "/POS/customOrder/mixAndMatch/getMixMatchItemDetail",
                      title: "Get Mix Match Item Detail",
                      description: "Retrieve combined pricing and detail for a jewelry product + diamond pairing.",
                      requestBody: { custom_id: [], type: "inventory", product_id: "69f84a89d9ba9df882d43370", diamond_id: "69f1c3d54d4947fb9298737c", customer_id: "69d38581135009caf45c2c64", cart_id: [] },
                      response: { success: true, data: { product: { _id: "69f84a89d9ba9df882d43370", name: "1 ct Aura round-cut diamond ring" }, diamond: { _id: "69f1c3d54d4947fb9298737c", Carat: 1.01, Shape: "Round" }, totalPrice: 32000 } },
                      params: [
                        { name: "product_id", type: "string", required: true, description: "Jewelry product ID" },
                        { name: "diamond_id", type: "string", required: true, description: "Diamond ID" },
                        { name: "customer_id", type: "string", required: false, description: "Customer ID" },
                        { name: "type", type: "string", required: true, description: "inventory | catalog" },
                        { name: "custom_id", type: "array", required: false, description: "Existing custom order IDs" },
                        { name: "cart_id", type: "array", required: false, description: "Existing cart IDs" }
                      ]
                    },
                    {
                      id: "mm-add-to-cart",
                      method: "POST",
                      path: "/POS/customOrder/mixAndMatch/addMixMatchToCart",
                      title: "Add Mix Match To Cart",
                      description: "Add a Mix & Match jewelry + diamond combination to the POS cart.",
                      requestBody: { items: { metal: "6985da271ba49114d3a1878f", stone: "6985da6f1ba49114d3a187d8", size: "6965df7e31676f953a14bfbe", price: 0, metal_name: "Rose Gold", size_name: "51" }, product_id: "69f84a89d9ba9df882d43370", diamond_id: "69f1c3d54d4947fb9298737c", remark: "", custom_design: { engraving_text: "hello", engraving_position: "helo", engraving_logo: "", font: "Serif", logo_position: "top" }, service_labour: { service_remark: "", service_laburelist: [], product_price: 0 }, service_saved: false, order_type: "mix_and_match", customer_id: "69d38581135009caf45c2c64", saleperson_id: "6965e02731676f953a14c3c6", product_type: "inventory" },
                      response: { success: true, cart_id: "cart_mm_001", message: "Mix & Match item added to cart" },
                      params: [
                        { name: "product_id", type: "string", required: true, description: "Jewelry product ID" },
                        { name: "diamond_id", type: "string", required: true, description: "Diamond ID" },
                        { name: "items", type: "object", required: true, description: "Selected metal, stone, size and price" },
                        { name: "order_type", type: "string", required: true, description: "mix_and_match" },
                        { name: "customer_id", type: "string", required: false, description: "Customer ID" },
                        { name: "saleperson_id", type: "string", required: false, description: "Sales person ID" },
                        { name: "product_type", type: "string", required: true, description: "inventory | catalog" },
                        { name: "custom_design", type: "object", required: false, description: "Engraving and design details" },
                        { name: "service_labour", type: "object", required: false, description: "Service and labour info" }
                      ]
                    },
                    {
                      id: "mm-cash-method-list",
                      method: "POST",
                      path: "/POS/checkout/payment/getCashMethodList",
                      title: "Get Cash Method List",
                      description: "Retrieve available payment methods for Mix & Match checkout.",
                      requestBody: {},
                      response: { success: true, data: [{ _id: "pm_001", name: "Cash" }, { _id: "pm_002", name: "Credit Card" }, { _id: "pm_003", name: "Bank Transfer" }] },
                      params: []
                    },
                    {
                      id: "mm-exchange-rates",
                      method: "POST",
                      path: "/POS/common/exchange-rates",
                      title: "Get Exchange Rates",
                      description: "Retrieve current currency exchange rates for Mix & Match pricing.",
                      requestBody: {},
                      response: { success: true, data: [{ from: "USD", to: "INR", rate: 83.5 }] },
                      params: []
                    },
                    {
                      id: "mm-save-custom-order",
                      method: "POST",
                      path: "/POS/customOrder/saveCustomOrder",
                      title: "Save Mix Match Custom Order",
                      description: "Finalise and save a Mix & Match order with full product, diamond, engraving and cart details.",
                      requestBody: { sell_info: { cart: [{ type: "mix_and_match", product_id: "69f84a89d9ba9df882d43370", diamond_id: "69f1c3d54d4947fb9298737c", order_type: "mix_and_match", customer_id: "69d38581135009caf45c2c64", sales_person_id: "6965e02731676f953a14c3c6", location_id: "6864eb6c46b97fcef1421d95", product_type: "inventory", custom_design: { engraving_text: "hello", engraving_position: "helo", engraving_logo: "", font: "Serif", logo_position: "top" }, service_labour: { service_remark: "", service_laburelist: [], product_price: 0 }, delivery_date: "2026-05-25T12:42:45.682Z" }] } },
                      response: { success: true, order_id: "co_mm_001", order_number: "MIX-2026-001", message: "Mix & Match order saved successfully" },
                      params: [
                        { name: "sell_info", type: "object", required: true, description: "Order cart and customer details" },
                        { name: "sell_info.cart", type: "array", required: true, description: "Array of Mix & Match cart items" },
                        { name: "sell_info.cart[].order_type", type: "string", required: true, description: "mix_and_match" },
                        { name: "sell_info.cart[].delivery_date", type: "string", required: false, description: "Promised delivery date ISO format" }
                      ]
                    }
                  ]
                },
        {
                  id: "pos-reports",
                  label: "Reports",
                  color: "#f59e0b",
                  endpoints: [
                    {
                      id: "daily-sales",
                      method: "POST",
                      path: "/POS/report/dailySales",
                      title: "Daily Sales Report",
                      description: "Get daily sales transactions report.",
                      requestBody: { search: "", limit: 100, start_date: "2024-06-22T11:37:46.737Z", end_date: "2024-07-22T11:37:46.648Z", type: "sales", skip: 0 },
                      response: { success: true, total: 45, totalAmount: 125000, data: [{ order_number: "PS-001", customer: "John Doe", amount: 2850, date: "2026-03-24" }] },
                      params: [
                        { name: "start_date", type: "string", required: true, description: "Start date ISO format" },
                        { name: "end_date", type: "string", required: true, description: "End date ISO format" },
                        { name: "type", type: "string", required: false, description: "sales | refund | exchange" },
                        { name: "search", type: "string", required: false, description: "Search keyword" }
                      ]
                    },
                    {
                      id: "report-customer",
                      method: "POST",
                      path: "/POS/report/customer",
                      title: "Customer Report",
                      description: "Customer transactions report for a date range.",
                      requestBody: { search: "", start_date: "2023-12-11T07:37:27.144Z", end_date: "2024-01-11T07:37:27.118Z", limit: 100, skip: 0 },
                      response: { success: true, total: 20, data: [{ customer: "John Doe", total_purchases: 3, total_amount: 8550 }] },
                      params: [
                        { name: "start_date", type: "string", required: true, description: "Start date" },
                        { name: "end_date", type: "string", required: true, description: "End date" }
                      ]
                    },
                    {
                      id: "report-exchange",
                      method: "POST",
                      path: "/POS/report/exchange",
                      title: "Exchange Report",
                      description: "Product exchange transactions report.",
                      requestBody: { search: "", start_date: "2024-05-03T07:49:47.743Z", end_date: "2024-06-03T07:49:47.725Z", limit: 100, skip: 0 },
                      response: { success: true, total: 5, data: [{ order_number: "EX-001", customer: "Jane Smith", original_amount: 2850, new_amount: 3500 }] },
                      params: [
                        { name: "start_date", type: "string", required: true, description: "Start date" },
                        { name: "end_date", type: "string", required: true, description: "End date" }
                      ]
                    },
                    {
                      id: "report-refund",
                      method: "POST",
                      path: "/POS/report/refund",
                      title: "Refund Report",
                      description: "Refund transactions report.",
                      requestBody: { search: "", start_date: "2024-05-03T07:53:28.212Z", end_date: "2024-06-03T07:53:28.198Z", limit: 100, skip: 0 },
                      response: { success: true, total: 3, totalRefunded: 5000, data: [{ order_number: "RF-001", customer: "John Doe", amount: 2850 }] },
                      params: [
                        { name: "start_date", type: "string", required: true, description: "Start date" },
                        { name: "end_date", type: "string", required: true, description: "End date" }
                      ]
                    },
                    {
                      id: "report-repair",
                      method: "POST",
                      path: "/POS/report/repair",
                      title: "Repair Report",
                      description: "Repair orders report.",
                      requestBody: { search: "", start_date: "", end_date: "", limit: 100, skip: 0 },
                      response: { success: true, total: 8, data: [{ repair_number: "RPR-001", customer: "Jane Smith", service: "Ring Sizing", amount: 500 }] },
                      params: [
                        { name: "start_date", type: "string", required: false, description: "Start date" },
                        { name: "end_date", type: "string", required: false, description: "End date" }
                      ]
                    },
                    {
                      id: "report-gift-card",
                      method: "POST",
                      path: "/POS/report/giftCard",
                      title: "Gift Card Report",
                      description: "Gift card transactions report.",
                      requestBody: { search: "", start_date: "", end_date: "", limit: 100, skip: 0 },
                      response: { success: true, total: 6, data: [{ code: "GC-001", customer: "John Doe", value: 1000, balance: 500 }] },
                      params: [
                        { name: "start_date", type: "string", required: false, description: "Start date" },
                        { name: "end_date", type: "string", required: false, description: "End date" }
                      ]
                    },
                    {
                      id: "report-custom-order",
                      method: "POST",
                      path: "/POS/report/customOrderreport",
                      title: "Custom Order Report",
                      description: "Custom order transactions report.",
                      requestBody: { search: "", start_date: "2023-05-15T12:26:23.923Z", end_date: "2023-06-15T12:26:23.890Z", limit: 100, skip: 0 },
                      response: { success: true, total: 4, data: [{ order_number: "CUS-001", customer: "Jane Smith", total: 5000, status: "completed" }] },
                      params: [
                        { name: "start_date", type: "string", required: false, description: "Start date" },
                        { name: "end_date", type: "string", required: false, description: "End date" }
                      ]
                    },
                    {
                      id: "report-reserve",
                      method: "POST",
                      path: "/POS/report/reserve",
                      title: "Reserve Report",
                      description: "Product reservation report.",
                      requestBody: { search: "", start_date: "", end_date: "", limit: 100, skip: 0 },
                      response: { success: true, total: 5, data: [{ reservation_id: "RES-001", customer: "John Doe", product: "NOBLE Diamond Ring", status: "active" }] },
                      params: [
                        { name: "start_date", type: "string", required: false, description: "Start date" },
                        { name: "end_date", type: "string", required: false, description: "End date" }
                      ]
                    },
                    {
                      id: "report-payment",
                      method: "POST",
                      path: "/POS/report/payment",
                      title: "Payment Report",
                      description: "Payment methods breakdown report.",
                      requestBody: { search: "", start_date: "", end_date: "", limit: 100, skip: 0 },
                      response: { success: true, data: { cash: 45000, credit_card: 32000, bank: 15000, total: 92000 } },
                      params: [
                        { name: "start_date", type: "string", required: false, description: "Start date" },
                        { name: "end_date", type: "string", required: false, description: "End date" }
                      ]
                    },
                    {
                      id: "report-sales-person",
                      method: "POST",
                      path: "/POS/report/salesPerson",
                      title: "Sales Person Report",
                      description: "Sales by staff/sales person report.",
                      requestBody: { search: "", start_date: "", end_date: "", limit: 100, skip: 0 },
                      response: { success: true, data: [{ staff: "Alice Johnson", total_sales: 15, total_amount: 45000, commission: 1575 }] },
                      params: [
                        { name: "start_date", type: "string", required: false, description: "Start date" },
                        { name: "end_date", type: "string", required: false, description: "End date" }
                      ]
                    },
                    {
                      id: "report-deposit",
                      method: "POST",
                      path: "/POS/report/deposit",
                      title: "Deposit Report",
                      description: "Customer deposit transactions report.",
                      requestBody: { search: "", start_date: "", end_date: "", limit: 100, skip: 0 },
                      response: { success: true, total: 7, totalDeposits: 12000, data: [{ customer: "John Doe", amount: 1000, ref: "DEP-001" }] },
                      params: [
                        { name: "start_date", type: "string", required: false, description: "Start date" },
                        { name: "end_date", type: "string", required: false, description: "End date" }
                      ]
                    },
                    {
                      id: "report-quotation",
                      method: "POST",
                      path: "/POS/report/quotationReport",
                      title: "Quotation Report",
                      description: "Quotation transactions report for a date range.",
                      requestBody: { search: "", start_date: "2026-05-04T12:35:37.509Z", end_date: "2026-05-05T12:35:37.483Z", limit: 100, skip: 0 },
                      response: { success: true, total: 5, data: [{ quotation_number: "QT-001", customer: "John Doe", total: 3500, status: "pending" }] },
                      params: [
                        { name: "start_date", type: "string", required: true, description: "Start date ISO format" },
                        { name: "end_date", type: "string", required: true, description: "End date ISO format" },
                        { name: "search", type: "string", required: false, description: "Search keyword" },
                        { name: "limit", type: "integer", required: false, description: "Records per page" },
                        { name: "skip", type: "integer", required: false, description: "Records to skip" }
                      ]
                    }
                  ]
                },
        {
                  id: "pos-common",
                  label: "Common",
                  color: "#8b5cf6",
                  endpoints: [
                    {
                      id: "login-pin-verify",
                      method: "POST",
                      path: "/POS/common/loginPINVerfy",
                      title: "Login PIN Verify",
                      description: "Verify staff PIN at POS terminal for authentication.",
                      requestBody: { verfypin: "123456" },
                      response: { success: true, verified: true, staff: { id: "67eba015592f7b47cd9e184e", name: "Admin", role: "Administrator" } },
                      params: [
                        { name: "verfypin", type: "string", required: true, description: "6-digit staff PIN" }
                      ]
                    },
                    {
                      id: "get-my-inventory-list",
                      method: "POST",
                      path: "/POS/common/getMyinventoryList",
                      title: "Get My Inventory List",
                      description: "Retrieve inventory items available at the current POS location.",
                      requestBody: { search: "", ids: [] },
                      response: { success: true, data: [{ _id: "prod_001", sku: "RG026", name: "NOBLE Diamond Ring", price: 2850 }] },
                      params: [
                        { name: "search", type: "string", required: false, description: "Search keyword" },
                        { name: "ids", type: "array", required: false, description: "Filter by specific product IDs" }
                      ]
                    }
                  ]
                }
        ]
    };
