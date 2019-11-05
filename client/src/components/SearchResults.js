import React from "react";


function SearchResults({ children }) {
    return (
        <div className="container">
            <h1 className="card-header">Results</h1>
            <div className="card">
                {children}
            </div>
        </div>
    );
}

export default SearchResults;
