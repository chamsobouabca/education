"use client"
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import ReactQuill from 'react-quill';
import { Input } from '@nextui-org/react';


const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });


export default function Home() {
  const [content, setContent] = useState("");
  const [title , setTitle] = useState<string>("");


  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      [{ align: [] }],
      [{ color: [] }],
      ['code-block'],
      ['clean'],
    ],
  };


  const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'align',
    'color',
    'code-block',
  ];


  const handleEditorChange = (newContent : string) => {
    setContent(newContent);
  };


  return (
          <div>
            <section className='w-1/3'>
                <Input label="Title" variant='bordered' color='secondary' type='text' value={title} onChange={(e) => setTitle(e.target.value) } className='text-white '/>
            </section>
            <QuillEditor
            value={content}
            onChange={handleEditorChange}
            modules={quillModules}
            formats={quillFormats}
            className="w-full  mt-10 bg-white text-white min-h-96 rounded-md overflow-hidden " 
            />
</div>
  );
}