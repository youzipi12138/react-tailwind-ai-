import { create } from 'zustand';

interface UIState {
  isSideListCollapsed: boolean;
  toggleSideList: () => void;
}

export const useUIStore = create<UIState>(set => ({
  isSideListCollapsed: false,
  toggleSideList: () =>
    set(state => ({ isSideListCollapsed: !state.isSideListCollapsed })),
}));
