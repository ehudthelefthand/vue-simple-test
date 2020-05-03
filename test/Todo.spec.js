import { mount } from "@vue/test-utils";
import TodoApp from "@/pages/index.vue";

describe("Todo App", () => {
  test("verify instance", () => {
    const wrapper = mount(TodoApp);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test("task list is empty upon init", () => {
    const wrapper = mount(TodoApp);
    const items = wrapper.findAll("ul li");
    expect(items.length).toEqual(0);
  });

  test("adding task", async () => {
    const wrapper = mount(TodoApp);
    const input = wrapper.find('input[type="text"]');
    input.setValue("test");
    const form = wrapper.find("form");
    form.trigger("submit.prevent");

    await wrapper.vm.$nextTick();

    const items = wrapper.findAll("ul li");
    expect(items.length).toEqual(1);
    expect(input.element.value).toEqual("");
  });

  test("toggling task", async () => {
    const wrapper = mount(TodoApp, {
      data() {
        return {
          tasks: [
            { id: 1, name: "buy milk", done: false },
            { id: 2, name: "do homework", done: true }
          ]
        };
      }
    });

    const items = wrapper.findAll("ul li");
    expect(items.length).toEqual(2);

    const firstItem = wrapper.find("ul li:nth-child(1) span");
    expect(firstItem.classes("done")).toBe(false);

    const secondItem = wrapper.find("ul li:nth-child(2) span");
    expect(secondItem.classes("done")).toBe(true);

    secondItem.trigger("click");

    await wrapper.vm.$nextTick();

    expect(secondItem.classes("done")).toBe(false);
  });
});
