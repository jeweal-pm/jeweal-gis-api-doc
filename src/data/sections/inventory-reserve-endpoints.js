/** Inventory Reserve — API call order when creating a reserve from inventory. */

const AUTH_HEADERS = [
  { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
  { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
];

const reserveEndpoints = [
  {
    id: "reserve-find-customer",
    method: "POST",
    path: "/App/customer/find",
    title: "Find Customer",
    description: "Search customers by name, phone, or email when creating an inventory reserve.",
    requestBody: { search: "t" },
    response: {
      success: true,
      data: [{ _id: "69d38581135009caf45c2c64", name: "Tanu Yadav", phone: "+66-00-000-0000" }],
    },
    params: [
      ...AUTH_HEADERS,
      { name: "search", type: "string", required: true, description: "Search text (name, phone, email)" },
    ],
  },
  {
    id: "reserve-create",
    method: "POST",
    path: "/Inventory/my/createReserve",
    title: "Create Reserve",
    description: "Hold inventory stock for a customer with delivery date, salesperson, voucher, and reserve line items.",
    requestBody: {
      customer_id: "69d38581135009caf45c2c64",
      ref_no: "",
      delivery_date: "2026-06-11T09:57:09.157Z",
      transaction_date: "2026-06-10T09:57:09.077Z",
      sales_person_id: "6965e02731676f953a14c3c6",
      voucher_id: "6965e01b31676f953a14c371",
      reserve: [
        {
          stock_id: "juuu",
          reserve_qty: 5,
          po_product_id: "6a2151f6104b8eb575e9b1f9",
          remark: "HOLD for today ",
        },
      ],
    },
    response: {
      code: 200,
      message: "Reserve created successfully",
      id: "6a292f1a04b84f35df789c99",
    },
    params: [
      ...AUTH_HEADERS,
      { name: "customer_id", type: "string", required: true, description: "Customer ID from find customer" },
      { name: "ref_no", type: "string", required: false, description: "External reference number" },
      { name: "delivery_date", type: "string", required: false, description: "Promised delivery date (ISO 8601)" },
      { name: "transaction_date", type: "string", required: false, description: "Reserve transaction date (ISO 8601)" },
      { name: "sales_person_id", type: "string", required: false, description: "Assigned salesperson ID" },
      { name: "voucher_id", type: "string", required: true, description: "Reserve voucher type ID" },
      { name: "reserve", type: "array", required: true, description: "Array of { stock_id, reserve_qty, po_product_id, remark }" },
    ],
  },
  {
    id: "reserve-template-printout-list",
    method: "POST",
    path: "/template-printout/list",
    title: "List Barcode Printout Templates",
    description: "Loads barcode printout templates after reserve creation (for label printing).",
    requestBody: { template_type: "barcode_printout_template" },
    response: {
      status: 200,
      data: [
        {
          _id: "66fd5ba44d992d6a6efab565",
          profile_name: "Template Barcode 01 SG",
          template_type: "barcode_printout_template",
          current_template_layout_selected: { label: "Template-01-Barcode", value: "template_1" },
        },
      ],
    },
    params: [
      ...AUTH_HEADERS,
      { name: "template_type", type: "string", required: true, description: "Use barcode_printout_template" },
    ],
  },
];

export default reserveEndpoints;
