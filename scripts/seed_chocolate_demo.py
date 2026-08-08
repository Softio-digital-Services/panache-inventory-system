#!/usr/bin/env python3
"""Seed Panache with a full chocolate-shop demo dataset."""
from __future__ import annotations

import sqlite3
from datetime import date, datetime, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DB_PATHS = [
    ROOT / "bin" / "Debug" / "net8.0-windows" / "win-x64" / "Data" / "inventory.db",
    ROOT / "dist" / "app" / "Data" / "inventory.db",
]

CATEGORIES = [
    ("Bulk Chocolate", "Sold by weight ($/kg)"),
    ("Chocolate Bars", "Fixed-price bars"),
    ("Gift Boxes", "Assorted gift packs"),
    ("Drinks", "Hot chocolate & drinks"),
    ("General", "Misc items"),
]

SUPPLIERS = [
    ("SUP-BEAN", "Cocoa Bean Traders", "Maya Haddad", "maya@cocoabean.test", "+96171110001", "Beirut Port, Lebanon", "Wholesaler"),
    ("SUP-SWISS", "Alpine Cocoa AG", "Jonas Meier", "jonas@alpinecocoa.test", "+41112223344", "Zurich, Switzerland", "Importer"),
    ("SUP-LOCAL", "Levant Sweets Co", "Rami Khoury", "rami@levantsweets.test", "+96171110002", "Tripoli, Lebanon", "Local"),
]

CUSTOMERS = [
    ("Walk-in Guest", "", "", "", "Cash", 0, 0),
    ("Nour Bakery", "+96170111001", "nour@bakery.test", "Hamra, Beirut", "Wholesale", 45.50, 500),
    ("Hotel Panorama", "+96170111002", "purchasing@panorama.test", "Raouche, Beirut", "Corporate", 120.00, 2000),
    ("Sara Alami", "+96170111003", "sara.alami@email.test", "Achrafieh", "Retail", 0, 300),
    ("Chocolat Cafe", "+96170111004", "orders@chocolatcafe.test", "Verdun", "Wholesale", 18.75, 800),
    ("Karim Farhat", "+96170111005", "karim@email.test", "Jounieh", "Retail", 0, 200),
    ("Softio Events", "+96170111006", "events@softio.test", "Downtown Beirut", "Corporate", 0, 1500),
]

