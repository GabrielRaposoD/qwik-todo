import type { DocumentHead } from "@builder.io/qwik-city";
import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <>
      <div class="text-xl font-bold">Hello World!</div>
    </>
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
