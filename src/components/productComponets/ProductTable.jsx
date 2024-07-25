import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import { Box, Pagination, Stack } from "@mui/material";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getProducts } from "../../api";
import EditableCell from "./EditableCell";
import EditToolCell from "./EditToolCell";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductTable = ({
  refresh,
  refreshList,
  setAlert,
  query,
  search,
  setSearch,
}) => {
  const [tableData, setTableData] = useState([]);
  const [sorting, setSorting] = useState({
    id: "update_time",
    order: "desc",
  });
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState("true");
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.display({
      id: "index",
      header: "商品番号",
      cell: ({ row }) => row.index + 1,
      size: 80,
    }),
    columnHelper.accessor("product_name", {
      header: "商品名",
      cell: EditableCell,
    }),
    columnHelper.accessor("price", {
      header: "価格",
      cell: EditableCell,
    }),
    columnHelper.accessor("create_time", {
      header: "作成時間",
      cell: ({ getValue }) => formatDate(getValue()),
    }),
    columnHelper.accessor("update_time", {
      header: "更新時間",
      cell: ({ getValue }) => formatDate(getValue()),
    }),
    columnHelper.accessor("product_info", {
      header: "商品情報",
      cell: EditableCell,
    }),
    columnHelper.accessor("unique_code", {
      header: "商品コード",
      cell: EditableCell,
    }),
    columnHelper.display({
      id: "edit",
      cell: (props) => (
        <EditToolCell
          {...props}
          originalData={originalData}
          refreshList={refreshList}
          setAlert={setAlert}
        />
      ),
    }),
  ];

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const [editedRows, setEditedRows] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const params = [
        pagination.pageIndex + 1,
        pagination.pageSize,
        sorting.id,
        sorting.order,
      ];
      if (query) {
        params.push(query);
      }
      try {
        const res = await getProducts(...params);
        if (res.status === 200) {
          setTableData(res.data.products);
          setOriginalData(res.data.products);
          setTotalRows(res.data.total);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading("false");
        setSearch(false);
      }
    };
    if (!query || (query && search)) {
      setLoading("true");
      fetchData();
    }
  }, [refresh, pagination, sorting, query, search, setSearch]);

  const [originalData, setOriginalData] = useState([]);

  const handleSort = (column, clickedDirection) => {
    setSorting({ id: column.id, order: clickedDirection });
  };

  const renderSortIcons = (column) => {
    if (column.id === "create_time" || column.id === "update_time") {
      return (
        <Stack direction="row" spacing={0.5} alignItems="center">
          <NorthIcon
            onClick={() => handleSort(column, "asc")}
            sx={{
              cursor: "pointer",
              fontSize: 20,
              color:
                sorting.id === column.id && sorting.order === "asc"
                  ? "#fff"
                  : "#9f9e9ee3",
            }}
          />
          <SouthIcon
            onClick={() => handleSort(column, "desc")}
            sx={{
              cursor: "pointer",
              fontSize: 20,
              color:
                sorting.id === column.id && sorting.order === "desc"
                  ? "#fff"
                  : "#9f9e9ee3",
            }}
          />
        </Stack>
      );
    }
    return null;
  };

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: Math.ceil(totalRows / pagination.pageSize),
    manualPagination: true,

    meta: {
      editedRows,
      setEditedRows,

      updateData: (rowIndex, columnId, value) => {
        setTableData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },

      revertData: (rowIndex, revert) => {
        if (revert) {
          setTableData((old) =>
            old.map((row, index) =>
              index === rowIndex ? originalData[rowIndex] : row
            )
          );
        }
      },
    },
  });

  return (
    <>
      <Box
        component="div"
        sx={{
          maxHeight: "60vh",
          overflow: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "1px solid #ccc",
          }}
        >
          <thead
            style={{
              position: "sticky",
              top: 0,
              backgroundColor: "#3a6ea5",
              color: "#fff",
              textAlign: "left",
              zIndex: 1,
            }}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{
                      padding: "10px",
                      width: header.getSize(),
                    }}
                  >
                    <Stack
                      direction={"row"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {renderSortIcons(header.column)}
                    </Stack>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                style={{
                  borderBottom: "1px solid #ccc",
                  backgroundColor: row.index % 2 === 0 ? "#F2F2F2" : "#fff",
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    style={{
                      padding: "10px",
                      minWidth: "fit-content",
                      whiteSpace: "nowrap",
                      fontSize:
                        cell.column.columnDef.header === "作成時間" ||
                        cell.column.columnDef.header === "更新時間"
                          ? "12px"
                          : "14px",
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Box>

      {loading === "true" ? (
        <Stack gap={3}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} height={30} />
          ))}
        </Stack>
      ) : (
        tableData.length === 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              padding: "10px",
              borderRadius: "5px",
              backgroundColor: "#FFF3E5",
              color: "#694005",
              width: "50%",
              margin: "10px auto",
              fontSize: "16px",
            }}
          >
            <ErrorOutlineIcon />
            対応商品はございません
          </Box>
        )
      )}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          count={table.getPageCount()}
          page={table.getState().pagination.pageIndex + 1}
          onChange={(event, value) => table.setPageIndex(value - 1)}
          color="primary"
        />
      </Box>
    </>
  );
};

ProductTable.propTypes = {
  refresh: PropTypes.bool,
  refreshList: PropTypes.func,
  setAlert: PropTypes.func,
  query: PropTypes.string,
  search: PropTypes.bool,
  setSearch: PropTypes.func,
};
export default ProductTable;
