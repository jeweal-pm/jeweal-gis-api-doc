export default {
      id: "calendar",
      label: "Calendar",
      icon: "📅",
      color: "#f59e0b",
      description: "Admin calendar (backend path uses spelling calender). All operations are POST with JSON. Replace sample responses when you capture live payloads.",
      subsections: [
        {
          id: "calendar-customer",
          label: "Customer lookup",
          color: "#f59e0b",
          endpoints: [
            {
              id: "calender-get-customer-info",
              method: "POST",
              path: "/App/calender/getCalender-customer-info",
              title: "Get calendar customer info",
              description: "Search / resolve customer context for the calendar (e.g. autocomplete). Body uses search string; empty string returns unfiltered or default list per backend.",
              requestBody: { search: "" },
              response: {
                code: 200,
                data: [{ id: "644caae65f58febb79fed516", name: "John Doe", phone: "+66-00-000-0000" }],
                note: "Replace with your live getCalender-customer-info response."
              },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login (lowercase authorization header in UAT)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "accept", type: "string", required: false, in: "header", description: "application/json, text/plain, */*" },
                { name: "search", type: "string", required: false, description: "Customer search text; empty string allowed" }
              ]
            }
          ]
        },
        {
          id: "calendar-day-list",
          label: "Day list & counts",
          color: "#ea580c",
          endpoints: [
            {
              id: "calender-data-list-counts",
              method: "POST",
              path: "/App/calender/getCalenderData-list-counts",
              title: "Calendar list counts",
              description: "Counts for calendar cells or summary badges for the selected date (e.g. number of appointments/orders per type).",
              requestBody: { date: "2026-03-24", type: "", filter_type: [] },
              response: {
                code: 200,
                counts: { appointments: 3, orders: 1 },
                note: "Replace with your live getCalenderData-list-counts response."
              },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT (lowercase authorization in UAT)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "date", type: "string", required: true, description: "Selected calendar date (YYYY-MM-DD)" },
                { name: "type", type: "string", required: false, description: "Event/order type filter; empty if not used" },
                { name: "filter_type", type: "array", required: false, description: "Additional type filters from UI" }
              ]
            },
            {
              id: "calender-data-list",
              method: "POST",
              path: "/App/calender/getCalenderData-list",
              title: "Calendar data list",
              description: "Detailed list of items for the selected day (appointments, orders, etc.). Same request shape as list-counts.",
              requestBody: { date: "2026-03-24", type: "", filter_type: [] },
              response: {
                code: 200,
                data: [{ id: "evt_001", title: "Consultation", time: "14:00", type: "appointment" }],
                note: "Replace with your live getCalenderData-list response."
              },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT (lowercase authorization in UAT)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "date", type: "string", required: true, description: "Selected calendar date (YYYY-MM-DD)" },
                { name: "type", type: "string", required: false, description: "Event/order type filter" },
                { name: "filter_type", type: "array", required: false, description: "Additional filters" }
              ]
            }
          ]
        },
        {
          id: "calendar-range",
          label: "Month / range view",
          color: "#c2410c",
          endpoints: [
            {
              id: "calender-data",
              method: "POST",
              path: "/App/calender/getCalenderData",
              title: "Get calendar data",
              description: "Calendar grid payload for a period (e.g. Month). type drives view granularity; date often YYYY-MM for month view; order_type and status narrow results.",
              requestBody: { type: "Month", order_type: [], status: [], start_date: "", end_date: "", date: "2026-03" },
              response: {
                code: 200,
                data: {
                  "2026-03-01": [{ id: "a1", label: "Event" }],
                  "2026-03-24": [{ id: "a2", label: "Follow-up" }]
                },
                note: "Replace with your live getCalenderData shape (per-day map or array per backend)."
              },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT (lowercase authorization in UAT)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "type", type: "string", required: true, description: "View type e.g. Month" },
                { name: "order_type", type: "array", required: false, description: "Order types to include" },
                { name: "status", type: "array", required: false, description: "Status filters" },
                { name: "start_date", type: "string", required: false, description: "Range start (if used)" },
                { name: "end_date", type: "string", required: false, description: "Range end (if used)" },
                { name: "date", type: "string", required: true, description: "Anchor period e.g. YYYY-MM for month" }
              ]
            }
          ]
        }
      ]
    };
