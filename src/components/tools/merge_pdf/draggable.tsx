// // import { useState } from "react";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { motion, Reorder } from "framer-motion";
// // import { GripVertical, X, Plus } from "lucide-react";

// // interface ListItem {
// //   id: string;
// //   text: string;
// // }

// // export default function DraggableContainer() {
// //   const [items, setItems] = useState<ListItem[]>([
// //     { id: "1", text: "First item - drag me around!" },
// //     { id: "2", text: "Second item - I can be reordered" },
// //     { id: "3", text: "Third item - Try dragging me up" },
// //     { id: "4", text: "Fourth item - Rearrange as needed" },
// //     { id: "5", text: "Fifth item - The array updates automatically" },
// //   ]);

// //   const [newItemText, setNewItemText] = useState("");

// //   const addItem = () => {
// //     if (newItemText.trim()) {
// //       const newItem: ListItem = {
// //         id: Date.now().toString(),
// //         text: newItemText.trim(),
// //       };
// //       setItems([...items, newItem]);
// //       setNewItemText("");
// //     }
// //   };

// //   const removeItem = (id: string) => {
// //     setItems(items.filter((item) => item.id !== id));
// //   };

// //   const handleKeyPress = (e: React.KeyboardEvent) => {
// //     if (e.key === "Enter") {
// //       addItem();
// //     }
// //   };

// //   return (
// //     <div className="max-w-2xl mx-auto p-6 space-y-6">
// //       <Card>
// //         <CardHeader>
// //           <CardTitle className="flex items-center gap-2">
// //             <GripVertical className="w-5 h-5" />
// //             DraggableContainer List Items
// //           </CardTitle>
// //           <p className="text-sm text-muted-foreground">
// //             Drag and drop items to reorder them. The array is automatically
// //             updated to match the new order.
// //           </p>
// //         </CardHeader>
// //         <CardContent className="space-y-4">
// //           {/* Add new item */}
// //           <div className="flex gap-2">
// //             <Input
// //               placeholder="Add a new item..."
// //               value={newItemText}
// //               onChange={(e) => setNewItemText(e.target.value)}
// //               onKeyPress={handleKeyPress}
// //               className="flex-1"
// //             />
// //             <Button onClick={addItem} size="sm">
// //               <Plus className="w-4 h-4" />
// //             </Button>
// //           </div>

// //           {/* DraggableContainer list */}

// //           <Reorder.Group
// //             axis="x"
// //             values={items}
// //             onReorder={setItems}
// //             className="flex gap-4 overflow-x-auto pb-4"
// //           >
// //             {items.map((item) => (
// //               <Reorder.Item
// //                 key={item.id}
// //                 value={item}
// //                 className="flex-shrink-0"
// //                 whileDrag={{
// //                   scale: 1.05,
// //                   rotate: 2,
// //                   zIndex: 10,
// //                   boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
// //                 }}
// //                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
// //               >
// //                 {/* <motion.div */}
// //                   {/* initial={{ opacity: 0, y: 20 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   exit={{ opacity: 0, y: -20 }}
// //                   whileDrag={{
// //                     scale: 1.02,
// //                     boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
// //                     zIndex: 10,
// //                   }}
// //                   className="bg-background border rounded-lg p-4 cursor-move hover:bg-accent/50 transition-colors group"
// //                 > */}
// //                   <div className="flex items-center gap-3">
// //                     <div className="flex items-center gap-2 text-muted-foreground">
// //                       <GripVertical className="w-4 h-4" />
// //                       <span className="text-xs font-mono bg-muted px-2 py-1 rounded">
// //                         {index + 1}
// //                       </span>
// //                     </div>

// //                     <div className="flex-1 text-sm">{item.text}</div>

// //                     <Button
// //                       variant="ghost"
// //                       size="sm"
// //                       onClick={() => removeItem(item.id)}
// //                       className="opacity-0 group-hover:opacity-100 transition-opacity"
// //                     >
// //                       <X className="w-4 h-4" />
// //                     </Button>
// //                   </div>
// //                 {/* </motion.div> */}
// //               </Reorder.Item>
// //             ))}
// //           </Reorder.Group>

