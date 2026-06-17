export default {
      id: "auth",
      label: "Auth",
      icon: "\uD83D\uDD10",
      color: "#0ea5e9",
      description: "Web and mobile authentication \u2014 store verification, login, OTP, password reset, POS tokens, and sessions.",
      subsections: [
        {
          id: "auth-web",
          label: "Web",
          color: "#0ea5e9",
          endpoints: [
        {
          id: "check-store",
          method: "POST",
          path: "/Auth/Web/check-store",
          title: "Check Store",
          description: "Verify that a store domain exists. Call this FIRST before login to validate the store domain.",
          requestBody: { domain: "demo3.gis247.net" },
          response: { success: true, storeName: "demo3", domain: "demo3.gis247.net", org_name: "Demo Jewelry Bangkok", logo: "https://gis247.s3.amazonaws.com/2022th0038/logo.png" },
          params: [
            { name: "domain", type: "string", required: true, description: "Store domain e.g. demo3.gis247.net or demo1.gis247.net" }
          ]
        },
        {
          id: "store-valid",
          method: "POST",
          path: "/Auth/Web/store-Valid",
          title: "Validate Store Name",
          description: "Check if a store name is available or already registered.",
          requestBody: { storeName: "demo3" },
          response: { success: true, available: false, message: "Store name already taken" },
          params: [
            { name: "storeName", type: "string", required: true, description: "Store name to validate" }
          ]
        },
        {
          id: "country-list",
          method: "POST",
          path: "/Auth/Web/country-list",
          title: "Country List",
          description: "Get list of all supported countries for registration.",
          requestBody: {},
          response: { success: true, data: [{ id: "101", name: "India", code: "IN", phone_code: "+91" }, { id: "231", name: "United States", code: "US", phone_code: "+1" }, { id: "217", name: "Thailand", code: "TH", phone_code: "+66" }] },
          params: []
        },
        {
          id: "currency-list",
          method: "POST",
          path: "/Auth/Web/currency-list",
          title: "Currency List",
          description: "Get list of all supported currencies for store setup.",
          requestBody: {},
          response: { success: true, data: [{ code: "USD", name: "US Dollar", symbol: "$" }, { code: "THB", name: "Thai Baht", symbol: "\u0E3F" }] },
          params: []
        },
        {
          id: "store-login",
          method: "POST",
          path: "/Auth/Web/store-login",
          title: "Store Login",
          description: "Authenticate a user with email, password and store name. Returns a JWT authToken used for all subsequent requests.",
          requestBody: { email: "admin@demojewelry.com", password: "123456", storeName: "demo3" },
          response: { success: true, authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", data: { first_name: "Admin", email: "admin@demojewelry.com", position: "Administrator", loginPIN: "123456", admin: { id: "67eba015592f7b47cd9e184e", name: "Admin", organisation_name: "Demo Jewelry Bangkok", domain: "https://demo3.gis247.net/", storeName: "demo3", timezone: "Asia/Bangkok" } } },
          params: [
            { name: "email", type: "string", required: true, description: "Registered user email address" },
            { name: "password", type: "string", required: true, description: "User password" },
            { name: "storeName", type: "string", required: true, description: "Store slug (Demo Jewelry Bangkok example: demo3)" }
          ]
        },
        {
          id: "authentication",
          method: "POST",
          path: "/Auth/Web/authentication",
          title: "Verify Auth Token",
          description: "Verify and decode an existing authToken. Used to re-authenticate sessions.",
          requestBody: { authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaW4iOiIxMjM0NTYiLCJpZCI6IjY3Y2E5YjIxZTIyZGE4MmJiMWUwZmIxYyIsImlhdCI6MTc0MTMzMTYyOSwiZXhwIjoxNzQzOTIzNjI5fQ.dmBszttqFeQS5fFHAAY027qMJKQgVQrm8XogF4vjskg" },
          response: { success: true, valid: true, user: { id: "67eba015592f7b47cd9e184e", name: "Admin", email: "admin@demojewelry.com", position: "Administrator" } },
          params: [
            { name: "authToken", type: "string", required: true, description: "JWT token received from store-login" }
          ]
        },
        {
          id: "quick-login",
          method: "POST",
          path: "/Auth/Web/quickLogin",
          title: "Quick Login (PIN)",
          description: "Login using a PIN instead of email and password. Fast re-authentication for POS terminals.",
          requestBody: { pin: "123456", authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaW4iOiI0NTYxMjMiLCJpZCI6IjY1NzE1YjM1NjY2NmUzOTcwYTI1MjdmZSIsImlhdCI6MTc0MTE2ODU4OCwiZXhwIjoxNzQzNzYwNTg4fQ.GVVvJRBbXSXK1SFw0ED9zVwHFHMu0sna6zUrRoeZz5k" },
          response: { success: true, authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", user: { id: "67eba015592f7b47cd9e184e", name: "Admin" } },
          params: [
            { name: "pin", type: "string", required: true, description: "6-digit login PIN" },
            { name: "authToken", type: "string", required: true, description: "Existing auth token for the session" }
          ]
        },
        {
          id: "forgot-password",
          method: "POST",
          path: "/Auth/Web/forgot-password",
          title: "Forgot Password",
          description: "Send a password reset OTP to the user's registered email address.",
          requestBody: { email: "admin@demojewelry.com", storeName: "demo3" },
          response: { success: true, message: "OTP sent to registered email", authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
          params: [
            { name: "email", type: "string", required: true, description: "Registered email address" },
            { name: "storeName", type: "string", required: true, description: "Store name" }
          ]
        },
        {
          id: "store-email-valid",
          method: "POST",
          path: "/Auth/Web/store-email-valid",
          title: "Validate Store Email",
          description: "Check if an email is registered within the store before triggering password reset.",
          requestBody: { email: "admin@demojewelry.com" },
          response: { success: true, exists: true, authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
          params: [
            { name: "email", type: "string", required: true, description: "Email to validate against store records" }
          ]
        },
        {
          id: "otp-verification",
          method: "POST",
          path: "/Auth/Web/otp-verification",
          title: "OTP Verification",
          description: "Verify the OTP sent to user's email. Returns a token to proceed with password change.",
          requestBody: { authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RkZXZAYW5hbnRhLmNvbSIsIm90cCI6NTEyMDUzfQ...", otp: "512053" },
          response: { success: true, message: "OTP verified successfully", resetToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
          params: [
            { name: "authToken", type: "string", required: true, description: "Token received from store-email-valid" },
            { name: "otp", type: "string", required: true, description: "6-digit OTP sent to user email" }
          ]
        },
        {
          id: "resend-otp",
          method: "POST",
          path: "/Auth/web/resendOtp",
          title: "Resend OTP",
          description: "Resend a new OTP to the user's registered email.",
          requestBody: { authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaW4iOiI0NTYxMjMiLCJpZCI6IjY1NzE1YjM1NjY2NmUzOTcwYTI1MjdmZSJ9..." },
          response: { success: true, message: "OTP resent to registered email" },
          params: [
            { name: "authToken", type: "string", required: true, description: "Auth token from the initial step" }
          ]
        },
        {
          id: "reset-password-check",
          method: "POST",
          path: "/Auth/Web/reset-password-check",
          title: "Reset Password Check",
          description: "Validate the password reset token before allowing the user to set a new password.",
          requestBody: { authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzc1Y2I3ZjJmMzZjZjFkYjkwNGI2ZTAiLCJvdHAiOjQ2NzM1NX0..." },
          response: { success: true, valid: true, email: "admin@demojewelry.com" },
          params: [
            { name: "authToken", type: "string", required: true, description: "Token received after OTP verification" }
          ]
        },
        {
          id: "reset-password",
          method: "POST",
          path: "/Auth/Web/reset-password",
          title: "Reset Password",
          description: "Set a new password using the reset token from the check step.",
          requestBody: { authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzc1Y2I3ZjJmMzZjZjFkYjkwNGI2ZTAiLCJvdHAiOjI0NDgxMX0...", password: "newpassword123" },
          response: { success: true, message: "Password has been reset successfully" },
          params: [
            { name: "authToken", type: "string", required: true, description: "Reset token from reset-password-check" },
            { name: "password", type: "string", required: true, description: "New password to set" }
          ]
        },
        {
          id: "reset-pin",
          method: "POST",
          path: "/Auth/Web/reset-pin",
          title: "Reset PIN",
          description: "Reset the user's login PIN using a valid auth token.",
          requestBody: { authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxNWIzNTY2NjZlMzk3MGEyNTI3ZmUiLCJkIjoiQUFMb2NhbERCIn0...", loginPIN: "456123" },
          response: { success: true, message: "PIN has been reset successfully" },
          params: [
            { name: "authToken", type: "string", required: true, description: "Valid auth token" },
            { name: "loginPIN", type: "string", required: true, description: "New 6-digit PIN" }
          ]
        },
        {
          id: "forgot-pin",
          method: "POST",
          path: "/Auth/Web/forgotPin",
          title: "Forgot PIN",
          description: "Trigger PIN reset using username, password and store name.",
          requestBody: { username: "admin@demojewelry.com", password: "123456", storeName: "demo3" },
          response: { success: true, message: "PIN reset link sent" },
          params: [
            { name: "username", type: "string", required: true, description: "User email/username" },
            { name: "password", type: "string", required: true, description: "Current password" },
            { name: "storeName", type: "string", required: true, description: "Store name" }
          ]
        },
        {
          id: "generate-pos-token",
          method: "POST",
          path: "/POS/auth/generatePOSAuthToken",
          title: "Generate POS Auth Token",
          description: "Generate a POS-specific token for a given location and voucher. Required before starting POS operations.",
          requestBody: { currency: "THB", voucher_id: "63c28a219140560b1851274e", location_id: "634f6d59ae461466b73d0959" },
          response: { success: true, posToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", location: "Main Store", currency: "THB" },
          params: [
            { name: "currency", type: "string", required: true, description: "Currency code e.g. THB, USD" },
            { name: "voucher_id", type: "string", required: true, description: "POS voucher ID" },
            { name: "location_id", type: "string", required: true, description: "Store location ID" }
          ]
        },
        {
          id: "get-voucher-list-pos",
          method: "POST",
          path: "/POS/getVoucherList",
          title: "Get POS Voucher List",
          description: "Retrieve available voucher types for POS session initialization.",
          requestBody: {},
          response: { success: true, data: [{ _id: "63c28a219140560b1851274e", name: "POS Sale", code: "PS", group: "Sale" }] },
          params: []
        },
        {
          id: "logout",
          method: "POST",
          path: "/Auth/Web/logout",
          title: "Logout",
          description: "Invalidate the current user session and destroy the auth token.",
          requestBody: { authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
          response: { success: true, message: "Logged out successfully" },
          params: [
            { name: "authToken", type: "string", required: true, description: "Active JWT token to invalidate" }
          ]
        }
      ]
        },
        {
          id: "auth-mobile",
          label: "Mobile",
          color: "#6366f1",
          endpoints: [
        {
          id: "mobile-login",
          method: "POST",
          path: "/Auth/Mobile/login",
          title: "Mobile Login",
          description: "Authenticate a mobile user with username, password and organization ID.",
          requestBody: { username: "admin@demojewelry.com", organization_id: "67eba015592f7b47cd9e184e", password: "123456" },
          response: { success: true, authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", user: { id: "67eba015592f7b47cd9e184e", name: "Admin" } },
          params: [
            { name: "username", type: "string", required: true, description: "User email address" },
            { name: "organization_id", type: "string", required: true, description: "Organisation ID" },
            { name: "password", type: "string", required: true, description: "User password" }
          ]
        },
        {
          id: "mobile-verification",
          method: "POST",
          path: "/Auth/Mobile/verification",
          title: "Mobile OTP Verification",
          description: "Verify OTP for mobile login flow.",
          requestBody: { authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", otp: "83961" },
          response: { success: true, verified: true, authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
          params: [
            { name: "authToken", type: "string", required: true, description: "Token from mobile login" },
            { name: "otp", type: "string", required: true, description: "6-digit OTP" }
          ]
        },
        {
          id: "mobile-quick-login",
          method: "POST",
          path: "/Auth/Mobile/loginquick",
          title: "Mobile Quick Login (PIN)",
          description: "Re-authenticate on mobile using a PIN for fast access.",
          requestBody: { pin: "123456", authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", username: "admin@demojewelry.com", mobileUDID: "DK0jWo0FTNP5LFjfkPVv7oii86Re53HyOOI6rPrPAZZjiFW3RFC1fJBHIjg5" },
          response: { success: true, authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
          params: [
            { name: "pin", type: "string", required: true, description: "6-digit PIN" },
            { name: "authToken", type: "string", required: true, description: "Current session token" },
            { name: "username", type: "string", required: true, description: "User email" },
            { name: "mobileUDID", type: "string", required: true, description: "Unique device identifier" }
          ]
        },
        {
          id: "mobile-forgot-password",
          method: "POST",
          path: "/Auth/Mobile/forgotPassword",
          title: "Mobile Forgot Password",
          description: "Trigger password reset for a mobile user.",
          requestBody: { username: "admin@demojewelry.com", storeName: "demo3" },
          response: { success: true, message: "Reset link sent", authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
          params: [
            { name: "username", type: "string", required: true, description: "User email" },
            { name: "storeName", type: "string", required: true, description: "Store name" }
          ]
        },
        {
          id: "mobile-resend-otp",
          method: "POST",
          path: "/Auth/Mobile/resendOtp",
          title: "Mobile Resend OTP",
          description: "Resend OTP for mobile authentication flow.",
          requestBody: { authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
          response: { success: true, message: "OTP resent successfully" },
          params: [
            { name: "authToken", type: "string", required: true, description: "Auth token from mobile login step" }
          ]
        },
        {
          id: "mobile-get-profile",
          method: "POST",
          path: "/Mobile/getProfile",
          title: "Get Mobile Profile",
          description: "Get the current authenticated mobile user's profile.",
          requestBody: {},
          response: { success: true, data: { id: "67eba015592f7b47cd9e184e", name: "Admin", email: "admin@demojewelry.com", position: "Administrator", storeName: "demo3" } },
          params: []
        },
        {
          id: "mobile-get-voucher-list",
          method: "POST",
          path: "/Mobile/getVoucherList",
          title: "Get Mobile Voucher List",
          description: "Retrieve available vouchers for mobile POS session.",
          requestBody: {},
          response: { success: true, data: [{ _id: "63c28a219140560b1851274e", name: "POS Sale", code: "PS" }] },
          params: []
        },
        {
          id: "mobile-generate-pos-token",
          method: "POST",
          path: "/Mobile/auth/generatePOSAuthToken",
          title: "Mobile Generate POS Token",
          description: "Generate POS auth token for mobile POS sessions.",
          requestBody: { location_id: "634f6d59ae461466b73d0959", currency: "THB", voucher_id: "63c28a219140560b1851274e" },
          response: { success: true, posToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
          params: [
            { name: "location_id", type: "string", required: true, description: "Store location ID" },
            { name: "currency", type: "string", required: true, description: "Currency code" },
            { name: "voucher_id", type: "string", required: true, description: "Voucher ID" }
          ]
        }
      ]
        }
      ]
    };
