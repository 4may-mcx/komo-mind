export interface BaseTableColumnsType<T, K extends keyof T = any> {
  title: string;
  render?: (data: T[K], record: T) => React.ReactNode | Element;
  align?: "left" | "center" | "right";
  width?: string;
  dataIndex?: keyof T;
}
