# Open decision: how device management is scoped

Two drafts of the same parent training exist. **Only one will be published.**

| | Option A | Option B |
|---|---|---|
| Page | [`lightspeed-mdm/`](lightspeed-mdm/) | [`lightspeed-mdm-time-only/`](lightspeed-mdm-time-only/) |
| Managed when | School hours **and** on the AISA network | School hours, **any** network |
| Managed situations | 1 of 4 | 2 of 4 |
| Easiest to reassure parents | ✅ | Harder — reaches into the home during school hours |
| Covers field trips and off-site activities | ❌ No school network | ✅ |
| Survives a switch to mobile data on site | ❌ | ✅ |
| Privacy footprint | Lighter | Heavier |

Both carry a draft banner and inline flags. Neither is publishable until the IT
team works through [`lightspeed-mdm/FACT-CHECK.md`](lightspeed-mdm/FACT-CHECK.md)
— it applies to both.

## Why this is not just a technical preference

Three published ADEK policies bear on the choice. Quoted clauses, so they can be
checked rather than taken on trust:

- **ADEK School Digital Policy 4.1.2** requires rules on the use of personal
  devices "on the school network and school premises, **and during
  extracurricular activities that take place outside school (e.g., field
  trips)**." A control that depends on the school network does not reach a field
  trip.
- **Digital Policy 4.2.2(b)** requires "appropriate filtering and monitoring
  systems to monitor student internet use **on school devices and systems**."
- **Digital Policy 4.3** requires that digital incidents occurring "during school
  hours or in settings covered in schools' digital policies" be recorded,
  documented and signed by the Principal. An incident the system never saw cannot
  be evidenced.
- **Digital Policy 4.4** requires schools to "**require parents to monitor**
  students' usage of digital devices outside of school premises and school
  hours." Both options leave evenings and weekends to parents, which is
  consistent with this — and it is a good line to use with parents.
- **Digital Policy 5.1** requires that a school running BYOD "define and
  implement digital safety precautions (e.g., minimum device specification, and
  antivirus requirements)." Note that a management profile is **not** named as a
  requirement — it is a school choice, which matters for how consent and any
  opt-out are handled.
- **Digital Policy 4.1.7(g)** requires responsible usage policies to be published
  "on the school website and in the Parent Handbook." The Parent Hub is a
  reasonable vehicle for that, and **4.1.7(a)** requires an age-appropriate
  student version up to Grade 6/Year 7 alongside the full parent version.

A fuller risk comparison, including the implications of ADEK's draft AI &
Technology Policy, has been prepared separately for the leadership and IT teams.
**That draft is marked confidential and must not be quoted to parents or added to
this repository, which is public.**

## Before either goes live

1. IT completes `FACT-CHECK.md`.
2. Leadership picks A or B, and the losing draft folder is deleted.
3. The draft banner and every `.confirm` wrapper come out of the surviving page.
4. Legal or DPO review of the privacy position — heavier for Option B.
