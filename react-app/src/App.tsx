import React, {
  useReducer,
  useMemo,
  useCallback
} from "react";
import "./App.css";

// --------------------------------------------------
// Dummy Data
// --------------------------------------------------

const initialExpenses = [
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

// --------------------------------------------------
// State
// --------------------------------------------------

const initialState = {
  search: "",
  category: "All",
  page: 1,
  pageSize: 5
};

// --------------------------------------------------
// Reducer
// --------------------------------------------------

function reducer(state, action) {
  switch (action.type) {
    case "SET_SEARCH":
      return {
        ...state,
        search: action.payload,
        page: 1
      };

    case "SET_CATEGORY":
      return {
        ...state,
        category: action.payload,
        page: 1
      };

    case "SET_PAGE":
      return {
        ...state,
        page: action.payload
      };

    case "SET_PAGE_SIZE":
      return {
        ...state,
        pageSize: Number(action.payload),
        page: 1
      };

    default:
      return state;
  }
}

// --------------------------------------------------
// Category Visualization
// --------------------------------------------------

function CategoryVisualization({ expenses }) {
  const categoryTotals = useMemo(() => {
    const totals = {};

    expenses.forEach((expense) => {
      if (!totals[expense.category]) {
        totals[expense.category] = 0;
      }

      totals[expense.category] += expense.amount;
    });

    return Object.entries(totals)
      .map(([category, amount]) => ({
        category,
        amount
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [expenses]);

  const maxAmount = Math.max(
    ...categoryTotals.map((item) => item.amount),
  );

  return (
    <div className="visualization">
      <h2>Expense by Category</h2>

      {categoryTotals.map((item) => {
        const percentage =
          (item.amount / maxAmount) * 100;

        return (
          <div
            className="category-row"
            key={item.category}
          >
            <div className="category-header">
              <span>{item.category}</span>
              <strong>₹{item.amount}</strong>
            </div>

            <div className="bar-container">
              <div
                className="bar"
                style={{
                  width: `${percentage}%`
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// --------------------------------------------------
// Expense Table
// --------------------------------------------------

function ExpenseTable({ expenses }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>

      <tbody>
        {expenses.length === 0 ? (
          <tr>
            <td colSpan="4">
              No expenses found
            </td>
          </tr>
        ) : (
          expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.title}</td>
              <td>{expense.category}</td>
              <td>₹{expense.amount}</td>
              <td>{expense.date}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

// --------------------------------------------------
// Pagination
// --------------------------------------------------

function Pagination({
  currentPage,
  totalPages,
  onPageChange
}) {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() =>
          onPageChange(currentPage - 1)
        }
      >
        Previous
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={
            currentPage === page
              ? "active"
              : ""
          }
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() =>
          onPageChange(currentPage + 1)
        }
      >
        Next
      </button>
    </div>
  );
}

// --------------------------------------------------
// Main App
// --------------------------------------------------

function App() {
  const [state, dispatch] = useReducer(
    reducer,
    initialState
  );

  const {
    search,
    category,
    page,
    pageSize
  } = state;

  // -----------------------------------------------
  // Categories
  // -----------------------------------------------

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(
        initialExpenses.map(
          (expense) => expense.category
        )
      )
    ];
  }, []);

  // -----------------------------------------------
  // Search + Filter
  // -----------------------------------------------

  const filteredExpenses = useMemo(() => {
    return initialExpenses.filter((expense) => {
      const matchesSearch =
        expense.title
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        expense.category === category;

      return (
        matchesSearch &&
        matchesCategory
      );
    });
  }, [search, category]);

  // -----------------------------------------------
  // Pagination
  // -----------------------------------------------

  const totalPages = Math.ceil(
    filteredExpenses.length / pageSize
  );

  const paginatedExpenses = useMemo(() => {
    const start =
      (page - 1) * pageSize;

    const end =
      start + pageSize;

    return filteredExpenses.slice(
      start,
      end
    );
  }, [
    filteredExpenses,
    page,
    pageSize
  ]);

  // -----------------------------------------------
  // X-Y of Z
  // -----------------------------------------------

  const startItem =
    filteredExpenses.length === 0
      ? 0
      : (page - 1) * pageSize + 1;

  const endItem = Math.min(
    page * pageSize,
    filteredExpenses.length
  );

  // -----------------------------------------------
  // Handlers
  // -----------------------------------------------

  const handleSearch = useCallback(
    (event) => {
      dispatch({
        type: "SET_SEARCH",
        payload: event.target.value
      });
    },
    []
  );

  const handleCategoryChange =
    useCallback((event) => {
      dispatch({
        type: "SET_CATEGORY",
        payload: event.target.value
      });
    }, []);

  const handlePageChange =
    useCallback((pageNumber) => {
      dispatch({
        type: "SET_PAGE",
        payload: pageNumber
      });
    }, []);

  const handlePageSizeChange =
    useCallback((event) => {
      dispatch({
        type: "SET_PAGE_SIZE",
        payload: event.target.value
      });
    }, []);

  return (
    <div className="app">

      <h1>Expense Dashboard</h1>

      {/* ----------------------------------------- */}
      {/* Filters */}
      {/* ----------------------------------------- */}

      <div className="filters">

        <input
          type="text"
          placeholder="Search expenses..."
          value={search}
          onChange={handleSearch}
        />

        <select
          value={category}
          onChange={handleCategoryChange}
        >
          {categories.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>

        <select
          value={pageSize}
          onChange={handlePageSizeChange}
        >
          <option value="5">
            5 per page
          </option>

          <option value="10">
            10 per page
          </option>

          <option value="20">
            20 per page
          </option>
        </select>

      </div>

      {/* ----------------------------------------- */}
      {/* Table */}
      {/* ----------------------------------------- */}

      <ExpenseTable
        expenses={paginatedExpenses}
      />

      {/* ----------------------------------------- */}
      {/* X-Y of Z */}
      {/* ----------------------------------------- */}

      <div className="count">
        Showing{" "}
        <strong>{startItem}</strong>
        -
        <strong>{endItem}</strong>
        {" "}of{" "}
        <strong>
          {filteredExpenses.length}
        </strong>
        {" "}expenses
      </div>

      {/* ----------------------------------------- */}
      {/* Pagination */}
      {/* ----------------------------------------- */}

      {totalPages > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* ----------------------------------------- */}
      {/* Visualization */}
      {/* ----------------------------------------- */}

      <CategoryVisualization
        expenses={filteredExpenses}
      />

    </div>
  );
}

export default App;