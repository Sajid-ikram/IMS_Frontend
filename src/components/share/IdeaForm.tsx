import { useState } from 'react';
import Editor from './Editor';
import MediaInput from './MediaInput';
import ActionButtons from './ActionButtons';
import { useEditor } from '../../hooks/useEditor';

export default function IdeaForm() {
  const [content, setContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const { editorRef, focusEditor } = useEditor();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ content, mediaUrl });
    
    // Clear form
    setContent('');
    setMediaUrl('');
    // Focus editor after submission
    focusEditor();
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
      <form onSubmit={handleSubmit}>
        <Editor
          ref={editorRef}
          value={content}
          onChange={setContent}
          placeholder="Share your idea..."
          className="mb-4"
        />
        
        <div className="flex items-center gap-4 mt-8">
          <MediaInput value={mediaUrl} onChange={setMediaUrl} />
          <ActionButtons onSubmit={handleSubmit} />
        </div>
      </form>
    </div>
  );
}