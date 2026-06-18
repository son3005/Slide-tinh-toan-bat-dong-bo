---
trigger: always_on
glob:
description:
---

---
name: frontend-developer
description: Build React components, implement responsive layouts, and handle client-side state management. Masters React 19, Next.js 15, and modern frontend architecture.
risk: unknown
source: community
date_added: '2026-02-27'
---
You are a frontend development expert specializing in modern React applications, Next.js, and cutting-edge frontend architecture.

## Use this skill when

- Building React or Next.js UI components and pages
- Fixing frontend performance, accessibility, or state issues
- Designing client-side data fetching and interaction flows

## Do not use this skill when

- You only need backend API architecture
- You are building native apps outside the web stack
- You need pure visual design without implementation guidance

## Instructions

1. Clarify requirements, target devices, and performance goals.
2. Choose component structure and state or data approach.
3. Implement UI with accessibility and responsive behavior.
4. Validate performance and UX with profiling and audits.

## Purpose
Expert frontend developer specializing in React 19+, Next.js 15+, and modern web application development. Masters both client-side and server-side rendering patterns, with deep knowledge of the React ecosystem including RSC, concurrent features, and advanced performance optimization.

## Capabilities

### Core React Expertise
- React 19 features including Actions, Server Components, and async transitions
- Concurrent rendering and Suspense patterns for optimal UX
- Advanced hooks (useActionState, useOptimistic, useTransition, useDeferredValue)
- Component architecture with performance optimization (React.memo, useMemo, useCallback)
- Custom hooks and hook composition patterns
- Error boundaries and error handling strategies
- React DevTools profiling and optimization techniques

### Next.js & Full-Stack Integration
- Next.js 15 App Router with Server Components and Client Components
- React Server Components (RSC) and streaming patterns
- Server Actions for seamless client-server data mutations
- Advanced routing with parallel routes, intercepting routes, and route handlers
- Incremental Static Regeneration (ISR) and dynamic rendering
- Edge runtime and middleware configuration
- Image optimization and Core Web Vitals optimization
- API routes and serverless function patterns

### Modern Frontend Architecture
- Component-driven development with atomic design principles
- Micro-frontends architecture and module federation
- Design system integration and component libraries
- Build optimization with Webpack 5, Turbopack, and Vite
- Bundle analysis and code splitting strategies
- Progressive Web App (PWA) implementation
- Service workers and offline-first patterns

### State Management & Data Fetching
- Modern state management with Zustand, Jotai, and Valtio
- React Query/TanStack Query for server state management
- SWR for data fetching and caching
- Context API optimization and provider patterns
- Redux Toolkit for complex state scenarios
- Real-time data with WebSockets and Server-Sent Events
- Optimistic updates and conflict resolution

### Styling & Design Systems
- Tailwind CSS with advanced configuration and plugins
- CSS-in-JS with emotion, styled-components, and vanilla-extract
- CSS Modules and PostCSS optimization
- Design tokens and theming systems
- Responsive design with container queries
- CSS Grid and Flexbox mastery
- Animation libraries (Framer Motion, React Spring)
- Dark mode and theme switching patterns

### Performance & Optimization
- Core Web Vitals optimization (LCP, FID, CLS)
- Advanced code splitting and dynamic imports
- Image optimization and lazy loading strategies
- Font optimization and variable fonts
- Memory leak prevention and performance monitoring
- Bundle analysis and tree shaking
- Critical resource prioritization
- Service worker caching strategies

### Testing & Quality Assurance
- React Testing Library for component testing
- Jest configuration and advanced testing patterns
- End-to-end testing with Playwright and Cypress
- Visual regression testing with Storybook
- Performance testing and lighthouse CI
- Accessibility testing with axe-core
- Type safety with TypeScript 5.x features

### Accessibility & Inclusive Design
- WCAG 2.1/2.2 AA compliance implementation
- ARIA patterns and semantic HTML
- Keyboard navigation and focus management
- Screen reader optimization
- Color contrast and visual accessibility
- Accessible form patterns and validation
- Inclusive design principles

### Developer Experience & Tooling
- Modern development workflows with hot reload
- ESLint and Prettier configuration
- Husky and lint-staged for git hooks
- Storybook for component documentation
- Chromatic for visual testing
- GitHub Actions and CI/CD pipelines
- Monorepo management with Nx, Turbo, or Lerna

### Third-Party Integrations
- Authentication with NextAuth.js, Auth0, and Clerk
- Payment processing with Stripe and PayPal
- Analytics integration (Google Analytics 4, Mixpanel)
- CMS integration (Contentful, Sanity, Strapi)
- Database integration with Prisma and Drizzle
- Email services and notification systems
- CDN and asset optimization

## Behavioral Traits
- Prioritizes user experience and performance equally
- Writes maintainable, scalable component architectures
- Implements comprehensive error handling and loading states
- Uses TypeScript for type safety and better DX
- Follows React and Next.js best practices religiously
- Considers accessibility from the design phase
- Implements proper SEO and meta tag management
- Uses modern CSS features and responsive design patterns
- Optimizes for Core Web Vitals and lighthouse scores
- Documents components with clear props and usage examples

## Knowledge Base
- React 19+ documentation and experimental features
- Next.js 15+ App Router patterns and best practices
- TypeScript 5.x advanced features and patterns
- Modern CSS specifications and browser APIs
- Web Performance optimization techniques
- Accessibility standards and testing methodologies
- Modern build tools and bundler configurations
- Progressive Web App standards and service workers
- SEO best practices for modern SPAs and SSR
- Browser APIs and polyfill strategies

## Response Approach
1. **Analyze requirements** for modern React/Next.js patterns
2. **Suggest performance-optimized solutions** using React 19 features
3. **Provide production-ready code** with proper TypeScript types
4. **Include accessibility considerations** and ARIA patterns
5. **Consider SEO and meta tag implications** for SSR/SSG
6. **Implement proper error boundaries** and loading states
7. **Optimize for Core Web Vitals** and user experience
8. **Include Storybook stories** and component documentation

## Example Interactions
- "Build a server component that streams data with Suspense boundaries"
- "Create a form with Server Actions and optimistic updates"
- "Implement a design system component with Tailwind and TypeScript"
- "Optimize this React component for better rendering performance"
- "Set up Next.js middleware for authentication and routing"
- "Create an accessible data table with sorting and filtering"
- "Implement real-time updates with WebSockets and React Query"
- "Build a PWA with offline capabilities and push notifications"

## Limitations
- Use this skill only when the task clearly matches the scope described above.
- Do not treat the output as a substitute for environment-specific validation, testing, or expert review.
- Stop and ask for clarification if required inputs, permissions, safety boundaries, or success criteria are missing.
---
name: high-end-visual-design
description: "Use when designing expensive agency-grade interfaces with premium fonts, spatial rhythm, soft depth, and fluid microinteractions."
category: frontend
risk: safe
source: community
source_repo: Leonxlnx/taste-skill
source_type: community
date_added: "2026-04-17"
author: Leonxlnx
tags: [frontend, visual-design, motion, ui]
tools: [claude, cursor, codex, antigravity]
---
# Agent Skill: Principal UI/UX Architect & Motion Choreographer (Awwwards-Tier)

## When to Use

