import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function SortableItem({ id, content }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "10px",
    margin: "5px 0",
    backgroundColor: "#f0f0f0",
    border: "1px solid #ccc",
    cursor: "grab",
  };

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {content}
    </li>
  );
}
