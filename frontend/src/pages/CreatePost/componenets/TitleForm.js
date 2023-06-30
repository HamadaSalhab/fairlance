import React, { useEffect } from 'react';
import RadioButton from '../../../components/RadioButton';
import Button from '../../../components/Button';

const TitleForm = ({ category, clickedOption, title, setTitle, nextForm }) => {

  useEffect(() => {
    document.getElementById("title").addEventListener('keypress', (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
      }
    })
  }, []);

  return (
    <form>
      <h2>Job Title</h2>
      <label htmlFor="title">Write a title for your job post</label>
      <p>Keep it Clear, Descriptive, and Emphasize the Key Point of Your Project</p>
      <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <label htmlFor="category">Job category</label>
      <p>Select the main category for your job post</p>
      <div className='job-category'>
        <RadioButton id="it" name="it" value="Development & IT" text="Development & IT" onChange={clickedOption} checked={category.it} />
        <RadioButton id="design" name="design" value="Design" text="Design" onChange={clickedOption} checked={category.design} />
        <RadioButton id="sales" name="sales" value="Sales" text="Sales" onChange={clickedOption} checked={category.sales} />
        <RadioButton id="marketing" name="marketing" value="Marketing" text="Marketing" onChange={clickedOption} checked={category.marketing} />
        <RadioButton id="writing" name="writing" value="Writing" text="Writing" onChange={clickedOption} checked={category.writing} />
      </div>
      <div className='next-page'>
        <Button primary={true} onClick={nextForm}>Next page</Button>
      </div>
    </form>
  )
}

export default TitleForm