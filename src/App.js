import { useState } from "react";
import DirectoryPicker from "./components/directory-picker.tsx";

function App() {
  const [directory, setDirectory] = useState(null);
  const [files, setFiles] = useState(null);
  return (
    <div>
      <h1>Electric Audio</h1>
      <DirectoryPicker setDirectory={setDirectory} setFiles={setFiles} files={files} directory={directory} />
      
    </div>
  );
}

export default App;
