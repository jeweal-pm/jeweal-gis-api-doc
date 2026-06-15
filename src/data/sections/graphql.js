export default {
      id: "graphql",
      label: "GraphQL",
      icon: "⬡",
      color: "#e535ab",
      description: "GraphQL query APIs for lookup and reference data. All requests are POST to the `/graphql` endpoint with a JSON body containing `query` and optional `variables`. Send the JWT in the `authorization` header. Two endpoints: App GraphQL (`/App/graphql`) for master/common reference data, and Inventory GraphQL (`/Inventory/graphql`) for inventory-specific lookups.",
      subsections: [

        /* ── App GraphQL ──────────────────── */
        {
          id: "graphql-app-common",
          label: "App GraphQL — Common",
          color: "#e535ab",
          description: "Common lookup queries served from the App GraphQL endpoint (`{{APP_URL}}/graphql`). All are POST with JSON body `{ \"query\": \"...\", \"variables\": {} }`. These queries power dropdowns and reference pickers across the admin UI.",
          endpoints: [
            {
              id: "gql-get-salespersons",
              method: "GRAPHQL",
              path: "/App/graphql",
              title: "Get Sales Persons",
              description: "Returns all sales persons — name, last name, logo URL, id, and position. Used for sales-person assignment dropdowns across POS and reporting.",
              requestBody: {
                query: "{ Salespersons { name lname logo id position } }",
                variables: {}
              },
              response: {
                code: 200,
                data: {
                  Salespersons: [
                    { id: "64abc123", name: "John", lname: "Doe", logo: "https://api2uat.gis247.net/uploads/salesperson/logo.jpg", /* was: example.com/logo.jpg */ position: "Senior Sales" },
                    { id: "64abc124", name: "Jane", lname: "Smith", logo: "", position: "Sales Associate" }
                  ]
                }
              },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." },
                { code: 400, message: "Bad Request — malformed GraphQL query syntax." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "query", type: "string", required: true, description: "GraphQL query string." }
              ]
            },
            {
              id: "gql-get-items",
              method: "GRAPHQL",
              path: "/App/graphql",
              title: "Get Items",
              description: "Returns all product item types (id and name). Used for item-type dropdowns in product creation and filtering.",
              requestBody: {
                query: "{ items { id name } }",
                variables: {}
              },
              response: {
                code: 200,
                data: {
                  items: [
                    { id: "5fe6b3bc4d7a0e2928307873", name: "Ring" },
                    { id: "5fe6b3bc4d7a0e2928307874", name: "Necklace" },
                    { id: "5fe6b3bc4d7a0e2928307875", name: "Bracelet" }
                  ]
                }
              },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." },
                { code: 400, message: "Bad Request — malformed GraphQL query syntax." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "query", type: "string", required: true, description: "GraphQL query string." }
              ]
            },
            {
              id: "gql-get-collections",
              method: "GRAPHQL",
              path: "/App/graphql",
              title: "Get Collections",
              description: "Returns all product collections. Used for collection pickers in product management and dashboard filters.",
              requestBody: {
                query: "{ collections { id name } }",
                variables: {}
              },
              response: {
                code: 200,
                data: {
                  collections: [
                    { id: "64abc200", name: "Bridal" },
                    { id: "64abc201", name: "Classic" },
                    { id: "64abc202", name: "Anniversary" }
                  ]
                }
              },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." },
                { code: 400, message: "Bad Request — malformed GraphQL query syntax." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "query", type: "string", required: true, description: "GraphQL query string." }
              ]
            },
            {
              id: "gql-get-styles",
              method: "GRAPHQL",
              path: "/App/graphql",
              title: "Get Styles",
              description: "Returns all product style options. Used for style filter dropdowns.",
              requestBody: {
                query: "{ styles { id name } }",
                variables: {}
              },
              response: {
                code: 200,
                data: {
                  styles: [
                    { id: "64abc300", name: "Modern" },
                    { id: "64abc301", name: "Vintage" },
                    { id: "64abc302", name: "Minimalist" }
                  ]
                }
              },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." },
                { code: 400, message: "Bad Request — malformed GraphQL query syntax." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "query", type: "string", required: true, description: "GraphQL query string." }
              ]
            },
            {
              id: "gql-get-metals",
              method: "GRAPHQL",
              path: "/App/graphql",
              title: "Get Metals",
              description: "Returns all metal types with id, name, color, and code. Used for metal selection in products and purchase orders.",
              requestBody: {
                query: "{ metals { id name color code } }",
                variables: {}
              },
              response: {
                code: 200,
                data: {
                  metals: [
                    { id: "5fe6b3bc4d7a0e2928307873", name: "Gold", color: "Yellow", code: "AU" },
                    { id: "5fe6b3d9252f1d3cef346fe3", name: "Silver", color: "White", code: "AG" },
                    { id: "5fe6b3bc4d7a0e2928307876", name: "Platinum", color: "White", code: "PT" }
                  ]
                }
              },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." },
                { code: 400, message: "Bad Request — malformed GraphQL query syntax." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "query", type: "string", required: true, description: "GraphQL query string. Requesting `color` and `code` in addition to `id` and `name` is recommended." }
              ]
            },
            {
              id: "gql-get-colors",
              method: "GRAPHQL",
              path: "/App/graphql",
              title: "Get Colors",
              description: "Returns all metal color options (e.g. Yellow Gold, Rose Gold, White Gold).",
              requestBody: {
                query: "{ colors { id name } }",
                variables: {}
              },
              response: {
                code: 200,
                data: {
                  colors: [
                    { id: "64abc400", name: "Yellow Gold" },
                    { id: "64abc401", name: "Rose Gold" },
                    { id: "64abc402", name: "White Gold" }
                  ]
                }
              },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." },
                { code: 400, message: "Bad Request — malformed GraphQL query syntax." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "query", type: "string", required: true, description: "GraphQL query string." }
              ]
            },
            {
              id: "gql-get-taxs",
              method: "GRAPHQL",
              path: "/App/graphql",
              title: "Get Taxes",
              description: "Returns all tax configurations available in the organisation. Used for tax dropdowns in location and product setup.",
              requestBody: {
                query: "{ taxs { id name } }",
                variables: {}
              },
              response: {
                code: 200,
                data: {
                  taxs: [
                    { id: "634f694d17ae947408110e41", name: "VAT 7%" },
                    { id: "634f694d17ae947408110e42", name: "Tax Exempt" },
                    { id: "634f694d17ae947408110e43", name: "GST 10%" }
                  ]
                }
              },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." },
                { code: 400, message: "Bad Request — malformed GraphQL query syntax." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "query", type: "string", required: true, description: "GraphQL query string. Note: field is `taxs` (not `taxes`)." }
              ]
            },
            {
              id: "gql-get-sizes",
              method: "GRAPHQL",
              path: "/App/graphql",
              title: "Get Sizes",
              description: "Returns all product size options (ring sizes, etc.).",
              requestBody: {
                query: "{ sizes { id name } }",
                variables: {}
              },
              response: {
                code: 200,
                data: {
                  sizes: [
                    { id: "6015babaa2641816d769d242", name: "5" },
                    { id: "6015babaa2641816d769d243", name: "6" },
                    { id: "6015babaa2641816d769d244", name: "7" },
                    { id: "6015babaa2641816d769d245", name: "8" }
                  ]
                }
              },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." },
                { code: 400, message: "Bad Request — malformed GraphQL query syntax." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "query", type: "string", required: true, description: "GraphQL query string." }
              ]
            },
            {
              id: "gql-get-ecom-categories",
              method: "GRAPHQL",
              path: "/App/graphql",
              title: "Get eCommerce Categories",
              description: "Returns eCommerce product categories with id, name, and parent_id for hierarchical (parent–child) category trees.",
              requestBody: {
                query: "{ ecomcategorie { id name parent_id } }",
                variables: {}
              },
              response: {
                code: 200,
                data: {
                  ecomcategorie: [
                    { id: "64abc500", name: "Rings", parent_id: null },
                    { id: "64abc501", name: "Diamond Rings", parent_id: "64abc500" },
                    { id: "64abc502", name: "Necklaces", parent_id: null },
                    { id: "64abc503", name: "Pendants", parent_id: "64abc502" }
                  ]
                }
              },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." },
                { code: 400, message: "Bad Request — malformed GraphQL query syntax." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "query", type: "string", required: true, description: "GraphQL query string. Note: field is `ecomcategorie` (singular, no trailing 's')." }
              ]
            },
            {
              id: "gql-get-stone-groups",
              method: "GRAPHQL",
              path: "/App/graphql",
              title: "Get Stone Groups",
              description: "Returns all stone group categories (e.g. Diamond, Gemstone, Pearls). Used to filter stone lists.",
              requestBody: {
                query: "{ stoneGroups { id name } }",
                variables: {}
              },
              response: {
                code: 200,
                data: {
                  stoneGroups: [
                    { id: "64abc600", name: "Diamond" },
                    { id: "64abc601", name: "Gemstone" },
                    { id: "64abc602", name: "Pearls" }
                  ]
                }
              },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." },
                { code: 400, message: "Bad Request — malformed GraphQL query syntax." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "query", type: "string", required: true, description: "GraphQL query string." }
              ]
            },
            {
              id: "gql-get-stones",
              method: "GRAPHQL",
              path: "/App/graphql",
              title: "Get Stones",
              description: "Returns all stones (id and name). Optionally filter by `group_id` to narrow results to a specific stone group.",
              requestBody: {
                query: "{ stones { id name } }",
                variables: {}
              },
              response: {
                code: 200,
                data: {
                  stones: [
                    { id: "6126fd6b9e0e6675c14fe113", name: "Diamond" },
                    { id: "5fe6b44e4d7a0e2928307874", name: "Ruby" },
                    { id: "5fe6b45a114f0f52e11b22cb", name: "Sapphire" }
                  ]
                }
              },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." },
                { code: 400, message: "Bad Request — malformed GraphQL query syntax." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "query", type: "string", required: true, description: "GraphQL query. Supports optional group filter: `{ stones(group_id: \"<id>\") { id name } }`." },
                { name: "group_id", type: "string", required: false, description: "Optional — stone group ID to filter results." }
              ]
            },
            {
              id: "gql-get-shapes",
              method: "GRAPHQL",
              path: "/App/graphql",
              title: "Get Shapes",
              description: "Returns all stone shape options (e.g. Round, Princess, Oval). Used for stone shape pickers in product and stone master.",
              requestBody: {
                query: "{ shapes { id name } }",
                variables: {}
              },
              response: {
                code: 200,
                data: {
                  shapes: [
                    { id: "64abc700", name: "Round" },
                    { id: "64abc701", name: "Princess" },
                    { id: "64abc702", name: "Oval" },
                    { id: "64abc703", name: "Cushion" }
                  ]
                }
              },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." },
                { code: 400, message: "Bad Request — malformed GraphQL query syntax." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "query", type: "string", required: true, description: "GraphQL query string." }
              ]
            },
            {
              id: "gql-get-shape-groups",
              method: "GRAPHQL",
              path: "/App/graphql",
              title: "Get Shape Groups",
              description: "Returns all shape group categories that group individual stone shapes.",
              requestBody: {
                query: "{ Shapegroups { id name } }",
                variables: {}
              },
              response: {
                code: 200,
                data: {
                  Shapegroups: [
                    { id: "64abc800", name: "Round Shapes" },
                    { id: "64abc801", name: "Fancy Shapes" }
                  ]
                }
              },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." },
                { code: 400, message: "Bad Request — malformed GraphQL query syntax." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "query", type: "string", required: true, description: "GraphQL query string. Note: field name is `Shapegroups` (capital S)." }
              ]
            },
            {
              id: "gql-get-general-setup",
              method: "GRAPHQL",
              path: "/App/graphql",
              title: "Get General Setup",
              description: "Returns the organisation's general setup configuration — product choice mode, warehouse allowance, POS price-change permission, and template settings.",
              requestBody: {
                query: "{ generalsetup { id productChoice allowWarehouse POS_change_price Template_with_Image } }",
                variables: {}
              },
              response: {
                code: 200,
                data: {
                  generalsetup: {
                    id: "5fce3a66fc7da348fb1cfcb2",
                    productChoice: "1",
                    allowWarehouse: "1",
                    POS_change_price: "0",
                    Template_with_Image: "1"
                  }
                }
              },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." },
                { code: 400, message: "Bad Request — malformed GraphQL query syntax." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "query", type: "string", required: true, description: "GraphQL query string. `productChoice`: product mode (1 = standard). `allowWarehouse`: warehouse module enabled. `POS_change_price`: allow POS operator to override price. `Template_with_Image`: receipt/print template includes images." }
              ]
            },
            {
              id: "gql-get-cuts",
              method: "GRAPHQL",
              path: "/App/graphql",
              title: "Get Cuts",
              description: "Returns all stone cut grades (e.g. Excellent, Very Good, Good). Used in stone master and product stone detail.",
              requestBody: {
                query: "{ cuts { id name } }",
                variables: {}
              },
              response: {
                code: 200,
                data: {
                  cuts: [
                    { id: "64abc900", name: "Excellent" },
                    { id: "64abc901", name: "Very Good" },
                    { id: "64abc902", name: "Good" },
                    { id: "64abc903", name: "Fair" }
                  ]
                }
              },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." },
                { code: 400, message: "Bad Request — malformed GraphQL query syntax." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "query", type: "string", required: true, description: "GraphQL query string." }
              ]
            },
            {
              id: "gql-get-claritys",
              method: "GRAPHQL",
              path: "/App/graphql",
              title: "Get Clarities",
              description: "Returns all stone clarity grades (GIA scale: FL, IF, VVS1, VVS2, VS1, VS2, SI1, SI2, I1…). Used in stone master and product detail.",
              requestBody: {
                query: "{ claritys { id name } }",
                variables: {}
              },
              response: {
                code: 200,
                data: {
                  claritys: [
                    { id: "64abca00", name: "FL" },
                    { id: "64abca01", name: "VVS1" },
                    { id: "64abca02", name: "VS1" },
                    { id: "64abca03", name: "SI1" }
                  ]
                }
              },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." },
                { code: 400, message: "Bad Request — malformed GraphQL query syntax." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "query", type: "string", required: true, description: "GraphQL query string. Note: field is `claritys` (not `clarities`)." }
              ]
            },
            {
              id: "gql-get-stone-colors",
              method: "GRAPHQL",
              path: "/App/graphql",
              title: "Get Stone Colors",
              description: "Returns all stone color grades (GIA D–Z scale and fancy colors). Used in stone master and product detail.",
              requestBody: {
                query: "{ stoneColors { id name } }",
                variables: {}
              },
              response: {
                code: 200,
                data: {
                  stoneColors: [
                    { id: "64abcb00", name: "D" },
                    { id: "64abcb01", name: "E" },
                    { id: "64abcb02", name: "F" },
                    { id: "64abcb03", name: "G" }
                  ]
                }
              },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." },
                { code: 400, message: "Bad Request — malformed GraphQL query syntax." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "query", type: "string", required: true, description: "GraphQL query string." }
              ]
            },
            {
              id: "gql-get-stone-size",
              method: "GRAPHQL",
              path: "/App/graphql",
              title: "Get Stone Sizes",
              description: "Returns all stone size records including Pointer count and Weight (carat). Used to map stone pointer to weight in product calculation.",
              requestBody: {
                query: "{ stoneSize { id name Pointer Weight } }",
                variables: {}
              },
              response: {
                code: 200,
                data: {
                  stoneSize: [
                    { id: "64abcc00", name: "0.01 ct", Pointer: "1", Weight: "0.01" },
                    { id: "64abcc01", name: "0.05 ct", Pointer: "5", Weight: "0.05" },
                    { id: "64abcc02", name: "0.10 ct", Pointer: "10", Weight: "0.10" }
                  ]
                }
              },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." },
                { code: 400, message: "Bad Request — malformed GraphQL query syntax." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "query", type: "string", required: true, description: "GraphQL query string. `Pointer` and `Weight` use PascalCase." }
              ]
            },
            {
              id: "gql-get-locations-app",
              method: "GRAPHQL",
              path: "/Inventory/graphql",
              title: "Get Locations (full — via Inventory GraphQL)",
              description: "Returns all locations with currency, id, name, and type. This query targets the Inventory GraphQL endpoint and is used wherever a full location list (including currency) is required.",
              requestBody: {
                query: "{ locations { currency id name type } }",
                variables: {}
              },
              response: {
                code: 200,
                data: {
                  locations: [
                    { id: "5fcf64f67a57be5ea978ab82", name: "Main Store", type: "Store", currency: "THB" },
                    { id: "67e3ae830928c144e7773ece", name: "Warehouse", type: "Warehouse", currency: "THB" },
                    { id: "67e3ae830928c144e7773ecf", name: "Online Store", type: "eCommerce", currency: "USD" }
                  ]
                }
              },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." },
                { code: 400, message: "Bad Request — malformed GraphQL query syntax." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "query", type: "string", required: true, description: "GraphQL query string. Endpoint is Inventory GraphQL (`/Inventory/graphql`)." }
              ]
            },
            {
              id: "gql-get-vouchers-app",
              method: "GRAPHQL",
              path: "/App/graphql",
              title: "Get Vouchers (App)",
              description: "Returns all voucher types configured in the App. Used for voucher-type pickers across the admin UI.",
              requestBody: {
                query: "{ voucher { id name } }",
                variables: {}
              },
              response: {
                code: 200,
                data: {
                  voucher: [
                    { id: "60702b5f775bf13bad724522", name: "Purchase Order" },
                    { id: "60702b5f775bf13bad724523", name: "Sales Invoice" },
                    { id: "60702b5f775bf13bad724524", name: "Custom Order" }
                  ]
                }
              },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." },
                { code: 400, message: "Bad Request — malformed GraphQL query syntax." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "query", type: "string", required: true, description: "GraphQL query string. Note: field name is `voucher` (singular)." }
              ]
            },
            {
              id: "gql-get-roles",
              method: "GRAPHQL",
              path: "/App/graphql",
              title: "Get Roles",
              description: "Returns all admin roles. Used in user management for role assignment.",
              requestBody: {
                query: "{ roles { _id name } }",
                variables: {}
              },
              response: {
                code: 200,
                data: {
                  roles: [
                    { _id: "5fe6b148ddaced149f20e392", name: "Super Admin" },
                    { _id: "5fe6b148ddaced149f20e393", name: "Store Manager" },
                    { _id: "5fe6b148ddaced149f20e394", name: "Sales Staff" }
                  ]
                }
              },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." },
                { code: 400, message: "Bad Request — malformed GraphQL query syntax." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "query", type: "string", required: true, description: "GraphQL query string. Note: identifier field is `_id` (not `id`)." }
              ]
            },
            {
              id: "gql-get-languages",
              method: "GRAPHQL",
              path: "/App/graphql",
              title: "Get Languages",
              description: "Returns all configured languages with shortcode, name, and value. Used for language/locale pickers in organisation and product settings.",
              requestBody: {
                query: "{ languages { shortcode name value } }",
                variables: {}
              },
              response: {
                code: 200,
                data: {
                  languages: [
                    { shortcode: "en", name: "English", value: "en" },
                    { shortcode: "th", name: "Thai", value: "th" },
                    { shortcode: "zh", name: "Chinese", value: "zh" }
                  ]
                }
              },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." },
                { code: 400, message: "Bad Request — malformed GraphQL query syntax." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "query", type: "string", required: true, description: "GraphQL query string." }
              ]
            },
            {
              id: "gql-get-setting-type",
              method: "GRAPHQL",
              path: "/App/graphql",
              title: "Get Setting Types",
              description: "Returns available stone setting types (e.g. Prong, Bezel, Channel). Used in product advanced configuration for stone-setting style selection.",
              requestBody: {
                query: "{ settingType { id name } }",
                variables: {}
              },
              response: {
                code: 200,
                data: {
                  settingType: [
                    { id: "64abcd00", name: "Prong" },
                    { id: "64abcd01", name: "Bezel" },
                    { id: "64abcd02", name: "Channel" },
                    { id: "64abcd03", name: "Pavé" }
                  ]
                }
              },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." },
                { code: 400, message: "Bad Request — malformed GraphQL query syntax." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "query", type: "string", required: true, description: "GraphQL query string." }
              ]
            }
          ]
        },

        /* ── Inventory GraphQL ────────────── */
        {
          id: "graphql-inventory",
          label: "Inventory GraphQL",
          color: "#c026d3",
          description: "Inventory-specific GraphQL queries served from the Inventory GraphQL endpoint (`{{INVENTORY_URL}}/graphql`). Same POST + JSON body pattern as App GraphQL. Used for PO creation, stock transfer pickers, and supplier lookups.",
          endpoints: [
            {
              id: "gql-inventory-get-locations-filtered",
              method: "GRAPHQL",
              path: "/Inventory/graphql",
              title: "Get Locations (with type filter)",
              description: "Returns a location list. Pass a `type` argument to filter by location type (e.g. `Store`, `Warehouse`). Passing an empty string returns all locations.",
              requestBody: {
                query: "{ locations(type: \"\") { id name } }",
                variables: {}
              },
              response: {
                code: 200,
                data: {
                  locations: [
                    { id: "5fcf64f67a57be5ea978ab82", name: "Main Store" },
                    { id: "67e3ae830928c144e7773ece", name: "Warehouse" }
                  ]
                }
              },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." },
                { code: 400, message: "Bad Request — malformed GraphQL query syntax." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "query", type: "string", required: true, description: "GraphQL query. Use `type` argument to filter: `locations(type: \"Store\")`. Empty string returns all." }
              ]
            },
            {
              id: "gql-inventory-get-locations-full",
              method: "GRAPHQL",
              path: "/Inventory/graphql",
              title: "Get Locations (id, name, type)",
              description: "Returns all locations with id, name, and type fields. Used in voucher master setup to assign allowed locations.",
              requestBody: {
                query: "{ locations { id name type } }",
                variables: {}
              },
              response: {
                code: 200,
                data: {
                  locations: [
                    { id: "5fcf64f67a57be5ea978ab82", name: "Main Store", type: "Store" },
                    { id: "67e3ae830928c144e7773ece", name: "Warehouse", type: "Warehouse" },
                    { id: "67e3ae830928c144e7773ecf", name: "Online Store", type: "eCommerce" }
                  ]
                }
              },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." },
                { code: 400, message: "Bad Request — malformed GraphQL query syntax." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "query", type: "string", required: true, description: "GraphQL query string." }
              ]
            },
            {
              id: "gql-inventory-get-vouchers",
              method: "GRAPHQL",
              path: "/Inventory/graphql",
              title: "Get Vouchers (Inventory, by group)",
              description: "Returns vouchers filtered by `group`. Commonly called with `group: \"Purchase_order\"` to populate the PO voucher type picker. Other groups: `Sales`, `Custom_Order`, `Stock_Transfer`, etc.",
              requestBody: {
                query: "{ vouchers(group: \"Purchase_order\") { id name } }",
                variables: {}
              },
              response: {
                code: 200,
                data: {
                  vouchers: [
                    { id: "60702b5f775bf13bad724522", name: "Purchase Order - Local" },
                    { id: "60702b5f775bf13bad724523", name: "Purchase Order - Import" }
                  ]
                }
              },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." },
                { code: 400, message: "Bad Request — malformed GraphQL query syntax." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "query", type: "string", required: true, description: "GraphQL query with `group` argument. Valid groups: `Purchase_order`, `Sales`, `Custom_Order`, `Stock_Transfer`." }
              ]
            },
            {
              id: "gql-inventory-get-suppliers",
              method: "GRAPHQL",
              path: "/Inventory/graphql",
              title: "Get Suppliers",
              description: "Returns all supplier records. Used for supplier selection in Purchase Orders.",
              requestBody: {
                query: "{ suppliers { id name } }",
                variables: {}
              },
              response: {
                code: 200,
                data: {
                  suppliers: [
                    { id: "64abce00", name: "Diamond World Suppliers" },
                    { id: "64abce01", name: "Gold Chain Co." },
                    { id: "64abce02", name: "Gem Source International" }
                  ]
                }
              },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." },
                { code: 400, message: "Bad Request — malformed GraphQL query syntax." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "query", type: "string", required: true, description: "GraphQL query string." }
              ]
            },
            {
              id: "gql-inventory-get-supplier",
              method: "GRAPHQL",
              path: "/Inventory/graphql",
              title: "Get Supplier (single)",
              description: "Returns a single supplier record by id.",
              requestBody: {
                query: "{ supplier(id: \"<supplier_id>\") { id name } }",
                variables: {}
              },
              response: {
                code: 200,
                data: {
                  supplier: { id: "64abce00", name: "Diamond World Suppliers" }
                }
              },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." },
                { code: 400, message: "Bad Request — malformed GraphQL query syntax." },
                { code: 404, message: "Not Found — no supplier matches the provided id." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "query", type: "string", required: true, description: "GraphQL query with `id` argument: `supplier(id: \"...\") { ... }`." }
              ]
            },
            {
              id: "gql-inventory-get-sales-persons",
              method: "GRAPHQL",
              path: "/Inventory/graphql",
              title: "Get Sales Persons (Inventory)",
              description: "Returns sales persons from the Inventory service context. Used for sales person assignment in inventory transactions.",
              requestBody: {
                query: "{ salesPersons { id name } }",
                variables: {}
              },
              response: {
                code: 200,
                data: {
                  salesPersons: [
                    { id: "64abcf00", name: "John Doe" },
                    { id: "64abcf01", name: "Jane Smith" }
                  ]
                }
              },
              errors: [
                { code: 401, message: "Unauthorized — missing or invalid authorization token." },
                { code: 400, message: "Bad Request — malformed GraphQL query syntax." }
              ],
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "query", type: "string", required: true, description: "GraphQL query string." }
              ]
            }
          ]
        }
      ]
    };