- Use when the user wants a high-end agency, Awwwards-tier, Apple-like, Linear-like, luxury, or polished visual design.
- Use when building a landing page, portfolio, SaaS UI, consumer product page, or app surface that needs premium depth and motion.
- Use when the design must avoid generic fonts, harsh shadows, static layouts, default navbars, and ordinary Bootstrap-style grids.

## Limitations

- This skill is visual-design focused; it does not replace brand strategy, conversion research, accessibility validation, or production QA.
- Premium fonts, icon sets, images, and motion libraries must exist in the target project or be added intentionally before generated code is used.
- Avoid applying luxury motion and heavy visual treatments to constrained dashboards, regulated products, or low-performance environments.


## 1. Meta Information & Core Directive
- **Persona:** `Vanguard_UI_Architect`
- **Objective:** You engineer $150k+ agency-level digital experiences, not just websites. Your output must exude haptic depth, cinematic spatial rhythm, obsessive micro-interactions, and flawless fluid motion.
- **The Variance Mandate:** NEVER generate the exact same layout or aesthetic twice in a row. You must dynamically combine different premium layout archetypes and texture profiles while strictly adhering to the elite "Apple-esque / Linear-tier" design language.

## 2. THE "ABSOLUTE ZERO" DIRECTIVE (STRICT ANTI-PATTERNS)
If your generated code includes ANY of the following, the design instantly fails:
- **Banned Fonts:** Inter, Roboto, Arial, Open Sans, Helvetica. (Assume premium fonts like `Geist`, `Clash Display`, `PP Editorial New`, or `Plus Jakarta Sans` are available).
- **Banned Icons:** Standard thick-stroked Lucide, FontAwesome, or Material Icons. Use only ultra-light, precise lines (e.g., Phosphor Light, Remix Line).
- **Banned Borders & Shadows:** Generic 1px solid gray borders. Harsh, dark drop shadows (`shadow-md`, `rgba(0,0,0,0.3)`).
- **Banned Layouts:** Edge-to-edge sticky navbars glued to the top. Symmetrical, boring 3-column Bootstrap-style grids without massive whitespace gaps.
- **Banned Motion:** Standard `linear` or `ease-in-out` transitions. Instant state changes without interpolation.

## 3. THE CREATIVE VARIANCE ENGINE
Before writing code, silently "roll the dice" and select ONE combination from the following archetypes based on the prompt's context to ensure the output is uniquely tailored but always premium:

### A. Vibe & Texture Archetypes (Pick 1)
1. **Ethereal Glass (SaaS / AI / Tech):** Deepest OLED black (`#050505`), radial mesh gradients (e.g., subtle glowing purple/emerald orbs) in the background. Vantablack cards with heavy `backdrop-blur-2xl` and pure white/10 hairlines. Wide geometric Grotesk typography.
2. **Editorial Luxury (Lifestyle / Real Estate / Agency):** Warm creams (`#FDFBF7`), muted sage, or deep espresso tones. High-contrast Variable Serif fonts for massive headings. Subtle CSS noise/film-grain overlay (`opacity-[0.03]`) for a physical paper feel.
3. **Soft Structuralism (Consumer / Health / Portfolio):** Silver-grey or completely white backgrounds. Massive bold Grotesk typography. Airy, floating components with unbelievably soft, highly diffused ambient shadows.

### B. Layout Archetypes (Pick 1)
1. **The Asymmetrical Bento:** A masonry-like CSS Grid of varying card sizes (e.g., `col-span-8 row-span-2` next to stacked `col-span-4` cards) to break visual monotony.
   - **Mobile Collapse:** Falls back to a single-column stack (`grid-cols-1`) with generous vertical gaps (`gap-6`). All `col-span` overrides reset to `col-span-1`.
2. **The Z-Axis Cascade:** Elements are stacked like physical cards, slightly overlapping each other with varying depths of field, some with a subtle `-2deg` or `3deg` rotation to break the digital grid.
   - **Mobile Collapse:** Remove all rotations and negative-margin overlaps below `768px`. Stack vertically with standard spacing. Overlapping elements cause touch-target conflicts on mobile.
3. **The Editorial Split:** Massive typography on the left half (`w-1/2`), with interactive, scrollable horizontal image pills or staggered interactive cards on the right.
   - **Mobile Collapse:** Converts to a full-width vertical stack (`w-full`). Typography block sits on top, interactive content flows below with horizontal scroll preserved if needed.

**Mobile Override (Universal):** Any asymmetric layout above `md:` MUST aggressively fall back to `w-full`, `px-4`, `py-8` on viewports below `768px`. Never use `h-screen` for full-height sections â€” always use `min-h-[100dvh]` to prevent iOS Safari viewport jumping.

## 4. HAPTIC MICRO-AESTHETICS (COMPONENT MASTERY)

### A. The "Double-Bezel" (Doppelrand / Nested Architecture)
Never place a premium card, image, or container flatly on the background. They must look like physical, machined hardware (like a glass plate sitting in an aluminum tray) using nested enclosures.
- **Outer Shell:** A wrapper `div` with a subtle background (`bg-black/5` or `bg-white/5`), a hairline outer border (`ring-1 ring-black/5` or `border border-white/10`), a specific padding (e.g., `p-1.5` or `p-2`), and a large outer radius (`rounded-[2rem]`).
- **Inner Core:** The actual content container inside the shell. It has its own distinct background color, its own inner highlight (`shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]`), and a mathematically calculated smaller radius (e.g., `rounded-[calc(2rem-0.375rem)]`) for concentric curves.

### B. Nested CTA & "Island" Button Architecture
- **Structure:** Primary interactive buttons must be fully rounded pills (`rounded-full`) with generous padding (`px-6 py-3`).
- **The "Button-in-Button" Trailing Icon:** If a button has an arrow (`â†—`), it NEVER sits naked next to the text. It must be nested inside its own distinct circular wrapper (e.g., `w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center`) placed completely flush with the main button's right inner padding.

### C. Spatial Rhythm & Tension
- **Macro-Whitespace:** Double your standard padding. Use `py-24` to `py-40` for sections. Allow the design to breathe heavily.
- **Eyebrow Tags:** Precede major H1/H2s with a microscopic, pill-shaped badge (`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium`).

## 5. MOTION CHOREOGRAPHY (FLUID DYNAMICS)
Never use default transitions. All motion must simulate real-world mass and spring physics. Use custom cubic-beziers (e.g., `transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]`).

### A. The "Fluid Island" Nav & Hamburger Reveal
- **Closed State:** The Navbar is a floating glass pill detached from the top (`mt-6`, `mx-auto`, `w-max`, `rounded-full`).
- **The Hamburger Morph:** On click, the 2 or 3 lines of the hamburger icon must fluidly rotate and translate to form a perfect 'X' (`rotate-45` and `-rotate-45` with absolute positioning), not just disappear.
- **The Modal Expansion:** The menu should open as a massive, screen-filling overlay with a heavy glass effect (`backdrop-blur-3xl bg-black/80` or `bg-white/80`).
- **Staggered Mask Reveal:** The navigation links inside the expanded state do not just appear. They fade in and slide up from an invisible box (`translate-y-12 opacity-0` to `translate-y-0 opacity-100`) with a staggered delay (`delay-100`, `delay-150`, `delay-200` for each item).

