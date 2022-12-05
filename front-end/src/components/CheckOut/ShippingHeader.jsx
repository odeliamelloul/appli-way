import React from 'react';
import PropTypes from 'prop-types';


const ShippingHeader = ({ header }) => {
    return (
        <div className='d-flex shippingHeader'>
            <hr />
            <p htmlFor="">{header}</p>
            <hr />
        </div>
    );
};




export default ShippingHeader;
