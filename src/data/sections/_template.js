// Copy this file to add a new API module (e.g. orders.js), then register it in src/data/index.js.
export default {
  id: "module-id",
  label: "Module Name",
  icon: "📦",
  color: "#0969da",
  description: "Short description of this API module.",
  // Option A — flat list of endpoints:
  endpoints: [
    {
      id: "unique-endpoint-id",
      method: "POST",
      path: "/module/action",
      title: "Human-readable title",
      description: "What this endpoint does.",
      requestBody: {},
      response: { code: 200 },
      params: [
        { name: "authorization", type: "string", required: true, in: "header", description: "JWT token." },
      ],
    },
  ],
  // Option B — grouped subsections (use instead of endpoints):
  // subsections: [
  //   {
  //     id: "group-id",
  //     label: "Group name",
  //     color: "#0969da",
  //     endpoints: [ /* same shape as above */ ],
  //     childGroups: [
  //       { id: "nested-group", label: "Nested group", endpoints: [] },
  //     ],
  //   },
  // ],
};
