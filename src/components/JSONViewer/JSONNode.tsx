import { useState } from "react";
import type { JSONValue } from "../../types/json.types";

interface JSONNodeProps {
  data: JSONValue;
  path: string;
  collapsedPaths: Set<string>;
  onToggle: (path: string) => void;
  keyName?: string;
}

export const JSONNode = ({
  data,
  path,
  collapsedPath,
  onToggle,
  keyName,
}: JSONNodePtops) => {
    const isCollapsed = collapsedPath.has(path);

    if (data === null) {
        return <span className='json-null'>null</span>
    }

    if (typeof data !== 'object') {
        return (
            <span className="json-"></span>
        )
    }

};
