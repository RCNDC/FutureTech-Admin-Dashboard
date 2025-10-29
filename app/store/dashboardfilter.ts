
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type DashboardFilterState = {
    filter: 'Participants' | 'Attendees';
    setFilter: (filter: 'Participants' | 'Attendees') => void;
};

export const useDashboardFilterStore = create<DashboardFilterState>()(
    persist(
        (set) => ({
            filter: 'Participants',
            setFilter: (filter) => set({ filter }),
        }),
        {
            name: 'dashboard-filter-storage', // name of the item in the storage (must be unique)
        }
    )
);
