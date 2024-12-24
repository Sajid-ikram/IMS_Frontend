import Quill from "quill";

const Block = Quill.import("blots/block");

class NewLine extends Block {
  static blotName = "newLine";
  static tagName = "div";

  static create(value: unknown) {
    const node = super.create(value);
    node.innerHTML = "<br>";
    return node;
  }
}

export const CustomQuill = () => {
  Quill.register(NewLine);
};

export const quillModules = {
  toolbar: {
    container: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "code-block"],
      ["clean"],
    ],
    handlers: {
      // Add custom handlers here if needed
    },
  },
  clipboard: {
    matchVisual: false, // Prevents unwanted styles when pasting
  },
  keyboard: {
    bindings: {
      tab: false, // Disable tab capture to allow focus navigation
    },
  },
};

export const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "link",
  "code-block",
  "newLine",
];
