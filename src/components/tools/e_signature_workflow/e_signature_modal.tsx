import React, {
  useState,
  useRef,
  useEffect,
  MouseEvent,
  TouchEvent,
  ChangeEvent,
} from "react";
import { X, Trash2, Undo, Redo, Upload, Palette } from "lucide-react";
// import useUpload from "../utils/useUpload";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Define TypeScript interfaces
interface Point {
  x: number;
  y: number;
}

interface Stroke {
  points: Point[];
  color: string;
}

interface SignatureData {
  type: "canvas" | "text" | "image";
  data: string;
  font?: string;
}

interface ESignatureModalProps {
  isOpen: boolean;
  onSave: (signatureData: SignatureData) => void;
  onClose: () => void;
}

// Add props to the component
const ESignatureModal: React.FC<ESignatureModalProps> = ({
  isOpen,
  onSave,
  onClose,
}) => {

  const [activeTab, setActiveTab] = useState<string>("draw");
  const [typedSignature, setTypedSignature] = useState<string>("");
  const [selectedFont, setSelectedFont] = useState<string>("font-caveat");
  const [uploadedSignature, setUploadedSignature] = useState<string | null>(
    null
  );
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Stroke>({
    points: [],
    color: "#000000",
  });
  const [redoStack, setRedoStack] = useState<Stroke[]>([]);
  const [drawColor, setDrawColor] = useState<string>("#000000");

  const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [upload, { loading: uploading }] = useUpload();

  // Signature fonts available with proper class names
  const signatureFonts = [
    { name: "Caveat", className: "font-caveat" },
    { name: "Dancing Script", className: "font-dancing-script" },
    { name: "Great Vibes", className: "font-great-vibes" },
    { name: "Pacifico", className: "font-pacifico" },
    { name: "Sacramento", className: "font-sacramento" },
    { name: "Allura", className: "font-allura" },
  ];

  // Color options for drawing
  const colorOptions = [
    "#000000", // Black
    "#1E40AF", // Blue
    "#DC2626", // Red
    "#059669", // Green
    "#7C3AED", // Purple
    "#EA580C", // Orange
    "#BE185D", // Pink
    "#374151", // Gray
  ];

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal closes
      setTypedSignature("");
      setUploadedSignature(null);
      setStrokes([]);
      setCurrentStroke({ points: [], color: drawColor });
      setRedoStack([]);
      clearCanvas();
    }
  }, [isOpen, drawColor]);

  const clearCanvas = (): void => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const redrawCanvas = (strokesArray: Stroke[]): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    strokesArray.forEach((stroke) => {
      if (stroke.points && stroke.points.length > 0) {
        ctx.strokeStyle = stroke.color || "#000000";
        ctx.beginPath();
        if (stroke.points.length === 1) {
          // Draw a small dot for single points
          ctx.arc(stroke.points[0].x, stroke.points[0].y, 1, 0, 2 * Math.PI);
          ctx.fill();
        } else {
          // Draw lines for multiple points
          ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
          stroke.points.forEach((point, index) => {
            if (index > 0) {
              ctx.lineTo(point.x, point.y);
            }
          });
          ctx.stroke();
        }
      }
    });
  };

  const getMousePos = (e: MouseEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const getTouchPos = (e: TouchEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (e.touches[0].clientX - rect.left) * scaleX,
      y: (e.touches[0].clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (
    e: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>
  ): void => {
    e.preventDefault();
    setIsDrawing(true);
    setRedoStack([]); // Clear redo stack when starting new stroke
    const pos = "touches" in e ? getTouchPos(e) : getMousePos(e);
    setCurrentStroke({ points: [pos], color: drawColor });

    // Draw the initial point
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = drawColor;
    ctx.fillStyle = drawColor;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 1, 0, 2 * Math.PI);
    ctx.fill();
  };

  const draw = (
    e: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>
  ): void => {
    if (!isDrawing) return;
    e.preventDefault();

    const pos = "touches" in e ? getTouchPos(e) : getMousePos(e);
    const newStroke = {
      ...currentStroke,
      points: [...currentStroke.points, pos],
    };
    setCurrentStroke(newStroke);

    // Draw on canvas in real-time
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = drawColor;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (currentStroke.points && currentStroke.points.length > 0) {
      ctx.beginPath();
      const prevPoint = currentStroke.points[currentStroke.points.length - 1];
      ctx.moveTo(prevPoint.x, prevPoint.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
  };

  const stopDrawing = (
    e?: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>
  ): void => {
    if (!isDrawing) return;
    e?.preventDefault();

    if (currentStroke.points && currentStroke.points.length > 0) {
      setStrokes([...strokes, currentStroke]);
      setCurrentStroke({ points: [], color: drawColor });
    }
    setIsDrawing(false);
  };

  const clearDrawing = (): void => {
    setStrokes([]);
    setCurrentStroke({ points: [], color: drawColor });
    setRedoStack([]);
    clearCanvas();
  };

  const undoStroke = (): void => {
    if (strokes.length > 0) {
      const newStrokes = [...strokes];
      const lastStroke = newStrokes.pop();
      if (lastStroke) {
        setRedoStack([...redoStack, lastStroke]);
        setStrokes(newStrokes);
        redrawCanvas(newStrokes);
      }
    }
  };

  const redoStroke = (): void => {
    if (redoStack.length > 0) {
      const newRedoStack = [...redoStack];
      const strokeToRedo = newRedoStack.pop();
      if (strokeToRedo) {
        setRedoStack(newRedoStack);
        const newStrokes = [...strokes, strokeToRedo];
        setStrokes(newStrokes);
        redrawCanvas(newStrokes);
      }
    }
  };

  const handleFileUpload = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // const result = await upload({ file });
    // if (result.error) {
    //   alert("Upload failed: " + result.error);
    // } else {
    //   setUploadedSignature(result.url);
    // }
  };

const getSignatureData = (): SignatureData | null => {
  switch (activeTab) {
    case "draw": {
      if (strokes.length === 0) return null;
      const canvas = canvasRef.current;
      if (!canvas) return null;
      return {
        type: "canvas",
        data: canvas.toDataURL("image/png"),
      };
    }
    case "type": {
      if (!typedSignature.trim()) return null;
      return {
        type: "text",
        data: typedSignature,
        font: selectedFont,
      };
    }
    case "upload": {
      if (!uploadedSignature) return null;
      return {
        type: "image",
        data: uploadedSignature,
      };
    }
    default:
      return null;
  }
};

  const handleSave = (): void => {
    const signatureData = getSignatureData();
    if (!signatureData) {
      alert("Please create a signature first");
      return;
    }
    onSave(signatureData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose} >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create Your Signature</AlertDialogTitle>
          <AlertDialogDescription>
            Choose a method to create your signature below.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div
            className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.4)] max-w-2xl w-full max-h-[90vh] overflow-hidden"
            style={{
              fontFamily:
                'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#E6E6E6] dark:border-[#333333]">
              <div>
                <h2 className="text-xl font-semibold text-black dark:text-white">
                  Create Signature
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-[#333333] rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-[#E6E6E6] dark:border-[#333333]">
              <button
                onClick={() => setActiveTab("type")}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "type"
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                Input
              </button>
              <button
                onClick={() => setActiveTab("upload")}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "upload"
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                Image
              </button>
              <button
                onClick={() => setActiveTab("draw")}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "draw"
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                Draw
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {/* Type Tab */}
              {activeTab === "type" && (
                <div className="space-y-4">
                  {/* Signature Preview */}
                  <div className="w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center bg-gray-50 dark:bg-[#2A2A2A]">
                    {typedSignature ? (
                      <div
                        className={`text-4xl text-black dark:text-white ${selectedFont}`}
                      >
                        {typedSignature}
                      </div>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400">
                        Type your signature below to see preview
                      </p>
                    )}
                  </div>

                  {/* Font and Input Controls */}
                  <div className="flex gap-4 items-end">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={typedSignature}
                        onChange={(e) => setTypedSignature(e.target.value)}
                        placeholder="Type your signature"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-[#2A2A2A] text-black dark:text-white"
                      />
                    </div>
                    <div className="relative">
                      <select
                        value={selectedFont}
                        onChange={(e) => setSelectedFont(e.target.value)}
                        className="appearance-none bg-white dark:bg-[#2A2A2A] border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-10 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {signatureFonts.map((font) => (
                          <option
                            key={font.className}
                            value={font.className}
                            className={font.className}
                          >
                            {font.name}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                    <button
                      onClick={() => setTypedSignature("")}
                      className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                      title="Clear signature"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              )}

              {/* Upload Tab */}
              {activeTab === "upload" && (
                <div className="space-y-4">
                  {/* Upload Preview */}
                  <div className="w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center bg-gray-50 dark:bg-[#2A2A2A]">
                    {uploadedSignature ? (
                      <img
                        src={uploadedSignature}
                        alt="Uploaded signature"
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <div className="text-center">
                        <Upload
                          className="mx-auto mb-2 text-gray-400"
                          size={32}
                        />
                        <p className="text-gray-500 dark:text-gray-400">
                          Upload your signature image
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          PNG, JPG, or SVG files accepted
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Upload Controls */}
                  <div className="flex gap-4 items-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="signature-upload"
                    />
                    <label
                      htmlFor="signature-upload"
                      className={`px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer transition-colors`}
                    >
                      {"Choose File"}
                    </label>
                    {uploadedSignature && (
                      <button
                        onClick={() => setUploadedSignature(null)}
                        className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                        title="Remove image"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Draw Tab */}
              {activeTab === "draw" && (
                <div className="space-y-4">
                  {/* Color Picker */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Palette size={16} className="text-gray-500" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Color:
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {colorOptions.map((color) => (
                        <button
                          key={color}
                          onClick={() => setDrawColor(color)}
                          className={`w-8 h-8 rounded-full border-2 transition-all ${
                            drawColor === color
                              ? "border-gray-400 scale-110"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          style={{ backgroundColor: color }}
                          title={`Select ${color}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Drawing Canvas */}
                  <div className="border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-white">
                    <canvas
                      ref={canvasRef}
                      width={600}
                      height={200}
                      className="w-full h-48 cursor-crosshair"
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                      style={{ touchAction: "none" }}
                    />
                  </div>

                  {/* Drawing Controls */}
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={undoStroke}
                      disabled={strokes.length === 0}
                      className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-[#333333] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Undo size={16} />
                      Undo
                    </button>
                    <button
                      onClick={redoStroke}
                      disabled={redoStack.length === 0}
                      className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-[#333333] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Redo size={16} />
                      Redo
                    </button>
                    <button
                      onClick={clearDrawing}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <Trash2 size={16} />
                      Clear
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex gap-3 p-6 border-t border-[#E6E6E6] dark:border-[#333333] justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-[#333333] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
              >
                OK
              </button>
            </div>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSave}>Save</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ESignatureModal;
