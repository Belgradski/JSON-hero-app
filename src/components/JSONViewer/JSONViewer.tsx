import { useState } from "react";
import type { JSONValue } from "../../types/json.types";
import {JSONNode} from './JSONNode'
import './JSONViewer.css'

interface JSONViewerProps {
    data: JSONValue;
}

export const JSONViewer = ({data}): JSONViewerProps => {
    const [collapsedPaths, setCollapsedPaths] = useState<Set<string>>(new Set())

    const toggleCollapse = (path: string) => {
        const newSet = new Set(collapsedPaths);
        if (newSet.has(path)) {
            newSet.delete(path)
        }
        else { 
            newSet.add(path)
        }
        setCollapsedPaths(newSet)
    }
    return (
        <div className="json-viewer" >
            <div className="json-tree">
                <JSONNode
                data={data}
                path=''
                collapsedPaths={collapsedPaths}
                onToggle={toggleCollapse}
                />
            </div>
        </div>
    )

}
