export default {
      id: "organization",
      label: "Organization",
      icon: "🌐",
      color: "#6366f1",
      description: "Organization admin: timezones (location API), currencies, org profile (viewOrg), and shared organisation settings. All POST with JSON. Paths match UAT.",
      subsections: [
        {
          id: "org-timezone",
          label: "Timezone",
          color: "#6366f1",
          endpoints: [
            {
              id: "location-timezone-list",
              method: "POST",
              path: "/App/location/Timezonelist",
              title: "Timezone list",
              description: "List of IANA-style timezones for organisation / store configuration. Path lives under App/location but is used from Organization setup.",
              requestBody: {},
              response: {
                code: 200,
                data: [
                  { value: "Asia/Bangkok", label: "Asia/Bangkok" },
                  { value: "America/New_York", label: "America/New_York" }
                ],
                note: "Replace with your live Timezonelist response."
              },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT (lowercase authorization in UAT)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "accept", type: "string", required: false, in: "header", description: "application/json, text/plain, */*" }
              ]
            }
          ]
        },
        {
          id: "org-profile-currency",
          label: "Organisation & currency",
          color: "#4f46e5",
          endpoints: [
            {
              id: "get-all-currency",
              method: "POST",
              path: "/App/organisation/getAll_Currency",
              title: "Get all currencies",
              description: "All currencies configured for the organisation (rates, default flag, symbols).",
              requestBody: {},
              response: {
                code: 200,
                data: [{ currency: "THB", rate: 1, is_default: 1, symbol: "฿" }, { currency: "USD", rate: 0.028, is_default: 0, symbol: "$" }],
                note: "Adjust fields to match your API response."
              },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT (lowercase authorization in UAT)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "accept", type: "string", required: false, in: "header", description: "application/json, text/plain, */*" }
              ]
            },
            {
              id: "organisation-view-org",
              method: "POST",
              path: "/App/organisation/viewOrg",
              title: "View organisation",
              description: "Read current organisation profile/details as shown in Organization admin.",
              requestBody: {},
              response: {
                code: 200,
                data: {
                  organisation_name: "Demo Jewelry Bangkok",
                  organisation_id: "68ca4164f813eb7c1f31206a",
                  timezone: "Asia/Bangkok",
                  default_currency: "THB",
                  logo: "https://api2uat.gis247.net/uploads/logo.png" /* was: example.com/logo.png */
                },
                note: "Replace with your live viewOrg payload."
              },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT (lowercase authorization in UAT)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "accept", type: "string", required: false, in: "header", description: "application/json, text/plain, */*" }
              ]
            }
          ]
        },
        {
          id: "org-settings-inventory",
          label: "Organisation settings (common)",
          color: "#7c3aed",
          endpoints: [
            {
              id: "get-org-settings-app",
              method: "POST",
              path: "/Inventory/common/getOrganisationSettings",
              title: "Get organisation settings",
              description: "Shared organisation settings used across inventory and other modules: timezone, currency, date format, feature flags.",
              requestBody: {},
              response: {
                code: 200,
                data: { organisation_name: "Demo Jewelry New York", timezone: "America/New_York", default_currency: "USD", date_format: "d/m/Y", settings: { PMDC: 1, AW: 0, PC: 1 } },
                note: "Shape may match or complement viewOrg depending on environment."
              },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT (lowercase authorization in UAT)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "accept", type: "string", required: false, in: "header", description: "application/json, text/plain, */*" }
              ]
            }
          ]
        }
      ]
    };
