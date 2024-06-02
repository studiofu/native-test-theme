import {create} from 'zustand';

interface ModalStore {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const useModalStore = create<ModalStore>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),  
}));

export default useModalStore;