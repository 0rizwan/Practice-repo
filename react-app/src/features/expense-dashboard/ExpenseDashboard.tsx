import { useMemo, useState } from "react";

const expenses = [
    {
        id: 1,
        title: "Grocery Shopping",
        category: "Food",
        amount: 1200,
        date: "2026-08-01"
    },
    {
        id: 2,
        title: "Uber Ride",
        category: "Transport",
        amount: 450,
        date: "2026-08-02"
    },
    {
        id: 3,
        title: "Netflix",
        category: "Entertainment",
        amount: 649,
        date: "2026-08-03"
    },
    {
        id: 4,
        title: "Restaurant",
        category: "Food",
        amount: 1800,
        date: "2026-08-04"
    },
    {
        id: 5,
        title: "Petrol",
        category: "Transport",
        amount: 1500,
        date: "2026-08-05"
    },
    {
        id: 6,
        title: "Amazon Shopping",
        category: "Shopping",
        amount: 2500,
        date: "2026-08-06"
    },
    {
        id: 7,
        title: "Movie",
        category: "Entertainment",
        amount: 800,
        date: "2026-08-07"
    },
    {
        id: 8,
        title: "Electricity Bill",
        category: "Bills",
        amount: 2200,
        date: "2026-08-08"
    },
    {
        id: 9,
        title: "Lunch",
        category: "Food",
        amount: 700,
        date: "2026-08-09"
    },
    {
        id: 10,
        title: "Metro",
        category: "Transport",
        amount: 300,
        date: "2026-08-10"
    },
    {
        id: 11,
        title: "Shoes",
        category: "Shopping",
        amount: 3200,
        date: "2026-08-11"
    },
    {
        id: 12,
        title: "Spotify",
        category: "Entertainment",
        amount: 199,
        date: "2026-08-12"
    }
];

function ExpenseDashboard() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const categories = [
        "All",
        ...new Set(expenses.map((e) => e.category))
    ];

    // Search + filter
    const filtered = useMemo(() => {
        return expenses.filter((expense) => {
            const searchMatch = expense.title
                .toLowerCase()
                .includes(search.toLowerCase());

            const categoryMatch =
                category === "All" ||
                expense.category === category;

            return searchMatch && categoryMatch;
        });
    }, [search, category]);

    // Pagination
    const totalPages = Math.ceil(
        filtered.length / pageSize
    );

    const start = (page - 1) * pageSize;

    const currentExpenses = filtered.slice(
        start,
        start + pageSize
    );

    // X-Y of Z
    const first = filtered.length
        ? start + 1
        : 0;

    const last = Math.min(
        start + pageSize,
        filtered.length
    );

    // Category totals for visualization
    const categoryTotals = useMemo(() => {
        return filtered.reduce((acc, expense) => {
            acc[expense.category] =
                (acc[expense.category] || 0) +
                expense.amount;

            return acc;
        }, {});
    }, [filtered]);

    return (
        <div>

            <h1>Expenses</h1>

            {/* Search */}
            <input
                placeholder="Search..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                }}
            />

            {/* Category */}
            <select
                value={category}
                onChange={(e) => {
                    setCategory(e.target.value);
                    setPage(1);
                }}
            >
                {categories.map((cat) => (
                    <option key={cat}>{cat}</option>
                ))}
            </select>

            {/* Page size */}
            <select
                value={pageSize}
                onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setPage(1);
                }}
            >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
            </select>

            {/* Table */}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Amount</th>
                    </tr>
                </thead>

                <tbody>
                    {currentExpenses.map((expense) => (
                        <tr key={expense.id}>
                            <td>{expense.title}</td>
                            <td>{expense.category}</td>
                            <td>₹{expense.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* X-Y of Z */}
            <p>
                Showing {first}-{last} of {filtered.length}
            </p>

            {/* Pagination */}
            <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
            >
                Previous
            </button>

            <span>
                {" "} Page {page} of {totalPages}{" "}
            </span>

            <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
            >
                Next
            </button>

            {/* Visualization */}
            <h2>Category Summary</h2>

            {Object.entries(categoryTotals).map(
                ([cat, amount]) => (
                    <div key={cat}>
                        <p>
                            {cat}: ₹{amount}
                        </p>

                        <div
                            style={{
                                width: `${Math.min(
                                    amount / 20,
                                    100
                                )}%`,
                                height: "20px",
                                background: "black"
                            }}
                        />
                    </div>
                )
            )}

        </div>
    );
}

export default ExpenseDashboard;