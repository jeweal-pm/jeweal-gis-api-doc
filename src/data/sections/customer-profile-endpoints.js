/** Customer Profile — create customer flow (upload image, then create). */

import { UPLOAD_CUSTOMER_IMAGE_BODY, CREATE_CUSTOMER_BODY } from "./customer-create-payloads";

const AUTH_HEADERS = [
  { name: "authorization", type: "string", required: true, in: "header", description: "JWT from admin login." },
  { name: "Content-Type", type: "string", required: true, in: "header", description: "application/json" },
];

const customerProfileEndpoints = [
  {
    id: "customer-upload-image",
    method: "POST",
    path: "/App/customer/uploadimage",
    title: "Upload Customer Profile Image",
    description: "Upload customer profile photo as a base64 data URL before create. Returns the S3 URL used in the profile field on create.",
    requestBody: UPLOAD_CUSTOMER_IMAGE_BODY,
    response: {
      success: true,
      url: "https://gis247.s3.amazonaws.com/2022th0038/Customer/profile/1781086447207.png",
      name: "profile",
    },
    params: [
      ...AUTH_HEADERS,
      { name: "image", type: "string", required: true, description: "Base64 data URL, e.g. data:image/jpeg;base64,..." },
      { name: "name", type: "string", required: true, description: "Upload field name — use profile" },
    ],
  },
  {
    id: "customer-create",
    method: "POST",
    path: "/App/customer/create",
    title: "Create Customer",
    description: "Create a new customer profile with personal details, contacts, billing/shipping addresses, government IDs, and privacy consent.",
    requestBody: CREATE_CUSTOMER_BODY,
    response: {
      success: true,
      message: "Customer created successfully",
      id: "69d38581135009caf45c2c64",
    },
    params: [
      ...AUTH_HEADERS,
      { name: "id", type: "string", required: false, description: "Empty string for new customer" },
      { name: "fname", type: "string", required: true, description: "First name" },
      { name: "lname", type: "string", required: true, description: "Last name" },
      { name: "email", type: "string", required: false, description: "Primary email" },
      { name: "contacts", type: "array", required: false, description: "Phone contacts with phoneCode and number" },
      { name: "profile", type: "string", required: false, description: "Profile image URL from uploadimage" },
      { name: "billing_address", type: "array", required: false, description: "Billing address lines" },
      { name: "shipping_address", type: "array", required: false, description: "Shipping address lines" },
      { name: "privacy", type: "object", required: false, description: "Consent flags: data_handling, contact_term, cardcreation" },
    ],
  },
  {
    id: "customer-get-list",
    method: "POST",
    path: "/Customer/customer/getList",
    title: "Get Customer List",
    description: "Retrieve paginated list of all customers with search and filter options.",
    requestBody: { search: "", limit: "100", skip: 0, name: [], country: [], city: [], maxAge: 100, minAge: 0, gender: [], group: [], sort: {} },
    response: { success: true, total: 250, data: [{ _id: "cus_001", name: "John Doe", email: "john@gis247.net", phone: "+1-555-0100", country: "US" }] },
    params: [
      { name: "search", type: "string", required: false, description: "Search by name, email or phone" },
      { name: "limit", type: "string", required: false, description: "Records per page" },
      { name: "skip", type: "integer", required: false, description: "Records to skip" },
      { name: "gender", type: "array", required: false, description: "Filter by gender" },
      { name: "country", type: "array", required: false, description: "Filter by country" },
    ],
  },
  {
    id: "customer-get",
    method: "POST",
    path: "/App/customer/get",
    title: "Get Customer Details",
    description: "Retrieve full details of a specific customer.",
    requestBody: { id: "644caae65f58febb79fed516" },
    response: { success: true, data: { _id: "cus_001", name: "John Doe", email: "john@gis247.net", phone: "+1-555-0100", dob: "1990-01-15", gender: "Male", country: "US" } },
    params: [{ name: "id", type: "string", required: true, description: "Customer ID" }],
  },
  {
    id: "customer-find",
    method: "POST",
    path: "/App/customer/find",
    title: "Find Customer",
    description: "Quick search customer by name, phone or email.",
    requestBody: { search: "John" },
    response: { success: true, data: [{ _id: "cus_001", name: "John Doe", email: "john@gis247.net", phone: "+1-555-0100" }] },
    params: [{ name: "search", type: "string", required: true, description: "Search term" }],
  },
  {
    id: "customer-check-email",
    method: "POST",
    path: "/App/customer/checkEmail",
    title: "Check Customer Email",
    description: "Check if an email address is already registered as a customer.",
    requestBody: { email: "john@gis247.net" },
    response: { success: true, exists: true, customer_id: "cus_001" },
    params: [{ name: "email", type: "string", required: true, description: "Email to check" }],
  },
  {
    id: "customer-delete",
    method: "POST",
    path: "/App/customer/delete",
    title: "Delete Customer",
    description: "Delete a customer record from the system.",
    requestBody: { id: "67ebabe2009bba672e7dcdba" },
    response: { success: true, message: "Customer deleted successfully" },
    params: [{ name: "id", type: "string", required: true, description: "Customer ID to delete" }],
  },
];

export default customerProfileEndpoints;
