
import {type  Note } from "../types/note";
import NoteItem from "./NoteItem";

interface NotesListProps{
    notes: Note[];
    onDelete: (id: string) => void;
    onPin: (id: string) => void;
    onEdit: (id: string) => void;
}

export default function NotesList({notes, onDelete, onEdit, onPin}: NotesListProps) {
    if(notes.length === 0)  return <p className="text-gray-400 text-center">No notes yet.</p>

    //Pinned notes should be displayed first
    const pinned = notes.filter(n => n.pinned);
    const others = notes.filter(n => !n.pinned)

    return(
        <div className="grid gap-4">
            {[...pinned, ...others].map(note => 
                <NoteItem 
                key={note.id}
                note={note}
                onDelete={() => onDelete(note.id)}
                onPin={() => onPin(note.id)}
                onEdit={() => onEdit(note.id)}
                />
            )}
        </div>
    )
}