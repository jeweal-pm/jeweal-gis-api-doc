import poEndpoints from './inventory-po-endpoints';
import puEndpoints from './inventory-pu-endpoints';
import stockTakeEndpoints from './inventory-stocktake-endpoints';
import reserveEndpoints from './inventory-reserve-endpoints';

export default {
      id: "inventory",
      label: "Inventory",
      icon: "📦",
      color: "#10b981",
      description: "Purchase Orders, Purchase transactions, Stock Transfer, Stock Receive, Stock Take and Reports",
      subsections: [
            {
                  id: "purchase-order",
                  label: "Purchase Order (PO)",
                  color: "#10b981",
                  endpoints: poEndpoints
            },
            {
                  id: "purchase",
                  label: "Purchase (PU)",
                  color: "#6366f1",
                  endpoints: puEndpoints
            },
            {
                  id: "stock-transfer",
                  label: "Stock Transfer",
                  color: "#f59e0b",
                  endpoints: [
                        {
                              id: "stocktransfer-get-create-list",
                              method: "POST",
                              path: "/Inventory/stocktransfer/getCreateList",
                              title: "Get Create List",
                              description: "Loads selected rows for Stock Transfer create screen.",
                              requestBody: {
                                    id: [
                                          "69c36665da69440ec5e27d2d"
                                    ],
                                    search: "",
                                    limit: 100,
                                    skip: 0
                              },
                              response: {
                                    code: 200,
                                    data: [
                                          {
                                                po_product_id: "69c36665da69440ec5e27d2d",
                                                SKU: "AVEN-B1",
                                                quantity: 10
                                          }
                                    ]
                              },
                              params: [
                                    {
                                          name: "authorization",
                                          type: "string",
                                          required: true,
                                          in: "header",
                                          description: "JWT from admin login (lowercase `authorization` in UAT)."
                                    },
                                    {
                                          name: "Content-Type",
                                          type: "string",
                                          required: true,
                                          in: "header",
                                          description: "application/json"
                                    },
                                    {
                                          name: "id",
                                          type: "array",
                                          required: true,
                                          description: "Array of source row ids"
                                    },
                                    {
                                          name: "search",
                                          type: "string",
                                          required: false,
                                          description: "Search keyword"
                                    },
                                    {
                                          name: "limit",
                                          type: "integer",
                                          required: false,
                                          description: "Page size"
                                    },
                                    {
                                          name: "skip",
                                          type: "integer",
                                          required: false,
                                          description: "Offset"
                                    }
                              ]
                        },
                        {
                              id: "stocktransfer-create",
                              method: "POST",
                              path: "/Inventory/stocktransfer/createStockTransfer",
                              title: "Create Stock Transfer",
                              description: "Creates stock transfer transaction with source, destination, and line rows.",
                              requestBody: {
                                    voucher_id: "68eb0e10bd937cbe2751b1d5",
                                    transaction_date: "2026-03-25T17:58:02.287Z",
                                    delivery_date: "2026-04-01T17:58:02.312Z",
                                    transfer_to_location: "68cab537f1f31057aecf0629",
                                    transfer_from: "68cd5bb37e7a3787b6acc459",
                                    remark: null,
                                    purchase_data: [
                                          {
                                                po_product_id: "69c36665da69440ec5e27d2d",
                                                stock_transfer_id: "",
                                                quantity: 5,
                                                repair_connect: false,
                                                stock_id: "ST51"
                                          }
                                    ]
                              },
                              response: {
                                    code: 200,
                                    message: "Stock Transfer created",
                                    id: "69c4223dda69440ec5e2eab3"
                              },
                              params: [
                                    {
                                          name: "authorization",
                                          type: "string",
                                          required: true,
                                          in: "header",
                                          description: "JWT from admin login (lowercase `authorization` in UAT)."
                                    },
                                    {
                                          name: "Content-Type",
                                          type: "string",
                                          required: true,
                                          in: "header",
                                          description: "application/json"
                                    },
                                    {
                                          name: "voucher_id",
                                          type: "string",
                                          required: true,
                                          description: "Stock transfer voucher id"
                                    },
                                    {
                                          name: "transfer_from",
                                          type: "string",
                                          required: true,
                                          description: "Source location id"
                                    },
                                    {
                                          name: "transfer_to_location",
                                          type: "string",
                                          required: true,
                                          description: "Destination location id"
                                    },
                                    {
                                          name: "purchase_data",
                                          type: "array",
                                          required: true,
                                          description: "Rows with po_product_id, stock_id, quantity"
                                    }
                              ]
                        },
                        {
                              id: "stocktransfer-list",
                              method: "POST",
                              path: "/Inventory/stocktransfer/getStockTransferList",
                              title: "Get Stock Transfer List",
                              description: "Returns stock transfer list by status/date/search filters (you use status 2 and status 1).",
                              requestBody: {
                                    search: "",
                                    limit: 100,
                                    skip: 0,
                                    status: 2,
                                    start_date: "2026-02-22T18:30:00.000Z",
                                    end_date: "2026-03-25T17:43:11.939Z"
                              },
                              response: {
                                    code: 200,
                                    data: [
                                          {
                                                transfer_no: "ST-01",
                                                status: 2
                                          }
                                    ],
                                    count: 1
                              },
                              params: [
                                    {
                                          name: "authorization",
                                          type: "string",
                                          required: true,
                                          in: "header",
                                          description: "JWT from admin login (lowercase `authorization` in UAT)."
                                    },
                                    {
                                          name: "Content-Type",
                                          type: "string",
                                          required: true,
                                          in: "header",
                                          description: "application/json"
                                    },
                                    {
                                          name: "search",
                                          type: "string",
                                          required: false,
                                          description: "Search keyword"
                                    },
                                    {
                                          name: "status",
                                          type: "integer",
                                          required: false,
                                          description: "Transfer status"
                                    },
                                    {
                                          name: "start_date",
                                          type: "string",
                                          required: false,
                                          description: "Start date ISO"
                                    },
                                    {
                                          name: "end_date",
                                          type: "string",
                                          required: false,
                                          description: "End date ISO"
                                    },
                                    {
                                          name: "limit",
                                          type: "integer",
                                          required: false,
                                          description: "Page size"
                                    },
                                    {
                                          name: "skip",
                                          type: "integer",
                                          required: false,
                                          description: "Offset"
                                    }
                              ]
                        },
                        {
                              id: "stocktransfer-edit-status",
                              method: "POST",
                              path: "/Inventory/stocktransfer/editStockTransferStatus",
                              title: "Edit Stock Transfer Status",
                              description: "Updates transfer status. Supports simple update and shipped update with logistics fields.",
                              requestBody: {
                                    logistic_id: "",
                                    awb_number: "",
                                    status: 1,
                                    stock_transfer_id: "69c4223dda69440ec5e2eab3"
                              },
                              response: {
                                    code: 200,
                                    message: "Status Updated Successfully."
                              },
                              params: [
                                    {
                                          name: "authorization",
                                          type: "string",
                                          required: true,
                                          in: "header",
                                          description: "JWT from admin login (lowercase `authorization` in UAT)."
                                    },
                                    {
                                          name: "Content-Type",
                                          type: "string",
                                          required: true,
                                          in: "header",
                                          description: "application/json"
                                    },
                                    {
                                          name: "stock_transfer_id",
                                          type: "string",
                                          required: true,
                                          description: "Stock transfer id"
                                    },
                                    {
                                          name: "status",
                                          type: "integer",
                                          required: true,
                                          description: "1 or 3 based on flow"
                                    },
                                    {
                                          name: "logistic_id",
                                          type: "string",
                                          required: false,
                                          description: "Logistics partner id (used for shipping flow)"
                                    },
                                    {
                                          name: "awb_number",
                                          type: "string",
                                          required: false,
                                          description: "AWB number (used for shipping flow)"
                                    }
                              ]
                        },
                        {
                              id: "stocktransfer-inventory-list",
                              method: "POST",
                              path: "/Inventory/stocktransfer/getInventoryList",
                              title: "Get Inventory List (for ST)",
                              description: "Fetches inventory rows available for stock transfer with multi-filter payload.",
                              requestBody: {
                                    item: [],
                                    collection: [],
                                    metal: [],
                                    size: [],
                                    stone: [],
                                    productStatus: [],
                                    location: [],
                                    price: [],
                                    search: "",
                                    limit: 100,
                                    skip: 0,
                                    stock_ids: []
                              },
                              response: {
                                    code: 200,
                                    data: [
                                          {
                                                stock_id: "ST1",
                                                SKU: "AVEN-B1",
                                                qty: 10
                                          }
                                    ],
                                    count: 1
                              },
                              params: [
                                    {
                                          name: "authorization",
                                          type: "string",
                                          required: true,
                                          in: "header",
                                          description: "JWT from admin login (lowercase `authorization` in UAT)."
                                    },
                                    {
                                          name: "Content-Type",
                                          type: "string",
                                          required: true,
                                          in: "header",
                                          description: "application/json"
                                    },
                                    {
                                          name: "search",
                                          type: "string",
                                          required: false,
                                          description: "Search keyword"
                                    },
                                    {
                                          name: "item",
                                          type: "array",
                                          required: false,
                                          description: "Filter by item ids"
                                    },
                                    {
                                          name: "collection",
                                          type: "array",
                                          required: false,
                                          description: "Filter by collection ids"
                                    },
                                    {
                                          name: "metal",
                                          type: "array",
                                          required: false,
                                          description: "Filter by metal ids"
                                    },
                                    {
                                          name: "size",
                                          type: "array",
                                          required: false,
                                          description: "Filter by size ids"
                                    },
                                    {
                                          name: "stone",
                                          type: "array",
                                          required: false,
                                          description: "Filter by stone ids"
                                    },
                                    {
                                          name: "location",
                                          type: "array",
                                          required: false,
                                          description: "Filter by location ids"
                                    },
                                    {
                                          name: "stock_ids",
                                          type: "array",
                                          required: false,
                                          description: "Explicit stock ids to include"
                                    }
                              ]
                        }
                  ]
            },
            {
                  id: "stock-receive",
                  label: "Stock Receive",
                  color: "#14b8a6",
                  endpoints: [
                        {
                              id: "stockreceive-list",
                              method: "POST",
                              path: "/Inventory/stockreceive/getStockReceiveList",
                              title: "Get Stock Receive List",
                              description: "Returns stock receive list by date/search filters.",
                              requestBody: {
                                    search: "",
                                    limit: 100,
                                    skip: 0,
                                    start_date: "2026-02-22T18:30:00.000Z",
                                    end_date: "2026-03-25T18:01:15.768Z"
                              },
                              response: {
                                    code: 200,
                                    data: [
                                          {
                                                stock_receive_no: "SR-01",
                                                status: 1
                                          }
                                    ],
                                    count: 1
                              },
                              params: [
                                    {
                                          name: "authorization",
                                          type: "string",
                                          required: true,
                                          in: "header",
                                          description: "JWT from admin login (lowercase `authorization` in UAT)."
                                    },
                                    {
                                          name: "Content-Type",
                                          type: "string",
                                          required: true,
                                          in: "header",
                                          description: "application/json"
                                    },
                                    {
                                          name: "search",
                                          type: "string",
                                          required: false,
                                          description: "Search keyword"
                                    },
                                    {
                                          name: "start_date",
                                          type: "string",
                                          required: false,
                                          description: "Start date ISO"
                                    },
                                    {
                                          name: "end_date",
                                          type: "string",
                                          required: false,
                                          description: "End date ISO"
                                    },
                                    {
                                          name: "limit",
                                          type: "integer",
                                          required: false,
                                          description: "Page size"
                                    },
                                    {
                                          name: "skip",
                                          type: "integer",
                                          required: false,
                                          description: "Offset"
                                    }
                              ]
                        },
                        {
                              id: "stockreceive-edit-status",
                              method: "POST",
                              path: "/Inventory/stockreceive/editStockReceiveStatus",
                              title: "Edit Stock Receive Status",
                              description: "Updates stock receive status.",
                              requestBody: {
                                    status: 4,
                                    stock_transfer_id: "69c4223dda69440ec5e2eab3"
                              },
                              response: {
                                    code: 200,
                                    message: "Status Updated Successfully."
                              },
                              params: [
                                    {
                                          name: "authorization",
                                          type: "string",
                                          required: true,
                                          in: "header",
                                          description: "JWT from admin login (lowercase `authorization` in UAT)."
                                    },
                                    {
                                          name: "Content-Type",
                                          type: "string",
                                          required: true,
                                          in: "header",
                                          description: "application/json"
                                    },
                                    {
                                          name: "stock_transfer_id",
                                          type: "string",
                                          required: true,
                                          description: "Stock transfer id"
                                    },
                                    {
                                          name: "status",
                                          type: "integer",
                                          required: true,
                                          description: "Receive status value"
                                    }
                              ]
                        },
                        {
                              id: "get-outstanding-list",
                              method: "POST",
                              path: "/inventory/purchase/getPuOutStandingList",
                              title: "Get Outstanding Receive List",
                              description: "Get list of POs pending stock receive.",
                              requestBody: {
                                    search: "",
                                    limit: 100,
                                    skip: 0,
                                    sku: [],
                                    item: [],
                                    collection: [],
                                    metal: [],
                                    location: []
                              },
                              response: {
                                    success: true,
                                    total: 3,
                                    data: [
                                          {
                                                _id: "po_001",
                                                po_number: "PO-2026-001",
                                                pending_qty: 5,
                                                supplier: "De Beers Diamonds"
                                          }
                                    ]
                              },
                              params: [
                                    {
                                          name: "search",
                                          type: "string",
                                          required: false,
                                          description: "Search by stock ID or SKU"
                                    },
                                    {
                                          name: "location",
                                          type: "array",
                                          required: false,
                                          description: "Filter by location IDs"
                                    }
                              ]
                        }
                  ]
            },
            {
                  id: "inventory-common",
                  label: "Common",
                  color: "#84cc16",
                  endpoints: [
                        {
                              id: "transaction-totals",
                              method: "POST",
                              path: "/Inventory/common/transactionTotals",
                              title: "Transaction Totals",
                              description: "Returns dashboard counters for Allocation, PO, PU, ST, SR and POS.",
                              requestBody: {

                              },
                              response: {
                                    code: 200,
                                    data: {
                                          allocation: 0,
                                          PO: {
                                                pending: 10,
                                                approved: 10,
                                                completed: 13,
                                                cancelled: 0,
                                                total: 20
                                          },
                                          PU: {
                                                outstanding: 10,
                                                pending: 0,
                                                approved: 13,
                                                cancelled: 0,
                                                total: 0
                                          },
                                          ST: {
                                                pending: 0,
                                                approved: 0,
                                                transit: 0,
                                                completed: 13,
                                                cancelled: 0,
                                                total: 0
                                          },
                                          SR: 0,
                                          match: true,
                                          POS: 0,
                                          posCount: 8
                                    }
                              },
                              params: [
                                    {
                                          name: "authorization",
                                          type: "string",
                                          required: true,
                                          in: "header",
                                          description: "JWT from admin login (lowercase `authorization` in UAT)."
                                    },
                                    {
                                          name: "Content-Type",
                                          type: "string",
                                          required: true,
                                          in: "header",
                                          description: "application/json"
                                    }
                              ]
                        },
                        {
                              id: "item-search-data",
                              method: "POST",
                              path: "/inventory/my/itemSearchData",
                              title: "Item Search",
                              description: "Search for inventory items by stock_id, SKU or name.",
                              requestBody: {
                                    search: "RG026",
                                    type: "stock_id"
                              },
                              response: {
                                    success: true,
                                    data: [
                                          {
                                                stock_id: "100201",
                                                sku: "RG026",
                                                name: "NOBLE Diamond Ring",
                                                location: "Main Store",
                                                status: "In Stock"
                                          }
                                    ]
                              },
                              params: [
                                    {
                                          name: "search",
                                          type: "string",
                                          required: true,
                                          description: "Search value"
                                    },
                                    {
                                          name: "type",
                                          type: "string",
                                          required: true,
                                          description: "stock_id | sku | name"
                                    }
                              ]
                        },
                        {
                              id: "item-key-search",
                              method: "POST",
                              path: "/inventory/my/itemKeySearch",
                              title: "Item Key Search",
                              description: "Quick inventory item search by key identifier.",
                              requestBody: {
                                    search: "100201",
                                    type: "stock_id"
                              },
                              response: {
                                    success: true,
                                    data: [
                                          {
                                                stock_id: "100201",
                                                sku: "RG026",
                                                name: "NOBLE Diamond Ring"
                                          }
                                    ]
                              },
                              params: [
                                    {
                                          name: "search",
                                          type: "string",
                                          required: true,
                                          description: "Search key"
                                    },
                                    {
                                          name: "type",
                                          type: "string",
                                          required: true,
                                          description: "stock_id | sku | name"
                                    }
                              ]
                        },
                        {
                              id: "get-qr-code",
                              method: "POST",
                              path: "/inventory/common/getQRcode",
                              title: "Get QR Code",
                              description: "Generate a QR code for a stock item or PO number.",
                              requestBody: {
                                    data: "PO205596"
                              },
                              response: {
                                    success: true,
                                    qr_code: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
                              },
                              params: [
                                    {
                                          name: "data",
                                          type: "string",
                                          required: true,
                                          description: "Value to encode in QR (stock_id, PO number etc.)"
                                    }
                              ]
                        },
                        {
                              id: "get-org-settings",
                              method: "POST",
                              path: "/Inventory/common/getOrganisationSettings",
                              title: "Get Organisation Settings",
                              description: "Retrieve organisation-level settings including timezone, currency and feature flags.",
                              requestBody: {

                              },
                              response: {
                                    success: true,
                                    data: {
                                          organisation_name: "Demo Jewelry Bangkok",
                                          timezone: "Asia/Bangkok",
                                          default_currency: "ANG",
                                          date_format: "d/m/Y",
                                          settings: {
                                                PMDC: 1,
                                                AW: 0,
                                                PC: 1
                                          }
                                    }
                              },
                              params: []
                        }
                  ]
            },
            {
                  id: "diamond-search",
                  label: "Diamond Search",
                  color: "#10b981",
                  endpoints: [
                        {
                              id: "diamond-get-list",
                              method: "POST",
                              path: "/Inventory/diamond/getList",
                              title: "Diamond Search / Get List",
                              description: "Returns a paginated list of diamonds filtered by cut, clarity, colour, polish, symmetry, fluorescence, shape, carat range, price range, depth, table, grading lab (Lbs), status, location, and date range.",
                              requestBody: {
                                    length: 0,
                                    limit: 10,
                                    skip: 0,
                                    CUT: [
                                          "68e9f742d6e661ec9b0ad8a7",
                                          "69132c441df7304561db86e3"
                                    ],
                                    Clarity: [
                                          "68e9f742d6e661ec9b0ad8a6",
                                          "69132c441df7304561db86de",
                                          "69132c491df7304561db8715",
                                          "69132c4d1df7304561db872a"
                                    ],
                                    Stonecolor: [
                                          "68e9f742d6e661ec9b0ad8a8",
                                          "69132c4c1df7304561db8727",
                                          "69132c431df7304561db86d9"
                                    ],
                                    Polish: [
                                          "69132c441df7304561db86e7",
                                          "69132c4e1df7304561db872e",
                                          "69132c551df7304561db8754"
                                    ],
                                    Symmetry: [
                                          "69132c451df7304561db86ea",
                                          "69132c4a1df7304561db871a",
                                          "69132c4e1df7304561db8731",
                                          "69132c561df7304561db8757"
                                    ],
                                    fluorescence: [
                                          "69132c451df7304561db86ed",
                                          "69132c4f1df7304561db8734",
                                          "69132c561df7304561db875a"
                                    ],
                                    Lbs: [
                                          "GIA"
                                    ],
                                    Status: [
                                          "3",
                                          "1"
                                    ],
                                    Location: [
                                          "68cab537f1f31057aecf0629",
                                          "68cd5bb37e7a3787b6acc459"
                                    ],
                                    Shape: [
                                          "637c8a69d3001af825b71960",
                                          "637c8a3dd3001af825b7195c",
                                          "637c8a1bd3001af825b7195a"
                                    ],
                                    Price: [
                                          {
                                                min: 0,
                                                max: 20000
                                          }
                                    ],
                                    Carat: [
                                          {
                                                min: 0.1,
                                                max: 1.07
                                          }
                                    ],
                                    Depth: [
                                          {
                                                min: 0,
                                                max: 63
                                          }
                                    ],
                                    Table: [
                                          {
                                                min: 0,
                                                max: 69
                                          }
                                    ],
                                    start_date: "2026-03-30T11:11:09.771Z",
                                    end_date: "2026-03-30T11:11:09.771Z"
                              },
                              response: {
                                    code: 200,
                                    data: [
                                          {
                                                _id: "69132c471df7304561db86fc",
                                                Location: "Heart & Arrow",
                                                Shape: "https://gis247.s3.us-east-2.amazonaws.com/Diamond/round-diamond.svg",
                                                Colour: "J",
                                                Clarity: "Vs2",
                                                Cut: "Normal Cut",
                                                Carat: 1.07,
                                                Polish: "Good",
                                                Symmetry: "Ex",
                                                Fluoresence: "Strong",
                                                Depth: 60,
                                                Table: 62,
                                                GradedBy: "GIA",
                                                Certification: "1245160114",
                                                CertificationUrl: "",
                                                Price: "฿20,000.00",
                                                TagPrice: 20000,
                                                Status: 1,
                                                image: [
                                                      "https://gis247.s3.us-east-2.amazonaws.com/diamondSample.jpg"
                                                ],
                                                Shape_id: "637c8a1bd3001af825b7195a",
                                                customer: ""
                                          },
                                          {
                                                _id: "69132c4b1df7304561db8720",
                                                Location: "Heart & Arrow",
                                                Shape: "https://gis247.s3.us-east-2.amazonaws.com/Diamond/round-diamond.svg",
                                                Colour: "J",
                                                Clarity: "Si2",
                                                Cut: "Normal Cut",
                                                Carat: 1,
                                                Polish: "Good",
                                                Symmetry: "Very Good",
                                                Fluoresence: "Strong",
                                                Depth: 63,
                                                Table: 59,
                                                GradedBy: "GIA",
                                                Certification: "6292057458",
                                                CertificationUrl: "",
                                                Price: "฿20,000.00",
                                                TagPrice: 20000,
                                                Status: 1,
                                                image: [
                                                      "https://gis247.s3.us-east-2.amazonaws.com/diamondSample.jpg"
                                                ],
                                                Shape_id: "637c8a1bd3001af825b7195a",
                                                customer: ""
                                          },
                                          {
                                                _id: "69132c501df7304561db8739",
                                                Location: "Heart & Arrow",
                                                Shape: "https://gis247.s3.us-east-2.amazonaws.com/Diamond/round-diamond.svg",
                                                Colour: "I",
                                                Clarity: "Si1",
                                                Cut: "Good",
                                                Carat: 1.01,
                                                Polish: "Ex",
                                                Symmetry: "Good",
                                                Fluoresence: "None",
                                                Depth: 59.5,
                                                Table: 69,
                                                GradedBy: "GIA",
                                                Certification: "2286042991",
                                                CertificationUrl: "",
                                                Price: "฿20,000.00",
                                                TagPrice: 20000,
                                                Status: 3,
                                                image: [
                                                      "https://gis247.s3.us-east-2.amazonaws.com/diamondSample.jpg"
                                                ],
                                                customer_id: "68cf3d39f813eb7c1f335bf0",
                                                reserveDate: "2026-03-30T00:00:00.000Z",
                                                Shape_id: "637c8a1bd3001af825b7195a",
                                                customer: "Born Sha"
                                          },
                                          {
                                                _id: "69132c531df7304561db874a",
                                                Location: "Heart & Arrow",
                                                Shape: "https://gis247.s3.us-east-2.amazonaws.com/Diamond/emerald-diamond.svg",
                                                Colour: "I",
                                                Clarity: "Si2",
                                                Cut: "Good",
                                                Carat: 1.01,
                                                Polish: "Ex",
                                                Symmetry: "Good",
                                                Fluoresence: "None",
                                                Depth: 56.1,
                                                Table: 63,
                                                GradedBy: "GIA",
                                                Certification: "2317284661",
                                                CertificationUrl: "",
                                                Price: "฿20,000.00",
                                                TagPrice: 20000,
                                                Status: 1,
                                                image: [
                                                      "https://gis247.s3.us-east-2.amazonaws.com/diamondSample.jpg"
                                                ],
                                                Shape_id: "637c8a69d3001af825b71960",
                                                customer: ""
                                          },
                                          {
                                                _id: "69132c571df7304561db875f",
                                                Location: "Heart & Arrow",
                                                Shape: "https://gis247.s3.us-east-2.amazonaws.com/Diamond/pear-diamond.svg",
                                                Colour: "D",
                                                Clarity: "VS1",
                                                Cut: "Good",
                                                Carat: 0.1,
                                                Polish: "Very Good",
                                                Symmetry: "-",
                                                Fluoresence: "Faint",
                                                Depth: 0,
                                                Table: 0,
                                                GradedBy: "GIA",
                                                Certification: "1257418756",
                                                CertificationUrl: "",
                                                Price: "฿20,000.00",
                                                TagPrice: 20000,
                                                Status: 1,
                                                image: [
                                                      "https://gis247.s3.us-east-2.amazonaws.com/diamondSample.jpg"
                                                ],
                                                Shape_id: "637c8a3dd3001af825b7195c",
                                                customer: ""
                                          },
                                          {
                                                _id: "69132c5a1df7304561db8798",
                                                Location: "DEMO1",
                                                Shape: "https://gis247.s3.us-east-2.amazonaws.com/Diamond/round-diamond.svg",
                                                Colour: "J",
                                                Clarity: "Vs2",
                                                Cut: "Normal Cut",
                                                Carat: 1.07,
                                                Polish: "Good",
                                                Symmetry: "Ex",
                                                Fluoresence: "Strong",
                                                Depth: 60,
                                                Table: 62,
                                                GradedBy: "GIA",
                                                Certification: "1245160114",
                                                CertificationUrl: "",
                                                Price: "฿20,000.00",
                                                TagPrice: 20000,
                                                Status: 1,
                                                image: [
                                                      "https://gis247.s3.us-east-2.amazonaws.com/diamondSample.jpg"
                                                ],
                                                Shape_id: "637c8a1bd3001af825b7195a",
                                                customer: ""
                                          },
                                          {
                                                _id: "69132c5b1df7304561db87a7",
                                                Location: "DEMO1",
                                                Shape: "https://gis247.s3.us-east-2.amazonaws.com/Diamond/round-diamond.svg",
                                                Colour: "J",
                                                Clarity: "Si2",
                                                Cut: "Normal Cut",
                                                Carat: 1,
                                                Polish: "Good",
                                                Symmetry: "Very Good",
                                                Fluoresence: "Strong",
                                                Depth: 63,
                                                Table: 59,
                                                GradedBy: "GIA",
                                                Certification: "6292057458",
                                                CertificationUrl: "",
                                                Price: "฿20,000.00",
                                                TagPrice: 20000,
                                                Status: 1,
                                                image: [
                                                      "https://gis247.s3.us-east-2.amazonaws.com/diamondSample.jpg"
                                                ],
                                                Shape_id: "637c8a1bd3001af825b7195a",
                                                customer: ""
                                          },
                                          {
                                                _id: "69132c5b1df7304561db87b5",
                                                Location: "DEMO1",
                                                Shape: "https://gis247.s3.us-east-2.amazonaws.com/Diamond/round-diamond.svg",
                                                Colour: "I",
                                                Clarity: "Si1",
                                                Cut: "Good",
                                                Carat: 1.01,
                                                Polish: "Ex",
                                                Symmetry: "Good",
                                                Fluoresence: "None",
                                                Depth: 59.5,
                                                Table: 69,
                                                GradedBy: "GIA",
                                                Certification: "2286042991",
                                                CertificationUrl: "",
                                                Price: "฿20,000.00",
                                                TagPrice: 20000,
                                                Status: 1,
                                                image: [
                                                      "https://gis247.s3.us-east-2.amazonaws.com/diamondSample.jpg"
                                                ],
                                                Shape_id: "637c8a1bd3001af825b7195a",
                                                customer: ""
                                          },
                                          {
                                                _id: "69132c5c1df7304561db87c3",
                                                Location: "DEMO1",
                                                Shape: "https://gis247.s3.us-east-2.amazonaws.com/Diamond/emerald-diamond.svg",
                                                Colour: "I",
                                                Clarity: "Si2",
                                                Cut: "Good",
                                                Carat: 1.01,
                                                Polish: "Ex",
                                                Symmetry: "Good",
                                                Fluoresence: "None",
                                                Depth: 56.1,
                                                Table: 63,
                                                GradedBy: "GIA",
                                                Certification: "2317284661",
                                                CertificationUrl: "",
                                                Price: "฿20,000.00",
                                                TagPrice: 20000,
                                                Status: 1,
                                                image: [
                                                      "https://gis247.s3.us-east-2.amazonaws.com/diamondSample.jpg"
                                                ],
                                                Shape_id: "637c8a69d3001af825b71960",
                                                customer: ""
                                          },
                                          {
                                                _id: "69132c5c1df7304561db87d0",
                                                Location: "DEMO1",
                                                Shape: "https://gis247.s3.us-east-2.amazonaws.com/Diamond/pear-diamond.svg",
                                                Colour: "D",
                                                Clarity: "VS1",
                                                Cut: "Good",
                                                Carat: 0.1,
                                                Polish: "Very Good",
                                                Symmetry: "-",
                                                Fluoresence: "Faint",
                                                Depth: 0,
                                                Table: 0,
                                                GradedBy: "GIA",
                                                Certification: "1257418756",
                                                CertificationUrl: "",
                                                Price: "฿20,000.00",
                                                TagPrice: 20000,
                                                Status: 1,
                                                image: [
                                                      "https://gis247.s3.us-east-2.amazonaws.com/diamondSample.jpg"
                                                ],
                                                Shape_id: "637c8a3dd3001af825b7195c",
                                                customer: ""
                                          }
                                    ],
                                    totalResult: 0
                              },
                              params: [
                                    {
                                          name: "limit",
                                          type: "number",
                                          required: false,
                                          description: "Number of results per page (default 10)"
                                    },
                                    {
                                          name: "skip",
                                          type: "number",
                                          required: false,
                                          description: "Records to skip for pagination"
                                    },
                                    {
                                          name: "CUT",
                                          type: "array",
                                          required: false,
                                          description: "Array of cut IDs to filter by"
                                    },
                                    {
                                          name: "Clarity",
                                          type: "array",
                                          required: false,
                                          description: "Array of clarity IDs to filter by"
                                    },
                                    {
                                          name: "Stonecolor",
                                          type: "array",
                                          required: false,
                                          description: "Array of stone colour IDs to filter by"
                                    },
                                    {
                                          name: "Polish",
                                          type: "array",
                                          required: false,
                                          description: "Array of polish IDs to filter by"
                                    },
                                    {
                                          name: "Symmetry",
                                          type: "array",
                                          required: false,
                                          description: "Array of symmetry IDs to filter by"
                                    },
                                    {
                                          name: "fluorescence",
                                          type: "array",
                                          required: false,
                                          description: "Array of fluorescence IDs to filter by"
                                    },
                                    {
                                          name: "Shape",
                                          type: "array",
                                          required: false,
                                          description: "Array of shape IDs to filter by"
                                    },
                                    {
                                          name: "Lbs",
                                          type: "array",
                                          required: false,
                                          description: "Grading lab codes, e.g. `[\"GIA\"]`"
                                    },
                                    {
                                          name: "Status",
                                          type: "array",
                                          required: false,
                                          description: "Status codes: `\"1\"` = available, `\"3\"` = reserved"
                                    },
                                    {
                                          name: "Location",
                                          type: "array",
                                          required: false,
                                          description: "Array of location IDs to filter by"
                                    },
                                    {
                                          name: "Price",
                                          type: "array",
                                          required: false,
                                          description: "Price range filter: `[{ min, max }]`"
                                    },
                                    {
                                          name: "Carat",
                                          type: "array",
                                          required: false,
                                          description: "Carat weight range: `[{ min, max }]`"
                                    },
                                    {
                                          name: "Depth",
                                          type: "array",
                                          required: false,
                                          description: "Depth % range: `[{ min, max }]`"
                                    },
                                    {
                                          name: "Table",
                                          type: "array",
                                          required: false,
                                          description: "Table % range: `[{ min, max }]`"
                                    },
                                    {
                                          name: "start_date",
                                          type: "string",
                                          required: false,
                                          description: "ISO 8601 date — filter from this date"
                                    },
                                    {
                                          name: "end_date",
                                          type: "string",
                                          required: false,
                                          description: "ISO 8601 date — filter up to this date"
                                    }
                              ]
                        },
                        {
                              id: "diamond-upload-xls",
                              method: "POST",
                              path: "/Inventory/diamond/uploadDiamondxls",
                              contentType: "multipart/form-data",
                              title: "Upload Diamond Excel",
                              description: "Bulk-import loose diamonds from an Excel (.xlsx) file. Send multipart/form-data with the spreadsheet file and type set to DiamondImport.",
                              requestBody: {
                                    file: "Diamond_67eba015592f7b47cd9e184e.xlsx",
                                    type: "DiamondImport"
                              },
                              response: {
                                    code: 200,
                                    message: "Diamond import started",
                                    imported: 0,
                                    errors: []
                              },
                              params: [
                                    {
                                          name: "authorization",
                                          type: "string",
                                          required: true,
                                          in: "header",
                                          description: "JWT from admin login."
                                    },
                                    {
                                          name: "file",
                                          type: "file",
                                          required: true,
                                          in: "form",
                                          description: "Excel file (.xlsx) — e.g. Diamond_67eba015592f7b47cd9e184e.xlsx"
                                    },
                                    {
                                          name: "type",
                                          type: "string",
                                          required: true,
                                          in: "form",
                                          description: "Import type — use DiamondImport"
                                    }
                              ]
                        }
                  ]
            },
            {
                  id: "stock-take",
                  label: "Stock Take",
                  color: "#10b981",
                  endpoints: stockTakeEndpoints
            },
            {
                  id: "inventory-reports",
                  label: "All Reports",
                  color: "#f59e0b",
                  endpoints: [
                        {
                              id: "inv-report-reserve",
                              method: "POST",
                              path: "/Inventory/report/reserve",
                              title: "Reserve Report",
                              description: "Returns a report of reserved inventory items within the specified date range.",
                              requestBody: {
                                    limit: 100,
                                    skip: 0,
                                    start_date: "2026-02-27T18:30:00.000Z",
                                    end_date: "2026-03-30T11:17:01.292Z"
                              },
                              response: {
                                    code: 200,
                                    data: [],
                                    total: 0
                              },
                              params: [
                                    {
                                          name: "limit",
                                          type: "number",
                                          required: false,
                                          description: "Max records to return (default 100)"
                                    },
                                    {
                                          name: "skip",
                                          type: "number",
                                          required: false,
                                          description: "Records to skip for pagination"
                                    },
                                    {
                                          name: "start_date",
                                          type: "string",
                                          required: true,
                                          description: "ISO 8601 start date for the report range"
                                    },
                                    {
                                          name: "end_date",
                                          type: "string",
                                          required: true,
                                          description: "ISO 8601 end date for the report range"
                                    }
                              ]
                        },
                        {
                              id: "inv-report-purchaseorder",
                              method: "POST",
                              path: "/Inventory/report/purchaseorder",
                              title: "Purchase Order Report",
                              description: "Returns a report of purchase orders within the specified date range, with optional keyword search.",
                              requestBody: {
                                    search: "",
                                    limit: 100,
                                    skip: 0,
                                    start_date: "2026-02-27T18:30:00.000Z",
                                    end_date: "2026-03-30T11:17:45.272Z"
                              },
                              response: {
                                    code: 200,
                                    data: [],
                                    total: 0
                              },
                              params: [
                                    {
                                          name: "search",
                                          type: "string",
                                          required: false,
                                          description: "Keyword to filter purchase orders"
                                    },
                                    {
                                          name: "limit",
                                          type: "number",
                                          required: false,
                                          description: "Max records to return (default 100)"
                                    },
                                    {
                                          name: "skip",
                                          type: "number",
                                          required: false,
                                          description: "Records to skip for pagination"
                                    },
                                    {
                                          name: "start_date",
                                          type: "string",
                                          required: true,
                                          description: "ISO 8601 start date for the report range"
                                    },
                                    {
                                          name: "end_date",
                                          type: "string",
                                          required: true,
                                          description: "ISO 8601 end date for the report range"
                                    }
                              ]
                        },
                        {
                              id: "inv-report-purchasereport",
                              method: "POST",
                              path: "/Inventory/report/purchasereport",
                              title: "Purchase Report",
                              description: "Returns a detailed purchase transactions report within the specified date range.",
                              requestBody: {
                                    search: "",
                                    limit: 100,
                                    skip: 0,
                                    start_date: "2026-02-27T18:30:00.000Z",
                                    end_date: "2026-03-30T11:17:57.968Z"
                              },
                              response: {
                                    code: 200,
                                    data: [],
                                    total: 0
                              },
                              params: [
                                    {
                                          name: "search",
                                          type: "string",
                                          required: false,
                                          description: "Keyword to filter purchase records"
                                    },
                                    {
                                          name: "limit",
                                          type: "number",
                                          required: false,
                                          description: "Max records to return (default 100)"
                                    },
                                    {
                                          name: "skip",
                                          type: "number",
                                          required: false,
                                          description: "Records to skip for pagination"
                                    },
                                    {
                                          name: "start_date",
                                          type: "string",
                                          required: true,
                                          description: "ISO 8601 start date for the report range"
                                    },
                                    {
                                          name: "end_date",
                                          type: "string",
                                          required: true,
                                          description: "ISO 8601 end date for the report range"
                                    }
                              ]
                        },
                        {
                              id: "inv-report-stock-transfer",
                              method: "POST",
                              path: "/Inventory/report/getReportStockTransfer",
                              title: "Stock Transfer Report",
                              description: "Returns a report of all stock transfers between locations within the specified date range.",
                              requestBody: {
                                    search: "",
                                    limit: 100,
                                    skip: 0,
                                    start_date: "2026-02-27T18:30:00.000Z",
                                    end_date: "2026-03-30T11:18:20.544Z"
                              },
                              response: {
                                    code: 200,
                                    data: [],
                                    total: 0
                              },
                              params: [
                                    {
                                          name: "search",
                                          type: "string",
                                          required: false,
                                          description: "Keyword to filter transfer records"
                                    },
                                    {
                                          name: "limit",
                                          type: "number",
                                          required: false,
                                          description: "Max records to return (default 100)"
                                    },
                                    {
                                          name: "skip",
                                          type: "number",
                                          required: false,
                                          description: "Records to skip for pagination"
                                    },
                                    {
                                          name: "start_date",
                                          type: "string",
                                          required: true,
                                          description: "ISO 8601 start date for the report range"
                                    },
                                    {
                                          name: "end_date",
                                          type: "string",
                                          required: true,
                                          description: "ISO 8601 end date for the report range"
                                    }
                              ]
                        },
                        {
                              id: "inv-report-stock-receive",
                              method: "POST",
                              path: "/Inventory/report/getReportStockReceive",
                              title: "Stock Receive Report",
                              description: "Returns a report of all stock received (from suppliers or transfers) within the specified date range.",
                              requestBody: {
                                    search: "",
                                    limit: 100,
                                    skip: 0,
                                    start_date: "2026-02-27T18:30:00.000Z",
                                    end_date: "2026-03-30T11:18:36.586Z"
                              },
                              response: {
                                    code: 200,
                                    data: [],
                                    total: 0
                              },
                              params: [
                                    {
                                          name: "search",
                                          type: "string",
                                          required: false,
                                          description: "Keyword to filter received stock records"
                                    },
                                    {
                                          name: "limit",
                                          type: "number",
                                          required: false,
                                          description: "Max records to return (default 100)"
                                    },
                                    {
                                          name: "skip",
                                          type: "number",
                                          required: false,
                                          description: "Records to skip for pagination"
                                    },
                                    {
                                          name: "start_date",
                                          type: "string",
                                          required: true,
                                          description: "ISO 8601 start date for the report range"
                                    },
                                    {
                                          name: "end_date",
                                          type: "string",
                                          required: true,
                                          description: "ISO 8601 end date for the report range"
                                    }
                              ]
                        },
                        {
                              id: "inv-report-stocktake",
                              method: "POST",
                              path: "/Inventory/report/stocktake",
                              title: "Stock Take Report",
                              description: "Returns a report of completed stock take sessions within the specified date range.",
                              requestBody: {
                                    search: "",
                                    limit: 100,
                                    skip: 0,
                                    start_date: "2026-02-27T18:30:00.000Z",
                                    end_date: "2026-03-30T11:18:51.915Z"
                              },
                              response: {
                                    code: 200,
                                    data: [],
                                    total: 0
                              },
                              params: [
                                    {
                                          name: "search",
                                          type: "string",
                                          required: false,
                                          description: "Keyword to filter stock take records"
                                    },
                                    {
                                          name: "limit",
                                          type: "number",
                                          required: false,
                                          description: "Max records to return (default 100)"
                                    },
                                    {
                                          name: "skip",
                                          type: "number",
                                          required: false,
                                          description: "Records to skip for pagination"
                                    },
                                    {
                                          name: "start_date",
                                          type: "string",
                                          required: true,
                                          description: "ISO 8601 start date for the report range"
                                    },
                                    {
                                          name: "end_date",
                                          type: "string",
                                          required: true,
                                          description: "ISO 8601 end date for the report range"
                                    }
                              ]
                        },
                        {
                              id: "inv-report-low-stock",
                              method: "POST",
                              path: "/Inventory/report/lowStock",
                              title: "Low Stock Report",
                              description: "Returns items that have fallen below minimum stock threshold within the specified date range.",
                              requestBody: {
                                    search: "",
                                    limit: 100,
                                    skip: 0,
                                    start_date: "2026-02-27T18:30:00.000Z",
                                    end_date: "2026-03-30T11:19:06.256Z"
                              },
                              response: {
                                    code: 200,
                                    data: [],
                                    total: 0
                              },
                              params: [
                                    {
                                          name: "search",
                                          type: "string",
                                          required: false,
                                          description: "Keyword to filter low stock items"
                                    },
                                    {
                                          name: "limit",
                                          type: "number",
                                          required: false,
                                          description: "Max records to return (default 100)"
                                    },
                                    {
                                          name: "skip",
                                          type: "number",
                                          required: false,
                                          description: "Records to skip for pagination"
                                    },
                                    {
                                          name: "start_date",
                                          type: "string",
                                          required: true,
                                          description: "ISO 8601 start date for the report range"
                                    },
                                    {
                                          name: "end_date",
                                          type: "string",
                                          required: true,
                                          description: "ISO 8601 end date for the report range"
                                    }
                              ]
                        },
                        {
                              id: "inv-report-vendor",
                              method: "POST",
                              path: "/Inventory/report/getReportVendor",
                              title: "Vendor Report",
                              description: "Returns a vendor/supplier performance report including purchase orders and delivery records within the specified date range.",
                              requestBody: {
                                    search: "",
                                    limit: 100,
                                    skip: 0,
                                    start_date: "2026-02-27T18:30:00.000Z",
                                    end_date: "2026-03-30T11:19:17.784Z"
                              },
                              response: {
                                    code: 200,
                                    data: [],
                                    total: 0
                              },
                              params: [
                                    {
                                          name: "search",
                                          type: "string",
                                          required: false,
                                          description: "Keyword to filter by vendor name"
                                    },
                                    {
                                          name: "limit",
                                          type: "number",
                                          required: false,
                                          description: "Max records to return (default 100)"
                                    },
                                    {
                                          name: "skip",
                                          type: "number",
                                          required: false,
                                          description: "Records to skip for pagination"
                                    },
                                    {
                                          name: "start_date",
                                          type: "string",
                                          required: true,
                                          description: "ISO 8601 start date for the report range"
                                    },
                                    {
                                          name: "end_date",
                                          type: "string",
                                          required: true,
                                          description: "ISO 8601 end date for the report range"
                                    }
                              ]
                        }
                  ]
            },
            {
                  id: "inventory-summary",
                  label: "Summary",
                  color: "#10b981",
                  endpoints: [
                        {
                              id: "inventory-get-summary",
                              method: "POST",
                              path: "/Inventory/my/getSummery",
                              title: "Get Inventory Summary",
                              description: "Returns a high-level inventory summary including total items, value, weight, and stock status breakdown. Supports keyword search and pagination.",
                              requestBody: {
                                    search: "",
                                    limit: 100,
                                    skip: 0
                              },
                              response: {
                                    code: 200,
                                    data: {
                                          totalItems: 245,
                                          totalWeight: 1250.5,
                                          totalValue: 520000,
                                          available: 210,
                                          reserved: 20,
                                          sold: 15
                                    }
                              },
                              params: [
                                    {
                                          name: "search",
                                          type: "string",
                                          required: false,
                                          description: "Keyword to filter summary by item name or stock ID"
                                    },
                                    {
                                          name: "limit",
                                          type: "number",
                                          required: false,
                                          description: "Max records to return (default 100)"
                                    },
                                    {
                                          name: "skip",
                                          type: "number",
                                          required: false,
                                          description: "Records to skip for pagination"
                                    }
                              ]
                        }
                  ]
            },
            {
                  id: "inventory-reserve",
                  label: "Reserve",
                  color: "#10b981",
                  endpoints: reserveEndpoints
            },
            {
                  id: "inventory-product-movements",
                  label: "Product Movements",
                  color: "#10b981",
                  childGroups: [
                        {
                              id: "product-movement-sku",
                              label: "SKU",
                              endpoints: [
                                    {
                                          id: "product-movement-sku-movement",
                                          method: "POST",
                                          path: "/Inventory/productMovement/SKUMovement",
                                          title: "SKU Movement",
                                          description: "Returns product movement history grouped by SKU, with optional filters for metal, location, collection, item, size, and stone.",
                                          requestBody: {
                                                type: "SKU",
                                                metal: [],
                                                location: [],
                                                collection: [],
                                                item: [],
                                                search: "",
                                                size: [],
                                                stone: [],
                                                limit: "100",
                                                skip: 0
                                          },
                                          response: {
                                                code: 200,
                                                data: [],
                                                total: 0
                                          },
                                          params: [
                                                {
                                                      name: "type",
                                                      type: "string",
                                                      required: true,
                                                      description: "Movement type — use `\"SKU\"` for SKU-level grouping"
                                                },
                                                {
                                                      name: "metal",
                                                      type: "array",
                                                      required: false,
                                                      description: "Filter by metal IDs"
                                                },
                                                {
                                                      name: "location",
                                                      type: "array",
                                                      required: false,
                                                      description: "Filter by location IDs"
                                                },
                                                {
                                                      name: "collection",
                                                      type: "array",
                                                      required: false,
                                                      description: "Filter by collection IDs"
                                                },
                                                {
                                                      name: "item",
                                                      type: "array",
                                                      required: false,
                                                      description: "Filter by item IDs"
                                                },
                                                {
                                                      name: "size",
                                                      type: "array",
                                                      required: false,
                                                      description: "Filter by size IDs"
                                                },
                                                {
                                                      name: "stone",
                                                      type: "array",
                                                      required: false,
                                                      description: "Filter by stone IDs"
                                                },
                                                {
                                                      name: "search",
                                                      type: "string",
                                                      required: false,
                                                      description: "Keyword to search by SKU or item name"
                                                },
                                                {
                                                      name: "limit",
                                                      type: "string",
                                                      required: false,
                                                      description: "Max records to return (default `\"100\"`)"
                                                },
                                                {
                                                      name: "skip",
                                                      type: "number",
                                                      required: false,
                                                      description: "Records to skip for pagination"
                                                }
                                          ]
                                    }
                              ]
                        },
                        {
                              id: "product-movement-stock-id",
                              label: "Stock ID",
                              endpoints: [
                                    {
                                          id: "product-movement-stockid-sku",
                                          method: "POST",
                                          path: "/Inventory/productMovement/StockIDWithSKUMovement",
                                          title: "Stock ID with SKU Movement",
                                          description: "Returns product movement history at the individual stock ID level, with optional filters for item, collection, metal, size, stone, product status, location, and price.",
                                          requestBody: {
                                                item: [],
                                                collection: [],
                                                metal: [],
                                                size: [],
                                                stone: [],
                                                productStatus: [],
                                                location: [],
                                                price: [],
                                                search: "",
                                                limit: "100",
                                                skip: 0
                                          },
                                          response: {
                                                code: 200,
                                                data: [],
                                                total: 0
                                          },
                                          params: [
                                                {
                                                      name: "item",
                                                      type: "array",
                                                      required: false,
                                                      description: "Filter by item IDs"
                                                },
                                                {
                                                      name: "collection",
                                                      type: "array",
                                                      required: false,
                                                      description: "Filter by collection IDs"
                                                },
                                                {
                                                      name: "metal",
                                                      type: "array",
                                                      required: false,
                                                      description: "Filter by metal IDs"
                                                },
                                                {
                                                      name: "size",
                                                      type: "array",
                                                      required: false,
                                                      description: "Filter by size IDs"
                                                },
                                                {
                                                      name: "stone",
                                                      type: "array",
                                                      required: false,
                                                      description: "Filter by stone IDs"
                                                },
                                                {
                                                      name: "productStatus",
                                                      type: "array",
                                                      required: false,
                                                      description: "Filter by product status codes"
                                                },
                                                {
                                                      name: "location",
                                                      type: "array",
                                                      required: false,
                                                      description: "Filter by location IDs"
                                                },
                                                {
                                                      name: "price",
                                                      type: "array",
                                                      required: false,
                                                      description: "Filter by price range `[{ min, max }]`"
                                                },
                                                {
                                                      name: "search",
                                                      type: "string",
                                                      required: false,
                                                      description: "Keyword to search by stock ID or item name"
                                                },
                                                {
                                                      name: "limit",
                                                      type: "string",
                                                      required: false,
                                                      description: "Max records to return (default `\"100\"`)"
                                                },
                                                {
                                                      name: "skip",
                                                      type: "number",
                                                      required: false,
                                                      description: "Records to skip for pagination"
                                                }
                                          ]
                                    }
                              ]
                        }
                  ]
            },
            {
                  id: "inventory-item-search",
                  label: "Item Search",
                  color: "#10b981",
                  endpoints: [
                        {
                              id: "item-search-data",
                              method: "POST",
                              path: "/inventory/my/itemSearchData",
                              title: "Item Search Data",
                              description: "Searches inventory by SKU or stock ID and returns the matching item's core details (product info, metal, stone, weight, location, status).",
                              requestBody: {
                                    search: "CLEO-B22",
                                    type: "SKU"
                              },
                              response: {
                                    code: 200,
                                    data: {
                                          _id: "69c41d15da69440ec5e2e2c7",
                                          SKU: "CLEO-B22",
                                          stock_id: "CLEO-B22-001",
                                          item_name: "Cleopatra Bangle",
                                          metal: "Gold",
                                          weight: 12.5,
                                          stone: "Diamond",
                                          location: "Heart & Arrow",
                                          status: 1
                                    }
                              },
                              params: [
                                    {
                                          name: "search",
                                          type: "string",
                                          required: true,
                                          description: "SKU or stock ID to search for"
                                    },
                                    {
                                          name: "type",
                                          type: "string",
                                          required: true,
                                          description: "`\"SKU\"` to search by SKU, `\"stock_id\"` to search by stock ID"
                                    }
                              ]
                        },
                        {
                              id: "item-search-transaction",
                              method: "POST",
                              path: "/inventory/my/itemSearchTransection",
                              title: "Item Search Transactions",
                              description: "Returns the full transaction history (sales, transfers, stock receive, stock take) for a given SKU or stock ID, filtered by location and transaction type.",
                              requestBody: {
                                    location_id: "",
                                    type: "all",
                                    limit: 100,
                                    search: "",
                                    SKU: "CLEO-B22",
                                    stock_id: ""
                              },
                              response: {
                                    code: 200,
                                    data: [],
                                    total: 0
                              },
                              params: [
                                    {
                                          name: "SKU",
                                          type: "string",
                                          required: false,
                                          description: "SKU to look up transactions for"
                                    },
                                    {
                                          name: "stock_id",
                                          type: "string",
                                          required: false,
                                          description: "Stock ID to look up transactions for (use instead of SKU for individual item lookup)"
                                    },
                                    {
                                          name: "type",
                                          type: "string",
                                          required: false,
                                          description: "Transaction type filter: `\"all\"`, `\"sale\"`, `\"transfer\"`, `\"receive\"`, `\"stocktake\"`"
                                    },
                                    {
                                          name: "location_id",
                                          type: "string",
                                          required: false,
                                          description: "Filter transactions by location ID"
                                    },
                                    {
                                          name: "search",
                                          type: "string",
                                          required: false,
                                          description: "Additional keyword search"
                                    },
                                    {
                                          name: "limit",
                                          type: "number",
                                          required: false,
                                          description: "Max records to return (default 100)"
                                    }
                              ]
                        }
                  ]
            },
            {
                  id: "inventory-low-stock-planning",
                  label: "Low Stock Planning",
                  color: "#10b981",
                  endpoints: [
                        {
                              id: "low-stock-list",
                              method: "POST",
                              path: "/inventory/my/lowstocklist",
                              title: "Low Stock List",
                              description: "Returns a list of SKUs that have fallen below minimum stock levels within the specified date range. Supports keyword search and pagination.",
                              requestBody: {
                                    search: "",
                                    skip: 0,
                                    limit: 100,
                                    start_date: "2026-03-02T11:33:39.196Z",
                                    end_date: "2026-03-30T11:33:39.169Z"
                              },
                              response: {
                                    code: 200,
                                    data: [],
                                    total: 0
                              },
                              params: [
                                    {
                                          name: "search",
                                          type: "string",
                                          required: false,
                                          description: "Keyword to filter by SKU or item name"
                                    },
                                    {
                                          name: "limit",
                                          type: "number",
                                          required: false,
                                          description: "Max records to return (default 100)"
                                    },
                                    {
                                          name: "skip",
                                          type: "number",
                                          required: false,
                                          description: "Records to skip for pagination"
                                    },
                                    {
                                          name: "start_date",
                                          type: "string",
                                          required: true,
                                          description: "ISO 8601 start date for the low stock window"
                                    },
                                    {
                                          name: "end_date",
                                          type: "string",
                                          required: true,
                                          description: "ISO 8601 end date for the low stock window"
                                    }
                              ]
                        },
                        {
                              id: "low-stock-create",
                              method: "POST",
                              path: "/inventory/my/lowstockCreate",
                              title: "Create Low Stock Plan (PO)",
                              description: "Generates a purchase order plan from low stock items for the specified supplier, locations, and voucher within a date range.",
                              requestBody: {
                                    location: [
                                          "68cab537f1f31057aecf0629",
                                          "68cd5bb37e7a3787b6acc459",
                                          "692108597ec4cc91ff40d857",
                                          "6966098d06863d38ba7a49b3"
                                    ],
                                    supplier: "69130315f86a3cc97cf06d94",
                                    skip: "0",
                                    limit: 100,
                                    start_date: "2026-03-30T11:34:12.892Z",
                                    end_date: "2026-03-30T11:34:12.892Z",
                                    voucher_id: "68eb0e10bd937cbe2751b1d7"
                              },
                              response: {
                                    code: 200,
                                    message: "Low stock plan created successfully",
                                    data: {
                                          po_id: "69c41d15da69440ec5e2e2c7",
                                          po_no: "PO-005"
                                    }
                              },
                              params: [
                                    {
                                          name: "location",
                                          type: "array",
                                          required: true,
                                          description: "Array of location IDs to include in the plan"
                                    },
                                    {
                                          name: "supplier",
                                          type: "string",
                                          required: true,
                                          description: "Supplier ID to raise the purchase order against"
                                    },
                                    {
                                          name: "voucher_id",
                                          type: "string",
                                          required: true,
                                          description: "Voucher/location context ID"
                                    },
                                    {
                                          name: "start_date",
                                          type: "string",
                                          required: true,
                                          description: "ISO 8601 start date for the planning period"
                                    },
                                    {
                                          name: "end_date",
                                          type: "string",
                                          required: true,
                                          description: "ISO 8601 end date for the planning period"
                                    },
                                    {
                                          name: "limit",
                                          type: "number",
                                          required: false,
                                          description: "Max records to process (default 100)"
                                    },
                                    {
                                          name: "skip",
                                          type: "string",
                                          required: false,
                                          description: "Records to skip for pagination"
                                    }
                              ]
                        }
                  ]
            },
            {
                  id: "inventory-zone",
                  label: "Zone",
                  color: "#10b981",
                  endpoints: [
                        {
                              id: "zone-vault-list",
                              method: "POST",
                              path: "/zone/vault-list",
                              title: "Zone Vault List",
                              description: "Returns a list of zone vault issue/return records within the specified date range. Requires both `authorization` and `Pos-Authorization` headers.",
                              requestBody: {
                                    search: "",
                                    startDate: "2026-03-02T11:36:49.971Z",
                                    endDate: "2026-03-30T11:36:49.959Z",
                                    limit: 100,
                                    skip: 0
                              },
                              response: {
                                    code: 200,
                                    data: [],
                                    total: 0
                              },
                              params: [
                                    {
                                          name: "search",
                                          type: "string",
                                          required: false,
                                          description: "Keyword to filter vault records"
                                    },
                                    {
                                          name: "startDate",
                                          type: "string",
                                          required: true,
                                          description: "ISO 8601 start date for the vault list range"
                                    },
                                    {
                                          name: "endDate",
                                          type: "string",
                                          required: true,
                                          description: "ISO 8601 end date for the vault list range"
                                    },
                                    {
                                          name: "limit",
                                          type: "number",
                                          required: false,
                                          description: "Max records to return (default 100)"
                                    },
                                    {
                                          name: "skip",
                                          type: "number",
                                          required: false,
                                          description: "Records to skip for pagination"
                                    }
                              ]
                        },
                        {
                              id: "zone-create-issue-stocks",
                              method: "POST",
                              path: "/zone/create-issue-stocks",
                              title: "Create Zone Issue / Return",
                              description: "Creates a zone stock issue or return record assigning items to a salesperson for a specific location and zone. Set `type` to `\"issue\"` for issuing stock or `\"return\"` for returning it.",
                              requestBody: {
                                    LocationId: "68cd5bb37e7a3787b6acc459",
                                    ZoneId: "694cf7a7f5b8836cb8094a17",
                                    SalePersonIds: [
                                          "68eb0d8cbd937cbe2751b19a"
                                    ],
                                    IssueDate: "2026-03-30T11:38:37.576Z",
                                    ReturnDate: "2026-03-30T11:38:37.576Z",
                                    Status: 1,
                                    issue: 0,
                                    return: 0,
                                    sold: 0,
                                    items: [],
                                    type: "issue"
                              },
                              response: {
                                    code: 200,
                                    message: "Zone issue created successfully",
                                    data: {
                                          _id: "694cf7a7f5b8836cb8094a18",
                                          type: "issue",
                                          status: 1
                                    }
                              },
                              params: [
                                    {
                                          name: "LocationId",
                                          type: "string",
                                          required: true,
                                          description: "Location ID where the stock issue/return occurs"
                                    },
                                    {
                                          name: "ZoneId",
                                          type: "string",
                                          required: true,
                                          description: "Zone ID the stock is being issued to or returned from"
                                    },
                                    {
                                          name: "SalePersonIds",
                                          type: "array",
                                          required: true,
                                          description: "Array of salesperson IDs receiving/returning the stock"
                                    },
                                    {
                                          name: "IssueDate",
                                          type: "string",
                                          required: true,
                                          description: "ISO 8601 issue date"
                                    },
                                    {
                                          name: "ReturnDate",
                                          type: "string",
                                          required: true,
                                          description: "ISO 8601 expected return date"
                                    },
                                    {
                                          name: "Status",
                                          type: "number",
                                          required: true,
                                          description: "`1` = active"
                                    },
                                    {
                                          name: "items",
                                          type: "array",
                                          required: false,
                                          description: "Array of stock item objects to include in the issue/return"
                                    },
                                    {
                                          name: "type",
                                          type: "string",
                                          required: true,
                                          description: "`\"issue\"` to issue stock to a zone, `\"return\"` to return it"
                                    },
                                    {
                                          name: "issue",
                                          type: "number",
                                          required: false,
                                          description: "Issue quantity count"
                                    },
                                    {
                                          name: "return",
                                          type: "number",
                                          required: false,
                                          description: "Return quantity count"
                                    },
                                    {
                                          name: "sold",
                                          type: "number",
                                          required: false,
                                          description: "Sold quantity count"
                                    }
                              ]
                        }
                  ]
            }
      ]
};
