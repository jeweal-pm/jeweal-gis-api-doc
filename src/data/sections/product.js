export default {
      id: "product",
      label: "Product",
      icon: "💍",
      color: "#f59e0b",
      description: "Product catalog management — general, advanced, listing, variants and design options",
      subsections: [
        {
          id: "product-general",
          label: "General Info",
          color: "#f59e0b",
          endpoints: [
            {
              id: "save-general",
              method: "POST",
              path: "/App/product/saveGeneral",
              title: "Create / Edit Product General",
              description: "Creates a product when `product_id` is empty; updates when `product_id` is provided.",
              requestBody: {
                Item: "",
                Gender: [],
                name: "NOBLE",
                Matatag: "INFINI RING WITH FULL DIAMOND",
                Description: "INFINI RING WITH FULL DIAMOND...",
                ID: "ABN02123",
                upc_no: "",
                SKU: "SB032123",
                product_tags: "",
                Additional_loyalty_points: "",
                product_image: "",
                Category: [],
                ConsumerLifestage_: [],
                SpecifiedOccasion: [],
                status: "1",
                product_variants_enable: "0",
                Collection: "",
                Style: "",
                alternateDescription: [],
                Point_of_sale: 1,
                Point_of_sale_eCommerce: 1,
                product_id: ""
              },
              response: { code: 200, message: "Saved successfully", data: { _id: "67d137f46dcac8da6b25bcdd", SKU: "SB032123", name: "NOBLE" } },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login (lowercase `authorization` in UAT)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "product_id", type: "string", required: false, description: "Leave empty to create, provide ID to edit" },
                { name: "name", type: "string", required: true, description: "Product display name" },
                { name: "SKU", type: "string", required: true, description: "Unique stock keeping unit" },
                { name: "ID", type: "string", required: false, description: "Product ID / barcode" },
                { name: "Item", type: "string", required: true, description: "Item category ID (Ring, Necklace etc.)" },
                { name: "Collection", type: "string", required: false, description: "Collection ID" },
                { name: "Style", type: "string", required: false, description: "Style ID" },
                { name: "status", type: "string", required: false, description: "1=active 0=inactive" },
                { name: "product_variants_enable", type: "string", required: false, description: "0=no variants 1=has variants" },
                { name: "Point_of_sale", type: "integer", required: false, description: "1=show in POS" },
                { name: "Point_of_sale_eCommerce", type: "integer", required: false, description: "1=show in eCommerce" }
              ]
            },
            {
              id: "get-product-list",
              method: "POST",
              path: "/app/product/getproductList",
              title: "Get Product List",
              description: "Lists products with search and optional Item/Collection filters.",
              requestBody: { search: "", limit: "", skip: 0, Item: [], Collection: [] },
              response: { code: 200, total: 2, data: [{ _id: "67d137f46dcac8da6b25bcdd", name: "NOBLE", SKU: "SB032123" }] },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login (lowercase `authorization` in UAT)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "search", type: "string", required: false, description: "Search by name/SKU/ID" },
                { name: "limit", type: "integer|string", required: false, description: "Page size (backend also accepts empty string)" },
                { name: "skip", type: "integer", required: false, description: "Offset" },
                { name: "Item", type: "array", required: false, description: "Array of Item ids" },
                { name: "Collection", type: "array", required: false, description: "Array of Collection ids" }
              ]
            }
          ]
        },
        {
          id: "product-advanced",
          label: "Advanced",
          color: "#6366f1",
          endpoints: [
            {
              id: "save-advance",
              method: "POST",
              path: "/app/product/saveAdvancep",
              title: "Save Product Advanced",
              description: "Saves advanced product data: metal/color/size, weights, stones, stock details, and price details.",
              requestBody: {
                _id: "681b3604ded9f18c1c6828ee",
                labor: "3.90",
                CostPrice: "3.90",
                name: "mac laptop",
                ID: "74066584",
                SKU: "A889897008",
                Metal: "665fe412368c8b6d8b55d2aa",
                Color: "665fe412368c8b6d8b55d29e",
                Size: "665fe415368c8b6d8b55d4f6",
                Category: ["66625d9dc0bbb842d649acb1"],
                product_variants_enable: "1",
                GrossWt: "10.00",
                NetWt: "8.00",
                Unit: "Pcs",
                Stones: [{ stone_group: "665fe415368c8b6d8b55d4c9", stone: "665fe415368c8b6d8b55d4cc", Unit: "Cts", Cts: 0, Price: 0 }],
                OtherDetails: [{ location: "681091c636b7487309838070", currentstock: 0, availablestock: 0, reorderpoint: 1, reorderquantity: 1 }],
                PriceDetails: [{ location: "681091c636b7487309838070", currency: "USD", taxrate: "614e7ec10a33955e7a77a598", taxType: "Inclusive", tax_rate_val: "5", retailprice_Inc: "4300", tax: "204.76", retailprice_Ex: "4.095.24" }],
                stones: [{ StoneGroup: "665fe415368c8b6d8b55d4c9", Stone: "665fe415368c8b6d8b55d4cc", WeightType: "Cts", stonePrice: 0 }],
                product_id: "67d137f46dcac8da6b25bcdd",
                additional_product_image: ["data:image/jpeg;base64,<truncated>"]
              },
              response: { code: 200, message: "Advanced saved", data: { _id: "681b3604ded9f18c1c6828ee" } },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login (lowercase `authorization` in UAT)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "_id", type: "string", required: true, description: "Product ID" },
                { name: "Metal", type: "string", required: false, description: "Metal ID" },
                { name: "Color", type: "string", required: false, description: "Metal color ID" },
                { name: "Size", type: "string", required: false, description: "Size ID" },
                { name: "GrossWt", type: "string", required: false, description: "Gross weight in grams" },
                { name: "NetWt", type: "string", required: false, description: "Net weight in grams" },
                { name: "labor", type: "string|number", required: false, description: "Labour charge" },
                { name: "CostPrice", type: "string|number", required: false, description: "Cost price" },
                { name: "Stones", type: "array", required: false, description: "Legacy stones array (capital S)" },
                { name: "stones", type: "array", required: false, description: "Normalized stones array (lowercase)" },
                { name: "OtherDetails", type: "array", required: false, description: "Stock/reorder details by location" },
                { name: "PriceDetails", type: "array", required: false, description: "Price/tax details by location and currency" }
              ]
            },
            {
              id: "get-advance",
              method: "POST",
              path: "/product/getAdvance",
              title: "Get Product Advanced Info",
              description: "Retrieve advanced details for a specific product.",
              requestBody: { id: "68cba352b909aaa16bd33b60" },
              response: { success: true, data: { _id: "68cba352b909aaa16bd33b60", Metal: { name: "Gold", code: "GLD" }, GrossWt: "5.20", stones: [{ name: "Round Diamond", Cts: "1.00" }] } },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login (lowercase `authorization` in UAT)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "id", type: "string", required: true, description: "Product ID" }
              ]
            }
          ]
        },
        {
          id: "product-variants",
          label: "Variants",
          color: "#ec4899",
          endpoints: [
            {
              id: "create-variants",
              method: "POST",
              path: "/product/createVariants",
              title: "Create Variants Matrix",
              description: "Defines option sets (Metal/Stone/Size etc.) used to generate product variant combinations.",
              requestBody: {
                id: "666aa9d4f83196ba2606308d",
                variants: [
                  { title: "Metal", status: 1, values: [{ value: "665fe412368c8b6d8b55d2aa_Metal", label: "White gold", code: "WG", text: "White gold", id: "665fe412368c8b6d8b55d2aa", isFixed: true }] },
                  { title: "Stone", status: 1, values: [{ value: "665fe415368c8b6d8b55d4cc_Stone", label: "Sea blue Chalcedony", code: "BC", text: "Sea blue Chalcedony", id: "665fe415368c8b6d8b55d4cc", isFixed: true }] },
                  { title: "Size", status: 1, values: [{ value: "665fe415368c8b6d8b55d4f6_Size", label: "XXXS", code: "-XXXS", text: "XXXS", id: "665fe415368c8b6d8b55d4f6", isFixed: true }] }
                ]
              },
              response: { success: true, message: "Variants created successfully", total_combinations: 4 },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login (lowercase `authorization` in UAT)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "id", type: "string", required: true, description: "Product ID" },
                { name: "variants", type: "array", required: true, description: "Array of variant types (Metal, Stone, Size)" },
                { name: "variants[].title", type: "string", required: true, description: "Variant type name" },
                { name: "variants[].values", type: "array", required: true, description: "Array of variant options" }
              ]
            },
            {
              id: "save-variants",
              method: "POST",
              path: "/product/saveVariants",
              title: "Save Variants",
              description: "Saves generated variant rows, inventory/price per location, and options metadata.",
              requestBody: {
                id: "614de5b40ebdd223291d3031",
                variants: [{ status: 1, image: "", sku: "AVEN-B218K+CH-XXS", id: "100002-1", size: "60f1a3a27c8bcc0d69145f84", metal: "60f1a3062a54c452df3822e6", stone: "60f2447e39734516ea523132", currency: [{ currency: "USD", location_id: "60f192080bb1d6714d2b0992", price: 0, ROP: 0, ROQ: 0 }] }],
                Optionsvariants: [{ title: "Metal", status: 1, values: [{ id: "5fe6b3ccfc4ac32c1a114873", text: "YG", code: "YG" }] }]
              },
              response: { code: 200, message: "Variants saved", data: { id: "614de5b40ebdd223291d3031", count: 1 } },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login (lowercase `authorization` in UAT)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "id", type: "string", required: true, description: "Product ID" },
                { name: "variants", type: "array", required: true, description: "Variant rows to store" },
                { name: "Optionsvariants", type: "array", required: false, description: "Selected option groups metadata" }
              ]
            },
            {
              id: "view-variants",
              method: "POST",
              path: "/product/viewVariants",
              title: "View Variants",
              description: "Returns variant options currently assigned to the given product.",
              requestBody: {
                id: "666aa403760add08442790cc",
                variants: [{ title: "Metal", status: 1, values: [{ value: "665fe42c368c8b6d8b55e672_Metal", label: "Rose gold", code: "RG", text: "Rose gold", id: "665fe42c368c8b6d8b55e672", isFixed: true }] }]
              },
              response: { code: 200, data: { id: "666aa403760add08442790cc", variants: [{ title: "Metal", status: 1 }] } },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login (lowercase `authorization` in UAT)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "id", type: "string", required: true, description: "Product ID" }
              ]
            }
          ]
        },
        {
          id: "product-design",
          label: "Design & Helpers",
          color: "#84cc16",
          endpoints: [
            {
              id: "create-design",
              method: "POST",
              path: "/product/createDesign",
              title: "Create Design Options",
              description: "Stores design option sets such as Shape, Pointer, and Location for a product.",
              requestBody: {
                id: "614de5b40ebdd223291d302f",
                design: [
                  { title: "Shape", status: 1, values: [{ value: "60f1a76bf4e49a17741a4ce2", label: "Oval" }] },
                  { title: "Pointer", status: 1, values: [{ value: "0.30", label: "0.30" }] },
                  { title: "Location", status: 1, values: [{ value: "60f192080bb1d6714d2b0992", label: "LUXURY DESIGN" }] }
                ]
              },
              response: { code: 200, message: "Design saved", data: { id: "614de5b40ebdd223291d302f" } },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login (lowercase `authorization` in UAT)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "id", type: "string", required: true, description: "Product ID" },
                { name: "design", type: "array", required: true, description: "Array of design groups and values" }
              ]
            },
            {
              id: "get-design-options",
              method: "POST",
              path: "/product/getDesignOptions",
              title: "Get Design Options",
              description: "Returns saved design option groups for a product.",
              requestBody: { id: "614de5b40ebdd223291d302f" },
              response: { code: 200, data: [{ title: "Shape", values: [{ value: "60f1a79c08abda2653111562", label: "Round" }] }] },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login (lowercase `authorization` in UAT)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "id", type: "string", required: true, description: "Product ID" }
              ]
            },
            {
              id: "get-pointer-by-shape-id",
              method: "POST",
              path: "/App/product/getPointerByShapeID",
              title: "Get Pointer by Shape ID",
              description: "Returns pointer values available for a given shape id.",
              requestBody: { shape_id: "60f1a79c08abda2653111562" },
              response: { code: 200, data: [{ value: "0.30", label: "0.30" }, { value: "0.40", label: "0.40" }] },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login (lowercase `authorization` in UAT)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "shape_id", type: "string", required: true, description: "Shape ID" }
              ]
            },
            {
              id: "get-shape-to-stone-size",
              method: "POST",
              path: "/App/product/getShapeToStoneSize",
              title: "Get Shape to Stone Size",
              description: "Retrieve stone sizes available for a specific stone shape.",
              requestBody: { shape_id: "636cc15cc734e545a850dd5f" },
              response: { success: true, data: [{ _id: "ss_001", label: "0.50ct", carat: 0.5, diameter_mm: 5.1 }, { _id: "ss_002", label: "1.00ct", carat: 1.0, diameter_mm: 6.4 }] },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login (lowercase `authorization` in UAT)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "shape_id", type: "string", required: true, description: "Stone shape ID" }
              ]
            }
          ]
        }
      ]
    };
