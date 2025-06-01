import { useState } from "react";
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import { StarterKit } from "@tiptap/starter-kit";
import { HeadingDropdownMenu } from "@/components/tiptap-ui/heading-dropdown-menu";
import { MarkButton } from "@/components/tiptap-ui/mark-button";
import { ListButton } from "@/components/tiptap-ui/list-button";
import { HeadingButton } from "@/components/tiptap-ui/heading-button";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/code-block-node/code-block-node.scss";

export default function PageEditor() {
  const [showMenu, setShowMenu] = useState(false);
  const [menuCoords, setMenuCoords] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "",
      }),
    ],
    editorProps: {
      handleKeyDown(view, event) {
        if (event.key === "/") {
          const { from } = view.state.selection;
          const coords = view.coordsAtPos(from);
          setMenuCoords({ top: coords.top + 30, left: coords.left });
          event.preventDefault();
          setShowMenu(true);
          return true;
        }
        if (event.key === "Escape" && showMenu) {
          setShowMenu(false);
          return true;
        }
        return false;
      },
    },
  });
  return (
    <>
      <div className="bg-gray-200 rounded p-4 h-full">
        <EditorContext.Provider value={{ editor }}>
          <div className="flex justify-start bg-gray-100 rounded mb-4">
            <HeadingDropdownMenu levels={[1, 2, 3, 4]} />
            <MarkButton type="bold" />
            <MarkButton type="italic" />
            <MarkButton type="strike" />
            <MarkButton type="code" />
            <ListButton type="bulletList" />
          </div>
          <EditorContent
            className="h-full max-h-[90%] overflow-y-auto"
            editor={editor}
            role="presentation"
          />
          {showMenu && (
            <CommandMenu setShowMenu={setShowMenu} menuCoords={menuCoords} />
          )}
        </EditorContext.Provider>
      </div>
    </>
  );
}

function CommandMenu({ setShowMenu, menuCoords }: any) {
  return (
    <>
      <div
        className={`absolute bg-gray-100 p-2 rounded shadow-md`}
        style={{
          top: menuCoords.top,
          left: menuCoords.left,
        }}
      >
        <HeadingButton onClick={() => setShowMenu(false)} level={1}>
          Heading1
        </HeadingButton>
        <HeadingButton onClick={() => setShowMenu(false)} level={2}>
          Heading2
        </HeadingButton>
        <HeadingButton onClick={() => setShowMenu(false)} level={3}>
          Heading3
        </HeadingButton>
        <ListButton type="bulletList">Bullet</ListButton>
      </div>
    </>
  );
}
