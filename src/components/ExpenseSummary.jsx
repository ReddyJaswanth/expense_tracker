import './ExpenseSummary.css';

function ExpenseSummary({ expenses }) {
    const getCurrentMonthTotal = () => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        return expenses
            .filter(expense => {
                const expenseDate = new Date(expense.date);
                return (
                    expenseDate.getMonth() === currentMonth &&
                    expenseDate.getFullYear() === currentYear
                );
            })
            .reduce((total, expense) => total + expense.amount, 0);
    };

    const getCategoryTotals = () => {
        const categoryTotals = {};
        expenses.forEach(expense => {
            categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
        });
        return categoryTotals;
    };

    const currentMonthTotal = getCurrentMonthTotal();
    const categoryTotals = getCategoryTotals();
    const currentDate = new Date();
    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();

    return (
        <div className="expense-summary">
            <div className="summary-card">
                <h3>Current Month Total</h3>
                <span className="subtitle">Total for {monthName} {year}</span>
                <p className="total-amount">${currentMonthTotal.toFixed(2)}</p>
            </div>

            <div className="summary-card">
                <h3>Category Breakdown</h3>
                <div className="category-breakdown">
                    {Object.entries(categoryTotals).map(([category, total]) => (
                        <div key={category} className="category-item">
                            <span className="category-name">{category}</span>
                            <span className="category-amount">${total.toFixed(2)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ExpenseSummary; 