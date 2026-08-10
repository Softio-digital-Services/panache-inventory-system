/* Panache Web UI - SQLite backend via /api/ */
const API = '';
const T = {
    en: {
        login_title: 'Sign In', login_subtitle: 'Inventory management portal',
        username: 'Username', password: 'Password', login_btn: 'Sign In', logout: 'Logout',
        nav_dashboard: 'Dashboard', nav_inventory: 'Inventory', nav_pos: 'POS', nav_sales: 'Sales',
        nav_reports: 'Reports', nav_history: 'History', nav_quotations: 'Quotations',
        nav_customers: 'Customers', nav_suppliers: 'Suppliers', nav_expenses: 'Expenses',
        nav_currencies: 'Currencies', nav_barcodes: 'Barcodes', nav_users: 'Users', nav_settings: 'Settings',
        dash_subtitle: 'Overview of your inventory business', inv_subtitle: 'Manage parts and stock levels',
        pos_subtitle: 'Scan or tap products to sell', sales_subtitle: 'Order history and returns',
        reports_subtitle: 'Sales and profit summaries', history_subtitle: 'Audit trail and activity',
        quot_subtitle: 'Quotes waiting to convert', cust_subtitle: 'Customer directory',
        supp_subtitle: 'Supplier directory', exp_subtitle: 'Track business expenses',
        cur_subtitle: 'Exchange rates vs USD', bar_subtitle: 'Preview labels for printing',
        barcode_preview_title: 'Print',
        select_all: 'Select all',
        select_barcodes_first: 'Select at least one barcode to print',
        print_destination: 'Destination',
        print_copies: 'Copies',
        print_layout: 'Layout',
        print_portrait: 'Portrait',
        print_landscape: 'Landscape',
        print_pages: 'Pages',
        print_custom: 'Custom',
        print_pages_ph: 'e.g. 1-5, 8',
        print_color: 'Color',
        print_color_full: 'Color',
        print_color_bw: 'Black and white',
        print_sheet_one: 'Total: 1 sheet of paper',
        print_sheet_many: 'Total: {0} sheets of paper',
        print_system_printer: 'System printer…',
        print_sent: 'Sent to printer',
        print_failed: 'Print failed',
        users_subtitle: 'Accounts and roles', settings_subtitle: 'Language, license and appearance',
        recent_sales: 'Recent Sales', add_product: 'Add Product', add_expense: 'Add Expense',
        search_ph: 'Search...', cart_title: 'Cart', clear: 'Clear', subtotal: 'Subtotal', total: 'Total',
        checkout: 'Checkout', cancel: 'Cancel', save: 'Save', print: 'Print', convert: 'Confirm',
        process_return: 'Process Return', return_reason: 'Reason', return_reason_ph: 'e.g. Defective',
        confirm_return: 'Confirm Return', language: 'Language', license_info: 'License',
        top_products: 'Top Products', best_selling: 'Best Selling Products', top_categories: 'Top Categories',
        mark_paid: 'Mark paid', paid: 'Paid', unpaid: 'Unpaid',
        preset_daily: 'Daily', preset_weekly: 'Weekly', preset_monthly: 'Monthly', preset_yearly: 'Yearly', preset_custom: 'Custom',
        date_from: 'From', date_to: 'To',
        col_order: 'Order', col_date: 'Date', col_customer: 'Customer', col_total: 'Total',
        col_name: 'Name', col_sku: 'SKU', col_category: 'Category', col_price: 'Price',
        col_stock: 'Stock', col_status: 'Status', col_actions: 'Actions', col_phone: 'Phone',
        col_email: 'Email', col_balance: 'Amount owed', col_payment: 'Payment', col_type: 'Type', col_contact: 'Contact',
        col_role: 'Role', col_barcode: 'Barcode', col_qty: 'Qty', col_sales: 'Sales',
        role_admin: 'Admin', role_staff: 'Staff', role_accountant: 'Accountant',
        col_profit: 'Profit', col_amount: 'Amount', col_desc: 'Description', col_code: 'Code',
        col_symbol: 'Symbol', col_rate: 'Rate',
        col_items: 'Items', col_order_id: 'Order ID',
        all: 'All', in_stock: 'In Stock', low_stock: 'Low Stock', out_of_stock: 'Out of Stock',
        pos_out_of_stock_title: 'Out of stock',
        pos_out_of_stock_msg: '"{0}" is out of stock and cannot be added.',
        ok: 'OK',
        return: 'Return', empty_cart: 'Cart is empty', empty_list: 'No records',
        login_failed: 'Invalid username or password', checkout_ok: 'Sale completed',
        checkout_fail: 'Checkout failed', product_ok: 'Product added', return_ok: 'Return processed',
        expense_ok: 'Expense saved', convert_ok: 'Confirmed — converted to order',
        today_sales: 'Today Sales', inventory_value: 'Inventory Value', total_items: 'Total Items',
        low_stock_count: 'Low Stock', orders_today: 'Orders Today',
        rep_sales: 'Sales', rep_cost: 'Cost', rep_expenses: 'Expenses', rep_profit: 'Profit',
        rep_profit_before_expenses: 'Profit (before expenses)', rep_profit_after_expenses: 'Profit (after expenses)',
        lic_type: 'Type', lic_customer: 'Customer', lic_expires: 'Expires', lic_days: 'Days left',
        lic_valid: 'Valid', lic_invalid: 'Invalid', lic_trial: 'Trial', lic_machine: 'Machine',
        export: 'Export', tool_notif: 'Notifications', tool_lock: 'Lock', tool_calc: 'Calculator',
        refresh: 'Refresh', add_category: 'Add Category', add_customer: 'Add Customer',
        add_supplier: 'Add Supplier', add_user: 'Add User', add_currency: 'Add Currency',
        edit: 'Edit', delete: 'Delete', confirm_delete: 'Delete this record?', confirm_title: 'Please confirm', confirm_btn: 'Confirm', import: 'Import',
        refresh_rates: 'Refresh Rates', view: 'View', deleted_ok: 'Deleted', saved_ok: 'Saved', import_ok: 'Imported',
        view_order: 'View Order', col_address: 'Address', edit_product: 'Edit Product',
        quote_preview_title: 'Quotation Preview', quote_preview_quote: 'QUOTATION',
        quote_preview_cust_header: 'Customer Details', quote_col_photo: 'Photo', quote_col_desc: 'Item Description',
        quote_preview_meta: 'QUOTE #: {0}   |   DATE: {1}   |   CUST ID: {2}   |   VALIDITY: {3}',
        quote_validity_days: '15 Days', quote_no_address: 'No Address Provided', quote_no_phone: 'No Phone Provided',
        quote_terms_head: 'TERMS AND CONDITIONS',
        quote_terms_body: '• Validity: 15 days from issue.\n• Payment due prior to delivery.\n• Acceptance indicates billing confirmation.\n\nAccepted By: __________________________',
        quote_tax_extras: 'Tax / Extras', grand_total: 'GRAND TOTAL', preview: 'Preview',
        tool_backup: 'Backup', tool_about: 'About', backup_now: 'Create Backup', factory_reset: 'Factory Delete', confirm_factory_1: 'Delete ALL data and reset the database? This cannot be undone.', confirm_factory_2: 'Final confirmation: wipe everything and start empty?', factory_ok: 'Database reset', factory_fail: 'Factory reset failed', backup_export_ok: 'Backup exported', backup_import_ok: 'Backup imported',
        open_backup_folder: 'Open Folder', backup_ok: 'Backup created', backup_fail: 'Backup failed',
        no_notifications: 'No notifications', clear_all_notifications: 'Clear all',
        clear_notification: 'Clear', confirm_clear_notifications: 'Clear all notifications?',
        locked_title: 'Screen Locked',
        locked_subtitle: 'Enter your password to continue', unlock_btn: 'Unlock',
        unlock_fail: 'Incorrect password', about_blurb: 'Desktop inventory management for Panache.',
        last_backup: 'Last backup', backup_none: 'No backup yet',
        activate_license: 'Activate License', activate_btn: 'Activate', start_trial: 'Start Trial',
        license_key: 'License Key', machine_id: 'Machine ID', copy: 'Copy',
        license_subtitle: 'Enter your license key to activate this machine.',
        license_ok: 'License activated successfully', license_invalid: 'Invalid license key',
        trial_ok: 'Trial started', trial_used: 'Trial already used', copied: 'Copied',
        about_us: 'About Us', about_app_name: 'Panache Inventory',
        about_version: 'Version 1.0.2 Platinum',
        about_desc: 'A comprehensive Inventory and Sales Management System designed to meet the needs of SMBs. Features modern UI, real-time sync, and multi-language support.',
        about_dev: 'Developed by Softio Digital Transformation',
        about_contact: 'Contact Support',
        about_copyright: '© 2026 Softio Services. All Rights Reserved.',
        adjust_stock: 'Adjust Stock', quote: 'Quote', draft: 'Draft', details: 'Details',
        receive_payment: 'Receive Payment', pay_supplier: 'Pay Supplier',
        manage_categories: 'Manage Categories', rename: 'Rename', stock_ok: 'Stock updated',
        payment_ok: 'Payment recorded', restore_backup: 'Restore', confirm_restore: 'Restore this backup? All current data will be replaced.',
        add_exp_category: 'Add Category', note: 'Note', walk_in: 'Walk-in',
        walk_in_customer: 'Walk-in Customer', new_order: 'New Order',
        vat_label: 'VAT (11%)', shipping: 'Shipping', discount: 'Discount',
        total_payable: 'Total Payable', currency: 'Currency',
        return_items: 'Return', save_draft: 'Save Draft', quotation: 'Quotation',
        customer_bill: 'Pay Later', place_order: 'Pay Now',
        empty_cart_hint: 'Cart is empty! Please add items first.',
        pay_later_hint: 'Sell now, collect payment later',
        bill_need_customer: 'Select a customer for Pay Later',
        bill_ok: 'Added to customer debt',
        bill_ok_detail: 'Added {0} to {1}. Amount owed: {2}',
        pos_amount_owed: 'Amount owed',
        pos_credit_left: 'Credit left',
        credit_limit_warn: 'This sale would exceed the credit limit ({0}). New amount owed would be {1}. Continue?',
        filter_with_debt: 'With debt',
        print_receipt: 'Receipt',
        nav_pos_full: 'Point of Sale', manage_drafts: 'Manage Drafts',
        add_shipping: 'Add Shipping Details', view_shipping: 'View Shipping Details',
        pos_orders: 'Orders', pos_sales: 'Sales', pos_pending: 'Pending',
        shipping_to: 'Shipping To', order_date: 'Order Date', delivery_date: 'Delivery Date',
        payment_due: 'Payment Due Date', shipping_saved: 'Shipping details saved',
        delete_draft: 'Delete', load_draft: 'Open', no_drafts: 'No draft orders',
        bulk_delete: 'Bulk Delete', filter_all: 'All', filter_low_stock: 'Low Stock', filter_active: 'Active Only',
        col_image: 'Image', col_min_stock: 'Min Stock', col_location: 'Location', col_cost: 'Cost', col_supplier: 'Supplier',
        item_type: 'Type', type_product: 'Product', type_service: 'Service',
        sell_by: 'How is this sold?', sell_by_piece: 'Fixed price — piece, box, or pack', sell_by_weight: 'By weight — price per kilogram',
        sell_by_hint: 'Bulk chocolate: Price = $/kg. Stock in grams (5000 = 5 kg).',
        sell_by_hint_piece: 'Pick the unit below (pcs / box / pack). Price is for one unit; stock is how many you have.',
        weight_guide_title: 'Weight product setup',
        weight_guide_1: 'Set Price / kg for this chocolate type (example: 40 = $40 for 1 kg).',
        weight_guide_2: 'Set Stock (g) in grams (example: 5000 = 5 kg on the shelf).',
        weight_guide_3: 'At POS: Weigh → enter kg or Read scale → Add to cart.',
        price_per_kg: 'Price / kg', price_per_kg_hint: 'Enter the price of 1 kg. POS multiplies by the weighed amount.',
        stock_grams: 'Stock (g)', low_level_grams: 'Low level (g)',
        stock_grams_hint: 'Enter grams. Example: 1250 = 1.250 kg',
        stock_units_hint: 'How many units on the shelf (pieces, boxes, or packs).',
        uom_piece_hint: 'pcs / box / pack — price is for one unit',
        uom_weight_hint: 'Locked to kg. Price is per kg; stock below is in grams.',
        weigh_first: 'Product selected — enter kg or Read scale, then Add to cart',
        weigh_need_product: 'Press Weigh on a product first',
        weigh_need_scale: 'Enter a weight greater than 0',
        weigh_need_read: 'Enter weight (or Read scale) first',
        weigh_added: 'Added {0} @ {1} kg',
        weigh_btn: 'Weigh',
        per_kg: '/kg',
        scale_pick_product: 'Press on a weight product below',
        scale_weight_lbl: 'Weight (kg)', scale_price_lbl: 'Price',
        scale_read: 'Read scale', scale_add_cart: 'Add to cart',
        scale_selected: 'Selected',
        scale_manual_hint: 'Type kg here if the scale is offline',
        scale_offline_manual: 'Scale offline — type weight in kg',
        scale_offline: 'Scale offline',
        scale_online: 'Scale online',
        scale_unstable: 'Scale unstable',
        scale_settings: 'Scale settings',
        scale_clear: 'Remove from scale',
        scale_tare: 'Tare',
        scale_zero: 'Zero',
        scale_tare_hint: 'Ignore container weight',
        scale_zero_hint: 'Reset empty scale to zero',
        scale_port: 'Port',
        scale_baud: 'Baud',
        scale_auto_connect: 'Auto-connect',
        scale_connect: 'Connect',
        scale_disconnect: 'Disconnect',
        scale_sim: 'Sim',
        scale_sim_hint: 'Simulate 0.525 kg',
        unit_kg: 'kg',
        weight_in_kg: 'Weight in kg',
        scale_connected: 'Scale connected',
        scale_connect_failed: 'Scale connect failed',
        scale_disconnected: 'Scale disconnected',
        scale_api_unavailable: 'Scale API unavailable',
        scale_weighed_toast: '{0}: {1} {2} → {3}',
        scale_simulated: 'Simulated {0} {1}',
        scale_manual_set: 'Manual {0} {1}',
        upload_image: 'Upload Image', change_image: 'Change', remove_image: 'Remove',
        settings: 'Settings', sales_item: 'Sales item', purchase_item: 'Purchase item', inactive: 'Inactive',
        tax_rate: 'Tax Rate', expiry_date: 'Expiry Date', auto_sku: 'Auto', scan: 'Scan', batch_no: 'Batch No.',
        shelf: 'Shelf', uom: 'Unit of Measure', add_uom: 'Add Unit of Measure',
        add_uom_hint: 'Enter a custom unit name (e.g. carton, dozen).',
        uom_added: 'Unit added', uom_exists: 'Unit already exists', add: 'Add',
        stock_control: 'Stock control', track_stock: 'Track stock',
        low_level: 'Low level', prices: 'Prices', price_level: 'Level', gross_pct: 'Gross %',
        price1: 'Price 1', price2: 'Price 2', price3: 'Price 3', price4: 'Price 4',
        add_service: 'Add Service', edit_service: 'Edit Service', credit_limit: 'Credit Limit',
        reminder_days: 'Reminder Days', confirm_bulk_delete: 'Delete selected products?',
        card_view: 'Cards', table_view: 'Table', add_new: 'Add New',
        blind_return: 'Item Return', scan_or_search: 'Scan barcode or search...',
        confirm_clear_cart: 'Clear the current order?', draft_loaded: 'Draft loaded into cart',
        remove_line: 'Remove', invalid_price: 'Enter a valid price greater than zero',
        item_not_found: 'Item not found',
        return_ok_blind: 'Return processed',
        return_from_sale: 'Return from sale',
        return_from_sale_hint: 'Pick the customer, then the sale, then what to return.',
        quick_return: 'Quick return (no sale)',
        quick_return_hint: 'Use only when there is no receipt. Scan items to put back in stock.',
        show_sales: 'Show sales',
        back: 'Back',
        refund_total: 'Refund total',
        sold_qty: 'Sold',
        can_return: 'Can return',
        return_qty: 'Return qty',
        unit_price: 'Price',
        no_sales_for_customer: 'No sales found for this customer',
        select_customer_or_order: 'Select a customer or enter an order number',
        return_ok_detail: 'Returned {0} item(s). Refund {1}. Stock updated.',
        already_fully_returned: 'Nothing left to return on this sale',
        load_to_cart: 'Load',
        pos_menu: 'Menu', all_categories: 'All Categories', items_count: 'items',
        no_products: 'No products found.',
        scan_to_connect: 'Scan to Connect',
        scan_to_connect_hint: 'Same Wi‑Fi — open the full Panache app on phone or tablet.',
        copy_url: 'Copy URL'
    },
    ar: {
        login_title: 'تسجيل الدخول', login_subtitle: 'بوابة إدارة المخزون',
        username: 'اسم المستخدم', password: 'كلمة المرور', login_btn: 'دخول', logout: 'خروج',
        nav_dashboard: 'لوحة التحكم', nav_inventory: 'المخزون', nav_pos: 'نقطة البيع', nav_sales: 'المبيعات',
        nav_reports: 'التقارير', nav_history: 'السجل', nav_quotations: 'عروض الأسعار',
        nav_customers: 'العملاء', nav_suppliers: 'الموردون', nav_expenses: 'المصروفات',
        nav_currencies: 'العملات', nav_barcodes: 'الباركود', nav_users: 'المستخدمون', nav_settings: 'الإعدادات',
        dash_subtitle: 'نظرة عامة على نشاطك', inv_subtitle: 'إدارة القطع ومستويات المخزون',
        pos_subtitle: 'امسح أو اضغط على المنتجات للبيع', sales_subtitle: 'سجل الطلبات والمرتجعات',
        reports_subtitle: 'ملخص المبيعات والأرباح', history_subtitle: 'سجل النشاط',
        quot_subtitle: 'عروض بانتظار التحويل', cust_subtitle: 'دليل العملاء',
        supp_subtitle: 'دليل الموردين', exp_subtitle: 'تتبع مصروفات العمل',
        cur_subtitle: 'أسعار الصرف مقابل الدولار', bar_subtitle: 'معاينة ملصقات الطباعة',
        barcode_preview_title: 'طباعة',
        select_all: 'تحديد الكل',
        select_barcodes_first: 'حدد باركوداً واحداً على الأقل للطباعة',
        print_destination: 'الوجهة',
        print_copies: 'النسخ',
        print_layout: 'الاتجاه',
        print_portrait: 'عمودي',
        print_landscape: 'أفقي',
        print_pages: 'الصفحات',
        print_custom: 'مخصص',
        print_pages_ph: 'مثال: 1-5, 8',
        print_color: 'اللون',
        print_color_full: 'ملون',
        print_color_bw: 'أبيض وأسود',
        print_sheet_one: 'الإجمالي: ورقة واحدة',
        print_sheet_many: 'الإجمالي: {0} أوراق',
        print_system_printer: 'طابعة النظام…',
        print_sent: 'تم الإرسال للطابعة',
        print_failed: 'فشلت الطباعة',
        users_subtitle: 'الحسابات والصلاحيات', settings_subtitle: 'اللغة والترخيص والمظهر',
        recent_sales: 'أحدث المبيعات', add_product: 'إضافة منتج', add_expense: 'إضافة مصروف',
        search_ph: 'بحث...', cart_title: 'السلة', clear: 'مسح', subtotal: 'المجموع الفرعي', total: 'الإجمالي',
        checkout: 'إتمام الدفع', cancel: 'إلغاء', save: 'حفظ', print: 'طباعة', convert: 'تأكيد',
        process_return: 'معالجة مرتجع', return_reason: 'السبب', return_reason_ph: 'مثال: تالف',
        confirm_return: 'تأكيد المرتجع', language: 'اللغة', license_info: 'الترخيص',
        top_products: 'أفضل المنتجات', best_selling: 'الأكثر مبيعاً', top_categories: 'أفضل الفئات', mark_paid: 'تعليم الدفع', paid: 'مدفوع', unpaid: 'غير مدفوع',
        preset_daily: 'يومي', preset_weekly: 'أسبوعي', preset_monthly: 'شهري', preset_yearly: 'سنوي', preset_custom: 'مخصص',
        date_from: 'من', date_to: 'إلى',
        col_order: 'الطلب', col_date: 'التاريخ', col_customer: 'العميل', col_total: 'الإجمالي',
        col_name: 'الاسم', col_sku: 'الرمز', col_category: 'الفئة', col_price: 'السعر',
        col_stock: 'المخزون', col_status: 'الحالة', col_actions: 'إجراءات', col_phone: 'الهاتف',
        col_email: 'البريد', col_balance: 'المبلغ المستحق', col_payment: 'الدفع', col_type: 'النوع', col_contact: 'جهة الاتصال',
        col_role: 'الدور', col_barcode: 'الباركود', col_qty: 'الكمية', col_sales: 'المبيعات',
        role_admin: 'مدير', role_staff: 'موظف', role_accountant: 'محاسب',
        col_profit: 'الربح', col_amount: 'المبلغ', col_desc: 'الوصف', col_code: 'الرمز',
        col_symbol: 'الرمز', col_rate: 'السعر',
        col_items: 'العناصر', col_order_id: 'رقم الطلب',
        all: 'الكل', in_stock: 'متوفر', low_stock: 'منخفض', out_of_stock: 'نفد',
        pos_out_of_stock_title: 'نفد المخزون',
        pos_out_of_stock_msg: '"{0}" نفد من المخزون ولا يمكن إضافته.',
        ok: 'حسناً',
        return: 'مرتجع', empty_cart: 'السلة فارغة', empty_list: 'لا توجد سجلات',
        login_failed: 'اسم المستخدم أو كلمة المرور غير صحيحة', checkout_ok: 'تمت عملية البيع',
        checkout_fail: 'فشل الدفع', product_ok: 'تمت إضافة المنتج', return_ok: 'تمت معالجة المرتجع',
        expense_ok: 'تم حفظ المصروف', convert_ok: 'تم التأكيد وتحويل العرض إلى طلب',
        today_sales: 'مبيعات اليوم', inventory_value: 'قيمة المخزون', total_items: 'إجمالي القطع',
        low_stock_count: 'مخزون منخفض', orders_today: 'طلبات اليوم',
        rep_sales: 'المبيعات', rep_cost: 'التكلفة', rep_expenses: 'المصروفات', rep_profit: 'الربح',
        rep_profit_before_expenses: 'الربح (قبل المصروفات)', rep_profit_after_expenses: 'الربح (بعد المصروفات)',
        lic_type: 'النوع', lic_customer: 'العميل', lic_expires: 'ينتهي', lic_days: 'الأيام المتبقية',
        lic_valid: 'صالح', lic_invalid: 'غير صالح', lic_trial: 'تجريبي', lic_machine: 'الجهاز',
        export: 'تصدير', tool_notif: 'الإشعارات', tool_lock: 'قفل', tool_calc: 'آلة حاسبة',
        refresh: 'تحديث', add_category: 'إضافة فئة', add_customer: 'إضافة عميل',
        add_supplier: 'إضافة مورد', add_user: 'إضافة مستخدم', add_currency: 'إضافة عملة',
        edit: 'تعديل', delete: 'حذف', confirm_delete: 'حذف هذا السجل؟', confirm_title: 'يرجى التأكيد', confirm_btn: 'تأكيد', import: 'استيراد',
        refresh_rates: 'تحديث الأسعار', view: 'عرض', deleted_ok: 'تم الحذف', saved_ok: 'تم الحفظ', import_ok: 'تم الاستيراد',
        view_order: 'عرض الطلب', col_address: 'العنوان', edit_product: 'تعديل المنتج',
        quote_preview_title: 'معاينة عرض السعر', quote_preview_quote: 'عرض سعر',
        quote_preview_cust_header: 'تفاصيل العميل', quote_col_photo: 'صورة', quote_col_desc: 'وصف الصنف',
        quote_preview_meta: 'رقم العرض: {0}   |   التاريخ: {1}   |   رقم العميل: {2}   |   الصلاحية: {3}',
        quote_validity_days: '15 يوماً', quote_no_address: 'لا يوجد عنوان', quote_no_phone: 'لا يوجد هاتف',
        quote_terms_head: 'الشروط والأحكام',
        quote_terms_body: '• الصلاحية: 15 يوماً من تاريخ الإصدار.\n• الدفع مستحق قبل التسليم.\n• القبول يعني تأكيد الفوترة.\n\nتم القبول بواسطة: __________________________',
        quote_tax_extras: 'ضريبة / إضافات', grand_total: 'الإجمالي النهائي', preview: 'معاينة',
        tool_backup: 'نسخ احتياطي', tool_about: 'حول', backup_now: 'إنشاء نسخة', factory_reset: 'حذف المصنع', confirm_factory_1: 'حذف كل البيانات وإعادة ضبط قاعدة البيانات؟ لا يمكن التراجع.', confirm_factory_2: 'تأكيد أخير: مسح كل شيء والبدء من صفر؟', factory_ok: 'تمت إعادة ضبط قاعدة البيانات', factory_fail: 'فشل حذف المصنع', backup_export_ok: 'تم تصدير النسخة', backup_import_ok: 'تم استيراد النسخة',
        open_backup_folder: 'فتح المجلد', backup_ok: 'تم إنشاء النسخة', backup_fail: 'فشل النسخ',
        no_notifications: 'لا توجد إشعارات', clear_all_notifications: 'مسح الكل',
        clear_notification: 'مسح', confirm_clear_notifications: 'مسح كل الإشعارات؟',
        locked_title: 'الشاشة مقفلة',
        locked_subtitle: 'أدخل كلمة المرور للمتابعة', unlock_btn: 'فتح القفل',
        unlock_fail: 'كلمة المرور غير صحيحة', about_blurb: 'نظام إدارة المخزون لأوتارجي.',
        last_backup: 'آخر نسخة', backup_none: 'لا توجد نسخة بعد',
        activate_license: 'تفعيل الترخيص', activate_btn: 'تفعيل', start_trial: 'بدء التجربة',
        license_key: 'مفتاح الترخيص', machine_id: 'معرّف الجهاز', copy: 'نسخ',
        license_subtitle: 'أدخل مفتاح الترخيص لتفعيل هذا الجهاز.',
        license_ok: 'تم تفعيل الترخيص بنجاح', license_invalid: 'مفتاح الترخيص غير صالح',
        trial_ok: 'تم بدء الفترة التجريبية', trial_used: 'تم استخدام التجربة مسبقاً', copied: 'تم النسخ',
        about_us: 'من نحن', about_app_name: 'نظام مخزون أوتارجي', about_version: 'الإصدار 1.0.2 Platinum',
        about_desc: 'نظام متكامل لإدارة المخازن والمبيعات، مصمم خصيصاً لتلبية احتياجات الشركات الصغيرة والمتوسطة. يتميز بواجهة عصرية ودعم كامل للغة العربية.',
        about_dev: 'تطوير بواسطة Softio Digital Transformation', about_contact: 'تواصل معنا',
        about_copyright: '© 2026 Softio Services. جميع الحقوق محفوظة.',
        adjust_stock: 'تعديل المخزون', quote: 'عرض سعر', draft: 'مسودة', details: 'التفاصيل',
        receive_payment: 'استلام دفعة', pay_supplier: 'دفع للمورد',
        manage_categories: 'إدارة الفئات', rename: 'إعادة تسمية', stock_ok: 'تم تحديث المخزون',
        payment_ok: 'تم تسجيل الدفعة', restore_backup: 'استعادة', confirm_restore: 'استعادة هذه النسخة؟ سيتم استبدال جميع البيانات الحالية.',
        add_exp_category: 'إضافة فئة', note: 'ملاحظة', walk_in: 'عميل عابر',
        walk_in_customer: 'عميل عابر', new_order: 'طلب جديد',
        vat_label: 'ضريبة (11%)', shipping: 'الشحن', discount: 'خصم',
        total_payable: 'الإجمالي المستحق', currency: 'العملة',
        return_items: 'مرتجع', save_draft: 'حفظ مسودة', quotation: 'عرض سعر',
        customer_bill: 'ادفع لاحقاً', place_order: 'ادفع الآن',
        empty_cart_hint: 'السلة فارغة! أضف منتجات أولاً.',
        pay_later_hint: 'بيع الآن واستلام الدفع لاحقاً',
        bill_need_customer: 'اختر عميلاً لـ ادفع لاحقاً',
        bill_ok: 'أُضيف إلى دين العميل',
        bill_ok_detail: 'أُضيف {0} إلى {1}. المبلغ المستحق: {2}',
        pos_amount_owed: 'المبلغ المستحق',
        pos_credit_left: 'الائتمان المتبقي',
        credit_limit_warn: 'هذه العملية تتجاوز حد الائتمان ({0}). المبلغ المستحق الجديد سيكون {1}. المتابعة؟',
        filter_with_debt: 'عليهم دين',
        print_receipt: 'إيصال',
        nav_pos_full: 'نقطة البيع', manage_drafts: 'إدارة المسودات',
        add_shipping: 'إضافة تفاصيل الشحن', view_shipping: 'عرض تفاصيل الشحن',
        pos_orders: 'الطلبات', pos_sales: 'المبيعات', pos_pending: 'قيد الانتظار',
        shipping_to: 'الشحن إلى', order_date: 'تاريخ الطلب', delivery_date: 'تاريخ التسليم',
        payment_due: 'تاريخ الاستحقاق', shipping_saved: 'تم حفظ تفاصيل الشحن',
        delete_draft: 'حذف', load_draft: 'فتح', no_drafts: 'لا توجد مسودات',
        bulk_delete: 'حذف جماعي', filter_all: 'الكل', filter_low_stock: 'مخزون منخفض', filter_active: 'النشط فقط',
        col_image: 'الصورة', col_min_stock: 'الحد الأدنى', col_location: 'الموقع', col_cost: 'التكلفة', col_supplier: 'المورد',
        upload_image: 'رفع صورة', change_image: 'تغيير', remove_image: 'إزالة', item_type: 'النوع', type_product: 'منتج', type_service: 'خدمة',
        sell_by: 'كيف يُباع؟', sell_by_piece: 'سعر ثابت — قطعة أو علبة أو عبوة', sell_by_weight: 'بالوزن — السعر لكل كيلوغرام',
        sell_by_hint: 'شوكولا بالوزن: السعر = $/كغ. المخزون بالغرام (5000 = 5 كغ).',
        sell_by_hint_piece: 'اختر الوحدة أدناه (قطعة / علبة / عبوة). السعر لوحدة واحدة؛ المخزون = الكمية المتوفرة.',
        weight_guide_title: 'إعداد منتج بالوزن',
        weight_guide_1: 'ضع السعر / كغ لهذا النوع (مثال: 40 = 40$ لكل 1 كغ).',
        weight_guide_2: 'ضع المخزون (غ) بالغرام (مثال: 5000 = 5 كغ على الرف).',
        weight_guide_3: 'في نقطة البيع: وزن → أدخل الكغ أو اقرأ الميزان → أضف للسلة.',
        price_per_kg: 'السعر / كغ', price_per_kg_hint: 'أدخل سعر 1 كغ. نقطة البيع تضربه بالوزن.',
        stock_grams: 'المخزون (غ)', low_level_grams: 'الحد الأدنى (غ)',
        stock_grams_hint: 'أدخل الغرام. مثال: 1250 = 1.250 كغ',
        stock_units_hint: 'عدد الوحدات على الرف (قطع أو علب أو عبوات).',
        uom_piece_hint: 'قطعة / علبة / عبوة — السعر لوحدة واحدة',
        uom_weight_hint: 'مثبت على كغ. السعر لكل كغ؛ المخزون أدناه بالغرام.',
        weigh_first: 'تم اختيار المنتج — أدخل الكغ أو اقرأ الميزان ثم أضف للسلة',
        weigh_need_product: 'اضغط وزن على منتج أولاً',
        weigh_need_scale: 'أدخل وزناً أكبر من 0',
        weigh_need_read: 'أدخل الوزن (أو اقرأ الميزان) أولاً',
        weigh_added: 'أُضيف {0} @ {1} كغ',
        weigh_btn: 'وزن',
        per_kg: '/كغ',
        scale_pick_product: 'اضغط على منتج بالوزن من الأسفل',
        scale_weight_lbl: 'الوزن (كغ)', scale_price_lbl: 'السعر',
        scale_read: 'قراءة الميزان', scale_add_cart: 'إضافة للسلة',
        scale_selected: 'المحدد',
        scale_manual_hint: 'اكتب الكغ هنا إذا كان الميزان غير متصل',
        scale_offline_manual: 'الميزان غير متصل — أدخل الوزن بالكغ',
        scale_offline: 'الميزان غير متصل',
        scale_online: 'الميزان متصل',
        scale_unstable: 'الميزان غير مستقر',
        scale_settings: 'إعدادات الميزان',
        scale_clear: 'إزالة من الميزان',
        scale_tare: 'تارا',
        scale_zero: 'تصفير',
        scale_tare_hint: 'تجاهل وزن الوعاء',
        scale_zero_hint: 'إعادة الميزان الفارغ إلى الصفر',
        scale_port: 'المنفذ',
        scale_baud: 'معدل الباود',
        scale_auto_connect: 'اتصال تلقائي',
        scale_connect: 'اتصال',
        scale_disconnect: 'قطع الاتصال',
        scale_sim: 'محاكاة',
        scale_sim_hint: 'محاكاة 0.525 كغ',
        unit_kg: 'كغ',
        weight_in_kg: 'الوزن بالكغ',
        scale_connected: 'تم الاتصال بالميزان',
        scale_connect_failed: 'فشل الاتصال بالميزان',
        scale_disconnected: 'تم قطع اتصال الميزان',
        scale_api_unavailable: 'واجهة الميزان غير متاحة',
        scale_weighed_toast: '{0}: {1} {2} ← {3}',
        scale_simulated: 'تمت محاكاة {0} {1}',
        scale_manual_set: 'يدوي {0} {1}',
        settings: 'الإعدادات', sales_item: 'عنصر مبيعات', purchase_item: 'عنصر مشتريات', inactive: 'غير نشط',
        tax_rate: 'نسبة الضريبة', expiry_date: 'تاريخ الانتهاء', auto_sku: 'تلقائي', scan: 'مسح', batch_no: 'رقم الدفعة',
        shelf: 'الرف', uom: 'وحدة القياس', add_uom: 'إضافة وحدة قياس',
        add_uom_hint: 'أدخل اسم وحدة مخصصة (مثل كرتون، دستة).',
        uom_added: 'تمت إضافة الوحدة', uom_exists: 'الوحدة موجودة مسبقاً', add: 'إضافة',
        stock_control: 'التحكم بالمخزون', track_stock: 'تتبع المخزون',
        low_level: 'الحد الأدنى', prices: 'الأسعار', price_level: 'المستوى', gross_pct: 'الإجمالي %',
        price1: 'السعر 1', price2: 'السعر 2', price3: 'السعر 3', price4: 'السعر 4',
        add_service: 'إضافة خدمة', edit_service: 'تعديل الخدمة', credit_limit: 'حد الائتمان',
        reminder_days: 'أيام التذكير', confirm_bulk_delete: 'حذف المنتجات المحددة؟',
        card_view: 'بطاقات', table_view: 'جدول', add_new: 'إضافة جديد',
        blind_return: 'مرتجع أصناف', scan_or_search: 'امسح الباركود أو ابحث...',
        confirm_clear_cart: 'مسح الطلب الحالي؟', draft_loaded: 'تم تحميل المسودة إلى السلة',
        remove_line: 'إزالة', invalid_price: 'أدخل سعراً صالحاً أكبر من صفر',
        item_not_found: 'الصنف غير موجود',
        return_ok_blind: 'تمت معالجة المرتجع',
        return_from_sale: 'مرتجع من فاتورة',
        return_from_sale_hint: 'اختر العميل ثم الفاتورة ثم الأصناف المراد إرجاعها.',
        quick_return: 'مرتجع سريع (بدون فاتورة)',
        quick_return_hint: 'استخدمه فقط عند عدم وجود إيصال. امسح الأصناف لإعادتها للمخزون.',
        show_sales: 'عرض المبيعات',
        back: 'رجوع',
        refund_total: 'إجمالي الاسترداد',
        sold_qty: 'مباع',
        can_return: 'قابل للإرجاع',
        return_qty: 'كمية الإرجاع',
        unit_price: 'السعر',
        no_sales_for_customer: 'لا توجد مبيعات لهذا العميل',
        select_customer_or_order: 'اختر عميلاً أو أدخل رقم الطلب',
        return_ok_detail: 'تم إرجاع {0} صنف/أصناف. الاسترداد {1}. تم تحديث المخزون.',
        already_fully_returned: 'لا يوجد شيء متبقٍ للإرجاع في هذه الفاتورة',
        load_to_cart: 'تحميل',
        pos_menu: 'القائمة', all_categories: 'كل الفئات', items_count: 'أصناف',
        no_products: 'لا توجد منتجات.',
        scan_to_connect: 'امسح للاتصال',
        scan_to_connect_hint: 'نفس الواي فاي — افتح تطبيق باناش بالكامل على الهاتف أو الجهاز اللوحي.',
        copy_url: 'نسخ الرابط'
    }
};

