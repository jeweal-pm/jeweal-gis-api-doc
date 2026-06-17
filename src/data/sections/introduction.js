/** Reference guide — GIS workflow & API overview. Rendered by IntroductionGuide. */
export default {
  id: "introduction",
  label: "Introduction",
  icon: "📖",
  color: "#2563eb",
  guide: true,
  description:
    "Overview of the GIS REST API — how modules connect, recommended integration order, and where to find each business workflow in the docs.",
  guideData: {
    overview: [
      "The GIS API is a REST JSON platform for jewelry retail — store setup, master data, inventory, point of sale, customers, analytics, and admin configuration. All routes live under a single base URL and are grouped in this reference by the same modules you see in the GIS application.",
      "Most operations use POST with a JSON body. Authenticated calls require a JWT in the authorization header. POS terminal flows also require Pos-Authorization from generatePOSAuthToken after the cashier selects voucher, currency, and location.",
      "Use the sidebar to browse endpoints by module. Each POS subsection follows the order of the GIS POS home screen. Copy cURL samples from any endpoint page to test against your environment.",
    ],
    startHere: [
      {
        step: 1,
        title: "Authenticate",
        body: "Verify the store domain, then log in with store-login to obtain a JWT. For POS, call generatePOSAuthToken before any /POS/* route.",
        links: [
          { label: "Auth — Check Store", target: { sectionId: "auth", subsectionId: "auth-web", endpointId: "check-store" } },
          { label: "Auth — Store Login", target: { sectionId: "auth", subsectionId: "auth-web", endpointId: "store-login" } },
          { label: "Generate POS Auth Token", target: { sectionId: "auth", subsectionId: "auth-web", endpointId: "generate-pos-token" } },
        ],
      },
      {
        step: 2,
        title: "Configure your store",
        body: "Complete organisation, location, users, payment methods, tax rules, and general settings before day-to-day operations.",
        links: [
          { label: "Setup module", target: { sectionId: "setup" } },
          { label: "Organization", target: { sectionId: "organization" } },
          { label: "Location", target: { sectionId: "location" } },
          { label: "User", target: { sectionId: "user" } },
        ],
      },
      {
        step: 3,
        title: "Create master & product data",
        body: "Define items, metals, stones, vendors, voucher types, exchange rates, and product catalog records used across inventory and POS.",
        links: [
          { label: "Master module", target: { sectionId: "master" } },
          { label: "Product module", target: { sectionId: "product" } },
          { label: "GraphQL lookups", target: { sectionId: "graphql" } },
        ],
      },
      {
        step: 4,
        title: "Manage inventory",
        body: "Purchase, transfer, receive stock, run stock take, view reports, and track reservations and SKU movements.",
        links: [
          { label: "Inventory module", target: { sectionId: "inventory" } },
        ],
      },
      {
        step: 5,
        title: "Run POS operations",
        body: "Open the cash register, sell from catalog or inventory, park bills, and handle custom orders, repairs, exchanges, refunds, and reserves.",
        links: [
          { label: "Point of Sale module", target: { sectionId: "pos" } },
          { label: "POS Dashboard", target: { sectionId: "pos", subsectionId: "pos-dashboard" } },
          { label: "Customer module", target: { sectionId: "customer" } },
        ],
      },
      {
        step: 6,
        title: "Handle errors & reporting",
        body: "Inspect HTTP status codes and error types when a call fails. Use Analytics and Dashboard modules for sales and inventory reports.",
        links: [
          { label: "Errors reference", target: { sectionId: "errors" } },
          { label: "Analytics", target: { sectionId: "analytics" } },
          { label: "Dashboard", target: { sectionId: "dashboard" } },
        ],
      },
    ],
    authentication: {
      intro:
        "Send your session JWT in the authorization header on every protected route. POS routes additionally require Pos-Authorization. Never expose tokens in client-side code or public repositories.",
      headers: [
        { name: "authorization", description: "Admin JWT from Auth store-login.", target: { sectionId: "auth", subsectionId: "auth-web", endpointId: "store-login" } },
        { name: "Pos-Authorization", description: "POS session JWT from generatePOSAuthToken.", target: { sectionId: "auth", subsectionId: "auth-web", endpointId: "generate-pos-token" } },
        { name: "Content-Type", description: "application/json for POST bodies." },
      ],
    },
    workflows: [
      {
        id: "getting-setup",
        title: "Getting Setup",
        icon: "⚙️",
        color: "#0d9488",
        description: "First-time store configuration — authenticate, then set language, currency, payments, organisation, locations, tax, and email.",
        guide: [
          {
            title: "Login to your account",
            body: "Every integration starts with your store domain (example: demo3.gis247.net for Demo Jewelry Bangkok). Call check-store to confirm the domain — the response org_name is Demo Jewelry Bangkok. Then store-login with store name, email, and password. The authToken in the response is your admin JWT — send it as the authorization header on all protected routes. PIN login and password reset use the same Auth module.",
            links: [
              { label: "Check Store", target: { sectionId: "auth", subsectionId: "auth-web", endpointId: "check-store" } },
              { label: "Store Login", target: { sectionId: "auth", subsectionId: "auth-web", endpointId: "store-login" } },
            ],
          },
          {
            title: "Set default language",
            body: "Regional preferences (language, date format, and other general options) live in Setup → General. List current values first, then update the record with setup-general-update. Do this early so receipts, emails, and UI-facing strings match your market.",
            links: [
              { label: "General settings", target: { sectionId: "setup", subsectionId: "setup-general", endpointId: "setup-general-list" } },
            ],
          },
          {
            title: "Set default currency",
            body: "Organisation currencies define which symbols and exchange rates appear in POS and reports. Use getAll_Currency to read configured currencies, then currencyMasterEdit to add or update a currency and mark the default. Exchange rates for multi-currency sales are managed in the Currency master.",
            links: [
              { label: "Get all currencies", target: { sectionId: "organization", subsectionId: "org-profile-currency", endpointId: "get-all-currency" } },
              { label: "Currency master", target: { sectionId: "master", subsectionId: "currency-master", endpointId: "currency-master-edit" } },
            ],
          },
          {
            title: "Activate payment gateway",
            body: "Payment gateways (Stripe, PayPal, etc.) are configured in Setup → Payment Method. List active gateway types, then add your merchant credentials with setup-payment-add. Each store location can enable the methods it accepts.",
            links: [
              { label: "Active gateways", target: { sectionId: "setup", subsectionId: "setup-payment-method", endpointId: "setup-payment-get-active" } },
              { label: "Add payment method", target: { sectionId: "setup", subsectionId: "setup-payment-method", endpointId: "setup-payment-add" } },
            ],
          },
          {
            title: "Set SMTP email",
            body: "Transactional emails (invoices, password reset, low-stock alerts) use templates in Setup → E-mail. Each template has from_name, from_email, and subject with shortcodes like [organization_name]. Configure SMTP so outbound mail delivers from your domain.",
            links: [
              { label: "Email templates", target: { sectionId: "setup", subsectionId: "setup-email", endpointId: "setup-email-get-list" } },
            ],
          },
          {
            title: "Edit organisation",
            body: "Organisation profile holds your legal name, timezone, default currency, and branding. viewOrg returns the current record; update endpoints in the Organization module change what appears on documents and in the admin header.",
            links: [
              { label: "View organisation", target: { sectionId: "organization", subsectionId: "org-profile-currency", endpointId: "organisation-view-org" } },
              { label: "Timezone list", target: { sectionId: "organization", subsectionId: "org-timezone", endpointId: "location-timezone-list" } },
            ],
          },
          {
            title: "Location",
            body: "Stores and warehouses are locations — each has a type (Store, Warehouse, eCommerce), address, and tax linkage. Create locations before inventory transfers or POS sessions, because voucher types and stock movements are location-scoped.",
            links: [
              { label: "Create location", target: { sectionId: "location", subsectionId: "location-crud", endpointId: "location-create" } },
              { label: "List locations", target: { sectionId: "location", subsectionId: "location-list-filter", endpointId: "location-list" } },
            ],
          },
          {
            title: "Set payment method (store)",
            body: "Beyond gateway credentials, each location enables which payment types cashiers see at checkout. The same Payment Method APIs link gateway config to store-level acceptance rules.",
            links: [
              { label: "Payment methods", target: { sectionId: "setup", subsectionId: "setup-payment-method" } },
            ],
          },
          {
            title: "Set tax rules",
            body: "Tax rules define rate, label, and whether tax is inclusive or exclusive on line items. Create rules before products and POS orders so calculations stay consistent. List existing rules, then add new ones with name, rate, and type.",
            links: [
              { label: "Tax list", target: { sectionId: "setup", subsectionId: "setup-tax-rules", endpointId: "setup-tax-list" } },
              { label: "Add tax rule", target: { sectionId: "setup", subsectionId: "setup-tax-rules", endpointId: "setup-add-tax" } },
            ],
          },
          {
            title: "Set voucher type",
            body: "Voucher types control document numbering for purchases, sales, transfers, and other transactions. Each type has a code, group (Sale, Purchase_Order, etc.), and prefix/start-number configuration used when generating PO, invoice, and stock documents.",
            links: [
              { label: "Voucher types", target: { sectionId: "master", subsectionId: "voucher-type", endpointId: "voucher-master-list" } },
              { label: "Create voucher type", target: { sectionId: "master", subsectionId: "voucher-type", endpointId: "voucher-master-edit" } },
            ],
          },
        ],
      },
      {
        id: "create-master",
        title: "How to Create Master",
        icon: "👑",
        color: "#8b5cf6",
        description: "Foundation data before products and inventory — item types, sizes, metals, stones, vendors, and catalogue records.",
        guide: [
          {
            title: "Create item master",
            body: "Item master defines product categories in your store — Ring, Earring, Necklace, Bracelet, and so on. Each record needs a name, short code, and optional image. Set Status to active and mixMatch when the item supports mixed metal/stone combinations. Use type \"Item\" on the itemMasterEdit endpoint.",
            links: [
              { label: "Create / edit item", target: { sectionId: "master", subsectionId: "item-master", endpointId: "im-item-edit" } },
              { label: "List items", target: { sectionId: "master", subsectionId: "item-master", endpointId: "im-item-view" } },
            ],
          },
          {
            title: "Create size master",
            body: "Sizes belong to one or more item types — e.g. ring sizes 48–54 or chain lengths. Send name, code, and the item IDs this size applies to. Create item master first so sizes can be linked correctly.",
            links: [
              { label: "Create / edit size", target: { sectionId: "master", subsectionId: "item-master", endpointId: "im-size-edit" } },
            ],
          },
          {
            title: "Create collection master (optional)",
            body: "Collections group products for merchandising — e.g. \"Valentine Collection 2024\" with code VT2024. Optional but useful for reports and catalogue filters. Same itemMasterEdit pattern with type \"Collection\".",
            links: [
              { label: "Create / edit collection", target: { sectionId: "master", subsectionId: "item-master", endpointId: "im-collection-edit" } },
            ],
          },
          {
            title: "Create style master (optional)",
            body: "Styles describe design themes — Minimal, Classic, Vintage — as name + code pairs. Used when building product attributes and filters. Type \"Style\" on itemMasterEdit.",
            links: [
              { label: "Create / edit style", target: { sectionId: "master", subsectionId: "item-master", endpointId: "im-style-edit" } },
            ],
          },
          {
            title: "eCommerce category (for POS)",
            body: "Categories like Best Seller or New Arrival control how products appear on the POS home screen. Create the category with name, group, and description, then assign products to it from the Product module when saving SKU records.",
            links: [
              { label: "Create / edit category", target: { sectionId: "master", subsectionId: "item-master", endpointId: "im-ecom-edit" } },
              { label: "Product module", target: { sectionId: "product" } },
            ],
          },
          {
            title: "Create metal color",
            body: "Metal colors (Yellow Gold, White Gold, Rose Gold, Platinum) are created before metals. Each color is a name + code with an optional color hex. Create colors first — metals reference them via ColorData.",
            links: [
              { label: "Metal master", target: { sectionId: "master", subsectionId: "metal-master", endpointId: "metal-master-edit" } },
            ],
          },
          {
            title: "Create metal",
            body: "A metal record ties a name and code (e.g. WG9K) to a metal color. Metals drive pricing, weight calculations, and barcode labels across inventory and POS.",
            links: [
              { label: "Create / edit metal", target: { sectionId: "master", subsectionId: "metal-master", endpointId: "metal-master-edit" } },
              { label: "List metals", target: { sectionId: "master", subsectionId: "metal-master", endpointId: "metal-master-view" } },
            ],
          },
          {
            title: "Create stone group",
            body: "Stone groups classify stones for pricing and inventory — e.g. Diamond, Gemstone, Pearl. Create the group with name and code before individual stone attributes (shape, size, cut, clarity).",
            links: [
              { label: "Stone master", target: { sectionId: "master", subsectionId: "stone-master", endpointId: "stone-master-create" } },
            ],
          },
          {
            title: "Create stone attributes",
            body: "Stone master covers the full attribute set: Stone, Color, Shape, Size, Cut, Clarity, and Setting Type. Each uses stone-master-create or stone-master-edit with the matching type field. Shapes can link to shape types; sizes can link to multiple shapes.",
            links: [
              { label: "Create stone record", target: { sectionId: "master", subsectionId: "stone-master", endpointId: "stone-master-create" } },
              { label: "List stone masters", target: { sectionId: "master", subsectionId: "stone-master", endpointId: "stone-master-list" } },
            ],
          },
          {
            title: "Create service labour",
            body: "Service labour entries are billable work items — resizing, engraving, VIP service — with name, code, and price. Used on repair orders and custom POS lines.",
            links: [
              { label: "Create service", target: { sectionId: "master", subsectionId: "service-labour", endpointId: "service-labour-create" } },
            ],
          },
          {
            title: "Set exchange rate",
            body: "When you sell in multiple currencies, exchange rates convert between your base currency and foreign amounts. Update rates in the Currency master alongside organisation currency settings.",
            links: [
              { label: "Currency master", target: { sectionId: "master", subsectionId: "currency-master" } },
            ],
          },
          {
            title: "Create product master",
            body: "Product master is where SKUs are built — combining item, collection, metal, stone, size, and images into sellable products. Complete item, metal, and stone masters first so dropdowns and validations resolve correctly.",
            links: [
              { label: "Product module", target: { sectionId: "product" } },
              { label: "GraphQL lookups", target: { sectionId: "graphql" } },
            ],
          },
          {
            title: "Create vendor & sales person",
            body: "Vendors supply purchase and consignment stock; sales persons attach to POS orders for commission tracking. Vendor uses vendor-edit; sales persons are available via GraphQL lookups for dropdowns.",
            links: [
              { label: "Vendor", target: { sectionId: "master", subsectionId: "vendor-master", endpointId: "vendor-edit" } },
              { label: "Sales persons", target: { sectionId: "graphql", subsectionId: "graphql-app-common", endpointId: "gql-get-salespersons" } },
            ],
          },
        ],
      },
      {
        id: "use-inventory",
        title: "How to Use Inventory",
        icon: "📦",
        color: "#0891b2",
        description: "Stock in and out — purchases, transfers, receiving, reports, reservations, zones, and stock take.",
        guide: [
          {
            title: "View inventory reports",
            body: "The Report module returns tabular data for Reserve, Purchase Order, Purchase, Stock Transfer, Stock Receive, Stock Take, Low Stock Planning, and Vendor. Pass start_date and end_date to scope the period, and search to filter by product name, stock ID, SKU, customer, or barcode. Reserve reports show qty, SKU, customer, and location totals at the top.",
            links: [
              { label: "Reserve report", target: { sectionId: "inventory", subsectionId: "inventory-reports", endpointId: "inv-report-reserve" } },
              { label: "All reports", target: { sectionId: "inventory", subsectionId: "inventory-reports" } },
            ],
          },
          {
            title: "View inventory summary",
            body: "getSummery returns a high-level snapshot — total items, weight, value, and counts by status (available, reserved, sold). Use this for dashboard widgets before drilling into line-level stock.",
            links: [
              { label: "Inventory summary", target: { sectionId: "inventory", subsectionId: "inventory-summary", endpointId: "inventory-get-summary" } },
            ],
          },
          {
            title: "Create reserve",
            body: "Reserved items are stock IDs held for a customer with a delivery date. Find the customer with customer/find, then submit createReserve with voucher, salesperson, dates, and reserve lines (stock_id, reserve_qty, po_product_id, remark). Load barcode printout templates after creation if labels are needed.",
            links: [
              { label: "Find customer", target: { sectionId: "inventory", subsectionId: "inventory-reserve", endpointId: "reserve-find-customer" } },
              { label: "Create reserve", target: { sectionId: "inventory", subsectionId: "inventory-reserve", endpointId: "reserve-create" } },
              { label: "Barcode templates", target: { sectionId: "inventory", subsectionId: "inventory-reserve", endpointId: "reserve-template-printout-list" } },
              { label: "Reserve report", target: { sectionId: "inventory", subsectionId: "inventory-reports", endpointId: "inv-report-reserve" } },
            ],
          },
          {
            title: "SKU & stock ID movement reports",
            body: "Product Movements tracks how individual SKUs and stock IDs move through transactions over time — sales, transfers, purchases, and adjustments. Use the SKU group for catalogue-level history and the Stock ID group for a single physical piece.",
            links: [
              { label: "SKU movement", target: { sectionId: "inventory", subsectionId: "inventory-product-movements", nestedGroupId: "product-movement-sku" } },
              { label: "Stock ID movement", target: { sectionId: "inventory", subsectionId: "inventory-product-movements", nestedGroupId: "product-movement-stock-id" } },
            ],
          },
          {
            title: "Search items & diamonds",
            body: "Item search finds stock by keyword across locations — returns stock ID, SKU, name, location, and status. Diamond Search adds gem-specific filters (shape, carat, color, clarity) for loose stone inventory.",
            links: [
              { label: "Item search", target: { sectionId: "inventory", subsectionId: "inventory-item-search", endpointId: "item-search-data" } },
              { label: "Diamond search", target: { sectionId: "inventory", subsectionId: "diamond-search", endpointId: "diamond-get-list" } },
            ],
          },
          {
            title: "Create purchase (PU)",
            body: "A purchase records stock arriving from a supplier. Send voucher_id, location_id, supplier_id, transaction and delivery dates, plus purchase_data lines with stock_id, quantity, price, stones, and PriceDetails. Start from pu-get-outstanding-list when converting an open PO, then pu-get-create-purchase-list and pu-create. Use pu-check-bulk-stock-id to validate stock IDs before submit.",
            links: [
              { label: "Create PU", target: { sectionId: "inventory", subsectionId: "purchase", endpointId: "pu-create" } },
              { label: "PU outstanding", target: { sectionId: "inventory", subsectionId: "purchase", endpointId: "pu-get-outstanding-list" } },
              { label: "Bulk stock ID check", target: { sectionId: "inventory", subsectionId: "purchase", endpointId: "pu-check-bulk-stock-id" } },
            ],
          },
          {
            title: "Create stock transfer",
            body: "Stock transfers move physical items between locations — from a store to a warehouse or another branch. List available inventory with stocktransfer-inventory-list, then stocktransfer-create with transfer_from, transfer_to_location, and the stock IDs being shipped. Update status to Transit when dispatched.",
            links: [
              { label: "Inventory for transfer", target: { sectionId: "inventory", subsectionId: "stock-transfer", endpointId: "stocktransfer-inventory-list" } },
              { label: "Create transfer", target: { sectionId: "inventory", subsectionId: "stock-transfer", endpointId: "stocktransfer-create" } },
              { label: "Update transfer status", target: { sectionId: "inventory", subsectionId: "stock-transfer", endpointId: "stocktransfer-edit-status" } },
            ],
          },
          {
            title: "Create stock receive",
            body: "When the receiving location gets the shipment, update the transfer status to Received via stockreceive-edit-status. Once marked Received the status cannot be changed back — plan your integration to treat this as a final state. List inbound transfers with stockreceive-list filtered by status.",
            links: [
              { label: "Stock receive list", target: { sectionId: "inventory", subsectionId: "stock-receive", endpointId: "stockreceive-list" } },
              { label: "Mark as received", target: { sectionId: "inventory", subsectionId: "stock-receive", endpointId: "stockreceive-edit-status" } },
            ],
          },
          {
            title: "Create by POS order & allocation",
            body: "Stock can be allocated to open orders via allocationList, or raised from low-stock suggestions through getReplenishList before createPO.",
            links: [
              { label: "Allocation list", target: { sectionId: "inventory", subsectionId: "purchase-order", endpointId: "po-allocation-list" } },
              { label: "Replenish list", target: { sectionId: "inventory", subsectionId: "purchase-order", endpointId: "po-get-replenish-list" } },
            ],
          },
          {
            title: "Update transaction status",
            body: "Purchase orders, purchases, and stock transfers move through workflow states — pending, approved, transit, received, cancelled. Use po-edit-status, pu-edit-status, and stocktransfer-edit-status to advance or cancel documents. po-transaction-totals returns dashboard counts for each pipeline.",
            links: [
              { label: "Transaction totals", target: { sectionId: "inventory", subsectionId: "purchase-order", endpointId: "po-transaction-totals" } },
              { label: "Edit PU status", target: { sectionId: "inventory", subsectionId: "purchase", endpointId: "pu-edit-status" } },
              { label: "Edit PO status", target: { sectionId: "inventory", subsectionId: "purchase-order", endpointId: "po-edit-status" } },
            ],
          },
          {
            title: "Stock take",
            body: "Stock take reconciles physical counts against system quantities at a location. List active stock take sessions, then submit counted quantities per stock ID. Discrepancies update inventory balances when the session is approved.",
            links: [
              { label: "Stock take", target: { sectionId: "inventory", subsectionId: "stock-take" } },
            ],
          },
          {
            title: "Zone issue & low stock",
            body: "Zones let you issue stock from a vault to a salesperson for display or sale, then return unsold pieces. zone-create-issue-stocks handles issue and return with ZoneId, location, and stock lines. Low stock planning surfaces SKUs below reorder point so you can raise purchase orders proactively.",
            links: [
              { label: "Zone vault list", target: { sectionId: "inventory", subsectionId: "inventory-zone", endpointId: "zone-vault-list" } },
              { label: "Zone issue / return", target: { sectionId: "inventory", subsectionId: "inventory-zone", endpointId: "zone-create-issue-stocks" } },
              { label: "Low stock list", target: { sectionId: "inventory", subsectionId: "inventory-low-stock-planning", endpointId: "low-stock-list" } },
            ],
          },
        ],
      },
      {
        id: "point-of-sale",
        title: "Point of Sale (POS)",
        icon: "🛒",
        color: "#ef4444",
        description: "Daily retail operations — matches the GIS POS menu and user manual flows.",
        items: [
          { label: "POS dashboard & KPIs", target: { sectionId: "pos", subsectionId: "pos-dashboard" } },
          { label: "How to open the cash register", target: { sectionId: "pos", subsectionId: "pos-cash-register" } },
          { label: "How to add products to the catalog", target: { sectionId: "pos", subsectionId: "pos-home" } },
          { label: "How to pay full payment", target: { sectionId: "pos", subsectionId: "pos-order" } },
          { label: "How to PARK the bill", target: { sectionId: "pos", subsectionId: "pos-park" } },
          { label: "How to create custom order", target: { sectionId: "pos", subsectionId: "pos-custom" } },
          { label: "How to do repair order", target: { sectionId: "pos", subsectionId: "pos-repair" } },
          { label: "How to exchange product", target: { sectionId: "pos", subsectionId: "pos-exchange" } },
          { label: "How to refund", target: { sectionId: "pos", subsectionId: "pos-refund" } },
          { label: "How to reserve a product", target: { sectionId: "pos", subsectionId: "pos-reserve" } },
          { label: "How to create gift card", target: { sectionId: "pos", subsectionId: "pos-gift-card" } },
        ],
      },
    ],
    apiBasics: [
      { term: "Base URL", value: "Your assigned developer API host (see toolbar after sign-in)", note: "Not the public production URL. GIS issues a sandbox host per partner." },
      { term: "Method", value: "POST", note: "Nearly all GIS routes use POST with a JSON body." },
      { term: "Response", value: "JSON", note: "Success responses include data or success: true. Errors include code and message — see Errors." },
      { term: "GraphQL", value: "/App/graphql · /Inventory/graphql", note: "Lookup queries for dropdowns and reference data.", target: { sectionId: "graphql" } },
      { term: "Rate limit", value: "~1,000 req/min", note: "HTTP 429 when exceeded.", target: { sectionId: "errors" } },
    ],
  },
};
