"use client";

import { Skeleton } from "@nextui-org/react";

export default function FormContainerSkeleton() {
  return (
    <form className="mt-4 w-full flex flex-col gap-y-8">
      <div className="dark:bg-opacity-10 bg-white shadow-small rounded-lg w-full h-64 px-4 py-4 flex flex-col gap-y-4">
        <div className="w-full">
          <h3 className="text-lg font-semibold">Datos del Proyecto</h3>
        </div>
        <Skeleton className="w-full h-full" />
      </div>
      <div className="dark:bg-opacity-10 bg-white shadow-small rounded-lg w-full h-32 px-4 py-4 flex flex-col gap-y-4">
        <div className="w-full">
          <h3 className="text-lg font-semibold">Datos de los Propietarios</h3>
        </div>
        <Skeleton className="w-full h-full" />
      </div>
      <div className="dark:bg-opacity-10 bg-white shadow-small rounded-lg w-full h-64 px-4 py-4 flex flex-col gap-y-4">
        <div className="w-full">
          <h3 className="text-lg font-semibold">Datos Catastrales</h3>
        </div>
        <Skeleton className="w-full h-full" />
      </div>
      <div className="dark:bg-opacity-10 bg-white shadow-small rounded-lg w-full h-64 px-4 py-4 flex flex-col gap-y-4">
        <div className="w-full">
          <h3 className="text-lg font-semibold">Pagos realizados</h3>
        </div>
        <Skeleton className="w-full h-full" />
      </div>
      <div className="dark:bg-opacity-10 bg-white shadow-small rounded-lg w-full h-64 px-4 py-4 flex flex-col gap-y-4">
        <div className="w-full">
          <h3 className="text-lg font-semibold">Seguimiento del Proyecto</h3>
        </div>
        <Skeleton className="w-full h-full" />
      </div>
    </form>
  );
}