let lang = localStorage.getItem('panache_lang') || localStorage.getItem('otargi_lang') || 'en';
let currentUser = null;
let products = [], categories = [], sales = [], customers = [], suppliers = [], users = [];
let expenses = [], quotations = [], currencies = [], barcodeItems = [], expenseCategories = [];
let dashboard = null, reportSummary = null, reportTop = [];
let cart = [], invCat = 'all', posCat = 'all', invFilter = 'all', invView = 'table';
let invSelected = new Set();
let barcodeSelected = new Set();
let returnOrderId = null, returnItemsCache = [];
let blindReturnItems = [];
let posReturnOrderId = null;
let posReturnItemsCache = [];
let editingProductId = null;
let posShipping = null;
let lastTappedProductId = null;
let scaleState = { connected: false, weight: 0, unit: 'kg', stable: true, port: '' };
const POS_VAT_RATE = 0.11;

function productPriceTiers(p) {
    if (!p) return [0];
    const tiers = [Number(p.price) || 0, Number(p.price2) || 0, Number(p.price3) || 0, Number(p.price4) || 0];
    return tiers;
}

function isSellByWeight(p) {
    if (!p) return false;
    const flag = p.sellByWeight ?? p.sell_by_weight;
    if (flag === true || flag === 1 || flag === '1') return true;
    // Fallback: bulk category + kg uom (covers DBs where flag was missing)
    const uom = String(p.uom || '').toLowerCase();
    const cat = String(p.category || '').toLowerCase();
    if (uom === 'kg' && cat.includes('bulk')) return true;
    return false;
}

function formatPosPrice(p) {
    const base = money(p?.price || 0);
    return isSellByWeight(p) ? `${base}${tr('per_kg')}` : base;
}

function formatPosStock(p) {
    if (p.isService || p.itemType === 'Service') return tr('type_service');
    if (!isPosProductAvailable(p)) return tr('out_of_stock');
    if (isSellByWeight(p)) {
        const kg = (Number(p.stock) || 0) / 1000;
        return `${kg.toFixed(3)} ${tr('unit_kg')}`;
    }
    return `${p.stock} ${tr('col_stock').toLowerCase()}`;
}

function makeCartLine(p, qty = 1, price = null, opts = {}) {
    const tiers = productPriceTiers(p);
    const unit = price != null ? Number(price) : (tiers[0] || 0);
    return {
        id: p.id,
        name: opts.name || p.name,
        price: unit,
        qty,
        max: (p.isService || p.itemType === 'Service' || p.isStockTracked === false) ? 9999 : (Number(p.stock) || 0),
        prices: tiers,
        lineKey: opts.lineKey || null,
        weighted: !!(opts.lineKey || opts.weighted || opts.weightKg),
        weightKg: opts.weightKg != null ? Number(opts.weightKg) : null,
        stockQty: opts.stockQty != null ? Number(opts.stockQty) : null,
        sellByWeight: isSellByWeight(p)
    };
}

function addToCart(id, qty = 1, opts = {}) {
    const p = products.find(x => x.id === id); if (!p) return false;
    lastTappedProductId = id;
    if (!isPosProductAvailable(p) && !opts.allowZeroStock) {
        showOutOfStockPopup(p.name);
        return false;
    }
    // Weighted / price-embedded scale lines stay as separate cart rows.
    if (opts.lineKey || opts.weighted) {
        if (isSellByWeight(p) && opts.stockQty > 0 && p.isStockTracked !== false) {
            if (opts.stockQty > (Number(p.stock) || 0)) {
                showOutOfStockPopup(p.name);
                return false;
            }
        }
        const row = makeCartLine(p, qty, opts.price != null ? opts.price : null, opts);
        cart.push(row);
        renderCart();
        return true;
    }
    if (isSellByWeight(p)) {
        toast(tr('weigh_first'), 'info');
        return false;
    }
    const line = cart.find(x => x.id === id && !x.weighted);
    if (line) {
        if (line.qty + qty > line.max) {
            showOutOfStockPopup(p.name);
            return false;
        }
        line.qty += qty;
    } else {
        const row = makeCartLine(p, qty, opts.price != null ? opts.price : null, opts);
        if (row.qty > row.max) {
            showOutOfStockPopup(p.name);
            return false;
        }
        cart.push(row);
    }
    renderCart();
    return true;
}

const exportCsv = (rows, filename) => {
    if (!rows.length) return toast(tr('empty_list'), 'error');
    const keys = Object.keys(rows[0]);
    const lines = [keys.join(',')].concat(rows.map(r => keys.map(k => {
        const v = String(r[k] ?? '').replace(/"/g, '""');
        return `"${v}"`;
    }).join(',')));
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
};

function parseCsvLine(line) {
    const cols = [];
    let cur = '', inQ = false;
    for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (inQ) {
            if (ch === '"' && line[i + 1] === '"') { cur += '"'; i++; }
            else if (ch === '"') inQ = false;
            else cur += ch;
        } else if (ch === '"') inQ = true;
        else if (ch === ',') { cols.push(cur); cur = ''; }
        else cur += ch;
    }
    cols.push(cur);
    return cols;
}

async function parseCsvFile(file) {
    const text = await file.text();
    const lines = text.split(/\r?\n/).filter(l => l.trim());
    if (lines.length < 2) return { headers: [], rows: [] };
    const headers = parseCsvLine(lines[0]).map(h => h.trim().toLowerCase());
    const rows = lines.slice(1).map(line => {
        const cols = parseCsvLine(line);
        const obj = {};
        headers.forEach((h, i) => { obj[h] = (cols[i] ?? '').trim(); });
        return obj;
    });
    return { headers, rows };
}

function csvCell(row, ...keys) {
    for (const k of keys) {
        const key = String(k || '').toLowerCase();
        if (row[key] != null && String(row[key]).trim() !== '') return String(row[key]).trim();
    }
    return '';
}

const actionBtns = (editAttr, deleteAttr, extra = '') => `<div class="table-actions">
    ${extra}
    <button type="button" class="btn-icon btn-icon-edit" title="${tr('edit')}" ${editAttr}><span class="material-symbols-rounded">edit</span></button>
    <button type="button" class="btn-icon btn-icon-delete" title="${tr('delete')}" ${deleteAttr}><span class="material-symbols-rounded">delete</span></button>
</div>`;

const tr = (k) => (T[lang] && T[lang][k]) || T.en[k] || String(k || '').replace(/_/g, ' ');

function formatRole(role) {
    const r = String(role || '').trim().toLowerCase();
    if (r === 'admin') return tr('role_admin');
    if (r === 'staff') return tr('role_staff');
    if (r === 'accountant') return tr('role_accountant');
    return role || '—';
}
const money = (n) => '$' + (Number(n) || 0).toFixed(2);
const posCurrencyMeta = () => {
    const sel = document.getElementById('pos-currency');
    const code = (sel?.value || 'USD').toString().trim().toUpperCase() || 'USD';
    const cur = (currencies || []).find(c => String(c.code || c.Code || '').toUpperCase() === code);
    let rate = Number(cur?.rate ?? cur?.Rate);
    if (!(rate > 0)) rate = code === 'USD' ? 1 : 1;
    const symbol = (cur?.symbol || cur?.Symbol || (code === 'USD' ? '$' : code === 'LBP' ? 'ل.ل.' : code + ' ')).toString();
    return { code, rate, symbol };
};
/** Format a USD-base amount in the active POS currency (with commas; LBP has no decimals). */
function formatPosAmount(usdAmount) {
    const { code, rate } = posCurrencyMeta();
    const converted = (Number(usdAmount) || 0) * rate;
    if (code === 'LBP') return Math.round(converted).toLocaleString('en-US');
    return converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
const posMoney = (n) => {
    const { code, symbol } = posCurrencyMeta();
    const amt = formatPosAmount(n);
    return code === 'LBP' ? `${symbol} ${amt}` : `${symbol}${amt}`;
};
function parsePosDisplayAmount(str) {
    const cleaned = String(str ?? '').replace(/[^\d.-]/g, '');
    if (!cleaned || cleaned === '-' || cleaned === '.') return NaN;
    const v = parseFloat(cleaned);
    return Number.isFinite(v) ? v : NaN;
}
function posDisplayToBase(displayAmt) {
    const { rate } = posCurrencyMeta();
    const r = rate > 0 ? rate : 1;
    return (Number(displayAmt) || 0) / r;
}

let posTotalManual = null; // always stored in USD base

function getPosTotals() {
    const sub = cart.reduce((s, x) => s + x.price * x.qty, 0);
    const vatOn = document.getElementById('pos-vat')?.checked;
    const shipOn = document.getElementById('pos-ship')?.checked;
    const discOn = document.getElementById('pos-disc')?.checked;
    const vat = vatOn ? sub * POS_VAT_RATE : 0;
    const ship = shipOn ? (parseFloat(document.getElementById('pos-ship-amt')?.value) || 0) : 0;
    const disc = discOn ? (parseFloat(document.getElementById('pos-disc-amt')?.value) || 0) : 0;
    const calc = Math.max(0, sub + vat + ship - disc);
    const totalInp = document.getElementById('pos-total-amt');
    let manual = posTotalManual;
    if (manual == null && totalInp && document.activeElement === totalInp) {
        const typed = parsePosDisplayAmount(totalInp.value);
        if (Number.isFinite(typed)) manual = Math.max(0, posDisplayToBase(typed));
    }
    const total = manual != null ? Math.max(0, manual) : calc;
    return { sub, vat, ship, disc, calc, total, vatOn, shipOn, discOn, manual: manual != null };
}
const escapeHtml = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const formatDate = (d) => { try { return new Date(d).toLocaleString(lang === 'ar' ? 'ar' : 'en'); } catch { return d; } };

function applyI18n() {
    document.documentElement.lang = lang;
    document.body.classList.toggle('rtl', lang === 'ar');
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = tr(el.getAttribute('data-i18n')); });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = tr(el.getAttribute('data-i18n-ph')); });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const t = tr(el.getAttribute('data-i18n-title'));
        el.title = t;
        if (el.hasAttribute('aria-label') || el.getAttribute('data-i18n-aria') === '1') el.setAttribute('aria-label', t);
    });
    const langLabel = document.getElementById('lang-label');
    if (langLabel) langLabel.textContent = lang === 'en' ? 'العربية' : 'English';
    try { scaleManager?.render?.(); } catch { /* scale not ready yet */ }
}

function toast(msg, type = '') {
    const el = document.getElementById('toast');
    el.textContent = msg; el.className = 'toast show ' + type;
    setTimeout(() => el.classList.remove('show'), 2800);
}

async function api(path, opts = {}) {
    const res = await fetch(API + path, { headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) }, ...opts });
    if (!res.ok) {
        let err = res.statusText;
        try { const j = await res.json(); err = j.error || j.title || j.detail || err; } catch {}
        throw new Error(err);
    }
    if (res.status === 204) return null;
    return res.json();
}

function userRoles() {
    if (!currentUser) return [];
    const roles = [];
    if (currentUser.isAdmin) roles.push('admin');
    if (currentUser.isStaff) roles.push('staff');
    if (currentUser.isAccountant) roles.push('accountant');
    if (!roles.length) {
        const r = (currentUser.role || '').toLowerCase();
        if (r.includes('admin')) roles.push('admin', 'staff', 'accountant');
        else if (r.includes('account')) roles.push('accountant');
        else roles.push('staff');
    }
    return roles;
}

function can(roleList) {
    if (!roleList) return true;
    const allowed = roleList.split(',').map(s => s.trim());
    return userRoles().some(r => allowed.includes(r));
}

function applyRolePermissions() {
    document.querySelectorAll('[data-roles]').forEach(el => {
        el.style.display = can(el.getAttribute('data-roles')) ? '' : 'none';
    });
}

function restoreRouteFromHash() {
    const target = (location.hash || '').replace(/^#\/?/, '');
    const item = target
        ? document.querySelector(`.nav-menu .nav-item[data-target="${target}"]`)
        : null;
    if (item && item.style.display !== 'none' && document.getElementById(target)) {
        navigateTo(target, false);
        return;
    }
    const first = [...document.querySelectorAll('.nav-menu .nav-item[data-target]')]
        .find(n => n.style.display !== 'none');
    if (first) navigateTo(first.getAttribute('data-target'), true);
}

function showApp() {
    const login = document.getElementById('login-screen');
    const app = document.getElementById('app-container');
    if (login) {
        login.classList.add('hidden');
        login.style.display = 'none';
    }
    if (app) {
        app.classList.add('visible');
        app.style.display = 'flex';
    }
    const tools = document.getElementById('titlebar-tools');
    if (tools) tools.hidden = false;
    if (currentUser) {
        const name = currentUser.fullName || currentUser.username;
        const curUser = document.getElementById('current-user');
        if (curUser) curUser.textContent = name;
        const tbName = document.getElementById('tb-user-name');
        if (tbName) tbName.textContent = name;
    }
    applyRolePermissions();
    refreshNotifications();
    restoreRouteFromHash();
}

function hideApp() {
    const login = document.getElementById('login-screen');
    const app = document.getElementById('app-container');
    if (login) {
        login.classList.remove('hidden');
        login.style.display = '';
    }
    if (app) {
        app.classList.remove('visible');
        app.style.display = 'none';
    }
    const tools = document.getElementById('titlebar-tools');
    if (tools) tools.hidden = true;
    currentUser = null;
    sessionStorage.removeItem('otargi_user');
    const userInput = document.getElementById('login-user');
    const passInput = document.getElementById('login-pass');
    if (userInput) userInput.value = '';
    if (passInput) passInput.value = '';
    const err = document.getElementById('login-error');
    if (err) {
        err.textContent = '';
        err.classList.remove('visible');
    }
    if (userInput) userInput.focus();
}

async function loadData() {
    const [p, c, s, d] = await Promise.all([
        api('/api/products?includeInactive=1'), api('/api/categories'), api('/api/recent-sales'), api('/api/dashboard')
    ]);
    products = (p || []).map(x => ({
        ...x,
        sellByWeight: isSellByWeight(x) || !!(x.sellByWeight || x.sell_by_weight)
    }));
    // Re-normalize after mapping (uses updated sellByWeight)
    products = products.map(x => ({ ...x, sellByWeight: isSellByWeight(x) }));
    categories = c || []; sales = s || []; dashboard = d || {};
    try { customers = await api('/api/customers'); } catch { customers = []; }
    try { suppliers = await api('/api/suppliers'); } catch { suppliers = []; }
    try { currencies = await api('/api/currencies'); } catch { currencies = []; }
    if (can('admin,accountant')) {
        try { expenses = await api('/api/expenses'); } catch { expenses = []; }
        try { quotations = await api('/api/quotations'); } catch { quotations = []; }
        try { expenseCategories = await api('/api/expense-categories'); } catch { expenseCategories = []; }
        await loadReports();
        await loadHistory();
    }
    if (can('admin')) {
        try { users = await api('/api/users'); } catch { users = []; }
    }
    try { barcodeItems = await api('/api/barcode/items'); } catch { barcodeItems = products.map(x => ({ id: x.id, name: x.name, sku: x.sku, price: x.price, barcode: x.barcode, stock: x.stock })); }
    await loadUoms();
    await loadLicense();
    await loadConnectInfo();
    renderAll();
}

async function loadConnectInfo() {
    const link = document.getElementById('dash-connect-url');
    const qr = document.getElementById('dash-connect-qr');
    const card = document.getElementById('dash-connect-card');
    try {
        const info = await api('/api/connect');
        if (!info?.url) throw new Error('no url');
        if (link) {
            link.href = info.url;
            link.textContent = info.url;
        }
        if (qr) qr.src = '/api/connect/qr?t=' + Date.now();
        card?.removeAttribute('hidden');
    } catch (e) {
        console.error('connect info', e);
        if (link) {
            link.href = '#';
            link.textContent = '—';
        }
    }
}

async function loadReports() {
    const preset = document.getElementById('report-preset')?.value || 'Monthly';
    const fromEl = document.getElementById('report-from');
    const toEl = document.getElementById('report-to');
    syncReportDateInputs(preset);
    const from = fromEl?.value || '';
    const to = toEl?.value || '';
    const qs = new URLSearchParams({ preset, limit: '15' });
    if (from && to) {
        qs.set('from', from);
        qs.set('to', to);
    }
    try {
        reportSummary = await api('/api/reports/summary?' + qs.toString());
        reportTop = await api('/api/reports/top-products?' + qs.toString());
        // Keep date inputs aligned with the range the API actually used
        if (reportSummary?.fromDate && fromEl && preset !== 'Custom') {
            fromEl.value = toInputDate(reportSummary.fromDate);
        }
        if (reportSummary?.toDate && toEl && preset !== 'Custom') {
            toEl.value = toInputDate(reportSummary.toDate);
        }
    } catch { reportSummary = null; reportTop = []; }
}

function toInputDate(v) {
    if (!v) return '';
    const s = String(v);
    if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
    try {
        const d = new Date(v);
        if (Number.isNaN(d.getTime())) return '';
        return formatLocalDate(d);
    } catch { return ''; }
}

function formatLocalDate(d) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function syncReportDateInputs(preset) {
    const fromEl = document.getElementById('report-from');
    const toEl = document.getElementById('report-to');
    if (!fromEl || !toEl) return;
    const today = new Date();
    const setRange = (from, to) => {
        fromEl.value = formatLocalDate(from);
        toEl.value = formatLocalDate(to);
    };
    if (preset === 'Custom') {
        if (!fromEl.value) fromEl.value = formatLocalDate(today);
        if (!toEl.value) toEl.value = formatLocalDate(today);
        fromEl.disabled = false;
        toEl.disabled = false;
        return;
    }
    fromEl.disabled = false;
    toEl.disabled = false;
    if (preset === 'Weekly') {
        const start = new Date(today);
        start.setDate(today.getDate() - today.getDay());
        setRange(start, today);
    } else if (preset === 'Monthly') {
        setRange(new Date(today.getFullYear(), today.getMonth(), 1), today);
    } else if (preset === 'Yearly') {
        setRange(new Date(today.getFullYear(), 0, 1), today);
    } else {
        setRange(today, today);
    }
}

async function loadHistory() {
    const kind = document.getElementById('history-kind')?.value || 'orders';
    try { window._historyRows = await api('/api/history/' + kind); }
    catch { window._historyRows = []; }
}

async function loadLicense() {
    try { window._license = await api('/api/license'); }
    catch { window._license = null; }
}

function renderAll() {
    try { renderDashboard(); } catch (e) { console.error(e); }
    try { renderInventory(); } catch (e) { console.error(e); }
    try { renderPOS(); } catch (e) { console.error(e); }
    try { renderSales(); } catch (e) { console.error(e); }
    try { renderReports(); } catch (e) { console.error(e); }
    try { renderHistory(); } catch (e) { console.error(e); }
    try { renderQuotations(); } catch (e) { console.error(e); }
    try { renderCustomers(); } catch (e) { console.error(e); }
    try { renderSuppliers(); } catch (e) { console.error(e); }
    try { renderExpenses(); } catch (e) { console.error(e); }
    try { renderCurrencies(); } catch (e) { console.error(e); }
    try { renderBarcodes(); } catch (e) { console.error(e); }
    try { renderUsers(); } catch (e) { console.error(e); }
    try { renderLicense(); } catch (e) { console.error(e); }
    try { updateBadges(); } catch (e) { console.error(e); }
}

function stockBadge(p) {
    if (p.isService || p.itemType === 'Service') return `<span class="badge service">${tr('type_service')}</span>`;
    if (p.isStockTracked === false) return `<span class="badge in-stock">—</span>`;
    if (p.stock <= 0) return `<span class="badge out-of-stock">${tr('out_of_stock')}</span>`;
    if (p.stock <= (p.minStock || 0)) return `<span class="badge low-stock">${tr('low_stock')}</span>`;
    return `<span class="badge in-stock">${tr('in_stock')}</span>`;
}

function renderDashboard() {
    const d = dashboard || {};
    document.getElementById('stats-grid').innerHTML = `
        <div class="stat-card"><div class="icon"><span class="material-symbols-rounded">payments</span></div>
            <div class="label">${tr('today_sales')}</div><div class="value">${money(d.todaySales)}</div></div>
        <div class="stat-card"><div class="icon"><span class="material-symbols-rounded">inventory</span></div>
            <div class="label">${tr('inventory_value')}</div><div class="value">${money(d.inventoryValue)}</div></div>
        <div class="stat-card"><div class="icon"><span class="material-symbols-rounded">category</span></div>
            <div class="label">${tr('total_items')}</div><div class="value">${d.totalItems ?? 0}</div></div>
        <div class="stat-card"><div class="icon"><span class="material-symbols-rounded">warning</span></div>
            <div class="label">${tr('low_stock_count')}</div><div class="value">${d.lowStock ?? 0}</div></div>
        <div class="stat-card"><div class="icon"><span class="material-symbols-rounded">shopping_bag</span></div>
            <div class="label">${tr('orders_today')}</div><div class="value">${d.ordersToday ?? 0}</div></div>`;

    const topProducts = normalizeDashRows(d.topProducts);
    const topCategories = normalizeDashRows(d.topCategories);
    const prodBody = document.getElementById('dash-top-products-body');
    if (prodBody) {
        prodBody.innerHTML = topProducts.length
            ? topProducts.map(r => `<tr>
                <td>${escapeHtml(r.name)}</td>
                <td>${Number(r.qtySold) || 0}</td>
                <td>${money(r.totalSales)}</td>
            </tr>`).join('')
            : `<tr><td colspan="3" class="empty-state">${tr('empty_list')}</td></tr>`;
    }
    const catBody = document.getElementById('dash-top-categories-body');
    if (catBody) {
        catBody.innerHTML = topCategories.length
            ? topCategories.map(r => `<tr>
                <td>${escapeHtml(r.name)}</td>
                <td>${Number(r.qtySold) || 0}</td>
                <td>${money(r.totalSales)}</td>
            </tr>`).join('')
            : `<tr><td colspan="3" class="empty-state">${tr('empty_list')}</td></tr>`;
    }

    document.getElementById('dash-sales-body').innerHTML = (sales.slice(0, 8).map(o => `
        <tr><td>#${o.orderId}</td><td>${formatDate(o.date)}</td><td>${escapeHtml(o.customer)}</td><td>${money(o.total)}</td></tr>`).join(''))
        || `<tr><td colspan="4" class="empty-state">${tr('empty_list')}</td></tr>`;
}

function normalizeDashRows(rows) {
    if (!Array.isArray(rows)) return [];
    return rows.map(r => ({
        name: r.name || r.Name || r.part_name || r.category_name || r.product_name || '—',
        qtySold: r.qtySold ?? r.QtySold ?? r.total_sold ?? r.quantity_sold ?? 0,
        totalSales: r.totalSales ?? r.TotalSales ?? r.total_sales ?? 0
    })).filter(r => r.name && r.name !== '—');
}

function renderCategoryPills(containerId, active, onClick) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = ['all', ...categories].map(c => {
        const key = c === 'all' ? 'all' : c;
        return `<button type="button" class="cat-pill ${active === key ? 'active' : ''}" data-cat="${escapeHtml(key)}">${escapeHtml(c === 'all' ? tr('all') : c)}</button>`;
    }).join('');
    el.querySelectorAll('.cat-pill').forEach(btn => btn.onclick = () => onClick(btn.getAttribute('data-cat')));
}

