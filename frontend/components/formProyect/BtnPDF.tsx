"use client";

import { Button } from "@nextui-org/button";
import { downloadPDF } from "@utils/api";
import { PDFIcon } from "@components/icons/PDFIcon";

export default function BtnPDF({ id }: { id?: string }) {
  return (
    <Button
      color="danger"
      variant="light"
      onClick={() => {
        if (id) {
          downloadPDF(id);
        }
      }}
      className="inline-flex items-center gap-x-2"
    >
      <PDFIcon />
      <span className="hidden md:block">Descargar PDF</span>
    </Button>
  );
}
