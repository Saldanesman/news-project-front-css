import { React, useState } from 'react';
import uniquid from 'uniqid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Import CSS
import './CreateNews.css';

// Import for alerts styles
import Swal from 'sweetalert2';


const NewsList = () => {

  // Return to home
  const navigate = useNavigate();

  // States
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const onChangeDate = (e) => {
    setDate(e.target.value);
  };

  const onChangecontent = (e) => {
    setContent(e.target.value);
  };

  const onChangeAuthor = (e) => {
    setAuthor(e.target.value);
  };
 
  // Save form
  const addNew = () => {

    const goodForm = title !== "" && description !== "" && date !=="" && content !== "" && author !== "";
    //eslint-disable-next-line
    var regexDate = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;

    if (goodForm) {
      if (regexDate.test(date)) {
        var newsForm = {
          title: title,
          description: description,
          date: date,
          content: content,
          author: author,
          idNews: uniquid(),
          archivedDate: null
        };
    
        axios.post('/api/new/addnews', newsForm)
        .then(res => {
          Swal.fire('Nice!', 'News successfully added to the list');
          navigate('/');
        })
        .then(err => {
          console.log(err);
        })
      } else {
        Swal.fire('Ouch!', 'Maybe you should put a date with this format: 01/01/2000');
      }
    } else {
      Swal.fire('Ouch!', 'Try again. All fields must be filled');
    }
  };

  return (
    <div className={'container-create-news'}>
      <div className={'create-news-title'}>
        <h1 className={'create-news-title_h1'}> Create News</h1>
      </div>
      <div className={'container-forms'}>
        <div className={'container-forms-title'}>
          <input type={'text'} className={'container-forms-title_input'} value={title} onChange={onChangeTitle} placeholder={"TITLE"}></input>
        </div>
        <div className={'container-forms-description'}>
          <textarea className={'container-forms-description_input'}  aria-label="With textarea" value={description} onChange={onChangeDescription} placeholder={"DESCRIPTION"}></textarea>
        </div>
        <div className={'container-forms-date'}>
          <input type={'text'} className={'container-forms-date_input'} value={date} onChange={onChangeDate} placeholder={"DATE: MM/DD/YYYY"}></input>
        </div>
        <div className={'container-forms-content'}>
          <textarea className={'container-forms-content_input'} aria-label="With textarea" value={content} onChange={onChangecontent} placeholder={"CONTENT"}></textarea>
        </div>
        <div className={'container-forms-author'}>
          <input type={'text'} className={'container-forms-author_input'} value={author} onChange={onChangeAuthor} placeholder={"AUTHOR"}></input>
        </div>
        <div className={'container-btn'}>
          <button onClick={addNew} className={'btn-create-news'}> Create News </button>
        </div>
    </div>
    </div>
  )
};

export default NewsList;