function countPosCategory(key) {
    return products.filter(p => {
        if (p.isInactive || p.status === 'Inactive') return false;
        if (key === 'all') return true;
        return p.category === key;
    }).length;
}

function renderPosCategoryChips() {
    const el = document.getElementById('pos-cats');
    if (!el) return;
    const chips = [{ key: 'all', label: tr('all_categories'), icon: 'grid_view' }]
        .concat((categories || []).map(c => ({ key: c, label: c, icon: 'category' })));
    el.innerHTML = chips.map(c => {
        const count = countPosCategory(c.key);
        const active = posCat === c.key ? ' active' : '';
        return `<button type="button" class="pos-cat-card${active}" data-cat="${escapeHtml(c.key)}">
            <span class="pos-cat-icon"><span class="material-symbols-rounded">${c.icon}</span></span>
            <span class="pos-cat-text">
                <strong>${escapeHtml(c.label)}</strong>
                <small>${count} ${tr('items_count')}</small>
            </span>
        </button>`;
    }).join('');
    el.querySelectorAll('.pos-cat-card').forEach(btn => {
        btn.onclick = () => { posCat = btn.getAttribute('data-cat'); renderPOS(); };
    });
}

function scrollPosCats(dir) {
    const el = document.getElementById('pos-cats');
    if (!el) return;
    el.scrollBy({ left: dir * 220, behavior: 'smooth' });
}

function renderPOS() {
    renderPosStats();
    renderPosCategoryChips();
    const list = filteredProducts(document.getElementById('pos-search')?.value, posCat, { forPos: true });
    const grid = document.getElementById('pos-products');
    grid.innerHTML = list.length ? list.map(p => {
        const img = p.image || p.categoryImage || '';
        const available = isPosProductAvailable(p);
        const stockLabel = formatPosStock(p);
        const byWeight = isSellByWeight(p);
        const isService = p.isService || p.itemType === 'Service';
        const weightClass = byWeight ? ' is-weighed' : '';
        const selectedClass = (byWeight && lastTappedProductId === p.id) ? ' is-scale-selected' : '';
        const weighBtn = byWeight
            ? `<button type="button" class="btn-pos-weigh" data-weigh-id="${p.id}">${tr('weigh_btn')}</button>`
            : '';
        const stockClass = !available ? 'pos-oos-label' : (isService ? 'pos-service-label' : '');
        return `<div class="pos-product-card ${available ? '' : 'is-out-of-stock'}${weightClass}${selectedClass}${isService ? ' is-service' : ''}" data-id="${p.id}" data-available="${available ? '1' : '0'}">
            <div class="pos-product-image placeholder"><span class="material-symbols-rounded">inventory_2</span>
                ${img ? `<img src="${escapeHtml(img)}" alt="" onload="this.parentElement.classList.remove('placeholder');this.previousElementSibling.style.display='none';" onerror="this.remove();">` : ''}
            </div>
            <h3>${escapeHtml(p.name)}</h3>
            <p class="${stockClass}">${escapeHtml(stockLabel)}</p>
            <div class="price">${formatPosPrice(p)}</div>
            ${weighBtn}
        </div>`;
    }).join('') : `<div class="empty-state pos-empty-products"><span class="material-symbols-rounded">inventory_2</span><div>${tr('no_products')}</div></div>`;

    grid.querySelectorAll('[data-weigh-id]').forEach(btn => {
        btn.onclick = async (e) => {
            e.stopPropagation();
            const id = Number(btn.dataset.weighId);
            const p = products.find(x => x.id === id);
            if (!p) return;
            if (!isPosProductAvailable(p)) {
                await showOutOfStockPopup(p.name);
                return;
            }
            scaleManager.selectForWeighing(p);
            renderPOS();
            document.getElementById('scaleManualWeight')?.focus();
        };
    });

    grid.querySelectorAll('.pos-product-card').forEach(card => {
        card.onclick = async () => {
            const id = Number(card.dataset.id);
            const p = products.find(x => x.id === id);
            if (!isPosProductAvailable(p)) {
                await showOutOfStockPopup(p?.name);
                return;
            }
            if (isSellByWeight(p)) {
                // Weight products: same as Weigh button (never add full $/kg as 1 pc)
                scaleManager.selectForWeighing(p);
                renderPOS();
                document.getElementById('scaleManualWeight')?.focus();
                return;
            }
            addToCart(id);
        };
    });
    populatePosCustomer();
    populatePosCurrency();
    updateShippingButton();
    renderCart();
}

function filteredProducts(search, cat, opts = {}) {
    const q = (search || '').toLowerCase().trim();
    const { forPos = false, invMode = false } = opts;
    return products.filter(p => {
        if (forPos && (p.isInactive || p.status === 'Inactive')) return false;
        if (invMode && invFilter === 'active' && (p.isInactive || p.status === 'Inactive')) return false;
        if (invMode && invFilter === 'low' && !(p.isStockTracked !== false && p.stock <= (p.minStock || 0))) return false;
        const matchCat = cat === 'all' || p.category === cat;
        const matchQ = !q || [p.name, p.sku, p.barcode, p.category, p.location].some(x => (x || '').toLowerCase().includes(q));
        return matchCat && matchQ;
    });
}

function productThumb(p) {
    const img = p.image || p.categoryImage || '';
    return img
        ? `<img class="inv-thumb" src="${escapeHtml(img)}" alt="" onerror="this.style.display='none'">`
        : `<span class="inv-thumb" style="display:inline-flex;align-items:center;justify-content:center;"><span class="material-symbols-rounded" style="opacity:.3;">inventory_2</span></span>`;
}

function updateInvBulkBtn() {
    const btn = document.getElementById('btn-bulk-delete-inventory');
    if (!btn) return;
    btn.hidden = invSelected.size === 0;
}

function renderInventory() {
    renderCategoryPills('inv-cats', invCat, c => { invCat = c; renderInventory(); });
    const list = filteredProducts(document.getElementById('inv-search')?.value, invCat, { invMode: true });
    const canEdit = can('admin');
    const tableWrap = document.getElementById('inv-table-wrap');
    const cardsEl = document.getElementById('inv-cards');
    if (tableWrap) tableWrap.hidden = invView !== 'table';
    if (cardsEl) cardsEl.hidden = invView !== 'card';

    document.getElementById('btn-inv-table')?.classList.toggle('active', invView === 'table');
    document.getElementById('btn-inv-cards')?.classList.toggle('active', invView === 'card');

    if (invView === 'table') {
        document.getElementById('inv-body').innerHTML = list.length ? list.map(p => `
            <tr class="${p.isInactive ? 'inv-row-inactive' : ''}">
                <td>${canEdit ? `<input type="checkbox" class="inv-row-check" data-inv-id="${p.id}" ${invSelected.has(p.id) ? 'checked' : ''}>` : ''}</td>
                <td>${productThumb(p)}</td>
                <td><strong>${escapeHtml(p.name)}</strong>${p.isInactive ? ` <span class="badge out-of-stock">${tr('inactive')}</span>` : ''}</td>
                <td>${escapeHtml(p.sku || '—')}</td>
                <td>${escapeHtml(p.barcode || '—')}</td>
                <td>${escapeHtml(p.category || '—')}</td>
                <td>${isSellByWeight(p) ? formatPosPrice(p) : money(p.price)}</td>
                <td>${p.isStockTracked === false ? '—' : (isSellByWeight(p) ? `${((Number(p.stock)||0)/1000).toFixed(3)} ${tr('unit_kg')}` : p.stock)}</td>
                <td>${p.minStock ?? 0}</td>
                <td>${escapeHtml(p.location || '—')}</td>
                <td>${stockBadge(p)}</td>
                <td>${canEdit ? actionBtns(`data-edit-product="${p.id}"`, `data-del-product="${p.id}"`,
                    `<button type="button" class="btn-icon" title="${tr('adjust_stock')}" data-adjust-product="${p.id}"><span class="material-symbols-rounded">inventory_2</span></button>`) : '—'}</td>
            </tr>`).join('')
            : `<tr><td colspan="12" class="empty-state">${tr('empty_list')}</td></tr>`;

        const selectAll = document.getElementById('inv-select-all');
        if (selectAll) {
            selectAll.checked = list.length > 0 && list.every(p => invSelected.has(p.id));
            selectAll.indeterminate = list.some(p => invSelected.has(p.id)) && !selectAll.checked;
        }
        document.querySelectorAll('.inv-row-check').forEach(cb => {
            cb.onchange = () => {
                const id = Number(cb.dataset.invId);
                if (cb.checked) invSelected.add(id); else invSelected.delete(id);
                updateInvBulkBtn();
                const sa = document.getElementById('inv-select-all');
                if (sa) sa.checked = list.length > 0 && list.every(p => invSelected.has(p.id));
            };
        });
    } else if (cardsEl) {
        const cards = list.map(p => `
            <div class="inv-card ${p.isInactive ? 'inactive' : ''}" data-inv-card="${p.id}">
                ${canEdit ? `<input type="checkbox" class="inv-card-check inv-row-check" data-inv-id="${p.id}" ${invSelected.has(p.id) ? 'checked' : ''}>` : ''}
                ${productThumb(p).replace('inv-thumb', 'inv-thumb inv-card-img')}
                <h3>${escapeHtml(p.name)}</h3>
                <div class="inv-card-meta">${escapeHtml(p.sku || '—')} · ${escapeHtml(p.category || '—')}</div>
                <div class="inv-card-meta">${tr('col_stock')}: ${p.isStockTracked === false ? '—' : (isSellByWeight(p) ? `${((Number(p.stock)||0)/1000).toFixed(3)} ${tr('unit_kg')}` : p.stock)}</div>
                <div class="price">${isSellByWeight(p) ? formatPosPrice(p) : money(p.price)}</div>
                ${stockBadge(p)}
            </div>`).join('');
        const addCard = canEdit ? `<div class="inv-card inv-card-add" id="inv-card-add"><span class="material-symbols-rounded">add</span><span data-i18n="add_new">Add New</span></div>` : '';
        cardsEl.innerHTML = (cards + addCard) || `<div class="empty-state">${tr('empty_list')}</div>`;
        cardsEl.querySelectorAll('[data-inv-card]').forEach(card => {
            card.onclick = e => {
                if (e.target.closest('.inv-row-check')) return;
                openProductModal(Number(card.dataset.invCard));
            };
        });
        cardsEl.querySelectorAll('.inv-row-check').forEach(cb => {
            cb.onclick = e => e.stopPropagation();
            cb.onchange = () => {
                const id = Number(cb.dataset.invId);
                if (cb.checked) invSelected.add(id); else invSelected.delete(id);
                updateInvBulkBtn();
            };
        });
        document.getElementById('inv-card-add')?.addEventListener('click', () => openProductModal(null));
        applyI18n();
    }

    document.querySelectorAll('[data-edit-product]').forEach(btn => btn.onclick = () => openProductModal(Number(btn.dataset.editProduct)));
    document.querySelectorAll('[data-del-product]').forEach(btn => btn.onclick = () => deleteProduct(Number(btn.dataset.delProduct)));
    document.querySelectorAll('[data-adjust-product]').forEach(btn => btn.onclick = () => openStockModal(Number(btn.dataset.adjustProduct)));
    updateInvBulkBtn();
}

function renderPosStats() {
    const d = dashboard || {};
    const ordersEl = document.getElementById('pos-stat-orders');
    const salesEl = document.getElementById('pos-stat-sales');
    const pendingEl = document.getElementById('pos-stat-pending');
    if (ordersEl) ordersEl.textContent = String(d.ordersToday ?? 0);
    if (salesEl) {
        const s = Number(d.todaySales) || 0;
        salesEl.textContent = money(Math.max(0, s));
    }
    if (pendingEl) pendingEl.textContent = String(d.pendingOrders ?? 0);
}

function renderReports() {
    const s = reportSummary || {};
    const d = dashboard || {};
    const grid = document.getElementById('report-stats');
    if (!grid) return;
    const rangeLabel = (s.fromDate && s.toDate)
        ? `${toInputDate(s.fromDate)} → ${toInputDate(s.toDate)}`
        : '';
    const cards = [
        { label: tr('rep_sales'), value: money(s.totalSales), sub: rangeLabel, cls: '' },
        { label: tr('rep_cost'), value: money(s.totalCost), sub: '', cls: '' },
        { label: tr('rep_expenses'), value: money(s.totalExpenses), sub: '', cls: '' },
        { label: tr('rep_profit_before_expenses'), value: money(s.totalProfit), sub: '', cls: 'stat-profit' },
        { label: tr('rep_profit_after_expenses'), value: money(s.totalProfitAfterExpenses), sub: '', cls: 'stat-profit-net' },
        { label: tr('pos_orders'), value: String(d.ordersToday ?? 0), sub: tr('orders_today'), cls: '' },
        { label: tr('pos_pending'), value: String(d.pendingOrders ?? 0), sub: '', cls: '' },
    ];
    const seen = new Set();
    grid.innerHTML = cards.filter(c => {
        const key = String(c.label || '').trim().toLowerCase();
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
    }).map(c => `
        <div class="stat-card ${c.cls || ''}"><div class="label">${escapeHtml(c.label)}</div><div class="value">${c.value}</div>
            ${c.sub ? `<div class="stat-sub">${escapeHtml(c.sub)}</div>` : ''}</div>`).join('');
    const rows = reportTop || [];
    document.getElementById('report-top-body').innerHTML = rows.length ? rows.map(r => `
        <tr><td>${escapeHtml(r.product_name || r.ProductName || '')}</td>
        <td>${r.quantity_sold ?? r.QuantitySold ?? 0}</td>
        <td>${money(r.total_sales ?? r.TotalSales)}</td>
        <td>${money(r.profit ?? r.Profit)}</td></tr>`).join('')
        : `<tr><td colspan="4" class="empty-state">${tr('empty_list')}</td></tr>`;
}

function updateShippingButton() {
    const btn = document.getElementById('btn-add-shipping');
    if (!btn) return;
    btn.textContent = posShipping?.shippingTo ? tr('view_shipping') : tr('add_shipping');
}

function populatePosCustomer() {
    const sel = document.getElementById('pos-customer');
    if (!sel) return;
    const cur = sel.value;
    sel.innerHTML = `<option value="">${escapeHtml(tr('walk_in_customer'))}</option>` +
        customers.map(c => `<option value="${c.id}">${escapeHtml(c.name)}</option>`).join('');
    if (cur && [...sel.options].some(o => o.value === cur)) sel.value = cur;
    updatePosCustomerDebt();
}

function updatePosCustomerDebt() {
    const el = document.getElementById('pos-customer-debt');
    if (!el) return;
    const id = Number(document.getElementById('pos-customer')?.value || 0);
    if (!id) {
        el.hidden = true;
        el.innerHTML = '';
        return;
    }
    const c = customers.find(x => x.id === id);
    if (!c) {
        el.hidden = true;
        return;
    }
    const bal = Number(c.balance) || 0;
    const limit = Number(c.creditLimit);
    const hasLimit = Number.isFinite(limit) && limit > 0;
    const left = hasLimit ? Math.max(0, limit - bal) : null;
    el.hidden = false;
    el.innerHTML = `<span class="pos-debt-owed ${bal > 0 ? 'has-debt' : ''}">${tr('pos_amount_owed')}: <strong>${money(bal)}</strong></span>` +
        (left != null ? `<span class="pos-debt-credit">${tr('pos_credit_left')}: <strong>${money(left)}</strong></span>` : '');
}

function populatePosCurrency() {
    const sel = document.getElementById('pos-currency');
    if (!sel) return;
    const cur = sel.value || 'USD';
    const list = (currencies && currencies.length)
        ? currencies
        : [{ code: 'USD', symbol: '$', rate: 1, name: 'US Dollar' }];
    sel.innerHTML = list.map(c => {
        const code = (c.code || c.Code || '').toString().trim() || 'USD';
        return `<option value="${escapeHtml(code)}">${escapeHtml(code)}</option>`;
    }).join('');
    if ([...sel.options].some(o => o.value === cur)) sel.value = cur;
    else sel.value = list[0]?.code || list[0]?.Code || 'USD';
    if (!sel.value) sel.value = 'USD';
}

function normalizeScanCode(code) {
    return String(code || '')
        .replace(/[\u0000-\u001F\u007F]/g, '') // control chars from some scanners
        .replace(/\u200e|\u200f/g, '')
        .trim();
}

function findProductByScan(code) {
    const q = normalizeScanCode(code).toLowerCase();
    if (!q) return null;
    const norm = (v) => normalizeScanCode(v).toLowerCase();
    // Exact barcode / SKU first
    let p = products.find(x => norm(x.barcode) && norm(x.barcode) === q)
        || products.find(x => norm(x.sku) && norm(x.sku) === q);
    if (p) return p;
    // Match without leading zeros
    const qStrip = q.replace(/^0+/, '') || q;
    p = products.find(x => {
        const b = norm(x.barcode).replace(/^0+/, '') || norm(x.barcode);
        const s = norm(x.sku).replace(/^0+/, '') || norm(x.sku);
        return (b && b === qStrip) || (s && s === qStrip);
    });
    if (p) return p;
    // Exact name last
    return products.find(x => norm(x.name) === q) || null;
}

let posScanBuffer = '';
let posScanTimer = null;
let posSearchDebounce = null;
let posScanLastKeyAt = 0;
let posScanFastGaps = 0;

function isPosViewActive() {
    return !!document.getElementById('pos')?.classList.contains('active');
}

