"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var how_to_section_1 = __importDefault(require("@/components/landing/how_to_section"));
var tools_section_1 = __importDefault(require("@/components/landing/tools_section"));
var footer_1 = __importDefault(require("@/components/layout/footer"));
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var input_1 = require("@/components/ui/input");
var renderer_1 = require("@react-pdf/renderer");
var react_1 = require("motion/react");
var lucide_react_1 = require("lucide-react");
var react_2 = require("react");
var react_pdf_1 = require("react-pdf");
require("react-pdf/dist/Page/TextLayer.css");
require("react-pdf/dist/Page/AnnotationLayer.css");
var tooltip_1 = require("@/components/ui/tooltip");
var tools_file_extension_card_1 = __importDefault(require("../tools_file_extension_card"));
var utils_1 = require("@/lib/utils");
var tool_page_loader_1 = __importDefault(require("../tool_page_loader"));
var react_router_dom_1 = require("react-router-dom");
var header_1 = __importDefault(require("@/components/layout/header"));
var history_section_1 = __importDefault(require("../history_section"));
var sidemenu_layout_1 = __importDefault(require("@/components/layout/sidemenu_layout"));
var converter_layout_sidebar_1 = __importDefault(require("@/components/layout/converter_layout_sidebar"));
var tools_store_1 = __importDefault(require("@/pages/tools/tools_store"));
var ConverterLayout = function (_a) {
    var disabled = _a.disabled, children = _a.children, actionButtonText = _a.actionButtonText, actionMenuSideBar = _a.actionMenuSideBar, label = _a.label, desc = _a.desc, file = _a.file, fileType = _a.fileType, setFile = _a.setFile, convertingStateText = _a.convertingStateText, fileName = _a.fileName, setFileName = _a.setFileName, numPages = _a.numPages, setNumPages = _a.setNumPages, fileSize = _a.fileSize, setFileSize = _a.setFileSize;
    var styles = renderer_1.StyleSheet.create({
        page: {
            flexDirection: "row",
            backgroundColor: "pink",
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1,
        },
    });
    var fileInputRef = (0, react_2.useRef)(null);
    // const [numPages, setNumPages] = useState(0);
    // const [fileName, setFileName] = useState(null);
    // const [fileSize, setFileSize] = useState(null);
    var _b = (0, react_2.useState)(false), processingTool = _b[0], setProcessingTool = _b[1];
    var navigate = (0, react_router_dom_1.useNavigate)();
    var toggleSideMenuOpen = (0, tools_store_1.default)().toggleSideMenuOpen;
    var variants1 = {
        inactive: {
            y: 80,
            opacity: 0,
        },
        active: {
            y: 0,
            opacity: 1,
            transition: { duration: 1.5 },
        },
    };
    (0, react_2.useEffect)(function () {
        // setTimeout(() => {
        //   setProcessingTool(false);
        //   if (file) {
        //     navigate("download/hxdbhuabhsahvxas");
        //   }
        // }, 8000); // Simulate a delay for processing
    }, [processingTool]);
    var handleButtonClick = function () {
        var _a;
        (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click();
    };
    var handleFileChange = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var file, allowedFileTypes, FileType, fileUrl;
        var _a;
        return __generator(this, function (_b) {
            file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
            allowedFileTypes = fileType;
            if (file) {
                FileType = file.name.split(".").pop();
                if (!fileType || !allowedFileTypes.includes(FileType)) {
                    alert("Please select a valid ".concat(allowedFileTypes.join(", "), " file"));
                    if (fileInputRef.current) {
                        fileInputRef.current.value = ""; // Clear the input value
                    }
                    return [2 /*return*/];
                }
                fileUrl = URL.createObjectURL(file);
                setFile(fileUrl);
                setFileName(file.name);
                setFileSize(file.size);
                console.log("Selected file:", file.name, "Size:", file.size, "bytes");
                return [2 /*return*/];
            }
            return [2 /*return*/];
        });
    }); };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "overflow-scroll h-lvh", children: [(0, jsx_runtime_1.jsx)(sidemenu_layout_1.default, {}), processingTool ? ((0, jsx_runtime_1.jsx)(tool_page_loader_1.default, { convertingStateText: convertingStateText })) : ((0, jsx_runtime_1.jsxs)("main", { className: "w-full min-h-lvh h-full dark:bg-primary", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-[12%]", children: (0, jsx_runtime_1.jsx)(header_1.default, {}) }), !!file[0] === false ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-full flex-col center p-4 py-20 rounded-lg to-primary/5 from-white bg-gradient-to-t to-80% dark:from-primary dark:to-[rgb(4,9,30)]", children: [(0, jsx_runtime_1.jsx)(react_1.motion.div, { variants: variants1, initial: "inactive", whileInView: "active", viewport: { once: true }, children: (0, jsx_runtime_1.jsx)("h1", { className: "text-3xl sm:text-4xl sm:text-left text-center text-primary-foreground font-medium", children: label }) }), (0, jsx_runtime_1.jsx)(react_1.motion.div, { variants: variants1, initial: "inactive", whileInView: "active", viewport: { once: true }, className: "w-full mx-auto center", children: (0, jsx_runtime_1.jsxs)(card_1.Card, { className: "sm:p-10 p-5 bg-secondary/30 dark:border-primary border-dashed border-accent border-3 w-full center gap-3 sm:gap-5 max-w-xl my-10", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-secondary-foreground dark:text-secondary-foreground text-center text-lg sm:text-xl sm:mb-5", children: desc }), (0, jsx_runtime_1.jsx)(lucide_react_1.CloudUpload, { className: "text-primary sm:w-18 sm:h-18 w-10 h-10" }), (0, jsx_runtime_1.jsx)("p", { className: "text-[13px] text-secondary-foreground", children: "Or drag and drop here..." }), (0, jsx_runtime_1.jsx)(input_1.Input, { ref: fileInputRef, type: "file", accept: fileType
                                                        .map(function (file) {
                                                        return ".".concat(file.toLowerCase(), ",application/").concat(file.toLowerCase());
                                                    })
                                                        .join(","), 
                                                    // accept=".pdf,application/pdf"
                                                    onChange: handleFileChange, className: "hidden", "aria-label": "Choose PDF file" }), (0, jsx_runtime_1.jsxs)("p", { className: "text-secondary-foreground hidden dark:text-secondary-foreground text-xl text-center", children: ["Upload your ", fileType, " file below and get started."] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: handleButtonClick, className: "max-w-sm py-0 text-lg sm:text-xl rounded-lg flex items-center h-12 w-full", type: "submit", children: ["Choose ", fileType[0].toUpperCase(), " File"] })] }) })] }), (0, jsx_runtime_1.jsx)(history_section_1.default, {}), (0, jsx_runtime_1.jsx)(how_to_section_1.default, {}), (0, jsx_runtime_1.jsx)(tools_section_1.default, {}), (0, jsx_runtime_1.jsx)(footer_1.default, {})] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "gap-8 h-[88%] to-primary/5 from-white bg-gradient-to-t to-80% dark:from-primary dark:to-[rgb(4,9,30)] relative flex items-start justify-between w-full", children: [(0, jsx_runtime_1.jsx)(converter_layout_sidebar_1.default, { disabled: disabled, contents: actionMenuSideBar, fileType: fileType[0], setProcessingTool: setProcessingTool, label: label }), (0, jsx_runtime_1.jsxs)("div", { className: "center relative flex-col p-7 h-full flex-1", children: [children ? (children) : ((0, jsx_runtime_1.jsxs)(tooltip_1.Tooltip, { children: [(0, jsx_runtime_1.jsx)(tooltip_1.TooltipTrigger, { children: (0, jsx_runtime_1.jsxs)("div", { className: "center flex-col border bg-white dark:bg-secondary rounded-lg hover:shadow-md duration-200 hover:border relative group p-3", children: [(0, jsx_runtime_1.jsxs)(tooltip_1.Tooltip, { children: [(0, jsx_runtime_1.jsx)(tooltip_1.TooltipTrigger, { asChild: true, onClick: function () { return setFile(null); }, className: "items-center absolute top-1 hover:shadow right-1 z-30 bg-secondary p-1 text-primary-foreground cursor-pointer justify-center group-hover:opacity-100 duration-500 flex opacity-0 rounded-full w-8 h-8", children: (0, jsx_runtime_1.jsx)(lucide_react_1.XIcon, { className: "w-4 h-4" }) }), (0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, { className: "text-white", children: (0, jsx_runtime_1.jsx)("p", { children: "Remove File" }) })] }), fileType[0] === "pdf" ? ((0, jsx_runtime_1.jsx)(react_pdf_1.Document, { scale: 0.3, file: file[0], onLoadSuccess: function (_a) {
                                                                var numPages = _a.numPages;
                                                                return setNumPages(numPages);
                                                            }, className: "w-full center", children: (0, jsx_runtime_1.jsx)(react_pdf_1.Page, { className: "border", pageNumber: 1 }) })) : ((0, jsx_runtime_1.jsx)(tools_file_extension_card_1.default, { fileType: fileType[0] })), (0, jsx_runtime_1.jsx)("p", { className: "whitespace-nowrap mt-2 text-sm text-secondary-foreground font-medium", children: fileName })] }) }), (0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, { className: "text-white", children: (0, jsx_runtime_1.jsx)("p", { className: "text-[13px]", children: fileSize + " -" + numPages + " pages" }) })] })), (0, jsx_runtime_1.jsxs)("div", { className: "center right-4 shadow drop-shadow-md sm:right-0 top-20 duration-500 cursor-pointer bg-accent text-white p-2 absolute rounded-full", children: [(0, jsx_runtime_1.jsx)(input_1.Input, { ref: fileInputRef, type: "file", accept: fileType
                                                    .map(function (file) {
                                                    return ".".concat(file.toLowerCase(), ",application/").concat(file.toLowerCase());
                                                })
                                                    .join(","), 
                                                // accept=".pdf,application/pdf"
                                                onChange: handleFileChange, className: "hidden", "aria-label": "Choose PDF file" }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { children: (0, jsx_runtime_1.jsxs)(tooltip_1.TooltipTrigger, { onClick: handleButtonClick, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.PlusIcon, { className: "cursor-pointer" }), (0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, { className: "text-white", children: "Add More Files" })] }) })] }), (0, jsx_runtime_1.jsx)("div", { onClick: toggleSideMenuOpen, className: "flex sm:hidden items-center justify-center right-4 shadow drop-shadow-md sm:right-0 top-36 group  duration-500 cursor-pointer bg-secondary text-white p-2 absolute rounded-full", children: (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { children: (0, jsx_runtime_1.jsxs)(tooltip_1.TooltipTrigger, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Settings, { className: "group-hover:text-accent cursor-pointer text-secondary-foreground" }), (0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, { className: "text-white", children: "Action Menu" })] }) }) })] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { disabled: disabled, onClick: function () { return setProcessingTool(true); }, className: "max-w-sm absolute bottom-10 left-10 sm:text-xl [&_svg]:size-6 group rounded-lg py-0 flex items-center sm:hidden", type: "submit", children: [actionButtonText, (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRightCircleIcon, { className: "group-hover:translate-x-3 duration-1000" })] }), (0, jsx_runtime_1.jsxs)("aside", { className: (0, utils_1.cn)("hidden overflow-hidden h-full w-full border-l flex-col sm:flex items-center justify-between max-w-xs bg-white dark:bg-secondary duration-1000"), children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-full", children: [(0, jsx_runtime_1.jsx)("div", { className: "border-b px-5 py-6", children: (0, jsx_runtime_1.jsx)("p", { className: "text-xl sm:text-2xl font-medium text-secondary-foreground text-center ", children: label }) }), actionMenuSideBar] }), (0, jsx_runtime_1.jsx)("div", { className: "px-6 w-full py-6", children: (0, jsx_runtime_1.jsxs)(button_1.Button, { disabled: disabled, onClick: function () { return setProcessingTool(true); }, className: "max-w-sm text-lg sm:text-xl [&_svg]:size-6 group rounded-lg py-0 flex items-center w-full", type: "submit", children: [actionButtonText, (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRightCircleIcon, { className: "" })] }) })] })] }))] }))] }));
};
exports.default = ConverterLayout;
