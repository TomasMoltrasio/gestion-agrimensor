"use client";
import { Button } from "@nextui-org/button";
import { updateAlerta } from "@utils/api";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Input, useDisclosure, DatePicker } from "@nextui-org/react";
import { I18nProvider } from "@react-aria/i18n";
import { parseDate } from "@internationalized/date";
import { useState } from "react";
import Swal from "sweetalert2";
import { AlertIcon } from "@components/icons/AlertIcon";

export default function BtnNewAlert({ id }: { id: string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [mensaje, setMensaje] = useState<string>("");
  const [fecha, setFecha] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );

  const handleSave = async () => {
    try {
      if (!mensaje || !fecha) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Debes completar todos los campos",
        });
        return;
      }
      const [year, month, day] = fecha.split("-");
      const fechaFormateada = `${day}/${month}/${year}`;
      const res = await updateAlerta(id, mensaje, fechaFormateada);
      if (!res) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo guardar la alerta",
        });
        return;
      }
      Swal.fire({
        icon: "success",
        title: "Guardado",
        text: "Alerta guardada correctamente",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button
        color="success"
        variant="flat"
        onPress={onOpen}
        className="inline-flex items-center gap-x-2"
      >
        <AlertIcon />
        <span className="hidden md:block"> Nueva Alerta</span>
      </Button>
      <Modal
        isOpen={isOpen}
        placement="top-center"
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Nueva alerta
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Mensaje"
                  placeholder="Escribe tu mensaje"
                  variant="bordered"
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                />
                <I18nProvider locale="es-AR">
                  <DatePicker
                    label="Fecha"
                    variant="bordered"
                    value={parseDate(fecha)}
                    onChange={(date) => setFecha(date?.toString().slice(0, 10))}
                    // defaultValue={parseDate(new Date().toISOString())}
                  />
                </I18nProvider>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancelar
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    handleSave();
                    onClose();
                  }}
                >
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
