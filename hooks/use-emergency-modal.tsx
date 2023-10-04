import {create} from 'zustand'

interface useEmergencyModal{
  isOpen:boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useEmergencyModal = create<useEmergencyModal>((set) => ({
  isOpen:false,
  onOpen: () => set({isOpen:true}),
  onClose: () => set({isOpen:false})
}));