function scrollPosCartIntoView() {
    const panel = document.querySelector('#pos .pos-order-panel');
    if (!panel) return;
    // On stacked mobile layout the cart sits below products
    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

async function tryPosScanAdd(codeOverride) {
    const input = document.getElementById('pos-search');
    const code = normalizeScanCode(codeOverride != null ? codeOverride : (input?.value || ''));
    if (!code) return;

    // TM-A17 / EAN-13 scale printed labels first
    try {
        const handled = await scaleManager.resolveBarcode(code);
        if (handled) {
            if (input) input.value = '';
            renderPOS();
            scrollPosCartIntoView();
            input?.focus();
            return;
        }
    } catch { /* fall through to normal scan */ }

    const p = findProductByScan(code);
    if (!p) {
        if (input) input.value = '';
        renderPOS();
        toast(tr('item_not_found') + ': ' + code, 'error');
        input?.focus();
        return;
    }
    if (!isPosProductAvailable(p)) {
        if (input) input.value = '';
        renderPOS();
        await showOutOfStockPopup(p.name);
        input?.focus();
        return;
    }
    if (addToCart(p.id)) {
        if (input) input.value = '';
        renderPOS();
        scrollPosCartIntoView();
        toast(`${p.name} ✓`, 'success');
    } else if (input) {
        input.value = '';
        renderPOS();
    }
    input?.focus();
}

function handlePosScannerKeydown(e) {
    if (!isPosViewActive()) return;
    if (e.ctrlKey || e.altKey || e.metaKey) return;

    const t = e.target;
    const tag = (t?.tagName || '').toLowerCase();
    const onPosSearch = t?.id === 'pos-search';
    const typingElsewhere = !onPosSearch && (
        tag === 'textarea' || tag === 'select' ||
        (tag === 'input' && t.type !== 'checkbox' && t.type !== 'radio' && t.type !== 'button' && t.type !== 'submit') ||
        t?.isContentEditable
    );
    if (typingElsewhere) return;

    // Enter ends a scan
    if (e.key === 'Enter') {
        const fromBuffer = normalizeScanCode(posScanBuffer);
        const fromInput = onPosSearch ? normalizeScanCode(t.value) : '';
        const code = fromBuffer.length >= 2 ? fromBuffer : fromInput;
        posScanBuffer = '';
        if (posScanTimer) { clearTimeout(posScanTimer); posScanTimer = null; }
        if (!code) return;
        e.preventDefault();
        e.stopPropagation();
        tryPosScanAdd(code);
        return;
    }

    // Build buffer for wedge scanners (works even when search isn't focused)
    if (e.key.length === 1) {
        const now = Date.now();
        if (posScanBuffer && (now - posScanLastKeyAt) < 55) posScanFastGaps++;
        else posScanFastGaps = 0;
        posScanLastKeyAt = now;
        posScanBuffer += e.key;
        if (posScanTimer) clearTimeout(posScanTimer);
        // Auto-submit only for scanner-speed bursts (no Enter suffix required)
        posScanTimer = setTimeout(() => {
            const code = normalizeScanCode(posScanBuffer);
            const wasScanner = posScanFastGaps >= 3 && code.length >= 4;
            posScanBuffer = '';
            posScanFastGaps = 0;
            if (wasScanner && isPosViewActive()) tryPosScanAdd(code);
        }, 90);
    } else if (e.key === 'Backspace') {
        posScanBuffer = posScanBuffer.slice(0, -1);
        posScanFastGaps = 0;
    }
}

function renderCart() {
    clearPosTotalManual();
    const el = document.getElementById('cart-items');
    if (!el) return;
    if (!cart.length) el.innerHTML = `<div class="empty-state">${tr('empty_cart_hint')}</div>`;
    else {
        el.innerHTML = cart.map((item, i) => {
            const tiers = (item.prices && item.prices.length) ? item.prices : [item.price];
            const tierOpts = tiers.map((pr, ti) => {
                if (!(Number(pr) > 0) && ti > 0) return '';
                const sel = Math.abs(Number(pr) - Number(item.price)) < 0.0001 ? ' selected' : '';
                return `<option value="${ti}"${sel}>P${ti + 1}</option>`;
            }).join('');
            return `<div class="cart-item" data-i="${i}">
                <div class="cart-item-top">
                    <div class="cart-item-info"><strong>${escapeHtml(item.name)}</strong></div>
                    <strong class="cart-line-total">${posMoney(item.price * item.qty)}</strong>
                </div>
                <div class="cart-item-controls">
                    <div class="qty-controls">
                        <button type="button" data-qty="${i}" data-d="-1">−</button>
                        <span>${item.qty}</span>
                        <button type="button" data-qty="${i}" data-d="1">+</button>
                    </div>
                    <div class="cart-price-wrap">
                        <select class="cart-tier" data-tier="${i}" title="${tr('prices')}">${tierOpts}</select>
                        <input type="number" class="cart-price-input" data-price="${i}" min="0.01" step="0.01" value="${Number(item.price).toFixed(2)}">
                    </div>
                    <button type="button" class="cart-remove" data-rm="${i}" title="${tr('remove_line')}"><span class="material-symbols-rounded">delete</span></button>
                </div>
            </div>`;
        }).join('');
        el.querySelectorAll('button[data-qty]').forEach(btn => {
            btn.onclick = () => {
                const i = Number(btn.dataset.qty), d = Number(btn.dataset.d);
                cart[i].qty += d;
                if (cart[i].qty <= 0) cart.splice(i, 1);
                else if (cart[i].qty > cart[i].max) cart[i].qty = cart[i].max;
                renderCart();
            };
        });
        el.querySelectorAll('select[data-tier]').forEach(sel => {
            sel.onchange = () => {
                const i = Number(sel.dataset.tier);
                const ti = Number(sel.value);
                const pr = Number(cart[i].prices?.[ti]);
                if (pr > 0) cart[i].price = pr;
                renderCart();
            };
        });
        el.querySelectorAll('input[data-price]').forEach(inp => {
            inp.onchange = () => {
                const i = Number(inp.dataset.price);
                const v = parseFloat(inp.value);
                if (!(v > 0)) { toast(tr('invalid_price'), 'error'); inp.value = Number(cart[i].price).toFixed(2); return; }
                cart[i].price = v;
                renderCart();
            };
        });
        el.querySelectorAll('button[data-rm]').forEach(btn => {
            btn.onclick = () => { cart.splice(Number(btn.dataset.rm), 1); renderCart(); };
        });
    }
    updatePosTotalsUi();
}

function updatePosTotalsUi() {
    const t = getPosTotals();
    const shipWrap = document.getElementById('pos-ship-wrap');
    const discWrap = document.getElementById('pos-disc-wrap');
    if (shipWrap) shipWrap.hidden = !t.shipOn;
    if (discWrap) discWrap.hidden = !t.discOn;
    const set = (id, v) => { const n = document.getElementById(id); if (n) n.textContent = posMoney(v); };
    set('cart-subtotal', t.sub);
    set('cart-vat', t.vat);
    set('cart-ship', t.ship);
    set('cart-disc', t.disc);
    const { symbol, code } = posCurrencyMeta();
    const sym = document.getElementById('cart-total-sym');
    if (sym) sym.textContent = symbol;
    const totalInp = document.getElementById('pos-total-amt');
    const base = t.manual ? t.total : t.calc;
    if (totalInp && document.activeElement !== totalInp) {
        totalInp.value = formatPosAmount(base);
        totalInp.dataset.currency = code;
    }
    const edit = totalInp?.closest('.pos-total-edit');
    if (edit) edit.classList.toggle('is-lbp', code === 'LBP');
}

function clearPosTotalManual() {
    posTotalManual = null;
}

function renderSales() {
    document.getElementById('sales-body').innerHTML = sales.length ? sales.map(o => {
        const isPaid = String(o.paymentStatus || 'Paid').toLowerCase() === 'paid';
        return `<tr><td>#${o.orderId}</td><td>${formatDate(o.date)}</td><td>${escapeHtml(o.customer)}</td>
        <td>${money(o.total)}</td>
        <td><span class="badge ${isPaid ? 'in-stock' : 'low-stock'}">${isPaid ? tr('paid') : tr('unpaid')}</span></td>
        <td><div class="table-actions">
            <button type="button" class="btn btn-secondary btn-sm" data-view-order="${o.orderId}">${tr('view')}</button>
            <button type="button" class="btn btn-secondary btn-sm" data-return="${o.orderId}">${tr('return')}</button>
        </div></td></tr>`;
    }).join('')
        : `<tr><td colspan="6" class="empty-state">${tr('empty_list')}</td></tr>`;
    document.querySelectorAll('[data-return]').forEach(btn => btn.onclick = () => openReturn(Number(btn.dataset.return)));
    document.querySelectorAll('[data-view-order]').forEach(btn => btn.onclick = () => viewOrder(Number(btn.dataset.viewOrder)));
}

function historyColLabel(key) {
    const k = String(key || '').trim();
    const map = {
        items: 'col_items', Items: 'col_items', ITEMS: 'col_items',
        status: 'col_status', Status: 'col_status', STATUS: 'col_status',
        total: 'col_total', Total: 'col_total', TOTAL: 'col_total',
        customer: 'col_customer', Customer: 'col_customer', CUSTOMER: 'col_customer',
        date: 'col_date', Date: 'col_date', DATE: 'col_date',
        'order id': 'col_order_id', 'Order Id': 'col_order_id', 'Order ID': 'col_order_id', 'ORDER ID': 'col_order_id',
        orderId: 'col_order_id', OrderId: 'col_order_id',
        name: 'col_name', Name: 'col_name', NAME: 'col_name',
        sku: 'col_sku', SKU: 'col_sku',
        category: 'col_category', Category: 'col_category', CATEGORY: 'col_category',
        phone: 'col_phone', Phone: 'col_phone', PHONE: 'col_phone',
        email: 'col_email', Email: 'col_email', EMAIL: 'col_email',
        amount: 'col_amount', Amount: 'col_amount', AMOUNT: 'col_amount',
        description: 'col_desc', Description: 'col_desc', DESCRIPTION: 'col_desc',
        payment: 'col_payment', Payment: 'col_payment', PAYMENT: 'col_payment',
    };
    const i18nKey = map[k] || map[k.toLowerCase()];
    return i18nKey ? tr(i18nKey) : k;
}

function renderHistory() {
    const rows = window._historyRows || [];
    const head = document.getElementById('history-head');
    const body = document.getElementById('history-body');
    if (!rows.length) {
        head.innerHTML = '';
        body.innerHTML = `<tr><td class="empty-state">${tr('empty_list')}</td></tr>`;
        return;
    }
    const keys = Object.keys(rows[0]);
    head.innerHTML = `<tr>${keys.map(k => `<th>${escapeHtml(historyColLabel(k))}</th>`).join('')}</tr>`;
    body.innerHTML = rows.slice(0, 100).map(r => `<tr>${keys.map(k => {
        let v = r[k];
        if (v && (String(k).toLowerCase().includes('date') || String(k).toLowerCase().includes('timestamp'))) v = formatDate(v);
        else if (typeof v === 'number' && (String(k).toLowerCase().includes('total') || String(k).toLowerCase().includes('amount'))) v = money(v);
        return `<td>${escapeHtml(v)}</td>`;
    }).join('')}</tr>`).join('');
}

function renderQuotations() {
    document.getElementById('quot-body').innerHTML = quotations.length ? quotations.map(q => `
        <tr><td>#${q.orderId}</td><td>${formatDate(q.orderDate)}</td><td>${escapeHtml(q.customerName)}</td>
        <td>${money(q.totalAmount)}</td>
        <td><div class="table-actions">
            <button type="button" class="btn-icon btn-icon-bare" title="${tr('preview')}" data-preview-quot="${q.orderId}"><span class="material-symbols-rounded">visibility</span></button>
            <button type="button" class="btn-icon btn-icon-success" title="${tr('convert')}" data-convert="${q.orderId}"><span class="material-symbols-rounded">check</span></button>
            <button type="button" class="btn-icon btn-icon-danger" title="${tr('delete')}" data-del-quot="${q.orderId}"><span class="material-symbols-rounded">delete</span></button>
        </div></td></tr>`).join('')
        : `<tr><td colspan="5" class="empty-state">${tr('empty_list')}</td></tr>`;
    document.querySelectorAll('[data-preview-quot]').forEach(btn => {
        btn.onclick = () => openQuotationPreview(Number(btn.dataset.previewQuot));
    });
    document.querySelectorAll('[data-convert]').forEach(btn => {
        btn.onclick = async () => {
            try {
                await api('/api/quotations/' + btn.dataset.convert + '/convert', { method: 'POST' });
                toast(tr('convert_ok'), 'success'); await loadData();
            } catch (e) { toast(e.message, 'error'); }
        };
    });
    document.querySelectorAll('[data-del-quot]').forEach(btn => btn.onclick = () => deleteQuotation(Number(btn.dataset.delQuot)));
}

let _quotePreviewData = null;

function formatQuoteDate(d) {
    try {
        const dt = new Date(d);
        if (Number.isNaN(dt.getTime())) return String(d || '');
        return dt.toLocaleDateString(lang === 'ar' ? 'ar' : 'en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch { return String(d || ''); }
}

function quoteImageHtml(path, name) {
    const img = (path || '').trim();
    if (img) {
        const url = img.startsWith('/') || img.startsWith('http') ? img : '/' + img.replace(/^\/+/, '');
        return `<img class="quote-item-img" src="${escapeHtml(url)}" alt="" onerror="this.style.display='none';this.nextElementSibling&&(this.nextElementSibling.hidden=false)"><span class="material-symbols-rounded quote-item-fallback" hidden>inventory_2</span>`;
    }
    return `<span class="material-symbols-rounded quote-item-fallback">inventory_2</span>`;
}

async function openQuotationPreview(orderId) {
    try {
        const data = await api('/api/quotations/' + orderId);
        _quotePreviewData = data;
        const title = document.getElementById('quote-preview-title');
        if (title) title.textContent = `${tr('quote_preview_title')} - #${data.orderId}`;
        const company = document.getElementById('quote-company-name');
        if (company) company.textContent = (data.companyName || 'Panache').toUpperCase();
        const info = document.getElementById('quote-company-info');
        if (info) info.textContent = data.companyInfo || 'Jnah- Rihab Road | Beirut - Lebanon | Phone: +961 76 117731';
        const meta = document.getElementById('quote-meta-line');
        if (meta) {
            meta.textContent = tr('quote_preview_meta')
                .replace('{0}', data.orderId)
                .replace('{1}', formatQuoteDate(data.orderDate || new Date()))
                .replace('{2}', data.customerId != null ? data.customerId : 'N/A')
                .replace('{3}', tr('quote_validity_days'));
        }
        const cust = document.getElementById('quote-cust-body');
        if (cust) {
            const name = data.customerName || tr('walk_in_customer');
            const address = (data.address || '').trim() || tr('quote_no_address');
            const phone = (data.phone || '').trim() || tr('quote_no_phone');
            cust.innerHTML = `<div class="quote-cust-name">${escapeHtml(name)}</div>
                <div class="quote-cust-line">${escapeHtml(tr('col_address'))}: ${escapeHtml(address)} | ${escapeHtml(tr('col_phone'))}: ${escapeHtml(phone)}</div>`;
        }
        const body = document.getElementById('quote-items-body');
        const items = data.items || [];
        if (body) {
            body.innerHTML = items.length ? items.map(it => {
                const lineTotal = Number(it.price) * Number(it.qty);
                const desc = [it.name, it.description].filter(Boolean).map(escapeHtml).join('<br>');
                return `<tr>
                    <td class="quote-photo-cell">${quoteImageHtml(it.image, it.name)}</td>
                    <td>${desc}</td>
                    <td>${it.qty}</td>
                    <td>${money(it.price)}</td>
                    <td><strong>${money(lineTotal)}</strong></td>
                </tr>`;
            }).join('') : `<tr><td colspan="5" class="empty-state">${tr('empty_list')}</td></tr>`;
        }
        const subtotal = Number(data.subtotal || 0);
        const grand = Number(data.totalAmount != null ? data.totalAmount : subtotal);
        const tax = Math.max(0, grand - subtotal);
        const totals = document.getElementById('quote-totals');
        if (totals) {
            totals.innerHTML = `
                <div class="quote-total-row"><span>${tr('subtotal')}</span><strong>${money(subtotal)}</strong></div>
                ${tax > 0.009 ? `<div class="quote-total-row"><span>${tr('quote_tax_extras')}</span><strong>${money(tax)}</strong></div>` : ''}
                <div class="quote-total-row quote-total-grand"><span>${tr('grand_total')}</span><strong>${money(grand)}</strong></div>`;
        }
        openModal('quotation-preview-modal');
    } catch (e) { toast(e.message, 'error'); }
}

function printQuotationPreview() {
    const sheet = document.getElementById('quote-preview-sheet');
    if (!sheet) return;
    document.body.classList.add('printing-quote');
    const cleanup = () => {
        document.body.classList.remove('printing-quote');
        window.removeEventListener('afterprint', cleanup);
    };
    window.addEventListener('afterprint', cleanup);
    setTimeout(() => { if (!window.matchMedia('print').matches) cleanup(); }, 30000);
    window.print();
}

function exportQuotationPreview() {
    const data = _quotePreviewData;
    if (!data) return;
    const rows = [
        ['Quote #', data.orderId],
        ['Date', formatQuoteDate(data.orderDate)],
        ['Customer', data.customerName || ''],
        ['Customer ID', data.customerId != null ? data.customerId : 'N/A'],
        ['Validity', '15 Days'],
        [],
        ['Item', 'Qty', 'Price', 'Total'],
        ...(data.items || []).map(it => [it.name, it.qty, it.price, Number(it.price) * Number(it.qty)]),
        [],
        ['Subtotal', data.subtotal],
        ['Grand Total', data.totalAmount],
    ];
    const csv = rows.map(r => r.map(c => `"${String(c ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `quotation_${data.orderId}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
    toast(tr('saved_ok'), 'success');
}

let custDebtOnly = false;

function renderCustomers() {
    const q = (document.getElementById('cust-search')?.value || '').toLowerCase();
    const list = customers.filter(c => {
        if (custDebtOnly && !(Number(c.balance) > 0)) return false;
        return !q || [c.name, c.phone, c.email].some(x => (x || '').toLowerCase().includes(q));
    });
    document.getElementById('cust-body').innerHTML = list.length ? list.map(c => {
        const owed = Number(c.balance) || 0;
        return `<tr class="${owed > 0 ? 'row-has-debt' : ''}"><td>${escapeHtml(c.name)}</td><td>${escapeHtml(c.phone || '—')}</td><td>${escapeHtml(c.email || '—')}</td>
        <td class="${owed > 0 ? 'cell-debt' : ''}">${money(owed)}</td><td>${escapeHtml(c.type || '—')}</td>
        <td>${actionBtns(`data-edit-customer="${c.id}"`, `data-del-customer="${c.id}"`,
            `<button type="button" class="btn-icon" title="${tr('details')}" data-details-customer="${c.id}"><span class="material-symbols-rounded">info</span></button>`)}</td></tr>`;
    }).join('')
        : `<tr><td colspan="6" class="empty-state">${tr('empty_list')}</td></tr>`;
    document.querySelectorAll('[data-edit-customer]').forEach(btn => btn.onclick = () => openCustomerModal(Number(btn.dataset.editCustomer)));
    document.querySelectorAll('[data-del-customer]').forEach(btn => btn.onclick = () => deleteCustomer(Number(btn.dataset.delCustomer)));
    document.querySelectorAll('[data-details-customer]').forEach(btn => btn.onclick = () => openCustomerDetails(Number(btn.dataset.detailsCustomer)));
}

function renderSuppliers() {
    const q = (document.getElementById('supp-search')?.value || '').toLowerCase();
    const list = suppliers.filter(s => !q || [s.name, s.contact, s.phone].some(x => (x || '').toLowerCase().includes(q)));
    document.getElementById('supp-body').innerHTML = list.length ? list.map(s => `
        <tr><td>${escapeHtml(s.name)}</td><td>${escapeHtml(s.contact || '—')}</td>
        <td>${escapeHtml(s.phone || '—')}</td><td>${escapeHtml(s.email || '—')}</td>
        <td>${money(s.balance ?? 0)}</td>
        <td>${actionBtns(`data-edit-supplier="${s.id}"`, `data-del-supplier="${s.id}"`,
            `<button type="button" class="btn-icon" title="${tr('details')}" data-details-supplier="${s.id}"><span class="material-symbols-rounded">info</span></button>`)}</td></tr>`).join('')
        : `<tr><td colspan="6" class="empty-state">${tr('empty_list')}</td></tr>`;
    document.querySelectorAll('[data-edit-supplier]').forEach(btn => btn.onclick = () => openSupplierModal(Number(btn.dataset.editSupplier)));
    document.querySelectorAll('[data-del-supplier]').forEach(btn => btn.onclick = () => deleteSupplier(Number(btn.dataset.delSupplier)));
    document.querySelectorAll('[data-details-supplier]').forEach(btn => btn.onclick = () => openSupplierDetails(Number(btn.dataset.detailsSupplier)));
}

function renderExpenses() {
    document.getElementById('exp-body').innerHTML = expenses.length ? expenses.map(e => `
        <tr><td>${formatDate(e.expenseDate)}</td><td>${escapeHtml(e.category)}</td><td>${money(e.amount)}</td>
        <td>${escapeHtml(e.description || '—')}</td>
        <td><span class="badge ${e.isPaid ? 'in-stock' : 'low-stock'}">${e.isPaid ? tr('paid') : tr('unpaid')}</span></td>
        <td><div class="table-actions">
            ${e.isPaid ? '' : `<button type="button" class="btn btn-secondary btn-sm" data-pay="${e.expenseId}">${tr('mark_paid')}</button>`}
            <button type="button" class="btn-icon btn-icon-danger" title="${tr('delete')}" data-del-expense="${e.expenseId}"><span class="material-symbols-rounded">delete</span></button>
        </div></td></tr>`).join('')
        : `<tr><td colspan="6" class="empty-state">${tr('empty_list')}</td></tr>`;
    document.querySelectorAll('[data-pay]').forEach(btn => {
        btn.onclick = async () => {
            try { await api('/api/expenses/' + btn.dataset.pay + '/pay', { method: 'POST' }); await loadData(); }
            catch (e) { toast(e.message, 'error'); }
        };
    });
    document.querySelectorAll('[data-del-expense]').forEach(btn => btn.onclick = () => deleteExpense(Number(btn.dataset.delExpense)));
}

function renderCurrencies() {
    document.getElementById('cur-body').innerHTML = currencies.length ? currencies.map(c => `
        <tr><td>${escapeHtml(c.code)}</td><td>${escapeHtml(c.name)}</td>
        <td>${escapeHtml(c.symbol)}</td><td>${Number(c.rate).toFixed(4)}</td>
        <td>${c.code === 'USD' ? '—' : `<button type="button" class="btn-icon btn-icon-danger" title="${tr('delete')}" data-del-cur="${escapeHtml(c.code)}"><span class="material-symbols-rounded">delete</span></button>`}</td></tr>`).join('')
        : `<tr><td colspan="5" class="empty-state">${tr('empty_list')}</td></tr>`;
    document.querySelectorAll('[data-del-cur]').forEach(btn => btn.onclick = () => deleteCurrency(btn.dataset.delCur));
}

function filteredBarcodeItems() {
    const q = (document.getElementById('bar-search')?.value || '').toLowerCase();
    return barcodeItems.filter(b => !q || [b.name, b.sku, b.barcode].some(x => (x || '').toLowerCase().includes(q)));
}

function barcodeItemKey(b) {
    return String(b.id ?? b.sku ?? b.barcode ?? b.name);
}

function barcodeItemCode(b) {
    return String(b.barcode || b.sku || b.id || '').trim();
}

function drawJsBarcode(svg, code, opts = {}) {
    if (!window.JsBarcode || !svg || !code) return false;
    try {
        JsBarcode(svg, code, {
            format: 'CODE128',
            width: opts.width ?? 1.6,
            height: opts.height ?? 48,
            displayValue: opts.displayValue !== false,
            fontSize: opts.fontSize ?? 12,
            margin: opts.margin ?? 4,
            background: opts.background ?? '#ffffff',
            lineColor: '#000000',
            textMargin: 4,
            ...opts
        });
        return true;
    } catch (e) {
        console.warn('JsBarcode failed for', code, e);
        return false;
    }
}

function renderBarcodes() {
    const list = filteredBarcodeItems();
    const grid = document.getElementById('barcodes-grid');
    if (!grid) return;
    const visibleKeys = list.slice(0, 120).map(barcodeItemKey);
    // Drop selections that are no longer in the filtered set
    [...barcodeSelected].forEach(k => {
        if (!list.some(b => barcodeItemKey(b) === k)) barcodeSelected.delete(k);
    });
    grid.innerHTML = list.length ? list.slice(0, 120).map(b => {
        const key = barcodeItemKey(b);
        const code = barcodeItemCode(b) || '—';
        const checked = barcodeSelected.has(key) ? 'checked' : '';
        return `<label class="barcode-card${checked ? ' selected' : ''}">
            <input type="checkbox" class="bc-check" data-bar-id="${escapeHtml(key)}" ${checked}>
            <div class="bc-wrap"><svg class="bc-svg" data-code="${escapeHtml(code)}"></svg></div>
            <h3 title="${escapeHtml(b.name || '')}">${escapeHtml(b.name || '—')}</h3>
            <p>${escapeHtml(code)}</p>
            <div class="price">${money(b.price)}</div>
        </label>`;
    }).join('') : `<div class="empty-state">${tr('empty_list')}</div>`;

    grid.querySelectorAll('.bc-svg').forEach(svg => {
        const code = svg.dataset.code || '';
        if (!code || code === '—') return;
        drawJsBarcode(svg, code, { width: 1.5, height: 42, fontSize: 11, margin: 2, background: 'transparent' });
        svg.removeAttribute('width');
        svg.removeAttribute('height');
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        svg.style.width = '100%';
        svg.style.height = '100%';
    });

    grid.querySelectorAll('.bc-check').forEach(cb => {
        cb.addEventListener('change', () => {
            const id = cb.dataset.barId;
            if (cb.checked) barcodeSelected.add(id);
            else barcodeSelected.delete(id);
            cb.closest('.barcode-card')?.classList.toggle('selected', cb.checked);
            syncBarcodeSelectAll();
        });
    });

    const selAll = document.getElementById('bar-select-all');
    if (selAll) {
        const allVisibleSelected = visibleKeys.length > 0 && visibleKeys.every(k => barcodeSelected.has(k));
        selAll.checked = allVisibleSelected;
        selAll.indeterminate = !allVisibleSelected && visibleKeys.some(k => barcodeSelected.has(k));
    }
}

function syncBarcodeSelectAll() {
    const list = filteredBarcodeItems().slice(0, 120);
    const keys = list.map(barcodeItemKey);
    const selAll = document.getElementById('bar-select-all');
    if (!selAll) return;
    const allOn = keys.length > 0 && keys.every(k => barcodeSelected.has(k));
    selAll.checked = allOn;
    selAll.indeterminate = !allOn && keys.some(k => barcodeSelected.has(k));
}

function estimateBarcodeSheets(labelCount, landscape) {
    const perPage = landscape ? 8 : 9;
    return Math.max(1, Math.ceil(Math.max(1, labelCount) / perPage));
}

function updateBarcodePrintSheetMeta(count) {
    const el = document.getElementById('bpd-sheet-count');
    if (!el) return;
    const landscape = document.querySelector('input[name="bpd-layout"]:checked')?.value === 'landscape';
    const sheets = estimateBarcodeSheets(count, landscape);
    el.textContent = sheets === 1
        ? tr('print_sheet_one')
        : tr('print_sheet_many').replace('{0}', String(sheets));
}

function applyBarcodePrintLayoutPreview() {
    const paper = document.getElementById('bpd-paper');
    if (!paper) return;
    const landscape = document.querySelector('input[name="bpd-layout"]:checked')?.value === 'landscape';
    paper.classList.toggle('is-landscape', landscape);
    const selected = barcodeItems.filter(b => barcodeSelected.has(barcodeItemKey(b)));
    updateBarcodePrintSheetMeta(selected.length);
}

function fillPrinterSelect(selId, printers, defaultPrinter) {
    const sel = document.getElementById(selId);
    if (!sel) return;
    const list = Array.isArray(printers) ? printers.filter(Boolean) : [];
    if (!list.length) {
        sel.innerHTML = `<option value="">${escapeHtml(tr('print_system_printer'))}</option>`;
        return;
    }
    const preferred = defaultPrinter && list.includes(defaultPrinter) ? defaultPrinter : list[0];
    sel.innerHTML = list.map(p =>
        `<option value="${escapeHtml(p)}"${p === preferred ? ' selected' : ''}>${escapeHtml(p)}</option>`
    ).join('');
}

function fillBarcodePrinterSelect(printers, defaultPrinter) {
    fillPrinterSelect('bpd-printer', printers, defaultPrinter);
    fillPrinterSelect('ppd-printer', printers, defaultPrinter);
}

function requestHostPrinters() {
    try {
        if (window.chrome?.webview?.postMessage)
            window.chrome.webview.postMessage(JSON.stringify({ action: 'listPrinters' }));
        else
            fillBarcodePrinterSelect([], '');
    } catch {
        fillBarcodePrinterSelect([], '');
    }
}

function openBarcodePrintPreview() {
    const selected = barcodeItems.filter(b => barcodeSelected.has(barcodeItemKey(b)));
    if (!selected.length) {
        toast(tr('select_barcodes_first'), 'error');
        return;
    }
    if (!window.JsBarcode) {
        toast('Barcode library not loaded', 'error');
        return;
    }
    const sheet = document.getElementById('barcode-print-sheet');
    if (!sheet) return;
    sheet.innerHTML = selected.map(b => {
        const code = barcodeItemCode(b);
        return `<div class="bc-label">
            <div class="bc-label-name">${escapeHtml(b.name || '')}</div>
            <svg class="bc-print-svg" data-code="${escapeHtml(code)}"></svg>
            <div class="bc-label-code">${escapeHtml(code)}</div>
            <div class="bc-label-price">${money(b.price)}</div>
        </div>`;
    }).join('');

    const title = document.getElementById('barcode-preview-title');
    if (title) title.textContent = tr('print');
    updateBarcodePrintSheetMeta(selected.length);
    applyBarcodePrintLayoutPreview();
    requestHostPrinters();
    openModal('barcode-preview-modal');

    setTimeout(() => {
        sheet.querySelectorAll('.bc-print-svg').forEach(svg => {
            const code = svg.dataset.code || '';
            if (!code) {
                const miss = document.createElement('div');
                miss.className = 'bc-label-missing';
                miss.textContent = '—';
                svg.replaceWith(miss);
                return;
            }
            const ok = drawJsBarcode(svg, code, {
                width: 2,
                height: 48,
                fontSize: 12,
                margin: 4,
                displayValue: false,
                background: '#ffffff'
            });
            if (!ok) {
                const miss = document.createElement('div');
                miss.className = 'bc-label-missing';
                miss.textContent = code;
                svg.replaceWith(miss);
            }
        });
    }, 40);
}

function getBarcodePrintOptions() {
    const landscape = document.querySelector('input[name="bpd-layout"]:checked')?.value === 'landscape';
    const pagesMode = document.querySelector('input[name="bpd-pages"]:checked')?.value || 'all';
    const pageRange = pagesMode === 'custom'
        ? (document.getElementById('bpd-page-range')?.value || '').trim()
        : 'all';
    const copies = Math.max(1, Math.min(99, parseInt(document.getElementById('bpd-copies')?.value, 10) || 1));
    const color = (document.getElementById('bpd-color')?.value || 'color') !== 'bw';
    const printerName = document.getElementById('bpd-printer')?.value || '';
    return { landscape, pageRange, copies, color, printerName };
}

function printBarcodePreview() {
    const selected = barcodeItems.filter(b => barcodeSelected.has(barcodeItemKey(b)));
    if (!selected.length) {
        toast(tr('select_barcodes_first'), 'error');
        return;
    }

    const opts = getBarcodePrintOptions();
    const items = selected.map(b => ({
        name: b.name || '',
        sku: barcodeItemCode(b),
        barcode: barcodeItemCode(b),
        price: Number(b.price) || 0,
        quantity: 1
    }));

    // Desktop host: print via WinForms (app-styled dialog already shown)
    if (window.chrome?.webview?.postMessage) {
        try {
            window.chrome.webview.postMessage(JSON.stringify({
                action: 'printBarcodes',
                items,
                printerName: opts.printerName,
                copies: opts.copies,
                landscape: opts.landscape,
                color: opts.color,
                pageRange: opts.pageRange || 'all'
            }));
            closeModal('barcode-preview-modal');
            return;
        } catch (e) {
            toast(tr('print_failed'), 'error');
            return;
        }
    }

    // Browser fallback: system print dialog
    let sheet = document.getElementById('barcode-print-sheet');
    if (!sheet || !sheet.children.length) {
        openBarcodePrintPreview();
        sheet = document.getElementById('barcode-print-sheet');
        if (!sheet?.children.length) return;
    }

    let root = document.getElementById('barcode-print-root');
    if (!root) {
        root = document.createElement('div');
        root.id = 'barcode-print-root';
        root.setAttribute('aria-hidden', 'true');
        document.body.appendChild(root);
    }
    root.innerHTML = `<div class="barcode-print-sheet barcode-print-sheet--print">${sheet.innerHTML}</div>`;

    root.querySelectorAll('.bc-print-svg').forEach(svg => {
        const code = svg.getAttribute('data-code') || svg.dataset.code || '';
        if (!code) return;
        drawJsBarcode(svg, code, {
            width: 2.4,
            height: 64,
            fontSize: 14,
            margin: 4,
            displayValue: false,
            background: '#ffffff'
        });
    });

    document.body.classList.add('printing-barcodes');
    const cleanup = () => {
        document.body.classList.remove('printing-barcodes');
        root.innerHTML = '';
        window.removeEventListener('afterprint', cleanup);
    };
    window.addEventListener('afterprint', cleanup);
    setTimeout(() => { if (!window.matchMedia('print').matches) cleanup(); }, 60000);
    setTimeout(() => { window.print(); }, 120);
}

function renderUsers() {
    document.getElementById('users-body').innerHTML = users.length ? users.map(u => `
        <tr><td>${escapeHtml(u.username)}</td><td>${escapeHtml(u.fullName || '—')}</td><td>${escapeHtml(formatRole(u.role))}</td>
        <td>${u.id != null ? actionBtns(`data-edit-user="${u.id}"`, `data-del-user="${u.id}"`) : '—'}</td></tr>`).join('')
        : `<tr><td colspan="4" class="empty-state">${tr('empty_list')}</td></tr>`;
    document.querySelectorAll('[data-edit-user]').forEach(btn => btn.onclick = () => openUserModal(Number(btn.dataset.editUser)));
    document.querySelectorAll('[data-del-user]').forEach(btn => btn.onclick = () => deleteUser(Number(btn.dataset.delUser)));
}

function renderLicense() {
    const el = document.getElementById('license-info');
    const lic = window._license;
    if (!lic || (lic.isValid === false && !lic.licenseType)) {
        el.innerHTML = `<div class="empty-state" style="padding:1rem 0;">${tr('lic_invalid')}</div>`;
        return;
    }
    el.innerHTML = `<div style="text-align:start; line-height:1.8;">
        <div><strong>${tr('lic_type')}:</strong> ${escapeHtml(lic.licenseType)}${lic.isTrial ? ' (' + tr('lic_trial') + ')' : ''}</div>
        <div><strong>${tr('lic_customer')}:</strong> ${escapeHtml(lic.customerName || '—')}</div>
        <div><strong>${tr('lic_expires')}:</strong> ${formatDate(lic.expirationDate)}</div>
        <div><strong>${tr('lic_days')}:</strong> ${lic.daysRemaining ?? '—'}</div>
        <div><strong>${tr('lic_machine')}:</strong> ${escapeHtml(lic.machineName || '—')}</div>
        <div><strong>${lic.isValid ? tr('lic_valid') : tr('lic_invalid')}</strong> ${lic.keyMasked ? '· ' + escapeHtml(lic.keyMasked) : ''}</div>
    </div>`;
}

async function openLicenseModal() {
    const err = document.getElementById('license-activate-error');
    if (err) { err.textContent = ''; err.classList.remove('visible'); }
    const key = document.getElementById('lic-key');
    if (key) key.value = '';
    let hw = window._license?.hardwareId;
    if (!hw) {
        try {
            const r = await api('/api/license');
            hw = r.hardwareId;
            window._license = { ...(window._license || {}), ...r };
        } catch { hw = '—'; }
    }
    const hwid = document.getElementById('lic-hwid');
    if (hwid) hwid.textContent = hw || '—';
    openModal('license-modal');
}

function updateBadges() {
    const low = products.filter(p => p.stock <= (p.minStock || 0)).length;
    const badge = document.getElementById('badge-inventory');
    if (low > 0) { badge.style.display = ''; badge.textContent = low; }
    else badge.style.display = 'none';
}

function updateReturnRefundTotal(prefix) {
    const root = prefix === 'pos' ? document.getElementById('pos-return-items') : document.getElementById('return-items');
    const totalEl = document.getElementById(prefix === 'pos' ? 'pos-return-refund-total' : 'return-refund-total');
    const cache = prefix === 'pos' ? posReturnItemsCache : returnItemsCache;
    const qtySel = prefix === 'pos' ? '.pos-ret-qty' : '.ret-qty';
    if (!root || !totalEl) return;
    let total = 0;
    root.querySelectorAll(qtySel).forEach(inp => {
        const i = Number(inp.dataset.i);
        const qty = Math.max(0, Number(inp.value) || 0);
        const it = cache[i];
        if (!it) return;
        total += (Number(it.price) || 0) * qty;
        const lineEl = inp.closest('.return-line')?.querySelector('.ret-line-total');
        if (lineEl) lineEl.textContent = money((Number(it.price) || 0) * qty);
    });
    totalEl.textContent = money(total);
}

function renderReturnableItems(containerId, items, qtyClass = 'ret-qty') {
    const el = document.getElementById(containerId);
    if (!el) return;
    if (!items?.length) {
        el.innerHTML = `<div class="empty-state">${tr('empty_list')}</div>`;
        return;
    }
    el.innerHTML = items.map((it, i) => {
        const rem = Number(it.remainingQty ?? it.qty) || 0;
        const sold = Number(it.soldQty ?? it.qty) || 0;
        const price = Number(it.price) || 0;
        const disabled = rem <= 0 ? 'disabled' : '';
        return `<div class="return-line ${rem <= 0 ? 'is-done' : ''}">
            <div class="return-line-main">
                <strong>${escapeHtml(it.name)}</strong>
                <span class="return-line-price">${tr('unit_price')}: <b>${money(price)}</b></span>
            </div>
            <div class="return-line-meta">
                <span>${tr('sold_qty')}: ${sold}</span>
                <span>${tr('can_return')}: ${rem}</span>
            </div>
            <div class="return-line-qty">
                <label>${tr('return_qty')}</label>
                <input type="number" class="form-control ${qtyClass}" data-i="${i}" min="0" max="${rem}" value="${rem > 0 ? rem : 0}" ${disabled}>
                <span class="ret-line-total">${money(price * (rem > 0 ? rem : 0))}</span>
            </div>
        </div>`;
    }).join('');
    el.querySelectorAll(`.${qtyClass}`).forEach(inp => {
        inp.oninput = () => {
            const max = Number(inp.max) || 0;
            let v = Number(inp.value);
            if (v > max) inp.value = max;
            if (v < 0) inp.value = 0;
            updateReturnRefundTotal(qtyClass.startsWith('pos') ? 'pos' : 'sales');
        };
    });
}

function setPosReturnStep(step) {
    ['customer', 'sales', 'items'].forEach(s => {
        const el = document.getElementById(`pos-return-step-${s}`);
        if (el) el.hidden = s !== step;
    });
}

function openPosReturnModal() {
    posReturnOrderId = null;
    posReturnItemsCache = [];
    const sel = document.getElementById('pos-return-customer');
    if (sel) {
        const cur = document.getElementById('pos-customer')?.value || '';
        sel.innerHTML = `<option value="">${escapeHtml(tr('walk_in_customer'))}</option>` +
            customers.map(c => `<option value="${c.id}">${escapeHtml(c.name)}</option>`).join('');
        if (cur && [...sel.options].some(o => o.value === cur)) sel.value = cur;
    }
    const orderInp = document.getElementById('pos-return-order-id');
    if (orderInp) orderInp.value = '';
    const reason = document.getElementById('pos-return-reason');
    if (reason) reason.value = '';
    setPosReturnStep('customer');
    openModal('pos-return-modal');
}

async function loadPosReturnSales() {
    const customerId = Number(document.getElementById('pos-return-customer')?.value || 0);
    if (!customerId) return toast(tr('select_customer_or_order'), 'error');
    try {
        const list = await api('/api/customers/' + customerId + '/sales');
        const box = document.getElementById('pos-return-sales-list');
        if (!box) return;
        if (!list?.length) {
            box.innerHTML = `<div class="empty-state">${tr('no_sales_for_customer')}</div>`;
        } else {
            box.innerHTML = list.map(o => {
                const paid = String(o.paymentStatus || 'Paid').toLowerCase() === 'paid';
                return `<button type="button" class="pos-return-sale-card" data-order="${o.orderId}">
                    <div class="pos-return-sale-top">
                        <strong>#${o.orderId}</strong>
                        <span class="badge ${paid ? 'in-stock' : 'low-stock'}">${paid ? tr('paid') : tr('unpaid')}</span>
                    </div>
                    <div class="pos-return-sale-sub">${formatDate(o.date)}</div>
                    <div class="pos-return-sale-sub">${o.itemCount || 0} ${tr('col_items').toLowerCase()} · ${money(o.total)}</div>
                </button>`;
            }).join('');
            box.querySelectorAll('[data-order]').forEach(btn => {
                btn.onclick = () => openPosReturnOrder(Number(btn.dataset.order));
            });
        }
        setPosReturnStep('sales');
    } catch (e) { toast(e.message, 'error'); }
}

async function openPosReturnOrder(orderId) {
    try {
        const data = await api('/api/orders/' + orderId + '/returnable');
        posReturnOrderId = data.orderId;
        posReturnItemsCache = data.items || [];
        const meta = document.getElementById('pos-return-order-meta');
        if (meta) {
            meta.hidden = false;
            meta.innerHTML = `<strong>#${data.orderId}</strong> · ${escapeHtml(data.customerName || '')} · ${formatDate(data.date)} · ${money(data.total)}`;
        }
        renderReturnableItems('pos-return-items', posReturnItemsCache, 'pos-ret-qty');
        // Bind with correct prefix after render - fix the oninput to use pos
        document.querySelectorAll('#pos-return-items .pos-ret-qty').forEach(inp => {
            inp.oninput = () => {
                const max = Number(inp.max) || 0;
                let v = Number(inp.value);
                if (v > max) inp.value = max;
                if (v < 0) inp.value = 0;
                updateReturnRefundTotal('pos');
            };
        });
        updateReturnRefundTotal('pos');
        if (!posReturnItemsCache.some(x => (x.remainingQty || 0) > 0)) {
            toast(tr('already_fully_returned'), 'error');
        }
        setPosReturnStep('items');
    } catch (e) { toast(e.message, 'error'); }
}

async function submitPosReturn() {
    const items = [];
    let count = 0;
    let refund = 0;
    document.querySelectorAll('#pos-return-items .pos-ret-qty').forEach(inp => {
        const i = Number(inp.dataset.i);
        const qty = Number(inp.value);
        const it = posReturnItemsCache[i];
        if (qty > 0 && it) {
            const amt = (Number(it.price) || 0) * qty;
            items.push({ partId: it.partId, qty, refundAmount: amt });
            count += qty;
            refund += amt;
        }
    });
    if (!items.length) return toast(tr('empty_cart_hint'), 'error');
    try {
        await api('/api/return-item', {
            method: 'POST',
            body: JSON.stringify({
                orderId: posReturnOrderId,
                reason: document.getElementById('pos-return-reason')?.value.trim() || 'POS return',
                items
            })
        });
        closeModal('pos-return-modal');
        toast(tr('return_ok_detail').replace('{0}', String(count)).replace('{1}', money(refund)), 'success');
        await loadData();
        renderPosStats();
    } catch (e) { toast(e.message, 'error'); }
}

async function openReturn(orderId) {
    returnOrderId = orderId;
    try {
        const data = await api(`/api/orders/${orderId}/returnable`);
        returnItemsCache = data.items || [];
        const meta = document.getElementById('return-order-meta');
        if (meta) {
            meta.hidden = false;
            meta.innerHTML = `<strong>#${data.orderId}</strong> · ${escapeHtml(data.customerName || '')} · ${formatDate(data.date)} · ${money(data.total)}`;
        }
        renderReturnableItems('return-items', returnItemsCache, 'ret-qty');
        document.querySelectorAll('#return-items .ret-qty').forEach(inp => {
            inp.oninput = () => {
                const max = Number(inp.max) || 0;
                let v = Number(inp.value);
                if (v > max) inp.value = max;
                if (v < 0) inp.value = 0;
                updateReturnRefundTotal('sales');
            };
        });
        updateReturnRefundTotal('sales');
        document.getElementById('return-reason').value = '';
        openModal('return-modal');
    } catch (e) { toast(e.message, 'error'); }
}

function openModal(id) { document.getElementById(id).classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }

function confirmDialog(message, options = {}) {
    const {
        title = tr('confirm_title'),
        confirmText = tr('delete'),
        cancelText = tr('cancel'),
        danger = true,
        hideCancel = false,
    } = options;
    const overlay = document.getElementById('confirm-modal');
    const titleEl = document.getElementById('confirm-title');
    const messageEl = document.getElementById('confirm-message');
    const okBtn = document.getElementById('confirm-ok');
    const cancelBtn = document.getElementById('confirm-cancel');
    if (!overlay || !titleEl || !messageEl || !okBtn || !cancelBtn) return Promise.resolve(false);

    titleEl.textContent = title;
    messageEl.textContent = message;
    okBtn.textContent = confirmText;
    cancelBtn.textContent = cancelText;
    okBtn.className = danger ? 'btn btn-danger' : 'btn btn-primary';
    cancelBtn.hidden = !!hideCancel;

    return new Promise(resolve => {
        const finish = (result) => {
            okBtn.onclick = null;
            cancelBtn.onclick = null;
            overlay.onclick = null;
            document.removeEventListener('keydown', onKey);
            cancelBtn.hidden = false;
            closeModal('confirm-modal');
            resolve(result);
        };
        const onKey = (e) => {
            if (e.key === 'Escape') finish(false);
            if (e.key === 'Enter' && hideCancel) { e.preventDefault(); finish(true); }
        };
        okBtn.onclick = () => finish(true);
        cancelBtn.onclick = () => finish(false);
        overlay.onclick = (e) => { if (e.target === overlay) finish(false); };
        document.addEventListener('keydown', onKey);
        openModal('confirm-modal');
        (hideCancel ? okBtn : cancelBtn).focus();
    });
}

function isPosProductAvailable(p) {
    if (!p) return false;
    if (p.isService || p.itemType === 'Service' || p.isStockTracked === false) return true;
    return (Number(p.stock) || 0) > 0;
}

async function showOutOfStockPopup(productName) {
    await confirmDialog(
        tr('pos_out_of_stock_msg').replace('{0}', productName || ''),
        {
            title: tr('pos_out_of_stock_title'),
            confirmText: tr('ok'),
            danger: false,
            hideCancel: true,
        }
    );
}

function fillCategorySelect(sel) {
    sel.innerHTML = (categories.length ? categories : ['General']).map(c => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join('');
}

function fillSupplierSelect(sel) {
    sel.innerHTML = '<option value="">—</option>' + (suppliers || []).map(s =>
        `<option value="${s.id}">${escapeHtml(s.name)}</option>`).join('');
}

function getProductTypeValue() {
    return document.querySelector('input[name="p-type"]:checked')?.value || 'Product';
}

function setProductImagePreview(path) {
    const preview = document.getElementById('p-image-preview');
    const placeholder = document.getElementById('p-image-placeholder');
    const hidden = document.getElementById('p-image');
    const hasImage = !!(path && String(path).trim());
    if (hidden) hidden.value = hasImage ? path : '';
    if (hasImage) {
        const url = path.startsWith('/') || path.startsWith('http') ? path : '/' + path.replace(/^\/+/, '');
        if (preview) { preview.src = url; preview.hidden = false; }
        if (placeholder) placeholder.hidden = true;
    } else {
        if (preview) { preview.src = ''; preview.hidden = true; }
        if (placeholder) placeholder.hidden = false;
        const file = document.getElementById('p-image-file');
        if (file) file.value = '';
    }
    updateProductImageActions(hasImage);
}

function updateProductImageActions(hasImage) {
    const upload = document.getElementById('btn-p-upload');
    const change = document.getElementById('btn-p-change-image');
    const clear = document.getElementById('btn-p-clear-image');
    const remove = document.getElementById('btn-p-remove-image');
    if (upload) upload.hidden = !!hasImage;
    if (change) change.hidden = !hasImage;
    if (clear) clear.hidden = !hasImage;
    if (remove) remove.hidden = !hasImage;
}

function clearProductImage() {
    setProductImagePreview('');
}

function calculateProductMargins() {
    const cost = Number(document.getElementById('p-cost')?.value) || 0;
    [1, 2, 3, 4].forEach(i => {
        const priceEl = document.getElementById(i === 1 ? 'p-price' : 'p-price' + i);
        const grossEl = document.getElementById('p-gross' + i);
        const profitEl = document.getElementById('p-profit' + i);
        const price = Number(priceEl?.value) || 0;
        const profit = price - cost;
        const gross = price > 0 ? (profit / price) * 100 : 0;
        if (profitEl) profitEl.value = profit.toFixed(2);
        if (grossEl) grossEl.value = gross.toFixed(1) + '%';
    });
}

function getSellByValue() {
    return document.querySelector('input[name="p-sell-by"]:checked')?.value || 'piece';
}

const DEFAULT_PIECE_UOMS = ['pcs', 'box', 'pack', 'meter', 'liter', 'g'];
let cachedUoms = [...DEFAULT_PIECE_UOMS];

async function loadUoms() {
    try {
        const list = await api('/api/uoms');
        if (Array.isArray(list) && list.length) {
            cachedUoms = list.map(x => String(x || '').trim()).filter(Boolean);
        }
    } catch {
        // Keep cached/default list if API unavailable
    }
    return cachedUoms;
}

function getPieceUomOptions() {
    const set = new Set(DEFAULT_PIECE_UOMS.map(u => u.toLowerCase()));
    const extras = [];
    for (const u of cachedUoms) {
        const key = String(u || '').trim();
        if (!key || key.toLowerCase() === 'kg') continue;
        if (set.has(key.toLowerCase())) continue;
        set.add(key.toLowerCase());
        extras.push(key);
    }
    // Also include units already used on loaded products
    for (const p of (products || [])) {
        const key = String(p?.uom || '').trim();
        if (!key || key.toLowerCase() === 'kg') continue;
        if (set.has(key.toLowerCase())) continue;
        set.add(key.toLowerCase());
        extras.push(key);
    }
    extras.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
    return [...DEFAULT_PIECE_UOMS, ...extras].map(v => ({ value: v, label: v }));
}

function setProductUomOptions(byWeight, preferred) {
    const uom = document.getElementById('p-uom');
    const addBtn = document.getElementById('btn-p-add-uom');
    if (!uom) return;
    const prev = preferred != null ? preferred : uom.value;
    const isService = getProductTypeValue() === 'Service';
    if (byWeight) {
        uom.innerHTML = '<option value="kg">kg</option>';
        uom.value = 'kg';
        uom.disabled = true;
        if (addBtn) addBtn.hidden = true;
    } else {
        let opts = getPieceUomOptions();
        const prevKey = String(prev || '').trim();
        if (prevKey && !opts.some(o => o.value.toLowerCase() === prevKey.toLowerCase())) {
            opts = [...opts, { value: prevKey, label: prevKey }];
        }
        uom.innerHTML = opts.map(o => `<option value="${escapeHtml(o.value)}">${escapeHtml(o.label)}</option>`).join('');
        uom.disabled = false;
        if (addBtn) addBtn.hidden = isService;
        const match = opts.find(o => o.value.toLowerCase() === prevKey.toLowerCase());
        uom.value = match ? match.value : 'pcs';
    }
}

function promptDialog(options = {}) {
    const {
        title = tr('add_uom'),
        message = tr('add_uom_hint'),
        confirmText = tr('add'),
        cancelText = tr('cancel'),
        placeholder = '',
        initialValue = '',
    } = options;
    const overlay = document.getElementById('prompt-modal');
    const titleEl = document.getElementById('prompt-title');
    const messageEl = document.getElementById('prompt-message');
    const inputEl = document.getElementById('prompt-input');
    const okBtn = document.getElementById('prompt-ok');
    const cancelBtn = document.getElementById('prompt-cancel');
    if (!overlay || !titleEl || !messageEl || !inputEl || !okBtn || !cancelBtn) {
        return Promise.resolve(window.prompt(message, initialValue));
    }

    titleEl.textContent = title;
    messageEl.textContent = message;
    okBtn.textContent = confirmText;
    cancelBtn.textContent = cancelText;
    inputEl.placeholder = placeholder;
    inputEl.value = initialValue || '';

    return new Promise(resolve => {
        const finish = (result) => {
            okBtn.onclick = null;
            cancelBtn.onclick = null;
            overlay.onclick = null;
            inputEl.onkeydown = null;
            document.removeEventListener('keydown', onKey);
            closeModal('prompt-modal');
            resolve(result);
        };
        const onKey = (e) => {
            if (e.key === 'Escape') finish(null);
        };
        okBtn.onclick = () => finish(inputEl.value.trim());
        cancelBtn.onclick = () => finish(null);
        overlay.onclick = (e) => { if (e.target === overlay) finish(null); };
        inputEl.onkeydown = (e) => {
            if (e.key === 'Enter') { e.preventDefault(); finish(inputEl.value.trim()); }
        };
        document.addEventListener('keydown', onKey);
        openModal('prompt-modal');
        setTimeout(() => { inputEl.focus(); inputEl.select(); }, 30);
    });
}

async function addCustomUom() {
    if (getSellByValue() === 'weight' || getProductTypeValue() === 'Service') return;
    const name = await promptDialog({
        title: tr('add_uom'),
        message: tr('add_uom_hint'),
        confirmText: tr('add'),
        placeholder: 'carton',
    });
    if (!name) return;
    const cleaned = name.trim().replace(/\s+/g, ' ');
    if (!cleaned) return;

    const existing = getPieceUomOptions().map(o => o.value.toLowerCase());
    if (existing.includes(cleaned.toLowerCase()) || cleaned.toLowerCase() === 'kg') {
        toast(tr('uom_exists'), 'error');
        setProductUomOptions(false, cleaned);
        return;
    }

    try {
        await api('/api/uoms', { method: 'POST', body: JSON.stringify({ name: cleaned }) });
        if (!cachedUoms.some(u => String(u).toLowerCase() === cleaned.toLowerCase())) {
            cachedUoms = [...cachedUoms, cleaned];
        }
        setProductUomOptions(false, cleaned);
        updatePieceStockLabels();
        toast(tr('uom_added'), 'success');
    } catch (e) {
        // Still add locally so the user can save the product
        if (!cachedUoms.some(u => String(u).toLowerCase() === cleaned.toLowerCase())) {
            cachedUoms = [...cachedUoms, cleaned];
        }
        setProductUomOptions(false, cleaned);
        updatePieceStockLabels();
        toast(e.message || tr('uom_added'), e.message ? 'error' : 'success');
    }
}

function updatePieceStockLabels() {
    const uomVal = document.getElementById('p-uom')?.value || 'pcs';
    const stockLabel = document.getElementById('p-stock-label');
    const minLabel = document.getElementById('p-min-stock-label');
    const stockHint = document.getElementById('p-stock-hint');
    if (stockLabel) stockLabel.textContent = `${tr('col_stock')} (${uomVal})`;
    if (minLabel) minLabel.textContent = `${tr('low_level')} (${uomVal})`;
    if (stockHint) {
        stockHint.hidden = false;
        stockHint.textContent = tr('stock_units_hint');
    }
}

function updateSellByWeightUI(preferredUom) {
    const isService = getProductTypeValue() === 'Service';
    const byWeight = !isService && getSellByValue() === 'weight';
    const sellFs = document.getElementById('p-sell-by-fieldset');
    if (sellFs) sellFs.hidden = isService;
    const sellHint = document.getElementById('p-sell-by-hint');
    if (sellHint) {
        sellHint.hidden = byWeight || isService;
        sellHint.textContent = tr('sell_by_hint_piece');
    }
    const guide = document.getElementById('p-weight-guide');
    if (guide) guide.hidden = !byWeight;
    const priceHint = document.getElementById('p-price-hint');
    if (priceHint) priceHint.hidden = !byWeight;
    const priceCol = document.getElementById('p-price-col-label');
    if (priceCol) priceCol.textContent = byWeight ? tr('price_per_kg') : tr('col_price');
    const pricesLegend = document.getElementById('p-prices-legend');
    if (pricesLegend) pricesLegend.textContent = byWeight ? tr('price_per_kg') : tr('prices');

    const uomHint = document.getElementById('p-uom-hint');
    setProductUomOptions(byWeight, preferredUom);
    if (uomHint) {
        uomHint.hidden = isService;
        uomHint.textContent = byWeight ? tr('uom_weight_hint') : tr('uom_piece_hint');
    }

    const stockLabel = document.getElementById('p-stock-label');
    const minLabel = document.getElementById('p-min-stock-label');
    const stockHint = document.getElementById('p-stock-hint');
    if (byWeight) {
        if (stockLabel) stockLabel.textContent = tr('stock_grams');
        if (minLabel) minLabel.textContent = tr('low_level_grams');
        if (stockHint) {
            stockHint.hidden = false;
            stockHint.textContent = tr('stock_grams_hint');
        }
    } else if (!isService) {
        updatePieceStockLabels();
    } else {
        if (stockLabel) stockLabel.textContent = tr('col_stock');
        if (minLabel) minLabel.textContent = tr('low_level');
        if (stockHint) stockHint.hidden = true;
    }
}

function onProductTypeChange(preferredUom) {
    const isService = getProductTypeValue() === 'Service';
    const track = document.getElementById('p-track-stock');
    const stock = document.getElementById('p-stock');
    const minStock = document.getElementById('p-min-stock');
    if (isService) {
        if (track) { track.checked = false; track.disabled = true; }
        const piece = document.querySelector('input[name="p-sell-by"][value="piece"]');
        if (piece) piece.checked = true;
    } else {
        if (track) track.disabled = false;
    }
    const tracked = track?.checked && !isService;
    if (stock) stock.disabled = !tracked;
    if (minStock) minStock.disabled = !tracked;
    updateSellByWeightUI(preferredUom);
}

function generateAutoSku() {
    let cat = document.getElementById('p-category')?.value?.trim() || 'GEN';
    let name = document.getElementById('p-name')?.value?.trim() || 'PRD';
    const catPrefix = cat.length >= 3 ? cat.substring(0, 3).toUpperCase() : cat.toUpperCase().padEnd(3, 'X');
    const namePrefix = name.length >= 3 ? name.substring(0, 3).toUpperCase() : name.toUpperCase().padEnd(3, 'X');
    const now = new Date();
    const ts = String(now.getFullYear()).slice(-2)
        + String(now.getMonth() + 1).padStart(2, '0')
        + String(now.getDate()).padStart(2, '0')
        + String(now.getHours()).padStart(2, '0')
        + String(now.getMinutes()).padStart(2, '0');
    document.getElementById('p-sku').value = `${catPrefix}-${namePrefix}-${ts}`;
}

async function uploadProductImage(file) {
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch(API + '/api/products/upload-image', { method: 'POST', body: fd });
    if (!res.ok) {
        let err = res.statusText;
        try { const j = await res.json(); err = j.error || j.title || err; } catch {}
        throw new Error(err);
    }
    return res.json();
}

function buildProductPayload() {
    const isService = getProductTypeValue() === 'Service';
    const tracked = document.getElementById('p-track-stock')?.checked && !isService;
    const suppVal = document.getElementById('p-supplier')?.value;
    const expiry = document.getElementById('p-expiry')?.value || '';
    return {
        name: document.getElementById('p-name').value.trim(),
        description: document.getElementById('p-desc')?.value.trim() || '',
        category: document.getElementById('p-category').value,
        price: Number(document.getElementById('p-price').value),
        cost: Number(document.getElementById('p-cost')?.value) || 0,
        stock: tracked ? Number(document.getElementById('p-stock').value) || 0 : 0,
        minStock: tracked ? Number(document.getElementById('p-min-stock')?.value) || 0 : 0,
        barcode: document.getElementById('p-barcode').value.trim(),
        sku: document.getElementById('p-sku').value.trim(),
        image: document.getElementById('p-image')?.value || '',
        location: document.getElementById('p-location')?.value.trim() || '',
        shelf: document.getElementById('p-shelf')?.value.trim() || '',
        uom: document.getElementById('p-uom')?.value || '',
        batch: document.getElementById('p-batch')?.value.trim() || '',
        expiry,
        itemType: getProductTypeValue(),
        isSalesItem: document.getElementById('p-sales')?.checked ?? true,
        isPurchaseItem: document.getElementById('p-purchase')?.checked ?? false,
        isInactive: document.getElementById('p-inactive')?.checked ?? false,
        taxRate: Number(document.getElementById('p-tax')?.value) || 0,
        isStockTracked: tracked,
        sellByWeight: !isService && getSellByValue() === 'weight',
        price2: Number(document.getElementById('p-price2')?.value) || 0,
        price3: Number(document.getElementById('p-price3')?.value) || 0,
        price4: Number(document.getElementById('p-price4')?.value) || 0,
        supplierId: suppVal ? Number(suppVal) : null
    };
}

function fillProductForm(p) {
    const isService = p.itemType === 'Service' || p.isService;
    document.getElementById('p-name').value = p.name || '';
    document.getElementById('p-desc').value = p.description || '';
    document.getElementById('p-category').value = p.category || 'General';
    document.getElementById('p-price').value = p.price ?? '';
    document.getElementById('p-price2').value = p.price2 ?? 0;
    document.getElementById('p-price3').value = p.price3 ?? 0;
    document.getElementById('p-price4').value = p.price4 ?? 0;
    document.getElementById('p-cost').value = p.cost ?? 0;
    document.getElementById('p-stock').value = p.stock ?? 0;
    document.getElementById('p-min-stock').value = p.minStock ?? 0;
    document.getElementById('p-barcode').value = p.barcode || '';
    document.getElementById('p-sku').value = p.sku || '';
    document.getElementById('p-location').value = p.location || '';
    document.getElementById('p-shelf').value = p.shelf || '';
    document.getElementById('p-batch').value = p.batch || '';
    document.getElementById('p-expiry').value = p.expiry ? p.expiry.substring(0, 10) : '';
    document.getElementById('p-sales').checked = p.isSalesItem !== false;
    document.getElementById('p-purchase').checked = !!p.isPurchaseItem;
    document.getElementById('p-inactive').checked = !!p.isInactive;
    document.getElementById('p-tax').value = String(p.taxRate ?? 0);
    document.getElementById('p-track-stock').checked = p.isStockTracked !== false && !isService;
    const sellBy = isSellByWeight(p) ? 'weight' : 'piece';
    const sellRadio = document.querySelector(`input[name="p-sell-by"][value="${sellBy}"]`);
    if (sellRadio) sellRadio.checked = true;
    const typeRadio = document.querySelector(`input[name="p-type"][value="${isService ? 'Service' : 'Product'}"]`);
    if (typeRadio) typeRadio.checked = true;
    fillSupplierSelect(document.getElementById('p-supplier'));
    document.getElementById('p-supplier').value = p.supplierId ? String(p.supplierId) : '';
    setProductImagePreview(p.image || '');
    onProductTypeChange(p.uom || '');
    calculateProductMargins();
}

function resetProductForm() {
    document.getElementById('product-form').reset();
    document.getElementById('p-id').value = '';
    document.getElementById('p-sales').checked = true;
    document.getElementById('p-purchase').checked = false;
    document.getElementById('p-inactive').checked = false;
    document.getElementById('p-track-stock').checked = true;
    document.querySelector('input[name="p-type"][value="Product"]').checked = true;
    const sellPiece = document.querySelector('input[name="p-sell-by"][value="piece"]');
    if (sellPiece) sellPiece.checked = true;
    fillCategorySelect(document.getElementById('p-category'));
    fillSupplierSelect(document.getElementById('p-supplier'));
    setProductImagePreview('');
    onProductTypeChange();
    calculateProductMargins();
}

function openProductModal(id) {
    editingProductId = id || null;
    const title = document.getElementById('product-modal-title');
    fillCategorySelect(document.getElementById('p-category'));
    fillSupplierSelect(document.getElementById('p-supplier'));
    if (id) {
        const p = products.find(x => x.id === id);
        if (!p) return;
        const isService = p.itemType === 'Service' || p.isService;
        if (title) title.textContent = tr(isService ? 'edit_service' : 'edit_product');
        document.getElementById('p-id').value = id;
        fillProductForm(p);
    } else {
        if (title) title.textContent = tr('add_product');
        resetProductForm();
    }
    openModal('product-modal');
}

async function deleteProduct(id) {
    if (!await confirmDialog(tr('confirm_delete'))) return;
    try {
        await api('/api/products/' + id + '/delete', { method: 'POST' });
        toast(tr('deleted_ok'), 'success'); await loadData();
    } catch (e) { toast(e.message, 'error'); }
}

function openStockModal(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    document.getElementById('stock-product-id').value = id;
    document.getElementById('stock-change').value = '';
    document.getElementById('stock-reason').value = '';
    openModal('stock-modal');
}

async function submitStockAdjust(e) {
    e.preventDefault();
    const id = document.getElementById('stock-product-id').value;
    const change = Number(document.getElementById('stock-change').value);
    const reason = document.getElementById('stock-reason').value.trim();
    if (!id || !change) return;
    try {
        await api('/api/products/' + id + '/adjust-stock', {
            method: 'POST',
            body: JSON.stringify({ change, reason })
        });
        closeModal('stock-modal');
        toast(tr('stock_ok'), 'success');
        await loadData();
    } catch (err) { toast(err.message, 'error'); }
}

function openCustomerDetails(id) {
    const c = customers.find(x => x.id === id);
    if (!c) return;
    document.getElementById('cust-pay-id').value = id;
    document.getElementById('cust-pay-amount').value = '';
    document.getElementById('cust-pay-note').value = '';
    document.getElementById('customer-details-info').innerHTML = `
        <div style="line-height:1.8;">
            <div><strong>${tr('col_name')}:</strong> ${escapeHtml(c.name)}</div>
            <div><strong>${tr('col_phone')}:</strong> ${escapeHtml(c.phone || '—')}</div>
            <div><strong>${tr('col_email')}:</strong> ${escapeHtml(c.email || '—')}</div>
            <div><strong>${tr('col_address')}:</strong> ${escapeHtml(c.address || '—')}</div>
            <div><strong>${tr('col_balance')}:</strong> ${money(c.balance)}</div>
            <div><strong>${tr('col_type')}:</strong> ${escapeHtml(c.type || '—')}</div>
        </div>`;
    openModal('customer-details-modal');
}

function openSupplierDetails(id) {
    const s = suppliers.find(x => x.id === id);
    if (!s) return;
    document.getElementById('supp-pay-id').value = id;
    document.getElementById('supp-pay-amount').value = '';
    document.getElementById('supp-pay-note').value = '';
    document.getElementById('supplier-details-info').innerHTML = `
        <div style="line-height:1.8;">
            <div><strong>${tr('col_name')}:</strong> ${escapeHtml(s.name)}</div>
            <div><strong>${tr('col_contact')}:</strong> ${escapeHtml(s.contact || '—')}</div>
            <div><strong>${tr('col_phone')}:</strong> ${escapeHtml(s.phone || '—')}</div>
            <div><strong>${tr('col_email')}:</strong> ${escapeHtml(s.email || '—')}</div>
            <div><strong>${tr('col_address')}:</strong> ${escapeHtml(s.address || '—')}</div>
            <div><strong>${tr('col_balance')}:</strong> ${money(s.balance ?? 0)}</div>
        </div>`;
    openModal('supplier-details-modal');
}

function renderCategoriesManage() {
    const el = document.getElementById('categories-manage-list');
    if (!el) return;
    el.innerHTML = categories.length ? categories.map(c => `
        <div class="manage-list-item">
            <span>${escapeHtml(c)}</span>
            <div class="table-actions">
                <button type="button" class="btn btn-secondary btn-sm" data-rename-cat="${escapeHtml(c)}">${tr('rename')}</button>
                <button type="button" class="btn-icon btn-icon-danger" title="${tr('delete')}" data-del-cat="${escapeHtml(c)}"><span class="material-symbols-rounded">delete</span></button>
            </div>
        </div>`).join('') : `<div class="empty-state">${tr('empty_list')}</div>`;
    el.querySelectorAll('[data-rename-cat]').forEach(btn => btn.onclick = () => {
        const oldName = btn.getAttribute('data-rename-cat');
        document.getElementById('cat-old-name').value = oldName;
        document.getElementById('cat-name').value = oldName;
        closeModal('categories-manage-modal');
        openModal('category-modal');
    });
    el.querySelectorAll('[data-del-cat]').forEach(btn => btn.onclick = () => deleteCategory(btn.getAttribute('data-del-cat')));
}

async function deleteCategory(name) {
    if (!await confirmDialog(tr('confirm_delete'))) return;
    try {
        await api('/api/categories/delete', { method: 'POST', body: JSON.stringify({ name }) });
        toast(tr('deleted_ok'), 'success');
        await loadData();
        renderCategoriesManage();
    } catch (e) { toast(e.message, 'error'); }
}

function renderExpenseCategoriesList() {
    const el = document.getElementById('exp-cats-list');
    if (!el) return;
    const cats = expenseCategories.length ? expenseCategories : ['Other'];
    el.innerHTML = cats.map(c => `
        <div class="manage-list-item">
            <span>${escapeHtml(c)}</span>
            <button type="button" class="btn-icon btn-icon-danger" title="${tr('delete')}" data-del-exp-cat="${escapeHtml(c)}"><span class="material-symbols-rounded">delete</span></button>
        </div>`).join('');
    el.querySelectorAll('[data-del-exp-cat]').forEach(btn => btn.onclick = () => deleteExpenseCategory(btn.getAttribute('data-del-exp-cat')));
}

async function deleteExpenseCategory(name) {
    if (!await confirmDialog(tr('confirm_delete'))) return;
    try {
        await api('/api/expense-categories/delete', { method: 'POST', body: JSON.stringify({ name }) });
        toast(tr('deleted_ok'), 'success');
        expenseCategories = await api('/api/expense-categories').catch(() => []);
        renderExpenseCategoriesList();
    } catch (e) { toast(e.message, 'error'); }
}

async function fillExpenseCategorySelect() {
    let cats = expenseCategories;
    if (!cats?.length) {
        try { cats = await api('/api/expense-categories'); expenseCategories = cats; } catch { cats = ['Other']; }
    }
    document.getElementById('e-category').innerHTML = cats.map(c => `<option>${escapeHtml(c)}</option>`).join('');
}

async function placeOrder(status, opts = {}) {
    if (!cart.length) return toast(tr('empty_cart_hint'), 'error');
    const customerSel = document.getElementById('pos-customer');
    const customerId = customerSel?.value ? Number(customerSel.value) : null;
    if (opts.requireCustomer && !customerId) return toast(tr('bill_need_customer'), 'error');
    const t = getPosTotals();
    const cust = customerId ? customers.find(x => x.id === customerId) : null;
    if (opts.isPaid === false && cust) {
        const limit = Number(cust.creditLimit);
        if (Number.isFinite(limit) && limit > 0) {
            const newBal = (Number(cust.balance) || 0) + t.total;
            if (newBal > limit + 0.004) {
                const msg = tr('credit_limit_warn')
                    .replace('{0}', money(limit))
                    .replace('{1}', money(newBal));
                if (!await confirmDialog(msg, { danger: false, confirmText: tr('confirm_btn') })) return null;
            }
        }
    }
    let vatAmount = t.vat;
    let shippingAmount = t.ship;
    let discountAmount = t.disc;
    const delta = +(t.total - t.calc).toFixed(2);
    if (delta < -0.004) discountAmount = +(discountAmount - delta).toFixed(2);
    else if (delta > 0.004) shippingAmount = +(shippingAmount + delta).toFixed(2);
    const payload = {
        items: cart.map(x => ({
            id: x.id,
            name: x.name,
            price: x.price,
            qty: x.qty,
            stockQty: x.stockQty > 0 ? x.stockQty : 0,
            weightKg: x.weightKg || 0
        })),
        status,
        vatAmount,
        shippingAmount,
        discountAmount,
        totalAmount: t.total,
        shippingAddress: t.shipOn ? (opts.shippingAddress || '') : null
    };
    if (customerId) payload.customerId = customerId;
    if (opts.isPaid != null) payload.isPaid = opts.isPaid;
    else if (status === 'Completed') payload.isPaid = true;
    if (posShipping?.shippingTo) {
        payload.shippingAddress = posShipping.shippingTo;
        if (posShipping.deliveryDate) payload.deliveryDate = posShipping.deliveryDate;
        if (posShipping.dueDate) payload.dueDate = posShipping.dueDate;
        if (posShipping.customerId && !payload.customerId) payload.customerId = posShipping.customerId;
    } else if (t.shipOn) {
        payload.shippingAddress = opts.shippingAddress || '';
    }
    try {
        const res = await api('/api/checkout', { method: 'POST', body: JSON.stringify(payload) });
        const saleTotal = t.total;
        const custName = cust?.name || '';
        const priorBal = Number(cust?.balance) || 0;
        cart = [];
        posShipping = null;
        updateShippingButton();
        ['pos-vat', 'pos-ship', 'pos-disc'].forEach(id => { const el = document.getElementById(id); if (el) el.checked = false; });
        const shipAmt = document.getElementById('pos-ship-amt'); if (shipAmt) shipAmt.value = '0';
        const discAmt = document.getElementById('pos-disc-amt'); if (discAmt) discAmt.value = '0';
        clearPosTotalManual();
        renderCart();
        if (opts.isPaid === false) {
            toast(tr('bill_ok_detail')
                .replace('{0}', money(saleTotal))
                .replace('{1}', custName)
                .replace('{2}', money(priorBal + saleTotal)), 'success');
        }
        else if (status === 'Completed') toast(tr('checkout_ok'), 'success');
        else if (status === 'Quotation') toast(tr('quotation') + ' ✓', 'success');
        else toast(tr('save_draft') + ' ✓', 'success');
        await loadData();
        populatePosCustomer();
        renderPosStats();
        if (status === 'Quotation') {
            try { quotations = await api('/api/quotations'); renderQuotations(); } catch {}
        }
        return res;
    } catch (e) { toast(e.message || tr('checkout_fail'), 'error'); return null; }
}

function buildPosReceiptHtml() {
    const t = getPosTotals();
    const cust = document.getElementById('pos-customer');
    const custName = cust?.selectedOptions?.[0]?.textContent || tr('walk_in_customer');
    const lines = cart.length
        ? cart.map(x => `<tr><td>${escapeHtml(x.name)}</td><td>${x.qty}</td><td>${posMoney(x.price)}</td><td>${posMoney(x.price * x.qty)}</td></tr>`).join('')
        : `<tr><td colspan="4">${escapeHtml(tr('empty_cart_hint'))}</td></tr>`;
    return `
        <h2>${escapeHtml(tr('print_receipt'))}</h2>
        <p class="pos-rcpt-meta">${escapeHtml(new Date().toLocaleString())}</p>
        <p><strong>${escapeHtml(tr('col_customer'))}:</strong> ${escapeHtml(custName)}</p>
        ${posShipping?.shippingTo ? `<p><strong>${escapeHtml(tr('shipping_to'))}:</strong> ${escapeHtml(posShipping.shippingTo)}</p>` : ''}
        <table>
            <thead><tr><th>${tr('col_name')}</th><th>${tr('col_qty')}</th><th>${tr('col_price')}</th><th>${tr('col_total')}</th></tr></thead>
            <tbody>${lines}</tbody>
        </table>
        <div class="pos-rcpt-totals">
            <div><span>${tr('subtotal')}</span><span>${posMoney(t.sub)}</span></div>
            <div><span>${tr('vat_label')}</span><span>${posMoney(t.vat)}</span></div>
            <div><span>${tr('shipping')}</span><span>${posMoney(t.ship)}</span></div>
            <div><span>${tr('discount')}</span><span>${posMoney(t.disc)}</span></div>
            <div class="pos-rcpt-grand"><span>${tr('total_payable')}</span><span>${posMoney(t.total)}</span></div>
        </div>`;
}

function getPosPrintOptions() {
    const landscape = document.querySelector('input[name="ppd-layout"]:checked')?.value === 'landscape';
    const pagesMode = document.querySelector('input[name="ppd-pages"]:checked')?.value || 'all';
    const pageRange = pagesMode === 'custom'
        ? (document.getElementById('ppd-page-range')?.value || '').trim()
        : 'all';
    const copies = Math.max(1, Math.min(99, parseInt(document.getElementById('ppd-copies')?.value, 10) || 1));
    const color = (document.getElementById('ppd-color')?.value || 'color') !== 'bw';
    const printerName = document.getElementById('ppd-printer')?.value || '';
    return { landscape, pageRange, copies, color, printerName };
}

function applyPosPrintLayoutPreview() {
    const paper = document.getElementById('ppd-paper');
    if (!paper) return;
    const landscape = document.querySelector('input[name="ppd-layout"]:checked')?.value === 'landscape';
    paper.classList.toggle('is-landscape', landscape);
}

function openPosPrintPreview() {
    if (!cart.length) {
        toast(tr('empty_cart'), 'error');
        return;
    }
    const sheet = document.getElementById('pos-receipt-sheet');
    if (!sheet) return;
    sheet.innerHTML = buildPosReceiptHtml();
    const meta = document.getElementById('ppd-sheet-count');
    if (meta) meta.textContent = tr('print_sheet_one');
    applyPosPrintLayoutPreview();
    requestHostPrinters();
    openModal('pos-print-modal');
    applyI18n();
}

function printPosReceipt() {
    openPosPrintPreview();
}

function doPrintPosReceipt() {
    if (!cart.length) {
        toast(tr('empty_cart'), 'error');
        return;
    }
    const opts = getPosPrintOptions();
    const t = getPosTotals();
    const cust = document.getElementById('pos-customer');
    const custName = cust?.selectedOptions?.[0]?.textContent || tr('walk_in_customer');
    const payload = {
        action: 'printReceipt',
        customerName: custName,
        shippingTo: posShipping?.shippingTo || '',
        currencyCode: posCurrencyMeta().code,
        currencySymbol: posCurrencyMeta().symbol,
        items: cart.map(x => ({
            name: x.name || '',
            qty: Number(x.qty) || 1,
            price: Number(x.price) || 0,
            total: (Number(x.price) || 0) * (Number(x.qty) || 1)
        })),
        subtotal: t.sub,
        vat: t.vat,
        shipping: t.ship,
        discount: t.disc,
        total: t.total,
        printerName: opts.printerName,
        copies: opts.copies,
        landscape: opts.landscape,
        color: opts.color
    };

    if (window.chrome?.webview?.postMessage) {
        try {
            window.chrome.webview.postMessage(JSON.stringify(payload));
            closeModal('pos-print-modal');
            return;
        } catch (e) {
            toast(tr('print_failed'), 'error');
            return;
        }
    }

    // Browser fallback
    let box = document.getElementById('pos-print-receipt');
    if (!box) {
        box = document.createElement('div');
        box.id = 'pos-print-receipt';
        box.setAttribute('aria-hidden', 'true');
        document.body.appendChild(box);
    }
    box.innerHTML = buildPosReceiptHtml();
    const cleanup = () => {
        const el = document.getElementById('pos-print-receipt');
        if (el) { el.innerHTML = ''; el.remove(); }
        window.removeEventListener('afterprint', cleanup);
    };
    window.addEventListener('afterprint', cleanup);
    setTimeout(() => { if (!window.matchMedia('print').matches) cleanup(); }, 30000);
    closeModal('pos-print-modal');
    setTimeout(() => window.print(), 80);
}

function todayInputValue() {
    const d = new Date();
    return d.toISOString().slice(0, 10);
}

function openShippingModal() {
    const sel = document.getElementById('ship-customer');
    if (sel) {
        const cur = posShipping?.customerId || document.getElementById('pos-customer')?.value || '';
        sel.innerHTML = `<option value="">${escapeHtml(tr('walk_in_customer'))}</option>` +
            customers.map(c => `<option value="${c.id}">${escapeHtml(c.name)}</option>`).join('');
        if (cur) sel.value = String(cur);
    }
    document.getElementById('ship-to').value = posShipping?.shippingTo || '';
    document.getElementById('ship-order-date').value = posShipping?.orderDate || todayInputValue();
    document.getElementById('ship-delivery-date').value = posShipping?.deliveryDate || todayInputValue();
    document.getElementById('ship-due-date').value = posShipping?.dueDate || todayInputValue();
    openModal('shipping-modal');
}

async function loadDraftToCart(orderId, customerId) {
    try {
        const items = await api('/api/order-details/' + orderId);
        if (!items?.length) return toast(tr('empty_list'), 'error');
        if (cart.length && !await confirmDialog(tr('confirm_clear_cart'), { danger: false, confirmText: tr('confirm_btn') })) return;
        cart = items.map(it => {
            const p = products.find(x => x.id === it.partId) || { id: it.partId, name: it.name, price: it.price, stock: 9999, price2: 0, price3: 0, price4: 0 };
            return makeCartLine(p, Number(it.qty) || 1, Number(it.price));
        });
        const sel = document.getElementById('pos-customer');
        if (sel && customerId) sel.value = String(customerId);
        closeModal('drafts-modal');
        renderCart();
        toast(tr('draft_loaded'), 'success');
    } catch (e) { toast(e.message, 'error'); }
}

async function openDraftsModal() {
    openModal('drafts-modal');
    const body = document.getElementById('drafts-body');
    if (!body) return;
    body.innerHTML = `<tr><td colspan="5" class="empty-state">...</td></tr>`;
    try {
        const drafts = await api('/api/drafts');
        if (!drafts?.length) {
            body.innerHTML = `<tr><td colspan="5" class="empty-state">${tr('no_drafts')}</td></tr>`;
            return;
        }
        body.innerHTML = drafts.map(d => `
            <tr>
                <td>#${d.orderId}</td>
                <td>${formatDate(d.orderDate)}</td>
                <td>${escapeHtml(d.customerName || '')}</td>
                <td>${money(d.totalAmount)}</td>
                <td><div class="table-actions">
                    <button type="button" class="btn btn-primary btn-sm" data-load-draft="${d.orderId}" data-cust="${d.customerId || ''}">${tr('load_to_cart')}</button>
                    <button type="button" class="btn btn-secondary btn-sm" data-view-draft="${d.orderId}">${tr('view')}</button>
                    <button type="button" class="btn-icon btn-icon-danger" data-del-draft="${d.orderId}" title="${tr('delete')}"><span class="material-symbols-rounded">delete</span></button>
                </div></td>
            </tr>`).join('');
        body.querySelectorAll('[data-load-draft]').forEach(btn => {
            btn.onclick = () => loadDraftToCart(Number(btn.dataset.loadDraft), btn.dataset.cust ? Number(btn.dataset.cust) : null);
        });
        body.querySelectorAll('[data-view-draft]').forEach(btn => {
            btn.onclick = async () => {
                closeModal('drafts-modal');
                await viewOrder(Number(btn.dataset.viewDraft));
            };
        });
        body.querySelectorAll('[data-del-draft]').forEach(btn => {
            btn.onclick = async () => {
                if (!await confirmDialog(tr('confirm_delete'))) return;
                try {
                    await api('/api/quotations/' + btn.dataset.delDraft + '/delete', { method: 'POST' });
                    toast(tr('deleted_ok'), 'success');
                    openDraftsModal();
                    await loadData();
                    renderPosStats();
                } catch (e) { toast(e.message, 'error'); }
            };
        });
    } catch (e) {
        body.innerHTML = `<tr><td colspan="5" class="empty-state">${escapeHtml(e.message || tr('empty_list'))}</td></tr>`;
    }
}

function openBlindReturnModal() {
    blindReturnItems = [];
    const sel = document.getElementById('blind-customer');
    if (sel) {
        sel.innerHTML = `<option value="">${escapeHtml(tr('walk_in_customer'))}</option>` +
            customers.map(c => `<option value="${c.id}">${escapeHtml(c.name)}</option>`).join('');
    }
    const search = document.getElementById('blind-search');
    if (search) search.value = '';
    const reason = document.getElementById('blind-return-reason');
    if (reason) reason.value = '';
    renderBlindReturnItems();
    openModal('blind-return-modal');
    setTimeout(() => search?.focus(), 50);
}

function addBlindReturnProduct(p, qty = 1) {
    if (!p) return;
    const existing = blindReturnItems.find(x => x.partId === p.id);
    if (existing) existing.qty += qty;
    else blindReturnItems.push({ partId: p.id, name: p.name, qty, price: Number(p.price) || 0 });
    renderBlindReturnItems();
}

function renderBlindReturnItems() {
    const el = document.getElementById('blind-return-items');
    const totalEl = document.getElementById('blind-return-total');
    if (!el) return;
    if (!blindReturnItems.length) {
        el.innerHTML = `<div class="empty-state">${tr('empty_cart_hint')}</div>`;
        if (totalEl) totalEl.textContent = money(0);
        return;
    }
    el.innerHTML = blindReturnItems.map((it, i) => `
            <div class="blind-line">
            <strong>${escapeHtml(it.name)}</strong>
            <span class="blind-price-tag">${money(it.price)}</span>
            <input type="number" class="form-control" data-bq="${i}" min="1" step="1" value="${it.qty}" title="${tr('return_qty')}">
            <input type="number" class="form-control" data-bp="${i}" min="0.01" step="0.01" value="${Number(it.price).toFixed(2)}" title="${tr('unit_price')}">
            <button type="button" class="cart-remove" data-brm="${i}"><span class="material-symbols-rounded">delete</span></button>
        </div>`).join('');
    el.querySelectorAll('[data-bq]').forEach(inp => {
        inp.onchange = () => {
            const i = Number(inp.dataset.bq);
            blindReturnItems[i].qty = Math.max(1, parseInt(inp.value, 10) || 1);
            renderBlindReturnItems();
        };
    });
    el.querySelectorAll('[data-bp]').forEach(inp => {
        inp.onchange = () => {
            const i = Number(inp.dataset.bp);
            const v = parseFloat(inp.value);
            if (!(v > 0)) { toast(tr('invalid_price'), 'error'); renderBlindReturnItems(); return; }
            blindReturnItems[i].price = v;
            renderBlindReturnItems();
        };
    });
    el.querySelectorAll('[data-brm]').forEach(btn => {
        btn.onclick = () => { blindReturnItems.splice(Number(btn.dataset.brm), 1); renderBlindReturnItems(); };
    });
    const total = blindReturnItems.reduce((s, x) => s + x.price * x.qty, 0);
    if (totalEl) totalEl.textContent = money(total);
}

async function submitBlindReturn() {
    if (!blindReturnItems.length) return toast(tr('empty_cart_hint'), 'error');
    const customerId = document.getElementById('blind-customer')?.value;
    try {
        await api('/api/blind-return', {
            method: 'POST',
            body: JSON.stringify({
                reason: document.getElementById('blind-return-reason')?.value.trim() || 'Web blind return',
                customerId: customerId ? Number(customerId) : null,
                items: blindReturnItems.map(x => ({
                    partId: x.partId,
                    qty: x.qty,
                    refundAmount: x.price * x.qty
                }))
            })
        });
        closeModal('blind-return-modal');
        blindReturnItems = [];
        toast(tr('return_ok_blind'), 'success');
        await loadData();
        renderPosStats();
    } catch (e) { toast(e.message, 'error'); }
}

function openCustomerModal(id) {
    const title = document.getElementById('customer-modal-title');
    if (id) {
        const c = customers.find(x => x.id === id);
        if (!c) return;
        if (title) title.textContent = tr('edit');
        document.getElementById('cust-id').value = id;
        document.getElementById('cust-name').value = c.name || '';
        document.getElementById('cust-phone').value = c.phone || '';
        document.getElementById('cust-email').value = c.email || '';
        document.getElementById('cust-address').value = c.address || '';
        document.getElementById('cust-type').value = c.type || 'Regular';
        document.getElementById('cust-credit').value = c.creditLimit ?? 1000;
        document.getElementById('cust-due').value = c.dueDate ? c.dueDate.substring(0, 10) : '';
        document.getElementById('cust-reminder').value = c.reminderDays ?? 0;
    } else {
        if (title) title.textContent = tr('add_customer');
        document.getElementById('customer-form').reset();
        document.getElementById('cust-id').value = '';
        document.getElementById('cust-type').value = 'Regular';
        document.getElementById('cust-credit').value = 1000;
        document.getElementById('cust-reminder').value = 0;
    }
    openModal('customer-modal');
}

async function deleteCustomer(id) {
    if (!await confirmDialog(tr('confirm_delete'))) return;
    try {
        await api('/api/customers/' + id + '/delete', { method: 'POST' });
        toast(tr('deleted_ok'), 'success'); await loadData();
    } catch (e) { toast(e.message, 'error'); }
}

function openSupplierModal(id) {
    const title = document.getElementById('supplier-modal-title');
    if (id) {
        const s = suppliers.find(x => x.id === id);
        if (!s) return;
        if (title) title.textContent = tr('edit');
        document.getElementById('supp-id').value = id;
        document.getElementById('supp-name').value = s.name || '';
        document.getElementById('supp-phone').value = s.phone || '';
        document.getElementById('supp-email').value = s.email || '';
        document.getElementById('supp-address').value = s.address || '';
        document.getElementById('supp-contact').value = s.contact || '';
        document.getElementById('supp-type').value = s.type || 'Regular';
        document.getElementById('supp-due').value = s.dueDate ? s.dueDate.substring(0, 10) : '';
        document.getElementById('supp-reminder').value = s.reminderDays ?? 0;
    } else {
        if (title) title.textContent = tr('add_supplier');
        document.getElementById('supplier-form').reset();
        document.getElementById('supp-id').value = '';
        document.getElementById('supp-type').value = 'Regular';
        document.getElementById('supp-reminder').value = 0;
    }
    openModal('supplier-modal');
}

async function deleteSupplier(id) {
    if (!await confirmDialog(tr('confirm_delete'))) return;
    try {
        await api('/api/suppliers/' + id + '/delete', { method: 'POST' });
        toast(tr('deleted_ok'), 'success'); await loadData();
    } catch (e) { toast(e.message, 'error'); }
}

function openUserModal(id) {
    const title = document.getElementById('user-modal-title');
    const pass = document.getElementById('user-password');
    if (id) {
        const u = users.find(x => x.id === id);
        if (!u) return;
        if (title) title.textContent = tr('edit');
        document.getElementById('user-id').value = id;
        document.getElementById('user-username').value = u.username || '';
        document.getElementById('user-fullname').value = u.fullName || '';
        document.getElementById('user-role').value = u.role || 'Staff';
        if (pass) { pass.value = ''; pass.required = false; }
    } else {
        if (title) title.textContent = tr('add_user');
        document.getElementById('user-form').reset();
        document.getElementById('user-id').value = '';
        document.getElementById('user-role').value = 'Staff';
        if (pass) pass.required = true;
    }
    openModal('user-modal');
}

async function deleteUser(id) {
    if (!await confirmDialog(tr('confirm_delete'))) return;
    try {
        await api('/api/users/' + id + '/delete', { method: 'POST' });
        toast(tr('deleted_ok'), 'success'); await loadData();
    } catch (e) { toast(e.message, 'error'); }
}

async function deleteQuotation(id) {
    if (!await confirmDialog(tr('confirm_delete'))) return;
    try {
        await api('/api/quotations/' + id + '/delete', { method: 'POST' });
        toast(tr('deleted_ok'), 'success'); await loadData();
    } catch (e) { toast(e.message, 'error'); }
}

async function deleteExpense(id) {
    if (!await confirmDialog(tr('confirm_delete'))) return;
    try {
        await api('/api/expenses/' + id + '/delete', { method: 'POST' });
        toast(tr('deleted_ok'), 'success'); await loadData();
    } catch (e) { toast(e.message, 'error'); }
}

async function deleteCurrency(code) {
    if (!await confirmDialog(tr('confirm_delete'))) return;
    try {
        await api('/api/currencies/' + encodeURIComponent(code) + '/delete', { method: 'POST' });
        toast(tr('deleted_ok'), 'success'); await loadData();
    } catch (e) { toast(e.message, 'error'); }
}

async function viewOrder(orderId) {
    try {
        const items = await api('/api/order-details/' + orderId);
        const body = document.getElementById('order-view-body');
        if (!items?.length) {
            body.innerHTML = `<div class="empty-state">${tr('empty_list')}</div>`;
        } else {
            body.innerHTML = `<table><thead><tr>
                <th>${tr('col_name')}</th><th>${tr('col_qty')}</th><th>${tr('col_price')}</th><th>${tr('total')}</th>
            </tr></thead><tbody>${items.map(it => `<tr>
                <td>${escapeHtml(it.name)}</td><td>${it.qty}</td><td>${money(it.price)}</td><td>${money(it.price * it.qty)}</td>
            </tr>`).join('')}</tbody></table>`;
        }
        openModal('order-view-modal');
    } catch (e) { toast(e.message, 'error'); }
}

async function importCustomersCsv(file) {
    const text = await file.text();
    const lines = text.split(/\r?\n/).filter(l => l.trim());
    if (lines.length < 2) return toast(tr('empty_list'), 'error');
    const headers = lines[0].split(',').map(h => h.replace(/^"|"$/g, '').trim().toLowerCase());
    const idx = (k) => headers.indexOf(k);
    let ok = 0;
    for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].match(/("([^"]|"")*"|[^,]*)/g)?.map(c => c.replace(/^"|"$/g, '').replace(/""/g, '"').trim()) || [];
        const name = cols[idx('name')] || '';
        if (!name) continue;
        try {
            await api('/api/customers', { method: 'POST', body: JSON.stringify({
                name,
                phone: cols[idx('phone')] || '',
                email: cols[idx('email')] || '',
                address: cols[idx('address')] || '',
                type: 'Regular'
            })});
            ok++;
        } catch (e) { console.error(e); }
    }
    toast(ok ? tr('saved_ok') + ' (' + ok + ')' : tr('empty_list'), ok ? 'success' : 'error');
    await loadData();
}

async function importSuppliersCsv(file) {
    const text = await file.text();
    const lines = text.split(/\r?\n/).filter(l => l.trim());
    if (lines.length < 2) return toast(tr('empty_list'), 'error');
    const headers = lines[0].split(',').map(h => h.replace(/^"|"$/g, '').trim().toLowerCase());
    const idx = (k) => headers.indexOf(k);
    let ok = 0;
    for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].match(/("([^"]|"")*"|[^,]*)/g)?.map(c => c.replace(/^"|"$/g, '').replace(/""/g, '"').trim()) || [];
        const name = cols[idx('name')] || '';
        if (!name) continue;
        try {
            await api('/api/suppliers', { method: 'POST', body: JSON.stringify({
                name,
                phone: cols[idx('phone')] || '',
                email: cols[idx('email')] || '',
                address: cols[idx('address')] || '',
                type: 'Regular'
            })});
            ok++;
        } catch (e) { console.error(e); }
    }
    toast(ok ? tr('saved_ok') + ' (' + ok + ')' : tr('empty_list'), ok ? 'success' : 'error');
    await loadData();
}

async function importInventoryCsv(file) {
    const text = await file.text();
    const lines = text.split(/\r?\n/).filter(l => l.trim());
    if (lines.length < 2) return toast(tr('empty_list'), 'error');
    const headers = lines[0].split(',').map(h => h.replace(/^"|"$/g, '').trim().toLowerCase());
    const idx = (k) => headers.indexOf(k);
    let ok = 0;
    for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].match(/("([^"]|"")*"|[^,]*)/g)?.map(c => c.replace(/^"|"$/g, '').replace(/""/g, '"').trim()) || [];
        const name = cols[idx('name')] || '';
        if (!name) continue;
        try {
            await api('/api/add-item', { method: 'POST', body: JSON.stringify({
                name,
                category: cols[idx('category')] || 'General',
                price: parseFloat(cols[idx('price')] || '0') || 0,
                stock: parseInt(cols[idx('stock')] || '0', 10) || 0,
                barcode: cols[idx('barcode')] || '',
                sku: cols[idx('sku')] || ''
            })});
            ok++;
        } catch (e) { console.error(e); }
    }
    toast(ok ? tr('saved_ok') + ' (' + ok + ')' : tr('empty_list'), ok ? 'success' : 'error');
    await loadData();
}

