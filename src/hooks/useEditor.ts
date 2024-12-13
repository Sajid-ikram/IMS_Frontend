import { useRef, useCallback } from 'react';
import type { EditorRef } from '../components/share/Editor';

export function useEditor() {
  const editorRef = useRef<EditorRef>(null);

  const focusEditor = useCallback(() => {
    setTimeout(() => editorRef.current?.focus(), 0);
  }, []);

  return {
    editorRef,
    focusEditor
  };
}