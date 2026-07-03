export const erpApiData = {
  title: 'GIS ERP API Explorer',
  subtitle: 'ERP Integration Flow Reference',
  version: 'v1.0',
  baseUrl: 'https://api.example.com',
  platform: 'erp',
  sections: [
    {
      id: 'erp-flow',
      label: 'ERP Flow',
      icon: '🏢',
      color: '#1d4ed8',
      description: 'Sequence for ERP sync: vendor -> product advanced -> variants -> PO -> sales.',
      endpoints: [
        {
          id: 'erp-vendor-master-edit',
          method: 'POST',
          path: '/App/master/vendorMasterEdit',
          title: 'Vendor Master Edit',
          description: 'Create or update ERP vendor master before PO creation.',
          requestBody: {
            id: '',
            organisation: 'hamilton web services',
            vendor_type: 'ERP',
            contact_person: 'Tanu Yadav',
            city: 'kanpur',
            country: '101',
            Status: '1',
            contacts: [{ icon: 1, code: '91', no: '07408080615' }],
            edit: false,
          },
          response: {
            success: true,
            message: 'Vendor saved',
            data: { id: 'vendor_001' },
          },
          params: [
            { name: 'authorization', type: 'string', required: true, in: 'header', description: 'JWT from store-login.' },
          ],
        },
        {
          id: 'erp-product-save-advance',
          method: 'POST',
          path: '/APP/product/saveAdvance',
          title: 'Save Product Advanced',
          description: 'Save product advanced details. Stone ERP product code mapping: C = Non-Variants, T = Variants, P = Design.',
          requestBody: {
            _id: '6a1979d90e288c54ebbf576a',
            SKU: 'CLEO-E18',
            product_id: '6a1979d90e288c54ebbf576a',
            name: 'Cleo Diamond Large Hoop Earrings',
            product_variants_enable: '1',
            Unit: 'Pr',
            GrossWt: '1.00',
            NetWt: '1.00',
            CostPrice: '1.900,00',
          },
          response: {
            success: true,
            message: 'Product advanced saved',
            data: { product_id: '6a1979d90e288c54ebbf576a' },
          },
          params: [
            { name: 'authorization', type: 'string', required: true, in: 'header', description: 'JWT from store-login.' },
          ],
        },
        {
          id: 'erp-product-save-variants',
          method: 'POST',
          path: '/APP/product/saveVariants',
          title: 'Save Product Variants',
          description: 'Save generated variants after advanced product save.',
          requestBody: {
            id: '6a1979d90e288c54ebbf576a',
            variants: [
              {
                id: '100074-1',
                sku: 'CLEO-E18WGBC-42',
                metal: '6985da271ba49114d3a18793',
                stone: '6985da6f1ba49114d3a18804',
                status: '1',
              },
              {
                id: '100074-2',
                sku: 'CLEO-E18WGBO-42',
                metal: '6985da271ba49114d3a18793',
                stone: '6985da6f1ba49114d3a187cc',
                status: '1',
              },
            ],
            Optionsvariants: [
              { title: 'Metal', status: 1 },
              { title: 'Stone', status: 1 },
              { title: 'Size', status: 1 },
            ],
          },
          response: {
            success: true,
            message: 'Variants saved',
            data: { variant_count: 42 },
          },
          params: [
            { name: 'authorization', type: 'string', required: true, in: 'header', description: 'JWT from store-login.' },
          ],
        },
        {
          id: 'erp-po-create',
          method: 'POST',
          path: '/Inventory/po/createPO',
          title: 'Create PO',
          description: 'Create purchase order to feed ERP. Use voucher "SO" for this ERP flow.',
          requestBody: {
            voucher_id: '6965e01b31676f953a14c3a5',
            voucher: 'SO',
            location_id: '6864eb6c46b97fcef1421d95',
            supplier_id: '696b77ad8a3814a9ca0e4c44',
            type: 'Master Product',
            po_data: [
              {
                product_id: '698b1fb73bd3b0a7a19512c1',
                po_QTY: 4,
                price: 1500,
                amount_total: 6000,
              },
            ],
          },
          response: {
            success: true,
            message: 'PO created',
            data: { po_id: 'PO-001' },
          },
          params: [
            { name: 'authorization', type: 'string', required: true, in: 'header', description: 'JWT from store-login.' },
          ],
        },
        {
          id: 'erp-sales-custom-order-save',
          method: 'POST',
          path: '/POS/customOrder/saveCustomOrder',
          title: 'Sales Created',
          description: 'Create sales order after product and PO flow is ready.',
          requestBody: {
            sell_info: {
              status_type: 'pos_order',
              totalamount: 14400,
              summary_order: {
                discount: 0,
                tax_amount: '2400.00',
                Sub_Total: 12000,
              },
            },
            order_type: 'pos_order',
            customer_id: '69d38581135009caf45c2c64',
            sales_person_id: '6965e02731676f953a14c3c6',
          },
          response: {
            success: true,
            message: 'Custom order saved',
            data: { order_id: 'SO-001' },
          },
          params: [
            { name: 'authorization', type: 'string', required: true, in: 'header', description: 'JWT from store-login.' },
            { name: 'Pos-Authorization', type: 'string', required: true, in: 'header', description: 'POS session token from generatePOSAuthToken.' },
          ],
        },
      ],
    },
    {
      id: 'erp-docs',
      label: 'ERP Docs',
      icon: '📘',
      color: '#2563eb',
      description: 'ERP integration document links and setup notes.',
      endpoints: [
        {
          id: 'erp-quick-guide',
          method: 'GET',
          path: '/docs/erp/quick-guide',
          title: 'ERP Integration Guide (DOCX)',
          readOnlyDoc: true,
          description: 'Open ERP integration guide in browser.',
          externalDocs: {
            description: 'Open ERP guide page',
            url: '/erp-guide.html',
          },
          requestBody: {},
          response: {
            success: true,
            note: 'Browser-friendly guide opens first.',
            steps: [
              {
                step: 1,
                title: 'Activate ERP Integration',
                details: [
                  'Go to Settings.',
                  'Open Integrated Applications.',
                  'Enable ERP and save settings.',
                ],
              },
              {
                step: 2,
                title: 'Create ERP Location',
                details: [
                  'Create location in ERP platform.',
                  'Location must match GIS location details.',
                ],
              },
              {
                step: 3,
                title: 'Post Product to ERP',
                details: [
                  'Open Product -> Advanced and save.',
                  'Stone code mapping: C = Non-Variants, T = Variants, P = Design.',
                ],
              },
              {
                step: 4,
                title: 'Post Product Variants to ERP',
                details: [
                  'Open Product -> Variant and save.',
                  'All linked variants are posted to ERP.',
                ],
              },
              {
                step: 5,
                title: 'Create Vendor on GIS',
                details: [
                  'Create vendor in Master -> Vendor.',
                  'Use this vendor before creating sale order.',
                ],
              },
              {
                step: 6,
                title: 'Create Sale Order on ERP',
                details: [
                  'Before sale order, generate voucher in ERP.',
                  'Voucher type must be SO (Sale Order).',
                ],
              },
              {
                step: 7,
                title: 'Create POS Sale and Sync to ERP',
                details: [
                  'Create POS-SALE voucher in ERP.',
                  'Complete GIS POS sale; it syncs to ERP.',
                ],
              },
            ],
          },
          params: [],
        },
      ],
    },
  ],
};
