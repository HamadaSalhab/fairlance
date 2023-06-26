import React, { useState } from 'react'
import { CreatePostStyled, StyledProgress } from './style'
import NavBar from '../../components/NavBar';
import TitleForm from './componenets/TitleForm';
import DetailsForm from './componenets/DetailsForm';
import MediaForm from './componenets/MediaForm';
import PricingForm from './componenets/PricingForm';
import FinalPreview from './componenets/FinalPreview';
import IntroForm from './componenets/IntroForm';

const TAGS_URL = "http://localhost:3030/tags"

const index = () => {
    const MAX = 2000, MIN = 5;
    const [range, setRange] = useState([MIN, MAX]);
    const [title, setTitle] = useState("");
    const [formIdx, setFormIdx] = useState(0);
    const [category, setCategory] = useState({
        it: false,
        design: false,
        marketing: false,
        sales: false,
        writing: false
    });
    const [deadline, setDeadline] = useState(new Date());
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([
        { id: 'frontend', text: 'Frontend development' },
        { id: 'html', text: 'HTML' },
        { id: 'css', text: 'CSS' }
    ]);
    const clickedOption = (name) => {
        const tmp = category;
        for (let key in category) {
            tmp[key] = false;
        }
        tmp[name] = true;
        setCategory({ ...tmp });
    }
    const nextForm = (e) => {
        setFormIdx(formIdx + 1);
        for (let i = 1; i <= formIdx + 1; i++) {
            const prog = document.querySelector(`#elements :nth-child(${i})`);
            if (!prog) continue;
            if (!prog.classList.contains('active-border')) {
                prog.classList.add('active-border');
            }
        }
        e.preventDefault();
    }
    const prevForm = (e) => {
        setFormIdx(formIdx - 1);
        for (let i = 1; i <= formIdx + 1; i++) {
            const prog = document.querySelector(`#elements :nth-child(${i})`);
            if (!prog) continue;
            if (prog.classList.contains('active-border')) {
                prog.classList.remove('active-border');
            }
            if (!prog.classList.contains('active-border') && i < formIdx) {
                prog.classList.add('active-border');
            }
        }
        e.preventDefault();
    }
    const addFile = (file) => {
        console.log(file);
    }

    const handleSubmit = () => {
        console.log("submitting");
        // TODO: handle submit
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <NavBar notfixed={true} />
            <CreatePostStyled>
                <StyledProgress>
                    <div id='elements'>
                        <div>Title</div>
                        <div>Description</div>
                        <div>Media & Tags</div>
                        <div>Pricing</div>
                        <div>Final Preview</div>
                    </div>
                </StyledProgress>
                <div>
                    {formIdx === 0 ? <IntroForm nextForm={nextForm} /> : ''}
                    {formIdx === 1 ? <TitleForm category={category} clickedOption={clickedOption} title={title} setTitle={setTitle} nextForm={nextForm} /> : ''}
                    {formIdx === 2 ? <DetailsForm nextForm={nextForm} prevForm={prevForm} description={description} setDescription={setDescription} /> : ''}
                    {formIdx === 3 ? <MediaForm nextForm={nextForm} prevForm={prevForm} addFile={addFile} TAGS_URL={TAGS_URL} tags={tags} setTags={setTags} /> : ''}
                    {formIdx === 4 ? <PricingForm nextForm={nextForm} prevForm={prevForm} range={range} setRange={setRange} deadline={deadline} setDeadline={setDeadline} /> : ''}
                    {formIdx === 5 ? <FinalPreview category={category} nextForm={handleSubmit} prevForm={prevForm} title={title} tags={tags} body={description} range={range} deadline={deadline} /> : ''}
                </div>
            </CreatePostStyled>
        </div>
    )
}

export default index