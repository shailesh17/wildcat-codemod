import React from "react";
import stub from "./fixtures/import-stubs/foo/index.js";

class TestComponent extends GridironComponent {
    render() {
        return (
            <aside className="debug">
                <ul>
                    <li>test</li>
                </ul>
            </aside>
        );
    }
}

export default TestComponent;
