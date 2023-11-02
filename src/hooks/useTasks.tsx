import {
  $,
  type QwikChangeEvent,
  useStore,
  useVisibleTask$,
  useSignal,
} from "@builder.io/qwik";
import { parse, stringify } from "flatted";

type Task = {
  Id: string;
  label: string;
  column: Column;
};

type Column = {
  label: string;
  tasks: Task[];
};

const useTasks = () => {
  const store = useStore<{ columns: Column[]; draggedTask?: Task }>({
    columns: [
      { label: "Todo", tasks: [] },
      { label: "Doing", tasks: [] },
      { label: "Done", tasks: [] },
    ],
    draggedTask: undefined,
  });

  const loading = useSignal(true);

  const load = $(() => {
    const storedColumns = window.localStorage.getItem("columns");
    if (storedColumns) {
      store.columns.splice(0, store.columns.length, ...parse(storedColumns));
    }

    loading.value = false;
  });

  useVisibleTask$(({ track, cleanup }) => {
    track(() => store.columns);

    if (!loading.value) {
      const id = setTimeout(() => {
        window.localStorage.setItem("columns", stringify(store.columns));
      }, 1000);

      cleanup(() => {
        clearTimeout(id);
      });
    } else {
      load();
    }
  });

  const onColumnCreate = $(() => {
    store.columns.push({
      label: "New Column",
      tasks: [],
    });
  });

  const onTaskCreate = $(() => {
    store.columns[0].tasks.push({
      label: "New Task",
      Id: Math.random().toString(),
      column: store.columns[0],
    });
  });

  const onTaskChange = $(
    (e: QwikChangeEvent<HTMLTextAreaElement>, task: Task) => {
      task.label = e.target.value;
    },
  );

  const onColumnChange = $(
    (e: QwikChangeEvent<HTMLInputElement>, column: Column) => {
      column.label = e.target.value;
    },
  );

  const onTaskDrop = $((column: Column) => {
    store.draggedTask!.column.tasks.splice(
      store.draggedTask!.column.tasks.indexOf(store.draggedTask!),
      1,
    );
    column.tasks.push(store.draggedTask!);
    store.draggedTask!.column = column;
    store.draggedTask = undefined;
  });

  const onTaskDragStart = $((task: Task) => {
    store.draggedTask = task;
  });

  return {
    store,
    onColumnCreate,
    onTaskCreate,
    onTaskChange,
    onColumnChange,
    onTaskDragStart,
    onTaskDrop,
    loading: loading.value,
  };
};

export default useTasks;