async function importSalesCsv(file) {
    const { rows } = await parseCsvFile(file);
    if (!rows.length) return toast(tr('empty_list'), 'error');
    const payload = rows.map(row => ({
        customer: csvCell(row, 'customer', 'customer_name'),
        total: parseFloat(csvCell(row, 'total', 'amount', 'total_amount') || '0') || 0,
        date: csvCell(row, 'date', 'order_date'),
        payment: csvCell(row, 'payment', 'paymentstatus', 'payment_status', 'status') || 'Paid'
    })).filter(r => r.total > 0);
    if (!payload.length) return toast(tr('empty_list'), 'error');
    try {
        const res = await api('/api/sales/import', { method: 'POST', body: JSON.stringify(payload) });
        toast(tr('import_ok') + ' (' + (res.imported || 0) + ')', 'success');
        await loadData();
    } catch (e) { toast(e.message, 'error'); }
}

async function importHistoryCsv(file) {
    const { rows } = await parseCsvFile(file);
    if (!rows.length) return toast(tr('empty_list'), 'error');
    const payload = rows.map(row => ({
        date: csvCell(row, 'date'),
        action: csvCell(row, 'action', 'type'),
        item: csvCell(row, 'item', 'name', 'sku'),
        customer: csvCell(row, 'customer'),
        details: csvCell(row, 'details', 'description', 'desc'),
        description: csvCell(row, 'description', 'details', 'desc'),
        user: csvCell(row, 'user', 'username'),
        status: csvCell(row, 'status'),
        payment: csvCell(row, 'payment', 'paymentstatus', 'payment_status'),
        total: parseFloat(csvCell(row, 'total', 'amount') || '0') || 0
    }));
    try {
        const res = await api('/api/history/import', { method: 'POST', body: JSON.stringify(payload) });
        toast(tr('import_ok') + ' (' + (res.imported || 0) + ')', 'success');
        await loadData();
        await loadHistory();
        renderHistory();
    } catch (e) { toast(e.message, 'error'); }
}