// //           {items.length === 0 && (
// //             <div className="text-center py-8 text-muted-foreground">
// //               <p>
// //                 No items yet. Add some items to see the draggable list in
// //                 action!
// //               </p>
// //             </div>
// //           )}
// //         </CardContent>
// //       </Card>

// //       {/* Debug info showing current array order */}
// //       <Card>
// //         <CardHeader>
// //           <CardTitle className="text-sm">Current Array Order</CardTitle>
// //         </CardHeader>
// //         <CardContent>
// //           <pre className="text-xs bg-muted p-3 rounded-md overflow-x-auto">
// //             {JSON.stringify(
// //               items.map((item, index) => ({
// //                 position: index + 1,
// //                 id: item.id,
// //                 text: item.text,
// //               })),
// //               null,
// //               2
// //             )}
// //           </pre>
// //         </CardContent>
// //       </Card>
// //     </div>
// //   );
// // }

//  <ul
//    {...provided.droppableProps}
//    ref={provided.innerRef}
//    style={{ listStyle: "none", padding: 0 }}
//  >
//    {selectedFiles.map((file, index) => (
//      <Draggable key={item.id} draggableId={item.id} index={index}>
//        {(provided) => (
//          <li
//            ref={provided.innerRef}
//            {...provided.dragHandleProps}
//            {...provided.draggableProps}
//          >
//            <Tooltip>
//              <TooltipTrigger>
//                <div className="center h-full min-h-36 min-w-0 w-36 overflow-hidden bg-white flex-col border dark:bg-secondary rounded-lg hover:shadow-md duration-200 hover:border relative group p-3">
//                  <Tooltip>
//                    <TooltipTrigger
//                      asChild
//                      onClick={() => removeSelectedFiles(file)}
//                      className="items-center absolute top-1 hover:shadow right-1 z-30 bg-secondary p-1 text-primary-foreground cursor-pointer justify-center group-hover:opacity-100 duration-500 flex opacity-0 rounded-full w-8 h-8"
//                    >
//                      <XIcon className="w-4 h-4" />
//                    </TooltipTrigger>
//                    <TooltipContent className="text-white">
//                      <p>Remove File</p>
//                    </TooltipContent>
//                  </Tooltip>

//                  <Document
//                    file={file}
//                    onLoadSuccess={({ numPages }) => setNumPages(numPages)}
//                    onLoadError={(error) =>
//                      console.error("PDF load error:", error)
//                    }
//                    className="w-full center"
//                  >
//                    <Page loading={<PdfLoadingComponent/>}
//                      className="border"
//                      pageNumber={1}
//                      width={150} // Reduced for better performance
//                      renderTextLayer={false} // Optimize rendering
//                      renderAnnotationLayer={false}
//                    />
//                  </Document>
//                  <p className="truncate w-full mt-2 text-sm text-secondary-foreground font-medium">
//                    {fileNames[index + 1] || "Unknown File"}
//                  </p>
//                </div>
//              </TooltipTrigger>
//              <TooltipContent className="text-white">
//                <p className="text-[13px]">
//                  {(fileSize[index] || 0) +
//                    " MB - " +
//                    (numPages[index] || 0) +
//                    " pages"}
//                </p>
//              </TooltipContent>
//            </Tooltip>
//          </li>
//        )}
//      </Draggable>
//    ))}
//  </ul>;

// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// import { useState } from "react";

// function DraggableContainer() {
//   const [items, setItems] = useState([
//     { id: "1", content: "Item 1" },
//     { id: "2", content: "Item 2" },
//     { id: "3", content: "Item 3" },
//   ]);

//   const onDragEnd = (result) => {
//     if (!result.destination) return;
//     const reorderedItems = Array.from(items);
//     const [movedItem] = reorderedItems.splice(result.source.index, 1);
//     reorderedItems.splice(result.destination.index, 0, movedItem);
//     setItems(reorderedItems);
//   };

