import {create} from 'zustand'

interface usePracticeModal{
  isOpen:boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const usePracticeModal = create<usePracticeModal>((set) => ({
  isOpen:false,
  onOpen: () => set({isOpen:true}),
  onClose: () => set({isOpen:false})
}))