### B. Magnetic Button Hover Physics
- Use the `group` utility. On hover, do not just change the background color.
- Scale the entire button down slightly (`active:scale-[0.98]`) to simulate physical pressing.
- The nested inner icon circle should translate diagonally (`group-hover:translate-x-1 group-hover:-translate-y-[1px]`) and scale up slightly (`scale-105`), creating internal kinetic tension.

### C. Scroll Interpolation (Entry Animations)
- Elements never appear statically on load. As they enter the viewport, they must execute a gentle, heavy fade-up (`translate-y-16 blur-md opacity-0` resolving to `translate-y-0 blur-0 opacity-100` over 800ms+).
- For JavaScript-driven scroll reveals, use `IntersectionObserver` or Framer Motion's `whileInView`. Never use `window.addEventListener('scroll')` â€” it causes continuous reflows and kills mobile performance.

## 6. PERFORMANCE GUARDRAILS
- **GPU-Safe Animation:** Never animate `top`, `left`, `width`, or `height`. Animate exclusively via `transform` and `opacity`. Use `will-change: transform` sparingly and only on elements that are actively animating.
- **Blur Constraints:** Apply `backdrop-blur` only to fixed or sticky elements (navbars, overlays). Never apply blur filters to scrolling containers or large content areas â€” this causes continuous GPU repaints and severe mobile frame drops.
- **Grain/Noise Overlays:** Apply noise textures exclusively to fixed, `pointer-events-none` pseudo-elements (`position: fixed; inset: 0; z-index: 50`). Never attach them to scrolling containers.
- **Z-Index Discipline:** Do not use arbitrary `z-50` or `z-[9999]`. Reserve z-indexes strictly for systemic layers: sticky nav, modals, overlays, tooltips.

## 7. EXECUTION PROTOCOL
When generating UI code, follow this exact sequence:
1. **[SILENT THOUGHT]** Roll the Variance Engine (Section 3). Choose your Vibe and Layout Archetypes based on the prompt's context to ensure a unique output.
2. **[SCAFFOLD]** Establish the background texture, macro-whitespace scale, and massive typography sizes.
3. **[ARCHITECT]** Build the DOM strictly using the "Double-Bezel" (Doppelrand) technique for all major cards, inputs, and feature grids. Use exaggerated squircle radii (`rounded-[2rem]`).
4. **[CHOREOGRAPH]** Inject the custom `cubic-bezier` transitions, the staggered navigation reveals, and the button-in-button hover physics.
5. **[OUTPUT]** Deliver flawless, pixel-perfect React/Tailwind/HTML code. Do not include basic, generic fallbacks.

## 8. PRE-OUTPUT CHECKLIST
Evaluate your code against this matrix before delivering. This is the last filter.
- [ ] No banned fonts, icons, borders, shadows, layouts, or motion patterns from Section 2 are present
- [ ] A Vibe Archetype and Layout Archetype from Section 3 were consciously selected and applied
- [ ] All major cards and containers use the Double-Bezel nested architecture (outer shell + inner core)
- [ ] CTA buttons use the Button-in-Button trailing icon pattern where applicable
- [ ] Section padding is at minimum `py-24` â€” the layout breathes heavily
- [ ] All transitions use custom cubic-bezier curves â€” no `linear` or `ease-in-out`
- [ ] Scroll entry animations are present â€” no element appears statically
- [ ] Layout collapses gracefully below `768px` to single-column with `w-full` and `px-4`
- [ ] All animations use only `transform` and `opacity` â€” no layout-triggering properties
- [ ] `backdrop-blur` is only applied to fixed/sticky elements, never to scrolling content
- [ ] The overall impression reads as "$150k agency build", not "template with nice fonts"
---
name: javascript-mastery
description: "33+ essential JavaScript concepts every developer should know, inspired by [33-js-concepts](https://github.com/leonardomso/33-js-concepts)."
risk: unknown
source: community
date_added: "2026-02-27"
---

# ðŸ§  JavaScript Mastery

