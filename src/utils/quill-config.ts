export const quillModules = {
  toolbar: {
    container: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'code-block'],
      ['clean']
    ],
    handlers: {
      // Add custom handlers here if needed
    }
  },
  clipboard: {
    matchVisual: false // Prevents unwanted styles when pasting
  },
  keyboard: {
    bindings: {
      tab: false // Disable tab capture to allow focus navigation
    }
  }
};

export const quillFormats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'list',
  'bullet',
  'link',
  'code-block'
];