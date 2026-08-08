import sqlite3
from datetime import date, timedelta
from pathlib import Path

db = Path(__file__).resolve().parents[1] / "bin" / "Debug" / "net8.0-windows" / "win-x64" / "Data" / "inventory.db"
c = sqlite3.connect(str(db))
filt = "o.status IS NOT NULL AND o.status NOT IN ('Draft', 'Quotation')"
today = date.today()


def summary(from_d, to_d):
    sales = c.execute(
        f"""
        SELECT COALESCE(SUM(oi.quantity * oi.price), 0)
        FROM order_items oi
        INNER JOIN orders o ON oi.order_id = o.order_id
        WHERE date(o.order_date) BETWEEN date(?) AND date(?) AND {filt}
        """,
        (from_d.isoformat(), to_d.isoformat()),
    ).fetchone()[0]
    cost = c.execute(
        f"""
        SELECT COALESCE(SUM(oi.quantity * COALESCE(p.purchase_price, 0)), 0)
        FROM order_items oi
        INNER JOIN orders o ON oi.order_id = o.order_id
        INNER JOIN parts p ON oi.part_id = p.id
        WHERE date(o.order_date) BETWEEN date(?) AND date(?) AND {filt}
        """,
        (from_d.isoformat(), to_d.isoformat()),
    ).fetchone()[0]
    tax = c.execute(
        f"""
        SELECT COALESCE(SUM(
            CASE WHEN o.total_amount > COALESCE(s.subtotal, 0)
                 THEN o.total_amount - COALESCE(s.subtotal, 0) ELSE 0 END
        ), 0)
        FROM orders o
        LEFT JOIN (
            SELECT order_id, SUM(quantity * price) AS subtotal
            FROM order_items GROUP BY order_id
        ) s ON s.order_id = o.order_id
        WHERE date(o.order_date) BETWEEN date(?) AND date(?) AND {filt}
        """,
        (from_d.isoformat(), to_d.isoformat()),
    ).fetchone()[0]
    products = c.execute(
        f"""
        SELECT COUNT(*) FROM (
            SELECT p.part_name
            FROM order_items oi
            INNER JOIN orders o ON oi.order_id = o.order_id
            INNER JOIN parts p ON oi.part_id = p.id
            WHERE date(o.order_date) BETWEEN date(?) AND date(?) AND {filt}
            GROUP BY p.part_name
        )
        """,
        (from_d.isoformat(), to_d.isoformat()),
    ).fetchone()[0]
    cats = c.execute(
        f"""
        SELECT COUNT(*) FROM (
            SELECT COALESCE(cat.category_name, 'Uncategorized')
            FROM order_items oi
            INNER JOIN orders o ON oi.order_id = o.order_id
            INNER JOIN parts p ON oi.part_id = p.id
            LEFT JOIN categories cat ON p.category_id = cat.id
            WHERE date(o.order_date) BETWEEN date(?) AND date(?) AND {filt}
            GROUP BY 1
        )
        """,
        (from_d.isoformat(), to_d.isoformat()),
    ).fetchone()[0]
    return {
        "sales": round(sales, 2),
        "cost": round(cost, 2),
        "tax": round(tax, 2),
        "profit": round(sales - cost, 2),
        "after_tax": round(sales - cost - tax, 2),
        "products": products,
        "categories": cats,
    }


ranges = {
    "Daily": (today, today),
    "Weekly": (today - timedelta(days=today.weekday() + 1) if today.weekday() != 6 else today, today)
    if False
    else (today - timedelta(days=int(today.strftime("%w"))), today),  # Sunday start like .NET DayOfWeek
    "Monthly": (today.replace(day=1), today),
    "Yearly": (today.replace(month=1, day=1), today),
}

# Match C# DayOfWeek: Sunday=0
start_week = today - timedelta(days=today.isoweekday() % 7)
ranges["Weekly"] = (start_week, today)

ok = True
for name, (a, b) in ranges.items():
    s = summary(a, b)
    print(f"{name} [{a}..{b}]: {s}")
    if s["sales"] <= 0 and name in ("Monthly", "Yearly", "Weekly"):
        print(f"  FAIL: expected sales for {name}")
        ok = False
    if s["products"] <= 0 and name in ("Monthly", "Yearly"):
        print(f"  FAIL: expected products for {name}")
        ok = False

drafts = c.execute("SELECT COUNT(*) FROM orders WHERE status='Draft'").fetchone()[0]
print("Draft orders present:", drafts)
print("PASS" if ok else "FAIL")
