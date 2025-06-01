import "@/styles/_keyframe-animations.scss";
import "@/styles/_variables.scss";
import PageEditor from "./components/PageEditor";

export default function App() {
  return (
    <>
      <div className="flex items-center justify-center h-screen p-4">
        <div className="w-[70vw] h-[60vh]">
          <PageEditor />
        </div>
      </div>
    </>
  );
}