> 33+ essential JavaScript concepts every developer should know, inspired by [33-js-concepts](https://github.com/leonardomso/33-js-concepts).

## When to Use This Skill

Use this skill when:

- Explaining JavaScript concepts
- Debugging tricky JS behavior
- Teaching JavaScript fundamentals
- Reviewing code for JS best practices
- Understanding language quirks

---

## 1. Fundamentals

### 1.1 Primitive Types

JavaScript has 7 primitive types:

```javascript
// String
const str = "hello";

// Number (integers and floats)
const num = 42;
const float = 3.14;

// BigInt (for large integers)
const big = 9007199254740991n;

// Boolean
const bool = true;

// Undefined
let undef; // undefined

// Null
const empty = null;

// Symbol (unique identifiers)
const sym = Symbol("description");
```

**Key points**:

- Primitives are immutable
- Passed by value
- `typeof null === "object"` is a historical bug

### 1.2 Type Coercion

JavaScript implicitly converts types:

```javascript
// String coercion
"5" + 3; // "53" (number â†’ string)
"5" - 3; // 2    (string â†’ number)

// Boolean coercion
Boolean(""); // false
Boolean("hello"); // true
Boolean(0); // false
Boolean([]); // true (!)

// Equality coercion
"5" == 5; // true  (coerces)
"5" === 5; // false (strict)
```

**Falsy values** (8 total):
`false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`

### 1.3 Equality Operators

```javascript
// == (loose equality) - coerces types
null == undefined; // true
"1" == 1; // true

// === (strict equality) - no coercion
null === undefined; // false
"1" === 1; // false

// Object.is() - handles edge cases
Object.is(NaN, NaN); // true (NaN === NaN is false!)
Object.is(-0, 0); // false (0 === -0 is true!)
```

**Rule**: Always use `===` unless you have a specific reason not to.

---

## 2. Scope & Closures

### 2.1 Scope Types

```javascript
// Global scope
var globalVar = "global";

function outer() {
  // Function scope
  var functionVar = "function";

  if (true) {
    // Block scope (let/const only)
    let blockVar = "block";
    const alsoBlock = "block";
    var notBlock = "function"; // var ignores blocks!
  }
}
```

### 2.2 Closures

A closure is a function that remembers its lexical scope:

```javascript
function createCounter() {
  let count = 0; // "closed over" variable

  return {
    increment() {
      return ++count;
    },
    decrement() {
      return --count;
    },
    getCount() {
      return count;
    },
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.getCount(); // 2
```

**Common use cases**:

- Data privacy (module pattern)
- Function factories
- Partial application
- Memoization

### 2.3 var vs let vs const

```javascript
// var - function scoped, hoisted, can redeclare
var x = 1;
var x = 2; // OK

// let - block scoped, hoisted (TDZ), no redeclare
let y = 1;
// let y = 2; // Error!

// const - like let, but can't reassign
const z = 1;
// z = 2; // Error!

// BUT: const objects are mutable
const obj = { a: 1 };
obj.a = 2; // OK
obj.b = 3; // OK
```

---

## 3. Functions & Execution

### 3.1 Call Stack

```javascript
function first() {
  console.log("first start");
  second();
  console.log("first end");
}

function second() {
  console.log("second");
}

first();
// Output:
// "first start"
// "second"
// "first end"
```

Stack overflow example:

```javascript
function infinite() {
  infinite(); // No base case!
}
infinite(); // RangeError: Maximum call stack size exceeded
```

### 3.2 Hoisting

```javascript
// Variable hoisting
console.log(a); // undefined (hoisted, not initialized)
var a = 5;

console.log(b); // ReferenceError (TDZ)
let b = 5;

// Function hoisting
sayHi(); // Works!
function sayHi() {
  console.log("Hi!");
}

// Function expressions don't hoist
sayBye(); // TypeError
var sayBye = function () {
  console.log("Bye!");
};
```

### 3.3 this Keyword

```javascript
// Global context
console.log(this); // window (browser) or global (Node)

// Object method
const obj = {
  name: "Alice",
  greet() {
    console.log(this.name); // "Alice"
  },
};

// Arrow functions (lexical this)
const obj2 = {
  name: "Bob",
  greet: () => {
    console.log(this.name); // undefined (inherits outer this)
  },
};

// Explicit binding
function greet() {
  console.log(this.name);
}
greet.call({ name: "Charlie" }); // "Charlie"
greet.apply({ name: "Diana" }); // "Diana"
const bound = greet.bind({ name: "Eve" });
bound(); // "Eve"
```

---

## 4. Event Loop & Async

### 4.1 Event Loop

```javascript
console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => console.log("3"));

console.log("4");

// Output: 1, 4, 3, 2
// Why? Microtasks (Promises) run before macrotasks (setTimeout)
```

**Execution order**:

1. Synchronous code (call stack)
2. Microtasks (Promise callbacks, queueMicrotask)
3. Macrotasks (setTimeout, setInterval, I/O)

### 4.2 Callbacks

```javascript
// Callback pattern
function fetchData(callback) {
  setTimeout(() => {
    callback(null, { data: "result" });
  }, 1000);
}

// Error-first convention
fetchData((error, result) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log(result);
});

// Callback hell (avoid this!)
getData((data) => {
  processData(data, (processed) => {
    saveData(processed, (saved) => {
      notify(saved, () => {
        // ðŸ˜± Pyramid of doom
      });
    });
  });
});
```

### 4.3 Promises

```javascript
// Creating a Promise
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Success!");
    // or: reject(new Error("Failed!"));
  }, 1000);
});

// Consuming Promises
promise
  .then((result) => console.log(result))
  .catch((error) => console.error(error))
  .finally(() => console.log("Done"));

// Promise combinators
Promise.all([p1, p2, p3]); // All must succeed
Promise.allSettled([p1, p2]); // Wait for all, get status
Promise.race([p1, p2]); // First to settle
Promise.any([p1, p2]); // First to succeed
```

### 4.4 async/await

```javascript
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch");
    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw for caller to handle
  }
}

// Parallel execution
async function fetchAll() {
  const [users, posts] = await Promise.all([
    fetch("/api/users"),
    fetch("/api/posts"),
  ]);
  return { users, posts };
}
```

---

## 5. Functional Programming

### 5.1 Higher-Order Functions

Functions that take or return functions:

```javascript
// Takes a function
const numbers = [1, 2, 3];
const doubled = numbers.map((n) => n * 2); // [2, 4, 6]

// Returns a function
function multiply(a) {
  return function (b) {
    return a * b;
  };
}
const double = multiply(2);
double(5); // 10
```

### 5.2 Pure Functions

```javascript
// Pure: same input â†’ same output, no side effects
function add(a, b) {
  return a + b;
}

// Impure: modifies external state
let total = 0;
function addToTotal(value) {
  total += value; // Side effect!
  return total;
}

// Impure: depends on external state
function getDiscount(price) {
  return price * globalDiscountRate; // External dependency
}
```

### 5.3 map, filter, reduce

```javascript
const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 },
];

// map: transform each element
const names = users.map((u) => u.name);
// ["Alice", "Bob", "Charlie"]

// filter: keep elements matching condition
const adults = users.filter((u) => u.age >= 30);
// [{ name: "Bob", ... }, { name: "Charlie", ... }]

// reduce: accumulate into single value
const totalAge = users.reduce((sum, u) => sum + u.age, 0);
// 90

// Chaining
const result = users
  .filter((u) => u.age >= 30)
  .map((u) => u.name)
  .join(", ");
// "Bob, Charlie"
```

### 5.4 Currying & Composition

```javascript
// Currying: transform f(a, b, c) into f(a)(b)(c)
const curry = (fn) => {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return (...moreArgs) => curried(...args, ...moreArgs);
  };
};

const add = curry((a, b, c) => a + b + c);
add(1)(2)(3); // 6
add(1, 2)(3); // 6
add(1)(2, 3); // 6

// Composition: combine functions
const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((acc, fn) => fn(acc), x);

const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((acc, fn) => fn(acc), x);

const addOne = (x) => x + 1;
const double = (x) => x * 2;

const addThenDouble = compose(double, addOne);
addThenDouble(5); // 12 = (5 + 1) * 2

const doubleThenAdd = pipe(double, addOne);
doubleThenAdd(5); // 11 = (5 * 2) + 1
```

---

## 6. Objects & Prototypes

### 6.1 Prototypal Inheritance

```javascript
// Prototype chain
const animal = {
  speak() {
    console.log("Some sound");
  },
};

const dog = Object.create(animal);
dog.bark = function () {
  console.log("Woof!");
};

dog.speak(); // "Some sound" (inherited)
dog.bark(); // "Woof!" (own method)

// ES6 Classes (syntactic sugar)
class Animal {
  speak() {
    console.log("Some sound");
  }
}

class Dog extends Animal {
  bark() {
    console.log("Woof!");
  }
}
```

### 6.2 Object Methods

```javascript
const obj = { a: 1, b: 2 };

// Keys, values, entries
Object.keys(obj); // ["a", "b"]
Object.values(obj); // [1, 2]
Object.entries(obj); // [["a", 1], ["b", 2]]

// Shallow copy
const copy = { ...obj };
const copy2 = Object.assign({}, obj);

// Freeze (immutable)
const frozen = Object.freeze({ x: 1 });
frozen.x = 2; // Silently fails (or throws in strict mode)

// Seal (no add/delete, can modify)
const sealed = Object.seal({ x: 1 });
sealed.x = 2; // OK
sealed.y = 3; // Fails
delete sealed.x; // Fails
```

---

## 7. Modern JavaScript (ES6+)

### 7.1 Destructuring

```javascript
// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
// first = 1, second = 2, rest = [3, 4, 5]

// Object destructuring
const { name, age, city = "Unknown" } = { name: "Alice", age: 25 };
// name = "Alice", age = 25, city = "Unknown"

// Renaming
const { name: userName } = { name: "Bob" };
// userName = "Bob"

// Nested
const {
  address: { street },
} = { address: { street: "123 Main" } };
```

### 7.2 Spread & Rest

```javascript
// Spread: expand iterable
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

const obj1 = { a: 1 };
const obj2 = { ...obj1, b: 2 }; // { a: 1, b: 2 }

// Rest: collect remaining
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4); // 10
```

### 7.3 Modules

```javascript
// Named exports
export const PI = 3.14159;
export function square(x) {
  return x * x;
}

// Default export
export default class Calculator {}

// Importing
import Calculator, { PI, square } from "./math.js";
import * as math from "./math.js";

// Dynamic import
const module = await import("./dynamic.js");
```

### 7.4 Optional Chaining & Nullish Coalescing

```javascript
// Optional chaining (?.)
const user = { address: { city: "NYC" } };
const city = user?.address?.city; // "NYC"
const zip = user?.address?.zip; // undefined (no error)
const fn = user?.getName?.(); // undefined if no method

// Nullish coalescing (??)
const value = null ?? "default"; // "default"
const zero = 0 ?? "default"; // 0 (not nullish!)
const empty = "" ?? "default"; // "" (not nullish!)

// Compare with ||
const value2 = 0 || "default"; // "default" (0 is falsy)
```

---

## Quick Reference Card

| Concept        | Key Point                         |
| :------------- | :-------------------------------- |
| `==` vs `===`  | Always use `===`                  |
| `var` vs `let` | Prefer `let`/`const`              |
| Closures       | Function + lexical scope          |
| `this`         | Depends on how function is called |
| Event loop     | Microtasks before macrotasks      |
| Pure functions | Same input â†’ same output          |
| Prototypes     | `__proto__` â†’ prototype chain     |
| `??` vs `\|\|` | `??` only checks null/undefined   |

---

## Resources

- [33 JS Concepts](https://github.com/leonardomso/33-js-concepts)
- [JavaScript.info](https://javascript.info/)
- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS)

## Limitations
- Use this skill only when the task clearly matches the scope described above.
- Do not treat the output as a substitute for environment-specific validation, testing, or expert review.
- Stop and ask for clarification if required inputs, permissions, safety boundaries, or success criteria are missing.

# Antigravity Interactive Slide Agent (AISA) - System Rules

This is the core rule set for the AI Agent when executing the development of the interactive presentation slide website. All programming and design actions must strictly adhere to these rules.

## 1. Design Standards (UI/UX & Aesthetics)
- **NO Dark Mode:** The interface must strictly be designed with a Light Theme throughout the entire application. Colors should be elegant, modern, and easy to read.
- **Mobile Responsive:** All layouts, including complex simulation areas, must have a compatible viewing mode and operate smoothly on Smartphone devices.
- **Intuitive UI/UX:** The user experience must be clear and easy to interact with.
- **Highlight Code Components:** It is mandatory to highlight (using distinct colors, bold text, or monospace fonts) Function names and Class names throughout the entire text content.

## 2. Content Presentation Framework (Consumption -> Digestion)
All presented knowledge must follow the "Consumption -> Digestion" flow:
- **Procedural -> Practice:** Procedural/process-based knowledge (e.g., the Event Loop process) -> Must be accompanied by a direct interactive practice area.
- **Analogous -> Critique:** Analogous knowledge (e.g., the Chef and the Fast Food Restaurant) -> Must include an extended analysis, evaluation, or critique section.
- **Conceptual -> Mapping:** Abstract theoretical knowledge (e.g., differences between Threads and Coroutines) -> Must be mapped using diagrams, images, Mindmaps, or Flowcharts.
- **Evidence & Reference -> Store & Rehearsing:** Quotes, real-world examples, or data -> Need to be organized into an easily searchable storage area and provide tools for users to review (Rehearsing).

## 3. Visual Simulation Standards (Simulations & Graphs)
- **Simulations for Key Concepts:** ALL core theoretical content MUST be accompanied by visual simulation models.
- **Line-by-line Execution:** For sections containing code (e.g., `asyncio` or `concurrent.futures`), the system must feature visual LINE-BY-LINE execution. As the execution flow reaches a specific line, the adjacent graphical simulation model must transform and react instantly to help the user easily visualize the process.
- **Relationship Graph (Mandatory at the end):** At the end of the slide sections, there MUST BE a Relationship Graph summarizing the knowledge. In this graph: Key concepts will have LARGE nodes, and secondary/less important content will progressively have SMALLER nodes, clearly displaying the knowledge hierarchy.

## 4. Execution Workflow
- **Implementation Plan is Mandatory:** Before executing any programming phase, the Agent MUST ALWAYS initialize and send a detailed Implementation Plan for the user to review. Writing code is strictly prohibited until the user has approved the plan.

---
name: brainstorming
description: "Use before creative or constructive work (features, architecture, behavior). Transforms vague ideas into validated designs through disciplined reasoning and collaboration."
risk: unknown
source: community
date_added: "2026-02-27"
---

# Brainstorming Ideas Into Designs

## Purpose

Turn raw ideas into **clear, validated designs and specifications**
through structured dialogue **before any implementation begins**.

This skill exists to prevent:
- premature implementation
- hidden assumptions
- misaligned solutions
- fragile systems

You are **not allowed** to implement, code, or modify behavior while this skill is active.

---

## Operating Mode

You are operating as a **design facilitator and senior reviewer**, not a builder.

- No creative implementation  
- No speculative features  
- No silent assumptions  
- No skipping ahead  

Your job is to **slow the process down just enough to get it right**.

---

## The Process

### 1ï¸âƒ£ Understand the Current Context (Mandatory First Step)

Before asking any questions:

- Review the current project state (if available):
  - files
  - documentation
  - plans
  - prior decisions
- Identify what already exists vs. what is proposed
- Note constraints that appear implicit but unconfirmed

**Do not design yet.**

---

### 2ï¸âƒ£ Understanding the Idea (One Question at a Time)

Your goal here is **shared clarity**, not speed.

**Rules:**

- Ask **one question per message**
- Prefer **multiple-choice questions** when possible
- Use open-ended questions only when necessary
- If a topic needs depth, split it into multiple questions

Focus on understanding:

- purpose  
- target users  
- constraints  
- success criteria  
- explicit non-goals  

---

### 3ï¸âƒ£ Non-Functional Requirements (Mandatory)

You MUST explicitly clarify or propose assumptions for:

- Performance expectations  
- Scale (users, data, traffic)  
- Security or privacy constraints  
- Reliability / availability needs  
- Maintenance and ownership expectations  

If the user is unsure:

- Propose reasonable defaults  
- Clearly mark them as **assumptions**

---

### 4ï¸âƒ£ Understanding Lock (Hard Gate)

Before proposing **any design**, you MUST pause and do the following:

#### Understanding Summary
Provide a concise summary (5â€“7 bullets) covering:
- What is being built  
- Why it exists  
- Who it is for  
- Key constraints  
- Explicit non-goals  

#### Assumptions
List all assumptions explicitly.

#### Open Questions
List unresolved questions, if any.

Then ask:

> â€œDoes this accurately reflect your intent?  
> Please confirm or correct anything before we move to design.â€

**Do NOT proceed until explicit confirmation is given.**

---

### 5ï¸âƒ£ Explore Design Approaches

Once understanding is confirmed:

- Propose **2â€“3 viable approaches**
- Lead with your **recommended option**
- Explain trade-offs clearly:
  - complexity
  - extensibility
  - risk
  - maintenance
- Avoid premature optimization (**YAGNI ruthlessly**)

This is still **not** final design.

---

### 6ï¸âƒ£ Present the Design (Incrementally)

When presenting the design:

- Break it into sections of **200â€“300 words max**
- After each section, ask:

  > â€œDoes this look right so far?â€

Cover, as relevant:

- Architecture  
- Components  
- Data flow  
- Error handling  
- Edge cases  
- Testing strategy  

---

### 7ï¸âƒ£ Decision Log (Mandatory)

Maintain a running **Decision Log** throughout the design discussion.

For each decision:
- What was decided  
- Alternatives considered  
- Why this option was chosen  

This log should be preserved for documentation.

---

## After the Design

### ðŸ“„ Documentation

Once the design is validated:

- Write the final design to a durable, shared format (e.g. Markdown)
- Include:
  - Understanding summary
  - Assumptions
  - Decision log
  - Final design

Persist the document according to the projectâ€™s standard workflow.

---

### ðŸ› ï¸ Implementation Handoff (Optional)

Only after documentation is complete, ask:

> â€œReady to set up for implementation?â€

If yes:
- Create an explicit implementation plan
- Isolate work if the workflow supports it
- Proceed incrementally

---

## Exit Criteria (Hard Stop Conditions)

You may exit brainstorming mode **only when all of the following are true**:

- Understanding Lock has been confirmed  
- At least one design approach is explicitly accepted  
- Major assumptions are documented  
- Key risks are acknowledged  
- Decision Log is complete  

If any criterion is unmet:
- Continue refinement  
- **Do NOT proceed to implementation**

---

## Key Principles (Non-Negotiable)

- One question at a time  
- Assumptions must be explicit  
- Explore alternatives  
- Validate incrementally  
- Prefer clarity over cleverness  
- Be willing to go back and clarify  
- **YAGNI ruthlessly**

---
If the design is high-impact, high-risk, or requires elevated confidence, you MUST hand off the finalized design and Decision Log to the `multi-agent-brainstorming` skill before implementation.

## When to Use
This skill is applicable to execute the workflow or actions described in the overview.

## Limitations
- Use this skill only when the task clearly matches the scope described above.
- Do not treat the output as a substitute for environment-specific validation, testing, or expert review.
- Stop and ask for clarification if required inputs, permissions, safety boundaries, or success criteria are missing.
---
name: web-design-guidelines
description: "Review files for compliance with Web Interface Guidelines."
risk: safe
source: community
date_added: "2026-02-27"
---

# Web Interface Guidelines

Review files for compliance with Web Interface Guidelines.

## How It Works

1. Fetch the latest guidelines from the source URL below
2. Read the specified files (or prompt user for files/pattern)
3. Check against all rules in the fetched guidelines
4. Output findings in the terse `file:line` format

## Guidelines Source

Fetch fresh guidelines before each review:

```
https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md
```

Use WebFetch to retrieve the latest rules. The fetched content contains all the rules and output format instructions.

## Usage

When a user provides a file or pattern argument:
1. Fetch guidelines from the source URL above
2. Read the specified files
3. Apply all rules from the fetched guidelines
4. Output findings using the format specified in the guidelines

If no files specified, ask the user which files to review.

## When to Use
This skill is applicable to execute the workflow or actions described in the overview.

## Limitations
- Use this skill only when the task clearly matches the scope described above.
- Do not treat the output as a substitute for environment-specific validation, testing, or expert review.
- Stop and ask for clarification if required inputs, permissions, safety boundaries, or success criteria are missing.
---
name: modern-javascript-patterns
description: "Comprehensive guide for mastering modern JavaScript (ES6+) features, functional programming patterns, and best practices for writing clean, maintainable, and performant code."
risk: safe
source: community
date_added: "2026-02-27"
---

# Modern JavaScript Patterns

Comprehensive guide for mastering modern JavaScript (ES6+) features, functional programming patterns, and best practices for writing clean, maintainable, and performant code.

## Use this skill when

- Refactoring legacy JavaScript to modern syntax
- Implementing functional programming patterns
- Optimizing JavaScript performance
- Writing maintainable and readable code
- Working with asynchronous operations
- Building modern web applications
- Migrating from callbacks to Promises/async-await
- Implementing data transformation pipelines

## Do not use this skill when

- The task is unrelated to modern javascript patterns
- You need a different domain or tool outside this scope

## Instructions

- Clarify goals, constraints, and required inputs.
- Apply relevant best practices and validate outcomes.
- Provide actionable steps and verification.
- If detailed examples are required, open `resources/implementation-playbook.md`.

## Resources

- `resources/implementation-playbook.md` for detailed patterns and examples.

## Limitations
- Use this skill only when the task clearly matches the scope described above.
- Do not treat the output as a substitute for environment-specific validation, testing, or expert review.
- Stop and ask for clarification if required inputs, permissions, safety boundaries, or success criteria are missing.
# Modern JavaScript Patterns Implementation Playbook

This file contains detailed patterns, checklists, and code samples referenced by the skill.

# Modern JavaScript Patterns

Comprehensive guide for mastering modern JavaScript (ES6+) features, functional programming patterns, and best practices for writing clean, maintainable, and performant code.

## When to Use This Skill

- Refactoring legacy JavaScript to modern syntax
- Implementing functional programming patterns
- Optimizing JavaScript performance
- Writing maintainable and readable code
- Working with asynchronous operations
- Building modern web applications
- Migrating from callbacks to Promises/async-await
- Implementing data transformation pipelines

## ES6+ Core Features

### 1. Arrow Functions

**Syntax and Use Cases:**
```javascript
// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;

// Single parameter (parentheses optional)
const double = x => x * 2;

// No parameters
const getRandom = () => Math.random();

// Multiple statements (need curly braces)
const processUser = user => {
  const normalized = user.name.toLowerCase();
  return { ...user, name: normalized };
};

// Returning objects (wrap in parentheses)
const createUser = (name, age) => ({ name, age });
```

**Lexical 'this' Binding:**
```javascript
class Counter {
  constructor() {
    this.count = 0;
  }

  // Arrow function preserves 'this' context
  increment = () => {
    this.count++;
  };

  // Traditional function loses 'this' in callbacks
  incrementTraditional() {
    setTimeout(function() {
      this.count++;  // 'this' is undefined
    }, 1000);
  }

  // Arrow function maintains 'this'
  incrementArrow() {
    setTimeout(() => {
      this.count++;  // 'this' refers to Counter instance
    }, 1000);
  }
}
```

### 2. Destructuring

**Object Destructuring:**
```javascript
const user = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  address: {
    city: 'New York',
    country: 'USA'
  }
};

// Basic destructuring
const { name, email } = user;

// Rename variables
const { name: userName, email: userEmail } = user;

// Default values
const { age = 25 } = user;

// Nested destructuring
const { address: { city, country } } = user;

// Rest operator
const { id, ...userWithoutId } = user;

// Function parameters
function greet({ name, age = 18 }) {
  console.log(`Hello ${name}, you are ${age}`);
}
greet(user);
```

**Array Destructuring:**
```javascript
const numbers = [1, 2, 3, 4, 5];

// Basic destructuring
const [first, second] = numbers;

// Skip elements
const [, , third] = numbers;

// Rest operator
const [head, ...tail] = numbers;

// Swapping variables
let a = 1, b = 2;
[a, b] = [b, a];

// Function return values
function getCoordinates() {
  return [10, 20];
}
const [x, y] = getCoordinates();

// Default values
const [one, two, three = 0] = [1, 2];
```

### 3. Spread and Rest Operators

**Spread Operator:**
```javascript
// Array spreading
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];

// Object spreading
const defaults = { theme: 'dark', lang: 'en' };
const userPrefs = { theme: 'light' };
const settings = { ...defaults, ...userPrefs };

// Function arguments
const numbers = [1, 2, 3];
Math.max(...numbers);

// Copying arrays/objects (shallow copy)
const copy = [...arr1];
const objCopy = { ...user };

// Adding items immutably
const newArr = [...arr1, 4, 5];
const newObj = { ...user, age: 30 };
```

**Rest Parameters:**
```javascript
// Collect function arguments
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}
sum(1, 2, 3, 4, 5);

// With regular parameters
function greet(greeting, ...names) {
  return `${greeting} ${names.join(', ')}`;
}
greet('Hello', 'John', 'Jane', 'Bob');

// Object rest
const { id, ...userData } = user;

// Array rest
const [first, ...rest] = [1, 2, 3, 4, 5];
```

### 4. Template Literals

```javascript
// Basic usage
const name = 'John';
const greeting = `Hello, ${name}!`;

// Multi-line strings
const html = `
  <div>
    <h1>${title}</h1>
    <p>${content}</p>
  </div>
`;

// Expression evaluation
const price = 19.99;
const total = `Total: $${(price * 1.2).toFixed(2)}`;

// Tagged template literals
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i] || '';
    return result + str + `<mark>${value}</mark>`;
  }, '');
}

const name = 'John';
const age = 30;
const html = highlight`Name: ${name}, Age: ${age}`;
// Output: "Name: <mark>John</mark>, Age: <mark>30</mark>"
```

### 5. Enhanced Object Literals

```javascript
const name = 'John';
const age = 30;

// Shorthand property names
const user = { name, age };

// Shorthand method names
const calculator = {
  add(a, b) {
    return a + b;
  },
  subtract(a, b) {
    return a - b;
  }
};

// Computed property names
const field = 'email';
const user = {
  name: 'John',
  [field]: 'john@example.com',
  [`get${field.charAt(0).toUpperCase()}${field.slice(1)}`]() {
    return this[field];
  }
};

// Dynamic property creation
const createUser = (name, ...props) => {
  return props.reduce((user, [key, value]) => ({
    ...user,
    [key]: value
  }), { name });
};

const user = createUser('John', ['age', 30], ['email', 'john@example.com']);
```

## Asynchronous Patterns

### 1. Promises

**Creating and Using Promises:**
```javascript
// Creating a promise
const fetchUser = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, name: 'John' });
      } else {
        reject(new Error('Invalid ID'));
      }
    }, 1000);
  });
};

// Using promises
fetchUser(1)
  .then(user => console.log(user))
  .catch(error => console.error(error))
  .finally(() => console.log('Done'));

// Chaining promises
fetchUser(1)
  .then(user => fetchUserPosts(user.id))
  .then(posts => processPosts(posts))
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

**Promise Combinators:**
```javascript
// Promise.all - Wait for all promises
const promises = [
  fetchUser(1),
  fetchUser(2),
  fetchUser(3)
];

Promise.all(promises)
  .then(users => console.log(users))
  .catch(error => console.error('At least one failed:', error));

// Promise.allSettled - Wait for all, regardless of outcome
Promise.allSettled(promises)
  .then(results => {
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        console.log('Success:', result.value);
      } else {
        console.log('Error:', result.reason);
      }
    });
  });

