import React from 'react';
import classes from './MySelect.module.css'

const MySelect = ({options, defaultValue, value, onChange}) => {
    return (
        <select className={classes.select__category} value={value}
        onChange={e => onChange(e.target.value)}
        >
            <option value='All'>{defaultValue}</option>
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.name}</option>
            ))}

        </select>
    );
};

export default MySelect;