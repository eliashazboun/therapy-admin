"use client";

import { useEffect, useState } from "react";
import { PracticeModal } from "@/components/modals/create-practice-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <PracticeModal />
    </>
  );
};