async function importReportsCsv(file) {
    const { rows } = await parseCsvFile(file);
    if (!rows.length) return toast(tr('empty_list'), 'error');
    const payload = rows.map(row => ({
        name: csvCell(row, 'name', 'product', 'product_name'),
        qty: parseFloat(csvCell(row, 'qty', 'quantity') || '0') || 0,
        sales: parseFloat(csvCell(row, 'sales', 'total_sales') || '0') || 0,
        profit: parseFloat(csvCell(row, 'profit') || '0') || 0,
        total: parseFloat(csvCell(row, 'total', 'amount') || '0') || 0,
        date: csvCell(row, 'date'),
        metric: csvCell(row, 'metric'),
        value: csvCell(row, 'value')
    }));
    try {
        const res = await api('/api/reports/import', { method: 'POST', body: JSON.stringify(payload) });
        toast(tr('import_ok') + ' (' + (res.imported || 0) + ')', 'success');
        await loadData();
        await loadReports();
        renderReports();
    } catch (e) { toast(e.message, 'error'); }
}

function setupNavigation() {
    document.querySelectorAll('.nav-menu .nav-item[data-target]').forEach(item => {
        item.addEventListener('click', async e => {
            e.preventDefault();
            const target = item.getAttribute('data-target');
            if (!target || item.style.display === 'none') return;
            await navigateTo(target, true);
        });
    });
    window.addEventListener('hashchange', () => {
        if (!currentUser) return;
        const target = (location.hash || '').replace(/^#\/?/, '');
        if (target) navigateTo(target, false);
    });
}

async function navigateTo(target, updateHash = true) {
    const item = document.querySelector(`.nav-menu .nav-item[data-target="${target}"]`);
    if (!item || item.style.display === 'none') return;
    if (!document.getElementById(target)) return;

    document.querySelectorAll('.nav-menu .nav-item').forEach(n => n.classList.remove('active'));
    document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));
    item.classList.add('active');
    document.getElementById(target).classList.add('active');
    if (updateHash) {
        const next = '#/' + target;
        if (location.hash !== next) history.replaceState(null, '', next);
    }
    if (target === 'reports') { await loadReports(); renderReports(); }
    if (target === 'history') { await loadHistory(); renderHistory(); }
    if (target === 'settings') { await loadLicense(); renderLicense(); }
    if (target === 'barcodes') renderBarcodes();
    if (target === 'pos') {
        setTimeout(() => document.getElementById('pos-search')?.focus(), 50);
    }
}

function setupAuth() {
    document.getElementById('login-form').addEventListener('submit', async e => {
        e.preventDefault();
        const err = document.getElementById('login-error');
        err.classList.remove('visible');
        const btn = e.target.querySelector('button[type="submit"]');
        if (btn) btn.disabled = true;
        try {
            const user = await api('/api/login', {
                method: 'POST',
                body: JSON.stringify({
                    username: document.getElementById('login-user').value.trim(),
                    password: document.getElementById('login-pass').value
                })
            });
            currentUser = user;
            sessionStorage.setItem('panache_user', JSON.stringify(user));
            document.getElementById('login-pass').value = '';
            document.getElementById('login-user').value = '';
            showApp();
            applyI18n();
            try {
                await loadData();
            } catch (loadErr) {
                console.error('loadData failed', loadErr);
                toast(loadErr.message || 'Data load failed', 'error');
            }
        } catch {
            hideApp();
            err.textContent = tr('login_failed');
            err.classList.add('visible');
        } finally {
            if (btn) btn.disabled = false;
        }
    });
    document.getElementById('btn-logout').onclick = () => hideApp();
}

