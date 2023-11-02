import { Slot, component$ } from "@builder.io/qwik";

type TaskProps = {
  onDragStart$: () => void;
};

const Task = component$<TaskProps>(({ onDragStart$ }) => {
  return (
    <div
      class="card bg-neutral drag w-full cursor-pointer p-4 text-xs"
      onDragStart$={onDragStart$}
    >
      <Slot />
    </div>
  );
});

export default Task;