# name, sku, barcode, category, supplier_code, cost, price, stock, min, uom, sell_by_weight, desc, location, shelf
# weight products: stock in grams; price = $/kg
PRODUCTS = [
    ("Dark 70% Bulk", "CH-DK70", "2000000007012", "Bulk Chocolate", "SUP-BEAN", 22.00, 40.00, 12500, 1000, "kg", 1, "Dark couverture 70% cacao — sell by weight", "Cool Room", "A1"),
    ("Milk Chocolate Bulk", "CH-MLK", "2000000007029", "Bulk Chocolate", "SUP-BEAN", 16.00, 28.00, 10000, 1000, "kg", 1, "Creamy milk chocolate — sell by weight", "Cool Room", "A2"),
    ("White Chocolate Bulk", "CH-WHT", "2000000007036", "Bulk Chocolate", "SUP-SWISS", 18.00, 32.00, 8000, 800, "kg", 1, "White chocolate — sell by weight", "Cool Room", "A3"),
    ("Hazelnut Praline Bulk", "CH-HAZ", "2000000007043", "Bulk Chocolate", "SUP-SWISS", 26.00, 48.00, 6000, 500, "kg", 1, "Hazelnut praline — sell by weight", "Cool Room", "A4"),
    ("Ruby Chocolate Bulk", "CH-RUBY", "2000000007050", "Bulk Chocolate", "SUP-SWISS", 30.00, 55.00, 4500, 500, "kg", 1, "Ruby chocolate — sell by weight", "Cool Room", "A5"),
    ("Caramel Crunch Bulk", "CH-CAR", "2000000007067", "Bulk Chocolate", "SUP-LOCAL", 20.00, 36.00, 7000, 700, "kg", 1, "Caramel crunch — sell by weight", "Cool Room", "A6"),
    ("Dark Bar 100g", "BAR-DK100", "8900000001011", "Chocolate Bars", "SUP-LOCAL", 1.20, 2.50, 120, 20, "pcs", 0, "100g dark chocolate bar", "Shelf", "B1"),
    ("Milk Bar 100g", "BAR-ML100", "8900000001028", "Chocolate Bars", "SUP-LOCAL", 1.00, 2.25, 150, 20, "pcs", 0, "100g milk chocolate bar", "Shelf", "B2"),
    ("Hazelnut Bar 100g", "BAR-HZ100", "8900000001035", "Chocolate Bars", "SUP-LOCAL", 1.40, 2.95, 90, 15, "pcs", 0, "100g hazelnut bar", "Shelf", "B3"),
    ("Assorted Gift Box S", "GIFT-S", "8900000002018", "Gift Boxes", "SUP-LOCAL", 8.00, 15.00, 40, 5, "box", 0, "Small gift assortment", "Front", "C1"),
    ("Assorted Gift Box L", "GIFT-L", "8900000002025", "Gift Boxes", "SUP-LOCAL", 18.00, 32.00, 25, 4, "box", 0, "Large gift assortment", "Front", "C2"),
    ("Hot Chocolate Mix", "DRK-HOT", "8900000003015", "Drinks", "SUP-BEAN", 4.50, 9.00, 60, 10, "pack", 0, "Premium hot chocolate mix pack", "Shelf", "D1"),
    ("Cocoa Dusting Powder", "GEN-DUST", "8900000004012", "General", "SUP-BEAN", 3.00, 6.50, 35, 8, "pcs", 0, "Decorative cocoa powder tin", "Shelf", "E1"),
    ("Gift Wrapping Service", "SVC-WRAP", "SVC-WRAP-01", "General", None, 0, 2.00, 0, 0, "pcs", 0, "Gift wrapping at checkout", "Counter", "—"),
]

EXPENSE_CATEGORIES = [
    "Rent",
    "Utilities",
    "Packaging",
    "Marketing",
    "Salaries",
    "Transport",
]

EXPENSES = [
    ("Rent", 1200.00, "Shop monthly rent", "admin", 1, 1),
    ("Utilities", 185.50, "Electricity & water", "admin", 1, 0),
    ("Packaging", 95.00, "Boxes & ribbons restock", "staff", 1, 0),
    ("Marketing", 150.00, "Instagram ads — March", "admin", 1, 0),
    ("Transport", 40.00, "Supplier pickup", "staff", 0, 0),
]


def ensure_column(c: sqlite3.Connection, table: str, column: str, decl: str) -> None:
    cols = {r[1] for r in c.execute(f"PRAGMA table_info({table})")}
    if column not in cols:
        c.execute(f"ALTER TABLE {table} ADD COLUMN {decl}")


def upsert_category(c: sqlite3.Connection, name: str, desc: str) -> int:
    row = c.execute("SELECT id FROM categories WHERE category_name = ?", (name,)).fetchone()
    if row:
        c.execute("UPDATE categories SET description = ? WHERE id = ?", (desc, row[0]))
        return row[0]
    cur = c.execute(
        "INSERT INTO categories (category_name, description) VALUES (?, ?)",
        (name, desc),
    )
    return cur.lastrowid


def upsert_supplier(c: sqlite3.Connection, code, name, contact, email, phone, address, stype) -> int:
    row = c.execute(
        "SELECT id FROM suppliers WHERE supplier_code = ? OR supplier_name = ?",
        (code, name),
    ).fetchone()
    if row:
        c.execute(
            """UPDATE suppliers SET supplier_code=?, supplier_name=?, contact_person=?, email=?, phone=?,
               address=?, type=?, status='Active', date_deleted=NULL WHERE id=?""",
            (code, name, contact, email, phone, address, stype, row[0]),
        )
        return row[0]
    cur = c.execute(
        """INSERT INTO suppliers (supplier_code, supplier_name, contact_person, email, phone, address, type, status)
           VALUES (?, ?, ?, ?, ?, ?, ?, 'Active')""",
        (code, name, contact, email, phone, address, stype),
    )
    return cur.lastrowid


