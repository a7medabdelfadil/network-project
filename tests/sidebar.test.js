/**
 * Tests for sidebar/burger/dropdowns using JSDOM.
 *
 * Manual mapping to requirements:
 * - RQ: burger click toggles body class menu-open
 * - RQ: clicking a sidebar link removes menu-open
 * - Boundary: missing elements should not crash (we test no-throw cases)
 */

describe("menu.js (sidebar/burger/dropdowns)", () => {
  beforeEach(() => {
    // Fresh DOM for every test
    document.body.className = "";
    document.body.innerHTML = `
      <button class="burger">☰</button>
      <nav class="sidebar">
        <a href="#x" id="link1">Link</a>
      </nav>

      <div class="dropdown">
        <a href="#" class="item" id="drop1">Drop 1</a>
      </div>

      <div class="dropdown-inside">
        <a href="#" class="subitem" id="sub1">Sub 1</a>
      </div>
    `;

    // IMPORTANT:
    // We must load the module AFTER setting up the DOM,
    // because menu.js auto-runs initMenu() in browser environments.
    jest.resetModules();
  });

  test("Burger click toggles body class 'menu-open'", () => {
    require("../src/menu"); // auto-init attaches listeners

    const burger = document.querySelector(".burger");
    expect(document.body.classList.contains("menu-open")).toBe(false);

    burger.click();
    expect(document.body.classList.contains("menu-open")).toBe(true);

    burger.click();
    expect(document.body.classList.contains("menu-open")).toBe(false);
  });

  test("Clicking a sidebar link removes 'menu-open'", () => {
    require("../src/menu");

    // set menu-open first
    document.body.classList.add("menu-open");
    expect(document.body.classList.contains("menu-open")).toBe(true);

    const link = document.querySelector(".sidebar a");
    link.click();

    expect(document.body.classList.contains("menu-open")).toBe(false);
  });

  test("Dropdown 1st level toggles 'is-open' on parent element", () => {
    require("../src/menu");

    const btn = document.getElementById("drop1");
    const parent = btn.parentElement;

    expect(parent.classList.contains("is-open")).toBe(false);
    btn.click();
    expect(parent.classList.contains("is-open")).toBe(true);
    btn.click();
    expect(parent.classList.contains("is-open")).toBe(false);
  });

  test("Dropdown 2nd level toggles 'is-open-inside' on parent element", () => {
    require("../src/menu");

    const btn = document.getElementById("sub1");
    const parent = btn.parentElement;

    expect(parent.classList.contains("is-open-inside")).toBe(false);
    btn.click();
    expect(parent.classList.contains("is-open-inside")).toBe(true);
    btn.click();
    expect(parent.classList.contains("is-open-inside")).toBe(false);
  });

  test("Boundary: missing burger/sidebar should not throw", () => {
    document.body.innerHTML = `
      <div class="dropdown">
        <a href="#" class="item" id="drop1">Drop 1</a>
      </div>
    `;
    expect(() => require("../src/menu")).not.toThrow();
  });

  test("Boundary: dropdown item without parentElement should not throw", () => {
    // Create a dropdown item that is detached (parentElement = null)
    document.body.innerHTML = `
      <a href="#" class="item" id="detached">Detached</a>
    `;

    expect(() => require("../src/menu")).not.toThrow();

    const detached = document.getElementById("detached");
    // Clicking should also not throw even though parentElement is null
    expect(() => detached.click()).not.toThrow();
  });
});
