import React from "react";
import {
  Bold,
  Code,
  Italic,
  LinkIcon,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo,
  Strikethrough,
  Undo,
  UnlinkIcon,
} from "lucide-react";

import { Toggle } from "@/app/_components/ui/toggle";

import { FormatType } from "./format-type";
import { ToggleGroup } from "@/app/_components/ui/toggle-group";
import { Editor } from "@tiptap/react";
import { Toolbar } from "@/app/_components/ui/toolbar";

interface EditorToolbarProps {
  editor: Editor;
}

const EditorToolbar = ({ editor }: EditorToolbarProps) => {
  return (
    <Toolbar
      className="m-0 flex flex-col items-center justify-between gap-3 p-2"
      aria-label="Formatting options"
    >
      <ToggleGroup
        className="flex flex-row flex-wrap items-center text-foreground"
        type="multiple"
      >
        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          pressed={editor.isActive("bold")}
        >
          <Bold className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          pressed={editor.isActive("italic")}
          value="italic"
        >
          <Italic className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          pressed={editor.isActive("strike")}
        >
          <Strikethrough className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          pressed={editor.isActive("bulletList")}
        >
          <List className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
          pressed={editor.isActive("orderedList")}
        >
          <ListOrdered className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
          pressed={editor.isActive("codeBlock")}
        >
          <Code className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() =>
            editor.chain().focus().toggleBlockquote().run()
          }
          pressed={editor.isActive("blockquote")}
        >
          <Quote className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() =>
            editor.chain().focus().setHorizontalRule().run()
          }
        >
          <Minus className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() => {
            const url = prompt("Enter the URL");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          pressed={editor.isActive("link")}
          disabled={!editor.can().chain().focus().setLink({ href: "" }).run()}
        >
          <LinkIcon className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().unsetLink().run()}
          pressed={!editor.isActive("link")}
          disabled={!editor.can().chain().focus().unsetLink().run()}
        >
          <UnlinkIcon className="h-4 w-4" />
        </Toggle>
      </ToggleGroup>

      <ToggleGroup
        className="hidden flex-row items-center sm:flex"
        type="multiple"
      >
        <FormatType editor={editor} />

        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <Undo className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <Redo className="h-4 w-4" />
        </Toggle>
      </ToggleGroup>
    </Toolbar>
  );
};

export default EditorToolbar;