def upsert_customer(c: sqlite3.Connection, name, phone, email, address, ctype, balance, limit_) -> int:
    row = c.execute("SELECT customer_id FROM customers WHERE full_name = ?", (name,)).fetchone()
    if row:
        c.execute(
            """UPDATE customers SET phone=?, email=?, address=?, type=?, current_balance=?, credit_limit=?,
               status='Active', date_deleted=NULL WHERE customer_id=?""",
            (phone, email, address, ctype, balance, limit_, row[0]),
        )
        return row[0]
    cur = c.execute(
        """INSERT INTO customers (full_name, phone, email, address, type, current_balance, credit_limit, status)
           VALUES (?, ?, ?, ?, ?, ?, ?, 'Active')""",
        (name, phone, email, address, ctype, balance, limit_),
    )
    return cur.lastrowid


def upsert_product(c: sqlite3.Connection, p, cat_id: int, sup_id) -> int:
    name, sku, barcode, _cat, _sup, cost, price, stock, min_stock, uom, by_w, desc, loc, shelf = p
    item_type = "Service" if sku.startswith("SVC-") else "Product"
    tracked = 0 if item_type == "Service" else 1
    row = c.execute(
        "SELECT id FROM parts WHERE part_number = ? OR barcode = ? OR part_name = ?",
        (sku, barcode, name),
    ).fetchone()
    vals = (
        name, sku, desc, cat_id, sup_id, cost, price, stock, min_stock, 10,
        loc, shelf, barcode, "Active", item_type, uom, 1, 1 if item_type == "Product" else 0,
        0, 0, tracked, by_w, price * 0.95, price * 0.9, price * 0.85,
    )
    if row:
        c.execute(
            """UPDATE parts SET part_name=?, part_number=?, description=?, category_id=?, supplier_id=?,
               purchase_price=?, selling_price=?, quantity_in_stock=?, minimum_stock_level=?, reorder_quantity=?,
               location=?, shelf=?, barcode=?, status=?, item_type=?, unit_of_measure=?,
               is_sales_item=?, is_purchase_item=?, is_inactive=?, tax_rate=?, is_stock_tracked=?,
               sell_by_weight=?, price2=?, price3=?, price4=?, date_deleted=NULL WHERE id=?""",
            vals + (row[0],),
        )
        return row[0]
    cur = c.execute(
        """INSERT INTO parts (
             part_name, part_number, description, category_id, supplier_id, purchase_price, selling_price,
             quantity_in_stock, minimum_stock_level, reorder_quantity, location, shelf, barcode, status,
             item_type, unit_of_measure, is_sales_item, is_purchase_item, is_inactive, tax_rate,
             is_stock_tracked, sell_by_weight, price2, price3, price4, date_added
           ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))""",
        vals,
    )
    return cur.lastrowid


def seed_expenses(c: sqlite3.Connection) -> None:
    for name in EXPENSE_CATEGORIES:
        exists = c.execute(
            "SELECT 1 FROM expense_categories WHERE category_name = ?", (name,)
        ).fetchone()
        if not exists:
            c.execute("INSERT INTO expense_categories (category_name) VALUES (?)", (name,))

    for cat, amount, desc, by, paid, recurring in EXPENSES:
        exists = c.execute(
            "SELECT 1 FROM expenses WHERE category = ? AND description = ? AND date_deleted IS NULL",
            (cat, desc),
        ).fetchone()
        if exists:
            continue
        c.execute(
            """INSERT INTO expenses (expense_date, category, amount, description, recorded_by, is_paid, is_recurring)
               VALUES (datetime('now'), ?, ?, ?, ?, ?, ?)""",
            (cat, amount, desc, by, paid, recurring),
        )


