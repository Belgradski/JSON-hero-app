import {useState, useRef} from 'react'

interface UploadZoneProps {
    onFileLoaded: (data: any) => void;
}

export const UploadZone = ({onFileLoaded}: UploadZoneProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const jsonData = JSON.parse(e.target?.result as string) ;
                onFileLoaded(jsonData)
            }
            catch(error) {
                console.log('Невалидный JSON-файл', error)
                alert('Невалидный JSON-файл')
            }
        }
        reader.readAsText(file)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type === 'application/json') {
            handleFile(file)
        } else {
            alert('Пожалуйста загрузите .json файл')
        }
    }

    const handleDragOver = (e:React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    return (
        <div className={`upload-zone ${isDragging ? 'dragging' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        style={{
            border: `2px dashed ${isDragging ? "#4caf50" : '#666'}`,
            padding: "40px",
            textAlign: 'center',
            borderRadius: '12px',
            cursor: 'pointer',
            backgroundColor: `${isDragging ? '#2a2a2a' : '#1a1a1a'}`,
            transition: 'All 0.3s',
            color: '#fff'
        }}
        >
            <input 
            type='file'
            ref={fileInputRef}
            accept='.json'
            onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {handleFile(file)}
            }}
            style={{
                display: 'none'
            }}
            />
            <div>
                <h3>Перетащите JSON-файл сюда</h3>
                <p>или клинките, чтобы выбрать</p>
            </div>
        </div>
    )

}