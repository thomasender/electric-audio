import React from 'react';
import { ipcRenderer } from 'electron';

function DirectoryPicker({ setDirectory, setFiles, directory, files}) {
    const selectDirectory = () => {
    ipcRenderer.send('open-directory-dialog');
  };

ipcRenderer.on('selected-directory', (event, directoryPath, files) => {
  console.log(directoryPath, files);
  setDirectory(directoryPath);
  setFiles(files);
});

 return (
  <>
    <button onClick={selectDirectory}>Select Directory</button>
    {directory && <p>Chosen directory: {directory}</p>}
    {files && (
      <ul>
        {files.map((file, index) => (
          <li key={index}>{file}</li>
        ))}
      </ul>
    )}
  </>
  );
}

export default DirectoryPicker;