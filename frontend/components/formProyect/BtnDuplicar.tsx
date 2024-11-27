"use client";

import DuplicateIcon from "@components/icons/DuplicateIcon";
import { Button } from "@nextui-org/button";
import { handleDuplicate } from "@utils/utils";
import { useForm } from "@context/FormContext";

export default function BtnDuplicar({ id }: { id?: string }) {
  const { isModified } = useForm();

  return (
    <Button
      size="lg"
      color="warning"
      onClick={async () => await handleDuplicate(id as string)}
      endContent={<DuplicateIcon />}
      isDisabled={isModified}
    >
      Duplicar
    </Button>
  );
}
