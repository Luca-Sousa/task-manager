import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Link } from "@tiptap/extension-link";
import EditorToolbar from "./toolbar/editor-toolbar";

interface EditorProps {
  content: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const Editor = ({ content, placeholder, onChange }: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false, // Desativa abrir o link ao clicar
        linkOnPaste: true, // Detecta links automaticamente ao colar
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div className="prose w-full max-w-none border border-input bg-background dark:prose-invert">
      <EditorToolbar editor={editor} />
      <div className="editor">
        <EditorContent
          editor={editor}
          placeholder={placeholder}
          className="prose-sm overflow-hidden px-3 text-foreground prose-headings:text-foreground prose-h1:mt-2 prose-a:text-primary prose-ul:py-0 prose-li:leading-3"
        />
      </div>
    </div>
  );
};

export default Editor;
