import React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const handleChange = (content: string, delta: any, source: any, editor: any) => {
    onChange(editor.getHTML());
  };

  const modules = {
    toolbar: [
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
    ],
  };

  const formats = [
    'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link',
  ];

  return (
    <div style={{ height: '100%' }}>
      <ReactQuill 
        value={value}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder={`Paste your show notes with timestamps here...

Example:
(00:00:00) - Intro
(00:02:30) - Main topic discussion
(00:15:45) - Guest interview`}
        style={{ height: '200px' }}
      />
    </div>
  );
};

export default RichTextEditor;