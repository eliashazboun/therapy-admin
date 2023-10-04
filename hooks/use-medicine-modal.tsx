import {create} from 'zustand'

interface useMedicineModal{
  isOpen:boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useMedicineModal = create<useMedicineModal>((set) => ({
  isOpen:false,
  onOpen: () => set({isOpen:true}),
  onClose: () => set({isOpen:false})
}));
