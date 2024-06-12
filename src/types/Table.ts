import { ReactNode } from "react";


export interface Column {
  header: string,
  accessorKey: string,
  cell?: ({ cell }: {
    cell: {
      renderValue(arg: string): string;
    }
  }) => ReactNode;
}