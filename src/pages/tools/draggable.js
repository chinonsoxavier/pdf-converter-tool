// import  { useState } from 'react';
// import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
// import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
// import { SortableItem } from './sortable';
// function DraggableList() {
//   const [items, setItems] = useState([
//     { id: '1', content: 'Item 1' },
//     { id: '2', content: 'Item 2' },
//     { id: '3', content: 'Item 3' },
//   ]);
//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );
//   function handleDragEnd(event) {
//     const { active, over } = event;
//     if (active.id !== over.id) {
//       setItems((items) => {
//         const oldIndex = items.findIndex((item) => item.id === active.id);
//         const newIndex = items.findIndex((item) => item.id === over.id);
//         return arrayMove(items, oldIndex, newIndex);
//       });
//     }
//   }
//   return (
//     <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//       <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
//         <ul style={{ listStyle: 'none', padding: 0 }}>
//           {items.map((item) => (
//             <SortableItem key={item.id} id={item.id} content={item.content} />
//           ))}
//         </ul>
//       </SortableContext>
//     </DndContext>
//   );
// }
// export default DraggableList;
