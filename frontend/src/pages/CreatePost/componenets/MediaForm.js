import React, { useEffect, useState } from 'react';
import Button from '../../../components/Button';
import { FileUploader } from "react-drag-drop-files";
import { WithContext as ReactTags } from 'react-tag-input';

const fileTypes = ["JPEG", "PNG", "GIF"];
const KeyCodes = {
    comma: 188,
    enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const MediaForm = ({ nextForm, prevForm, TAGS_URL, tags, setTags }) => {

    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        fetch(TAGS_URL)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setSuggestions(data)
            })
            .catch((error) => {
                for (let i = 0; i < 3; i++) {
                    setSuggestions([])
                }
                console.log(error);
            })
    }, [setSuggestions, TAGS_URL]);


    const handleDelete = (i) => {
        setTags(tags.filter((_, index) => index !== i));
    };

    const handleAddition = (tag) => {
        setTags([...tags, tag]);
    };

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        setTags(newTags);
    };
    const handleTagClick = index => {
        console.log('The tag at index ' + index + ' was clicked');
    };

    const [file, setFile] = useState(null);
    const handleChange = (f) => {
        setFile(f);
        console.log(f);
    };
    return (
        <form>
            <h2>Media & Tags</h2>
            <label htmlFor="tags-list">Add some tags related to your job</label>
            <div>
                <ReactTags
                    tags={tags}
                    suggestions={suggestions}
                    delimiters={delimiters}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    handleDrag={handleDrag}
                    handleTagClick={handleTagClick}
                    inputFieldPosition="top"
                    autocomplete
                />
            </div>
            <label htmlFor="files">Upload extra files</label>
            <p>
                Here, you can upload files that are needed to describe more details.
            </p>
            <div className='file-upload'>
                <FileUploader
                    multiple={true}
                    handleChange={handleChange}
                    name="file"
                    types={fileTypes}
                />
                <p>{file ? `File name: ${Array.from(file).map((f) => f.name)}` : "no files uploaded yet"}</p>
            </div>
            <div className='next-page'>
                <Button onClick={prevForm}>Previous Page</Button>
                <Button primary={true} onClick={nextForm}>Next page</Button>
            </div>
        </form>
    )
}

export default MediaForm