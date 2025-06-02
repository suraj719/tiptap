import { useState, useEffect, useRef } from "react";
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
            <CommandMenu
              setShowMenu={setShowMenu}
              menuCoords={menuCoords}
              editor={editor}
            />
          )}
        </EditorContext.Provider>
      </div>
    </>
  );
}

function CommandMenu({ setShowMenu, menuCoords, editor }: any) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const menuItems = [
    {
      label: "Heading1",
      action: () => {
        setShowMenu(false),
          editor.chain().focus().toggleHeading({ level: 1 }).run();
      },
      component: (onClick: any) => (
        <HeadingButton onClick={onClick} level={1}>
          Heading1
        </HeadingButton>
      ),
    },
    {
      label: "Heading2",
      action: () => {
        setShowMenu(false),
          editor.chain().focus().toggleHeading({ level: 2 }).run();
      },
      component: (onClick: any) => (
        <HeadingButton onClick={onClick} level={2}>
          Heading2
        </HeadingButton>
      ),
    },
    {
      label: "Heading3",
      action: () => {
        setShowMenu(false),
          editor.chain().focus().toggleHeading({ level: 3 }).run();
      },
      component: (onClick: any) => (
        <HeadingButton onClick={onClick} level={3}>
          Heading3
        </HeadingButton>
      ),
    },
    {
      label: "Bullet",
      action: () => {
        setShowMenu(false), editor.chain().focus().toggleBulletList().run();
      },
      component: () => <ListButton type="bulletList">Bullet</ListButton>,
    },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!menuRef.current) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % menuItems.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(
          (prev) => (prev - 1 + menuItems.length) % menuItems.length
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        menuItems[selectedIndex].action();
      } else if (e.key === "Escape") {
        setShowMenu(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, menuItems, setShowMenu]);

  return (
    <div
      ref={menuRef}
      className="absolute bg-gray-100 p-2 rounded shadow-md"
      style={{
        top: menuCoords.top,
        left: menuCoords.left,
      }}
    >
      {menuItems.map((item, index) => (
        <div
          key={item.label}
          className={`p-1 rounded cursor-pointer ${
            index === selectedIndex ? "bg-blue-200" : ""
          }`}
          onMouseEnter={() => setSelectedIndex(index)}
          onClick={item.action}
        >
          {item.component(() => setShowMenu(false))}
        </div>
      ))}
    </div>
  );
}