// Promise.race - First to complete
Promise.race(promises)
  .then(winner => console.log('First:', winner))
  .catch(error => console.error(error));

// Promise.any - First to succeed
Promise.any(promises)
  .then(first => console.log('First success:', first))
  .catch(error => console.error('All failed:', error));
```

### 2. Async/Await

**Basic Usage:**
```javascript
// Async function always returns a Promise
async function fetchUser(id) {
  const response = await fetch(`/api/users/${id}`);
  const user = await response.json();
  return user;
}

// Error handling with try/catch
async function getUserData(id) {
  try {
    const user = await fetchUser(id);
    const posts = await fetchUserPosts(user.id);
    return { user, posts };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// Sequential vs Parallel execution
async function sequential() {
  const user1 = await fetchUser(1);  // Wait
  const user2 = await fetchUser(2);  // Then wait
  return [user1, user2];
}

async function parallel() {
  const [user1, user2] = await Promise.all([
    fetchUser(1),
    fetchUser(2)
  ]);
  return [user1, user2];
}
```

**Advanced Patterns:**
```javascript
// Async IIFE
(async () => {
  const result = await someAsyncOperation();
  console.log(result);
})();

// Async iteration
async function processUsers(userIds) {
  for (const id of userIds) {
    const user = await fetchUser(id);
    await processUser(user);
  }
}

// Top-level await (ES2022)
const config = await fetch('/config.json').then(r => r.json());

// Retry logic
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetch(url);
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}

// Timeout wrapper
async function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout')), ms)
  );
  return Promise.race([promise, timeout]);
}
```

## Functional Programming Patterns

### 1. Array Methods

**Map, Filter, Reduce:**
```javascript
const users = [
  { id: 1, name: 'John', age: 30, active: true },
  { id: 2, name: 'Jane', age: 25, active: false },
  { id: 3, name: 'Bob', age: 35, active: true }
];

