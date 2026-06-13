import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function FileUploader({ onFile }) {
  const [file, setFile] = useState(null);
  const onDrop = useCallback((acceptedFiles) => { const f = acceptedFiles[0]; if (f) { setFile(f); onFile(f); } }, [onFile]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'], 'application/msword': ['.doc'], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] },
    maxFiles: 1, maxSize: 5 * 1024 * 1024
  });

  return (
    <div className={`dropzone ${isDragActive ? 'active' : ''}`} {...getRootProps()}>
      <input {...getInputProps()} />
      <div className="dropzone-icon">📄</div>
      {file ? (
        <><p className="dropzone-filename">{file.name}</p><p className="dropzone-hint">Click to replace</p></>
      ) : (
        <><p className="dropzone-text">{isDragActive ? 'Drop it here!' : 'Drag & drop your resume'}</p><p className="dropzone-hint">PDF or Word · Max 5MB</p></>
      )}
    </div>
  );
}