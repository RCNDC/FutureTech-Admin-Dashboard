import type { FollowUpListType } from '@/types/followup'
import type { FollowUpNotes } from '@/types/followupnotes';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import {create} from 'zustand'
import {combine, persist} from 'zustand/middleware';

interface FollowUpState {
    followUp: { [key: number]: FollowUpListType },
    changeStatus: (entry_id: number, status: "Completed" | "NotStarted") => void,
    initialFollowUp: (followUps: { [key: number]: FollowUpListType }) => void,
    getFollowUp: (entry:number) => { [key: number]: FollowUpListType }
}

const useFollowUpStore = create<FollowUpState>()(
    persist(
        combine(
            {
                followUp: {},
            },
            (set, get) => ({
                changeStatus(entry_id, status) {
                    set(state => ({
                        followUp: {
                            ...state.followUp,
                            [entry_id]: {
                                ...state.followUp[entry_id],
                                status,
                            }
                        }
                    }));
                },
                initialFollowUp(followUps) {
                    set((state) => ({
                        followUp: {...state, ...followUps}
                    }));
                },
                getFollowUp(entry) {
                    return get().followUp[entry];
                }
            })
        ),
        {
            name: 'test-storage'
        }
    )
)

interface NoteState {
    notes: FollowUpNotes[],
    addNote:(note:FollowUpNotes)=>void,
    initalNotes:(notes:FollowUpNotes[])=>void
    markCompleted: (id:string, status:number)=>void,
    deleteNote:(id:string)=>void
}
export const useFollowUpNoteStore = create<NoteState>()(
    combine(
        {
            notes: [] as FollowUpNotes[]
        },
        (set, get) => ({
            addNote(note: FollowUpNotes) {
                set((state) => ({
                    notes: [...state.notes, note]
                }));
            },
            markCompleted(id: string, status: number) {
                set((state) => ({
                    notes: state.notes.map((n) =>
                        n.Id === id ? { ...n, isCompleted: status } : n
                    )
                }));
            },
            initalNotes(notes){
                set(()=>({
                    notes: notes
                }))
            },
            deleteNote(id: string) {
                set((state) => ({
                    notes: state.notes.filter((n) => n.Id !== id)
                }));
            },
        })
    )
)

export default useFollowUpStore;