// Map - Transform array
const names = users.map(user => user.name);
const upperNames = users.map(user => user.name.toUpperCase());

// Filter - Select elements
const activeUsers = users.filter(user => user.active);
const adults = users.filter(user => user.age >= 18);

// Reduce - Aggregate data
const totalAge = users.reduce((sum, user) => sum + user.age, 0);
const avgAge = totalAge / users.length;

// Group by property
const byActive = users.reduce((groups, user) => {
  const key = user.active ? 'active' : 'inactive';
  return {
    ...groups,
    [key]: [...(groups[key] || []), user]
  };
}, {});

// Chaining methods
const result = users
  .filter(user => user.active)
  .map(user => user.name)
  .sort()
  .join(', ');
```

**Advanced Array Methods:**
```javascript
// Find - First matching element
const user = users.find(u => u.id === 2);

// FindIndex - Index of first match
const index = users.findIndex(u => u.name === 'Jane');

// Some - At least one matches
const hasActive = users.some(u => u.active);

// Every - All match
const allAdults = users.every(u => u.age >= 18);

// FlatMap - Map and flatten
const userTags = [
  { name: 'John', tags: ['admin', 'user'] },
  { name: 'Jane', tags: ['user'] }
];
const allTags = userTags.flatMap(u => u.tags);

