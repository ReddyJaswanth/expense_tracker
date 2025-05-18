import './FilterBar.css';

const categories = [
    'All',
    'Food',
    'Transport',
    'Entertainment',
    'Shopping',
    'Bills',
    'Other'
];

function FilterBar({
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
        <div className="filter-bar">
            <div className="filter-group">
                <input
                    type="text"
                    placeholder="Search expenses..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="search-input"
                />
            </div>

            <div className="filter-group">
                <select
                    value={selectedCategory}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    className="category-filter"
                >
                    {categories.map(category => (
                        <option key={category} value={category.toLowerCase()}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <select
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="sort-filter"
                >
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                    <option value="title">Title</option>
                </select>

                <button
                    className="sort-order-btn"
                    onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
                    aria-label={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
                >
                    {sortOrder === 'asc' ? '↑' : '↓'}
                </button>
            </div>
        </div>
    );
}

export default FilterBar; 