export type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

export interface JSONNodeProps {
    data: JSONValue;
    keyName?: string;
    isRoot?: boolean;
    depth?: number
}