//   return (
//       <DragDropContext onDragEnd={onDragEnd}>
//       <Droppable droppableId="list">
//         {(provided) => (
//           <ul
//             {...provided.droppableProps}
//             ref={provided.innerRef}
//             style={{ listStyle: "none", padding: 0 }}
//           >
//             {items.map((item, index) => (
//               <Draggable key={item.id} draggableId={item.id} index={index}>
//                 {(provided) => (
//                   <li
//                     ref={provided.innerRef}
//                     {...provided.draggableProps}
//                     {...provided.dragHandleProps}
//                     style={{
//                       padding: "10px",
//                       margin: "5px 0",
//                       backgroundColor: "#f0f0f0",
//                       border: "1px solid #ccc",
//                       ...provided.draggableProps.style,
//                     }}
//                   >
//                     {item.content}
//                   </li>
//                 )}
//               </Draggable>
//             ))}
//             {provided.placeholder}
//           </ul>
//         )}
//       </Droppable>
//     </DragDropContext>
//   );
// }

// export default DraggableContainer;

// import ToolsFileExtensionCard from "@/components/tools/tools_file_extension_card";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { XIcon } from "lucide-react";
// import { Document, Page } from "react-pdf";
// import useMergePdfStore from "./merge_pdf_store";
// import { Reorder } from "framer-motion";
// import { Dispatch, SetStateAction, useEffect, useState } from "react";
// import { pdfjs } from "react-pdf";
// import DraggableContainer from "./draggable";
// import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
// pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

// const MergePdfChildrenSection = ({
//   file,
//   setFile,
// }: {
//   file: any;
//   setFile: any;
// }) => {
//   const {
//     selectedFiles,
//     fileType,
//     fileNames,
//     fileSize,
//     numPages,
//     setNumPages,
//     removeSelectedFiles,
//     recorderFiles,
//   } = useMergePdfStore();
//   const [newItemText, setNewItemText] = useState(selectedFiles);

//   useEffect(() => {
//     setNewItemText(selectedFiles);
//     console.log(newItemText);
//     console.log(selectedFiles);
//   }, [selectedFiles]);

//   const onDragEnd = (result) => {
//     if (!result.destination) return;
//     const reorderedItems = Array.from(selectedFiles);
//     const [movedItem] = reorderedItems.splice(result.source.index, 1);
//     reorderedItems.splice(result.destination.index, 0, movedItem);
//     recorderFiles(reorderedItems);
//   };
//   return (
//     <div>
//       {fileType[0] === "pdf" ? (
//         <DragDropContext onDragEnd={onDragEnd}>
//           <Droppable droppableId="list">
//             {(provided) => (
//               <ul
//                 {...provided.droppableProps}
//                 ref={provided.innerRef}
//                 style={{ listStyle: "none", padding: 0 }}
//               >
//                 {selectedFiles.map((file, index) => (
//                   <Draggable key={file} draggableId={file} index={index}>
//                     {(provided) => (
//                       <li
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                         className="flex items-center justify-between p-2 border-b border-secondary"
//                       >
//                         <div className="flex items-center gap-2">
//                           <Document
//                             file={file}
//                             onLoadSuccess={({ numPages }) =>
//                               setNumPages(numPages)
//                             }
//                           >
//                             <Page loading={<PdfLoadingComponent/>} pageNumber={1} width={50} />
//                           </Document>
//                           <span className="text-sm font-medium">
//                             {fileNames[index]}
//                           </span>
//                         </div>
//                         <Tooltip>
//                           <TooltipTrigger>
//                             <XIcon
//                               className="w-5 h-5 cursor-pointer text-red-500"
//                               onClick={() => {
//                                 removeSelectedFiles(file);
//                                 setFile((prev: string[]) =>
//                                   prev.filter((f) => f !== file)
//                                 );
//                               }}
//                             />
//                           </TooltipTrigger>
//                           <TooltipContent>Remove file</TooltipContent>
//                         </Tooltip>
//                       </li>
//                     )}
//                   </Draggable>
//                 ))}
//               </ul>
//             )}
//           </Droppable>
//         </DragDropContext>
//       ) : (
//         <ToolsFileExtensionCard fileType={fileType[0]} />
//       )}
//     </div>
//   );
// };

// export default MergePdfChildrenSection;
