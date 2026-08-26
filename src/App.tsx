import { useState } from 'react';
import { JSONViewer } from './components/JSONViewer/JSONViewer';
import { UploadZone } from './components/UploadZone/UploadZone';
import './App.css';

function App() {
  const [jsonData, setJsonData] = useState(null);

  return (
    <div className="app">
      <header className="app-header">
        <h1>🔍 JSON Hero</h1>
        <p>Визуализатор JSON-данных</p>
      </header>

      <main className="app-main">
        {!jsonData ? (
            <UploadZone onFileLoaded={setJsonData} />
        ) : (
          <>
            <button 
              onClick={() => setJsonData(null)}
              style={{
                padding: '8px 16px',
                background: '#f44336',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                margin: '10px 10px'
              }}
            >
              ✕ Загрузить новый файл
            </button>
            <JSONViewer data={jsonData} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;