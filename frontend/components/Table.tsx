"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  Selection,
  SortDescriptor,
} from "@nextui-org/react";

import { PlusIcon } from "@icons/PlusIcon";
import { ChevronDownIcon } from "@icons/ChevronDownIcon";
import { SearchIcon } from "@icons/SearchIcon";
import { AppleIcon } from "@icons/AppleIcon";
import Link from "next/link";
import { columns, statusOptions } from "@utils/data";
import { capitalize } from "@utils/utils";
import { Key } from "@react-types/shared";
import { EyeIcon } from "./icons/EyeIcon";
import { CalendarIcon } from "./icons/CalendarIcon";
import { useForm } from "@context/FormContext";
import {
  priorityColorMap,
  statusColorMap,
  priorityOptions,
  INITIAL_VISIBLE_COLUMNS,
} from "@utils/table";
import { ProyectoTable } from "@tipos/index";
import { VerticalDotsIcon } from "./icons/VerticalDotsIcon";
import DuplicateIcon from "./icons/DuplicateIcon";
import BtnDuplicate from "./table/BtnDuplicate";

export default function TableComponent() {
  const [filterValue, setFilterValue] = React.useState("");
  const { Projects, loadAllProjects, isLoading } = useForm();
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>(
    new Set(["en curso"])
  );
  const [rowsPerPage, setRowsPerPage] = React.useState(Projects?.length || 5);
  React.useEffect(() => {
    loadAllProjects();
    const storedRowsPerPage = localStorage.getItem("rowsPerPage");
    if (storedRowsPerPage) {
      setRowsPerPage(Number(storedRowsPerPage));
    }
  }, []);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "id",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column: { uid: Key }) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredProjects = [...Projects];

    if (hasSearchFilter) {
      filteredProjects = filteredProjects.filter(
        (user) =>
          user.nombre?.toLowerCase().includes(filterValue.toLowerCase()) ||
          user.partida?.toString().includes(filterValue) ||
          user.contacto?.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredProjects = filteredProjects.filter((user) =>
        Array.from(statusFilter).includes(user.estado)
      );
    }

    return filteredProjects;
  }, [Projects, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: ProyectoTable, b: ProyectoTable) => {
      const first = a[sortDescriptor.column as keyof ProyectoTable] as
        | number
        | string
        | undefined;
      const second = b[sortDescriptor.column as keyof ProyectoTable] as
        | number
        | string
        | undefined;

      // Función para determinar si un valor es indefinido o no
      const isUndefined = (val: number | string | undefined) =>
        val === undefined || val === "";

      if (sortDescriptor.direction === "ascending") {
        if (isUndefined(first)) return 1;
        if (isUndefined(second)) return -1;
      } else {
        if (isUndefined(first)) return -1;
        if (isUndefined(second)) return 1;
      }

      const cmp = first! < second! ? -1 : first! > second! ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (user: ProyectoTable, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof ProyectoTable];

      if (
        (cellValue === undefined &&
          columnKey !== "acciones" &&
          columnKey !== "icloud") ||
        (columnKey === "icloud" && !user.archivosIcloud) ||
        (cellValue !== null &&
          typeof cellValue === "object" &&
          Object.keys(cellValue).length === 0)
      )
        return "";

      switch (columnKey) {
        case "icloud":
          return (
            <a
              href={user.archivosIcloud}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full"
            >
              <AppleIcon />
            </a>
          );
        case "prioridad":
          return (
            <Chip
              className="capitalize"
              color={priorityColorMap[user.prioridad] || "default"}
              size="md"
              variant="flat"
            >
              {
                priorityOptions.find((option) => option.uid === user.prioridad)
                  ?.name
              }
            </Chip>
          );
        case "presupuesto":
          if (
            typeof cellValue === "object" &&
            cellValue !== null &&
            "total" in cellValue &&
            "moneda" in cellValue
          ) {
            return `${cellValue.moneda === "USD" ? "USD" : "ARS"} ${cellValue.total}`;
          }
          return typeof cellValue === "object"
            ? JSON.stringify(cellValue)
            : `${cellValue}`;

        case "estado":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[user.estado] || "default"}
              size="sm"
              variant="flat"
            >
              {typeof cellValue === "object"
                ? JSON.stringify(cellValue)
                : `${cellValue}`}
            </Chip>
          );

        case "acciones":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown className="bg-background border-1 border-default-200">
                <DropdownTrigger>
                  <Button isIconOnly radius="full" size="sm" variant="light">
                    <VerticalDotsIcon className="text-default-400" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    href={`/proyectos/${user.id}`}
                    endContent={<EyeIcon />}
                  >
                    Ver
                  </DropdownItem>
                  <DropdownItem endContent={<DuplicateIcon />}>
                    <BtnDuplicate id={user?.id?.toString()} />
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return typeof cellValue === "object"
            ? JSON.stringify(cellValue)
            : `${cellValue}`;
      }
    },
    []
  );

  const onRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRowsPerPage = Number(e.target.value);
    setRowsPerPage(newRowsPerPage);

    // Guardar en localStorage en el cliente
    if (typeof window !== "undefined") {
      localStorage.setItem("rowsPerPage", e.target.value);
    }

    setPage(1); // Si tienes `setPage` en el código
  };

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Buscar por nombre, partida o contacto..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="grid grid-cols-2 grid-rows-2 w-full sm:flex sm:w-max gap-3">
            <Dropdown>
              <DropdownTrigger className="flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Estado
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map(
                  (status: { uid: string | number | undefined; name: any }) => (
                    <DropdownItem key={status.uid} className="capitalize">
                      {capitalize(status.name)}
                    </DropdownItem>
                  )
                )}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columnas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map(
                  (column: { uid: string | number | undefined; name: any }) => (
                    <DropdownItem key={column.uid} className="capitalize">
                      {capitalize(column.name)}
                    </DropdownItem>
                  )
                )}
              </DropdownMenu>
            </Dropdown>
            <Button
              as={Link}
              href="/calendario"
              className="bg-green-900 text-white col-span-2"
              endContent={<CalendarIcon />}
            >
              Alertas
            </Button>
            <Button
              color="primary"
              endContent={<PlusIcon />}
              className="col-span-2"
              as={Link}
              href="/proyectos"
            >
              Agregar nuevo
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {Projects.length} proyectos
          </span>
          <label className="flex items-center text-default-400 text-small">
            Proyectos por página:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
              value={rowsPerPage}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value={Projects.length}>Todos</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    Projects.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="text-default-400 text-small">
          Mostrando {items.length} de {filteredItems.length} proyectos
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      isStriped
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      selectionMode="none"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
      fullWidth
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "acciones" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={
          isLoading ? "Cargando proyectos..." : "No se encontraron proyectos"
        }
        items={sortedItems}
      >
        {(item: ProyectoTable) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
