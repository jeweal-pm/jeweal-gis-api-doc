export default {
      id: "settings",
      label: "Settings",
      icon: "⚙️",
      color: "#475569",
      description: "Settings module APIs. Covers CMS content management, page ordering, and other store-level configuration.",
      subsections: [
        {
          id: "settings-cms",
          label: "CMS",
          color: "#64748b",
          endpoints: [
            {
              id: "cms-get-cms",
              method: "POST",
              path: "/cms/get-cms",
              title: "Get CMS Settings",
              description: "Returns the CMS configuration for the organisation including enabled features and content settings.",
              requestBody: {},
              response: {
                code: 200,
                data: {
                  _id: "67eba015592f7b47cd9e184e",
                  organisation_id: "67eba015592f7b47cd9e184e",
                  cms_enabled: true,
                  home_page: true,
                  about_us: true,
                  contact_us: true,
                  privacy_policy: true,
                  terms_conditions: true,
                  refund_policy: true,
                  updatedAt: "30/03/2025"
                }
              },
              params: []
            },
            {
              id: "cms-get-pages-list",
              method: "POST",
              path: "/cms/get-pages-list",
              title: "Get CMS Pages List",
              description: "Returns a paginated list of CMS pages for a given location, with optional keyword search.",
              requestBody: {
                location_id: "634f7f95c734e545a850dcf1",
                Limit: 100,
                skip: 0,
                search: ""
              },
              response: {
                code: 200,
                data: [
                  {
                    id: "67769fb7de687ff825d39013",
                    title: "Size guidence",
                    featuredImage: "",
                    status: 1,
                    slug: "size-guidence",
                    url: "size-guidence",
                    lastModified: "02/01/2025",
                    is_delete: 0
                  },
                  {
                    id: "675c034ed30dd83d8cc19965",
                    title: "Refunds and Return Policy",
                    featuredImage: "",
                    status: 1,
                    slug: "refunds-and-returns-policy",
                    url: "refunds-and-returns-policy",
                    lastModified: "12/12/2024",
                    is_delete: 0
                  },
                  {
                    id: "675c034ed30dd83d8cc19964",
                    title: "Terms and Conditions",
                    featuredImage: "",
                    status: 1,
                    slug: "terms-and-conditions",
                    url: "terms-and-conditions",
                    lastModified: "12/12/2024",
                    is_delete: 0
                  },
                  {
                    id: "67769fb7de687ff825d39012",
                    title: "About us",
                    featuredImage: "",
                    status: 1,
                    slug: "about-us",
                    url: "about-us",
                    lastModified: "02/01/2025",
                    is_delete: 0
                  },
                  {
                    id: "675c034ed30dd83d8cc19963",
                    title: "Privacy policy",
                    featuredImage: "https://gis247.s3.amazonaws.com/2022th0038/Customer/1670223082500.png/1737018898965.png",
                    status: 1,
                    slug: "privacy-policy",
                    url: "privacy-policy",
                    lastModified: "24/01/2025",
                    is_delete: 0
                  }
                ],
                total: 5
              },
              params: [
                { name: "location_id", type: "string", required: true, description: "Location ID to scope the pages list" },
                { name: "Limit", type: "number", required: false, description: "Max pages to return (default 100)" },
                { name: "skip", type: "number", required: false, description: "Records to skip for pagination" },
                { name: "search", type: "string", required: false, description: "Keyword to filter pages by title" }
              ]
            },
            {
              id: "cms-edit-page-order",
              method: "POST",
              path: "/cms/edit-page-order",
              title: "Edit CMS Page Order",
              description: "Updates the display order of CMS pages for a given location. Pass the full ordered array of page objects in the desired sequence.",
              requestBody: {
                location_id: "634f7f95c734e545a850dcf1",
                dataArray: [
                  {
                    title: "Size guidence",
                    featuredImage: "",
                    status: 1,
                    slug: "size-guidence",
                    url: "size-guidence",
                    id: "67769fb7de687ff825d39013",
                    lastModified: "02/01/2025",
                    is_delete: 0
                  },
                  {
                    title: "Refunds and Return Policy",
                    featuredImage: "",
                    status: 1,
                    slug: "refunds-and-returns-policy",
                    url: "refunds-and-returns-policy",
                    id: "675c034ed30dd83d8cc19965",
                    lastModified: "12/12/2024",
                    is_delete: 0
                  },
                  {
                    title: "Terms and Conditions",
                    featuredImage: "",
                    status: 1,
                    slug: "terms-and-conditions",
                    url: "terms-and-conditions",
                    id: "675c034ed30dd83d8cc19964",
                    lastModified: "12/12/2024",
                    is_delete: 0
                  },
                  {
                    title: "About us",
                    featuredImage: "",
                    status: 1,
                    slug: "about-us",
                    url: "about-us",
                    id: "67769fb7de687ff825d39012",
                    lastModified: "02/01/2025",
                    is_delete: 0
                  },
                  {
                    title: "Privacy policy",
                    featuredImage: "https://gis247.s3.amazonaws.com/2022th0038/Customer/1670223082500.png/1737018898965.png",
                    status: 1,
                    slug: "privacy-policy",
                    url: "privacy-policy",
                    id: "675c034ed30dd83d8cc19963",
                    lastModified: "24/01/2025",
                    is_delete: 0
                  }
                ]
              },
              response: {
                code: 200,
                message: "Page order updated successfully"
              },
              params: [
                { name: "location_id", type: "string", required: true, description: "Location ID the pages belong to" },
                { name: "dataArray", type: "array", required: true, description: "Ordered array of page objects in the new display sequence. Each object must include `id`, `title`, `slug`, `url`, `status`, and `is_delete`." }
              ]
            }
          ]
        },
        /* ── Integrated Applications ── */
        {
          id: "settings-integrated-applications",
          label: "Integrated Applications",
          color: "#64748b",
          endpoints: [
            {
              id: "integrated-app-get-credentials",
              method: "POST",
              path: "/App/applicationkey/get-credentials",
              title: "Get Integration Credentials",
              description: "Returns all integrated application credentials configured for the organisation (ERP, e-commerce platforms, etc.).",
              requestBody: {},
              response: {
                code: 200,
                data: [
                  {
                    _id: "658bf917ab436d2988c82dec",
                    name: "Tiara ERP",
                    type: "ERP",
                    logo: "https://gis247.s3.us-east-2.amazonaws.com/2023in0076/User/profile/1703656137006.png",
                    status: 1,
                    instructions: "",
                    defaultId: "658bb8e2f35370370b58e3a5",
                    credentials_Keys: [
                      { key: "App_ID", value: "GIS-1856012595996140" },
                      { key: "SECRET_KEY", value: "059d7eb962c2096f83270e4b171a1f9f" }
                    ]
                  }
                ]
              },
              params: []
            },
            {
              id: "integrated-app-view-credentials",
              method: "POST",
              path: "/App/applicationkey/view-credentials",
              title: "View Integration Credentials by ID",
              description: "Returns the full credential details for a specific integrated application by its ID.",
              requestBody: {
                id: "658bf917ab436d2988c82dec"
              },
              response: {
                code: 200,
                data: {
                  _id: "658bf917ab436d2988c82dec",
                  name: "Tiara ERP",
                  type: "ERP",
                  logo: "https://gis247.s3.us-east-2.amazonaws.com/2023in0076/User/profile/1703656137006.png",
                  status: 1,
                  instructions: "",
                  defaultId: "658bb8e2f35370370b58e3a5",
                  credentials_Keys: [
                    { key: "App_ID", value: "GIS-1856012595996140" },
                    { key: "SECRET_KEY", value: "059d7eb962c2096f83270e4b171a1f9f" }
                  ]
                }
              },
              params: [
                { name: "id", type: "string", required: true, description: "Integration credential document ID" }
              ]
            },
            {
              id: "integrated-app-edit-credentials",
              method: "POST",
              path: "/App/applicationkey/edit-credentials",
              title: "Edit Integration Credentials",
              description: "Updates an existing integrated application credential including name, type, logo, status, and credential key-value pairs.",
              requestBody: {
                id: "658bf917ab436d2988c82dec",
                name: "Tiara ERP",
                type: "ERP",
                logo: "https://gis247.s3.us-east-2.amazonaws.com/2023in0076/User/profile/1703656137006.png",
                instructions: "",
                status: 1,
                defaultId: "658bb8e2f35370370b58e3a5",
                credentials_Keys: [
                  { key: "App_ID", value: "GIS-1856012595996140" },
                  { key: "SECRET_KEY", value: "059d7eb962c2096f83270e4b171a1f9f" }
                ]
              },
              response: {
                code: 200,
                message: "Credentials updated successfully"
              },
              params: [
                { name: "id", type: "string", required: true, description: "Integration credential document ID" },
                { name: "name", type: "string", required: true, description: "Display name of the integration" },
                { name: "type", type: "string", required: true, description: "Integration type, e.g. `ERP`" },
                { name: "logo", type: "string", required: false, description: "URL of the integration logo image" },
                { name: "status", type: "number", required: true, description: "`1` = active, `0` = inactive" },
                { name: "instructions", type: "string", required: false, description: "Setup instructions for the integration" },
                { name: "defaultId", type: "string", required: false, description: "Default template ID for this integration type" },
                { name: "credentials_Keys", type: "array", required: true, description: "Array of `{ key, value }` credential pairs (e.g. App_ID, SECRET_KEY)" }
              ]
            }
          ]
        },
        /* ── Currency ── */
        {
          id: "settings-currency",
          label: "Currency",
          color: "#64748b",
          endpoints: [
            {
              id: "currency-view",
              method: "POST",
              path: "/App/profile/currency-view",
              title: "View Currency Settings",
              description: "Returns the current default currency and the full list of enabled currencies for the organisation.",
              requestBody: {},
              response: {
                code: 200,
                data: {
                  Default_currency: "ANG",
                  All_Currency: ["ALL","JPY","AED","INR","EUR","BOB","ANG","DKK","COP","BSD","EEK","CNY","FJD","BZD","IRR","THB"]
                }
              },
              params: []
            },
            {
              id: "currency-edit",
              method: "POST",
              path: "/App/profile/currency-edit",
              title: "Edit Currency Settings",
              description: "Updates the organisation's default currency and the list of all accepted currencies.",
              requestBody: {
                Default_currency: "ANG",
                All_Currency: ["ALL","JPY","AED","INR","EUR","BOB","ANG","DKK","COP","BSD","EEK","CNY","FJD","BZD","IRR","THB"]
              },
              response: {
                code: 200,
                message: "Currency settings updated successfully"
              },
              params: [
                { name: "Default_currency", type: "string", required: true, description: "ISO currency code to set as the default, e.g. `ANG`" },
                { name: "All_Currency", type: "array", required: true, description: "Array of ISO currency codes that the store accepts" }
              ]
            }
          ]
        },
        /* ── Language ── */
        {
          id: "settings-language",
          label: "Language",
          color: "#64748b",
          endpoints: [
            {
              id: "language-view",
              method: "POST",
              path: "/App/profile/languages-view",
              title: "View Language Settings",
              description: "Returns the organisation's current language configuration including the default language and all enabled languages.",
              requestBody: {},
              response: {
                code: 200,
                data: {
                  default_language: "en",
                  all_languages: ["en", "ar", "th", "fr", "de", "zh", "ja", "es"]
                }
              },
              params: []
            }
          ]
        },
        /* ── Export ── */
        {
          id: "settings-export",
          label: "Export",
          color: "#64748b",
          endpoints: [
            {
              id: "export-list",
              method: "POST",
              path: "/settings/export_list",
              title: "Get Export List",
              description: "Returns the list of available data export jobs/reports for the organisation (e.g. inventory, sales, customers).",
              requestBody: {},
              response: {
                code: 200,
                data: [
                  {
                    _id: "6512a3e4b7c9f10023abc001",
                    name: "Inventory Export",
                    type: "inventory",
                    status: "completed",
                    createdAt: "30/03/2025",
                    fileUrl: "https://gis247.s3.amazonaws.com/2022th0038/exports/inventory_20250330.xlsx"
                  },
                  {
                    _id: "6512a3e4b7c9f10023abc002",
                    name: "Sales Export",
                    type: "sales",
                    status: "completed",
                    createdAt: "29/03/2025",
                    fileUrl: "https://gis247.s3.amazonaws.com/2022th0038/exports/sales_20250329.xlsx"
                  }
                ]
              },
              params: []
            }
          ]
        },
        /* ── SMTP Email ── */
        {
          id: "settings-smtp",
          label: "SMTP Email",
          color: "#64748b",
          endpoints: [
            {
              id: "smtp-get",
              method: "POST",
              path: "/App/profile/get-smtp",
              title: "Get SMTP Settings",
              description: "Returns the current SMTP email configuration for the organisation including host, port, sender credentials, and encryption settings.",
              requestBody: {},
              response: {
                code: 200,
                data: {
                  _id: "67eba015592f7b47cd9e184e",
                  smtp_host: "smtp.gis247.net",
                  smtp_port: 587,
                  smtp_user: "noreply@gis247.net",
                  smtp_from_name: "Demo Jewelry Bangkok",
                  smtp_encryption: "TLS",
                  smtp_status: 1
                }
              },
              params: []
            }
          ]
        }
      ],
      endpoints: []
    };
