"use client"

import React from "react";
import { User , Teacher , TeachersProps } from "@/app/types/types";
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
  ChipProps,
  SortDescriptor,
  Modal,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalFooter,
  useDisclosure
} from "@nextui-org/react";
import {FaPlus , FaChevronDown , FaSearch} from "react-icons/fa";
import {capitalize} from "@/app/types/constants";
import { FaEllipsisVertical } from "react-icons/fa6";


const columns = [
  {name: "FULL NAME", uid: "fullName", sortable: true},
  {name: "EMAIL", uid: "email", sortable: true},
  {name: "SUBJECT", uid: "subject", sortable: true},
  {name: "LEVEL", uid: "level", sortable: true},
  {name: "STATE", uid: "state", sortable: true},
  {name: "ACTIONS", uid: "actions"},
];

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  inactive: "danger",
  pending: "warning",
};

const statusOptions = [
    {name: "Active", uid: "active"},
    {name: "Inactive", uid: "inactive"},
    {name: "In vacation", uid: "pending"}
];

const INITIAL_VISIBLE_COLUMNS = ["fullName", "email", "subject", "level", "state", "actions"];

// Mock data for teachers


export default function TeachersDataGrid({props} : TeachersProps) {
  const teachers = props;
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "fullName",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredTeachers = [...teachers];

    if (hasSearchFilter) {
      filteredTeachers = filteredTeachers.filter((teacher) =>
        teacher.fullName.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== teachers.length) {
      filteredTeachers = filteredTeachers.filter((teacher) =>
        Array.from(statusFilter).includes(teacher.state),
      );
    }

    return filteredTeachers;
  }, [teachers, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Teacher, b: Teacher) => {
      const first = a[sortDescriptor.column as keyof Teacher] || "";
      const second = b[sortDescriptor.column as keyof Teacher] || "";
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((teacher: Teacher, columnKey: React.Key) => {
    const cellValue = teacher[columnKey as keyof Teacher];

    switch (columnKey) {
      case "state":
        return (
          <Chip className="capitalize" color={statusColorMap[teacher.state]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <FaEllipsisVertical className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu classNames={{
                list:"bg-gray-950 rounded-lg p-1"
              }}>
                <DropdownItem>View</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(()=>{
    setFilterValue("")
    setPage(1)
  },[]);

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const initialState : Teacher = {
    fullName : "",
    email : "",
    level: "",
    subject: "",
    state: "active",
  };

  const [inputs , setInputs] = React.useState<Teacher>(initialState);

  function handleInputsChange(e : React.ChangeEvent<HTMLInputElement>) {
    setInputs({...inputs , [e.target.name] : e.target.value});
  };

  async function handleFormSubmit(e : React.MouseEvent<HTMLButtonElement>){
    e.preventDefault();
    
  };

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            variant="bordered"
            color="secondary"
            className="w-full sm:max-w-[44%] bg-transparent border-secondary-500"
            placeholder="Search by name..."
            startContent={<FaSearch />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
            classNames={{
              inputWrapper : "bg-gray-950 text-secondary-500 border-secondary-500"
            }}
          
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<FaChevronDown className="text-small" />} variant="flat">
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
                classNames={{
                  base: "bg-gray-950 rounded-lg",
                }}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<FaChevronDown className="text-small" />} variant="flat">
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
                classNames={{
                  base: "bg-gray-950 rounded-lg",
                }}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button color="primary" endContent={<FaPlus />} onPress={onOpen}>
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">Total {teachers.length} teachers</span>
        <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
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
  teachers.length,
  hasSearchFilter,  
]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="secondary"
          page={page}
          total={pages}
          onChange={setPage}
          classNames={{
            wrapper : "bg-gray-950",
            chevronNext: "text-black", 
          }}
          
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Previous
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);


  return (
    
     <>
     <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px] bg-gray-950",
        th : "bg-gray-900 text-gray-300 text-opacity-70",
        tr : "hover:bg-gray-950 hover:opacity-40 text-white",
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No teachers found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
     <Modal isOpen={isOpen} onOpenChange={onOpenChange} >
       <ModalContent className="bg-gray-950">
         {(onClose) => (
           <>
             <ModalHeader className="flex flex-col gap-1">Add a teacher</ModalHeader>
             <ModalBody>
              <form className="flex flex-col gap-4">
                <Input label="Name" type='text' name='fullName' variant='bordered' color='secondary' value={inputs.fullName} onChange={(e) => handleInputsChange(e)} />
                <Input label="email" type='text' name='email' variant='bordered' color='secondary' value={inputs.email} onChange={(e) => handleInputsChange(e)} />
                <Input label="level" type='text' name='level' variant='bordered' color='secondary' value={inputs.level} onChange={(e) => handleInputsChange(e)} />
                <Input label="subject" type='text' name='subject' variant='bordered' color='secondary' value={inputs.subject} onChange={(e) => handleInputsChange(e)} />
              </form>
             </ModalBody>
             <ModalFooter>
               <Button color="danger" variant="light" onPress={onClose}>
                 Close
               </Button>
               <Button color="secondary" onPress={onClose} onClick={handleFormSubmit}>
                 Save
               </Button>
             </ModalFooter>
           </>
         )}
       </ModalContent>
     </Modal>
   </>
  );
}