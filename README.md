# 📝 TipTap Custom Editor

## 🚀 Features

### 🔤 Basic Editing

- Paragraphs, headings (H1-H4), bullet lists
- Bold, italic, strikethrough, code

### ⚡ Slash Command

- Type `/` to open a custom-built slash menu
- Select heading levels and other options from the menu
- Automatically positioned near the cursor

### ⌨️ Keyboard shortcut for quick formatting
- ctrl+B for bold
- ctrl+I for italic
- ctrl+shift+s for strikethrough
- ctrl+E for code

## 🎥 Demonstration
[Click here to watch the demo](https://vimeo.com/1089447173/e67cd9df3f)
## 🛠️ Local Setup

### 1. Clone the repo

```bash
git clone https://github.com/suraj719/tiptap-editor.git
cd tiptap-editor
```

### 2. Install dependencies

```
npm install
```

### 3. Run the development server

```
npm run dev
```

# 🔧 Slash Command Menu
- Triggers on / keypress.
- Uses EditorView.coordsAtPos() to position the menu precisely.
- Closes on command selection or Escape key.