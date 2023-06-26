import React from 'react'
import Button from '../../../components/Button'

const DetailsForm = ({ nextForm, prevForm, description, setDescription }) => {
    return (
        <form>
            <h2>Job details</h2>
            <label htmlFor="description">Job description</label>
            <p>Please provide a comprehensive and detailed description of your job. It is important to note that the freelancer is bound to deliver all the specific details mentioned here, ensuring there are no additional or omitted requirements.</p>
            <textarea type="text" id="description" content={description} onChange={(e) => setDescription(e.target.value)} />
            <div className='next-page'>
                <Button onClick={prevForm}>Previous Page</Button>
                <Button primary={true} onClick={nextForm}>Next page</Button>
            </div>
        </form>
    )
}

export default DetailsForm