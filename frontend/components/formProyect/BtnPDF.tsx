"use client";

import { Button } from "@nextui-org/button";
import { downloadPDF } from "@utils/api";

export default function BtnPDF({ id }: { id?: string }) {
  return (
    <Button
      color="danger"
      variant="bordered"
      onClick={() => {
        if (id) {
          downloadPDF(id);
        }
      }}
    >
      Descargar PDF
    </Button>
  );
}