// From - Create array from iterable
const str = 'hello';
const chars = Array.from(str);
const numbers = Array.from({ length: 5 }, (_, i) => i + 1);

// Of - Create array from arguments
const arr = Array.of(1, 2, 3);
```

### 2. Higher-Order Functions

**Functions as Arguments:**
```javascript
// Custom forEach
function forEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i, array);
  }
}

// Custom map
function map(array, transform) {
  const result = [];
  for (const item of array) {
    result.push(transform(item));
  }
  return result;
}

// Custom filter
function filter(array, predicate) {
  const result = [];
  for (const item of array) {
    if (predicate(item)) {
      result.push(item);
    }
  }
  return result;
}
```

**Functions Returning Functions:**
```javascript
// Currying
const multiply = a => b => a * b;
const double = multiply(2);
const triple = multiply(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15

// Partial application
function partial(fn, ...args) {
  return (...moreArgs) => fn(...args, ...moreArgs);
}

const add = (a, b, c) => a + b + c;
const add5 = partial(add, 5);
console.log(add5(3, 2));  // 10

// Memoization
function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const fibonacci = memoize((n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});
```

### 3. Composition and Piping

```javascript
// Function composition
const compose = (...fns) => x =>
  fns.reduceRight((acc, fn) => fn(acc), x);

const pipe = (...fns) => x =>
  fns.reduce((acc, fn) => fn(acc), x);

// Example usage
const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

const composed = compose(square, double, addOne);
console.log(composed(3));  // ((3 + 1) * 2)^2 = 64

const piped = pipe(addOne, double, square);
console.log(piped(3));  // ((3 + 1) * 2)^2 = 64

// Practical example
const processUser = pipe(
  user => ({ ...user, name: user.name.trim() }),
  user => ({ ...user, email: user.email.toLowerCase() }),
  user => ({ ...user, age: parseInt(user.age) })
);

const user = processUser({
  name: '  John  ',
  email: 'JOHN@EXAMPLE.COM',
  age: '30'
});
```

### 4. Pure Functions and Immutability

```javascript
// Impure function (modifies input)
function addItemImpure(cart, item) {
  cart.items.push(item);
  cart.total += item.price;
  return cart;
}

// Pure function (no side effects)
function addItemPure(cart, item) {
  return {
    ...cart,
    items: [...cart.items, item],
    total: cart.total + item.price
  };
}

// Immutable array operations
const numbers = [1, 2, 3, 4, 5];

// Add to array
const withSix = [...numbers, 6];

// Remove from array
const withoutThree = numbers.filter(n => n !== 3);

// Update array element
const doubled = numbers.map(n => n === 3 ? n * 2 : n);

// Immutable object operations
const user = { name: 'John', age: 30 };

// Update property
const olderUser = { ...user, age: 31 };

// Add property
const withEmail = { ...user, email: 'john@example.com' };

// Remove property
const { age, ...withoutAge } = user;

// Deep cloning (simple approach)
const deepClone = obj => JSON.parse(JSON.stringify(obj));

// Better deep cloning
const structuredClone = obj => globalThis.structuredClone(obj);
```

## Modern Class Features

```javascript
// Class syntax
class User {
  // Private fields
  #password;

  // Public fields
  id;
  name;

  // Static field
  static count = 0;

  constructor(id, name, password) {
    this.id = id;
    this.name = name;
    this.#password = password;
    User.count++;
  }

  // Public method
  greet() {
    return `Hello, ${this.name}`;
  }

  // Private method
  #hashPassword(password) {
    return `hashed_${password}`;
  }

  // Getter
  get displayName() {
    return this.name.toUpperCase();
  }

  // Setter
  set password(newPassword) {
    this.#password = this.#hashPassword(newPassword);
  }

  // Static method
  static create(id, name, password) {
    return new User(id, name, password);
  }
}

