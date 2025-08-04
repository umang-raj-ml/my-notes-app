import React, { useState } from "react"

interface NoteFormProps {
    onSubmit: (note: {title: string; content: string}) => void;
    initial?: {title: string; content: string};
    submitLabel?: string;
}

export default function NoteForm({
    onSubmit,
    initial = {title: '', content: ''},
    submitLabel = 'Add Note'
}: NoteFormProps){

    const [title, setTitle] = useState(initial.title)
    const [content, setContent] = useState(initial.content);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if(!title.trim() || !content.trim())    return;
        onSubmit({title, content});
        setTitle('')
        setContent('')
    }

    return(
        <form onSubmit={handleSubmit}  className="bg-white shadow p-4 rounded flex flex-col gap-2 mb-4">
            <input 
                type="text" 
                className="border rounded px-2 py-1"
                placeholder="Note title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                autoFocus
            />
            <textarea 
                className="border rounded px-2 py-1"
                placeholder="Note content"
                value={content}
                onChange={e => setContent(e.target.value)}
            />
            <button className="bg-blue-500 text-white py-1 rounded hover:bg-blue-600 transition" type="submit">
                {submitLabel}
            </button>
        </form>
    )
}