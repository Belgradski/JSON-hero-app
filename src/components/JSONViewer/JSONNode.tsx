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
  collapsedPaths,
  onToggle,
  keyName,
}: JSONNodeProps) => {
    const isCollapsed = collapsedPaths.has(path);

    if (data === null) {
        return <span className='json-null'>null</span>
    }

    if (typeof data !== 'object') {
        return (
            <span className={`json-${typeof data}`}>
                {typeof data === 'string' ? `"${data}"` : String(data)}
            </span>
        )
    }

    if (Array.isArray(data)) {
        const hasItems = data.length > 0;
        return (
            <div className="json-node">
                {keyName && <span className="json-key">{keyName}: </span>}
                <span 
                    className="json-bracket toggleable"
                    onClick={() => onToggle(path)}
                    style={{ cursor: 'pointer' }}
                >
                    [
                    {isCollapsed && hasItems && (
                        <span className="json-collapsed-indicator"> ... </span>
                    )}
                </span>
                {!isCollapsed && hasItems && (
                    <div className="json-children" style={{ paddingLeft: '20px' }}>
                        {data.map((item, index) => (
                            <div key={index} className="json-child">
                                <JSONNode 
                                    data={item} 
                                    path={`${path}[${index}]`}
                                    collapsedPaths={collapsedPaths}
                                    onToggle={onToggle}
                                />
                                {index < data.length - 1 && <span className="json-comma">,</span>}
                            </div>
                        ))}
                    </div>
                )}
                <span className="json-bracket">]</span>
                {!hasItems && <span className="json-empty">empty</span>}
            </div>
        );
    }

    const keys = Object.keys(data);
    const hasKeys = keys.length > 0;

    return (
        <div className='json-node'>
            {keyName && <span className="json-key">{keyName}: </span>}
            <span 
                className="json-bracket toggleable"
                onClick={() => onToggle(path)}
                style={{ cursor: 'pointer' }}
            >
                {"{"}
                {isCollapsed && hasKeys && (
                    <span className="json-collapsed-indicator"> ... </span>
                )}
            </span>

            {!isCollapsed && hasKeys && (
                <div className='json-children' style={{paddingLeft: '20px'}}>
                    {keys.map((key, index) => {
                        const value = data[key];
                        const childPath = path ? `${path}.${key}` : key;

                        return (
                            <div className='json-child' key={index}>
                                <JSONNode 
                                    data={value}
                                    path={childPath}
                                    keyName={key}
                                    collapsedPaths={collapsedPaths}
                                    onToggle={onToggle}
                                />
                                {index < keys.length - 1 && <span className="json-comma">,</span>}
                            </div>
                        );
                    })}
                </div>
            )}
            <span className="json-bracket">{"}"}</span>
            {!hasKeys && <span className="json-empty">empty</span>}
        </div>
    );
};