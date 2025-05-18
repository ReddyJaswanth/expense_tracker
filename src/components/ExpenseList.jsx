import './ExpenseList.css';
import FilterBar from './FilterBar';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

function ExpenseList({
    expenses,
    onEdit,
    onDelete,
    selectedCategory,
    onCategoryChange,
    searchQuery,
    onSearchChange,
    sortBy,
    onSortChange,
    sortOrder,
    onSortOrderChange
}) {
    return (
        <div className="expense-list-wrapper">
            <h2 className="expense-list-header">Expense History</h2>
            <FilterBar
                selectedCategory={selectedCategory}
                onCategoryChange={onCategoryChange}
                searchQuery={searchQuery}
                onSearchChange={onSearchChange}
                sortBy={sortBy}
                onSortChange={onSortChange}
                sortOrder={sortOrder}
                onSortOrderChange={onSortOrderChange}
            />
            {expenses.length === 0 ? (
                <div className="expense-list empty">
                    <p>No expenses found. Add your first expense!</p>
                </div>
            ) : (
                <div className="expense-list">
                    {expenses.map(expense => (
                        <div key={expense.id} className="expense-card">
                            <div className="expense-info">
                                <h3>{expense.title}</h3>
                                <p className="expense-category">{expense.category}</p>
                                <p className="expense-date">{new Date(expense.date).toLocaleDateString()}</p>
                            </div>
                            <div className="expense-amount">
                                <span>${expense.amount.toFixed(2)}</span>
                            </div>
                            <div className="expense-actions">
                                <button
                                    className="btn-edit"
                                    onClick={() => onEdit(expense)}
                                    aria-label="Edit expense"
                                >
                                    <FiEdit2 />
                                </button>
                                <button
                                    className="btn-delete"
                                    onClick={() => onDelete(expense.id)}
                                    aria-label="Delete expense"
                                >
                                    <FiTrash2 />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ExpenseList; 