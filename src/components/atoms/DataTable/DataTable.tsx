import { SimpleGrid, Table } from "@mantine/core";
import React from "react";

export interface DataTableProps {
  header: Array<DataTableHeaderProps>;
  data?: any[];
}

export interface DataTableHeaderProps {
  label: string;
  key: any;
}

const DataTable = ({ header, data }: DataTableProps) => {
  return (
    <SimpleGrid className="relative overflow-x-auto">
      <Table striped highlightOnHover withBorder withColumnBorders>
        <thead>
          <tr>
            {header.map((headData, headIndex: number) => {
              return <th key={headIndex}>{headData.label}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data?.map((itemData: any, itemIndex: number) => {
            return (
              <tr key={itemIndex}>
                {header.map((headData, headIndex: number) => {
                  if (headData.key === "index") return <td key={headIndex}>{itemIndex + 1}</td>;
                  if (typeof headData.key === "function")
                    return <td key={headIndex}>{headData.key(itemData, itemIndex)}</td>;
                  return <td key={headIndex}>{itemData?.[headData?.key]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </SimpleGrid>
  );
};

export default DataTable;
