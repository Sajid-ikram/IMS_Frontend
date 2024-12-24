import { useState } from "react";
import Editor from "./Editor";
import GeneralInput from "./GeneralInput";
import { useEditor } from "../../hooks/useEditor";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Link, Smile, Send } from "lucide-react";

export default function IdeaForm() {
  const [content, setContent] = useState("");
  const [banner, setBanner] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const { editorRef, focusEditor } = useEditor();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title || !content || !banner) {
      setError("Please fill all the fields.");
      return;
    }

    if (!user?._id) {
      setError("User is not authenticated.");
      return;
    }

    try {
      const response = await fetch(
        "https://ism-server.onrender.com/api/ideas",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
            banner,
            author: user._id,
          }),
        }
      );
      if (!response.ok) {
        const message = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, ${message}`);
      }
      console.log(response);

      // Clear form
      setContent("");
      setBanner("");
      setTitle("");
      // Focus editor after submission
      focusEditor();
      navigate("/discover", { replace: true });
    } catch (error: unknown) {
      let errorMessage = "Failed to create account";
      if (error instanceof Error) {
        errorMessage = `${errorMessage}, ${error.message}`;
      } else if (typeof error === "string") {
        errorMessage = `${errorMessage}, ${error}`;
      } else {
        errorMessage = `${errorMessage}, ${JSON.stringify(error)}`;
      }
      setError(errorMessage);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
      {error && (
        <div className="mb-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <GeneralInput
          inputType="title"
          placeHolder="Your Idea Title"
          value={title}
          onChange={setTitle}
        />
        <Editor
          ref={editorRef}
          value={content}
          onChange={setContent}
          placeholder="Share your idea..."
          className="my-4"
        />

        <div className="flex items-center gap-4 mt-8">
          <GeneralInput
            inputType="image"
            placeHolder="Add media URL (image, gif)"
            value={banner}
            onChange={setBanner}
          />
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <Link className="h-5 w-5 text-gray-400" />
            </button>
            <button
              type="button"
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <Smile className="h-5 w-5 text-gray-400" />
            </button>
            <button
              onClick={handleSubmit}
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-colors flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              Share
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
