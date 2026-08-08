import sqlite3
import random
from datetime import datetime, timedelta
from pathlib import Path

db = Path(__file__).resolve().parents[1] / "bin" / "Debug" / "net8.0-windows" / "win-x64" / "Data" / "inventory.db"
c = sqlite3.connect(str(db))
cur = c.cursor()

cats = [
    ("Dark Chocolate", "Cocoa-rich dark bars"),
    ("Milk Chocolate", "Creamy milk chocolates"),
    ("Gift Boxes", "Assorted gift sets"),
    ("Truffles", "Filled truffles"),
]

cur.execute("DELETE FROM order_items")
cur.execute("DELETE FROM orders")
cur.execute("DELETE FROM parts")
cur.execute("DELETE FROM categories")

cat_ids = {}
for name, desc in cats:
    cur.execute(
        "INSERT INTO categories (category_name, description, date_created) VALUES (?,?,datetime('now'))",
        (name, desc),
    )
    cat_ids[name] = cur.lastrowid

products = [
    ("DK-70", "70% Dark Bar", "Dark Chocolate", 1.20, 3.50, 80, 0),
    ("DK-85", "85% Extra Dark", "Dark Chocolate", 1.50, 4.00, 60, 0),
    ("ML-CL", "Classic Milk Bar", "Milk Chocolate", 0.90, 2.75, 120, 0),
    ("ML-HZ", "Hazelnut Milk", "Milk Chocolate", 1.10, 3.25, 90, 0),
    ("GB-AS", "Assorted Gift Box", "Gift Boxes", 8.00, 22.00, 25, 11),
    ("GB-PR", "Premium Gift Tower", "Gift Boxes", 15.00, 45.00, 12, 11),
    ("TR-VN", "Vanilla Truffle", "Truffles", 0.40, 1.50, 200, 0),
    ("TR-RS", "Rose Truffle", "Truffles", 0.45, 1.75, 180, 0),
    ("DK-OR", "Orange Dark Squares", "Dark Chocolate", 1.00, 3.00, 70, 0),
    ("ML-CR", "Caramel Milk Bar", "Milk Chocolate", 1.05, 3.10, 85, 0),
]

part_ids = []
for sku, name, cat, cost, price, stock, tax in products:
    cur.execute(
        """
        INSERT INTO parts (part_number, part_name, description, category_id, purchase_price, selling_price,
            quantity_in_stock, minimum_stock_level, reorder_quantity, status, date_added,
            item_type, unit_of_measure, is_sales_item, is_purchase_item, is_inactive, tax_rate, is_stock_tracked)
        VALUES (?,?,?,?,?,?,?,?,?,?,datetime('now'),'Product','pc',1,1,0,?,1)
        """,
        (sku, name, name, cat_ids[cat], cost, price, stock, 10, 20, "Active", tax),
    )
    part_ids.append((cur.lastrowid, name, cost, price, tax, cat))

today = datetime.now().date()
order_specs = []
for _ in range(5):
    order_specs.append(today)
for d in range(1, 7):
    for _ in range(2):
        order_specs.append(today - timedelta(days=d))
for d in [10, 15, 20]:
    order_specs.append(today - timedelta(days=d))
for days_ago in [45, 90, 120, 200]:
    order_specs.append(today - timedelta(days=days_ago))

rng = random.Random(42)
order_count = 0
for od in order_specs:
    lines = rng.sample(part_ids, k=rng.randint(1, 4))
    subtotal = 0.0
    line_rows = []
    for pid, pname, cost, price, tax, cat in lines:
        qty = rng.randint(1, 6)
        subtotal += qty * price
        line_rows.append((pid, qty, price))
    apply_vat = rng.random() < 0.4
    vat = round(subtotal * 0.11, 2) if apply_vat else 0.0
    total = round(subtotal + vat, 2)
    ts = f"{od.isoformat()} {rng.randint(9, 18):02d}:{rng.randint(0, 59):02d}:00"
    cur.execute(
        """
        INSERT INTO orders (customer_id, order_date, total_amount, status, payment_status, amount_paid, payment_method)
        VALUES (NULL, ?, ?, 'Completed', 'Paid', ?, 'Cash')
        """,
        (ts, total, total),
    )
    oid = cur.lastrowid
    for pid, qty, price in line_rows:
        cur.execute(
            "INSERT INTO order_items (order_id, part_id, quantity, price) VALUES (?,?,?,?)",
            (oid, pid, qty, price),
        )
    order_count += 1

cur.execute(
    """
    INSERT INTO orders (order_date, total_amount, status, payment_status, amount_paid)
    VALUES (datetime('now'), 99.0, 'Draft', 'Unpaid', 0)
    """
)
draft_id = cur.lastrowid
cur.execute(
    "INSERT INTO order_items (order_id, part_id, quantity, price) VALUES (?,?,?,?)",
    (draft_id, part_ids[0][0], 1, part_ids[0][3]),
)

c.commit()
print(f"DB: {db}")
print(f"Seeded {len(cat_ids)} categories, {len(part_ids)} products, {order_count} completed orders + 1 draft")
print(
    "Orders by date:",
    list(
        cur.execute(
            "SELECT date(order_date), COUNT(*), ROUND(SUM(total_amount),2) FROM orders WHERE status='Completed' GROUP BY 1 ORDER BY 1 DESC LIMIT 8"
        )
    ),
)
print(
    "Top products:",
    list(
        cur.execute(
            """
 SELECT p.part_name, SUM(oi.quantity) q FROM order_items oi
 JOIN orders o ON o.order_id=oi.order_id JOIN parts p ON p.id=oi.part_id
 WHERE o.status='Completed' GROUP BY 1 ORDER BY q DESC LIMIT 5"""
        )
    ),
)
c.close()
