import warrantyEndpoints from "./setup-warranty-endpoints";

export default {
      id: "setup",
      label: "Setup",
      icon: "🎛️",
      color: "#0d9488",
      description: "Admin Setup module: Quick Store, Device, General settings, Payment Method, Tax Rules, E-mail templates, Application Keys, Domains, Barcode, and Warranty configuration. All routes are POST with JSON body and require JWT in the authorization header.",
      subsections: [

        /* ── 1. Quick Store Setup ─────────── */
        {
          id: "setup-quick-store",
          label: "Quick Store Setup",
          color: "#14b8a6",
          endpoints: [
            {
              id: "setup-quickstore-get-location-list",
              method: "POST",
              path: "/App/quicksetup/get-location-list",
              title: "Get Location List",
              description: "Returns the list of locations available for quick store setup. Supports search and filter by name and code.",
              requestBody: { search: "", filter: { name: [], code: [] }, sort: {} },
              response: { code: 200, data: [], total: 0 },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." },
                { code: 400, message: "Bad Request — invalid filter format." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "search", type: "string", required: false, description: "Search text; empty string returns all." },
                { name: "filter.name", type: "array", required: false, description: "Filter by location name(s)." },
                { name: "filter.code", type: "array", required: false, description: "Filter by location code(s)." },
                { name: "sort", type: "object", required: false, description: "Sort config object; empty object = default sort." }
              ]
            },
            {
              id: "setup-quickstore-location-filter",
              method: "POST",
              path: "/App/location/locationfilter",
              title: "Location Filter Options",
              description: "Returns available filter metadata (name, code options) for the location picker used in Quick Store Setup.",
              requestBody: {},
              response: { code: 200, data: {} },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" }
              ]
            },
            {
              id: "setup-quickstore-gql-locations",
              method: "GRAPHQL",
              path: "/Inventory/graphql",
              title: "Get Locations (GraphQL)",
              description: "GraphQL query to fetch all locations with id, name, and type. Used internally by Quick Store Setup to populate the location dropdown.",
              requestBody: { query: "{\n    locations {\n        id\n        name\n        type\n    }\n}", variables: {} },
              response: {
                code: 200,
                data: {
                  locations: [
                    { id: "6864eb6c46b97fcef1421d95", name: "STORE", type: "Store" },
                    { id: "634f6d59ae461466b73d0959", name: "WAREHOUSE", type: "Warehouse" }
                  ]
                }
              },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." },
                { code: 400, message: "Bad Request — malformed GraphQL query." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "query", type: "string", required: true, description: "GraphQL query string for locations." },
                { name: "variables", type: "object", required: false, description: "GraphQL variables object; empty for this query." }
              ]
            }
          ]
        },

        /* ── 2. Device ────────────────────── */
        {
          id: "setup-device",
          label: "Device",
          color: "#0d9488",
          endpoints: [
            {
              id: "setup-device-get-list",
              method: "POST",
              path: "/App/device/get-list",
              title: "Get Device List",
              description: "Returns a paginated list of all configured devices (RFID scanners, terminals, etc.). Supports search.",
              requestBody: { search: "", limit: 100, skip: 0 },
              response: { code: 200, data: [], total: 0 },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "search", type: "string", required: false, description: "Search text; empty string returns all." },
                { name: "limit", type: "integer", required: false, description: "Max records to return (default 100)." },
                { name: "skip", type: "integer", required: false, description: "Offset for pagination." }
              ]
            },
            {
              id: "setup-device-add",
              method: "POST",
              path: "/App/device/add",
              title: "Add Device",
              description: "Creates a new device entry. Assign one or more location IDs; set status to '1' for active.",
              requestBody: {
                name: "Scan11",
                deviceType: "RFID Scanner",
                client: "Formal",
                description: "Scan",
                blindKey: "yyy",
                blindTimeStamp: "hhh",
                status: "1",
                location: ["6864eb6c46b97fcef1421d95"]
              },
              response: { code: 200, message: "Device created successfully." },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." },
                { code: 400, message: "Bad Request — missing required fields (name, deviceType)." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "name", type: "string", required: true, description: "Device display name." },
                { name: "deviceType", type: "string", required: true, description: "e.g. RFID Scanner, Terminal." },
                { name: "client", type: "string", required: false, description: "Client or context label." },
                { name: "description", type: "string", required: false, description: "Free-text description." },
                { name: "blindKey", type: "string", required: false, description: "Blind mode key." },
                { name: "blindTimeStamp", type: "string", required: false, description: "Blind mode timestamp token." },
                { name: "status", type: "string", required: true, description: "'1' = active, '0' = inactive." },
                { name: "location", type: "array", required: true, description: "Array of location IDs this device belongs to." }
              ]
            },
            {
              id: "setup-device-edit",
              method: "POST",
              path: "/App/device/edit",
              title: "Edit Device",
              description: "Updates an existing device. Pass the document `id` along with all fields to update including the current devicelogo URL.",
              requestBody: {
                id: "69ca4c0773f8a936ee76a6e0",
                name: "Scan11",
                deviceType: "RFID Scanner",
                client: "Formal",
                description: "Scan",
                blindKey: "yyyhhh",
                blindTimeStamp: "hhh",
                location: ["6864eb6c46b97fcef1421d95"],
                status: "1",
                devicelogo: "https://gis247.s3.us-east-2.amazonaws.com/placeholder-user-blank.png"
              },
              response: { code: 200, message: "Device updated successfully." },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." },
                { code: 404, message: "Not Found — no device matches the provided id." },
                { code: 400, message: "Bad Request — missing required id or name." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "id", type: "string", required: true, description: "Device document ID to update." },
                { name: "name", type: "string", required: true, description: "Updated device name." },
                { name: "deviceType", type: "string", required: true, description: "Device type." },
                { name: "client", type: "string", required: false, description: "Client label." },
                { name: "description", type: "string", required: false, description: "Updated description." },
                { name: "blindKey", type: "string", required: false, description: "Updated blind key." },
                { name: "blindTimeStamp", type: "string", required: false, description: "Updated blind timestamp." },
                { name: "location", type: "array", required: true, description: "Array of location IDs." },
                { name: "status", type: "string", required: true, description: "'1' = active, '0' = inactive." },
                { name: "devicelogo", type: "string", required: false, description: "Full URL of the device logo image." }
              ]
            }
          ]
        },

        /* ── 3. General ───────────────────── */
        {
          id: "setup-general",
          label: "General",
          color: "#0f766e",
          endpoints: [
            {
              id: "setup-general-list",
              method: "POST",
              path: "/App/setup/general-list",
              title: "Get General Settings",
              description: "Returns the full organisation-level general settings object. Each key is a feature flag ('1' = on, '0' = off). Used to display and pre-fill the General settings form.",
              requestBody: {},
              response: {
                code: 200,
                data: {
                  _id: "634f694d17ae947408110e40",
                  Activate_loyalty_points: "1",
                  ACTIVE_COUPON: "1",
                  Users_to_enter_PIN_for_every_sale: "0",
                  Product_master_display_cost: "1",
                  Cash_Register_close_every_day: "1",
                  Allow_user_manually: "0",
                  Already_exchange_item: "1",
                  Switch_between_user: "0",
                  Every_customer_must: "0",
                  Allow_processing_Refund: "1",
                  Prompt_to_enter_delivery: "0",
                  Cashier_to_required_manager_permission: "0",
                  logistic_status: "0",
                  POS_partial_payment: "1",
                  POS_change_price: "1",
                  Low_Stock_Notification_Email: "0",
                  productChoice: "1",
                  customOrder_delivery: { status: "1", weeks: "1" },
                  repairOrder_delivery: { status: "1", weeks: "1" },
                  purchaseOrder_delivery: { status: "1", weeks: "1" },
                  Template_with_Image: "1",
                  allowWarehouse: "0",
                  createdAt: "2023-09-01T09:46:40.000Z",
                  updatedAt: "2025-11-24T05:09:58.210Z",
                  reserve_delivery: { status: "1", weeks: "1" },
                  servicelabers: "1",
                  servicelandabers: "1",
                  isQuotation: "1",
                  isPark: "1",
                  blockChainLedger: "1",
                  activate_ecom_catagories_menu: "1",
                  activate_pos_catagories_menu: "0",
                  traceability: "1"
                }
              },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" }
              ]
            },
            {
              id: "setup-general-update",
              method: "POST",
              path: "/App/setup/general-update",
              title: "Update General Settings",
              description: "Saves updated general settings. Pass the full settings object including `_id`. All feature-flag values are strings '1' or '0'. Delivery sub-objects require `status` and `weeks`.",
              requestBody: {
                _id: "634f694d17ae947408110e40",
                Activate_loyalty_points: "1",
                ACTIVE_COUPON: "1",
                activate_ecom_catagories_menu: "1",
                activate_pos_catagories_menu: "0",
                Users_to_enter_PIN_for_every_sale: "0",
                Product_master_display_cost: "1",
                Cash_Register_close_every_day: "1",
                Allow_user_manually: "0",
                Already_exchange_item: "1",
                Switch_between_user: "0",
                Every_customer_must: "0",
                Allow_processing_Refund: "1",
                Prompt_to_enter_delivery: "0",
                Cashier_to_required_manager_permission: "0",
                logistic_status: "0",
                POS_partial_payment: "1",
                POS_change_price: "1",
                Low_Stock_Notification_Email: "0",
                productChoice: "1",
                customOrder_delivery: { status: "1", weeks: "1" },
                repairOrder_delivery: { status: "1", weeks: "1" },
                purchaseOrder_delivery: { status: "1", weeks: "1" },
                Template_with_Image: "1",
                allowWarehouse: "1",
                traceability: "1",
                reserve_delivery: { status: "1", weeks: "1" },
                servicelabers: "1",
                servicelandabers: "1",
                isQuotation: "1",
                isPark: "1",
                blockChainLedger: "1"
              },
              response: { code: 200, message: "The setting change was successful." },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." },
                { code: 400, message: "Bad Request — missing _id or invalid field value." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "_id", type: "string", required: true, description: "Settings document ID (from general-list response)." },
                { name: "Activate_loyalty_points", type: "string", required: false, description: "'1' / '0' — enable loyalty points." },
                { name: "ACTIVE_COUPON", type: "string", required: false, description: "'1' / '0' — enable coupon system." },
                { name: "POS_change_price", type: "string", required: false, description: "'1' / '0' — allow POS operator to override price." },
                { name: "allowWarehouse", type: "string", required: false, description: "'1' / '0' — enable warehouse module." },
                { name: "traceability", type: "string", required: false, description: "'1' / '0' — enable product traceability." },
                { name: "customOrder_delivery / repairOrder_delivery / purchaseOrder_delivery / reserve_delivery", type: "object", required: false, description: "Delivery settings: { status: '1'|'0', weeks: string }." }
              ]
            }
          ]
        },

        /* ── 4. Payment Method ────────────── */
        {
          id: "setup-payment-method",
          label: "Payment Method",
          color: "#0891b2",
          endpoints: [
            {
              id: "setup-payment-get-list",
              method: "POST",
              path: "/App/paymentmethod/get-list",
              title: "Get Payment Method List",
              description: "Returns all configured payment methods with their type, bank details, API keys, assigned location, and status.",
              requestBody: { search: "" },
              response: {
                code: 200,
                data: [
                  {
                    _id: "63f80e9a9140560b1851276c",
                    logo: "https://gis247.s3.us-east-2.amazonaws.com/2022th0038/masters/logo/1677201049.jpg",
                    Paymentmethod_type: "Credit Card",
                    BankPaymenttype: "Cheque",
                    Payment_method_id: "6618d4db0b953c7b4ea2bd52",
                    name: "HSBC",
                    keys: [
                      { label: "Secret Key", value: "sk_test_***" },
                      { label: "Publishable Key", value: "pk_test_***" }
                    ],
                    Locations: "6864eb6c46b97fcef1421d95",
                    Status: "1",
                    updatedAt: "03/02/2026",
                    webhookId: "we_1QY2yfC73fttbSrda98Qeggd",
                    location_name: "STORE",
                    payment_method_name: "Stripe"
                  },
                  {
                    _id: "66cacf0744ba1e1b8ee4a57f",
                    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png",
                    Paymentmethod_type: "Credit Card",
                    Payment_method_id: "66c6e86b84f0af669f3f1c9b",
                    name: "Paypal",
                    keys: [
                      { label: "Client ID", value: "AeJHMorr***" },
                      { label: "Secret Key", value: "EClbIG-***" }
                    ],
                    Locations: "6864eb6c46b97fcef1421d95",
                    Status: "1",
                    updatedAt: "03/02/2026",
                    webhookId: "7M036380V3733303P",
                    location_name: "STORE",
                    payment_method_name: "Paypal-sendbox"
                  }
                ],
                total: 10
              },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "search", type: "string", required: false, description: "Search text; empty string returns all." }
              ]
            },
            {
              id: "setup-payment-get-active",
              method: "POST",
              path: "/App/paymentmethod/get-active",
              title: "Get Active Payment Methods",
              description: "Returns only the active payment gateway providers (Stripe, PayPal, etc.) with their required key parameter labels. Used to populate the gateway picker when creating a new payment method.",
              requestBody: {},
              response: {
                code: 200,
                data: [
                  {
                    _id: "6618d4db0b953c7b4ea2bd52",
                    name: "Stripe",
                    slag: "stripe-payment",
                    defaultId: "6618d4db0b953c7b4ea2bd52",
                    params: ["Secret Key", "Publishable Key"]
                  },
                  {
                    _id: "66c6e86b84f0af669f3f1c9b",
                    name: "Paypal-sendbox",
                    slag: "paypal-payment",
                    defaultId: "66c6e86b84f0af669f3f1c9b",
                    params: ["Client ID", "Secret Key"]
                  }
                ]
              },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" }
              ]
            },
            {
              id: "setup-payment-add",
              method: "POST",
              path: "/App/paymentmethod/add",
              title: "Add Payment Method",
              description: "Creates a new payment method record. `Payment_method_id` must match an active gateway ID from get-active. `keys` array must match the `params` labels of the selected gateway.",
              requestBody: {
                Paymentmethod_type: "Bank",
                BankPaymenttype: "IB",
                Payment_method_id: "66c6e86b84f0af669f3f1c9b",
                name: "Internet Banking",
                keys: [
                  { label: "Client ID", value: "<client_id>" },
                  { label: "Secret Key", value: "<secret_key>" }
                ],
                Locations: "6864eb6c46b97fcef1421d95",
                Status: "0",
                qrCode: ""
              },
              response: { code: 200, message: "Payment method created successfully." },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." },
                { code: 400, message: "Bad Request — missing Payment_method_id, name, or keys." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "Paymentmethod_type", type: "string", required: true, description: "Credit Card | Bank." },
                { name: "BankPaymenttype", type: "string", required: false, description: "e.g. Cheque, IB (Internet Banking). Required when Paymentmethod_type is Bank." },
                { name: "Payment_method_id", type: "string", required: true, description: "Gateway ID from get-active response." },
                { name: "name", type: "string", required: true, description: "Display name for this payment method." },
                { name: "keys", type: "array", required: true, description: "Array of { label, value } objects matching the gateway's params." },
                { name: "Locations", type: "string", required: true, description: "Location ID this payment method belongs to." },
                { name: "Status", type: "string", required: true, description: "'1' = active, '0' = inactive." },
                { name: "qrCode", type: "string", required: false, description: "Optional QR code URL for bank transfer." }
              ]
            }
          ]
        },

        /* ── 5. Tax Rules ─────────────────── */
        {
          id: "setup-tax-rules",
          label: "Tax Rules",
          color: "#7c3aed",
          endpoints: [
            {
              id: "setup-tax-list",
              method: "POST",
              path: "/App/setup/tax-list",
              title: "Get Tax List",
              description: "Returns all tax rules configured for the organisation. Each rule has a name, label, rate (%), type, and status.",
              requestBody: { search: "", limit: 100, skip: 0 },
              response: {
                code: 200,
                data: [
                  { _id: "65647d0c617a431ea83e97b4", name: "Tax 20%", type: "Exclusive", label: "Tax", rate: "20", Status: "1", mixMatch: 0, createdAt: "2023-11-27T11:27:08.085Z", updatedAt: "2023-12-01T01:07:57.000Z" },
                  { _id: "634f694d17ae947408110e41", name: "Tax", label: "Tax", rate: "0", type: "On Total", Status: "1", mixMatch: 0, createdAt: "2022-10-19T03:04:45.000Z", updatedAt: "2022-11-10T15:47:58.000Z" },
                  { _id: "636d1d56bc8a8f3720133d6e", name: "Tax 7% Ex", label: "Tax 7% Exclusive", rate: "7", type: "Exclusive", Status: "1", mixMatch: 0, createdAt: "2022-11-10T15:48:38.000Z", updatedAt: "2023-02-24T01:22:54.000Z" },
                  { _id: "63f811449140560b1851276e", name: "Tax 7% Inc", label: "Tax 7% Inclusive", rate: "7", type: "Inclusive", Status: "1", mixMatch: 0, createdAt: "2023-02-24T01:22:12.000Z", updatedAt: "2023-11-27T03:05:56.000Z" },
                  { _id: "65647dbae2c0ffa31abc62bb", name: "Tax 2%", type: "Exclusive", label: "Tax", rate: "2", is_delete: 0, createdAt: "2023-11-27T11:30:02.124Z", updatedAt: "2024-09-08T02:34:22.742Z" }
                ],
                total: 6
              },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "search", type: "string", required: false, description: "Search text; empty string returns all." },
                { name: "limit", type: "integer", required: false, description: "Max records (default 100)." },
                { name: "skip", type: "integer", required: false, description: "Pagination offset." }
              ]
            },
            {
              id: "setup-add-tax",
              method: "POST",
              path: "/App/setup/add-tax",
              title: "Add Tax",
              description: "Creates a new tax rule. `type` controls calculation method: Exclusive (added on top), Inclusive (included in price), On Total.",
              requestBody: { name: "TAX 2%", label: "TAX", rate: "20", type: "Exclusive" },
              response: { code: 200, data: "69ca4d7573f8a936ee76a7e9", message: "Tax created successfuly." },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." },
                { code: 400, message: "Bad Request — missing required fields (name, label, rate, type)." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "name", type: "string", required: true, description: "Tax rule display name, e.g. TAX 7%." },
                { name: "label", type: "string", required: true, description: "Short label shown on receipts, e.g. TAX." },
                { name: "rate", type: "string", required: true, description: "Tax percentage as a string, e.g. '7'." },
                { name: "type", type: "string", required: true, description: "Exclusive | Inclusive | On Total." }
              ]
            }
          ]
        },

        /* ── 6. E-mail ────────────────────── */
        {
          id: "setup-email",
          label: "E-mail",
          color: "#b45309",
          endpoints: [
            {
              id: "setup-email-get-list",
              method: "POST",
              path: "/App/emailtemplate/get-list",
              title: "Get Email Template List",
              description: "Returns all email templates configured for the organisation — welcome emails, password resets, invoices, birthday wishes, daily sales reports, etc. Each template has a shortcode, subject, sender name/email, and location assignment.",
              requestBody: { search: "", limit: 100, skip: 0 },
              response: {
                code: 200,
                data: [
                  { _id: "6155bca78e53e5cd5dab1061", subject: "[organization_name] : Low Stock", shortcode: "low_stock", from_name: "GIS", from_email: "hello@gis247.net", status: "1", locationName: "STORE", name: "Low Stock", updatedAt: "24/12/2025", default: 1 },
                  { _id: "613f3e346348204dfbc00135", subject: "[organization_name] : Reset your password", shortcode: "forgot_password", from_name: "GIS", from_email: "no-reply@gis247.net", status: "1", locationName: ",", name: "Forgot Password", updatedAt: "19/10/2022", default: 1 },
                  { _id: "6141e57107e565cf2d38f4aa", subject: "Welcome to Team", shortcode: "registration_email", from_name: "GIS", from_email: "no-reply@gis247.net", status: "1", locationName: ",", name: "User Create Email", updatedAt: "19/10/2022", default: 1 },
                  { _id: "6154309649cb6ad6e83cd797", subject: "[organization_name]: Purchase Complete!", shortcode: "pos_purchase_complete_invoice", from_name: "GIS", from_email: "no-reply@gis247.net", status: 1, locationName: ",,", name: "POS Invoice", updatedAt: "19/10/2022", default: 1 },
                  { _id: "61447758bdc78df602c916cf", subject: "Registration Success! Welcome!", shortcode: "customer_registration", from_name: "GIS", from_email: "no-reply@gis247.net", status: "1", locationName: ",", name: "Customer Registration", updatedAt: "19/10/2022", default: 1 },
                  { _id: "615595648e53e5cd5dab1059", subject: "[organization_name] : Happy Birthday!", shortcode: "birthday_wish", from_name: "GIS", from_email: "no-reply@gis247.net", status: "1", locationName: ",", name: "Birthday Wishes", updatedAt: "19/10/2022", default: 1 },
                  { _id: "6155a1808e53e5cd5dab105f", subject: "[organization_name] : Daily Sales Report - [location_name]", shortcode: "daily_sales_report", from_name: "GIS", from_email: "no-reply@gis247.net", status: "1", locationName: "", name: "Daily Sales Report", updatedAt: "26/09/2024", default: 1 },
                  { _id: "615ef2f04dbb588caba0976d", subject: "[organization_name] : Cash Register", shortcode: "cash_register", from_name: "GIS", from_email: "hello@gis247.net", status: 1, locationName: ",,,,,STORE", name: "Cash Register", updatedAt: "24/12/2025", default: 1 },
                  { _id: "655c701ae8e52094ac70d6aa", subject: "[organization_name] : OTP Mail", shortcode: "otp_varification", from_name: "GIS", from_email: "no-reply@gis247.net", status: "1", locationName: ",," , updatedAt: "15/09/2021", default: 1 }
                ],
                total: 13
              },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "search", type: "string", required: false, description: "Search text; empty string returns all." },
                { name: "limit", type: "integer", required: false, description: "Max records (default 100)." },
                { name: "skip", type: "integer", required: false, description: "Pagination offset." }
              ]
            }
          ]
        },

        /* ── 7–9. Remaining (APIs to be added) ─ */
        /* ── 7. Application Key's ────────── */
        {
          id: "setup-application-keys",
          label: "Application Key's",
          color: "#0369a1",
          endpoints: [
            {
              id: "setup-appkey-get-list",
              method: "POST",
              path: "/App/applicationkey/get-list",
              title: "Get Application Key List",
              description: "Returns all application keys (client_id / client_secret pairs) created for the organisation. Used for ERP integrations and third-party API access.",
              requestBody: { search: "", limit: 100, skip: 0 },
              response: {
                code: 200,
                data: [
                  { _id: "65648d705a8be7fda886e408", name: "RAM6", client_id: "RAM6-ece841a582344517a8f4", client_secret: "cccdb085abf3eed1fba919ace45cfe83", updatedAt: "27/11/2023" },
                  { _id: "65646f78e31bc379c3036d1a", name: "RAM", client_id: "eee61253f54a7382", client_secret: "a104fe7318d4d9f5ad38d5543c6d7665", updatedAt: "27/11/2023" },
                  { _id: "655b2dc88ad6f914fa5a2a78", name: "ERP", client_id: "erp-634f694d17ae947408110e43", client_secret: "9a18b4dda53b7f5892fdb52c64399390e44a12e44e9be8354d7adb819a7e4364", updatedAt: "20/11/2023" },
                  { _id: "65648de6f82caa94cf21f004", name: "test", client_id: "test-381ef3075a409d171842", client_secret: "0a9eae31cd9b0035b29f755b6c761fbc", updatedAt: "27/11/2023" }
                ],
                total: 6
              },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "search", type: "string", required: false, description: "Search text; empty string returns all." },
                { name: "limit", type: "integer", required: false, description: "Max records (default 100)." },
                { name: "skip", type: "integer", required: false, description: "Pagination offset." }
              ]
            },
            {
              id: "setup-appkey-add",
              method: "POST",
              path: "/App/applicationkey/add",
              title: "Add Application Key",
              description: "Creates a new application key. The system auto-generates `client_id` and `client_secret` — only `name` and `status` are required in the request.",
              requestBody: { name: "ERP1", status: "1" },
              response: { code: 200, data: "69ca4f8d0e708879d3c8f7e2", message: "ApplicationKey created successfuly." },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." },
                { code: 400, message: "Bad Request — name is required." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "name", type: "string", required: true, description: "Display name for the application key (e.g. ERP, Mobile)." },
                { name: "status", type: "string", required: true, description: "'1' = active, '0' = inactive." }
              ]
            },
            {
              id: "setup-appkey-edit",
              method: "POST",
              path: "/App/applicationkey/edit",
              title: "Edit Application Key",
              description: "Updates an existing application key. Pass `_id`, `client_id`, and `client_secret` from the get-list response along with any updated fields.",
              requestBody: {
                _id: "65648d705a8be7fda886e408",
                name: "RAM6H",
                client_id: "RAM6-ece841a582344517a8f4",
                client_secret: "cccdb085abf3eed1fba919ace45cfe83",
                status: "1"
              },
              response: { code: 200, message: "ApplicationKey updated successfully." },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." },
                { code: 404, message: "Not Found — no application key matches the provided _id." },
                { code: 400, message: "Bad Request — missing _id or name." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "_id", type: "string", required: true, description: "Document ID from get-list response." },
                { name: "name", type: "string", required: true, description: "Updated display name." },
                { name: "client_id", type: "string", required: true, description: "Client ID (as returned from get-list — do not modify)." },
                { name: "client_secret", type: "string", required: true, description: "Client secret (as returned from get-list)." },
                { name: "status", type: "string", required: true, description: "'1' = active, '0' = inactive." }
              ]
            }
          ]
        },

        /* ── 8. Domains ───────────────────── */
        {
          id: "setup-domains",
          label: "Domains",
          color: "#065f46",
          endpoints: [
            {
              id: "setup-domain-get-list",
              method: "POST",
              path: "/App/domain/get-list",
              title: "Get Domain List",
              description: "Returns all domains registered for the organisation. `type` and `DomanType` indicate domain category. `is_varified` flag shows verification status.",
              requestBody: { search: "" },
              response: {
                code: 200,
                data: [
                  {
                    _id: "67a464005cd3d073201160e5",
                    name: "gispos.local",
                    org_id: "67eba015592f7b47cd9e184e",
                    type: 1,
                    DomanType: 1,
                    is_varified: 1,
                    is_delete: 0,
                    primary: "gispos.local",
                    createdAt: "2024-02-26T13:31:24.673Z",
                    updatedAt: "2024-06-20T05:03:44.233Z"
                  }
                ]
              },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "search", type: "string", required: false, description: "Search text; empty string returns all." }
              ]
            }
          ]
        },
        {
          id: "setup-barcode",
          label: "Barcode",
          color: "#64748b",
          childGroups: [
            /* ── Barcode Template ── */
            {
              id: "barcode-template",
              label: "Barcode Template",
              endpoints: [
                {
                  id: "barcode-template-list",
                  method: "POST",
                  path: "/template-printout/list",
                  title: "List Barcode Templates",
                  description: "Returns all barcode printout templates for the given template type.",
                  requestBody: {
                    template_type: "barcode_printout_template"
                  },
                  response: {
                    status: 200,
                    data: [
                      {
                        _id: "66fd5ba44d992d6a6efab565",
                        profile_name: "Template Barcode 01 SG",
                        template_type: "barcode_printout_template",
                        current_template_layout_selected: {
                          label: "Template-01-Barcode",
                          value: "template_1"
                        },
                        config_check_list: ["barcode", "item_size", "metal", "stone_name"]
                      }
                    ]
                  },
                  params: [
                    { name: "template_type", type: "string", required: true, description: "Template type identifier, e.g. `barcode_printout_template`" }
                  ]
                },
                {
                  id: "barcode-inventory-lower-statics",
                  method: "POST",
                  path: "/Inventory/my/inventory-lowerStatics",
                  title: "Inventory Lower Statistics",
                  description: "Returns inventory statistics (count, value) filtered by item, metal, stone, location, and other criteria. Used to display summary stats in the barcode print page.",
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
                    limit: 100
                  },
                  response: {
                    code: 200,
                    data: {
                      totalItems: 245,
                      totalWeight: 1250.5,
                      totalValue: 520000
                    }
                  },
                  params: [
                    { name: "item", type: "array", required: false, description: "Filter by item IDs" },
                    { name: "collection", type: "array", required: false, description: "Filter by collection IDs" },
                    { name: "metal", type: "array", required: false, description: "Filter by metal IDs" },
                    { name: "size", type: "array", required: false, description: "Filter by size IDs" },
                    { name: "stone", type: "array", required: false, description: "Filter by stone IDs" },
                    { name: "productStatus", type: "array", required: false, description: "Filter by product status" },
                    { name: "location", type: "array", required: false, description: "Filter by location IDs" },
                    { name: "price", type: "array", required: false, description: "Filter by price range" },
                    { name: "search", type: "string", required: false, description: "Search keyword" },
                    { name: "limit", type: "number", required: false, description: "Max records to return (default 100)" }
                  ]
                },
                {
                  id: "barcode-graphql-metals",
                  method: "GRAPHQL",
                  path: "/App/graphql",
                  title: "Get Metals (GraphQL)",
                  description: "Fetches all metals with their id, name, and color. Used to populate the metal filter dropdown in the barcode print page.",
                  requestBody: {
                    query: "{\n  metals {\n    id\n    name\n    color\n  }\n}",
                    variables: {}
                  },
                  response: {
                    data: {
                      metals: [
                        { id: "5f2a1c3b4e8d7f0012345601", name: "Gold", color: "#FFD700" },
                        { id: "5f2a1c3b4e8d7f0012345602", name: "Silver", color: "#C0C0C0" },
                        { id: "5f2a1c3b4e8d7f0012345603", name: "Rose Gold", color: "#B76E79" },
                        { id: "5f2a1c3b4e8d7f0012345604", name: "Platinum", color: "#E5E4E2" }
                      ]
                    }
                  },
                  params: []
                },
                {
                  id: "barcode-inventory-list-search",
                  method: "POST",
                  path: "/Inventory/my/list/search",
                  title: "Search Inventory List",
                  description: "Searches the inventory list with optional filters for item, metal, stone, location, price, and keyword. Returns matching inventory items for barcode printing.",
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
                    skip: 0
                  },
                  response: {
                    code: 200,
                    data: [],
                    total: 0
                  },
                  params: [
                    { name: "item", type: "array", required: false, description: "Filter by item IDs" },
                    { name: "collection", type: "array", required: false, description: "Filter by collection IDs" },
                    { name: "metal", type: "array", required: false, description: "Filter by metal IDs" },
                    { name: "size", type: "array", required: false, description: "Filter by size IDs" },
                    { name: "stone", type: "array", required: false, description: "Filter by stone IDs" },
                    { name: "productStatus", type: "array", required: false, description: "Filter by product status" },
                    { name: "location", type: "array", required: false, description: "Filter by location IDs" },
                    { name: "price", type: "array", required: false, description: "Filter by price range" },
                    { name: "search", type: "string", required: false, description: "Search keyword" },
                    { name: "limit", type: "number", required: false, description: "Max records to return" },
                    { name: "skip", type: "number", required: false, description: "Records to skip for pagination" }
                  ]
                },
                {
                  id: "barcode-template-get-by-id",
                  method: "POST",
                  path: "/template-printout/getByid",
                  title: "Get Barcode Template by ID",
                  description: "Fetches the full configuration of a specific barcode template including layout, profile setup, and config check list.",
                  requestBody: {
                    _id: "66fd5ba44d992d6a6efab565"
                  },
                  response: {
                    status: 200,
                    data: {
                      _id: "66fd5ba44d992d6a6efab565",
                      config_check_list: ["barcode", "item_size", "metal", "stone_name"],
                      current_template_layout_selected: {
                        label: "Template-01-Barcode",
                        value: "template_1"
                      },
                      custom_template_config_info: false,
                      profile_setup_info: {
                        barcode: true,
                        barcode_display: "stock_id",
                        qr: false,
                        qr_type_display: "offline",
                        qr_url_display: "",
                        qr_url_depend_location: false,
                        item: false,
                        item_size: true,
                        metal: true,
                        weight: false,
                        weight_display: "",
                        stone_group: false,
                        stone_name: true,
                        stone_size: false,
                        shape: false,
                        cut: false,
                        color: false,
                        clarity: false,
                        stone_pcs: false,
                        stone_weight: false,
                        price: false,
                        price_display: "with_currency",
                        text: false,
                        text_message: ""
                      },
                      config_check_info: {
                        qr_url_display: "",
                        qr_type_display: "offline",
                        qr_url_depend_location: false,
                        text_message: "",
                        barcode_display: "stock_id",
                        price_display: "with_currency",
                        profile_name: "Template Barcode 01 SG",
                        weight_display: ""
                      }
                    }
                  },
                  params: [
                    { name: "_id", type: "string", required: true, description: "Template document ID" }
                  ]
                },
                {
                  id: "barcode-template-update",
                  method: "POST",
                  path: "/template-printout/update",
                  title: "Update Barcode Template",
                  description: "Updates an existing barcode template configuration including profile setup, layout selection, and display settings.",
                  requestBody: {
                    _id: "66fd5ba44d992d6a6efab565",
                    barcode_display: "stock_id",
                    profile_name: "Template Barcode 01 SG",
                    weight_display: "",
                    price_display: "with_currency",
                    qr_type_display: "offline",
                    qr_url_display: "",
                    qr_url_depend_location: false,
                    text_message: "",
                    profile_setup_info: {
                      barcode: true,
                      item: true,
                      item_size: true,
                      metal: true,
                      weight: false,
                      stone_group: true,
                      stone_name: false,
                      shape: false,
                      cut: false,
                      color: false,
                      clarity: false,
                      stone_size: false,
                      stone_pcs: false,
                      stone_weight: false,
                      price: false,
                      text: false
                    },
                    template_type: "barcode_printout_template",
                    template_layout: "template_1"
                  },
                  response: {
                    status: 200,
                    message: "Template updated successfully"
                  },
                  params: [
                    { name: "_id", type: "string", required: true, description: "Template document ID" },
                    { name: "profile_name", type: "string", required: true, description: "Display name for the template" },
                    { name: "template_type", type: "string", required: true, description: "Template type, e.g. `barcode_printout_template`" },
                    { name: "template_layout", type: "string", required: true, description: "Layout key, e.g. `template_1`" },
                    { name: "barcode_display", type: "string", required: false, description: "`stock_id` or `sku`" },
                    { name: "profile_setup_info", type: "object", required: true, description: "Boolean flags for each label field to show/hide" }
                  ]
                }
              ]
            },
            /* ── Log ── */
            {
              id: "barcode-log",
              label: "Log",
              endpoints: [
                {
                  id: "barcode-get-organisation-settings",
                  method: "POST",
                  path: "/Inventory/common/getOrganisationSettings",
                  title: "Get Organisation Settings",
                  description: "Retrieves the current organisation-level settings from the Inventory service. Used in the Barcode Log page to show store configuration.",
                  requestBody: {},
                  response: {
                    code: 200,
                    data: {
                      _id: "67eba015592f7b47cd9e184e",
                      organisation_name: "Demo Jewelry Bangkok",
                      timezone: "Asia/Bangkok",
                      date_format: "DD/MM/YYYY",
                      price_format: {
                        currency: "ANG",
                        show_amount_in: "Million",
                        decimal_point: "2",
                        thousand_separator: "."
                      },
                      image_type: "JPG",
                      store_name: "demo3",
                      upload_folder: "2022th0038"
                    }
                  },
                  params: []
                }
              ]
            },
            /* ── Summary ── */
            {
              id: "barcode-summary",
              label: "Summary",
              endpoints: [
                {
                  id: "barcode-summary-appkey-list",
                  method: "POST",
                  path: "/App/applicationkey/get-list",
                  title: "Get Application Keys (Paginated)",
                  description: "Returns application keys with pagination. In the Barcode Summary page this is called with `skip: 200` to fetch the next page of API keys.",
                  requestBody: {
                    search: "",
                    limit: 100,
                    skip: 200
                  },
                  response: {
                    code: 200,
                    data: [],
                    total: 6
                  },
                  params: [
                    { name: "search", type: "string", required: false, description: "Filter by key name" },
                    { name: "limit", type: "number", required: false, description: "Number of records per page (default 100)" },
                    { name: "skip", type: "number", required: false, description: "Number of records to skip for pagination (e.g. 200 for page 3)" }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: "setup-warranty",
          label: "Warranty",
          color: "#0d9488",
          endpoints: warrantyEndpoints
        }
      ]
    };
