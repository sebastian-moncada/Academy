import React from 'react';
import "./styles.css";

const list = ({ items }) => {

    return (
        <div>
            <ol>
                {items.map((value, index) => {
                    return <li key={index}>{value}</li>
                })}
            </ol>
        </div>
    );
};

export default list;