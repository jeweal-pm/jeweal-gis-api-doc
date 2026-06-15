export default {
      id: "user",
      label: "User",
      icon: "👤",
      color: "#8b5cf6",
      description: "Admin User menu in call order: AddRole → UserList → ListOfRoles → profile → Report (login + operation logs). Paths /App/User/* match UAT.",
      subsections: [
        {
          id: "user-roles-and-list",
          label: "Roles & user list",
          color: "#8b5cf6",
          endpoints: [
            {
              id: "user-add-role",
              method: "POST",
              path: "/App/User/AddRole",
              title: "1. Add or update role",
              description: "Create a role (update: false, role_id blank/space) or update existing (update: true, set role_id).",
              requestBody: { role_name: "sales", description: "Manage Whole GIS", role_id: " ", update: false },
              response: {
                code: 200,
                message: "Role saved successfully",
                role_id: "5fe4229711b7f036ce3b7e82",
                note: "Replace with your API response."
              },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT (lowercase authorization in UAT)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "role_name", type: "string", required: true, description: "Display name of the role" },
                { name: "description", type: "string", required: false, description: "Role description" },
                { name: "role_id", type: "string", required: false, description: "Existing role id when updating; space or empty for create" },
                { name: "update", type: "boolean", required: true, description: "false = create, true = update" }
              ]
            },
            {
              id: "user-user-list",
              method: "POST",
              path: "/App/User/UserList",
              title: "2. User list",
              description: "List admin users (search in body).",
              requestBody: { search: "" },
              response: {
                code: 200,
                total: 12,
                data: [{ _id: "691eb733e3194177d39d9e57", name: "Rubi", email: "rubi@gmail.com", position: "developer" }],
                note: "Replace with your UserList response."
              },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT (lowercase authorization in UAT)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "search", type: "string", required: false, description: "Filter users" }
              ]
            },
            {
              id: "user-list-of-roles",
              method: "POST",
              path: "/App/User/ListOfRoles",
              title: "3. List of roles",
              description: "Searchable list of roles for assignment and management.",
              requestBody: { search: "" },
              response: {
                code: 200,
                total: 5,
                data: [{ _id: "5fe4229711b7f036ce3b7e82", role_name: "Administrator", description: "Full access" }],
                note: "Replace with your ListOfRoles response."
              },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT (lowercase authorization in UAT)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "search", type: "string", required: false, description: "Filter roles by name" }
              ]
            }
          ]
        },
        {
          id: "user-profile",
          label: "Profile",
          color: "#a78bfa",
          endpoints: [
            {
              id: "change-password",
              method: "POST",
              path: "/App/profile/change-password",
              title: "Change password",
              description: "Change password for the signed-in user.",
              requestBody: { password: "newpassword123", old_password: "123456" },
              response: { code: 200, message: "Password changed successfully" },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT (lowercase authorization in UAT)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                { name: "password", type: "string", required: true, description: "New password" },
                { name: "old_password", type: "string", required: true, description: "Current password" }
              ]
            },
            {
              id: "get-auth",
              method: "POST",
              path: "/App/profile/get-auth",
              title: "Get auth profile",
              description: "Current user profile for the session.",
              requestBody: {},
              response: { code: 200, data: { id: "67eba015592f7b47cd9e184e", name: "Admin", email: "admin@demojewelry.com", position: "Administrator", organisation: "Demo Jewelry Bangkok" } },
              params: [
                { name: "authorization", type: "string", required: true, in: "header", description: "JWT (lowercase authorization in UAT)." },
                { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" }
              ]
            }
          ]
        },
        {
          id: "user-report",
          label: "Report",
          color: "#f97316",
          childGroups: [
            {
              id: "report-users-log",
              label: "Users Log",
              endpoints: [
                {
                  id: "user-all-login-details",
                  method: "POST",
                  path: "/App/User/AllLoginDetails",
                  title: "All login details",
                  description: "User login audit (Users Log): search plus date range and pagination.",
                  requestBody: { search: "", start_date: "2026-02-24T18:13:02.782Z", end_date: "2026-03-24T18:13:02.754Z", limit: 100, skip: 0 },
                  response: {
                    code: 200,
                    total: 48,
                    data: [{ user: "rubi@gmail.com", ip: "203.0.113.10", login_at: "2026-03-24T10:00:00.000Z" }],
                    note: "Replace with your AllLoginDetails response."
                  },
                  params: [
                    { name: "authorization", type: "string", required: true, in: "header", description: "JWT (lowercase authorization in UAT)." },
                    { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                    { name: "search", type: "string", required: false, description: "Filter log entries" },
                    { name: "start_date", type: "string", required: true, description: "Range start (ISO 8601)" },
                    { name: "end_date", type: "string", required: true, description: "Range end (ISO 8601)" },
                    { name: "limit", type: "integer", required: false, description: "Page size" },
                    { name: "skip", type: "integer", required: false, description: "Offset" }
                  ]
                }
              ]
            },
            {
              id: "report-operation-log",
              label: "Operation Log",
              endpoints: [
                {
                  id: "user-operation-logs",
                  method: "POST",
                  path: "/App/User/OperationLogs",
                  title: "Operation logs",
                  description: "Operation / activity log with search, date range, and pagination.",
                  requestBody: { search: "", start_date: "2026-02-24T18:13:19.830Z", end_date: "2026-03-24T18:13:19.818Z", limit: 100, skip: 0 },
                  response: {
                    code: 200,
                    total: 120,
                    data: [{ action: "UPDATE", module: "Product", detail: "SKU RG026", at: "2026-03-24T09:15:00.000Z" }],
                    note: "Replace with your OperationLogs response."
                  },
                  params: [
                    { name: "authorization", type: "string", required: true, in: "header", description: "JWT (lowercase authorization in UAT)." },
                    { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
                    { name: "search", type: "string", required: false, description: "Filter log entries" },
                    { name: "start_date", type: "string", required: true, description: "Range start (ISO 8601)" },
                    { name: "end_date", type: "string", required: true, description: "Range end (ISO 8601)" },
                    { name: "limit", type: "integer", required: false, description: "Page size" },
                    { name: "skip", type: "integer", required: false, description: "Offset" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };
