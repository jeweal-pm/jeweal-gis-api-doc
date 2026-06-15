export default {
      id: "master",
      label: "Master",
      icon: "👑",
      color: "#8b5cf6",
      description: "Master data — Item Master (shared routes, type in body), metal/stone, service labour, currency, vendors, vouchers.",
      subsections: [
        {
          id: "item-master",
          label: "Item Master",
          color: "#8b5cf6",
          description: "All tabs use the same three endpoints; change request body type to Item, Size, Collection, Style, or eCommerce Category.",
          childGroups: [
            {
              id: "im-item",
              label: "Item",
              endpoints: [
                {
                  id: "im-item-edit",
                  method: "POST",
                  path: "/App/master/itemMasteredit",
                  title: "Create / update (Item)",
                  description: "Create or update a row for the Item tab. id empty, edit false for create; set id and edit true to update.",
                  requestBody: { id: "", type: "Item", name: "a", code: "a", Status: "1", mixMatch: 0, edit: false, image: "" },
                  response: { code: 200, message: "Saved successfully", data: { _id: "68a1b2c3d4e5f6789012345", name: "a", code: "a", type: "Item" }, note: "Replace with your API response." },
                  params: [
                    { name: "authorization", type: "string", required: true, in: "header", description: "JWT (lowercase authorization in UAT)." },
                    { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                    { name: "type", type: "string", required: true, description: "Must match tab: Item | Size | Collection | Style | eCommerce Category" },
                    { name: "id", type: "string", required: false, description: "Record id when editing" },
                    { name: "name", type: "string", required: true, description: "Display name" },
                    { name: "code", type: "string", required: true, description: "Code" },
                    { name: "Status", type: "string", required: true, description: "1 active, 0 inactive" },
                    { name: "mixMatch", type: "integer", required: false, description: "Mix/match flag" },
                    { name: "edit", type: "boolean", required: true, description: "false = create flow, true = update" },
                    { name: "image", type: "string", required: false, description: "Image URL or key" }
                  ]
                },
                {
                  id: "im-item-view",
                  method: "POST",
                  path: "/App/master/itemMasterView",
                  title: "List / view (Item)",
                  description: "Paged grid for Item with search, filter, sort.",
                  requestBody: { search: "", type: "Item", limit: 100, skip: 0, filter: { code: [], name: [], mixMatch: "", status: "" }, sort: {} },
                  response: { code: 200, total: 24, data: [{ _id: "68a1b2c3d4e5f6789012345", name: "Ring", code: "RG", Status: "1" }], note: "Replace with your itemMasterView response." },
                  params: [
                    { name: "authorization", type: "string", required: true, in: "header", description: "JWT (lowercase authorization in UAT)." },
                    { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                    { name: "type", type: "string", required: true, description: "Item" },
                    { name: "search", type: "string", required: false, description: "Search text" },
                    { name: "limit", type: "integer", required: false, description: "Page size" },
                    { name: "skip", type: "integer", required: false, description: "Offset" },
                    { name: "filter", type: "object", required: false, description: "code[], name[], mixMatch, status" },
                    { name: "sort", type: "object", required: false, description: "Sort fields" }
                  ]
                },
                {
                  id: "im-item-filter",
                  method: "POST",
                  path: "/App/master/itemfilter",
                  title: "Filter metadata (Item)",
                  description: "Returns filter options for the list UI for this type.",
                  requestBody: { type: "Item" },
                  response: { code: 200, data: { code: [], name: [] }, note: "Replace with your itemfilter response." },
                  params: [
                    { name: "authorization", type: "string", required: true, in: "header", description: "JWT (lowercase authorization in UAT)." },
                    { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                    { name: "type", type: "string", required: true, description: "Item" }
                  ]
                }
              ]
            },
            {
              id: "im-size",
              label: "Size",
              endpoints: [
                {
                  id: "im-size-edit",
                  method: "POST",
                  path: "/App/master/itemMasteredit",
                  title: "Create / update (Size)",
                  description: "Same as Item tab; set type to Size.",
                  requestBody: { id: "", type: "Size", name: "a", code: "a", Status: "1", mixMatch: 0, edit: false, image: "" },
                  response: { code: 200, message: "Saved successfully", data: { _id: "68a1b2c3d4e5f6789012346", type: "Size" }, note: "Replace with your API response." },
                  params: [
                    { name: "authorization", type: "string", required: true, in: "header", description: "JWT (lowercase authorization in UAT)." },
                    { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                    { name: "type", type: "string", required: true, description: "Size" },
                    { name: "id", type: "string", required: false, description: "Record id when editing" },
                    { name: "name", type: "string", required: true, description: "Display name" },
                    { name: "code", type: "string", required: true, description: "Code" },
                    { name: "Status", type: "string", required: true, description: "1 active, 0 inactive" },
                    { name: "mixMatch", type: "integer", required: false, description: "Mix/match flag" },
                    { name: "edit", type: "boolean", required: true, description: "false = create, true = update" },
                    { name: "image", type: "string", required: false, description: "Image URL or key" }
                  ]
                },
                {
                  id: "im-size-view",
                  method: "POST",
                  path: "/App/master/itemMasterView",
                  title: "List / view (Size)",
                  description: "Size list includes Item[] in filter (link sizes to items).",
                  requestBody: { search: "", type: "Size", limit: 100, skip: 0, sort: {}, filter: { code: [], name: [], Item: [], mixMatch: "", status: "" } },
                  response: { code: 200, total: 12, data: [{ _id: "68a1b2c3d4e5f6789012346", name: "Size 7", code: "SZ7" }], note: "Replace with your itemMasterView response." },
                  params: [
                    { name: "authorization", type: "string", required: true, in: "header", description: "JWT (lowercase authorization in UAT)." },
                    { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                    { name: "type", type: "string", required: true, description: "Size" },
                    { name: "search", type: "string", required: false, description: "Search text" },
                    { name: "limit", type: "integer", required: false, description: "Page size" },
                    { name: "skip", type: "integer", required: false, description: "Offset" },
                    { name: "filter", type: "object", required: false, description: "code[], name[], Item[], mixMatch, status" },
                    { name: "sort", type: "object", required: false, description: "Sort fields" }
                  ]
                },
                {
                  id: "im-size-filter",
                  method: "POST",
                  path: "/App/master/itemfilter",
                  title: "Filter metadata (Size)",
                  description: "Filter options for the Size grid.",
                  requestBody: { type: "Size" },
                  response: { code: 200, data: { code: [], name: [], Item: [] }, note: "Replace with your itemfilter response." },
                  params: [
                    { name: "authorization", type: "string", required: true, in: "header", description: "JWT (lowercase authorization in UAT)." },
                    { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                    { name: "type", type: "string", required: true, description: "Size" }
                  ]
                }
              ]
            },
            {
              id: "im-collection",
              label: "Collection",
              endpoints: [
                {
                  id: "im-collection-edit",
                  method: "POST",
                  path: "/App/master/itemMasteredit",
                  title: "Create / update (Collection)",
                  description: "Same route; type Collection.",
                  requestBody: { id: "", type: "Collection", name: "a", code: "a", Status: "1", mixMatch: 0, edit: false, image: "" },
                  response: { code: 200, message: "Saved successfully", data: { _id: "68a1b2c3d4e5f6789012347", type: "Collection" }, note: "Replace with your API response." },
                  params: [
                    { name: "authorization", type: "string", required: true, in: "header", description: "JWT (lowercase authorization in UAT)." },
                    { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                    { name: "type", type: "string", required: true, description: "Collection" },
                    { name: "id", type: "string", required: false, description: "Record id when editing" },
                    { name: "name", type: "string", required: true, description: "Display name" },
                    { name: "code", type: "string", required: true, description: "Code" },
                    { name: "Status", type: "string", required: true, description: "1 active, 0 inactive" },
                    { name: "mixMatch", type: "integer", required: false, description: "Mix/match flag" },
                    { name: "edit", type: "boolean", required: true, description: "false = create, true = update" },
                    { name: "image", type: "string", required: false, description: "Image URL or key" }
                  ]
                },
                {
                  id: "im-collection-view",
                  method: "POST",
                  path: "/App/master/itemMasterView",
                  title: "List / view (Collection)",
                  description: "Paged list for Collection (same shape as Item unless your UI sends extra filter keys).",
                  requestBody: { search: "", type: "Collection", limit: 100, skip: 0, filter: { code: [], name: [], mixMatch: "", status: "" }, sort: {} },
                  response: { code: 200, total: 8, data: [{ _id: "68a1b2c3d4e5f6789012347", name: "Bridal", code: "BR" }], note: "Replace with your itemMasterView response." },
                  params: [
                    { name: "authorization", type: "string", required: true, in: "header", description: "JWT (lowercase authorization in UAT)." },
                    { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                    { name: "type", type: "string", required: true, description: "Collection" },
                    { name: "search", type: "string", required: false, description: "Search text" },
                    { name: "limit", type: "integer", required: false, description: "Page size" },
                    { name: "skip", type: "integer", required: false, description: "Offset" },
                    { name: "filter", type: "object", required: false, description: "code[], name[], mixMatch, status" },
                    { name: "sort", type: "object", required: false, description: "Sort fields" }
                  ]
                },
                {
                  id: "im-collection-filter",
                  method: "POST",
                  path: "/App/master/itemfilter",
                  title: "Filter metadata (Collection)",
                  requestBody: { type: "Collection" },
                  response: { code: 200, data: { code: [], name: [] }, note: "Replace with your itemfilter response." },
                  params: [
                    { name: "authorization", type: "string", required: true, in: "header", description: "JWT (lowercase authorization in UAT)." },
                    { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                    { name: "type", type: "string", required: true, description: "Collection" }
                  ]
                }
              ]
            },
            {
              id: "im-style",
              label: "Style",
              endpoints: [
                {
                  id: "im-style-edit",
                  method: "POST",
                  path: "/App/master/itemMasteredit",
                  title: "Create / update (Style)",
                  description: "Same route; type Style.",
                  requestBody: { id: "", type: "Style", name: "a", code: "a", Status: "1", mixMatch: 0, edit: false, image: "" },
                  response: { code: 200, message: "Saved successfully", data: { _id: "68a1b2c3d4e5f6789012348", type: "Style" }, note: "Replace with your API response." },
                  params: [
                    { name: "authorization", type: "string", required: true, in: "header", description: "JWT (lowercase authorization in UAT)." },
                    { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                    { name: "type", type: "string", required: true, description: "Style" },
                    { name: "id", type: "string", required: false, description: "Record id when editing" },
                    { name: "name", type: "string", required: true, description: "Display name" },
                    { name: "code", type: "string", required: true, description: "Code" },
                    { name: "Status", type: "string", required: true, description: "1 active, 0 inactive" },
                    { name: "mixMatch", type: "integer", required: false, description: "Mix/match flag" },
                    { name: "edit", type: "boolean", required: true, description: "false = create, true = update" },
                    { name: "image", type: "string", required: false, description: "Image URL or key" }
                  ]
                },
                {
                  id: "im-style-view",
                  method: "POST",
                  path: "/App/master/itemMasterView",
                  title: "List / view (Style)",
                  requestBody: { search: "", type: "Style", limit: 100, skip: 0, filter: { code: [], name: [], mixMatch: "", status: "" }, sort: {} },
                  response: { code: 200, total: 15, data: [{ _id: "68a1b2c3d4e5f6789012348", name: "Classic", code: "CL" }], note: "Replace with your itemMasterView response." },
                  params: [
                    { name: "authorization", type: "string", required: true, in: "header", description: "JWT (lowercase authorization in UAT)." },
                    { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                    { name: "type", type: "string", required: true, description: "Style" },
                    { name: "search", type: "string", required: false, description: "Search text" },
                    { name: "limit", type: "integer", required: false, description: "Page size" },
                    { name: "skip", type: "integer", required: false, description: "Offset" },
                    { name: "filter", type: "object", required: false, description: "code[], name[], mixMatch, status" },
                    { name: "sort", type: "object", required: false, description: "Sort fields" }
                  ]
                },
                {
                  id: "im-style-filter",
                  method: "POST",
                  path: "/App/master/itemfilter",
                  title: "Filter metadata (Style)",
                  requestBody: { type: "Style" },
                  response: { code: 200, data: { code: [], name: [] }, note: "Replace with your itemfilter response." },
                  params: [
                    { name: "authorization", type: "string", required: true, in: "header", description: "JWT (lowercase authorization in UAT)." },
                    { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                    { name: "type", type: "string", required: true, description: "Style" }
                  ]
                }
              ]
            },
            {
              id: "im-ecommerce-category",
              label: "eCommerce Category",
              endpoints: [
                {
                  id: "im-ecom-edit",
                  method: "POST",
                  path: "/App/master/itemMasteredit",
                  title: "Create / update (eCommerce Category)",
                  description: "Same route; type must match what the admin app sends (often eCommerce Category). Verify in DevTools if a variant string is used.",
                  requestBody: { id: "", type: "eCommerce Category", name: "a", code: "a", Status: "1", mixMatch: 0, edit: false, image: "" },
                  response: { code: 200, message: "Saved successfully", data: { _id: "68a1b2c3d4e5f6789012349", type: "eCommerce Category" }, note: "Replace with your API response." },
                  params: [
                    { name: "authorization", type: "string", required: true, in: "header", description: "JWT (lowercase authorization in UAT)." },
                    { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                    { name: "type", type: "string", required: true, description: "eCommerce Category (confirm exact string from network tab)" },
                    { name: "id", type: "string", required: false, description: "Record id when editing" },
                    { name: "name", type: "string", required: true, description: "Display name" },
                    { name: "code", type: "string", required: true, description: "Code" },
                    { name: "Status", type: "string", required: true, description: "1 active, 0 inactive" },
                    { name: "mixMatch", type: "integer", required: false, description: "Mix/match flag" },
                    { name: "edit", type: "boolean", required: true, description: "false = create, true = update" },
                    { name: "image", type: "string", required: false, description: "Image URL or key" }
                  ]
                },
                {
                  id: "im-ecom-view",
                  method: "POST",
                  path: "/App/master/itemMasterView",
                  title: "List / view (eCommerce Category)",
                  requestBody: { search: "", type: "eCommerce Category", limit: 100, skip: 0, filter: { code: [], name: [], mixMatch: "", status: "" }, sort: {} },
                  response: { code: 200, total: 6, data: [{ _id: "68a1b2c3d4e5f6789012349", name: "Rings", code: "EC-RG" }], note: "Replace with your itemMasterView response." },
                  params: [
                    { name: "authorization", type: "string", required: true, in: "header", description: "JWT (lowercase authorization in UAT)." },
                    { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                    { name: "type", type: "string", required: true, description: "eCommerce Category" },
                    { name: "search", type: "string", required: false, description: "Search text" },
                    { name: "limit", type: "integer", required: false, description: "Page size" },
                    { name: "skip", type: "integer", required: false, description: "Offset" },
                    { name: "filter", type: "object", required: false, description: "code[], name[], mixMatch, status" },
                    { name: "sort", type: "object", required: false, description: "Sort fields" }
                  ]
                },
                {
                  id: "im-ecom-filter",
                  method: "POST",
                  path: "/App/master/itemfilter",
                  title: "Filter metadata (eCommerce Category)",
                  requestBody: { type: "eCommerce Category" },
                  response: { code: 200, data: { code: [], name: [] }, note: "Replace with your itemfilter response." },
                  params: [
                    { name: "authorization", type: "string", required: true, in: "header", description: "JWT (lowercase authorization in UAT)." },
                    { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                    { name: "type", type: "string", required: true, description: "eCommerce Category" }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: "metal-master",
          label: "Metal Master",
          color: "#f59e0b",
          endpoints: [
            {
              id: "metal-master-view",
              method: "POST",
              path: "/App/master/metalMasterView",
              title: "List (Metal / Color)",
              description: "Returns a paginated list for Metal Master. Use `type: \"Metal\"` for metal rows and `type: \"Color\"` for metal colors.",
              requestBody: {
                search: "",
                type: "Metal",
                limit: 100,
                skip: 0,
                filter: { code: [], name: [], status: "", color: [] },
                sort: {}
              },
              response: {
                code: 200,
                total: 2,
                data: [
                  { _id: "69c40f2ada69440ec5e2dbb1", type: "Metal", name: "Gold", code: "AU", Status: "1", ColorData: "68e9b53b8d2b1052bee79570" },
                  { _id: "69c40fe0da69440ec5e2dc25", type: "Color", name: "Yellow", code: "YEL", Status: "1", colorCode: "#f2f2f2" }
                ],
                note: "Sample shape. Fields may vary slightly by type."
              },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login (UAT uses lowercase `authorization` header and raw token; no Bearer prefix required)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "search", type: "string", required: false, description: "Search by name/code (server-side)" },
                { name: "type", type: "string", required: true, description: "Metal | Color" },
                { name: "limit", type: "integer", required: false, description: "Page size" },
                { name: "skip", type: "integer", required: false, description: "Offset" },
                { name: "filter", type: "object", required: false, description: "For Metal: { code[], name[], status, color[] }. For Color: { code[], name[], status }" },
                { name: "sort", type: "object", required: false, description: "Sort object (leave {} if unused)" }
              ]
            },
            {
              id: "metal-master-edit",
              method: "POST",
              path: "/App/master/metalMasterEdit",
              title: "Create / Edit (Metal / Color)",
              description: "Single route used for both Metal and Color. Body fields differ slightly by `type`.",
              requestBody: {
                id: "",
                name: "aa",
                code: "aa",
                Status: "1",
                ColorData: "68e9b53b8d2b1052bee79570",
                edit: false,
                type: "Metal"
              },
              response: { code: 200, message: "Saved successfully", data: { _id: "69c40f2ada69440ec5e2dbb1" }, note: "Replace with your live response." },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login (lowercase `authorization` in UAT)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "id", type: "string", required: false, description: "Empty = create, set id = update" },
                { name: "type", type: "string", required: true, description: "Metal | Color" },
                { name: "name", type: "string", required: true, description: "Display name" },
                { name: "code", type: "string", required: true, description: "Code" },
                { name: "Status", type: "string", required: true, description: "1=active, 0=inactive (string in payload)" },
                { name: "edit", type: "boolean", required: true, description: "false=create, true=edit" },
                { name: "ColorData", type: "string", required: false, description: "Metal only: selected Color record id" },
                { name: "colorCode", type: "string", required: false, description: "Color only: hex code, e.g. #f2f2f2" }
              ]
            },
            {
              id: "metal-master-filter",
              method: "POST",
              path: "/App/master/metalfilter",
              title: "Filter metadata (Metal / Color)",
              description: "Returns filter dropdown values for Metal Master screens based on `type`.",
              requestBody: { type: "Metal" },
              response: { code: 200, data: { code: [], name: [], status: [], color: [] }, note: "Response keys may vary by type." },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login (lowercase `authorization` in UAT)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "type", type: "string", required: true, description: "Metal | Color" }
              ]
            },
            {
              id: "metal-master-delete",
              method: "POST",
              path: "/App/master/metalMasterDelete",
              title: "Delete (Metal / Color)",
              description: "Deletes a Metal or Color record by id. Pass the same `type` used to create it.",
              requestBody: { type: "Metal", id: "69c40f2ada69440ec5e2dbb1" },
              response: { code: 200, message: "Deleted successfully", note: "Replace with your live response." },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login (lowercase `authorization` in UAT)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "type", type: "string", required: true, description: "Metal | Color" },
                { name: "id", type: "string", required: true, description: "Record id to delete" }
              ]
            }
          ]
        },
        {
          id: "stone-master",
          label: "Stone Master",
          color: "#ec4899",
          endpoints: [
            {
              id: "stone-master-create",
              method: "POST",
              path: "/App/master/stoneMasterCreate",
              title: "Create (Stone Master)",
              description: "Creates a master record by `type`. Supported types: `StoneGroup`, `Stone`, `Color`, `SIZE`, `Shape`, `Cut`, `Clarity`, `SettingType`.",
              requestBody: {
                type: "SIZE",
                data: {
                  logo: "https://gis247.net/assets/images/icon/camera_profile.png",
                  name: "stone size",
                  code: "jjjjj2",
                  mixMatch: 0,
                  Status: "1"
                }
              },
              response: {
                code: 200,
                message: "Created successfully",
                data: { _id: "67d954f2d02bbfe12b516fc1", type: "SIZE", name: "stone size", code: "jjjjj2" },
                note: "For `type: Stone`, include `data.stonegroup`."
              },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login (lowercase `authorization` in UAT)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "type", type: "string", required: true, description: "StoneGroup | Stone | Color | SIZE | Shape | Cut | Clarity | SettingType" },
                { name: "data.logo", type: "string", required: false, description: "Image URL" },
                { name: "data.name", type: "string", required: true, description: "Display name" },
                { name: "data.code", type: "string", required: true, description: "Code" },
                { name: "data.mixMatch", type: "integer", required: false, description: "0 or 1" },
                { name: "data.Status", type: "string", required: true, description: "1=active, 0=inactive" },
                { name: "data.stonegroup", type: "string", required: false, description: "Required when `type` is `Stone`" }
              ]
            },
            {
              id: "stone-master-edit",
              method: "POST",
              path: "/App/master/stoneMasterEdit",
              title: "Edit (Stone Master)",
              description: "Updates a record by `id` + `type`. Body uses the same `data` structure as create.",
              requestBody: {
                type: "SIZE",
                id: "67d954f2d02bbfe12b516fc1",
                data: {
                  logo: "https://gis247.net/assets/images/icon/camera_profile.png",
                  name: "1.25MM",
                  code: "6787",
                  mixMatch: 0,
                  Status: "1"
                }
              },
              response: {
                code: 200,
                message: "Updated successfully",
                data: { _id: "67d954f2d02bbfe12b516fc1", type: "SIZE", name: "1.25MM", code: "6787" },
                note: "For `type: Stone`, pass `data.stonegroup` if required by backend rules."
              },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login (lowercase `authorization` in UAT)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "type", type: "string", required: true, description: "StoneGroup | Stone | Color | SIZE | Shape | Cut | Clarity | SettingType" },
                { name: "id", type: "string", required: true, description: "Record id to update" },
                { name: "data.logo", type: "string", required: false, description: "Image URL" },
                { name: "data.name", type: "string", required: true, description: "Display name" },
                { name: "data.code", type: "string", required: true, description: "Code" },
                { name: "data.mixMatch", type: "integer", required: false, description: "0 or 1" },
                { name: "data.Status", type: "string", required: true, description: "1=active, 0=inactive" },
                { name: "data.stonegroup", type: "string", required: false, description: "Required when `type` is `Stone`" }
              ]
            },
            {
              id: "stone-master-list",
              method: "POST",
              path: "/app/master/stoneMasterList",
              title: "List (Stone Master)",
              description: "Paged list endpoint for all stone-related master types.",
              requestBody: {
                type: "Stone",
                search: "",
                limit: 1000,
                skip: 0,
                filter: { code: [], name: [], status: "" },
                sort: {}
              },
              response: {
                code: 200,
                total: 2,
                data: [
                  { _id: "653110e0d141d5365b7049f8", name: "Round", code: "RD", type: "Shape", Status: "1" },
                  { _id: "635648f9b645d00d7b1875dd", name: "Prong", code: "PRG", type: "SettingType", Status: "1" }
                ],
                note: "Use `type` to fetch Stone, Color, SettingType, SIZE, etc."
              },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login (lowercase `authorization` in UAT)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "type", type: "string", required: true, description: "StoneGroup | Stone | Color | SIZE | Shape | Cut | Clarity | SettingType" },
                { name: "search", type: "string", required: false, description: "Search text" },
                { name: "limit", type: "integer", required: false, description: "Page size" },
                { name: "skip", type: "integer", required: false, description: "Offset" },
                { name: "filter", type: "object", required: false, description: "filter.code[], filter.name[], filter.status" },
                { name: "sort", type: "object", required: false, description: "Sort object" }
              ]
            },
            {
              id: "stone-master-view",
              method: "POST",
              path: "/master/stoneMasterview",
              title: "View Single (Stone Master)",
              description: "Returns one record by id and type.",
              requestBody: { id: "635648f9b645d00d7b1875dd", type: "SettingType" },
              response: { code: 200, data: { _id: "635648f9b645d00d7b1875dd", type: "SettingType", name: "Prong", code: "PRG", Status: "1" } },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login (lowercase `authorization` in UAT)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "id", type: "string", required: true, description: "Record id" },
                { name: "type", type: "string", required: true, description: "StoneGroup | Stone | Color | SIZE | Shape | Cut | Clarity | SettingType" }
              ]
            },
            {
              id: "stone-master-delete",
              method: "POST",
              path: "/master/stoneMasterDelete",
              title: "Delete (Stone Master)",
              description: "Deletes one record by id and type.",
              requestBody: { id: "653110e0d141d5365b7049f8", type: "SettingType" },
              response: { code: 200, message: "Deleted successfully" },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login (lowercase `authorization` in UAT)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "id", type: "string", required: true, description: "Record id to delete" },
                { name: "type", type: "string", required: true, description: "StoneGroup | Stone | Color | SIZE | Shape | Cut | Clarity | SettingType" }
              ]
            }
          ]
        },
        {
          id: "service-labour",
          label: "Service Labour",
          color: "#10b981",
          endpoints: [
            {
              id: "service-labour-create",
              method: "POST",
              path: "/master/serviceLabourMasterCreate",
              title: "Create Service Labour",
              description: "Creates a new service labour row.",
              requestBody: {
                name: "VIP Service",
                code: "SER-008",
                currency: "",
                price: "",
                Status: "1"
              },
              response: { code: 200, message: "Created successfully", data: { _id: "68021d160407b789b80e1663", name: "VIP Service", code: "SER-008" } },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login (lowercase `authorization` in UAT)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "name", type: "string", required: true, description: "Service name" },
                { name: "code", type: "string", required: true, description: "Service code" },
                { name: "currency", type: "string", required: false, description: "Currency code (can be empty)" },
                { name: "price", type: "string", required: false, description: "Price string (can be empty)" },
                { name: "Status", type: "string", required: true, description: "1=active, 0=inactive" }
              ]
            },
            {
              id: "service-labour-list",
              method: "POST",
              path: "/master/serviceLabourMasterList",
              title: "List Service Labour",
              description: "Lists service labour rows with optional price range filter.",
              requestBody: {
                search: "",
                filter: { pricemin: 100.3, pricemax: 400 }
              },
              response: { code: 200, total: 1, data: [{ _id: "68021d160407b789b80e1663", name: "VIP Service", code: "SER-008", price: 250 }] },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login (lowercase `authorization` in UAT)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "search", type: "string", required: false, description: "Search text" },
                { name: "filter.pricemin", type: "number", required: false, description: "Min price" },
                { name: "filter.pricemax", type: "number", required: false, description: "Max price" }
              ]
            },
            {
              id: "service-labour-edit",
              method: "POST",
              path: "/App/master/serviceLabourMasterEdit",
              title: "Edit Service Labour",
              description: "Updates an existing service labour record.",
              requestBody: {
                name: "Re-sizing",
                code: "Re-sizing",
                currency: "",
                price: "",
                Status: "1",
                id: "68021d160407b789b80e1663"
              },
              response: { code: 200, message: "Updated successfully", data: { _id: "68021d160407b789b80e1663", name: "Re-sizing", code: "Re-sizing" } },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login (lowercase `authorization` in UAT)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "id", type: "string", required: true, description: "Record id to update" },
                { name: "name", type: "string", required: true, description: "Service name" },
                { name: "code", type: "string", required: true, description: "Service code" },
                { name: "currency", type: "string", required: false, description: "Currency code (can be empty)" },
                { name: "price", type: "string", required: false, description: "Service charge amount (string)" },
                { name: "Status", type: "string", required: true, description: "1=active, 0=inactive" }
              ]
            }
          ]
        },
        {
          id: "vendor-master",
          label: "Vendor",
          color: "#14b8a6",
          endpoints: [
            {
              id: "vendor-list",
              method: "POST",
              path: "/App/master/vendorMasterView",
              title: "Get Vendor List",
              description: "Retrieve all registered vendors/suppliers.",
              requestBody: { search: "", limit: 100, skip: 0, filter: { status: "" }, sort: {} },
              response: { success: true, total: 2, data: [{ _id: "ven_001", name: "De Beers Diamonds", code: "DEB", contact: "orders@debeers.com" }] },
              params: [
                { name: "search", type: "string", required: false, description: "Search keyword" },
                { name: "limit", type: "integer", required: false, description: "Records to return" },
                { name: "skip", type: "integer", required: false, description: "Records to skip" }
              ]
            },
            {
              id: "vendor-edit",
              method: "POST",
              path: "/App/master/vendorMasterEdit",
              title: "Create / Edit Vendor",
              description: "Create or update a vendor/supplier record.",
              requestBody: { id: "", name: "De Beers Diamonds", code: "DEB", contact: "orders@debeers.com", payment_terms: "NET30", Status: "1" },
              response: { success: true, message: "Vendor saved", data: { _id: "ven_001", name: "De Beers Diamonds", code: "DEB" } },
              params: [
                { name: "id", type: "string", required: false, description: "Leave empty to create" },
                { name: "name", type: "string", required: true, description: "Vendor name" },
                { name: "code", type: "string", required: true, description: "Vendor code" },
                { name: "payment_terms", type: "string", required: false, description: "NET30 | NET60 | COD" }
              ]
            }
          ]
        },
        {
          id: "voucher-type",
          label: "Voucher Type",
          color: "#ef4444",
          endpoints: [
            {
              id: "voucher-master-list",
              method: "POST",
              path: "/App/master/voucherMasterList",
              title: "Get Voucher Type List",
              description: "Retrieve all voucher master records used across inventory and POS.",
              requestBody: { search: "", limit: 100, skip: 0, filter: { code: [], name: [], status: "", group: [], location: [] }, sort: {} },
              response: { success: true, total: 5, data: [{ _id: "vt_001", name: "Purchase Order", code: "PO", group: "Purchase_Order" }, { _id: "vt_002", name: "Sales", code: "SR", group: "Sale" }] },
              params: [
                { name: "search", type: "string", required: false, description: "Search keyword" },
                { name: "limit", type: "integer", required: false, description: "Records to return" },
                { name: "filter.group", type: "array", required: false, description: "Filter by group" }
              ]
            },
            {
              id: "voucher-master-edit",
              method: "POST",
              path: "/App/master/voucherMasterEdit",
              title: "Create / Edit Voucher Type",
              description: "Create or update a voucher type (Purchase Order, Sale, Stock Transfer etc.).",
              requestBody: { id: "", name: "Purchase Order", code: "PO", group: "Purchase_Order", Methodofvouvher: "", widthStartNumber: "", prefillWithZero: "0", Configuration: { conf_date: "2025-05-06T09:58:51.878Z", conf_prefix: "PO", conf_startno: "1001", conf_suffix: "" } },
              response: { success: true, message: "Voucher type saved", data: { _id: "vt_001", name: "Purchase Order", code: "PO" } },
              params: [
                { name: "id", type: "string", required: false, description: "Leave empty to create" },
                { name: "name", type: "string", required: true, description: "Voucher name" },
                { name: "code", type: "string", required: true, description: "Voucher code" },
                { name: "group", type: "string", required: true, description: "Purchase_Order | Sale | Stock_Transfer | Custom_Order" },
                { name: "Configuration", type: "object", required: false, description: "Numbering configuration" }
              ]
            },
            {
              id: "location-by-voucher",
              method: "POST",
              path: "/App/master/locatioByvoucher",
              title: "Get Locations by Voucher",
              description: "Retrieve all locations associated with a specific voucher.",
              requestBody: { id: "68022b6cc20495774f136d26" },
              response: { success: true, data: [{ _id: "loc_001", name: "Main Store" }, { _id: "loc_002", name: "Central World Branch" }] },
              params: [
                { name: "id", type: "string", required: true, description: "Voucher ID" }
              ]
            }
          ]
        },
        {
          id: "currency-master",
          label: "Currency",
          color: "#f59e0b",
          endpoints: [
            {
              id: "currency-master-edit",
              method: "POST",
              path: "/App/master/currencyMasterEdit",
              title: "Create / Edit Currency",
              description: "Add or update currency exchange rates for the organization.",
              requestBody: { currencyarr: [{ flag: "thb.png", currency: "THB", rate: 1, Status: "1", is_default: 1, is_delete: 0 }, { flag: "usd.png", currency: "USD", rate: 0.028, Status: "1", is_default: 0, is_delete: 0 }] },
              response: { success: true, message: "Currencies updated successfully" },
              params: [
                { name: "currencyarr", type: "array", required: true, description: "Array of currency objects" },
                { name: "currencyarr[].currency", type: "string", required: true, description: "ISO 4217 code e.g. THB, USD" },
                { name: "currencyarr[].rate", type: "float", required: true, description: "Exchange rate vs base currency" },
                { name: "currencyarr[].is_default", type: "integer", required: false, description: "1=default currency" }
              ]
            }
          ]
        }
      ]
    };
