import {create} from 'zustand'

interface useDisorderModal{
  isOpen:boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useDisorderModal = create<useDisorderModal>((set) => ({
  isOpen:false,
  onOpen: () => set({isOpen:true}),
  onClose: () => set({isOpen:false})
}));