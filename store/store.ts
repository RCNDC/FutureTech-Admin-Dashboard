import type { FollowUpListType } from '@/types/followup'
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import {create} from 'zustand'
import {combine, persist} from 'zustand/middleware';

interface FolloUpState {
    followUp: { [key: number]: FollowUpListType },
    changeStatus: (entry_id: number, status: "Completed" | "NotStarted") => void,
    initialFollowUp: (followUps: { [key: number]: FollowUpListType }) => void,
    getFollowUp: (entry:number) => { [key: number]: FollowUpListType }
}

const useFollowUpStore = create<FolloUpState>()(
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

export default useFollowUpStore;