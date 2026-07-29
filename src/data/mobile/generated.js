// Auto-generated from GIS.postman_collection.json — Mobile folder
// Regenerate: node scripts/generate-mobile-docs.js
export default [
  {
    "id": "mobile-customer",
    "label": "Customer",
    "icon": "👤",
    "color": "#8b5cf6",
    "description": "Mobile Customer APIs.",
    "endpoints": [
      {
        "id": "mobile-customer-getpartialpaymenthistory-getpartialpaymenthistory",
        "method": "POST",
        "path": "/Mobile/customer/getpartialPaymentHistory",
        "title": "GetpartialPaymentHistory",
        "description": "Mobile API — /Mobile/customer/getpartialPaymentHistory.",
        "requestBody": {
          "id": "61678b72b3411962d81351aa"
        },
        "response": {
          "success": true,
          "code": 200
        },
        "params": [
          {
            "name": "Authorization",
            "type": "string",
            "required": true,
            "in": "header",
            "description": "JWT from mobile login."
          },
          {
            "name": "id",
            "type": "string",
            "required": false,
            "description": "id field."
          }
        ]
      },
      {
        "id": "mobile-customer-getpartialpaymenttransaction-getpartialpaymenttrans",
        "method": "POST",
        "path": "/Mobile/customer/getpartialPaymentTransaction",
        "title": "GetpartialPaymentTransaction",
        "description": "Mobile API — /Mobile/customer/getpartialPaymentTransaction.",
        "requestBody": {
          "name": "back"
        },
        "response": {
          "success": true,
          "code": 200
        },
        "params": [
          {
            "name": "Authorization",
            "type": "string",
            "required": true,
            "in": "header",
            "description": "JWT from mobile login."
          },
          {
            "name": "name",
            "type": "string",
            "required": false,
            "description": "name field."
          }
        ]
      }
    ]
  },
  {
    "id": "mobile-diamond",
    "label": "Diamond",
    "icon": "💎",
    "color": "#06b6d4",
    "description": "Mobile Diamond APIs.",
    "endpoints": [
      {
        "id": "mobile-diamond-getlist-getlist",
        "method": "POST",
        "path": "/Mobile/diamond/getList",
        "title": "GetList",
        "description": "Mobile API — /Mobile/diamond/getList.",
        "requestBody": {
          "length": 0
        },
        "response": {
          "success": true,
          "code": 200
        },
        "params": [
          {
            "name": "authorization",
            "type": "string",
            "required": true,
            "in": "header",
            "description": "JWT from mobile login."
          },
          {
            "name": "pos-Authorization",
            "type": "string",
            "required": false,
            "in": "header",
            "description": "pos-Authorization header."
          },
          {
            "name": "length",
            "type": "number",
            "required": false,
            "description": "length field."
          }
        ]
      }
    ]
  },
  {
    "id": "mobile-stocktake",
    "label": "stockTake",
    "icon": "📋",
    "color": "#64748b",
    "description": "Mobile stockTake APIs.",
    "endpoints": [
      {
        "id": "mobile-stocktake-stocktakecreate-stocktakecreate",
        "method": "POST",
        "path": "/Mobile/stocktake/stockTakeCreate",
        "title": "StockTakeCreate",
        "description": "Mobile API — /Mobile/stocktake/stockTakeCreate.",
        "requestBody": {
          "unscanned": [
            {
              "SKU": "SB027",
              "stockId": "10002",
              "qty": 1,
              "productId": "63934b15cfc2f65e7f66d926",
              "productStatus": "in"
            },
            {
              "SKU": "SB027",
              "stockId": "10002",
              "qty": 1,
              "productId": "63934b15cfc2f65e7f66d9324",
              "productStatus": "in"
            },
            {
              "SKU": "SB029",
              "stockId": "10002",
              "qty": 1,
              "productId": "63934b15cfc2f65e7f66d936",
              "productStatus": "in"
            },
            {
              "SKU": "SB027",
              "stockId": "10002",
              "qty": 1,
              "productId": "63934b15cfc2f65e7f66d931",
              "productStatus": "out"
            }
          ],
          "scanned": [
            {
              "SKU": "SB025",
              "stockId": "10001",
              "qty": 1,
              "productId": "63934b15cfc2f65e7f66d927",
              "productStatus": "in"
            },
            {
              "SKU": "SB025",
              "stockId": "10001",
              "qty": 1,
              "productId": "63934b15cfc2f65e7f66d922",
              "productStatus": "in"
            },
            {
              "SKU": "SB025",
              "stockId": "10001",
              "qty": 1,
              "productId": "63934b15cfc2f65e7f66d929",
              "productStatus": "in"
            }
          ],
          "conflict": [
            {
              "unknown": "SB025",
              "qty": 1,
              "SKU": "SB025",
              "productId": "63934b15cfc2f65e7f66d921",
              "stockId": "10001"
            }
          ],
          "unknown": [
            {
              "unknown": "SB025777",
              "qty": 0,
              "stockId": ""
            }
          ],
          "voucher_id": "61488a5d1765b12ccb21d645",
          "total_scanned_qty": 3,
          "total_unscanned_qty": 4,
          "conflict_qty": 1,
          "unknown_qty": 1
        },
        "response": {
          "success": true,
          "code": 200
        },
        "params": [
          {
            "name": "Authorization",
            "type": "string",
            "required": true,
            "in": "header",
            "description": "JWT from mobile login."
          },
          {
            "name": "unscanned",
            "type": "string",
            "required": false,
            "description": "unscanned field."
          },
          {
            "name": "scanned",
            "type": "string",
            "required": false,
            "description": "scanned field."
          },
          {
            "name": "conflict",
            "type": "string",
            "required": false,
            "description": "conflict field."
          },
          {
            "name": "unknown",
            "type": "string",
            "required": false,
            "description": "unknown field."
          },
          {
            "name": "voucher_id",
            "type": "string",
            "required": false,
            "description": "voucher_id field."
          },
          {
            "name": "total_scanned_qty",
            "type": "number",
            "required": false,
            "description": "total_scanned_qty field."
          },
          {
            "name": "total_unscanned_qty",
            "type": "number",
            "required": false,
            "description": "total_unscanned_qty field."
          },
          {
            "name": "conflict_qty",
            "type": "number",
            "required": false,
            "description": "conflict_qty field."
          },
          {
            "name": "unknown_qty",
            "type": "number",
            "required": false,
            "description": "unknown_qty field."
          }
        ]
      },
      {
        "id": "mobile-stocktake-stocktakelist-stocktakelist",
        "method": "POST",
        "path": "/Mobile/stocktake/stockTakeList",
        "title": "StockTakeList",
        "description": "Mobile API — /Mobile/stocktake/stockTakeList.",
        "requestBody": {
          "item": [],
          "metal": [],
          "size": [],
          "location": [],
          "collection": [],
          "stone": [],
          "price": {}
        },
        "response": {
          "success": true,
          "code": 200
        },
        "params": [
          {
            "name": "Authorization",
            "type": "string",
            "required": true,
            "in": "header",
            "description": "JWT from mobile login."
          },
          {
            "name": "pos-Authorization",
            "type": "string",
            "required": false,
            "in": "header",
            "description": "pos-Authorization header."
          },
          {
            "name": "item",
            "type": "string",
            "required": false,
            "description": "item field."
          },
          {
            "name": "metal",
            "type": "string",
            "required": false,
            "description": "metal field."
          },
          {
            "name": "size",
            "type": "string",
            "required": false,
            "description": "size field."
          },
          {
            "name": "location",
            "type": "string",
            "required": false,
            "description": "location field."
          },
          {
            "name": "collection",
            "type": "string",
            "required": false,
            "description": "collection field."
          },
          {
            "name": "stone",
            "type": "string",
            "required": false,
            "description": "stone field."
          },
          {
            "name": "price",
            "type": "string",
            "required": false,
            "description": "price field."
          }
        ]
      }
    ]
  },
  {
    "id": "mobile-catalog",
    "label": "catalog",
    "icon": "📚",
    "color": "#f59e0b",
    "description": "Mobile catalog APIs.",
    "endpoints": [
      {
        "id": "mobile-catalog-getcatalogdetail-getcatalogdetail",
        "method": "POST",
        "path": "/Mobile/catalog/getCatalogDetail",
        "title": "GetCatalogDetail",
        "description": "Mobile API — /Mobile/catalog/getCatalogDetail.",
        "requestBody": {},
        "response": {
          "success": true,
          "code": 200
        },
        "params": [
          {
            "name": "Authorization",
            "type": "string",
            "required": true,
            "in": "header",
            "description": "JWT from mobile login."
          },
          {
            "name": "pos-Authorization",
            "type": "string",
            "required": false,
            "in": "header",
            "description": "pos-Authorization header."
          }
        ]
      },
      {
        "id": "mobile-catalog-getfilters-getfilters",
        "method": "POST",
        "path": "/Mobile/catalog/getfilters",
        "title": "Getfilters",
        "description": "Mobile API — /Mobile/catalog/getfilters.",
        "requestBody": {},
        "response": {
          "success": true,
          "code": 200
        },
        "params": [
          {
            "name": "Authorization",
            "type": "string",
            "required": true,
            "in": "header",
            "description": "JWT from mobile login."
          },
          {
            "name": "pos-Authorization",
            "type": "string",
            "required": false,
            "in": "header",
            "description": "pos-Authorization header."
          }
        ]
      },
      {
        "id": "mobile-catalog-getcustomerwishlist-getcustomerwishlist",
        "method": "POST",
        "path": "/Mobile/catalog/getCustomerWishList",
        "title": "GetCustomerWishList",
        "description": "Mobile API — /Mobile/catalog/getCustomerWishList.",
        "requestBody": {},
        "response": {
          "success": true,
          "code": 200
        },
        "params": [
          {
            "name": "Authorization",
            "type": "string",
            "required": true,
            "in": "header",
            "description": "JWT from mobile login."
          },
          {
            "name": "pos-Authorization",
            "type": "string",
            "required": false,
            "in": "header",
            "description": "pos-Authorization header."
          }
        ]
      },
      {
        "id": "mobile-catalog-getproductwishlist-getproductwishlist",
        "method": "POST",
        "path": "/Mobile/catalog/getProductWishList",
        "title": "GetProductWishList",
        "description": "Mobile API — /Mobile/catalog/getProductWishList.",
        "requestBody": {
          "customer_id": "695768f6bf3c2c4f103f64a7",
          "location": "6889bb79a2480004dbbdf086"
        },
        "response": {
          "success": true,
          "code": 200
        },
        "params": [
          {
            "name": "Authorization",
            "type": "string",
            "required": true,
            "in": "header",
            "description": "JWT from mobile login."
          },
          {
            "name": "pos-Authorization",
            "type": "string",
            "required": false,
            "in": "header",
            "description": "pos-Authorization header."
          },
          {
            "name": "customer_id",
            "type": "string",
            "required": false,
            "description": "customer_id field."
          },
          {
            "name": "location",
            "type": "string",
            "required": false,
            "description": "location field."
          }
        ]
      },
      {
        "id": "mobile-catalog-updatewishlist-updatewishlist",
        "method": "POST",
        "path": "/Mobile/catalog/updateWishlist",
        "title": "UpdateWishlist",
        "description": "Mobile API — /Mobile/catalog/updateWishlist.",
        "requestBody": {},
        "response": {
          "success": true,
          "code": 200
        },
        "params": [
          {
            "name": "authorization",
            "type": "string",
            "required": true,
            "in": "header",
            "description": "JWT from mobile login."
          },
          {
            "name": "A",
            "type": "string",
            "required": false,
            "in": "header",
            "description": "A header."
          }
        ]
      }
    ]
  },
  {
    "id": "mobile-quick-view",
    "label": "Quick view",
    "icon": "⚡",
    "color": "#10b981",
    "description": "Mobile Quick view APIs.",
    "endpoints": [
      {
        "id": "mobile-quick-view-result-result",
        "method": "POST",
        "path": "/Mobile/quickView/result",
        "title": "Result",
        "description": "Mobile API — /Mobile/quickView/result.",
        "requestBody": {},
        "response": {
          "success": true,
          "code": 200
        },
        "params": [
          {
            "name": "Authorization",
            "type": "string",
            "required": true,
            "in": "header",
            "description": "JWT from mobile login."
          },
          {
            "name": "pos-Authorization",
            "type": "string",
            "required": false,
            "in": "header",
            "description": "pos-Authorization header."
          }
        ]
      },
      {
        "id": "mobile-quick-view-orderlist-orderlist",
        "method": "POST",
        "path": "/Mobile/quickView/orderList",
        "title": "OrderList",
        "description": "Mobile API — /Mobile/quickView/orderList.",
        "requestBody": {
          "ids": [
            "6923ecb8453c69bc24310e15"
          ]
        },
        "response": {
          "success": true,
          "code": 200
        },
        "params": [
          {
            "name": "Authorization",
            "type": "string",
            "required": true,
            "in": "header",
            "description": "JWT from mobile login."
          },
          {
            "name": "pos-Authorization",
            "type": "string",
            "required": false,
            "in": "header",
            "description": "pos-Authorization header."
          },
          {
            "name": "ids",
            "type": "string",
            "required": false,
            "description": "ids field."
          }
        ]
      },
      {
        "id": "mobile-quick-view-getquickviewlist-getquickviewlist",
        "method": "POST",
        "path": "/Mobile/quickView/getQuickViewList",
        "title": "GetQuickViewList",
        "description": "Mobile API — /Mobile/quickView/getQuickViewList.",
        "requestBody": {
          "search": "",
          "type": "inventory",
          "location": [],
          "size": [
            "69425b109be0b3ba3e93da70"
          ],
          "stone": [
            "69425b109be0b3ba3e93da7a"
          ],
          "metal": [
            "693fccbbfb1c3f28c1bcead5"
          ]
        },
        "response": {
          "success": true,
          "code": 200
        },
        "params": [
          {
            "name": "Authorization",
            "type": "string",
            "required": true,
            "in": "header",
            "description": "JWT from mobile login."
          },
          {
            "name": "pos-Authorization",
            "type": "string",
            "required": false,
            "in": "header",
            "description": "pos-Authorization header."
          },
          {
            "name": "search",
            "type": "string",
            "required": false,
            "description": "search field."
          },
          {
            "name": "type",
            "type": "string",
            "required": false,
            "description": "type field."
          },
          {
            "name": "location",
            "type": "string",
            "required": false,
            "description": "location field."
          },
          {
            "name": "size",
            "type": "string",
            "required": false,
            "description": "size field."
          },
          {
            "name": "stone",
            "type": "string",
            "required": false,
            "description": "stone field."
          },
          {
            "name": "metal",
            "type": "string",
            "required": false,
            "description": "metal field."
          }
        ]
      },
      {
        "id": "mobile-quick-view-getquickviewsearch-getquickviewsearch",
        "method": "POST",
        "path": "/Mobile/quickView/getQuickViewSearch",
        "title": "GetQuickViewSearch",
        "description": "Mobile API — /Mobile/quickView/getQuickViewSearch.",
        "requestBody": {},
        "response": {
          "success": true,
          "code": 200
        },
        "params": [
          {
            "name": "Authorization",
            "type": "string",
            "required": true,
            "in": "header",
            "description": "JWT from mobile login."
          },
          {
            "name": "pos-Authorization",
            "type": "string",
            "required": false,
            "in": "header",
            "description": "pos-Authorization header."
          }
        ]
      }
    ]
  },
  {
    "id": "mobile-receive",
    "label": "receive",
    "icon": "💰",
    "color": "#14b8a6",
    "description": "Mobile receive APIs.",
    "endpoints": [
      {
        "id": "mobile-receive-laybylist-laybylist",
        "method": "POST",
        "path": "/Mobile/receive/LayByList",
        "title": "LayByList",
        "description": "Mobile API — /Mobile/receive/LayByList.",
        "requestBody": {
          "type": "ALL"
        },
        "response": {
          "success": true,
          "code": 200
        },
        "params": [
          {
            "name": "Authorization",
            "type": "string",
            "required": true,
            "in": "header",
            "description": "JWT from mobile login."
          },
          {
            "name": "pos-Authorization",
            "type": "string",
            "required": false,
            "in": "header",
            "description": "pos-Authorization header."
          },
          {
            "name": "type",
            "type": "string",
            "required": false,
            "description": "type field."
          }
        ]
      },
      {
        "id": "mobile-receive-getlaybyskulist-getlaybyskulist",
        "method": "POST",
        "path": "/Mobile/receive/getLayBySKUList",
        "title": "GetLayBySKUList",
        "description": "Mobile API — /Mobile/receive/getLayBySKUList.",
        "requestBody": {
          "id": "64a6a9c3c723bdf5c85a2c58",
          "type": "lay_by"
        },
        "response": {
          "success": true,
          "code": 200
        },
        "params": [
          {
            "name": "Authorization",
            "type": "string",
            "required": true,
            "in": "header",
            "description": "JWT from mobile login."
          },
          {
            "name": "pos-Authorization",
            "type": "string",
            "required": false,
            "in": "header",
            "description": "pos-Authorization header."
          },
          {
            "name": "id",
            "type": "string",
            "required": false,
            "description": "id field."
          },
          {
            "name": "type",
            "type": "string",
            "required": false,
            "description": "type field."
          }
        ]
      },
      {
        "id": "mobile-receive-calculateinstallments-calculateinstallments",
        "method": "POST",
        "path": "/Mobile/receive/calculateInstallments",
        "title": "CalculateInstallments",
        "description": "Mobile API — /Mobile/receive/calculateInstallments.",
        "requestBody": {
          "installment": 4,
          "term": 1,
          "status_type": "pos_order",
          "amount": 3182.76
        },
        "response": {
          "success": true,
          "code": 200
        },
        "params": [
          {
            "name": "Authorization",
            "type": "string",
            "required": true,
            "in": "header",
            "description": "JWT from mobile login."
          },
          {
            "name": "pos-Authorization",
            "type": "string",
            "required": false,
            "in": "header",
            "description": "pos-Authorization header."
          },
          {
            "name": "installment",
            "type": "number",
            "required": false,
            "description": "installment field."
          },
          {
            "name": "term",
            "type": "number",
            "required": false,
            "description": "term field."
          },
          {
            "name": "status_type",
            "type": "string",
            "required": false,
            "description": "status_type field."
          },
          {
            "name": "amount",
            "type": "number",
            "required": false,
            "description": "amount field."
          }
        ]
      },
      {
        "id": "mobile-receive-savelaybydetails-savelaybydetails",
        "method": "POST",
        "path": "/Mobile/receive/saveLayByDetails",
        "title": "SaveLayByDetails",
        "description": "Mobile API — /Mobile/receive/saveLayByDetails.",
        "requestBody": {},
        "response": {
          "success": true,
          "code": 200
        },
        "params": [
          {
            "name": "authorization",
            "type": "string",
            "required": true,
            "in": "header",
            "description": "JWT from mobile login."
          }
        ]
      },
      {
        "id": "mobile-receive-saveinstallmentdetails-saveinstallmentdetails",
        "method": "POST",
        "path": "/Mobile/receive/saveInstallmentDetails",
        "title": "SaveInstallmentDetails",
        "description": "Mobile API — /Mobile/receive/saveInstallmentDetails.",
        "requestBody": {},
        "response": {
          "success": true,
          "code": 200
        },
        "params": [
          {
            "name": "authorization",
            "type": "string",
            "required": true,
            "in": "header",
            "description": "JWT from mobile login."
          }
        ]
      }
    ]
  },
  {
    "id": "mobile-quotation",
    "label": "Quotation",
    "icon": "📝",
    "color": "#6366f1",
    "description": "Mobile Quotation APIs.",
    "endpoints": [
      {
        "id": "mobile-quotation-getquatationlist-getquatationlist",
        "method": "POST",
        "path": "/Mobile/quatation/getQuatationList",
        "title": "GetQuotationList",
        "description": "Mobile API — /Mobile/quatation/getQuatationList.",
        "requestBody": {
          "customer_id": "63ac13fa680ae0592fc3be23"
        },
        "response": {
          "success": true,
          "code": 200
        },
        "params": [
          {
            "name": "Authorization",
            "type": "string",
            "required": true,
            "in": "header",
            "description": "JWT from mobile login."
          },
          {
            "name": "pos-Authorization",
            "type": "string",
            "required": false,
            "in": "header",
            "description": "pos-Authorization header."
          },
          {
            "name": "customer_id",
            "type": "string",
            "required": false,
            "description": "customer_id field."
          }
        ]
      },
      {
        "id": "mobile-quotation-getquatationsublist-getquatationsublist",
        "method": "POST",
        "path": "/Mobile/quatation/getQuatationSubList",
        "title": "GetQuotationSubList",
        "description": "Mobile API — /Mobile/quatation/getQuatationSubList.",
        "requestBody": {
          "quotation_id": "64ac0afa5665a8403fbadcdf"
        },
        "response": {
          "success": true,
          "code": 200
        },
        "params": [
          {
            "name": "Authorization",
            "type": "string",
            "required": true,
            "in": "header",
            "description": "JWT from mobile login."
          },
          {
            "name": "pos-Authorization",
            "type": "string",
            "required": false,
            "in": "header",
            "description": "pos-Authorization header."
          },
          {
            "name": "quotation_id",
            "type": "string",
            "required": false,
            "description": "quotation_id field."
          }
        ]
      },
      {
        "id": "mobile-quotation-removequatation-removequatation",
        "method": "POST",
        "path": "/Mobile/quatation/removeQuatation",
        "title": "RemoveQuotation",
        "description": "Mobile API — /Mobile/quatation/removeQuatation.",
        "requestBody": {
          "quotation_id": "64a806dd8c17df4a395e5c5e"
        },
        "response": {
          "success": true,
          "code": 200
        },
        "params": [
          {
            "name": "Authorization",
            "type": "string",
            "required": true,
            "in": "header",
            "description": "JWT from mobile login."
          },
          {
            "name": "POS_Authorization",
            "type": "string",
            "required": false,
            "in": "header",
            "description": "POS_Authorization header."
          },
          {
            "name": "quotation_id",
            "type": "string",
            "required": false,
            "description": "quotation_id field."
          }
        ]
      },
      {
        "id": "mobile-quotation-savequatation-savequatation",
        "method": "POST",
        "path": "/Mobile/quatation/saveQuatation",
        "title": "SaveQuotation",
        "description": "Mobile API — /Mobile/quatation/saveQuatation.",
        "requestBody": {
          "sell_info": {
            "cart": [
              {
                "product_details": {
                  "product_id": "6382cec4962d9c3c23330984",
                  "po_product_id": "",
                  "Metal": "6355fbddc734e545a850dd02",
                  "Stones": [
                    {
                      "stone_group": "",
                      "stone": "63b55cd722ce29b1f7fa54ec",
                      "Variant": "2",
                      "Align": "",
                      "shape": "63560779c0d74d7f332ea992",
                      "Cut": "6375cf6b3c04c60444751a14",
                      "quality": "",
                      "clarity": "636c7b4edcf7ec0c616fea67",
                      "color": "636c7c2abc8a8f3720133d61",
                      "Size": "638dc41217ae947408110ef8",
                      "Unit": "Cts",
                      "Pcs": "2",
                      "Cts": "2",
                      "Price": "2",
                      "Pointer": "0.30",
                      "setting_type": "635648f9b645d00d7b1875dd",
                      "certificate": {
                        "type": "AGS",
                        "number": "2342342343243432423424"
                      }
                    },
                    {
                      "stone_group": "",
                      "stone": "63b55cd722ce29b1f7fa54ec",
                      "Variant": "0",
                      "Align": "",
                      "shape": "636cc19eae461466b73d09b6",
                      "Cut": "639080b91311c81aacc6d8e5",
                      "quality": "",
                      "clarity": "635607ba044ba54bde4d2a14",
                      "color": "636c7c2abc8a8f3720133d61",
                      "Size": "638dc41217ae947408110ef8",
                      "Unit": "Cts",
                      "Pcs": "2",
                      "Cts": "2",
                      "Price": "2",
                      "Pointer": "",
                      "setting_type": "635648f0044ba54bde4d2a1a",
                      "certificate": {
                        "type": "",
                        "number": ""
                      }
                    },
                    {
                      "stone_group": "",
                      "stone": "63b55cd722ce29b1f7fa54ec",
                      "Variant": "0",
                      "Align": "",
                      "shape": "",
                      "Cut": "",
                      "quality": "",
                      "clarity": "",
                      "color": "",
                      "Size": "63858e2ec0d74d7f332eaa15",
                      "Unit": "Cts",
                      "Pcs": "2",
                      "Cts": "22",
                      "Price": "2",
                      "Pointer": "",
                      "setting_type": "635648d4c0d74d7f332ea994",
                      "certificate": {
                        "type": "",
                        "number": ""
                      }
                    }
                  ],
                  "stock_id": "",
                  "retailprice_Inc": 10000
                },
                "customer_id": "63ac13fa680ae0592fc3be23",
                "sales_person_id": "6379ae9e28021528d413c0df",
                "location_id": "634f6d59ae461466b73d0959",
                "Qty": 1,
                "type": "custom_order",
                "status": {
                  "is_custom_design": 0,
                  "cart_status": 0,
                  "priority": 0
                },
                "retailprice_Inc": 10000,
                "price": 10000,
                "order_type": "custom_order",
                "SKU": "SB026",
                "main_image": "https://gis247.s3.us-east-2.amazonaws.com/2022th0038/products/image/1669517165346.png",
                "product_id": "6382cec4962d9c3c23330984",
                "po_product_id": "",
                "name": "CLASSIC SOLITAIRE BAND SOLITAIRE COLLECTION   SB026",
                "Metal": "6355fbddc734e545a850dd02",
                "Size": "636c6e81f358a963864565b6",
                "Stones": [
                  {
                    "stone_group": "",
                    "stone": "63b55cd722ce29b1f7fa54ec",
                    "Variant": "2",
                    "Align": "",
                    "shape": "63560779c0d74d7f332ea992",
                    "Cut": "6375cf6b3c04c60444751a14",
                    "quality": "",
                    "clarity": "636c7b4edcf7ec0c616fea67",
                    "color": "636c7c2abc8a8f3720133d61",
                    "Size": "638dc41217ae947408110ef8",
                    "Unit": "Cts",
                    "Pcs": "2",
                    "Cts": "2",
                    "Price": "2",
                    "Pointer": "0.30",
                    "setting_type": "635648f9b645d00d7b1875dd",
                    "certificate": {
                      "type": "AGS",
                      "number": "2342342343243432423424"
                    }
                  },
                  {
                    "stone_group": "",
                    "stone": "63b55cd722ce29b1f7fa54ec",
                    "Variant": "0",
                    "Align": "",
                    "shape": "636cc19eae461466b73d09b6",
                    "Cut": "639080b91311c81aacc6d8e5",
                    "quality": "",
                    "clarity": "635607ba044ba54bde4d2a14",
                    "color": "636c7c2abc8a8f3720133d61",
                    "Size": "638dc41217ae947408110ef8",
                    "Unit": "Cts",
                    "Pcs": "2",
                    "Cts": "2",
                    "Price": "2",
                    "Pointer": "",
                    "setting_type": "635648f0044ba54bde4d2a1a",
                    "certificate": {
                      "type": "",
                      "number": ""
                    }
                  },
                  {
                    "stone_group": "",
                    "stone": "63b55cd722ce29b1f7fa54ec",
                    "Variant": "0",
                    "Align": "",
                    "shape": "",
                    "Cut": "",
                    "quality": "",
                    "clarity": "",
                    "color": "",
                    "Size": "63858e2ec0d74d7f332eaa15",
                    "Unit": "Cts",
                    "Pcs": "2",
                    "Cts": "22",
                    "Price": "2",
                    "Pointer": "",
                    "setting_type": "635648d4c0d74d7f332ea994",
                    "certificate": {
                      "type": "",
                      "number": ""
                    }
                  }
                ],
                "stock_id": "102",
                "size_name": "42",
                "delivery_date": "2024-01-01T13:36:34.583Z",
                "custom_cart_id": "64ac095dc103d1eee04a8cc1",
                "stock_id_options": [
                  {
                    "value": "102",
                    "label": "102"
                  },
                  {
                    "value": "101",
                    "label": "101"
                  },
                  {
                    "value": "102",
                    "label": "102"
                  }
                ],
                "status_type": "custom_order",
                "discount_percent": 0,
                "Discount_Amount": 0,
                "stone_name": "Melee Diamond 1 pts.",
                "Service_labour_exsist": false,
                "id": "6382cec4962d9c3c23330984"
              }
            ],
            "summary_order": {
              "labour": 0,
              "shipping": 0,
              "loyality_points": 0,
              "customer_id": {
                "id": "63ac13fa680ae0592fc3be23",
                "name": "Deepak  Kumar Sharma"
              },
              "sales_person_id": {
                "value": "6379ae9e28021528d413c0df",
                "label": "Born Born"
              },
              "discount": 0,
              "discount_percent": 0,
              "deposit": 10,
              "deposit_amount": 1000,
              "tax_amount": 0,
              "tax_amount_int": 0,
              "tax_prect": 0,
              "tax_type": "",
              "Sub_Total": 10000
            },
            "status_type": "custom_order",
            "totalamount": 10000
          },
          "totalamount": 1000,
          "quatetime": "for weeding",
          "duedate": "2023-07-10T13:36:29.581Z"
        },
        "response": {
          "success": true,
          "code": 200
        },
        "params": [
          {
            "name": "Authorization",
            "type": "string",
            "required": true,
            "in": "header",
            "description": "JWT from mobile login."
          },
          {
            "name": "pos-Authorization",
            "type": "string",
            "required": false,
            "in": "header",
            "description": "pos-Authorization header."
          },
          {
            "name": "sell_info",
            "type": "string",
            "required": false,
            "description": "sell_info field."
          },
          {
            "name": "totalamount",
            "type": "number",
            "required": false,
            "description": "totalamount field."
          },
          {
            "name": "quatetime",
            "type": "string",
            "required": false,
            "description": "quatetime field."
          },
          {
            "name": "duedate",
            "type": "string",
            "required": false,
            "description": "duedate field."
          }
        ]
      },
      {
        "id": "mobile-quotation-quotationcartinfo-quotationcartinfo",
        "method": "POST",
        "path": "/Mobile/quatation/quotationCartInfo",
        "title": "QuotationCartInfo",
        "description": "Mobile API — /Mobile/quatation/quotationCartInfo.",
        "requestBody": {
          "type": "Custom_Order",
          "quotation_id": "657d35e73b39d6b5d38b33ee",
          "cart_id": "657d35dd3b39d6b5d38b3332"
        },
        "response": {
          "success": true,
          "code": 200
        },
        "params": [
          {
            "name": "Authorization",
            "type": "string",
            "required": true,
            "in": "header",
            "description": "JWT from mobile login."
          },
          {
            "name": "pos-Authorization",
            "type": "string",
            "required": false,
            "in": "header",
            "description": "pos-Authorization header."
          },
          {
            "name": "type",
            "type": "string",
            "required": false,
            "description": "type field."
          },
          {
            "name": "quotation_id",
            "type": "string",
            "required": false,
            "description": "quotation_id field."
          },
          {
            "name": "cart_id",
            "type": "string",
            "required": false,
            "description": "cart_id field."
          }
        ]
      }
    ]
  },
  {
    "id": "mobile-itemsearch",
    "label": "itemsearch",
    "icon": "🔍",
    "color": "#0ea5e9",
    "description": "Mobile itemsearch APIs.",
    "endpoints": [
      {
        "id": "mobile-itemsearch-itemsearchdata-itemsearchdata",
        "method": "POST",
        "path": "/Mobile/itemsearch/itemSearchData",
        "title": "ItemSearchData",
        "description": "Mobile API — /Mobile/itemsearch/itemSearchData.",
        "requestBody": {
          "type": "SKU",
          "search": "CLEO-B1"
        },
        "response": {
          "success": true,
          "code": 200
        },
        "params": [
          {
            "name": "Authorization",
            "type": "string",
            "required": true,
            "in": "header",
            "description": "JWT from mobile login."
          },
          {
            "name": "pos-Authorization",
            "type": "string",
            "required": false,
            "in": "header",
            "description": "pos-Authorization header."
          },
          {
            "name": "type",
            "type": "string",
            "required": false,
            "description": "type field."
          },
          {
            "name": "search",
            "type": "string",
            "required": false,
            "description": "search field."
          }
        ]
      },
      {
        "id": "mobile-itemsearch-itemsearchlist-itemsearchlist",
        "method": "POST",
        "path": "/Mobile/itemsearch/itemSearchList",
        "title": "ItemSearchList",
        "description": "Mobile API — /Mobile/itemsearch/itemSearchList.",
        "requestBody": {
          "type": "SKU",
          "location_id": [
            "690061188a80c2de65ea0678"
          ],
          "search": "CLEO-B1"
        },
        "response": {
          "success": true,
          "code": 200
        },
        "params": [
          {
            "name": "Authorization",
            "type": "string",
            "required": true,
            "in": "header",
            "description": "JWT from mobile login."
          },
          {
            "name": "pos-Authorization",
            "type": "string",
            "required": false,
            "in": "header",
            "description": "pos-Authorization header."
          },
          {
            "name": "type",
            "type": "string",
            "required": false,
            "description": "type field."
          },
          {
            "name": "location_id",
            "type": "string",
            "required": false,
            "description": "location_id field."
          },
          {
            "name": "search",
            "type": "string",
            "required": false,
            "description": "search field."
          }
        ]
      }
    ]
  },
  {
    "id": "mobile-common",
    "label": "common",
    "icon": "⚙️",
    "color": "#475569",
    "description": "Mobile common APIs.",
    "endpoints": [
      {
        "id": "mobile-common-getpossettings-getpossettings",
        "method": "POST",
        "path": "/Mobile/common/getPOSSettings",
        "title": "GetPOSSettings",
        "description": "Mobile API — /Mobile/common/getPOSSettings.",
        "requestBody": {},
        "response": {
          "success": true,
          "code": 200
        },
        "params": [
          {
            "name": "Authorization",
            "type": "string",
            "required": true,
            "in": "header",
            "description": "JWT from mobile login."
          },
          {
            "name": "pos-Authorization",
            "type": "string",
            "required": false,
            "in": "header",
            "description": "pos-Authorization header."
          }
        ]
      },
      {
        "id": "mobile-common-getvoucherstatus-getvoucherstatus",
        "method": "POST",
        "path": "/Mobile/common/getVoucherStatus",
        "title": "GetVoucherStatus",
        "description": "Mobile API — /Mobile/common/getVoucherStatus.",
        "requestBody": {},
        "response": {
          "success": true,
          "code": 200
        },
        "params": [
          {
            "name": "Authorization",
            "type": "string",
            "required": true,
            "in": "header",
            "description": "JWT from mobile login."
          },
          {
            "name": "pos-Authorization",
            "type": "string",
            "required": false,
            "in": "header",
            "description": "pos-Authorization header."
          }
        ]
      }
    ]
  },
  {
    "id": "mobile-my",
    "label": "my",
    "icon": "📦",
    "color": "#0891b2",
    "description": "Mobile my APIs.",
    "endpoints": [
      {
        "id": "mobile-my-itemsearchdata-itemsearchdata",
        "method": "POST",
        "path": "/Mobile/itemsearch/itemSearchData",
        "title": "ItemSearchData",
        "description": "Mobile API — /Mobile/itemsearch/itemSearchData.",
        "requestBody": {
          "search": "11",
          "type": "stock_id"
        },
        "response": {
          "success": true,
          "code": 200
        },
        "params": [
          {
            "name": "Authorization",
            "type": "string",
            "required": true,
            "in": "header",
            "description": "JWT from mobile login."
          },
          {
            "name": "pos-Authorization",
            "type": "string",
            "required": false,
            "in": "header",
            "description": "pos-Authorization header."
          },
          {
            "name": "search",
            "type": "string",
            "required": false,
            "description": "search field."
          },
          {
            "name": "type",
            "type": "string",
            "required": false,
            "description": "type field."
          }
        ]
      },
      {
        "id": "mobile-my-getinventorylist-getinventorylist",
        "method": "POST",
        "path": "/Mobile/my/getInventoryList",
        "title": "GetInventoryList",
        "description": "Mobile API — /Mobile/my/getInventoryList.",
        "requestBody": {
          "search": "",
          "limit": "100",
          "skip": "",
          "filter": {
            "status": [
              "stock"
            ]
          }
        },
        "response": {
          "success": true,
          "code": 200
        },
        "params": [
          {
            "name": "Authorization",
            "type": "string",
            "required": true,
            "in": "header",
            "description": "JWT from mobile login."
          },
          {
            "name": "pos-Authorization",
            "type": "string",
            "required": false,
            "in": "header",
            "description": "pos-Authorization header."
          },
          {
            "name": "search",
            "type": "string",
            "required": false,
            "description": "search field."
          },
          {
            "name": "limit",
            "type": "string",
            "required": false,
            "description": "limit field."
          },
          {
            "name": "skip",
            "type": "string",
            "required": false,
            "description": "skip field."
          },
          {
            "name": "filter",
            "type": "string",
            "required": false,
            "description": "filter field."
          }
        ]
      },
      {
        "id": "mobile-my-itemkeysearch-itemkeysearch",
        "method": "POST",
        "path": "/Mobile/my/itemKeySearch",
        "title": "ItemKeySearch",
        "description": "Mobile API — /Mobile/my/itemKeySearch.",
        "requestBody": {
          "search": "",
          "type": "SKU"
        },
        "response": {
          "success": true,
          "code": 200
        },
        "params": [
          {
            "name": "Authorization",
            "type": "string",
            "required": true,
            "in": "header",
            "description": "JWT from mobile login."
          },
          {
            "name": "pos-Authorization",
            "type": "string",
            "required": false,
            "in": "header",
            "description": "pos-Authorization header."
          },
          {
            "name": "search",
            "type": "string",
            "required": false,
            "description": "search field."
          },
          {
            "name": "type",
            "type": "string",
            "required": false,
            "description": "type field."
          }
        ]
      },
      {
        "id": "mobile-my-getfilters-getfilters",
        "method": "POST",
        "path": "/Mobile/my/getFilters",
        "title": "GetFilters",
        "description": "Mobile API — /Mobile/my/getFilters.",
        "requestBody": {
          "type": "catalog",
          "hideLocation": false
        },
        "response": {
          "success": true,
          "code": 200
        },
        "params": [
          {
            "name": "Authorization",
            "type": "string",
            "required": true,
            "in": "header",
            "description": "JWT from mobile login."
          },
          {
            "name": "pos-Authorization",
            "type": "string",
            "required": false,
            "in": "header",
            "description": "pos-Authorization header."
          },
          {
            "name": "type",
            "type": "string",
            "required": false,
            "description": "type field."
          },
          {
            "name": "hideLocation",
            "type": "boolean",
            "required": false,
            "description": "hideLocation field."
          }
        ]
      },
      {
        "id": "mobile-my-getsummery-getsummery",
        "method": "POST",
        "path": "/Mobile/my/getSummery",
        "title": "GetSummery",
        "description": "Mobile API — /Mobile/my/getSummery.",
        "requestBody": {},
        "response": {
          "success": true,
          "code": 200
        },
        "params": [
          {
            "name": "Authorization",
            "type": "string",
            "required": true,
            "in": "header",
            "description": "JWT from mobile login."
          },
          {
            "name": "pos-Authorization",
            "type": "string",
            "required": false,
            "in": "header",
            "description": "pos-Authorization header."
          }
        ]
      },
      {
        "id": "mobile-my-summeryskudetails-summeryskudetails",
        "method": "POST",
        "path": "/Mobile/my/summerySkuDetails",
        "title": "SummerySkuDetails",
        "description": "Mobile API — /Mobile/my/summerySkuDetails.",
        "requestBody": {
          "id": "695ce00aa8d75979d0ce8d30"
        },
        "response": {
          "success": true,
          "code": 200
        },
        "params": [
          {
            "name": "Authorization",
            "type": "string",
            "required": true,
            "in": "header",
            "description": "JWT from mobile login."
          },
          {
            "name": "pos-Authorization",
            "type": "string",
            "required": false,
            "in": "header",
            "description": "pos-Authorization header."
          },
          {
            "name": "id",
            "type": "string",
            "required": false,
            "description": "id field."
          }
        ]
      },
      {
        "id": "mobile-my-createreserve-createreserve",
        "method": "POST",
        "path": "/Mobile/my/createReserve",
        "title": "CreateReserve",
        "description": "Mobile API — /Mobile/my/createReserve.",
        "requestBody": {},
        "response": {
          "success": true,
          "code": 200
        },
        "params": [
          {
            "name": "Authorization",
            "type": "string",
            "required": true,
            "in": "header",
            "description": "JWT from mobile login."
          },
          {
            "name": "pos-Authorization",
            "type": "string",
            "required": false,
            "in": "header",
            "description": "pos-Authorization header."
          }
        ]
      },
      {
        "id": "mobile-my-getreservelist-getreservelist",
        "method": "POST",
        "path": "/Mobile/my/getReserveList",
        "title": "GetReserveList",
        "description": "Mobile API — /Mobile/my/getReserveList.",
        "requestBody": {
          "Search": "",
          "collection": "",
          "metal": "",
          "item": "",
          "SKU": "",
          "size": "",
          "productStatus": "",
          "location": ""
        },
        "response": {
          "success": true,
          "code": 200
        },
        "params": [
          {
            "name": "Authorization",
            "type": "string",
            "required": true,
            "in": "header",
            "description": "JWT from mobile login."
          },
          {
            "name": "pos-Authorization",
            "type": "string",
            "required": false,
            "in": "header",
            "description": "pos-Authorization header."
          },
          {
            "name": "Search",
            "type": "string",
            "required": false,
            "description": "Search field."
          },
          {
            "name": "collection",
            "type": "string",
            "required": false,
            "description": "collection field."
          },
          {
            "name": "metal",
            "type": "string",
            "required": false,
            "description": "metal field."
          },
          {
            "name": "item",
            "type": "string",
            "required": false,
            "description": "item field."
          },
          {
            "name": "SKU",
            "type": "string",
            "required": false,
            "description": "SKU field."
          },
          {
            "name": "size",
            "type": "string",
            "required": false,
            "description": "size field."
          },
          {
            "name": "productStatus",
            "type": "string",
            "required": false,
            "description": "productStatus field."
          },
          {
            "name": "location",
            "type": "string",
            "required": false,
            "description": "location field."
          }
        ]
      },
      {
        "id": "mobile-my-removereserve-removereserve",
        "method": "POST",
        "path": "/Mobile/itemsearch/removeReserve",
        "title": "RemoveReserve",
        "description": "Mobile API — /Mobile/itemsearch/removeReserve.",
        "requestBody": {},
        "response": {
          "success": true,
          "code": 200
        },
        "params": [
          {
            "name": "authorization",
            "type": "string",
            "required": true,
            "in": "header",
            "description": "JWT from mobile login."
          }
        ]
      },
      {
        "id": "mobile-my-itemsearchsoldtransection-itemsearchsoldtransection",
        "method": "POST",
        "path": "/Mobile/my/itemSearchSoldTransection",
        "title": "ItemSearchSoldTransection",
        "description": "Mobile API — /Mobile/my/itemSearchSoldTransection.",
        "requestBody": {
          "ids": [
            "695f6db8b9e93b3a37dc8222"
          ],
          "type": "sold"
        },
        "response": {
          "success": true,
          "code": 200
        },
        "params": [
          {
            "name": "Authorization",
            "type": "string",
            "required": true,
            "in": "header",
            "description": "JWT from mobile login."
          },
          {
            "name": "pos-Authorization",
            "type": "string",
            "required": false,
            "in": "header",
            "description": "pos-Authorization header."
          },
          {
            "name": "ids",
            "type": "string",
            "required": false,
            "description": "ids field."
          },
          {
            "name": "type",
            "type": "string",
            "required": false,
            "description": "type field."
          }
        ]
      },
      {
        "id": "mobile-my-itemsearchtransection-itemsearchtransection",
        "method": "POST",
        "path": "/Mobile/my/itemSearchTransection",
        "title": "ItemSearchTransection",
        "description": "Mobile API — /Mobile/my/itemSearchTransection.",
        "requestBody": {
          "SKU": "CLEO-B1"
        },
        "response": {
          "success": true,
          "code": 200
        },
        "params": [
          {
            "name": "Authorization",
            "type": "string",
            "required": true,
            "in": "header",
            "description": "JWT from mobile login."
          },
          {
            "name": "pos-Authorization",
            "type": "string",
            "required": false,
            "in": "header",
            "description": "pos-Authorization header."
          },
          {
            "name": "SKU",
            "type": "string",
            "required": false,
            "description": "SKU field."
          }
        ]
      }
    ]
  },
  {
    "id": "mobile-pos",
    "label": "POS",
    "icon": "🛒",
    "color": "#ef4444",
    "description": "Mobile POS APIs.",
    "subsections": [
      {
        "id": "mobile-pos-common",
        "label": "common",
        "color": "#ef4444",
        "endpoints": [
          {
            "id": "mobile-pos-common-getitemlist-getitemlist",
            "method": "POST",
            "path": "/Mobile/pos/common/getItemList",
            "title": "GetItemList",
            "description": "Mobile API — /Mobile/pos/common/getItemList.",
            "requestBody": {},
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "Authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              },
              {
                "name": "pos-Authorization",
                "type": "string",
                "required": false,
                "in": "header",
                "description": "pos-Authorization header."
              }
            ]
          },
          {
            "id": "mobile-pos-common-loginpinverify-loginpinverify",
            "method": "POST",
            "path": "/Mobile/pos/common/loginPINVerify",
            "title": "LoginPINVerify",
            "description": "Mobile API — /Mobile/pos/common/loginPINVerify.",
            "requestBody": {},
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "Authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              },
              {
                "name": "pos-Authorization",
                "type": "string",
                "required": false,
                "in": "header",
                "description": "pos-Authorization header."
              }
            ]
          }
        ]
      },
      {
        "id": "mobile-pos-custom-order",
        "label": "custom Order",
        "color": "#ef4444",
        "endpoints": [
          {
            "id": "mobile-pos-custom-order-savecustomorder-savecustomorder",
            "method": "POST",
            "path": "/Mobile/pos/customOrder/saveCustomOrder",
            "title": "SaveCustomOrder",
            "description": "Mobile API — /Mobile/pos/customOrder/saveCustomOrder.",
            "requestBody": {
              "sell_info": {
                "cart": [
                  {
                    "product_details": {
                      "product_id": "665ea40669f759d88cca067a",
                      "po_product_id": "6675034a8061a79d99bb06d4",
                      "Metal": "6355fb99243c42797d24c534",
                      "Stones": [
                        {
                          "stone_group": "63560539dcf7ec0c616fea1f",
                          "stone": "6356061d2572146aa404d2d2",
                          "Variant": "2",
                          "Align": "",
                          "shape": "63560779c0d74d7f332ea992",
                          "Cut": "635607932572146aa404d2d6",
                          "quality": "",
                          "clarity": "636c7b71671a877a9c779c81",
                          "color": "636c7c4a28021528d413c0b9",
                          "Size": "63560917044ba54bde4d2a16",
                          "Unit": "Cts",
                          "Pcs": "1",
                          "Cts": "0.20",
                          "Price": 20000,
                          "Pointer": "0.20",
                          "setting_type": "636c8418bc8a8f3720133d64",
                          "certificate": {
                            "type": "",
                            "number": ""
                          },
                          "size_name": "3.80MM",
                          "stone_name": "Diamond",
                          "shape_name": "Brilliant Round",
                          "clarity_name": "VS2",
                          "color_name": "J",
                          "setting_name": "Solitaire",
                          "cut_name": "Heart & Arrow"
                        },
                        {
                          "stone_group": "63560539dcf7ec0c616fea1f",
                          "stone": "6356061d2572146aa404d2d2",
                          "Variant": "0",
                          "Align": "",
                          "shape": "63560779c0d74d7f332ea992",
                          "Cut": "6375cf6b3c04c604447519ea",
                          "quality": "",
                          "clarity": "636c7b71671a877a9c779c81",
                          "color": "636c7c4a28021528d413c0b9",
                          "Size": "63560917044ba54bde4d2a16",
                          "Unit": "Cts",
                          "Pcs": "100",
                          "Cts": "0.20",
                          "Price": 0,
                          "Pointer": "0",
                          "setting_type": "635648d4c0d74d7f332ea994",
                          "certificate": {
                            "type": "",
                            "number": ""
                          },
                          "size_name": "3.80MM",
                          "stone_name": "Diamond",
                          "shape_name": "Brilliant Round",
                          "clarity_name": "VS2",
                          "color_name": "J",
                          "setting_name": "Pave",
                          "cut_name": "Normal Cut"
                        },
                        {
                          "stone_group": "63560539dcf7ec0c616fea1f",
                          "stone": "6356061d2572146aa404d2d2",
                          "Variant": "0",
                          "Align": "",
                          "shape": "63560779c0d74d7f332ea992",
                          "Cut": "6375cf6b3c04c604447519ea",
                          "quality": "",
                          "clarity": "636c7b8928021528d413c0b7",
                          "color": "636c7c4a28021528d413c0b9",
                          "Size": "63858e2ec0d74d7f332eaa15",
                          "Unit": "Cts",
                          "Pcs": "2",
                          "Cts": "0.20",
                          "Price": 0,
                          "Pointer": "0",
                          "setting_type": "635648d4c0d74d7f332ea994",
                          "certificate": {
                            "type": "",
                            "number": ""
                          },
                          "size_name": "1.25MM",
                          "stone_name": "Diamond",
                          "shape_name": "Brilliant Round",
                          "clarity_name": "VVS2",
                          "color_name": "J",
                          "setting_name": "Pave",
                          "cut_name": "Normal Cut"
                        }
                      ],
                      "product_variants_enable": "2",
                      "stock_id": "1001",
                      "po_QTY": 1,
                      "retailprice_Inc": 31841
                    },
                    "customer_id": "65153b7aed2ad528022035f1",
                    "sales_person_id": "6379ae9e28021528d413c0df",
                    "location_id": "634f6d59ae461466b73d0959",
                    "parentCartId": "667505248061a79d99bb109a",
                    "Qty": 1,
                    "type": "repair_order",
                    "product_type": "repair_order",
                    "status": {
                      "is_repair": 0,
                      "cart_status": 0,
                      "priority": 0
                    },
                    "retailprice_Inc": 31841,
                    "price": 5000,
                    "order_type": "repair_order",
                    "sessioncartid": "",
                    "SKU": "SB03218KBKDM-42",
                    "po_QTY": 0,
                    "qtyToBe": 1,
                    "main_image": "https://gis247.s3.amazonaws.com/2023in0076/products/image/SB03218KBKDM-41.png",
                    "product_id": "665ea40669f759d88cca067a",
                    "po_product_id": "6675034a8061a79d99bb06d4",
                    "name": "C-CLASSIC PAVE BAND SOLITAIRE COLLECTION",
                    "Metal": "6355fb99243c42797d24c534",
                    "Size": "636c6e81f358a963864565b6",
                    "Stones": [
                      {
                        "stone_group": "63560539dcf7ec0c616fea1f",
                        "stone": "6356061d2572146aa404d2d2",
                        "Variant": "2",
                        "Align": "",
                        "shape": "63560779c0d74d7f332ea992",
                        "Cut": "635607932572146aa404d2d6",
                        "quality": "",
                        "clarity": "636c7b71671a877a9c779c81",
                        "color": "636c7c4a28021528d413c0b9",
                        "Size": "63560917044ba54bde4d2a16",
                        "Unit": "Cts",
                        "Pcs": "1",
                        "Cts": "0.20",
                        "Price": 20000,
                        "Pointer": "0.20",
                        "setting_type": "636c8418bc8a8f3720133d64",
                        "certificate": {
                          "type": "",
                          "number": ""
                        },
                        "size_name": "3.80MM",
                        "stone_name": "Diamond",
                        "shape_name": "Brilliant Round",
                        "clarity_name": "VS2",
                        "color_name": "J",
                        "setting_name": "Solitaire",
                        "cut_name": "Heart & Arrow"
                      },
                      {
                        "stone_group": "63560539dcf7ec0c616fea1f",
                        "stone": "6356061d2572146aa404d2d2",
                        "Variant": "0",
                        "Align": "",
                        "shape": "63560779c0d74d7f332ea992",
                        "Cut": "6375cf6b3c04c604447519ea",
                        "quality": "",
                        "clarity": "636c7b71671a877a9c779c81",
                        "color": "636c7c4a28021528d413c0b9",
                        "Size": "63560917044ba54bde4d2a16",
                        "Unit": "Cts",
                        "Pcs": "100",
                        "Cts": "0.20",
                        "Price": 0,
                        "Pointer": "0",
                        "setting_type": "635648d4c0d74d7f332ea994",
                        "certificate": {
                          "type": "",
                          "number": ""
                        },
                        "size_name": "3.80MM",
                        "stone_name": "Diamond",
                        "shape_name": "Brilliant Round",
                        "clarity_name": "VS2",
                        "color_name": "J",
                        "setting_name": "Pave",
                        "cut_name": "Normal Cut"
                      },
                      {
                        "stone_group": "63560539dcf7ec0c616fea1f",
                        "stone": "6356061d2572146aa404d2d2",
                        "Variant": "0",
                        "Align": "",
                        "shape": "63560779c0d74d7f332ea992",
                        "Cut": "6375cf6b3c04c604447519ea",
                        "quality": "",
                        "clarity": "636c7b8928021528d413c0b7",
                        "color": "636c7c4a28021528d413c0b9",
                        "Size": "63858e2ec0d74d7f332eaa15",
                        "Unit": "Cts",
                        "Pcs": "2",
                        "Cts": "0.20",
                        "Price": 0,
                        "Pointer": "0",
                        "setting_type": "635648d4c0d74d7f332ea994",
                        "certificate": {
                          "type": "",
                          "number": ""
                        },
                        "size_name": "1.25MM",
                        "stone_name": "Diamond",
                        "shape_name": "Brilliant Round",
                        "clarity_name": "VVS2",
                        "color_name": "J",
                        "setting_name": "Pave",
                        "cut_name": "Normal Cut"
                      }
                    ],
                    "product_variants_enable": "2",
                    "stock_id": "1001",
                    "size_name": "42",
                    "delivery_date": "2024-08-23T04:44:48.623Z",
                    "custom_cart_id": "6675053f8061a79d99bb1110",
                    "po_product_Id": "6675034a8061a79d99bb06d4",
                    "stock_id_options": [
                      {
                        "value": "1002",
                        "label": "1002",
                        "po_QTY": 1
                      },
                      {
                        "value": "1003",
                        "label": "1003",
                        "po_QTY": 1
                      },
                      {
                        "value": "1004",
                        "label": "1004",
                        "po_QTY": 1
                      },
                      {
                        "value": "1005",
                        "label": "1005",
                        "po_QTY": 1
                      },
                      {
                        "value": "1006",
                        "label": "1006",
                        "po_QTY": 1
                      },
                      {
                        "value": "1007",
                        "label": "1007",
                        "po_QTY": 1
                      },
                      {
                        "value": "1008",
                        "label": "1008",
                        "po_QTY": 1
                      },
                      {
                        "value": "1009",
                        "label": "1009",
                        "po_QTY": 1
                      },
                      {
                        "value": "1010",
                        "label": "1010",
                        "po_QTY": 1
                      }
                    ],
                    "status_type": "repair_order",
                    "discount_percent": 0,
                    "Discount_Amount": 0,
                    "stone_name": "Diamond",
                    "Service_labour_exsist": false,
                    "Service_labour_total_charges": 0,
                    "id": "665ea40669f759d88cca067a",
                    "addclass": true
                  }
                ],
                "deletecart_ids": [],
                "summary_order": {
                  "labour": 0,
                  "shipping": 0,
                  "loyality_points": 0,
                  "customer_id": {
                    "id": "65153b7aed2ad528022035f1",
                    "name": "Nicole Mary Mary Kidman",
                    "existsInAddress": true
                  },
                  "sales_person_id": {
                    "value": "6379ae9e28021528d413c0df",
                    "label": "Born Born"
                  },
                  "discount": 0,
                  "discount_percent": 0,
                  "deposit": 10,
                  "deposit_amount": 500,
                  "tax_amount": "327.10",
                  "tax_amount_int": 328,
                  "tax_prect": 7,
                  "tax_type": "Inclusive",
                  "Sub_Total": 4672
                },
                "status_type": "repair_order",
                "totalamount": 5000,
                "service_labour": []
              },
              "payment_info": {
                "debited_amount": {
                  "cash": 500,
                  "bank": 0,
                  "credit_card": 0,
                  "credit_notes": 0
                },
                "pay_data": {
                  "cash": {
                    "payment_method_id": "634f6d59ae461466b73d095a",
                    "Paymentmethod_type": "cash",
                    "amount": 500
                  },
                  "bank": [],
                  "IB": [],
                  "credit_card": [],
                  "credit_note": [],
                  "gift_card": ""
                },
                "balance_due": 4500,
                "balance_deposit": 500
              },
              "transaction_date": "2024-06-21T04:44:54.226Z",
              "layby_due_date": "",
              "pay_layby_data": [],
              "paymentMathod": "Full_Payment",
              "installment": [],
              "fullinstallentlist": [],
              "customer_id": "65153b7aed2ad528022035f1",
              "sales_person_id": "6379ae9e28021528d413c0df",
              "order_type": "repair_order",
              "order_id": "",
              "quatation_id": "",
              "layby_id": "",
              "by_custom_order": "",
              "custom_order_id": "",
              "by_repair_order": "",
              "reserve_sell": "",
              "service_enable": false,
              "shippingInfo": {
                "billing_address": {
                  "is_default": 1,
                  "address": "lal khoti",
                  "country": {
                    "label": "Australia",
                    "value": "13"
                  },
                  "state": "rajasthan",
                  "city": "jaipur",
                  "zipcode": "202020",
                  "UDID": "65e811338698e5ef28a0e432d8",
                  "tax_number": "sdfsdfsdf",
                  "fullAddress": "lal khoti, jaipur, rajasthan, Australia, 202020"
                },
                "shipping_address": {
                  "address": "new address",
                  "country": {
                    "label": "American Samoa",
                    "value": "4"
                  },
                  "state": "we",
                  "city": "dsd",
                  "zipcode": "vbvb",
                  "tax_number": "v",
                  "is_default": 1,
                  "UDID": "6613bb3b78696d43f3b449fc60",
                  "fullAddress": "new address, dsd, we, American Samoa, vbvb"
                }
              }
            },
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "Authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              },
              {
                "name": "pos-Authorization",
                "type": "string",
                "required": false,
                "in": "header",
                "description": "pos-Authorization header."
              },
              {
                "name": "sell_info",
                "type": "string",
                "required": false,
                "description": "sell_info field."
              },
              {
                "name": "payment_info",
                "type": "string",
                "required": false,
                "description": "payment_info field."
              },
              {
                "name": "transaction_date",
                "type": "string",
                "required": false,
                "description": "transaction_date field."
              },
              {
                "name": "layby_due_date",
                "type": "string",
                "required": false,
                "description": "layby_due_date field."
              },
              {
                "name": "pay_layby_data",
                "type": "string",
                "required": false,
                "description": "pay_layby_data field."
              },
              {
                "name": "paymentMathod",
                "type": "string",
                "required": false,
                "description": "paymentMathod field."
              },
              {
                "name": "installment",
                "type": "string",
                "required": false,
                "description": "installment field."
              },
              {
                "name": "fullinstallentlist",
                "type": "string",
                "required": false,
                "description": "fullinstallentlist field."
              },
              {
                "name": "customer_id",
                "type": "string",
                "required": false,
                "description": "customer_id field."
              },
              {
                "name": "sales_person_id",
                "type": "string",
                "required": false,
                "description": "sales_person_id field."
              },
              {
                "name": "order_type",
                "type": "string",
                "required": false,
                "description": "order_type field."
              },
              {
                "name": "order_id",
                "type": "string",
                "required": false,
                "description": "order_id field."
              },
              {
                "name": "quatation_id",
                "type": "string",
                "required": false,
                "description": "quatation_id field."
              },
              {
                "name": "layby_id",
                "type": "string",
                "required": false,
                "description": "layby_id field."
              },
              {
                "name": "by_custom_order",
                "type": "string",
                "required": false,
                "description": "by_custom_order field."
              },
              {
                "name": "custom_order_id",
                "type": "string",
                "required": false,
                "description": "custom_order_id field."
              },
              {
                "name": "by_repair_order",
                "type": "string",
                "required": false,
                "description": "by_repair_order field."
              },
              {
                "name": "reserve_sell",
                "type": "string",
                "required": false,
                "description": "reserve_sell field."
              },
              {
                "name": "service_enable",
                "type": "boolean",
                "required": false,
                "description": "service_enable field."
              },
              {
                "name": "shippingInfo",
                "type": "string",
                "required": false,
                "description": "shippingInfo field."
              }
            ]
          },
          {
            "id": "mobile-pos-custom-order-additemtocart-additemtocart",
            "method": "POST",
            "path": "/Mobile/pos/customOrder/addItemToCart",
            "title": "AddItemToCart",
            "description": "Mobile API — /Mobile/pos/customOrder/addItemToCart.",
            "requestBody": {
              "product_id": [
                "6965e0c747448919d8611c36"
              ],
              "type": "catalog",
              "order_type": "custom_order",
              "customer_id": "68dfb4cadc04909708c6f8a0",
              "sales_person_id": "68f219928acf1ad64cee6b55"
            },
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "Authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              },
              {
                "name": "pos-Authorization",
                "type": "string",
                "required": false,
                "in": "header",
                "description": "pos-Authorization header."
              },
              {
                "name": "product_id",
                "type": "string",
                "required": false,
                "description": "product_id field."
              },
              {
                "name": "type",
                "type": "string",
                "required": false,
                "description": "type field."
              },
              {
                "name": "order_type",
                "type": "string",
                "required": false,
                "description": "order_type field."
              },
              {
                "name": "customer_id",
                "type": "string",
                "required": false,
                "description": "customer_id field."
              },
              {
                "name": "sales_person_id",
                "type": "string",
                "required": false,
                "description": "sales_person_id field."
              }
            ]
          },
          {
            "id": "mobile-pos-custom-order-editcartitemdetails-editcartitemdetails",
            "method": "POST",
            "path": "/Mobile/pos/customOrder/editCartItemDetails",
            "title": "EditCartItemDetails",
            "description": "Mobile API — /Mobile/pos/customOrder/editCartItemDetails.",
            "requestBody": {},
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              }
            ]
          },
          {
            "id": "mobile-pos-custom-order-getshape-getshape",
            "method": "POST",
            "path": "/Mobile/pos/customOrder/getShape",
            "title": "GetShape",
            "description": "Mobile API — /Mobile/pos/customOrder/getShape.",
            "requestBody": {},
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              }
            ]
          },
          {
            "id": "mobile-pos-custom-order-getcartitemdetails-getcartitemdetails",
            "method": "POST",
            "path": "/Mobile/pos/customOrder/getCartItemDetails",
            "title": "GetCartItemDetails",
            "description": "Mobile API — /Mobile/pos/customOrder/getCartItemDetails.",
            "requestBody": {},
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "Authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              },
              {
                "name": "pos-Authorization",
                "type": "string",
                "required": false,
                "in": "header",
                "description": "pos-Authorization header."
              }
            ]
          },
          {
            "id": "mobile-pos-custom-order-deletecartitem-deletecartitem",
            "method": "POST",
            "path": "/Mobile/pos/customOrder/deleteCartItem",
            "title": "DeleteCartItem",
            "description": "Mobile API — /Mobile/pos/customOrder/deleteCartItem.",
            "requestBody": {},
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              }
            ]
          },
          {
            "id": "mobile-pos-custom-order-getcartitemdesign-getcartitemdesign",
            "method": "POST",
            "path": "/Mobile/pos/customOrder/getCartItemDesign",
            "title": "GetCartItemDesign",
            "description": "Mobile API — /Mobile/pos/customOrder/getCartItemDesign.",
            "requestBody": {
              "custom_cart_id": "6924232e18dfdef4c416bd0c",
              "customer_id": "68dfb4cadc04909708c6f8a0",
              "location_id": "6889bb79a2480004dbbdf086"
            },
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "Authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              },
              {
                "name": "pos-Authorization",
                "type": "string",
                "required": false,
                "in": "header",
                "description": "pos-Authorization header."
              },
              {
                "name": "custom_cart_id",
                "type": "string",
                "required": false,
                "description": "custom_cart_id field."
              },
              {
                "name": "customer_id",
                "type": "string",
                "required": false,
                "description": "customer_id field."
              },
              {
                "name": "location_id",
                "type": "string",
                "required": false,
                "description": "location_id field."
              }
            ]
          },
          {
            "id": "mobile-pos-custom-order-updatecartitemdesign-updatecartitemdesign",
            "method": "POST",
            "path": "/Mobile/pos/customOrder/updateCartItemDesign",
            "title": "UpdateCartItemDesign",
            "description": "Mobile API — /Mobile/pos/customOrder/updateCartItemDesign.",
            "requestBody": {},
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "Authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              },
              {
                "name": "pos-Authorization",
                "type": "string",
                "required": false,
                "in": "header",
                "description": "pos-Authorization header."
              }
            ]
          },
          {
            "id": "mobile-pos-custom-order-stockidmanage-stockidmanage",
            "method": "POST",
            "path": "/Mobile/pos/customOrder/stockIdManage",
            "title": "StockIdManage",
            "description": "Mobile API — /Mobile/pos/customOrder/stockIdManage.",
            "requestBody": {
              "cart_id": "6924232e18dfdef4c416bd0c",
              "old_stockId": "A7",
              "new_stockId": "A99",
              "qty": "1"
            },
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "Authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              },
              {
                "name": "pos-Authorization",
                "type": "string",
                "required": false,
                "in": "header",
                "description": "pos-Authorization header."
              },
              {
                "name": "cart_id",
                "type": "string",
                "required": false,
                "description": "cart_id field."
              },
              {
                "name": "old_stockId",
                "type": "string",
                "required": false,
                "description": "old_stockId field."
              },
              {
                "name": "new_stockId",
                "type": "string",
                "required": false,
                "description": "new_stockId field."
              },
              {
                "name": "qty",
                "type": "string",
                "required": false,
                "description": "qty field."
              }
            ]
          },
          {
            "id": "mobile-pos-custom-order-saveservicelabour-saveservicelabour",
            "method": "POST",
            "path": "/Mobile/pos/customOrder/saveServiceLabour",
            "title": "SaveServiceLabour",
            "description": "Mobile API — /Mobile/pos/customOrder/saveServiceLabour.",
            "requestBody": {},
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "Authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              },
              {
                "name": "pos-Authorization",
                "type": "string",
                "required": false,
                "in": "header",
                "description": "pos-Authorization header."
              }
            ]
          },
          {
            "id": "mobile-pos-custom-order-motherproductdetailbyid-motherproductdetail",
            "method": "POST",
            "path": "/Mobile/pos/customOrder/motherProductDetailById",
            "title": "MotherProductDetailById",
            "description": "Mobile API — /Mobile/pos/customOrder/motherProductDetailById.",
            "requestBody": {
              "search": "",
              "id": "6923ecb8453c69bc24310e15",
              "limit": 100,
              "skip": 0,
              "Item": [
                "6923e628453c69bc24310e12",
                "692010745d38ebcae377ffd0",
                "68ef82d824fd1681743d8480"
              ],
              "Collection": [
                "68f2163b12ccb00f631b8fee",
                "68f2163b12ccb00f631b8ff1",
                "68ef838724fd1681743d8492"
              ]
            },
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "Authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              },
              {
                "name": "pos-Authorization",
                "type": "string",
                "required": false,
                "in": "header",
                "description": "pos-Authorization header."
              },
              {
                "name": "search",
                "type": "string",
                "required": false,
                "description": "search field."
              },
              {
                "name": "id",
                "type": "string",
                "required": false,
                "description": "id field."
              },
              {
                "name": "limit",
                "type": "number",
                "required": false,
                "description": "limit field."
              },
              {
                "name": "skip",
                "type": "number",
                "required": false,
                "description": "skip field."
              },
              {
                "name": "Item",
                "type": "string",
                "required": false,
                "description": "Item field."
              },
              {
                "name": "Collection",
                "type": "string",
                "required": false,
                "description": "Collection field."
              }
            ]
          },
          {
            "id": "mobile-pos-custom-order-productdetail-productdetail",
            "method": "POST",
            "path": "/Mobile/pos/customOrder/productDetail",
            "title": "ProductDetail",
            "description": "Mobile API — /Mobile/pos/customOrder/productDetail.",
            "requestBody": {
              "id": "6923f052a28fc7bbd23555b5"
            },
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "Authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              },
              {
                "name": "pos-Authorization",
                "type": "string",
                "required": false,
                "in": "header",
                "description": "pos-Authorization header."
              },
              {
                "name": "id",
                "type": "string",
                "required": false,
                "description": "id field."
              }
            ]
          },
          {
            "id": "mobile-pos-custom-order-editcustomordercart-editcustomordercart",
            "method": "POST",
            "path": "/Mobile/pos/customOrder/editCustomOrderCart",
            "title": "EditCustomOrderCart",
            "description": "Mobile API — /Mobile/pos/customOrder/editCustomOrderCart.",
            "requestBody": {
              "cartId": "6924232e18dfdef4c416bd0c",
              "productDetails": ""
            },
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "Authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              },
              {
                "name": "pos-Authorization",
                "type": "string",
                "required": false,
                "in": "header",
                "description": "pos-Authorization header."
              },
              {
                "name": "cartId",
                "type": "string",
                "required": false,
                "description": "cartId field."
              },
              {
                "name": "productDetails",
                "type": "string",
                "required": false,
                "description": "productDetails field."
              }
            ]
          },
          {
            "id": "mobile-pos-custom-order-cartclear-cartclear",
            "method": "POST",
            "path": "/Mobile/pos/customOrder/cartClear",
            "title": "CartClear",
            "description": "Mobile API — /Mobile/pos/customOrder/cartClear.",
            "requestBody": {},
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "Authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              },
              {
                "name": "pos-Authorization",
                "type": "string",
                "required": false,
                "in": "header",
                "description": "pos-Authorization header."
              }
            ]
          },
          {
            "id": "mobile-pos-custom-order-skunamebysearch-skunamebysearch",
            "method": "POST",
            "path": "/Mobile/pos/customOrders/skuNameBySearch",
            "title": "SkuNameBySearch",
            "description": "Mobile API — /Mobile/pos/customOrders/skuNameBySearch.",
            "requestBody": {
              "search": "CLEO-B101"
            },
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "Authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              },
              {
                "name": "pos-Authorization",
                "type": "string",
                "required": false,
                "in": "header",
                "description": "pos-Authorization header."
              },
              {
                "name": "search",
                "type": "string",
                "required": false,
                "description": "search field."
              }
            ]
          },
          {
            "id": "mobile-pos-custom-order-addrepairitemstocart-addrepairitemstocart",
            "method": "POST",
            "path": "/Mobile/pos/customOrders/addrepairItemsToCart",
            "title": "AddrepairItemsToCart",
            "description": "Mobile API — /Mobile/pos/customOrders/addrepairItemsToCart.",
            "requestBody": {
              "cart_ids": [
                {
                  "cart_id": "6924232e18dfdef4c416bd0c",
                  "reports": {
                    "total_Qty": 1,
                    "Hidden_Dis": 0,
                    "Item_Total_Sale": 1200,
                    "Labour_Charges": 0,
                    "Ship_Charges": 0,
                    "loyality_points": 0,
                    "Discount_percent": 0,
                    "Discount_Amount": 0,
                    "Sub_Total": 1200,
                    "tax_prect": 0,
                    "Tax_Amt": 0,
                    "tax_type": "Exclusive",
                    "Grand_Total": 1200,
                    "Deposit_percent": 0,
                    "Deposit_Amt": 1200,
                    "Adjust_Amt": 0,
                    "final_DueAmount": 0,
                    "Cash_Amt": 1200,
                    "CreditCard_Amt": 0,
                    "Bank_Amt": 0,
                    "Credit_note": 0
                  },
                  "ref_no": "pos01POS",
                  "order_id": "6924234418dfdef4c416bd33",
                  "date": "2025/11/23",
                  "image": "https://gis247.s3.amazonaws.com/2022th0038/products/image/cleo-b101.PNG",
                  "SKU": "CLEO-B101",
                  "stock_id": "A7",
                  "Qty": 1,
                  "amount": 1200,
                  "metal_name": "White gold",
                  "size_name": "XXXS",
                  "stone_name": "Sea blue Chalcedony",
                  "location": "DEMO1"
                }
              ],
              "customer_id": "68dfb4cadc04909708c6f8a0",
              "sales_person_id": "68f219928acf1ad64cee6b55",
              "order_type": "repair_order"
            },
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "Authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              },
              {
                "name": "pos-Authorization",
                "type": "string",
                "required": false,
                "in": "header",
                "description": "pos-Authorization header."
              },
              {
                "name": "cart_ids",
                "type": "string",
                "required": false,
                "description": "cart_ids field."
              },
              {
                "name": "customer_id",
                "type": "string",
                "required": false,
                "description": "customer_id field."
              },
              {
                "name": "sales_person_id",
                "type": "string",
                "required": false,
                "description": "sales_person_id field."
              },
              {
                "name": "order_type",
                "type": "string",
                "required": false,
                "description": "order_type field."
              }
            ]
          },
          {
            "id": "mobile-pos-custom-order-getsalesorderlistbycustomer-getsalesorderli",
            "method": "POST",
            "path": "/Mobile/pos/customOrders/getSalesOrderListByCustomer",
            "title": "GetSalesOrderListByCustomer",
            "description": "Mobile API — /Mobile/pos/customOrders/getSalesOrderListByCustomer.",
            "requestBody": {
              "customer_id": "68dfb4cadc04909708c6f8a0"
            },
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "Authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              },
              {
                "name": "pos-Authorization",
                "type": "string",
                "required": false,
                "in": "header",
                "description": "pos-Authorization header."
              },
              {
                "name": "customer_id",
                "type": "string",
                "required": false,
                "description": "customer_id field."
              }
            ]
          },
          {
            "id": "mobile-pos-custom-order-adddiamondtocart-adddiamondtocart",
            "method": "POST",
            "path": "/Mobile/pos/customOrders/addDiamondToCart",
            "title": "AddDiamondToCart",
            "description": "Mobile API — /Mobile/pos/customOrders/addDiamondToCart.",
            "requestBody": {},
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              }
            ]
          },
          {
            "id": "mobile-pos-custom-order-getcartitems-getcartitems",
            "method": "POST",
            "path": "/Mobile/pos/customOrders/getCartItems",
            "title": "GetCartItems",
            "description": "Mobile API — /Mobile/pos/customOrders/getCartItems.",
            "requestBody": {
              "quatation_id": "665d4d9efdb4ffc3e56a1eb1"
            },
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "Authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              },
              {
                "name": "pos-authorization",
                "type": "string",
                "required": false,
                "in": "header",
                "description": "pos-authorization header."
              },
              {
                "name": "quatation_id",
                "type": "string",
                "required": false,
                "description": "quatation_id field."
              }
            ]
          },
          {
            "id": "mobile-pos-custom-order-addmixmatchtocart-addmixmatchtocart",
            "method": "POST",
            "path": "/Mobile/pos/customOrders/addMixMatchToCart",
            "title": "AddMixMatchToCart",
            "description": "Mobile API — /Mobile/pos/customOrders/addMixMatchToCart.",
            "requestBody": {},
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "Authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              },
              {
                "name": "pos-Authorization",
                "type": "string",
                "required": false,
                "in": "header",
                "description": "pos-Authorization header."
              }
            ]
          },
          {
            "id": "mobile-pos-custom-order-getmixmatchitemdetail-getmixmatchitemdetail",
            "method": "POST",
            "path": "/Mobile/pos/customOrders/getMixMatchItemDetail",
            "title": "GetMixMatchItemDetail",
            "description": "Mobile API — /Mobile/pos/customOrders/getMixMatchItemDetail.",
            "requestBody": {},
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              }
            ]
          },
          {
            "id": "mobile-pos-custom-order-cartclear-cartclear-2",
            "method": "POST",
            "path": "/Mobile/pos/customOrders/cartClear",
            "title": "CartClear",
            "description": "Mobile API — /Mobile/pos/customOrders/cartClear.",
            "requestBody": {},
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "Authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              },
              {
                "name": "pos-Authorization",
                "type": "string",
                "required": false,
                "in": "header",
                "description": "pos-Authorization header."
              }
            ]
          }
        ]
      },
      {
        "id": "mobile-pos-mixandmatch",
        "label": "mixAndMatch",
        "color": "#ef4444",
        "endpoints": [
          {
            "id": "mobile-pos-mixandmatch-getproductlist-getproductlist",
            "method": "POST",
            "path": "/Mobile/pos/mixAndMatch/getProductList",
            "title": "GetProductList",
            "description": "Mobile API — /Mobile/pos/mixAndMatch/getProductList.",
            "requestBody": {},
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "Authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              },
              {
                "name": "pos-Authorization",
                "type": "string",
                "required": false,
                "in": "header",
                "description": "pos-Authorization header."
              }
            ]
          },
          {
            "id": "mobile-pos-mixandmatch-getjewelrylist-getjewelrylist",
            "method": "POST",
            "path": "/Mobile/pos/mixAndMatch/getJewelryList",
            "title": "GetJewelryList",
            "description": "Mobile API — /Mobile/pos/mixAndMatch/getJewelryList.",
            "requestBody": {},
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "Authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              },
              {
                "name": "pos-Authorization",
                "type": "string",
                "required": false,
                "in": "header",
                "description": "pos-Authorization header."
              }
            ]
          },
          {
            "id": "mobile-pos-mixandmatch-getproductdetailbyid-getproductdetailbyid",
            "method": "POST",
            "path": "/Mobile/pos/mixAndMatch/getProductDetailById",
            "title": "GetProductDetailById",
            "description": "Mobile API — /Mobile/pos/mixAndMatch/getProductDetailById.",
            "requestBody": {},
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "Authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              },
              {
                "name": "pos-Authorization",
                "type": "string",
                "required": false,
                "in": "header",
                "description": "pos-Authorization header."
              }
            ]
          }
        ]
      },
      {
        "id": "mobile-pos-gift-card",
        "label": "Gift Card",
        "color": "#ef4444",
        "endpoints": [
          {
            "id": "mobile-pos-gift-card-getgiftcard-getgiftcard",
            "method": "POST",
            "path": "/Mobile/pos/giftCard/getGiftCard",
            "title": "GetGiftCard",
            "description": "Mobile API — /Mobile/pos/giftCard/getGiftCard.",
            "requestBody": {
              "customer_id": "6916bbd036cc24c895792f7e",
              "limit": 100
            },
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "Authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              },
              {
                "name": "pos-Authorization",
                "type": "string",
                "required": false,
                "in": "header",
                "description": "pos-Authorization header."
              },
              {
                "name": "customer_id",
                "type": "string",
                "required": false,
                "description": "customer_id field."
              },
              {
                "name": "limit",
                "type": "number",
                "required": false,
                "description": "limit field."
              }
            ]
          },
          {
            "id": "mobile-pos-gift-card-creategiftcard-creategiftcard",
            "method": "POST",
            "path": "/Mobile/pos/giftCard/createGiftCard",
            "title": "CreateGiftCard",
            "description": "Mobile API — /Mobile/pos/giftCard/createGiftCard.",
            "requestBody": {},
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "Authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              },
              {
                "name": "pos-Authorization",
                "type": "string",
                "required": false,
                "in": "header",
                "description": "pos-Authorization header."
              }
            ]
          },
          {
            "id": "mobile-pos-gift-card-editgiftcard-editgiftcard",
            "method": "POST",
            "path": "/Mobile/pos/giftCard/editGiftCard",
            "title": "EditGiftCard",
            "description": "Mobile API — /Mobile/pos/giftCard/editGiftCard.",
            "requestBody": {},
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              }
            ]
          },
          {
            "id": "mobile-pos-gift-card-removegiftcard-removegiftcard",
            "method": "POST",
            "path": "/Mobile/pos/giftCard/removeGiftCard",
            "title": "RemoveGiftCard",
            "description": "Mobile API — /Mobile/pos/giftCard/removeGiftCard.",
            "requestBody": {
              "custom_cart_id": "696a26ec63bb48f15051d02f"
            },
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "Authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              },
              {
                "name": "pos-Authorization",
                "type": "string",
                "required": false,
                "in": "header",
                "description": "pos-Authorization header."
              },
              {
                "name": "custom_cart_id",
                "type": "string",
                "required": false,
                "description": "custom_cart_id field."
              }
            ]
          }
        ]
      },
      {
        "id": "mobile-pos-deposit",
        "label": "deposit",
        "color": "#ef4444",
        "endpoints": [
          {
            "id": "mobile-pos-deposit-getdeposit-getdeposit",
            "method": "POST",
            "path": "/Mobile/pos/deposit/getDeposit",
            "title": "GetDeposit",
            "description": "Mobile API — /Mobile/pos/deposit/getDeposit.",
            "requestBody": {},
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              }
            ]
          },
          {
            "id": "mobile-pos-deposit-adddeposittocart-adddeposittocart",
            "method": "POST",
            "path": "/Mobile/pos/deposit/addDeposittocart",
            "title": "AddDeposittocart",
            "description": "Mobile API — /Mobile/pos/deposit/addDeposittocart.",
            "requestBody": {},
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "Authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              },
              {
                "name": "pos-Authorization",
                "type": "string",
                "required": false,
                "in": "header",
                "description": "pos-Authorization header."
              }
            ]
          }
        ]
      },
      {
        "id": "mobile-pos-repair",
        "label": "Repair",
        "color": "#ef4444",
        "endpoints": [
          {
            "id": "mobile-pos-repair-getsalesorderlist-getsalesorderlist",
            "method": "POST",
            "path": "/Mobile/pos/repair/getSalesOrderList",
            "title": "GetSalesOrderList",
            "description": "Mobile API — /Mobile/pos/repair/getSalesOrderList.",
            "requestBody": {
              "customer_id": "695f7b2ae3e4ffa18cc1ae9f",
              "Location": "6889bb79a2480004dbbdf086"
            },
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "Authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              },
              {
                "name": "pos-Authorization",
                "type": "string",
                "required": false,
                "in": "header",
                "description": "pos-Authorization header."
              },
              {
                "name": "customer_id",
                "type": "string",
                "required": false,
                "description": "customer_id field."
              },
              {
                "name": "Location",
                "type": "string",
                "required": false,
                "description": "Location field."
              }
            ]
          },
          {
            "id": "mobile-pos-repair-additemstocart-additemstocart",
            "method": "POST",
            "path": "/Mobile/pos/repair/addItemsToCart",
            "title": "AddItemsToCart",
            "description": "Mobile API — /Mobile/pos/repair/addItemsToCart.",
            "requestBody": {
              "cart_ids": [
                {
                  "cart_id": "695e4900182f91e01e7b1cb0",
                  "reports": {
                    "total_Qty": 1,
                    "Hidden_Dis": 0,
                    "Item_Total_Sale": 120000,
                    "Labour_Charges": 0,
                    "Ship_Charges": 0,
                    "loyality_points": 0,
                    "Discount_percent": 0,
                    "Discount_Amount": 0,
                    "Sub_Total": 120000,
                    "tax_prect": 0,
                    "Tax_Amt": 0,
                    "tax_type": "Exclusive",
                    "Grand_Total": 120000,
                    "Deposit_percent": 0,
                    "Deposit_Amt": 120000,
                    "Adjust_Amt": 0,
                    "final_DueAmount": 0,
                    "Cash_Amt": 120000,
                    "CreditCard_Amt": 0,
                    "Bank_Amt": 0,
                    "Credit_note": 0
                  },
                  "ref_no": "E-COM43",
                  "order_id": "695e4909182f91e01e7b1ce5",
                  "date": "07/01/2026",
                  "image": "https://gis247.s3.amazonaws.com/2022th0038/products/image/rg025.JPG",
                  "SKU": "RG025",
                  "stock_id": "A1",
                  "Qty": 1,
                  "amount": 120000,
                  "metal_name": "18K White Gold",
                  "size_name": "51",
                  "stone_name": "Diamond",
                  "location": "DEMO1"
                }
              ],
              "customer_id": "6916bbd036cc24c895792f7e",
              "sales_person_id": "695cd1ca5e1dd8a8cdaae1a7",
              "order_type": "repair_order"
            },
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "Authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              },
              {
                "name": "pos-Authorization",
                "type": "string",
                "required": false,
                "in": "header",
                "description": "pos-Authorization header."
              },
              {
                "name": "cart_ids",
                "type": "string",
                "required": false,
                "description": "cart_ids field."
              },
              {
                "name": "customer_id",
                "type": "string",
                "required": false,
                "description": "customer_id field."
              },
              {
                "name": "sales_person_id",
                "type": "string",
                "required": false,
                "description": "sales_person_id field."
              },
              {
                "name": "order_type",
                "type": "string",
                "required": false,
                "description": "order_type field."
              }
            ]
          }
        ]
      },
      {
        "id": "mobile-pos-reserve",
        "label": "Reserve",
        "color": "#ef4444",
        "endpoints": [
          {
            "id": "mobile-pos-reserve-additemstocart-additemstocart",
            "method": "POST",
            "path": "/Mobile/pos/reserve/addItemsToCart",
            "title": "AddItemsToCart",
            "description": "Mobile API — /Mobile/pos/reserve/addItemsToCart.",
            "requestBody": {
              "customOrderCart": [
                {
                  "location_id": "6889bb79a2480004dbbdf086",
                  "delivery_date": "2025/11/30",
                  "product_id": "69241e1a9e795cbd00224372",
                  "main_image": "https://gis247.s3.amazonaws.com/2022th0038/products/image/cleo-7891b1.PNG",
                  "po_QTY": 3,
                  "price": 1200,
                  "product_type": "product",
                  "is_product": 1,
                  "is_variant": 1,
                  "is_design": 0,
                  "SKU": "CLEO-7891B1",
                  "name": "Cleo Diamond Slim Slip-On Bracelet",
                  "ID": "10007891",
                  "Metal": "68ef838724fd1681743d8496",
                  "Size": "68ef838724fd1681743d8493",
                  "GrossWt": 1,
                  "NetWt": 1,
                  "Stones": [
                    {
                      "stone_group": "68ef838724fd1681743d8494",
                      "stone_Group_name": "Color Stone",
                      "stone_Group_code": "Color Stone",
                      "stone": "68ef82d824fd1681743d848c",
                      "stone_name": "Sea blue Chalcedony",
                      "stone_code": "SC",
                      "Variant": "1",
                      "Align": "",
                      "shape": null,
                      "shape_name": "",
                      "shape_code": "",
                      "Cut": null,
                      "Cut_name": "",
                      "Cut_code": "",
                      "quality": "",
                      "clarity": null,
                      "clarity_name": "",
                      "clarity_code": "",
                      "color": null,
                      "Color_name": "",
                      "Color_code": "",
                      "Size": "68ef838724fd1681743d8495",
                      "Size_name": "0.5MM",
                      "Size_code": "0.5MM",
                      "Unit": "Cts",
                      "Pcs": 0,
                      "Cts": 0,
                      "Price": 0,
                      "Pointer": 0,
                      "setting_type": null,
                      "Setting_type_name": "",
                      "Setting_type_code": "",
                      "certificate": {
                        "type": "",
                        "number": "",
                        "url": ""
                      },
                      "totalStoneWt": 0
                    }
                  ],
                  "PriceDetails": [
                    {
                      "location": "6889bb79a2480004dbbdf086",
                      "currency": "AED",
                      "taxrate": "634f694d17ae947408110e41",
                      "taxType": "On Total",
                      "tax_rate_val": "0",
                      "rate": 0,
                      "retailprice_Inc": 1200,
                      "tax": 0,
                      "inv_retailprice_Inc": 0,
                      "retailprice_Ex": 1200,
                      "inv_retailprice_Ex": 0,
                      "code": "DM1"
                    }
                  ],
                  "extra_po_information": "",
                  "status": {
                    "po_status": 1,
                    "priority": 1,
                    "pu_status": 1,
                    "warehouse_status": 2,
                    "Inventorylist_status": 1,
                    "is_show_in_inventory": 1
                  },
                  "stock_id": "A8",
                  "pos_no": "",
                  "location_name": "DEMO1",
                  "id": "69241dd99e795cbd00224264",
                  "due_days": 0,
                  "retailprice_Inc": 1200,
                  "item_name": "Bracelet",
                  "collection_name": "CLEO BY MARLI",
                  "metal_name": "White gold",
                  "size_name": "XXXS",
                  "stone_name": "Sea blue Chalcedony",
                  "aging": 0,
                  "status_type": "stock",
                  "warehouse_location_name": ""
                }
              ],
              "order_type": "reserve",
              "customer_id": "68dfb4cadc04909708c6f8a0",
              "sales_person_id": "68f219928acf1ad64cee6b55"
            },
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "Authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              },
              {
                "name": "pos-Authorization",
                "type": "string",
                "required": false,
                "in": "header",
                "description": "pos-Authorization header."
              },
              {
                "name": "customOrderCart",
                "type": "string",
                "required": false,
                "description": "customOrderCart field."
              },
              {
                "name": "order_type",
                "type": "string",
                "required": false,
                "description": "order_type field."
              },
              {
                "name": "customer_id",
                "type": "string",
                "required": false,
                "description": "customer_id field."
              },
              {
                "name": "sales_person_id",
                "type": "string",
                "required": false,
                "description": "sales_person_id field."
              }
            ]
          },
          {
            "id": "mobile-pos-reserve-getreservecart-getreservecart",
            "method": "POST",
            "path": "/Mobile/pos/reserve/getreservecart",
            "title": "Getreservecart",
            "description": "Mobile API — /Mobile/pos/reserve/getreservecart.",
            "requestBody": {
              "cartIds": "695f81f4f6fb02a108591dd4"
            },
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "Authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              },
              {
                "name": "pos-Authorization",
                "type": "string",
                "required": false,
                "in": "header",
                "description": "pos-Authorization header."
              },
              {
                "name": "cartIds",
                "type": "string",
                "required": false,
                "description": "cartIds field."
              }
            ]
          }
        ]
      },
      {
        "id": "mobile-pos-report",
        "label": "Report",
        "color": "#ef4444",
        "endpoints": [
          {
            "id": "mobile-pos-report-salesperson-salesperson",
            "method": "POST",
            "path": "/Mobile/pos/report/salesPerson",
            "title": "SalesPerson",
            "description": "Mobile API — /Mobile/pos/report/salesPerson.",
            "requestBody": {},
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "Authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              },
              {
                "name": "pos-Authorization",
                "type": "string",
                "required": false,
                "in": "header",
                "description": "pos-Authorization header."
              }
            ]
          },
          {
            "id": "mobile-pos-report-customer-customer",
            "method": "POST",
            "path": "/Mobile/pos/report/customer",
            "title": "Customer",
            "description": "Mobile API — /Mobile/pos/report/customer.",
            "requestBody": {},
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "Authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              },
              {
                "name": "pos-Authorization",
                "type": "string",
                "required": false,
                "in": "header",
                "description": "pos-Authorization header."
              }
            ]
          },
          {
            "id": "mobile-pos-report-transaction-transaction",
            "method": "POST",
            "path": "/Mobile/pos/report/Transaction",
            "title": "Transaction",
            "description": "Mobile API — /Mobile/pos/report/Transaction.",
            "requestBody": {
              "customer_id": "6916bbd036cc24c895792f7e"
            },
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "Authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              },
              {
                "name": "pos-Authorization",
                "type": "string",
                "required": false,
                "in": "header",
                "description": "pos-Authorization header."
              },
              {
                "name": "customer_id",
                "type": "string",
                "required": false,
                "description": "customer_id field."
              }
            ]
          },
          {
            "id": "mobile-pos-report-paymenthistory-paymenthistory",
            "method": "POST",
            "path": "/Mobile/pos/report/paymentHistory",
            "title": "PaymentHistory",
            "description": "Mobile API — /Mobile/pos/report/paymentHistory.",
            "requestBody": {
              "customer_id": "6916bbd036cc24c895792f7e"
            },
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "Authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              },
              {
                "name": "pos-Authorization",
                "type": "string",
                "required": false,
                "in": "header",
                "description": "pos-Authorization header."
              },
              {
                "name": "customer_id",
                "type": "string",
                "required": false,
                "description": "customer_id field."
              }
            ]
          }
        ]
      },
      {
        "id": "mobile-pos-mail",
        "label": "Mail",
        "color": "#ef4444",
        "endpoints": [
          {
            "id": "mobile-pos-mail-invoicemail-invoicemail",
            "method": "POST",
            "path": "/Mobile/pos/mail/invoiceMail",
            "title": "InvoiceMail",
            "description": "Mobile API — /Mobile/pos/mail/invoiceMail.",
            "requestBody": {
              "id": "695f8546f6b9634541b83088",
              "email": "rubi.tiarasoftware@gmail.com"
            },
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "Authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              },
              {
                "name": "pos-Authorization",
                "type": "string",
                "required": false,
                "in": "header",
                "description": "pos-Authorization header."
              },
              {
                "name": "id",
                "type": "string",
                "required": false,
                "description": "id field."
              },
              {
                "name": "email",
                "type": "string",
                "required": false,
                "description": "email field."
              }
            ]
          }
        ]
      },
      {
        "id": "mobile-pos-park",
        "label": "Park",
        "color": "#ef4444",
        "endpoints": [
          {
            "id": "mobile-pos-park-removepark-removepark",
            "method": "POST",
            "path": "/Mobile/pos/park/removePark",
            "title": "RemovePark",
            "description": "Mobile API — /Mobile/pos/park/removePark.",
            "requestBody": {},
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              }
            ]
          },
          {
            "id": "mobile-pos-park-getparklist-getparklist",
            "method": "POST",
            "path": "/Mobile/pos/park/getParkList",
            "title": "GetParkList",
            "description": "Mobile API — /Mobile/pos/park/getParkList.",
            "requestBody": {},
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "Authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              },
              {
                "name": "pos-Authorization",
                "type": "string",
                "required": false,
                "in": "header",
                "description": "pos-Authorization header."
              }
            ]
          },
          {
            "id": "mobile-pos-park-getparkcount-getparkcount",
            "method": "POST",
            "path": "/Mobile/pos/park/getParkCount",
            "title": "GetParkCount",
            "description": "Mobile API — /Mobile/pos/park/getParkCount.",
            "requestBody": {},
            "response": {
              "success": true,
              "code": 200
            },
            "params": [
              {
                "name": "Authorization",
                "type": "string",
                "required": true,
                "in": "header",
                "description": "JWT from mobile login."
              },
              {
                "name": "pos-Authorization",
                "type": "string",
                "required": false,
                "in": "header",
                "description": "pos-Authorization header."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "mobile-inventory-print",
    "label": "inventory-print",
    "icon": "🖨️",
    "color": "#78716c",
    "description": "Mobile inventory-print APIs.",
    "endpoints": [
      {
        "id": "mobile-inventory-print-myinventory-myinventory",
        "method": "POST",
        "path": "/Mobile/inventory/print/myInventory",
        "title": "MyInventory",
        "description": "Mobile API — /Mobile/inventory/print/myInventory.",
        "requestBody": {},
        "response": {
          "success": true,
          "code": 200
        },
        "params": [
          {
            "name": "Authorization",
            "type": "string",
            "required": true,
            "in": "header",
            "description": "JWT from mobile login."
          },
          {
            "name": "pos-Authorization",
            "type": "string",
            "required": false,
            "in": "header",
            "description": "pos-Authorization header."
          }
        ]
      },
      {
        "id": "mobile-inventory-print-diamondsearch-diamondsearch",
        "method": "POST",
        "path": "/Mobile/inventory/print/diamondSearch",
        "title": "DiamondSearch",
        "description": "Mobile API — /Mobile/inventory/print/diamondSearch.",
        "requestBody": {},
        "response": {
          "success": true,
          "code": 200
        },
        "params": [
          {
            "name": "authorization",
            "type": "string",
            "required": true,
            "in": "header",
            "description": "JWT from mobile login."
          }
        ]
      }
    ]
  }
];
