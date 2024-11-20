import { Button } from "@nextui-org/button";
import { useForm } from "@context/FormContext";

export default function BtnReset() {
  const { resetForm, isModified } = useForm();

  return (
    <Button
      onClick={resetForm}
      disabled={!isModified}
      className={`${isModified ? "" : "hidden"}`}
      variant="bordered"
      color="danger"
      size="lg"
    >
      Reset
    </Button>
  );
}
