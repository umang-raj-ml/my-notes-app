
import {type  Note } from "../types/note";

interface NoteItemProps {
    note: Note;
    onDelete: () => void;
    onPin: () => void;
    onEdit: () => void;
}

export default function NoteItem({note, onDelete, onEdit, onPin}: NoteItemProps) {
    return (
        <div className={`rounded shadow p-4 relative bg-gray-50 ${note.pinned ? 'border-l-4 border-yellow-400' : ''} `}>
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">{note.title}</h3>
                <button
                onClick={onPin}
                title={note.pinned ? 'Unpin' : 'Pin'}
                className={`ml-2 p-1 rounded cursor-pointer ${note.pinned ? 'bg-yellow-300' : 'bg-gray-200 hover:bg-yellow-200'}`}
                >
                    <span role="img" aria-label="star">{note.pinned ? '★' : '☆'}</span>
                </button>
            </div>
            <p className="mb-3 whitespace-pre-line">{note.content}</p>
            <div className="flex gap-2">
                <button onClick={onEdit} className="text-blue-500 hover:underline cursor-pointer">Edit</button>
                <button onClick={onDelete} className="text-red-500 hover:underline cursor-pointer">Delete</button>
            </div>
                <span className="absolute bottom-2 right-3 text-xs text-gray-400">{new Date(note.createdAt).toLocaleString()}</span>
        </div>
    )
}