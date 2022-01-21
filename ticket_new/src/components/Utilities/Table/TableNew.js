import React from 'react'
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

function TableNew({ columns, data }) {
  return (
    <>

                                    {/* <DataTableExtensions
                                {...tableData}
                                > */}
      <DataTable
        pagination
        filtering
        searching
        export
        highlightOnHover
		pointerOnHover
        tableResponsive
        defaultSortField="id"
        defaultSortAsc={false}
        columns={columns}
        data={data}
      />
    </>

  )
}

export default TableNew