function setupActions() {
    const btnLang = document.getElementById('btn-lang');
    if (btnLang) btnLang.onclick = () => {
        lang = lang === 'en' ? 'ar' : 'en';
        localStorage.setItem('panache_lang', lang); applyI18n(); renderAll();
    };

    document.getElementById('btn-copy-connect-url')?.addEventListener('click', async () => {
        const url = document.getElementById('dash-connect-url')?.textContent?.trim();
        if (!url || url === '—') return;
        try {
            await navigator.clipboard.writeText(url);
            toast(tr('copied'), 'success');
        } catch {
            try {
                const ta = document.createElement('textarea');
                ta.value = url;
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                ta.remove();
                toast(tr('copied'), 'success');
            } catch { toast(url); }
        }
    });

    const btnAddProduct = document.getElementById('btn-add-product');
    if (btnAddProduct) btnAddProduct.onclick = () => openProductModal(null);
    document.getElementById('product-form').onsubmit = async e => {
        e.preventDefault();
        const payload = buildProductPayload();
        const pid = document.getElementById('p-id').value;
        try {
            if (pid) {
                await api('/api/products/' + pid + '/update', { method: 'POST', body: JSON.stringify(payload) });
            } else {
                await api('/api/add-item', { method: 'POST', body: JSON.stringify(payload) });
            }
            closeModal('product-modal'); editingProductId = null;
            toast(tr(pid ? 'saved_ok' : 'product_ok'), 'success'); await loadData();
        } catch (err) { toast(err.message, 'error'); }
    };

    document.getElementById('btn-p-auto-sku')?.addEventListener('click', generateAutoSku);
    document.getElementById('btn-p-scan')?.addEventListener('click', () => {
        toast(tr('scan'), 'success');
        document.getElementById('p-barcode')?.focus();
    });
    document.getElementById('btn-p-upload')?.addEventListener('click', () => document.getElementById('p-image-file')?.click());
    document.getElementById('btn-p-change-image')?.addEventListener('click', () => document.getElementById('p-image-file')?.click());
    document.getElementById('btn-p-clear-image')?.addEventListener('click', () => clearProductImage());
    document.getElementById('btn-p-remove-image')?.addEventListener('click', () => clearProductImage());
    document.getElementById('p-image-preview')?.addEventListener('click', () => {
        if (document.getElementById('p-image')?.value) document.getElementById('p-image-file')?.click();
    });
    document.getElementById('p-image-file')?.addEventListener('change', async e => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            const res = await uploadProductImage(file);
            setProductImagePreview(res.path || res.url || '');
            toast(tr('saved_ok'), 'success');
        } catch (err) { toast(err.message, 'error'); }
        e.target.value = '';
    });
    document.querySelectorAll('input[name="p-type"]').forEach(r => r.addEventListener('change', () => {
        onProductTypeChange();
        if (!document.getElementById('p-id').value) {
            const title = document.getElementById('product-modal-title');
            if (title) title.textContent = tr(getProductTypeValue() === 'Service' ? 'add_service' : 'add_product');
        }
    }));
    document.getElementById('p-track-stock')?.addEventListener('change', onProductTypeChange);
    document.querySelectorAll('input[name="p-sell-by"]').forEach(r => r.addEventListener('change', () => updateSellByWeightUI()));
    document.getElementById('btn-p-add-uom')?.addEventListener('click', () => { addCustomUom(); });
    document.getElementById('p-uom')?.addEventListener('change', () => {
        if (getSellByValue() !== 'weight') updatePieceStockLabels();
    });
    ['p-cost', 'p-price', 'p-price2', 'p-price3', 'p-price4'].forEach(id => {
        document.getElementById(id)?.addEventListener('input', calculateProductMargins);
    });

    document.getElementById('btn-add-category')?.addEventListener('click', () => {
        document.getElementById('category-form').reset();
        document.getElementById('cat-old-name').value = '';
        openModal('category-modal');
    });
    document.getElementById('btn-manage-categories')?.addEventListener('click', () => {
        renderCategoriesManage();
        openModal('categories-manage-modal');
    });
    document.getElementById('category-form')?.addEventListener('submit', async e => {
        e.preventDefault();
        const oldName = document.getElementById('cat-old-name').value.trim();
        const newName = document.getElementById('cat-name').value.trim();
        try {
            if (oldName) {
                await api('/api/categories/rename', { method: 'POST', body: JSON.stringify({ oldName, newName }) });
            } else {
                await api('/api/categories', { method: 'POST', body: JSON.stringify({ name: newName }) });
            }
            closeModal('category-modal');
            document.getElementById('cat-old-name').value = '';
            toast(tr('saved_ok'), 'success');
            await loadData();
        } catch (err) { toast(err.message, 'error'); }
    });

    document.getElementById('stock-form')?.addEventListener('submit', submitStockAdjust);

    document.getElementById('customer-payment-form')?.addEventListener('submit', async e => {
        e.preventDefault();
        const id = document.getElementById('cust-pay-id').value;
        const amount = Number(document.getElementById('cust-pay-amount').value);
        const note = document.getElementById('cust-pay-note').value.trim();
        try {
            await api('/api/customers/' + id + '/payment', { method: 'POST', body: JSON.stringify({ amount, note }) });
            closeModal('customer-details-modal');
            toast(tr('payment_ok'), 'success');
            await loadData();
        } catch (err) { toast(err.message, 'error'); }
    });

    document.getElementById('supplier-payment-form')?.addEventListener('submit', async e => {
        e.preventDefault();
        const id = document.getElementById('supp-pay-id').value;
        const amount = Number(document.getElementById('supp-pay-amount').value);
        const note = document.getElementById('supp-pay-note').value.trim();
        try {
            await api('/api/suppliers/' + id + '/payment', { method: 'POST', body: JSON.stringify({ amount, note }) });
            closeModal('supplier-details-modal');
            toast(tr('payment_ok'), 'success');
            await loadData();
        } catch (err) { toast(err.message, 'error'); }
    });

    document.getElementById('btn-manage-exp-cats')?.addEventListener('click', async () => {
        try { expenseCategories = await api('/api/expense-categories'); } catch { expenseCategories = []; }
        renderExpenseCategoriesList();
        openModal('exp-cats-modal');
    });
    document.getElementById('exp-cat-add-form')?.addEventListener('submit', async e => {
        e.preventDefault();
        const name = document.getElementById('exp-cat-new-name').value.trim();
        if (!name) return;
        try {
            await api('/api/expense-categories', { method: 'POST', body: JSON.stringify({ name }) });
            document.getElementById('exp-cat-new-name').value = '';
            expenseCategories = await api('/api/expense-categories');
            renderExpenseCategoriesList();
            toast(tr('saved_ok'), 'success');
        } catch (err) { toast(err.message, 'error'); }
    });

    document.getElementById('btn-add-customer')?.addEventListener('click', () => openCustomerModal(null));
    document.getElementById('customer-form')?.addEventListener('submit', async e => {
        e.preventDefault();
        const payload = {
            name: document.getElementById('cust-name').value.trim(),
            phone: document.getElementById('cust-phone').value.trim(),
            email: document.getElementById('cust-email').value.trim(),
            address: document.getElementById('cust-address').value.trim(),
            type: document.getElementById('cust-type').value.trim() || 'Regular',
            creditLimit: Number(document.getElementById('cust-credit')?.value) || 1000,
            dueDate: document.getElementById('cust-due')?.value || null,
            reminderDays: Number(document.getElementById('cust-reminder')?.value) || 0
        };
        const cid = document.getElementById('cust-id').value;
        try {
            if (cid) await api('/api/customers/' + cid + '/update', { method: 'POST', body: JSON.stringify(payload) });
            else await api('/api/customers', { method: 'POST', body: JSON.stringify(payload) });
            closeModal('customer-modal'); toast(tr('saved_ok'), 'success'); await loadData();
            populatePosCustomer();
            // Select newly added customer when created from POS
            if (!cid) {
                const sorted = [...customers].sort((a, b) => (b.id || 0) - (a.id || 0));
                if (sorted[0]) {
                    const sel = document.getElementById('pos-customer');
                    if (sel) sel.value = String(sorted[0].id);
                }
            }
        } catch (err) { toast(err.message, 'error'); }
    });
    document.getElementById('btn-import-inventory')?.addEventListener('click', () => document.getElementById('inv-import-file')?.click());
    document.getElementById('inv-import-file')?.addEventListener('change', async e => {
        const f = e.target.files?.[0];
        if (f) await importInventoryCsv(f);
        e.target.value = '';
    });
    document.getElementById('btn-import-customers')?.addEventListener('click', () => document.getElementById('cust-import-file')?.click());
    document.getElementById('cust-import-file')?.addEventListener('change', async e => {
        const file = e.target.files?.[0];
        if (file) await importCustomersCsv(file);
        e.target.value = '';
    });
    document.getElementById('btn-import-suppliers')?.addEventListener('click', () => document.getElementById('supp-import-file')?.click());
    document.getElementById('supp-import-file')?.addEventListener('change', async e => {
        const file = e.target.files?.[0];
        if (file) await importSuppliersCsv(file);
        e.target.value = '';
    });
    document.getElementById('btn-import-sales')?.addEventListener('click', () => document.getElementById('sales-import-file')?.click());
    document.getElementById('sales-import-file')?.addEventListener('change', async e => {
        const file = e.target.files?.[0];
        if (file) await importSalesCsv(file);
        e.target.value = '';
    });
    document.getElementById('btn-import-history')?.addEventListener('click', () => document.getElementById('history-import-file')?.click());
    document.getElementById('history-import-file')?.addEventListener('change', async e => {
        const file = e.target.files?.[0];
        if (file) await importHistoryCsv(file);
        e.target.value = '';
    });
    document.getElementById('btn-import-reports')?.addEventListener('click', () => document.getElementById('reports-import-file')?.click());
    document.getElementById('reports-import-file')?.addEventListener('change', async e => {
        const file = e.target.files?.[0];
        if (file) await importReportsCsv(file);
        e.target.value = '';
    });

    document.getElementById('btn-add-supplier')?.addEventListener('click', () => openSupplierModal(null));
    document.getElementById('supplier-form')?.addEventListener('submit', async e => {
        e.preventDefault();
        const contact = document.getElementById('supp-contact').value.trim();
        const payload = {
            name: document.getElementById('supp-name').value.trim(),
            phone: document.getElementById('supp-phone').value.trim(),
            email: document.getElementById('supp-email').value.trim(),
            address: document.getElementById('supp-address').value.trim(),
            contact,
            type: document.getElementById('supp-type')?.value.trim() || contact || 'Regular',
            dueDate: document.getElementById('supp-due')?.value || null,
            reminderDays: Number(document.getElementById('supp-reminder')?.value) || 0
        };
        const sid = document.getElementById('supp-id').value;
        try {
            if (sid) await api('/api/suppliers/' + sid + '/update', { method: 'POST', body: JSON.stringify(payload) });
            else await api('/api/suppliers', { method: 'POST', body: JSON.stringify(payload) });
            closeModal('supplier-modal'); toast(tr('saved_ok'), 'success'); await loadData();
        } catch (err) { toast(err.message, 'error'); }
    });

    document.getElementById('btn-add-user')?.addEventListener('click', () => openUserModal(null));
    document.getElementById('user-form')?.addEventListener('submit', async e => {
        e.preventDefault();
        const payload = {
            username: document.getElementById('user-username').value.trim(),
            fullName: document.getElementById('user-fullname').value.trim(),
            password: document.getElementById('user-password').value,
            role: document.getElementById('user-role').value
        };
        const uid = document.getElementById('user-id').value;
        try {
            if (uid) {
                if (!payload.password) delete payload.password;
                await api('/api/users/' + uid + '/update', { method: 'POST', body: JSON.stringify(payload) });
            } else {
                if (!payload.password) return toast(tr('login_failed'), 'error');
                await api('/api/users', { method: 'POST', body: JSON.stringify(payload) });
            }
            closeModal('user-modal'); toast(tr('saved_ok'), 'success'); await loadData();
        } catch (err) { toast(err.message, 'error'); }
    });

    document.getElementById('btn-add-currency')?.addEventListener('click', () => {
        document.getElementById('currency-form').reset();
        document.getElementById('cur-rate').value = '1';
        openModal('currency-modal');
    });
    document.getElementById('currency-form')?.addEventListener('submit', async e => {
        e.preventDefault();
        try {
            await api('/api/currencies', { method: 'POST', body: JSON.stringify({
                code: document.getElementById('cur-code').value.trim().toUpperCase(),
                name: document.getElementById('cur-name').value.trim(),
                symbol: document.getElementById('cur-symbol').value.trim(),
                rate: Number(document.getElementById('cur-rate').value)
            })});
            closeModal('currency-modal'); toast(tr('saved_ok'), 'success'); await loadData();
        } catch (err) { toast(err.message, 'error'); }
    });
    document.getElementById('btn-refresh-rates')?.addEventListener('click', async () => {
        try {
            await api('/api/currencies/refresh', { method: 'POST', body: '{}' });
            toast(tr('saved_ok'), 'success'); await loadData();
        } catch (err) { toast(err.message, 'error'); }
    });

    document.getElementById('btn-add-expense').onclick = async () => {
        await fillExpenseCategorySelect();
        document.getElementById('e-date').value = new Date().toISOString().slice(0, 10);
        document.getElementById('expense-form').reset();
        document.getElementById('e-date').value = new Date().toISOString().slice(0, 10);
        openModal('expense-modal');
    };
    document.getElementById('expense-form').onsubmit = async e => {
        e.preventDefault();
        try {
            await api('/api/expenses', { method: 'POST', body: JSON.stringify({
                category: document.getElementById('e-category').value,
                amount: Number(document.getElementById('e-amount').value),
                expenseDate: document.getElementById('e-date').value,
                description: document.getElementById('e-desc').value,
                recordedBy: currentUser?.username || 'Web'
            })});
            closeModal('expense-modal'); toast(tr('expense_ok'), 'success'); await loadData();
        } catch (err) { toast(err.message, 'error'); }
    };

    document.getElementById('btn-clear-cart').onclick = async () => {
        if (!cart.length) return;
        if (!await confirmDialog(tr('confirm_clear_cart'), { danger: false, confirmText: tr('confirm_btn') })) return;
        cart = [];
        posShipping = null;
        updateShippingButton();
        renderCart();
    };
    document.getElementById('btn-checkout').onclick = () => placeOrder('Completed', { isPaid: true });
    document.getElementById('btn-quote')?.addEventListener('click', () => placeOrder('Quotation'));
    document.getElementById('btn-draft')?.addEventListener('click', () => placeOrder('Draft'));
    document.getElementById('btn-bill')?.addEventListener('click', () => placeOrder('Completed', { isPaid: false, requireCustomer: true }));
    document.getElementById('pos-customer')?.addEventListener('change', () => updatePosCustomerDebt());
    document.getElementById('btn-filter-debt')?.addEventListener('click', () => {
        custDebtOnly = !custDebtOnly;
        const btn = document.getElementById('btn-filter-debt');
        if (btn) btn.classList.toggle('active', custDebtOnly);
        renderCustomers();
    });
    document.getElementById('btn-pos-print')?.addEventListener('click', () => printPosReceipt());
    document.getElementById('btn-pos-do-print')?.addEventListener('click', () => doPrintPosReceipt());
    document.querySelectorAll('input[name="ppd-layout"]').forEach(r => {
        r.addEventListener('change', () => applyPosPrintLayoutPreview());
    });
    document.querySelectorAll('input[name="ppd-pages"]').forEach(r => {
        r.addEventListener('change', () => {
            const custom = document.querySelector('input[name="ppd-pages"]:checked')?.value === 'custom';
            const range = document.getElementById('ppd-page-range');
            if (range) {
                range.disabled = !custom;
                if (custom) range.focus();
            }
        });
    });
    document.getElementById('btn-pos-add-customer')?.addEventListener('click', () => openCustomerModal(null));
    document.getElementById('btn-pos-return')?.addEventListener('click', () => openPosReturnModal());
    document.getElementById('btn-pos-return-load-sales')?.addEventListener('click', () => loadPosReturnSales());
    document.getElementById('btn-pos-return-lookup')?.addEventListener('click', () => {
        const id = Number(document.getElementById('pos-return-order-id')?.value || 0);
        if (!id) return toast(tr('select_customer_or_order'), 'error');
        openPosReturnOrder(id);
    });
    document.getElementById('pos-return-order-id')?.addEventListener('keydown', e => {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        document.getElementById('btn-pos-return-lookup')?.click();
    });
    document.getElementById('btn-pos-return-back-customer')?.addEventListener('click', () => setPosReturnStep('customer'));
    document.getElementById('btn-pos-return-back-sales')?.addEventListener('click', () => {
        const cid = Number(document.getElementById('pos-return-customer')?.value || 0);
        if (cid) loadPosReturnSales();
        else setPosReturnStep('customer');
    });
    document.getElementById('btn-pos-return-confirm')?.addEventListener('click', () => submitPosReturn());
    document.getElementById('btn-pos-return-quick')?.addEventListener('click', () => {
        closeModal('pos-return-modal');
        openBlindReturnModal();
    });
    document.getElementById('btn-confirm-blind-return')?.addEventListener('click', () => submitBlindReturn());
    document.getElementById('blind-search')?.addEventListener('keydown', e => {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        const code = e.target.value.trim();
        const p = findProductByScan(code);
        if (!p) return toast(tr('item_not_found'), 'error');
        addBlindReturnProduct(p);
        e.target.value = '';
    });
    document.getElementById('btn-manage-drafts')?.addEventListener('click', () => openDraftsModal());
    document.getElementById('btn-add-shipping')?.addEventListener('click', () => openShippingModal());
    document.getElementById('btn-ship-add-customer')?.addEventListener('click', () => openCustomerModal(null));
    document.getElementById('btn-clear-shipping')?.addEventListener('click', () => {
        posShipping = null;
        document.getElementById('shipping-form')?.reset();
        updateShippingButton();
        closeModal('shipping-modal');
        toast(tr('saved_ok'), 'success');
    });
    document.getElementById('shipping-form')?.addEventListener('submit', e => {
        e.preventDefault();
        const cust = document.getElementById('ship-customer');
        posShipping = {
            customerId: cust?.value ? Number(cust.value) : null,
            shippingTo: document.getElementById('ship-to').value.trim(),
            orderDate: document.getElementById('ship-order-date').value || null,
            deliveryDate: document.getElementById('ship-delivery-date').value || null,
            dueDate: document.getElementById('ship-due-date').value || null
        };
        if (!posShipping.shippingTo) return toast(tr('shipping_to'), 'error');
        if (posShipping.customerId) {
            const sel = document.getElementById('pos-customer');
            if (sel) sel.value = String(posShipping.customerId);
        }
        const shipChk = document.getElementById('pos-ship');
        if (shipChk && !shipChk.checked) { shipChk.checked = true; updatePosTotalsUi(); }
        updateShippingButton();
        closeModal('shipping-modal');
        toast(tr('shipping_saved'), 'success');
    });
    ['pos-vat', 'pos-ship', 'pos-disc'].forEach(id => {
        document.getElementById(id)?.addEventListener('change', () => {
            clearPosTotalManual();
            updatePosTotalsUi();
        });
    });
    ['pos-ship-amt', 'pos-disc-amt'].forEach(id => {
        document.getElementById(id)?.addEventListener('input', () => {
            clearPosTotalManual();
            updatePosTotalsUi();
        });
    });
    const totalAmt = document.getElementById('pos-total-amt');
    totalAmt?.addEventListener('input', () => {
        const display = parsePosDisplayAmount(totalAmt.value);
        posTotalManual = Number.isFinite(display) ? Math.max(0, posDisplayToBase(display)) : 0;
    });
    totalAmt?.addEventListener('blur', () => {
        const display = parsePosDisplayAmount(totalAmt.value);
        posTotalManual = Number.isFinite(display) ? Math.max(0, posDisplayToBase(display)) : 0;
        totalAmt.value = formatPosAmount(posTotalManual);
    });
    document.getElementById('pos-currency')?.addEventListener('change', () => {
        // Keep USD-base manual total; refresh display in the new currency
        renderCart();
    });

    document.getElementById('btn-confirm-return').onclick = async () => {
        const items = [];
        let count = 0;
        let refund = 0;
        document.querySelectorAll('#return-items .ret-qty').forEach(inp => {
            const i = Number(inp.dataset.i), qty = Number(inp.value);
            if (qty > 0 && returnItemsCache[i]) {
                const it = returnItemsCache[i];
                const amt = (Number(it.price) || 0) * qty;
                items.push({ partId: it.partId, qty, refundAmount: amt });
                count += qty;
                refund += amt;
            }
        });
        if (!items.length) return toast(tr('empty_cart_hint'), 'error');
        try {
            await api('/api/return-item', { method: 'POST', body: JSON.stringify({
                orderId: returnOrderId, reason: document.getElementById('return-reason').value.trim() || 'Web return', items
            })});
            closeModal('return-modal');
            toast(tr('return_ok_detail').replace('{0}', String(count)).replace('{1}', money(refund)), 'success');
            await loadData();
        } catch (err) { toast(err.message, 'error'); }
    };

    document.getElementById('report-preset')?.addEventListener('change', async () => {
        const preset = document.getElementById('report-preset')?.value || 'Monthly';
        syncReportDateInputs(preset);
        await loadReports();
        renderReports();
    });
    const onReportDates = async () => {
        const preset = document.getElementById('report-preset');
        if (preset && preset.value !== 'Custom') preset.value = 'Custom';
        await loadReports();
        renderReports();
    };
    document.getElementById('report-from')?.addEventListener('change', onReportDates);
    document.getElementById('report-to')?.addEventListener('change', onReportDates);
    document.getElementById('history-kind').onchange = async () => { await loadHistory(); renderHistory(); };
    document.getElementById('btn-print-barcodes').onclick = () => openBarcodePrintPreview();
    document.getElementById('btn-barcode-do-print')?.addEventListener('click', () => printBarcodePreview());
    document.querySelectorAll('input[name="bpd-layout"]').forEach(r => {
        r.addEventListener('change', () => applyBarcodePrintLayoutPreview());
    });
    document.querySelectorAll('input[name="bpd-pages"]').forEach(r => {
        r.addEventListener('change', () => {
            const custom = document.querySelector('input[name="bpd-pages"]:checked')?.value === 'custom';
            const range = document.getElementById('bpd-page-range');
            if (range) {
                range.disabled = !custom;
                if (custom) range.focus();
            }
        });
    });
    document.getElementById('bar-select-all')?.addEventListener('change', e => {
        const keys = filteredBarcodeItems().slice(0, 120).map(barcodeItemKey);
        if (e.target.checked) keys.forEach(k => barcodeSelected.add(k));
        else keys.forEach(k => barcodeSelected.delete(k));
        renderBarcodes();
    });

    document.querySelectorAll('[data-close]').forEach(btn => btn.onclick = () => closeModal(btn.getAttribute('data-close')));
    document.querySelectorAll('.modal-overlay:not(#confirm-modal)').forEach(ov => ov.addEventListener('click', e => { if (e.target === ov) ov.classList.remove('active'); }));

    document.getElementById('inv-search').oninput = () => renderInventory();
    document.getElementById('inv-filter')?.addEventListener('change', e => { invFilter = e.target.value; renderInventory(); });
    document.getElementById('btn-inv-table')?.addEventListener('click', () => { invView = 'table'; renderInventory(); });
    document.getElementById('btn-inv-cards')?.addEventListener('click', () => { invView = 'card'; renderInventory(); });
    document.getElementById('inv-select-all')?.addEventListener('change', e => {
        const list = filteredProducts(document.getElementById('inv-search')?.value, invCat, { invMode: true });
        if (e.target.checked) list.forEach(p => invSelected.add(p.id));
        else list.forEach(p => invSelected.delete(p.id));
        renderInventory();
    });
    document.getElementById('btn-bulk-delete-inventory')?.addEventListener('click', async () => {
        if (!invSelected.size || !await confirmDialog(tr('confirm_bulk_delete'))) return;
        try {
            await api('/api/products/bulk-delete', { method: 'POST', body: JSON.stringify({ ids: [...invSelected] }) });
            invSelected.clear();
            toast(tr('deleted_ok'), 'success');
            await loadData();
        } catch (err) { toast(err.message, 'error'); }
    });
    document.getElementById('pos-search')?.addEventListener('input', () => {
        clearTimeout(posSearchDebounce);
        posSearchDebounce = setTimeout(() => renderPOS(), 120);
    });
    // Capture barcode wedge keys anywhere on POS (search field or page)
    document.addEventListener('keydown', handlePosScannerKeydown, true);
    // Keep search focused when opening POS for easier scanning
    document.querySelector('.nav-item[data-target="pos"]')?.addEventListener('click', () => {
        setTimeout(() => document.getElementById('pos-search')?.focus(), 80);
    });
    document.getElementById('pos-cat-prev')?.addEventListener('click', () => scrollPosCats(-1));
    document.getElementById('pos-cat-next')?.addEventListener('click', () => scrollPosCats(1));
    document.getElementById('cust-search').oninput = () => renderCustomers();
    document.getElementById('supp-search').oninput = () => renderSuppliers();
    document.getElementById('bar-search').oninput = () => renderBarcodes();

    document.getElementById('btn-refresh-dashboard')?.addEventListener('click', () => loadData());
    document.getElementById('btn-refresh-inventory')?.addEventListener('click', () => loadData());
    document.getElementById('btn-refresh-sales')?.addEventListener('click', () => loadData());
    document.getElementById('btn-refresh-reports')?.addEventListener('click', async () => { await loadReports(); renderReports(); });
    document.getElementById('btn-refresh-history')?.addEventListener('click', async () => { await loadHistory(); renderHistory(); });
    document.getElementById('btn-refresh-quotations')?.addEventListener('click', () => loadData());
    document.getElementById('btn-quote-print')?.addEventListener('click', () => printQuotationPreview());
    document.getElementById('btn-quote-export')?.addEventListener('click', () => exportQuotationPreview());
    document.getElementById('btn-refresh-customers')?.addEventListener('click', () => loadData());
    document.getElementById('btn-refresh-suppliers')?.addEventListener('click', () => loadData());
    document.getElementById('btn-refresh-expenses')?.addEventListener('click', () => loadData());
    document.getElementById('btn-refresh-barcodes')?.addEventListener('click', () => loadData());
    document.getElementById('btn-refresh-users')?.addEventListener('click', () => loadData());

    const btnExpInv = document.getElementById('btn-export-inventory');
    if (btnExpInv) btnExpInv.onclick = () => exportCsv(products.map(p => ({
        name: p.name, sku: p.sku, category: p.category, price: p.price, stock: p.stock, barcode: p.barcode
    })), 'inventory.csv');
    const btnExpCust = document.getElementById('btn-export-customers');
    if (btnExpCust) btnExpCust.onclick = () => exportCsv(customers.map(c => ({
        name: c.name, phone: c.phone, email: c.email, address: c.address, type: c.type, balance: c.balance
    })), 'customers.csv');
    const btnExpSupp = document.getElementById('btn-export-suppliers');
    if (btnExpSupp) btnExpSupp.onclick = () => exportCsv(suppliers.map(s => ({
        name: s.name, contact: s.contact, phone: s.phone, email: s.email, address: s.address, balance: s.balance
    })), 'suppliers.csv');
    document.getElementById('btn-export-sales')?.addEventListener('click', () => exportCsv(sales.map(o => ({
        orderId: o.orderId, date: o.date, customer: o.customer, total: o.total, payment: o.paymentStatus || ''
    })), 'sales.csv'));
    document.getElementById('btn-export-reports')?.addEventListener('click', () => {
        const s = reportSummary || {};
        const rows = [
            { metric: tr('date_from'), value: toInputDate(s.fromDate) || '' },
            { metric: tr('date_to'), value: toInputDate(s.toDate) || '' },
            { metric: tr('rep_sales'), value: s.totalSales ?? 0 },
            { metric: tr('rep_cost'), value: s.totalCost ?? 0 },
            { metric: tr('rep_expenses'), value: s.totalExpenses ?? 0 },
            { metric: tr('rep_profit_before_expenses'), value: s.totalProfit ?? 0 },
            { metric: tr('rep_profit_after_expenses'), value: s.totalProfitAfterExpenses ?? 0 }
        ];
        exportCsv(rows, 'report-summary.csv');
        if (reportTop?.length) exportCsv(reportTop.map(r => ({
            name: r.product_name || r.ProductName,
            qty: r.quantity_sold ?? r.QuantitySold,
            sales: r.total_sales ?? r.TotalSales,
            profit: r.profit ?? r.Profit
        })), 'report-top-products.csv');
    });
    document.getElementById('btn-export-history')?.addEventListener('click', () => exportCsv(window._historyRows || [], 'history.csv'));
    document.getElementById('btn-export-expenses')?.addEventListener('click', () => exportCsv(expenses.map(e => ({
        date: e.expenseDate, category: e.category, amount: e.amount, description: e.description, paid: e.isPaid
    })), 'expenses.csv'));

    document.getElementById('btn-activate-license')?.addEventListener('click', openLicenseModal);
    document.getElementById('btn-copy-hwid')?.addEventListener('click', async () => {
        const text = document.getElementById('lic-hwid')?.textContent || '';
        try {
            await navigator.clipboard.writeText(text);
            toast(tr('copied'), 'success');
        } catch {
            toast(text, 'success');
        }
    });
    document.getElementById('btn-confirm-activate')?.addEventListener('click', async () => {
        const err = document.getElementById('license-activate-error');
        err?.classList.remove('visible');
        const licenseKey = document.getElementById('lic-key')?.value.trim() || '';
        if (!licenseKey.replace(/[-\s]/g, '').length) {
            if (err) { err.textContent = tr('license_invalid'); err.classList.add('visible'); }
            return;
        }
        try {
            await api('/api/license/activate', {
                method: 'POST',
                body: JSON.stringify({ licenseKey, customerName: 'Licensed User' })
            });
            closeModal('license-modal');
            toast(tr('license_ok'), 'success');
            await loadLicense();
            renderLicense();
            applyI18n();
        } catch (e) {
            if (err) { err.textContent = e.message || tr('license_invalid'); err.classList.add('visible'); }
        }
    });
    document.getElementById('btn-start-trial')?.addEventListener('click', async () => {
        const err = document.getElementById('license-activate-error');
        err?.classList.remove('visible');
        try {
            await api('/api/license/start-trial', { method: 'POST', body: '{}' });
            closeModal('license-modal');
            toast(tr('trial_ok'), 'success');
            await loadLicense();
            renderLicense();
        } catch (e) {
            if (err) { err.textContent = e.message || tr('trial_used'); err.classList.add('visible'); }
        }
    });
}

