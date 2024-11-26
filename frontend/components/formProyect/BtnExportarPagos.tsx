"use client";

import { PDFIcon } from "@components/icons/PDFIcon";
import { Button } from "@nextui-org/button";
import { downloadPDFPagos } from "@utils/api";

export default function BtnExportarPagos({ id }: { id?: string }) {
  return (
    <Button
      color="danger"
      variant="light"
      onClick={() => {
        if (id) {
          downloadPDFPagos(id);
        }
      }}
      className="inline-flex items-center gap-x-2 w-max -translate-y-8 md:translate-y-0"
    >
      <PDFIcon />
      <span className="hidden md:block">Exportar pagos</span>
    </Button>
  );
}
