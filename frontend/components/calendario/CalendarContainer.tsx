"use client";

import { CalendarIcon } from "@components/icons/CalendarIcon";
import CalendarItem from "@components/calendario/CalendarItem";
import { getFechas } from "@utils/api";
import { useEffect, useState } from "react";
import { observaciones } from "@utils/data";

export default function CalendarContainer() {
  const [fechas, setFechas] = useState<DateEntry[]>([]);

  type Event = {
    date: string;
    name: string;
    id: string;
  };

  type DateEntry = {
    date: string;
    events: Event[];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await getFechas();
        const processedDates = processAPIData(apiData);
        setFechas(processedDates);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const processAPIData = (apiData: any): DateEntry[] => {
    const processedDates: DateEntry[] = [];

    // Función para convertir el formato dd/mm/yyyy a yyyy-mm-dd para la comparación
    const convertDateFormatToSortable = (date: string): string => {
      const [day, month, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    };

    // Función para convertir el formato yyyy-mm-dd a dd/mm/yyyy
    const convertDateFormatToDisplay = (sortableDate: string): string => {
      const [year, month, day] = sortableDate.split("-");
      return `${day}/${month}/${year}`;
    };

    apiData.forEach((item: any) => {
      const addEventToDate = (date: string, eventName: string, id: string) => {
        const existingDateEntry = processedDates.find(
          (entry) => entry.date === date
        );
        if (existingDateEntry) {
          existingDateEntry.events.push({ date, name: eventName, id });
        } else {
          processedDates.push({
            date,
            events: [{ date, name: eventName, id }],
          });
        }
      };

      observaciones.forEach(({ value, label }) => {
        if (item[value]) {
          const sortableDate = convertDateFormatToSortable(item[value]);
          addEventToDate(sortableDate, label, item.id);
        }
      });
    });

    // Ordenar por las fechas convertidas a formato sortable (yyyy-mm-dd)
    const sortedDates = processedDates.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Convertir las fechas ordenadas de vuelta al formato dd/mm/yyyy
    sortedDates.forEach((entry) => {
      entry.date = convertDateFormatToDisplay(entry.date);
    });

    return sortedDates;
  };

  const sortAndGroupDates = () => {
    const groupedDates: { [key: string]: DateEntry[] } = {};

    // Lista de los nombres de los meses en español
    const monthNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    fechas.forEach((dateEntry) => {
      const getFormattedMonth = (dateStr: string) => {
        if (typeof dateStr !== "string") {
          throw new Error(
            "El formato de la fecha debe ser una cadena (string)"
          );
        }
        const [day, month, year] = dateStr.split("/");
        const dateObj = new Date(Number(year), Number(month) - 1, Number(day)); // Crear objeto Date
        return { month, year }; // Retornar solo mes y año para facilitar la comparación
      };

      const dateStr = dateEntry.date;
      const { month, year } = getFormattedMonth(dateStr);
      const monthYearKey = `${month}-${year}`; // Crear clave única para mes-año

      if (!groupedDates[monthYearKey]) {
        groupedDates[monthYearKey] = [];
      }
      groupedDates[monthYearKey].push(dateEntry);
    });

    // Ordenar las claves del objeto agrupado
    const sortedKeys = Object.keys(groupedDates).sort((a, b) => {
      const [monthA, yearA] = a.split("-");
      const [monthB, yearB] = b.split("-");

      // Comparar primero por año y luego por mes
      if (yearA !== yearB) {
        return Number(yearA) - Number(yearB);
      } else {
        return Number(monthA) - Number(monthB);
      }
    });

    // Reconstruir el objeto agrupado en orden y convertir la clave a formato mes de año
    const sortedGroupedDates: { [key: string]: DateEntry[] } = {};
    const formattedGroupedDates: { [key: string]: DateEntry[] } = {};

    sortedKeys.forEach((key) => {
      const [month, year] = key.split("-");
      const monthName = monthNames[Number(month) - 1]; // Convertir el número de mes a nombre de mes
      const formattedKey = `${monthName} de ${year}`; // Formato "mes año"

      formattedGroupedDates[formattedKey] = groupedDates[key];
    });

    return formattedGroupedDates;
  };

  const groupedDates = sortAndGroupDates();

  const getDayFromDateEntry = (dateStr: string) => {
    if (typeof dateStr !== "string") {
      throw new Error("El formato de la fecha debe ser una cadena (string)");
    }
    const [day, month, year] = dateStr.split("/");
    // Crear un objeto Date utilizando el formato correcto y ajustar el mes (indexado desde 0)
    const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
    return dateObj.getDate();
  };

  const getWeekdayFromDateEntry = (dateStr: string) => {
    if (typeof dateStr !== "string") {
      throw new Error("El formato de la fecha debe ser una cadena (string)");
    }
    const [day, month, year] = dateStr.split("/");
    // Crear un objeto Date utilizando el formato correcto y ajustar el mes (indexado desde 0)
    const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
    return dateObj.toLocaleDateString("es-ES", { weekday: "short" });
  };

  return (
    <section className="w-full h-max md:p-4 flex flex-col justify-start items-start rounded-md">
      {Object.entries(groupedDates).map(([month, monthDates]) => (
        <div
          key={month}
          className="bg-white dark:bg-opacity-0 w-full rounded-lg shadow-md mb-4 overflow-hidden"
        >
          <div className="bg-gray-100 dark:bg-opacity-0 px-4 py-2">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2" />
              {month}
            </h2>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {monthDates.map((dateEntry) => (
                <CalendarItem
                  key={dateEntry.date}
                  dateEntry={dateEntry}
                  getDayFromDateEntry={getDayFromDateEntry}
                  getWeekdayFromDateEntry={getWeekdayFromDateEntry}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
