import React, { useEffect } from 'react';
import Button from '../../../components/Button';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const PricingForm = ({ prevForm, nextForm, range, setRange, deadline, setDeadline }) => {
    const changeRange = (range) => {
        setRange(range);
    }

    useEffect(() => {
        const from = document.getElementById("price-from");
        const to = document.getElementById("price-to");
        from.addEventListener('keypress', (e) => {
            if (e.key == "Enter") {
                e.preventDefault();
            }
        })
        to.addEventListener('keypress', (e) => {
            if (e.key == "Enter") {
                e.preventDefault();
            }
        })
    }, []);

    return (
        <form>
            <h2>Pricing & deadline</h2>
            <label htmlFor="price-tange">Add a price to your project</label>
            <p>Please consider the estimiated working hours before setting your price <br /> freelancers can propose any price within this range</p>
            <div className='range-values'>
                <div>
                    I am willing to pay :
                </div>
                <input
                    id="price-from"
                    type="number"
                    value={range[0]}
                    onChange={(e) => changeRange([e.target.value, range[1]])}
                    onFocus={(e) => { e.target.value = ''; }}
                    onBlur={(e) => { e.target.value = range[0]; }}
                />
                to
                <input
                    id="price-to"
                    type="number"
                    value={range[1]}
                    onChange={(e) => changeRange([range[0], e.target.value])}
                    onFocus={(e) => { e.target.value = ''; }}
                    onBlur={(e) => { e.target.value = range[1]; }}
                />
                $
            </div>
            <label htmlFor="price-tange">When do you want your project ready?</label>
            <p>We will give you 24 hours to review your project before paying the freelancer</p>
            <DatePicker
                selected={deadline}
                onChange={(date) => setDeadline(date)}
                showTimeSelect
                showIcon
                timeIntervals={60}
                className='date-picker'
                minDate={new Date()}
                showDisabledMonthNavigation
                dateFormat="MMMM d, yyyy h:mm aa"
            />
            <div className='next-page'>
                <Button onClick={prevForm}>Previous Page</Button>
                <Button primary={true} onClick={nextForm}>Next page</Button>
            </div>
        </form>
    )
}

export default PricingForm