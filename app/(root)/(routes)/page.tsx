"use client"
import { usePracticeModal } from "@/hooks/use-practice-modal";
import { useEffect } from "react";


const SetupPage = () => {
  const onOpen = usePracticeModal((state) => state.onOpen);
  const isOpen = usePracticeModal((state) => state.isOpen);

  useEffect(() => {
    if(!isOpen){
      onOpen()
    }
  }, [isOpen, onOpen])

  return null;
}
export default SetupPage;
