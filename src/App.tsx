import { useEffect, useState } from 'react'
import './App.css'
import NotesList from './components/NotesList'
import type { Note } from './types/note';
import NoteForm from './components/NoteForm';

const LS_KEY = 'react-notes-ts';

function loadNotes(): Note[] {
  const raw = localStorage.getItem(LS_KEY)
  return raw ? JSON.parse(raw) : []
}

function saveNotes(notes: Note[]): void {
  localStorage.setItem(LS_KEY, JSON.stringify(notes))
}

function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    setNotes(loadNotes())
  }, [])

  useEffect(() => {
    saveNotes(notes);
  }, [notes])

  function addNote({title, content}: {title: string; content: string;}){
    setNotes(notes => [
      {id: crypto.randomUUID(), title, content, pinned: false, createdAt:Date.now() },
      ...notes,
    ])
  }

  function deleteNote(id: string){
    setNotes(notes => notes.filter(n => n.id !== id));
  }

  function pinNote(id: string){
    setNotes(notes => notes.map(n => n.id === id ? {...n, pinned: !n.pinned } : n))
  }

  function startEdit(id: string){
    setEditingId(id);
  }

  function editNode(values: {title: string; content: string}) {
    setNotes(notes => 
      notes.map(n => n.id === editingId ? {...n, ...values } : n)
    )
    setEditingId(null);
  }

  const editingNote = notes.find(n => n.id === editingId)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-pink-50 p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6 mt-8 text-center">📝 Notes App</h1>

        {editingId && editingNote ? (
          <NoteForm 
            onSubmit={editNode}
            initial={{title: editingNote.title, content: editingNote.content}}
            submitLabel='Save'
          />
        ) : (
          <NoteForm onSubmit={addNote} />
        )}

        <NotesList 
         notes={notes} 
         onDelete={deleteNote}
         onPin={pinNote}
         onEdit={startEdit}
        />
      </div>
    </div>
  )
}

export default App
