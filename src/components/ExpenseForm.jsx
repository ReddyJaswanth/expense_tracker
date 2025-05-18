import { useState, useEffect } from 'react';
import { FaPlus, FaEdit } from 'react-icons/fa';
import './ExpenseForm.css';

const categories = [
    'Food',
    'Transport',
    'Entertainment',
    'Shopping',
    'Bills',
    'Other'
];

function ExpenseForm({ expense, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: categories[0],
        date: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        if (expense) {
            setFormData({
                title: expense.title,
                amount: expense.amount.toString(),
                category: expense.category,
                date: expense.date
            });
        }
    }, [expense]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.title.trim() || !formData.amount) {
            alert('Please fill in all fields');
            return;
        }

        const amount = parseFloat(formData.amount);
        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        onSubmit({
            ...formData,
            amount,
            id: expense?.id || Date.now()
        });

        if (!expense) {
            setFormData({
                title: '',
                amount: '',
                category: categories[0],
                date: new Date().toISOString().split('T')[0]
            });
        }
    };

    return (
        <form className="expense-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter expense title"
                />
            </div>

            <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="Enter amount"
                    min="0"
                    step="0.01"
                />
            </div>

            <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                >
                    {categories.map(category => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                />
            </div>

            <div className="form-actions">
                <button type="submit" className="btn-submit">
                    {expense ? (
                        <>
                            <FaEdit className="icon" />
                            Update Expense
                        </>
                    ) : (
                        <>
                            <FaPlus className="icon" />
                            Add Expense
                        </>
                    )}
                </button>
                {expense && (
                    <button type="button" className="btn-cancel" onClick={onCancel}>
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}

export default ExpenseForm; 