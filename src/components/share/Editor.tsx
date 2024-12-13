import { forwardRef, useImperativeHandle, useRef } from 'react';
import ReactQuill, { ReactQuillProps } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../styles/editor.css';
import { quillModules, quillFormats } from '../../utils/quill-config';

interface EditorProps extends Omit<ReactQuillProps, 'theme'> {
  className?: string;
}

export interface EditorRef {
  getEditor: () => ReactQuill | null;
  focus: () => void;
}

const Editor = forwardRef<EditorRef, EditorProps>(({ className = '', ...props }, ref) => {
  const quillRef = useRef<ReactQuill>(null);

  useImperativeHandle(ref, () => ({
    getEditor: () => quillRef.current,
    focus: () => {
      quillRef.current?.focus();
    },
  }));

  return (
    <div className={`quill-editor ${className}`}>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        modules={quillModules}
        formats={quillFormats}
        {...props}
      />
    </div>
  );
});

Editor.displayName = 'Editor';

export default Editor;