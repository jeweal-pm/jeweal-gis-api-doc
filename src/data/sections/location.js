export default {
      id: "location",
      label: "Location",
      icon: "📍",
      color: "#14b8a6",
      description: "Stores, warehouses, and eCommerce locations: create, update, paginated list, and filter metadata. Field names match backend (Dateformat, Thousandseparator, TimeZone, etc.).",
      subsections: [
        {
          id: "location-crud",
          label: "Create & update",
          color: "#14b8a6",
          endpoints: [
            {
              id: "location-create",
              method: "POST",
              path: "/App/location/createLocation",
              title: "Create location",
              description: "Create a new location. Sample values are realistic demos — replace tax IDs, country codes, and media URLs with your environment.",
              requestBody: {
                name: "Demo Jewelry Bangkok",
                type: "Store",
                room: "1",
                Dateformat: "d/m/Y",
                code: "BKK-01",
                Thousandseparator: ",",
                TimeZone: "Asia/Bangkok",
                address: "999 Rama I Road, Pathum Wan",
                branch_id: "",
                city: "Bangkok",
                contacts: [{ icon: 1, phoneCode: "+66", no: "212345678" }],
                country: "217",
                currency: "THB",
                domainID: [],
                email: "bangkok.store@gis247.net",
                location_logo: "",
                schedule: [],
                state: "Bangkok",
                tax: "634f694d17ae947408110e41",
                tax_id: "",
                thumb: "",
                website: "https://api2uat.gis247.net",
                websiteInfo: {
                  name: "Demo Jewelry Bangkok",
                  metaTitle: "GIS Bangkok Store",
                  metaDescription: "Flagship retail location — Bangkok.",
                  logo: "",
                  favicon: "",
                  theme: "template_one"
                },
                zipcode: "10330"
              },
              response: {
                code: 200,
                message: "Location created successfully",
                id: "681091c636b7487309838070",
                note: "Replace with your API response shape."
              },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT (lowercase authorization in UAT)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "name", type: "string", required: true, description: "Location display name" },
                { name: "type", type: "string", required: true, description: "Store | eCommerce | Warehouse, etc." },
                { name: "code", type: "string", required: true, description: "Unique location code" },
                { name: "city / state / zipcode", type: "string", required: false, description: "Address fields" },
                { name: "currency", type: "string", required: false, description: "Default currency code" },
                { name: "tax", type: "string", required: false, description: "Tax configuration id" },
                { name: "contacts", type: "array", required: false, description: "Phone lines: icon, phoneCode, no" },
                { name: "websiteInfo", type: "object", required: false, description: "SEO / theme for eCommerce sites" }
              ]
            },
            {
              id: "location-update",
              method: "POST",
              path: "/App/location/updateLocation",
              title: "Update location",
              description: "Update an existing location. Include id from list/detail. Schedule uses backend field names (closeing_time, formate_opentime, etc.).",
              requestBody: {
                id: "681091c636b7487309838070",
                name: "Demo Jewelry New York",
                type: "eCommerce",
                room: "602",
                code: "NYC-EC-01",
                website: "https://api2uat.gis247.net",
                address: "350 Fifth Avenue",
                state: "New York",
                city: "New York",
                zipcode: "10118",
                country: "231",
                email: "nyc.store@gis247.net",
                currency: "USD",
                Thousandseparator: ",",
                tax_id: "",
                branch_id: "",
                tax: "636d1d56bc8a8f3720133d6e",
                Dateformat: "d/m/Y",
                TimeZone: "America/New_York",
                contacts: [{ icon: 1, phoneCode: "1", no: "2125550199" }],
                schedule: [
                  { Day: "Monday", check: true, opening_time: "2024-02-13T09:00:00.000Z", formate_opentime: "", closeing_time: "2024-02-13T18:00:00.000Z", formate_closetime: "" },
                  { Day: "Tuesday", check: true, opening_time: "2024-02-13T09:00:00.000Z", formate_opentime: "", closeing_time: "2024-02-13T18:00:00.000Z", formate_closetime: "" },
                  { Day: "Wednesday", check: true, opening_time: "2024-02-13T09:00:00.000Z", formate_opentime: "", closeing_time: "2024-02-13T18:00:00.000Z", formate_closetime: "" },
                  { Day: "Thursday", check: true, opening_time: "2024-02-13T09:00:00.000Z", formate_opentime: "", closeing_time: "2024-02-13T18:00:00.000Z", formate_closetime: "" },
                  { Day: "Friday", check: true, opening_time: "2024-02-13T09:00:00.000Z", formate_opentime: "", closeing_time: "2024-02-13T18:00:00.000Z", formate_closetime: "" },
                  { Day: "Saturday", check: false, opening_time: "2024-02-13T09:00:00.000Z", formate_opentime: "", closeing_time: "2024-02-13T14:00:00.000Z", formate_closetime: "" },
                  { Day: "Sunday", check: false, opening_time: "2024-02-13T09:00:00.000Z", formate_opentime: "", closeing_time: "2024-02-13T14:00:00.000Z", formate_closetime: "" }
                ],
                location_logo: "",
                thumb: "",
                websiteInfo: {
                  name: "api2uat.gis247.net", /* was: jaipurbranch.example.com */
                  metaTitle: "Demo Jewelry New York",
                  metaDescription: "Online showroom — New York.",
                  logo: "https://gis247.s3.us-east-2.amazonaws.com/2023in0076/Customer/profile/1707978893000.png",
                  favicon: "https://gis247.s3.us-east-2.amazonaws.com/2023in0076/Customer/profile/1707978897020.png"
                },
                domainID: []
              },
              response: {
                code: 200,
                message: "Location updated successfully",
                note: "Replace with your API response."
              },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT (lowercase authorization in UAT)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "id", type: "string", required: true, description: "Location Mongo/Object id to update" }
              ]
            }
          ]
        },
        {
          id: "location-list-filter",
          label: "List & filters",
          color: "#0d9488",
          endpoints: [
            {
              id: "location-list",
              method: "POST",
              path: "/App/location/locationList",
              title: "Location list",
              description: "Paginated locations with search, multi-filters (name, type, city, code), optional zone range, and sort.",
              requestBody: {
                search: "",
                limit: "20",
                skip: 0,
                filter: { name: [], type: [], city: [], code: [], zone: { min: 0, max: 100 } },
                sort: {}
              },
              response: {
                code: 200,
                total: 4,
                data: [
                  { _id: "681091c636b7487309838070", name: "Heart & Arrow", code: "STORE", city: "BKK", type: "Store" },
                  { _id: "67e3ae830928c144e7773ece", name: "Demo Jewelry Bangkok", code: "BKK-01", city: "Bangkok", type: "eCommerce" },
                  { _id: "67e3ae830928c144e7773ecf", name: "Demo Jewelry New York", code: "NYC-01", city: "New York", type: "Store" }
                ],
                note: "Replace with your live list payload."
              },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT (lowercase authorization in UAT)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "search", type: "string", required: false, description: "Free-text search" },
                { name: "limit", type: "string", required: false, description: "Page size (often sent as string)" },
                { name: "skip", type: "integer", required: false, description: "Offset for pagination" },
                { name: "filter", type: "object", required: false, description: "name, type, city, code arrays; zone { min, max }" },
                { name: "sort", type: "object", required: false, description: "Sort map per backend" }
              ]
            },
            {
              id: "location-filter",
              method: "POST",
              path: "/App/location/locationfilter",
              title: "Location filter options",
              description: "Filter metadata for the location UI (dropdown values, distinct types/cities, etc.). Body is often empty {}.",
              requestBody: {},
              response: {
                code: 200,
                types: ["Store", "eCommerce", "Warehouse"],
                cities: ["Bangkok", "New York"],
                note: "Replace with your locationfilter response."
              },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT (lowercase authorization in UAT)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" }
              ]
            }
          ]
        }
      ]
    };
