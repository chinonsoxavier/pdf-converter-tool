"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var ScrollManager = function (_a) {
    var _b = _a.smoothRestore, smoothRestore = _b === void 0 ? false : _b;
    var pathname = (0, react_router_dom_1.useLocation)().pathname;
    var positions = (0, react_1.useRef)({}); // store scroll positions per route
    var prevPath = (0, react_1.useRef)(pathname);
    (0, react_1.useEffect)(function () {
        // Save current scroll position for previous route
        positions.current[prevPath.current] = window.scrollY;
        // If we have a saved scroll position for this path (back/forward)
        if (positions.current[pathname] !== undefined) {
            window.scrollTo({
                top: positions.current[pathname],
                behavior: smoothRestore ? "smooth" : "auto", // smooth restore toggle
            });
        }
        else {
            // New page → always scroll to top smoothly
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
        prevPath.current = pathname;
    }, [pathname, smoothRestore]);
    return null;
};
exports.default = ScrollManager;
