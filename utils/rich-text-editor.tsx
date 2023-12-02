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
    <ReactQuill 
      value={value}
      onChange={handleChange}
      modules={modules}
      formats={formats}
    />
  );
};

export default RichTextEditor;
