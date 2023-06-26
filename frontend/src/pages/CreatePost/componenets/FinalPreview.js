import React, { useEffect, useState } from 'react'
import Button from '../../../components/Button'
import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
    comma: 188,
    enter: 13
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];
const FinalPreview = ({ nextForm, prevForm, title, body, tags, range, deadline, category }) => {
    const [complete, setComplete] = useState(false);
    const [missing, setMissing] = useState([]);
    const [jobCategory, setJobCategory] = useState();
    const categoryName = {
        "it": "Development & IT",
        "design": "Design",
        "sales": "Sales",
        "marketing": "Marketing",
        "writing": "Writing"
    }
    useEffect(() => {
        let missingItems = [];
        if (!title) {
            missingItems.push('Please add a title to your post');
        }
        if (!body) {
            missingItems.push('Please add a description to your post');
        }
        if (!range) {
            missingItems.push('Please add price to your post');
        }
        if (deadline < new Date()) {
            missingItems.push('Please specify a valid deadline for your job');
        }
        let ok = false;
        for (let element in category) {
            if (category[element]) {
                ok = true;
                setJobCategory(element);
            }
        }
        if (!ok) {
            missingItems.push('Please set a job category')
        }
        if (missingItems.length === 0) {
            setComplete(true);
        }
        setMissing(missingItems);
    }, [])

    return (
        <>
            {
                complete ?
                    <form className='final-preview'>
                        <h2>Final Preview</h2>
                        <h3>{title}</h3>
                        <span>{categoryName[jobCategory]}</span>
                        <p>{body}</p>
                        <div className='no-edit'>
                            <ReactTags
                                tags={tags}
                                delimiters={delimiters}
                            />
                        </div>
                        <div className='price-range'>
                            <div><span style={{ fontWeight: 'bold' }}>price:</span> {range[0]} to {range[1]}</div>
                        </div>
                        <div>
                            <span style={{ fontWeight: 'bold' }}>Deadline:</span> {deadline.toString()}
                        </div>
                        <div className='next-page'>
                            <Button primary={false} onClick={prevForm}>Previous page</Button>
                            <Button primary={true} onClick={nextForm}>Submit</Button>
                        </div>
                    </form >
                    : <>
                        <form>
                            <h2 style={{ color: 'red' }}>Please fill the following missed fields:</h2>
                            {
                                missing.map((e) => <p>{e}</p>)
                            }
                            <div className='next-page'>
                                <Button primary={false} onClick={prevForm}>Previous page</Button>
                            </div>
                        </form>
                    </>
            }
        </>
    )
}

export default FinalPreview