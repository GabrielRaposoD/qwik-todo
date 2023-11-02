import { Button, Task } from "~/components";

import type { DocumentHead } from "@builder.io/qwik-city";
import { component$ } from "@builder.io/qwik";
import { useTasks } from "~/hooks";

export default component$(() => {
  const {
    onColumnChange,
    onColumnCreate,
    onTaskChange,
    onTaskCreate,
    store,
    onTaskDragStart,
    onTaskDrop,
  } = useTasks();

  return (
    <section class="flex h-full w-full flex-col p-4">
      <h1 class="text-center text-lg">This is a Qwik Todo list app.</h1>
      <div class="mt-8 flex flex-row justify-around">
        {store.columns.map((column, i) => {
          return (
            <div
              class="border-neutral flex h-max w-72 flex-col rounded-lg border border-solid p-2"
              key={column.label + i}
              onDrop$={() => onTaskDrop(column)}
              preventdefault:dragover
            >
              <input
                class="bg-transparent text-center text-lg"
                value={column.label}
                onChange$={(e) => onColumnChange(e, column)}
                preventdefault:drop
                disabled
                onDblClick$={(e) => {
                  (e.target as HTMLInputElement).disabled = false;
                }}
              />
              <div class="mt-4 flex flex-col gap-y-3">
                {column.tasks.map((task, i) => {
                  return (
                    <Task
                      key={task + i.toString()}
                      onDragStart$={() => onTaskDragStart(task)}
                    >
                      <textarea
                        value={task.label}
                        onChange$={(e) => onTaskChange(e, task)}
                        class="bg-transparent"
                        disabled
                        onDblClick$={(e) => {
                          (e.target as HTMLTextAreaElement).disabled = false;
                        }}
                      />
                    </Task>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div class="mt-10 flex w-full flex-row justify-center gap-x-4">
        <Button onClick$={onTaskCreate} class="">
          Create Task
        </Button>
        <Button onClick$={onColumnCreate}>Create Column</Button>
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: "Qwik Todo",
  meta: [
    {
      name: "description",
      content: "A Qwik Todo list app",
    },
  ],
};
