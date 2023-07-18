"use client";

import { PanelContainer } from "@/styles/Panel/Panel";
import CustomerPanel from "./CustomerPanel";
import PanelPlayer from "./PanelPlayer";

export default function Panel() {
  return (
    <PanelContainer>
      <CustomerPanel />
      <PanelPlayer />
    </PanelContainer>
  );
}
