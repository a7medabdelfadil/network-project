# Software Reliability & Testing – Presentation Slides

---

## Slide 1 – Boundary Testing
**What it is**  
Boundary testing focuses on testing the *edges* of valid input and system states where failures are most likely.

**Why it matters**  
Most bugs appear at limits (empty values, missing elements, min/max values).

**Applied in this project**  
- Checked if DOM elements exist before using them (`filters`, `works`, `burger`, `slider`).  
- Handled missing `data-category`.  
- Normalized text input (`trim + lowercase`).

**Example boundary cases**  
- No filter buttons exist.  
- A work item has no category.  
- Button text is empty or contains spaces.

---

## Slide 2 – Robustness
**What it is**  
Robustness means the system continues to work correctly even with unexpected or invalid inputs.

**Why it matters**  
Real users and real browsers rarely behave perfectly.

**Applied in this project**  
- Defensive checks (`if (!element) return`).  
- Safe DOM operations (`safeAddClass`, `safeRemoveClass`).  
- Avoided assumptions about HTML structure.

**Result**  
The UI does not crash when the DOM structure changes slightly.

---

## Slide 3 – Worst Case Scenario
**What it is**  
Testing system behavior under extreme or abnormal usage.

**Worst cases considered**  
- Rapid clicking (spam clicks).  
- Multiple animations triggered at once.  
- User interactions faster than UI updates.

**Applied in this project**  
- Cleared previous `setTimeout` before creating a new one.  
- Used simple, idempotent UI state changes (`toggle`, `remove`).

**Result**  
UI remains stable even under aggressive user interaction.

---

## Slide 4 – Unit Testing (Jest)
**What it is**  
Unit testing verifies individual units (functions) in isolation.

**Why Jest**  
- Industry standard.  
- Supports JSDOM for frontend testing.

**Applied in this project**  
- Extracted pure functions (`normalize`, `shouldShowWork`, `getTranslateX`).  
- Tested boundary values and expected behavior.  
- Tested sidebar and menu behavior using JSDOM.

**Result**  
Core logic is verified automatically and repeatedly.

---

## Slide 5 – Cyclomatic Complexity & Decision Table
**Cyclomatic Complexity**  
Measures the number of independent execution paths in code.

**Example (Filter Logic)**  
- One main decision (`if / else`).  
- Cyclomatic Complexity = 2 (low, easy to maintain).

**Decision Table (Filtering)**
| Selected Category | Work Category | Show Item |
|------------------|--------------|-----------|
| All              | Any          | Yes       |
| Web              | Web          | Yes       |
| Web              | Mobile       | No        |
| Empty            | Any          | Yes       |

**Benefit**  
Clear logic, easy validation, low maintenance cost.

---

## Slide 6 – Availability and Reliability
**Availability**  
System is accessible and usable when needed.

**Reliability**  
System behaves correctly over time without failures.

**Applied in this project**  
- Page continues working even if a feature is missing.  
- Failure in one module does not break others.

**Limitation**  
No backend → availability focuses on frontend behavior only.

---

## Slide 7 – Reliability Requirements
**Definition**  
Explicit conditions that define correct system behavior.

**Defined requirements**  
- Clicking burger toggles menu state correctly.  
- Clicking sidebar link always closes menu.  
- Only one slider dot can be active at a time.  
- Filtering never hides all items by mistake.

**Verification**  
Requirements validated through unit tests and manual tests.

---

## Slide 8 – Fault-Tolerant Architecture
**What it is**  
Design that prevents a single failure from crashing the system.

**Applied in this project**  
- Global error handling (`window.onerror`).  
- Graceful failure when elements are missing.  
- Errors are logged, not fatal.

**Result**  
System degrades gracefully instead of crashing.

---

## Slide 9 – Programming for Reliability
**Principles used**  
- Defensive programming.  
- Separation of concerns.  
- Avoid reliance on fragile DOM assumptions.

**Applied practices**  
- Pure functions for logic.  
- Clear function responsibilities.  
- Modular file structure.

**Outcome**  
Readable, maintainable, and reliable codebase.

---

## Slide 10 – Reliability Measurement
**What it is**  
Measuring how reliable the system actually is.

**Metrics used**  
- Error counter (number of runtime errors).  
- Execution time measurement (`performance.now`).

**Why it matters**  
You cannot improve what you do not measure.

**Result**  
Basic but effective insight into system stability.

---

## Final Slide – Conclusion
- Reliability concepts were applied both in code and design.  
- System handles edge cases, errors, and stress safely.  
- Code is testable, maintainable, and presentation-ready.

**This project demonstrates practical software reliability in a frontend system.**

