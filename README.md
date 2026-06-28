# WATTMETER

**Field Instrument #045**
Building energy audit pad for Certified Energy Managers and Professional Engineers.

A single-file HTML application for screening-level energy audits, retrofit economics, code compliance checks, and standards navigation. Runs offline in any modern browser. No build step, no server, no accounts. All state persists to browser localStorage. Project files export and import as JSON for portability between devices and projects.

WATTMETER is part of the Field Instruments series, single-purpose tools for engineering, fabrication, and field work.

## Modules

Eleven modules cover the workflow of a typical building energy audit:

1. **ABACUS**. Life-cycle economics: simple payback, NPV, IRR, discounted payback, savings-to-investment ratio. Cash-flow chart and annual table. Receives handoffs from BALLAST, ARMATURE, and PEAK.
2. **BAROMETER**. Site and source EUI against CBECS 2018 medians by principal building activity. Gauge visualization and energy mix breakdown.
3. **BELLOWS**. Degree-day estimator with a 52-city table spanning ASHRAE climate zones 1A through 8 (NOAA NCEI Climate Normals 1991-2020). Manual override supported.
4. **LEDGER**. 12-month utility bill table with paste-from-clipboard parser. Hands off aggregate consumption to BAROMETER.
5. **ENVELOPE**. Blower-door math: ACH50, NACH, equivalent leakage area, equivalent leakage area at 4 Pa. Code target comparison against IECC, PHIUS, Passive House Classic, and ASHRAE benchmarks by climate zone.
6. **PEAK**. Demand charges with ratchet clause modeling. Shed scenario calculator with all-month or peak-only modes. Hands off shed economics to ABACUS.
7. **BALLAST**. Lighting retrofit ROI with ASHRAE 90.1-2019 building-area-method LPD check. Per-fixture table with auto-totaling. Hands off retrofit package to ABACUS.
8. **ARMATURE**. Motor retrofit with NEMA Premium efficiency auto-fill (NEMA MG 1-2016 TEFC table). Per-motor table. Hands off package to ABACUS.
9. **MANIFEST**. NEC Article 220 standard-method service load calculation. Seventeen occupancy types from NEC 220.12, demand factors from Table 220.42, continuous-load adjustment, largest-motor 125% adder, voltage and phase configurable. Outputs connected load, calculated demand, and minimum service ampacity rounded to next standard size.
10. **CHAMBER**. Simplified whole-building thermal load using envelope U-times-A method. Climate-zone-defaulted design temperatures across 17 ASHRAE zones. Heating and cooling load with conduction, infiltration, solar, and internal gain components. Pulls infiltration from ENVELOPE and lighting watts-per-square-foot from BALLAST.
11. **CODEX**. ASHRAE 90.1 plain-English topic navigator. Thirty-two topics across envelope, HVAC, service water heating, power, lighting, and other equipment. Edition selector for 2010, 2013, 2016, 2019, and 2022. Climate-zone-aware callouts highlight topics relevant to the active project. Section and table pointers only; no verbatim text reproduced.

## Project state and portability

WATTMETER persists project state to browser localStorage under the key `wattmeter.project` with schema version `wattmeter/project@1`. Theme preference is stored independently under `wattmeter.theme` so theme travels with the device, not the project.

Use **Export** to download project JSON. Use **Import** to load. Use **New Project** to start fresh. Use **Duplicate as Template** to clone the current project header into a new project for repeated audits of similar buildings.

## Themes

Eight themes, all CSS-variable-based, accessible from the Theme button in the top bar:

- **Panel** (default). Vintage instrument enamel and brass on ivory paper.
- **Daylight**. Audit pad under workbench daylight, cream paper.
- **Carbon**. Phosphor green on deep black, CRT terminal.
- **Blueline**. Engineering blueprint, cyan-white on deep blue.
- **Foundry**. Oxidized iron and copper, weathered industrial.
- **Herbarium**. Naturalist field notebook, mossy and cream.
- **Letterpress**. Ink on cream paper, print shop type.
- **Schematic**. PCB green soldermask with gold pads and white silkscreen.

Theme is independent of project. Print and PDF export always use a clean black-on-white style regardless of selected screen theme.

## Print and PDF export

Click **Print / PDF** in the top bar. Each module renders on its own page with a cover sheet, project header on page 2, then modules in sequence. CODEX, BELLOWS reference comparisons, and ARMATURE NEMA reference tables are excluded from print as they are reference material, not project-specific deliverables.

Inputs render as form data (label/value pairs without input chrome). Buttons, add/remove controls, and theme picker are hidden in print. Tables maintain borders and pagination. Charts render as inline SVG at print resolution.

## Keyboard shortcuts

- **Ctrl/Cmd-Enter** runs the compute on the active module.
- **Escape** closes any open modal (Import/Export, Theme picker).

## Honest scope notes

WATTMETER is screening-level engineering software. It is appropriate for ASHRAE Level 1 and Level 2 audit work, preliminary retrofit economics, and standards navigation. It is not appropriate for design calculations submitted for permitting, energy modeling baselines, or compliance certifications without independent verification.

Specific scope limitations to be aware of:

- **CBECS 2018 EUI medians** in BAROMETER are national values per principal building activity. PUMS-style climate-zone refinement is deferred to v0.2.
- **CHAMBER thermal loads** are whole-building U-times-A only. Per-room Manual J, orientation-aware solar gains, and proper CLTD use are deferred to v0.2.
- **CODEX** is a navigator. It provides section and table pointers and plain-English summaries. Specific values cited as "approximate" or "typical" are illustrative ranges, not the published requirements. For permitting, code submittal, energy modeling baselines, or design compliance, consult the actual published edition of ASHRAE Standard 90.1 from ashrae.org. Edition-specific value deltas are tracked at the topic level and will be populated in v0.2.
- **MANIFEST** implements NEC 220 standard method only. NEC 220 optional method for dwelling-only buildings is deferred to v0.2.
- **NEMA Premium efficiency table** in ARMATURE is the TEFC enclosure values from NEMA MG 1-2016. ODP and explosion-proof tables not included.
- **Climate zone design temperatures** in CHAMBER are representative values for typical cities in each ASHRAE Standard 169 zone. Site-specific values from ASHRAE Handbook of Fundamentals should be used for engineering work.
- **NEC lighting VA per square foot** in MANIFEST reflects the values stable across 2017, 2020, and 2023 NEC editions for the seventeen included occupancies. Less-common occupancies and the optional method are deferred.

For any compliance or permitting work, final calculations must be reviewed by a registered Professional Engineer or licensed practitioner per the authority having jurisdiction.

## Installation

No installation required. Save `wattmeter.html` anywhere on disk and open it in a modern browser (Chrome, Firefox, Safari, Edge). All assets are embedded in the single file.

For offline-first deployment on a field tablet, save the file and pin it to the home screen. The browser will treat it as a local app.

## Build status

Version 0.9.0 (ship-ready).
Eleven of eleven modules active. Eight themes registered. Print mode polished.

## Built with

- HTML, CSS custom properties, vanilla JavaScript (no frameworks)
- Fraunces, Oswald, Inter, JetBrains Mono (Google Fonts)
- SVG for all charts and gauges (no external chart libraries)
- localStorage for state persistence
- No external dependencies, no network calls, no telemetry

## License

GPL-3.0

WATTMETER is part of the Field Instruments series by M.B. Parks (Green Shoe Garage, Cumberland, Maryland).

Copyright (C) 2026 M.B. Parks.

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, version 3.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see the standard GPL-3.0 license text from the Free Software Foundation.