function postHost(action) {
    try {
        if (window.chrome?.webview?.postMessage)
            window.chrome.webview.postMessage(JSON.stringify({ action }));
    } catch { }
}

function setupChrome() {
    const isHosted = !!(window.chrome?.webview);
    document.body.classList.toggle('desktop-host', isHosted);
    document.body.classList.toggle('web-client', !isHosted);

    document.getElementById('win-min')?.addEventListener('click', () => postHost('minimize'));
    document.getElementById('win-max')?.addEventListener('click', () => postHost('maximize'));
    document.getElementById('win-close')?.addEventListener('click', () => postHost('close'));
    // Drag from anywhere on the title bar except interactive controls.
    // When maximized, the host restores under the cursor so the window can move across monitors.
    const titlebar = document.getElementById('titlebar');
    if (titlebar) {
        titlebar.addEventListener('mousedown', e => {
            if (e.button !== 0) return;
            if (e.target.closest('button, a, input, select, textarea, .tb-user, .tb-btn, .win-btn')) return;
            postHost('drag');
        });
        titlebar.addEventListener('dblclick', e => {
            if (e.target.closest('button, a, input, select, textarea, .tb-user, .tb-btn, .win-btn')) return;
            postHost('maximize');
        });
    }
    try {
        if (window.chrome?.webview) {
            window.chrome.webview.addEventListener('message', ev => {
                let data = ev.data;
                if (typeof data === 'string') {
                    try { data = JSON.parse(data); } catch { return; }
                }
                if (data?.type === 'windowState') {
                    const icon = document.getElementById('win-max-icon');
                    if (icon) icon.textContent = data.maximized ? 'filter_none' : 'crop_square';
                }
                if (data?.type === 'printers') {
                    fillBarcodePrinterSelect(data.printers || [], data.defaultPrinter || '');
                }
                if (data?.type === 'printResult') {
                    if (data.ok) toast(tr('print_sent'));
                    else toast(data.message || tr('print_failed'), 'error');
                }
            });
        }
    } catch { }
}

let calcExpr = '0';
function updateCalcDisplay() {
    const el = document.getElementById('calc-display');
    if (el) el.textContent = calcExpr;
}
function calcPress(key) {
    if (key === 'C') { calcExpr = '0'; updateCalcDisplay(); return; }
    if (key === '±') {
        if (calcExpr.startsWith('-')) calcExpr = calcExpr.slice(1);
        else if (calcExpr !== '0') calcExpr = '-' + calcExpr;
        updateCalcDisplay(); return;
    }
    if (key === '%') {
        try { calcExpr = String(Function('"use strict";return (' + calcExpr + ')/100')()); } catch { calcExpr = '0'; }
        updateCalcDisplay(); return;
    }
    if (key === '=') {
        try {
            const safe = calcExpr.replace(/[^0-9+\-*/().%\s]/g, '');
            calcExpr = String(Function('"use strict";return (' + safe + ')')());
        } catch { calcExpr = 'Error'; }
        updateCalcDisplay(); return;
    }
    if (calcExpr === '0' || calcExpr === 'Error') calcExpr = /[0-9.]/.test(key) ? key : '0' + key;
    else calcExpr += key;
    updateCalcDisplay();
}

const NOTIF_DISMISS_KEY = 'panache_dismissed_notifs';

function notifKey(n) {
    return `${n.type || ''}|${n.title || ''}|${n.message || ''}`;
}

function loadDismissedNotifs() {
    try {
        const raw = localStorage.getItem(NOTIF_DISMISS_KEY);
        const arr = raw ? JSON.parse(raw) : [];
        return new Set(Array.isArray(arr) ? arr : []);
    } catch { return new Set(); }
}

function saveDismissedNotifs(set) {
    localStorage.setItem(NOTIF_DISMISS_KEY, JSON.stringify([...set]));
}

function filterActiveNotifications(list) {
    const dismissed = loadDismissedNotifs();
    return (list || []).filter(n => !dismissed.has(notifKey(n)));
}

function dismissNotification(key) {
    const dismissed = loadDismissedNotifs();
    dismissed.add(key);
    saveDismissedNotifs(dismissed);
}

function dismissAllNotifications(list) {
    const dismissed = loadDismissedNotifs();
    (list || []).forEach(n => dismissed.add(notifKey(n)));
    saveDismissedNotifs(dismissed);
}

function renderNotificationList(list) {
    const box = document.getElementById('notif-list');
    const clearAllBtn = document.getElementById('btn-notif-clear-all');
    if (!box) return;
    const active = filterActiveNotifications(list);
    if (clearAllBtn) clearAllBtn.hidden = !active.length;
    if (!active.length) {
        box.innerHTML = `<div class="empty-state">${tr('no_notifications')}</div>`;
        return;
    }
    box.innerHTML = active.map(n => {
        const key = notifKey(n);
        const enc = encodeURIComponent(key);
        return `<div class="notif-item">
            <div class="notif-item-body">
                <strong>${escapeHtml(n.title || n.type || '')}</strong>
                <p>${escapeHtml(n.message || '')}</p>
            </div>
            <button type="button" class="btn-icon notif-clear-one" data-dismiss-notif="${enc}" title="${escapeHtml(tr('clear_notification'))}">
                <span class="material-symbols-rounded">delete</span>
            </button>
        </div>`;
    }).join('');
    box.querySelectorAll('[data-dismiss-notif]').forEach(btn => {
        btn.onclick = () => {
            dismissNotification(decodeURIComponent(btn.dataset.dismissNotif));
            renderNotificationList(list);
            refreshNotifications();
        };
    });
}

async function refreshNotifications() {
    const badge = document.getElementById('notif-badge');
    try {
        const list = await api('/api/notifications');
        const active = filterActiveNotifications(list);
        if (badge) {
            if (active.length) { badge.hidden = false; badge.textContent = String(active.length); }
            else badge.hidden = true;
        }
        return list || [];
    } catch {
        if (badge) badge.hidden = true;
        return [];
    }
}

async function openNotifications() {
    const list = await refreshNotifications();
    renderNotificationList(list);
    openModal('notif-modal');
}

async function openBackupModal() {
    try {
        const st = await api('/api/backup/status');
        const status = document.getElementById('backup-status');
        if (status) {
            status.textContent = st.lastBackup
                ? `${tr('tool_backup')}: ${formatDate(st.lastBackup)}`
                : tr('backup_none');
        }
        const files = document.getElementById('backup-files');
        if (files) {
            files.innerHTML = (st.files || []).map(f =>
                `<div class="backup-file-row">
                    <span>${escapeHtml(f.name)} · ${formatDate(f.modified)}</span>
                    <button type="button" class="btn btn-secondary btn-sm" data-restore="${escapeHtml(f.name)}">${tr('restore_backup')}</button>
                </div>`).join('') || '';
            files.querySelectorAll('[data-restore]').forEach(btn => {
                btn.onclick = async () => {
                    const fileName = btn.getAttribute('data-restore');
                    if (!await confirmDialog(tr('confirm_restore'), { danger: false, confirmText: tr('restore_backup') })) return;
                    try {
                        await api('/api/backup/restore', { method: 'POST', body: JSON.stringify({ fileName }) });
                        toast(tr('saved_ok'), 'success');
                        closeModal('backup-modal');
                        await loadData();
                    } catch (e) { toast(e.message, 'error'); }
                };
            });
        }
    } catch (e) {
        document.getElementById('backup-status').textContent = e.message;
    }
    openModal('backup-modal');
}

function setupTools() {
    document.getElementById('btn-notif')?.addEventListener('click', openNotifications);
    document.getElementById('btn-notif-clear-all')?.addEventListener('click', async () => {
        const list = await refreshNotifications();
        const active = filterActiveNotifications(list);
        if (!active.length) return;
        if (!await confirmDialog(tr('confirm_clear_notifications'), { danger: true, confirmText: tr('clear_all_notifications') })) return;
        dismissAllNotifications(active);
        renderNotificationList(list);
        refreshNotifications();
    });
    document.getElementById('btn-calc')?.addEventListener('click', () => {
        calcExpr = '0'; updateCalcDisplay(); openModal('calc-modal');
    });
    document.getElementById('btn-backup')?.addEventListener('click', openBackupModal);
    document.getElementById('btn-about')?.addEventListener('click', () => openModal('about-modal'));
    document.getElementById('btn-contact-support')?.addEventListener('click', () => {
        const mail = 'mailto:softioservices@gmail.com';
        try {
            if (window.chrome?.webview?.postMessage)
                window.chrome.webview.postMessage(JSON.stringify({ action: 'openUrl', url: mail }));
            else
                window.open(mail, '_blank');
        } catch {
            toast('softioservices@gmail.com', 'success');
        }
    });
    document.getElementById('btn-lock')?.addEventListener('click', () => {
        const ov = document.getElementById('lock-overlay');
        if (ov) { ov.hidden = false; document.getElementById('lock-pass').value = ''; document.getElementById('lock-pass').focus(); }
    });
    document.getElementById('lock-form')?.addEventListener('submit', async e => {
        e.preventDefault();
        const err = document.getElementById('lock-error');
        err?.classList.remove('visible');
        try {
            await api('/api/verify-password', {
                method: 'POST',
                body: JSON.stringify({
                    username: currentUser?.username || '',
                    password: document.getElementById('lock-pass').value
                })
            });
            document.getElementById('lock-overlay').hidden = true;
        } catch {
            if (err) { err.textContent = tr('unlock_fail'); err.classList.add('visible'); }
        }
    });
    document.querySelectorAll('[data-calc]').forEach(btn => {
        btn.addEventListener('click', () => calcPress(btn.getAttribute('data-calc')));
    });
    document.getElementById('btn-backup-export')?.addEventListener('click', async () => {
        try {
            const res = await fetch(API + '/api/backup/export');
            if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || res.statusText);
            const blob = await res.blob();
            const cd = res.headers.get('Content-Disposition') || '';
            const m = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/i.exec(cd);
            const name = m ? m[1].replace(/['"]/g, '') : `backup_${Date.now()}.db`;
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = name;
            a.click();
            URL.revokeObjectURL(a.href);
            toast(tr('backup_export_ok'), 'success');
            openBackupModal();
        } catch (e) { toast(e.message || tr('backup_fail'), 'error'); }
    });
    document.getElementById('btn-backup-import')?.addEventListener('click', () => {
        document.getElementById('backup-import-file')?.click();
    });
    document.getElementById('backup-import-file')?.addEventListener('change', async (e) => {
        const file = e.target.files?.[0];
        e.target.value = '';
        if (!file) return;
        if (!await confirmDialog(tr('confirm_restore'), { danger: true, confirmText: tr('import') })) return;
        try {
            const fd = new FormData();
            fd.append('file', file);
            const res = await fetch(API + '/api/backup/import', { method: 'POST', body: fd });
            if (!res.ok) {
                let err = res.statusText;
                try { const j = await res.json(); err = j.error || j.title || err; } catch {}
                throw new Error(err);
            }
            toast(tr('backup_import_ok'), 'success');
            closeModal('backup-modal');
            await loadData();
        } catch (err) { toast(err.message, 'error'); }
    });
    document.getElementById('btn-backup-factory')?.addEventListener('click', async () => {
        if (!await confirmDialog(tr('confirm_factory_1'), { danger: true, confirmText: tr('factory_reset') })) return;
        if (!await confirmDialog(tr('confirm_factory_2'), { danger: true, confirmText: tr('factory_reset') })) return;
        try {
            await api('/api/backup/factory-reset', { method: 'POST', body: '{}' });
            toast(tr('factory_ok'), 'success');
            closeModal('backup-modal');
            await loadData();
        } catch (e) { toast(e.message || tr('factory_fail'), 'error'); }
    });
    document.getElementById('btn-open-backup')?.addEventListener('click', async () => {
        try { await api('/api/backup/open-folder', { method: 'POST', body: '{}' }); }
        catch (e) { toast(e.message, 'error'); }
    });
}

function setupSignalR() {
    if (!window.signalR) return;
    const connection = new signalR.HubConnectionBuilder().withUrl('/hubs/inventory').withAutomaticReconnect().build();
    connection.on('InventoryChanged', () => loadData());
    connection.on('SaleCompleted', () => loadData());
    connection.on('StockUpdated', () => loadData());
    connection.on('ScaleWeight', (payload) => scaleManager.onWeight(payload));
    connection.on('ScaleStatus', (payload) => scaleManager.onStatus(payload));
    connection.start().catch(() => setTimeout(setupSignalR, 5000));
}

const scaleManager = {
    pending: null, // { weightKg, linePrice, productId } after Read / manual entry
    manualMode: false,

    async init() {
        document.getElementById('btnScaleSettings')?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const settings = document.getElementById('scaleSettings');
            const panel = document.getElementById('scalePanel');
            if (!settings) return;
            const opening = settings.classList.contains('hidden');
            settings.classList.toggle('hidden', !opening);
            if (panel) panel.classList.toggle('settings-open', opening);
        });
        document.getElementById('btnScaleConnect')?.addEventListener('click', () => this.connect());
        document.getElementById('btnScaleDisconnect')?.addEventListener('click', () => this.disconnect());
        document.getElementById('btnScaleTare')?.addEventListener('click', () => this.tare());
        document.getElementById('btnScaleZero')?.addEventListener('click', () => this.zero());
        document.getElementById('btnScaleRequest')?.addEventListener('click', () => this.requestWeight());
        document.getElementById('btnScaleSimulate')?.addEventListener('click', () => this.simulate(0.525));
        document.getElementById('btnScaleAddWeighed')?.addEventListener('click', () => this.addWeighedProduct());
        document.getElementById('btnScaleClearProduct')?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.clearSelectedProduct();
        });
        const manual = document.getElementById('scaleManualWeight');
        if (manual) {
            manual.addEventListener('input', () => this.onManualWeightInput());
            manual.addEventListener('change', () => this.onManualWeightInput());
        }
        await this.refreshPorts();
        await this.refreshStatus();
        this.renderSelected();
        this.updateManualHint();
        setInterval(() => this.refreshStatus(true), 4000);
    },

    getSelectedProduct() {
        if (!lastTappedProductId) return null;
        const p = products.find(x => x.id === lastTappedProductId);
        return p && isSellByWeight(p) ? p : null;
    },

    clearSelectedProduct() {
        lastTappedProductId = null;
        this.pending = null;
        this.manualMode = false;
        this.setManualWeight(0);
        const nameEl = document.getElementById('scaleSelectedName');
        const rateEl = document.getElementById('scaleSelectedRate');
        if (nameEl) nameEl.textContent = '';
        if (rateEl) rateEl.textContent = '';
        this.renderSelected();
        this.renderCalc(0, false);
        this.updateManualHint();
        // Refresh cards so weigh highlight is cleared (don't re-select)
        const grid = document.getElementById('pos-products');
        if (grid) {
            grid.querySelectorAll('.pos-product-card.is-scale-selected').forEach(el => {
                el.classList.remove('is-scale-selected');
            });
        }
    },

    selectForWeighing(p) {
        lastTappedProductId = p?.id ?? null;
        this.pending = null;
        this.manualMode = !scaleState.connected;
        this.setManualWeight(0);
        this.renderSelected();
        this.renderCalc(0, false);
        this.updateManualHint();
        toast(tr('weigh_first'), 'info');
    },

    setSelectedProduct(p) {
        this.selectForWeighing(p);
    },

    setManualWeight(kg) {
        const el = document.getElementById('scaleManualWeight');
        if (el) el.value = Number(kg || 0).toFixed(3);
    },

    getManualWeight() {
        const el = document.getElementById('scaleManualWeight');
        const v = Number(el?.value);
        return Number.isFinite(v) ? Math.max(0, v) : 0;
    },

    onManualWeightInput() {
        this.manualMode = true;
        const product = this.getSelectedProduct();
        const weightKg = this.getManualWeight();
        if (!product) {
            this.pending = null;
            this.renderCalc(weightKg, false);
            return;
        }
        if (weightKg <= 0) {
            this.pending = null;
            this.renderCalc(0, false);
            return;
        }
        this.pending = {
            productId: product.id,
            weightKg,
            linePrice: this.calcLinePrice(product, weightKg),
            source: 'manual'
        };
        this.renderCalc(weightKg, true);
    },

    commitPendingFromWeight(weightKg, source = 'scale') {
        const product = this.getSelectedProduct();
        if (!product || weightKg <= 0) {
            this.pending = null;
            return false;
        }
        this.pending = {
            productId: product.id,
            weightKg,
            linePrice: this.calcLinePrice(product, weightKg),
            source
        };
        return true;
    },

    weightKgNow() {
        if (this.manualMode) return this.getManualWeight();
        let weight = Number(scaleState.weight || 0);
        const unit = (scaleState.unit || 'kg').toLowerCase();
        if (unit === 'g') weight = weight / 1000;
        return weight;
    },

    calcLinePrice(product, weightKg) {
        const unitPrice = Number(product?.price) || 0;
        return Math.round(unitPrice * weightKg * 100) / 100;
    },

    updateManualHint() {
        const hint = document.getElementById('scaleManualHint');
        if (!hint) return;
        hint.textContent = scaleState.connected ? tr('scale_manual_hint') : tr('scale_offline_manual');
    },

    async refreshPorts() {
        try {
            const ports = await api('/api/scale/ports');
            const sel = document.getElementById('scalePortSelect');
            if (!sel) return;
            const current = sel.value || scaleState.port;
            sel.innerHTML = '';
            (ports || []).forEach(p => {
                const opt = document.createElement('option');
                opt.value = p;
                opt.textContent = p;
                sel.appendChild(opt);
            });
            if (current) sel.value = current;
        } catch { }
    },

    async refreshStatus(silent = false) {
        try {
            const data = await api('/api/scale/status');
            this.applyState(data);
            const baud = document.getElementById('scaleBaudSelect');
            const auto = document.getElementById('scaleAutoConnect');
            const port = document.getElementById('scalePortSelect');
            if (baud && data.baudRate) baud.value = String(data.baudRate);
            if (auto) auto.checked = !!data.autoConnect;
            if (port && data.port) {
                if (![...port.options].some(o => o.value === data.port)) {
                    const opt = document.createElement('option');
                    opt.value = data.port;
                    opt.textContent = data.port;
                    port.appendChild(opt);
                }
                port.value = data.port;
            }
        } catch {
            if (!silent) this.applyState({ connected: false, weight: 0, unit: 'kg', stable: true });
        }
    },

    applyState(data) {
        if (!data) return;
        scaleState = {
            connected: !!data.connected,
            weight: Number(data.weight || 0),
            unit: data.unit || 'kg',
            stable: data.stable !== false,
            port: data.port || scaleState.port || ''
        };
        this.updateManualHint();
        // Live scale updates fill the input unless cashier is typing manually
        if (!this.manualMode && scaleState.connected) {
            let w = Number(scaleState.weight || 0);
            if ((scaleState.unit || 'kg').toLowerCase() === 'g') w = w / 1000;
            this.setManualWeight(w);
            const product = this.getSelectedProduct();
            if (product && w > 0) this.commitPendingFromWeight(w, 'scale');
        }
        this.render();
    },

    onWeight(payload) { this.applyState({ ...scaleState, ...payload }); },
    onStatus(payload) { this.applyState({ ...scaleState, ...payload }); },

    renderSelected() {
        const empty = document.getElementById('scaleSelectedEmpty');
        const info = document.getElementById('scaleSelectedInfo');
        const nameEl = document.getElementById('scaleSelectedName');
        const rateEl = document.getElementById('scaleSelectedRate');
        const panel = document.getElementById('scalePanel');
        const p = this.getSelectedProduct();
        if (!p) {
            if (panel) panel.classList.add('is-collapsed');
            if (empty) {
                empty.hidden = false;
                empty.style.display = '';
            }
            if (info) {
                info.hidden = true;
                info.style.display = 'none';
            }
            if (nameEl) nameEl.textContent = '';
            if (rateEl) rateEl.textContent = '';
            return;
        }
        if (panel) panel.classList.remove('is-collapsed');
        if (empty) {
            empty.hidden = true;
            empty.style.display = 'none';
        }
        if (info) {
            info.hidden = false;
            info.style.display = 'flex';
        }
        if (nameEl) nameEl.textContent = p.name;
        if (rateEl) rateEl.textContent = `${tr('scale_selected')}: ${formatPosPrice(p)}`;
    },

    renderCalc(weightKg, locked = false) {
        const calcEl = document.getElementById('scaleCalcPrice');
        const p = this.getSelectedProduct();
        if (!calcEl) return;
        if (!p) {
            calcEl.textContent = money(0);
            calcEl.classList.remove('is-ready');
            return;
        }
        const w = weightKg != null ? weightKg : (this.pending?.weightKg ?? this.getManualWeight());
        const price = this.calcLinePrice(p, Math.max(0, w));
        calcEl.textContent = money(price);
        calcEl.classList.toggle('is-ready', locked || (this.pending && this.pending.productId === p.id && w > 0));
    },

    render() {
        const dot = document.getElementById('scaleDot');
        const text = document.getElementById('scaleStatusText');
        if (dot) {
            dot.classList.toggle('on', scaleState.connected && scaleState.stable);
            dot.classList.toggle('unstable', scaleState.connected && !scaleState.stable);
        }
        if (text) {
            if (scaleState.connected) {
                if (scaleState.stable) {
                    text.textContent = scaleState.port
                        ? `${tr('scale_online')} · ${scaleState.port}`
                        : tr('scale_online');
                } else {
                    text.textContent = tr('scale_unstable');
                }
            } else {
                text.textContent = tr('scale_offline');
            }
        }
        const displayW = this.pending ? this.pending.weightKg : this.getManualWeight();
        this.renderSelected();
        this.renderCalc(displayW, !!this.pending);
        this.updateManualHint();
    },

    async connect() {
        const port = document.getElementById('scalePortSelect')?.value || '';
        const baudRate = Number(document.getElementById('scaleBaudSelect')?.value || 9600);
        const autoConnect = !!document.getElementById('scaleAutoConnect')?.checked;
        try {
            await api('/api/scale/config', {
                method: 'POST',
                body: JSON.stringify({ portName: port, baudRate, autoConnect, defaultUnit: 'kg' })
            });
            await api('/api/scale/connect', {
                method: 'POST',
                body: JSON.stringify({ port, baudRate })
            });
            toast(tr('scale_connected'), 'success');
            await this.refreshStatus();
        } catch (e) {
            toast(e.message || tr('scale_connect_failed'), 'error');
        }
    },

    async disconnect() {
        try {
            await api('/api/scale/disconnect', { method: 'POST', body: '{}' });
            toast(tr('scale_disconnected'), 'success');
            await this.refreshStatus();
        } catch (e) { toast(e.message || tr('scale_api_unavailable'), 'error'); }
    },

    async tare() {
        try {
            await api('/api/scale/tare', { method: 'POST', body: '{}' });
            this.pending = null;
            await this.refreshStatus();
        } catch (e) { toast(e.message || tr('scale_api_unavailable'), 'error'); }
    },

    async zero() {
        try {
            await api('/api/scale/zero', { method: 'POST', body: '{}' });
            this.pending = null;
            await this.refreshStatus();
        } catch (e) { toast(e.message || tr('scale_api_unavailable'), 'error'); }
    },

    async requestWeight() {
        const product = this.getSelectedProduct();
        if (!product) {
            toast(tr('weigh_need_product'), 'error');
            return;
        }
        try {
            this.manualMode = false;
            const data = await api('/api/scale/request', { method: 'POST', body: '{}' });
            this.applyState({ ...scaleState, ...data, connected: scaleState.connected || !!data.success });
            let weightKg = Number(scaleState.weight || 0);
            if ((scaleState.unit || 'kg').toLowerCase() === 'g') weightKg = weightKg / 1000;
            this.setManualWeight(weightKg);
            if (weightKg <= 0) {
                this.pending = null;
                toast(tr('weigh_need_scale'), 'error');
                this.render();
                return;
            }
            this.commitPendingFromWeight(weightKg, 'scale');
            this.render();
            toast(tr('scale_weighed_toast')
                .replace('{0}', product.name)
                .replace('{1}', weightKg.toFixed(3))
                .replace('{2}', tr('unit_kg'))
                .replace('{3}', money(this.pending.linePrice)), 'success');
        } catch (e) {
            // Scale failed — fall back to whatever is typed in the manual field
            this.manualMode = true;
            const w = this.getManualWeight();
            if (w > 0) {
                this.commitPendingFromWeight(w, 'manual');
                this.render();
                toast(tr('scale_weighed_toast')
                    .replace('{0}', product.name)
                    .replace('{1}', w.toFixed(3))
                    .replace('{2}', tr('unit_kg'))
                    .replace('{3}', money(this.pending.linePrice)), 'success');
            } else {
                toast(tr('scale_offline_manual'), 'info');
                document.getElementById('scaleManualWeight')?.focus();
            }
        }
    },

    async simulate(weight = 0.525) {
        try {
            await api('/api/scale/simulate', {
                method: 'POST',
                body: JSON.stringify({ weight, unit: 'kg', stable: true })
            });
            toast(tr('scale_simulated').replace('{0}', String(weight)).replace('{1}', tr('unit_kg')), 'success');
            this.manualMode = false;
            await this.refreshStatus();
            const product = this.getSelectedProduct();
            this.setManualWeight(weight);
            if (product) {
                this.commitPendingFromWeight(weight, 'scale');
                this.render();
            }
        } catch (e) {
            // No scale API — still allow Sim as manual fill
            this.manualMode = true;
            this.setManualWeight(weight);
            this.onManualWeightInput();
            toast(tr('scale_manual_set').replace('{0}', String(weight)).replace('{1}', tr('unit_kg')), 'success');
        }
    },

    addWeighedProduct() {
        const product = this.getSelectedProduct();
        if (!product) {
            toast(tr('weigh_need_product'), 'error');
            return;
        }
        // Prefer pending; otherwise use typed manual weight
        let weight = this.pending?.productId === product.id ? this.pending.weightKg : this.getManualWeight();
        if (!(weight > 0)) {
            toast(tr('weigh_need_read'), 'error');
            document.getElementById('scaleManualWeight')?.focus();
            return;
        }
        const linePrice = this.calcLinePrice(product, weight);
        const stockQty = Math.max(1, Math.round(weight * 1000));
        const ok = addToCart(product.id, 1, {
            name: `${product.name} (${weight.toFixed(3)} ${tr('unit_kg')})`,
            price: linePrice,
            lineKey: `${product.id}-w-${Date.now()}`,
            weighted: true,
            weightKg: weight,
            stockQty
        });
        if (ok === false) return;
        toast(tr('weigh_added').replace('{0}', product.name).replace('{1}', weight.toFixed(3)), 'success');
        this.pending = null;
        this.setManualWeight(0);
        this.render();
        renderCart();
    },

    async resolveBarcode(code) {
        try {
            const res = await fetch('/api/scale/resolve-barcode', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ barcode: code })
            });
            if (res.status === 404) {
                const err = await res.json().catch(() => ({}));
                if (err.isScaleBarcode) {
                    toast(err.error || 'Scale PLU not found', 'error');
                    return true;
                }
                return false;
            }
            if (!res.ok) return false;
            const data = await res.json();
            if (!data.isScaleBarcode) return false;
            const p = data.product;
            const line = data.line;
            if (!products.some(x => x.id === p.id)) {
                products.push({
                    id: p.id, name: p.name, price: p.price, stock: p.stock,
                    isService: p.isService, barcode: p.barcode, sku: p.sku,
                    sellByWeight: true
                });
            }
            addToCart(p.id, line.qty || 1, {
                name: line.name,
                price: line.price,
                lineKey: `${p.id}-scale-${code}-${Date.now()}`,
                weighted: true,
                weightKg: line.weightKg || data.weightKg || 0,
                stockQty: line.stockQty || 0
            });
            toast(line.name, 'success');
            return true;
        } catch {
            return false;
        }
    }
};

document.addEventListener('DOMContentLoaded', async () => {
    try {
        applyI18n();
        setupChrome();
        setupNavigation();
        setupAuth();
        try { setupActions(); } catch (e) { console.error('setupActions', e); }
        try { setupTools(); } catch (e) { console.error('setupTools', e); }
        try { setupSignalR(); } catch (e) { console.error('setupSignalR', e); }
        try { await scaleManager.init(); } catch (e) { console.error('scaleManager', e); }

        const saved = sessionStorage.getItem('panache_user') || sessionStorage.getItem('otargi_user');
        if (saved) {
            try {
                currentUser = JSON.parse(saved);
                showApp();
                await loadData();
            } catch {
                sessionStorage.removeItem('panache_user');
                sessionStorage.removeItem('otargi_user');
            }
        }
    } catch (e) {
        console.error('boot failed', e);
        toast('UI failed to start: ' + e.message, 'error');
    } finally {
        // Paint one frame with styles applied, then reveal (host hides splash)
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                document.body.classList.add('ui-ready');
                try {
                    if (window.chrome?.webview?.postMessage)
                        window.chrome.webview.postMessage(JSON.stringify({ action: 'uiReady' }));
                } catch { }
            });
        });
    }
});

window.showApp = showApp;
window.hideApp = hideApp;
window.loadData = loadData;
window.applyI18n = applyI18n;
