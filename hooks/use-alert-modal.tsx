
import {create} from 'zustand'

interface useAlertModal{
  isOpen:boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useAlertModal = create<useAlertModal>((set) => ({
  isOpen:false,
  onOpen: () => set({isOpen:true}),
  onClose: () => set({isOpen:false})
}));