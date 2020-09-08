import React from 'react';

export default ({ changeLanguage }) => (
    <div className="App-header">
        <select onChange={(e) => changeLanguage(e.target.value)}>
            <option value="en" defaultChecked> English</option>
            <option value="de"> German</option>
        </select>
    </div>
)