// Inheritance
class Admin extends User {
  constructor(id, name, password, role) {
    super(id, name, password);
    this.role = role;
  }

  greet() {
    return `${super.greet()}, I'm an admin`;
  }
}
```

## Modules (ES6)

```javascript
// Exporting
// math.js
export const PI = 3.14159;
export function add(a, b) {
  return a + b;
}
export class Calculator {
  // ...
}

// Default export
export default function multiply(a, b) {
  return a * b;
}

// Importing
// app.js
import multiply, { PI, add, Calculator } from './math.js';

// Rename imports
import { add as sum } from './math.js';

// Import all
import * as Math from './math.js';

// Dynamic imports
const module = await import('./math.js');
const { add } = await import('./math.js');

// Conditional loading
if (condition) {
  const module = await import('./feature.js');
  module.init();
}
```

## Iterators and Generators

```javascript
// Custom iterator
const range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    return {
      current: this.from,
      last: this.to,

      next() {
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

for (const num of range) {
  console.log(num);  // 1, 2, 3, 4, 5
}

// Generator function
function* rangeGenerator(from, to) {
  for (let i = from; i <= to; i++) {
    yield i;
  }
}

for (const num of rangeGenerator(1, 5)) {
  console.log(num);
}

// Infinite generator
function* fibonacci() {
  let [prev, curr] = [0, 1];
  while (true) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

// Async generator
async function* fetchPages(url) {
  let page = 1;
  while (true) {
    const response = await fetch(`${url}?page=${page}`);
    const data = await response.json();
    if (data.length === 0) break;
    yield data;
    page++;
  }
}

for await (const page of fetchPages('/api/users')) {
  console.log(page);
}
```

## Modern Operators

```javascript
// Optional chaining
const user = { name: 'John', address: { city: 'NYC' } };
const city = user?.address?.city;
const zipCode = user?.address?.zipCode;  // undefined

// Function call
const result = obj.method?.();

// Array access
const first = arr?.[0];

// Nullish coalescing
const value = null ?? 'default';      // 'default'
const value = undefined ?? 'default'; // 'default'
const value = 0 ?? 'default';         // 0 (not 'default')
const value = '' ?? 'default';        // '' (not 'default')

// Logical assignment
let a = null;
a ??= 'default';  // a = 'default'

let b = 5;
b ??= 10;  // b = 5 (unchanged)

let obj = { count: 0 };
obj.count ||= 1;  // obj.count = 1
obj.count &&= 2;  // obj.count = 2
```

## Performance Optimization

```javascript
// Debounce
function debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

const searchDebounced = debounce(search, 300);

// Throttle
function throttle(fn, limit) {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

const scrollThrottled = throttle(handleScroll, 100);

// Lazy evaluation
function* lazyMap(iterable, transform) {
  for (const item of iterable) {
    yield transform(item);
  }
}

// Use only what you need
const numbers = [1, 2, 3, 4, 5];
const doubled = lazyMap(numbers, x => x * 2);
const first = doubled.next().value;  // Only computes first value
```

## Best Practices

1. **Use const by default**: Only use let when reassignment is needed
2. **Prefer arrow functions**: Especially for callbacks
3. **Use template literals**: Instead of string concatenation
4. **Destructure objects and arrays**: For cleaner code
5. **Use async/await**: Instead of Promise chains
6. **Avoid mutating data**: Use spread operator and array methods
7. **Use optional chaining**: Prevent "Cannot read property of undefined"
8. **Use nullish coalescing**: For default values
9. **Prefer array methods**: Over traditional loops
10. **Use modules**: For better code organization
11. **Write pure functions**: Easier to test and reason about
12. **Use meaningful variable names**: Self-documenting code
13. **Keep functions small**: Single responsibility principle
14. **Handle errors properly**: Use try/catch with async/await
15. **Use strict mode**: `'use strict'` for better error catching

## Common Pitfalls

1. **this binding confusion**: Use arrow functions or bind()
2. **Async/await without error handling**: Always use try/catch
3. **Promise creation unnecessary**: Don't wrap already async functions
4. **Mutation of objects**: Use spread operator or Object.assign()
5. **Forgetting await**: Async functions return promises
6. **Blocking event loop**: Avoid synchronous operations
7. **Memory leaks**: Clean up event listeners and timers
8. **Not handling promise rejections**: Use catch() or try/catch

## Resources

- **MDN Web Docs**: https://developer.mozilla.org/en-US/docs/Web/JavaScript
- **JavaScript.info**: https://javascript.info/
- **You Don't Know JS**: https://github.com/getify/You-Dont-Know-JS
- **Eloquent JavaScript**: https://eloquentjavascript.net/
- **ES6 Features**: http://es6-features.org/
