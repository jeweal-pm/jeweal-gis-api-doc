import customerProfileEndpoints from './customer-profile-endpoints';

export default {
      id: "customer",
      label: "Customer",
      icon: "👤",
      color: "#0891b2",
      description: "Admin Customer menu: Customers (profiles, addresses, history, appointments) and Report. Matches sidebar flyout: Customers | Report.",
      subsections: [
        {
          id: "customer-customers",
          label: "Customers",
          color: "#0891b2",
          childGroups: [
            {
              id: "customer-profile",
              label: "Customer Profile",
              endpoints: customerProfileEndpoints
            },
            {
              id: "customer-address",
              label: "Address",
              endpoints: [
            {
              id: "add-address",
              method: "POST",
              path: "/App/customer/addAddress",
              title: "Add Customer Address",
              description: "Add a new shipping address for a customer.",
              requestBody: { id: "644caae65f58febb79fed516", shipping_address: { address: "123 Main St", state: "New York", city: "Manhattan", zipcode: "10001", company: "Express Corp", country: "231", is_default: 1 } },
              response: { success: true, message: "Address added successfully" },
              params: [
                { name: "id", type: "string", required: true, description: "Customer ID" },
                { name: "shipping_address", type: "object", required: true, description: "Address object with address, city, state, zipcode, country" }
              ]
            },
            {
              id: "update-address",
              method: "POST",
              path: "/App/customer/updateAddress",
              title: "Update Customer Address",
              description: "Update an existing customer address.",
              requestBody: { id: "644caae65f58febb79fed516", shipping_address: { address: "456 Park Ave", state: "New York", city: "Manhattan", zipcode: "10022", country: "231", is_default: 1 } },
              response: { success: true, message: "Address updated successfully" },
              params: [
                { name: "id", type: "string", required: true, description: "Customer ID" },
                { name: "shipping_address", type: "object", required: true, description: "Updated address object" }
              ]
            },
            {
              id: "get-address",
              method: "POST",
              path: "/App/customer/getAddress",
              title: "Get Customer Address",
              description: "Retrieve all addresses for a customer.",
              requestBody: { id: "644caae65f58febb79fed516" },
              response: { success: true, data: [{ _id: "addr_001", address: "123 Main St", city: "Manhattan", is_default: 1 }] },
              params: [
                { name: "id", type: "string", required: true, description: "Customer ID" }
              ]
            }
              ]
            },
            {
              id: "customer-history",
              label: "Purchase History",
              endpoints: [
            {
              id: "purchase-history",
              method: "POST",
              path: "/Customer/customer/purcahseHistory",
              title: "Get Purchase History",
              description: "Retrieve customer purchase transaction history.",
              requestBody: { customer_id: "65153b7aed2ad528022035f1", type: "PURCHASE" },
              response: { success: true, data: [{ order_number: "PS-001", date: "2026-03-24", amount: 2850, status: "completed" }] },
              params: [
                { name: "customer_id", type: "string", required: true, description: "Customer ID" },
                { name: "type", type: "string", required: false, description: "PURCHASE | PAYMENT | ALL" }
              ]
            },
            {
              id: "customer-data",
              method: "POST",
              path: "/Customer/customer/customerData",
              title: "Get Customer Summary Data",
              description: "Retrieve complete customer analytics and summary data.",
              requestBody: { customer_id: "644caae65f58febb79fed516" },
              response: { success: true, data: { total_purchases: 8, total_spent: 24000, credit_notes_balance: 500, outstanding_layby: 0, last_visit: "2026-03-24" } },
              params: [
                { name: "customer_id", type: "string", required: true, description: "Customer ID" }
              ]
            },
            {
              id: "credit-notes",
              method: "POST",
              path: "/Customer/customer/creditNotes",
              title: "Get Credit Notes",
              description: "Retrieve customer credit notes and balances.",
              requestBody: { customer_id: "644caae65f58febb79fed516", date: "2023-09-15T05:30:14.912Z" },
              response: { success: true, data: [{ _id: "cn_001", code: "CN-001", balance: 500, issued_date: "2023-09-15", expires_at: "2024-09-15" }] },
              params: [
                { name: "customer_id", type: "string", required: true, description: "Customer ID" },
                { name: "date", type: "string", required: false, description: "Filter from date" }
              ]
            },
            {
              id: "transaction-history",
              method: "POST",
              path: "/Customer/customer/transactionHistory",
              title: "Get Transaction History",
              description: "Retrieve customer layby or installment transaction history.",
              requestBody: { id: "65115f599ca3411ea0a09ccf", type: "lay_by" },
              response: { success: true, data: [{ date: "2026-03-01", amount: 500, type: "payment", balance: 1500 }] },
              params: [
                { name: "id", type: "string", required: true, description: "Layby or order ID" },
                { name: "type", type: "string", required: true, description: "lay_by | installment" }
              ]
            }
              ]
            },
            {
              id: "customer-appointment",
              label: "Appointment",
              endpoints: [
            {
              id: "appointment-list",
              method: "POST",
              path: "/Customer/appointment/list",
              title: "Get Appointment List",
              description: "Retrieve customer appointments with filters.",
              requestBody: { search: "", limit: 100, skip: 0, date: null, location: [], status: [1] },
              response: { success: true, total: 5, data: [{ _id: "apt_001", customer: "John Doe", date: "2026-03-28", time: "14:00", location: "Main Store", status: 1 }] },
              params: [
                { name: "search", type: "string", required: false, description: "Search keyword" },
                { name: "date", type: "string", required: false, description: "Filter by date" },
                { name: "location", type: "array", required: false, description: "Filter by location IDs" },
                { name: "status", type: "array", required: false, description: "Filter by status [1=scheduled, 2=completed, 3=cancelled]" }
              ]
            },
            {
              id: "appointment-status-update",
              method: "POST",
              path: "/Customer/appointment/status-update",
              title: "Update Appointment Status",
              description: "Update the status of a customer appointment.",
              requestBody: { id: "668cde2e089cc0bdd9c0b642", status: 2 },
              response: { success: true, message: "Appointment status updated" },
              params: [
                { name: "id", type: "string", required: true, description: "Appointment ID" },
                { name: "status", type: "integer", required: true, description: "1=scheduled 2=completed 3=cancelled" }
              ]
            }
              ]
            }
          ]
        },
        {
          id: "customer-report",
          label: "Report",
          color: "#f97316",
          endpoints: [
            {
              id: "customer-report-summary",
              method: "POST",
              path: "/Customer/report/summary",
              title: "Customer Report Summary (replace when API is final)",
              description: "Placeholder for Customer → Report in admin. Replace path, body, and response with your customer reporting API.",
              requestBody: { start_date: "", end_date: "", limit: 100, skip: 0 },
              response: { success: true, total: 0, data: [], message: "Replace with your customer report response" },
              params: [
                { name: "start_date", type: "string", required: false, description: "Report range start" },
                { name: "end_date", type: "string", required: false, description: "Report range end" }
              ]
            },
            {
              id: "customer-report-activity",
              method: "POST",
              path: "/Customer/report/activity",
              title: "Customer Activity Report (replace when API is final)",
              description: "Optional second report endpoint placeholder under Customer → Report.",
              requestBody: { search: "", limit: 100, skip: 0 },
              response: { success: true, total: 0, data: [] },
              params: []
            }
          ]
        }
        ]
    };