def seed_sample_sales(c: sqlite3.Connection, product_ids: dict[str, int], customer_ids: dict[str, int]) -> None:
    """A few completed sales so Reports/Dashboard are not empty."""
    already = c.execute(
        "SELECT 1 FROM orders WHERE status='Completed' LIMIT 1"
    ).fetchone()
    if already:
        return

    samples = [
        # days_ago, customer, [(sku, qty, unit_price)]
        (0, "Sara Alami", [("BAR-DK100", 2, 2.50), ("GIFT-S", 1, 15.00)]),
        (1, "Nour Bakery", [("CH-DK70", 1, 21.00)]),  # 0.525kg * 40 ≈ already line total style with qty 1
        (2, "Chocolat Cafe", [("CH-MLK", 1, 14.00), ("BAR-ML100", 10, 2.25)]),
        (3, "Hotel Panorama", [("GIFT-L", 3, 32.00), ("DRK-HOT", 5, 9.00)]),
        (5, None, [("BAR-HZ100", 4, 2.95)]),
    ]
    for days_ago, cust_name, items in samples:
        when = (datetime.now() - timedelta(days=days_ago)).strftime("%Y-%m-%d %H:%M:%S")
        cust_id = customer_ids.get(cust_name) if cust_name else None
        total = sum(q * p for _, q, p in items)
        if cust_id:
            cur = c.execute(
                """INSERT INTO orders (order_date, total_amount, payment_status, amount_paid, customer_id, status)
                   VALUES (?, ?, 'Paid', ?, ?, 'Completed')""",
                (when, total, total, cust_id),
            )
        else:
            cur = c.execute(
                """INSERT INTO orders (order_date, total_amount, payment_status, amount_paid, status)
                   VALUES (?, ?, 'Paid', ?, 'Completed')""",
                (when, total, total),
            )
        oid = cur.lastrowid
        for sku, qty, price in items:
            pid = product_ids.get(sku)
            if not pid:
                continue
            c.execute(
                "INSERT INTO order_items (order_id, part_id, quantity, price) VALUES (?, ?, ?, ?)",
                (oid, pid, qty, price),
            )


def seed_db(path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    c = sqlite3.connect(str(path))
    try:
        ensure_column(c, "parts", "sell_by_weight", "sell_by_weight INTEGER DEFAULT 0")
        ensure_column(c, "parts", "price2", "price2 REAL DEFAULT 0")
        ensure_column(c, "parts", "price3", "price3 REAL DEFAULT 0")
        ensure_column(c, "parts", "price4", "price4 REAL DEFAULT 0")
        ensure_column(c, "parts", "is_stock_tracked", "is_stock_tracked INTEGER DEFAULT 1")

        cat_ids = {name: upsert_category(c, name, desc) for name, desc in CATEGORIES}
        sup_ids = {
            code: upsert_supplier(c, code, name, contact, email, phone, address, stype)
            for code, name, contact, email, phone, address, stype in SUPPLIERS
        }
        cust_ids = {
            name: upsert_customer(c, name, phone, email, address, ctype, bal, lim)
            for name, phone, email, address, ctype, bal, lim in CUSTOMERS
        }

        product_ids = {}
        for p in PRODUCTS:
            cat_id = cat_ids[p[3]]
            sup_code = p[4]
            sup_id = sup_ids.get(sup_code) if sup_code else None
            pid = upsert_product(c, p, cat_id, sup_id)
            product_ids[p[1]] = pid

        seed_expenses(c)
        seed_sample_sales(c, product_ids, cust_ids)
        c.commit()

        print(f"Seeded {path}")
        for table in ("categories", "suppliers", "customers", "parts", "expenses", "orders"):
            n = c.execute(f"SELECT COUNT(*) FROM {table}").fetchone()[0]
            print(f"  {table}: {n}")
        w = c.execute("SELECT COUNT(*) FROM parts WHERE sell_by_weight=1").fetchone()[0]
        print(f"  weighed products: {w}")
    finally:
        c.close()


def main() -> None:
    for path in DB_PATHS:
        if not path.parent.exists() and "dist" in str(path):
            print(f"Skip missing folder: {path}")
            continue
        seed_db(path)


if __name__ == "__main__":
    main()
