"use client";
import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import { PageButton } from "./paginationButtons";

import { useAsyncDebounce } from "../../../hooks/use_debounce";
import Button from "../Button";
import { SortDownIcon, SortIcon, SortUpIcon } from "./sorting";

export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id, render },
}: any) {
  const options = React.useMemo(() => {
    const options = new Set<string>();
    for (const row of preFilteredRows) {
      options.add(row.values[id]);
    }
    return Array.from(options.values());
  }, [id, preFilteredRows]);

  return (
    <div className="flex items-baseline gap-x-2">
      <span className="text-gray-700">{render("Header")}: </span>
      <select
        className="border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        name={id}
        id={id}
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function GlobalFilter({
  //   preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter, //   filterOption,
}: any) {
  //   const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onFilterChange = useAsyncDebounce((value: any) => {
    setGlobalFilter(value || undefined);
  }, 200);
  return (
    <div className=" flex mt-2 w-full gap-2 items-center justify-start ">
      <div className="flex items-center float-right lg:w-[30%] sm:w-6/12 border rounded-md px-2 border-gray-300 ">
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          className="border-none flex-1 outline-none focus:outline-none focus:border-none w-40 focus:ring-0 focus:ring-opacity-50 sm:w-60 md:w-80 lg:w-96 xl:w-96 2xl:w-96"
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onFilterChange(e.target.value);
          }}
          placeholder={`search`}
        />
      </div>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function Table({
  columns,
  data,
  filterOptions,
  btnText,
  title,
  subtitle,
  dataName,
  btnfunc,
}: any) {
  const {
    state,
    pageOptions,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    // pageCount,
    gotoPage,
    nextPage,
    previousPage,
    preGlobalFilteredRows,
    setGlobalFilter,
    setPageSize,
  }: any = useTable(
    {
      columns,
      data,
      // initialState: { pageIndex: 1 },
    },
    useFilters, // useFilters!
    useGlobalFilter,
    useSortBy,
    usePagination // new
  );

  const isMobile = true;

  return (
    <div className="text-left  bg-white rounded-md border overflow-hidden">
      {/* SEARCH UI */}
      <div className="px-4 py-4 border-b border-gray-300 w-full  flex items-center justify-between">
        <div>
          <h1 className=" flex item text-2xl font-medium text-gray-900">
            {title}{" "}
            <span className=" ml-2 text-xs flex items-center py-[2px] px-2 rounded-full bg-red-50 text-red-500">
              {data.length} {dataName}
            </span>
          </h1>
          <span className="hidden md:flex text-sm text-gray-500">
            {subtitle}
          </span>
        </div>
        <div>
          {btnText && (
            <Button size={"NORMAL"} type="button" onClick={btnfunc}>
              {btnText}
            </Button>
          )}
        </div>
      </div>
      <div className="flex px-4 items-center justify-between mb-4">
        <GlobalFilter
          filterOption={filterOptions}
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        {headerGroups.map((headerGroup: any) =>
          headerGroup.headers.map((column: any) =>
            column.Filter ? (
              <div className="mt-2 sm:mt-0" key={column.title}>
                {column.render("Filter")}
              </div>
            ) : null
          )
        )}
      </div>
      {/* TABLE UI */}
      <div className="mt-2 flex flex-col">
        <div className="-my-2 overflow-x-auto  sm:-mx-6 lg:-mx-8">
          <div className=" align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className={`shadow overflow-hidden border-b border-gray-200 `}>
              <table
                {...getTableProps()}
                className="min-w-full divide-y divide-gray-200"
              >
                <thead>
                  {headerGroups.map((headerGroup: any) => (
                    <tr
                      key={headerGroup}
                      {...headerGroup.getHeaderGroupProps()}
                    >
                      {headerGroup.headers.map(
                        (column: any, columnIndex: any) => {
                          if (
                            isMobile ||
                            columnIndex === 0 ||
                            columnIndex === headerGroup.headers.length - 1
                          ) {
                            return (
                              <th
                                key={column}
                                scope="col"
                                className={`group px-6 py-3 border-t border-gray-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}
                                {...column.getHeaderProps(
                                  column.getSortByToggleProps()
                                )}
                              >
                                <div className="flex items-center justify-between">
                                  {column.render("Header")}
                                  <span>
                                    {column.isSorted ? (
                                      column.isSortedDesc ? (
                                        <SortDownIcon className="w-4 h-4 text-gray-400" />
                                      ) : (
                                        <SortUpIcon className="w-4 h-4 text-gray-400" />
                                      )
                                    ) : (
                                      <SortIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                                    )}
                                  </span>
                                </div>
                              </th>
                            );
                          }
                          return null;
                        }
                      )}
                    </tr>
                  ))}
                </thead>
                <tbody
                  {...getTableBodyProps()}
                  className="divide-y divide-gray-200"
                >
                  {page.map((row: any) => {
                    prepareRow(row);
                    return (
                      <tr key={row} {...row.getRowProps()} className="bg-white">
                        {row.cells.map((cell: any, cellIndex: any) => {
                          if (
                            isMobile ||
                            cellIndex === 0 ||
                            cellIndex === row.cells.length - 1
                          ) {
                            return (
                              <td
                                key={cell}
                                {...cell.getCellProps()}
                                className="px-6 py-4"
                                role="cell"
                              >
                                {cell.column.Cell.name === "defaultRenderer" ? (
                                  <div className="text-sm text-gray-500">
                                    {cell.render("Cell")}
                                  </div>
                                ) : (
                                  cell.render("Cell")
                                )}
                              </td>
                            );
                          }
                          return null;
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <br />
      {/* Pagination */}

      <nav className="flex items-center pb-4 justify-between sm:px-0 pagBackground">
        <div className="px-4 flex flex-1 w-0 ">
          <div className="inline-flex flex-col items-center pr-1 text-sm font-medium border-transparent">
            <div className="hidden md:inline-block lg:inline-block">
              <span>
                Page{" "}
                <span>
                  {state.pageIndex + 1} of {pageOptions.length}
                </span>{" "}
                <span className="ml-2">
                  &nbsp; Go to : &nbsp;
                  <input
                    type="number"
                    defaultValue={state.pageIndex + 1}
                    onChange={(e) => {
                      const page = e.target.value
                        ? Number(e.target.value) - 1
                        : 0;
                      gotoPage(page);
                    }}
                    className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-opacity-50 w-14"
                  />
                </span>
                <span>
                  <select
                    className="form-select appearance-none
                    border border-primary rounded-md ml-3 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 w-[105px]"
                    value={state.pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                    }}
                  >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                      </option>
                    ))}
                  </select>
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className=" px-4 flex justify-end gap-2 flex-1 w-0 ">
          <PageButton
            onClick={() => {
              // setCurrentPage((prev) => prev - 1);
              previousPage();
            }}
            className="pagButton"
            disabled={!canPreviousPage}
          >
            Previous
          </PageButton>

          <PageButton
            onClick={() => {
              //setCurrentPage((prev) => prev + 1);
              nextPage();
            }}
            disabled={!canNextPage}
            className="pagButton"
          >
            Next
          </PageButton>
        </div>
      </nav>
    </div>
  );
}

export default Table;
