import * as React from "react";

export interface HelloProps { compiler: string; uiFramework: string; baseFramework?: string }

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class Hello extends React.Component<HelloProps, undefined> {
    render() {
        const baseFramework: string = this.props.baseFramework || "Play 2";
        return <h1>Hello from {this.props.compiler} and {this.props.uiFramework} running on {baseFramework}!</h1>;
    }
}