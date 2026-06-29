# WATTMETER

**Field Instrument #045**
Building energy audit pad for Certified Energy Managers and Professional Engineers.

A single-file HTML application for screening-level energy audits, retrofit economics, code compliance checks, and standards navigation. Runs offline in any modern browser. No build step, no server, no accounts. All state persists to browser localStorage. Project files export and import as JSON for portability between devices and projects.

WATTMETER is part of the Field Instruments series, single-purpose tools for engineering, fabrication, and field work.

## Modules

Sixteen modules cover the workflow of a typical building energy audit:

1. **ABACUS**. Life-cycle economics: simple payback, NPV, IRR, discounted payback, savings-to-investment ratio. Cash-flow chart and annual table. Receives handoffs from BALLAST, ARMATURE, PEAK, WATERWORKS, COMBUSTION, and COMPRESSOR. The "+ Save to REGISTER" button snapshots the current ECM into the master ledger.
2. **BAROMETER**. Site and source EUI against CBECS 2018 medians by principal building activity, with climate-zone refinement. When a climate zone is set in the project header, the national median is adjusted by a per-building-type multiplier across five climate groups (hot, mixed, marine, cold, very cold). Heating-sensitive building types (education, religious, lodging) show larger cold-climate uplifts; process-dominated types (food service, hospitals, refrigerated warehouse) show smaller variation. Gauge visualization and energy mix breakdown.
3. **BELLOWS**. Degree-day estimator with a 52-city table spanning ASHRAE climate zones 1A through 8 (NOAA NCEI Climate Normals 1991-2020). Manual override supported.
4. **LEDGER**. 12-month utility bill table with paste-from-clipboard parser. Hands off aggregate consumption to BAROMETER.
5. **ENVELOPE**. Blower-door math: ACH50, NACH, equivalent leakage area, equivalent leakage area at 4 Pa. Code target comparison against IECC, PHIUS, Passive House Classic, and ASHRAE benchmarks by climate zone.
6. **PEAK**. Demand charges with ratchet clause modeling. Shed scenario calculator with all-month or peak-only modes. Hands off shed economics to ABACUS.
7. **BALLAST**. Lighting retrofit ROI with ASHRAE 90.1-2019 building-area-method LPD check. Per-fixture table with auto-totaling. Hands off retrofit package to ABACUS.
8. **ARMATURE**. Motor retrofit with NEMA Premium efficiency auto-fill. Six efficiency tables covering Open Drip-Proof (ODP) and Totally Enclosed Fan-Cooled (TEFC) enclosures across 2-pole (3600 rpm), 4-pole (1800 rpm), and 6-pole (1200 rpm) configurations, per NEMA MG 1-2016 Tables 12-11 and 12-12. Per-motor type selector. Hands off retrofit package to ABACUS.
9. **MANIFEST**. NEC Article 220 electrical service load calculation. Two methods: Standard Method (NEC 220 Part III) for all occupancies, and Optional Method for one-family dwellings (NEC 220.82). Standard method: seventeen occupancy types from NEC 220.12, demand factors from Table 220.42, continuous-load adjustment, largest-motor 125% adder. Optional method: 3 VA/sf lighting + receptacles, small-appliance and laundry branch circuits, appliance nameplates, 220.82(B) demand factor (100% to 10 kVA, 40% above). Voltage and phase configurable. Outputs connected load, calculated demand, and minimum service ampacity rounded to next standard size.
10. **CHAMBER**. Two-mode thermal load calculation. *Quick mode*: whole-building U-times-A with five envelope assemblies (walls, roof, floor, windows, doors), good for screening and ASHRAE Level 1 work. *Detailed mode*: per-room with shared project-level U-values and orientation-aware solar gains using peak Solar Heat Gain Factors for four cardinal orientations (N 38, E 195, S 110, W 195 Btu/hr-sf at ~40°N latitude). Per-room internal gains, infiltration distributed proportionally by area, per-room load breakdown and per-room results table. Pulls infiltration from ENVELOPE and lighting watts-per-square-foot from BALLAST. Includes a collapsible **DRYBULB psychrometric tool**: accepts any two of dry-bulb, wet-bulb, RH, dew point, or humidity ratio and computes the rest plus enthalpy, specific volume, and vapor pressure via ASHRAE Hyland-Wexler formulation. Elevation-corrected atmospheric pressure. Mixed-air calculator for outdoor + return air streams at user-set OA fraction with mass-fraction reporting for coil sizing.
11. **CODEX**. ASHRAE 90.1 plain-English topic navigator. Thirty-two topics across envelope, HVAC, service water heating, power, lighting, and other equipment. Edition selector for 2010, 2013, 2016, 2019, and 2022 with per-topic edition-delta notes describing how each edition differs from the 2019 baseline (LPD reductions, fenestration tightening, controls expansion, equipment efficiency tracking with DOE rules, etc.). Climate-zone-aware callouts highlight topics relevant to the active project. Section and table pointers only; no verbatim text reproduced.
12. **WATERWORKS**. Domestic water audit. Three sections on one pane: monthly water bills table (parallel to LEDGER) with effective $/kgal per month, fixture inventory with WaterSense retrofit ROI (toilets, urinals, lavatory and kitchen faucets, showers, pre-rinse spray valves, commercial dishwashers, clothes washers) including hot-water energy savings via configurable hot-water source (gas, electric, propane, fuel oil) and heater efficiency, and hot water recirculation analysis covering pump electric use, pipe heat loss at user-specified insulation R-value, and demand-control retrofit savings. Combined package (water + hot water energy + recirc) hands off to ABACUS as gallons + kWh + therms with rates applied internally.
13. **COMBUSTION**. Boiler and furnace efficiency audit using the Siegert dry-gas stack-loss formula. Per-unit cards with fuel selection (natural gas, fuel oil, propane, coal), nameplate ratings, operating hours and load fraction, field measurements (stack temperature, ambient, and either O2% or CO2% from a combustion analyzer), and condition assessment (jacket loss, cycles per hour). Computed components: dry-gas loss, moisture loss, jacket loss, short-cycling penalty, steady-state and net efficiency, excess air percentage, annual fuel saved versus a proposed retrofit efficiency. Per-unit results panel and aggregate readouts across all units. Retrofit package hands off to ABACUS in therm-equivalents.
14. **COMPRESSOR**. Compressed air system audit with three independent findings: leak load from the cycle-test method (loaded vs unloaded compressor duty fraction during a no-production test), pressure reduction at the DOE Compressed Air Challenge 1%-per-2-psi rule of thumb, and heat recovery for space heating or process water preheat. System baseline calculation from HP, motor efficiency, operating hours, and average load fraction. Aggregate readouts plus per-finding savings breakdown. Combined package (electricity + fuel offset) hands off to ABACUS.
15. **COMMISSIONING**. Functional Performance Test (FPT) scripting and witness recording. Library of ten pre-built test templates covering common cx scope: AHU economizer FPT, VAV box minimum/maximum airflow, boiler hot-water reset schedule, chilled water reset schedule, lighting occupancy sensors, daylight responsive controls, demand-controlled ventilation, programmable thermostat schedule, plug-load control, and energy recovery ventilation. Plus a custom template for site-specific tests. Each test carries 4-6 plain-English verification steps written from scratch (no verbatim text from ASHRAE Guideline 0 or 211), with per-step status (pending/pass/fail/n-a), actual-observation field, witness name and organization, test date, and free-text notes. Per-test overall status derives from step statuses. Aggregate dashboard tracks total scheduled, passed, failed, pending, and completion percentage. Witness records persist with the project JSON.
16. **REGISTER**. ECM master ledger and audit findings panel. Aggregates every retrofit measure into a single prioritized table: source module, name, priority (high/medium/low), status (recommended/deferred/rejected), investment, annual savings, kWh/therms/water saved, simple payback, NPV, IRR, and SIR. ECMs arrive in REGISTER via the "+ Save to REGISTER" button in ABACUS (snapshot of the current package) or via manual entry for O&M and other non-calculation findings. Sort by payback, NPV, investment, savings, name, or priority. Filter by status. Per-ECM narrative field for audit report text. Findings table renders at the bottom of the pane in a print-ready format. Portfolio aggregates compute total investment, total annual savings, dollar-weighted blended payback, sum-of-NPV, total energy savings in MMBtu, and counts by status. The deliverable that ties the rest of the audit pad together.

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

## Field readiness (mobile and tablet)

WATTMETER is built mobile-first as of v0.20.0 and is usable on phones and tablets in the field. Three breakpoints address narrow viewports: 768 px (tablet portrait), 540 px (phone landscape and below), and 380 px (narrow phones such as iPhone SE). The module switcher converts from a grid of tiles to a horizontal scrolling strip with snap-to-tile behavior on phones; tapping a module also scrolls the active tile into view. Two-column input rows collapse to single-column with the label above the input. Meter readout grids reduce from a six-across desk layout to two-across on tablets and one-across on phones. Wide tables (utility bills, findings table, cashflow) remain horizontally scrollable inside their containers.

Touch targets harden to a minimum 44x44 px on any pointer-coarse device. Form inputs use a 16 px font on touch devices to prevent iOS Safari auto-zoom on focus. The `apple-mobile-web-app-capable` and `theme-color` meta tags ensure the page renders cleanly when saved to a phone home screen and that the browser URL bar matches the instrument theme.

The single-file HTML deployment is preserved in this phase. Saving the page to a phone home screen via the browser's built-in Add to Home Screen function gives a standalone-looking icon, but installation as a proper Progressive Web App (with offline service worker and installable manifest) requires the multi-file deployment described under future work.

## Photo attachments

As of v0.21.0, REGISTER ECMs and COMMISSIONING tests support photo attachments. Each card carries an Add Photo button that opens the device file picker with the camera-capture hint enabled, so on a phone the native camera launches directly; on a desktop the standard file picker opens for selection of existing images. Multi-select is supported. Captured photos are stored as Blob records in IndexedDB rather than localStorage because localStorage caps at roughly 5-10 MB across browsers while a typical audit photo can be 2-5 MB; IndexedDB allows essentially unlimited capacity (gigabytes on most browsers with persistent storage).

Photo thumbnails generate client-side via canvas at 240 px maximum dimension and 78% JPEG quality, sufficient for inline preview without re-decoding the full blob. Tap any thumbnail to open the lightbox modal, which shows the full-size image with caption editing (auto-saved as you type), file metadata, a download button to save the original to disk, and a remove button. Removing an ECM or a test from the project automatically removes its associated photos from IndexedDB.

The textarea export shows structured-only JSON (no photos) so quick copy/paste handoffs remain fast and human-readable. When photos exist, a "Download full bundle" button appears in the export modal; clicking it serializes every referenced photo as base64 inside the JSON under a `_photos` key and downloads the whole package as a `.wattmeter.json` file. Import auto-detects the `_photos` array, decodes each entry back to a Blob, writes it to IndexedDB under its original ID, and restores the references. The import modal also accepts file uploads directly.

Storage diagnostics in the IO modal show current IndexedDB usage and quota for the WATTMETER origin. Photo EXIF metadata (including GPS coordinates from the capture device) is preserved as-is for evidentiary purposes; if you share a project bundle externally, be aware that location and timestamp data is embedded in the JPEG files.

## Audit deliverables

WATTMETER produces two distinct audit deliverables as of v0.23.0, in addition to the per-module Print/PDF that has been available since the early phases.

### ASHRAE Standard 211 Audit Report

The Audit Report button in the top bar opens a new browser tab containing a structured HTML deliverable arranged according to the section sequence prescribed by ASHRAE Standard 211 for commercial building energy audits. The structure follows the Level 2 deliverable convention:

1. Cover page with project name, address, building type, area, audit date, auditor name and license, organization, and report generation timestamp
2. Table of contents
3. Executive summary with portfolio aggregates (total investment, annual savings, blended payback, NPV, MMBtu saved, current EUI)
4. Building description (project header data as a key-value table)
5. Historical energy use (annual totals plus monthly bill detail from LEDGER)
6. Energy use analysis and benchmarking (site and source EUI, with the reader directed to the BAROMETER module for the climate-zone-adjusted CBECS comparison)
7. Audit findings (ECMs sorted by simple payback with full per-ECM detail blocks including narrative)
8. Commissioning activities (FPT pass/fail table with witness records, only included if COMMISSIONING has tests)
9. Recommendations and implementation plan (ordered list of recommended ECMs with capital and savings)
10. Appendix: methodology and disclaimers (calculation references for each module, plus the screening-level scope statement)

The report is self-contained HTML with inline CSS, ready to be printed to PDF using the browser's Print function (a "Print / Save as PDF" button in the report toolbar invokes this directly). The report inherits no styling from the WATTMETER instrument theme; it uses a clean serif body face with sans-serif headers, brass-toned section dividers, and white background suitable for printing or sharing.

The output is informed by the structure of ASHRAE Standard 211 but is not a formally compliant audit submission. The disclaimer in the appendix states this explicitly. For compliance, permitting, utility incentive submissions, or investment-grade decision making, the report should be reviewed and stamped by a qualified practitioner per the authority having jurisdiction.

### BuildingSync XML Export

In the Export modal, the "Download BuildingSync XML" button emits a BuildingSync v2.5-flavored XML file mapping WATTMETER project data to the standardized schema. The export covers:

- Site address (StreetAddress, City, State, PostalCode under the Simplified address form)
- Building general information (PremisesName, OccupancyClassification mapped from building type, FloorAreas with Gross type, YearOfConstruction, ScheduledHoursPerWeek)
- ASHRAE climate zone
- A Current Building scenario with ResourceUses for electricity, natural gas, and water based on annual bill totals from LEDGER (AnnualFuelUseNativeUnits, AnnualFuelUseConsistentUnits, AnnualFuelCost)
- Audit metadata (AuditDate, AuditFilingStatus, AuditLevel)
- Auditor contact when present (Contact with Energy Auditor role, name, company)
- Measures from REGISTER with SystemCategoryAffected and TechnologyCategory derived from the source module (BALLAST to LightingImprovements, ARMATURE to MotorsAndDrives, COMBUSTION to BoilerPlantImprovements, COMPRESSOR to OtherElectricMotorsAndDrives, WATERWORKS to WaterAndSewerConservationSystems), MeasureSavingsAnalysis with AnnualSavingsByFuels for each affected energy resource, AnnualSavingsCost, MeasureTotalFirstCost, SimplePayback, NPV, IRR, SIR, UsefulLife, DiscountRate, and ImplementationStatus mapped from the REGISTER status (recommended to "Recommended", deferred to "Proposed", rejected to "Discarded")

The file is downloaded as `<project-name>-<date>.bsync.xml` ready for handoff to BuildingSync-aware consumers including ENERGY STAR Portfolio Manager, federal audit databases, OpenStudio workflows, and the DOE BuildingSync Validator.

This is a partial export covering only the data WATTMETER tracks. It is not formally validated against the BuildingSync XSD at export time. Consumers performing strict schema validation may require additional elements that WATTMETER does not collect (specific HVAC system inventory, occupancy schedules at sub-building granularity, premises descriptions for sub-spaces). For institutional submissions, validate the file against the published BuildingSync XSD and add missing elements as required. The XML structure, namespaces, and TechnologyCategory enumerated values follow the BuildingSync v2.5 schema publication by DOE/NREL.

## Keyboard shortcuts

- **Ctrl/Cmd-Enter** runs the compute on the active module.
- **Escape** closes any open modal (Import/Export, Theme picker).

## Honest scope notes

WATTMETER is screening-level engineering software. It is appropriate for ASHRAE Level 1 and Level 2 audit work, preliminary retrofit economics, and standards navigation. It is not appropriate for design calculations submitted for permitting, energy modeling baselines, or compliance certifications without independent verification.

Specific scope limitations to be aware of:

- **CBECS 2018 EUI medians** in BAROMETER are national values per principal building activity, with climate-zone refinement via per-type multipliers across five climate groups. The multipliers are illustrative values derived from CBECS Census-Region patterns; for ENERGY STAR Portfolio Manager target ratings or compliance benchmarking, use the published CBECS tables and Portfolio Manager directly. Census-division-specific values from CBECS 2018 detailed tables are deferred to v0.3.
- **CHAMBER thermal loads** offer two modes. Quick mode is whole-building U-times-A. Detailed mode is per-room with cardinal-orientation solar gains (N/E/S/W). Eight-direction orientation (NE/SE/SW/NW), skylights, time-of-day CLTD/CLF tables, per-room infiltration overrides, and per-assembly U-value overrides are deferred to v0.3 or later. For design and permitting, use Manual J 8th edition or RTS method with proper CLTD/CLF tables.
- **CODEX** is a navigator. It provides section and table pointers, plain-English topic summaries, and edition-delta notes describing how non-2019 editions differ from the 2019 baseline. Specific values cited as "approximate" or "typical" are illustrative ranges, not the published requirements. Edition-delta notes describe the direction and approximate magnitude of changes (LPDs trending down across editions, fenestration U-factors trending down, etc.) and are intended for orientation, not compliance. For permitting, code submittal, energy modeling baselines, or design compliance, consult the actual published edition of ASHRAE Standard 90.1 from ashrae.org.
- **MANIFEST** implements NEC 220 Standard Method (Part III) and Optional Method for one-family dwellings (220.82). NEC 220.84 multi-family optional method is deferred to v0.3.
- **NEMA Premium efficiency tables** in ARMATURE include TEFC and ODP enclosures across 2-, 4-, and 6-pole configurations, sourced from NEMA MG 1-2016 Tables 12-11 and 12-12. Explosion-proof and definite-purpose motor classes not included. For compliance, consult the published NEMA standard and federal DOE 10 CFR 431 efficiency requirements.
- **Climate zone design temperatures** in CHAMBER are representative values for typical cities in each ASHRAE Standard 169 zone. Site-specific values from ASHRAE Handbook of Fundamentals should be used for engineering work.
- **NEC lighting VA per square foot** in MANIFEST reflects the values stable across 2017, 2020, and 2023 NEC editions for the seventeen included occupancies. Less-common occupancies and the optional method are deferred.
- **COMBUSTION efficiency** uses the Siegert formula with established fuel-specific coefficients for dry-gas stack loss, and treats the moisture loss as a fixed non-condensing-mode percentage of input (about 11% for natural gas, 7% for fuel oil, 9% for propane). The model does not credit latent heat recovery in condensing operation, since field combustion-analyzer measurements typically reflect dry-basis steady-state. For condensing equipment with stack temperatures below the flue gas dewpoint (~130°F for natural gas), reported measured efficiency may be conservative; the retrofit comparison against a proposed condensing efficiency target accounts for the recoverable latent heat in the proposed-side number. WATTMETER's COMBUSTION is suitable for walk-through audit and retrofit prioritization; for combustion equipment commissioning or compliance verification, use a calibrated combustion analyzer with manufacturer-rated input procedures.
- **COMPRESSOR audit findings** assume load-unload control behavior as the baseline (leak load drives full-load equivalent power for the duty-fraction time period). For modulating-control compressors the model slightly understates leak savings; for variable-speed-drive compressors the model slightly overstates because VSD systems track demand more efficiently. The pressure reduction calculation uses the DOE Compressed Air Challenge rule of approximately 1% energy reduction per 2 psi system pressure reduction, which is a conservative average across compressor types and operating points. The leak-fix assumption is 50% of identified leaks repaired (typical achievable in a single survey-and-repair cycle). Heat recovery effectiveness is application-dependent and user-supplied. For detailed compressed air system optimization (sequencing of multiple compressors, storage sizing, distribution piping pressure drop analysis), consult a Compressed Air Challenge certified specialist.
- **COMMISSIONING test templates** carry original-writing FPT step scripts that describe in plain English what the cx agent should verify. They are starting points: the user edits step text, expected values, and observations to match site-specific design intent and the project's basis of design. The templates do not reproduce any verbatim text from ASHRAE Guideline 0, Guideline 1.1, Standard 90.1, Standard 211, or any other published standard. For formal commissioning deliverables (basis of design verification, owner's project requirements alignment, systems manual, training records, and final commissioning report), follow ASHRAE Guideline 0 procedurally and consult a commissioning authority qualified per the project's contract. WATTMETER's COMMISSIONING is appropriate for retro-commissioning surveys, existing-building cx walkthrough, and as a workspace for drafting site-specific FPTs.
- **ASHRAE 211 audit report** structure follows the Level 2 deliverable section sequence. The report content (calculations, narratives, recommendations) reflects WATTMETER's screening-level engineering. The document is a workspace deliverable, not a stamped audit submission. For binding work, a registered PE or qualified energy auditor must review and stamp the report. The disclaimer in the report appendix states this explicitly.
- **BuildingSync XML export** is a partial mapping covering the data WATTMETER tracks: building general info, utility resource uses from LEDGER, ECM measures from REGISTER, audit metadata, and auditor contact. Element names and TechnologyCategory enumerated values follow the BuildingSync v2.5 schema, but the file is not validated against the XSD at export time. Institutional consumers (ENERGY STAR Portfolio Manager, federal audit databases) that require strict schema conformance may need additional elements WATTMETER does not collect; users should validate against the published XSD and add missing elements before submission.

For any compliance or permitting work, final calculations must be reviewed by a registered Professional Engineer or licensed practitioner per the authority having jurisdiction.

## Installation

WATTMETER has two supported deployment modes as of v0.22.0.

### Single-file mode (standalone)

Save `wattmeter.html` anywhere on disk and open it directly in a modern browser (Chrome, Firefox, Safari, Edge) via `file://`. All assets are embedded in the file. State persists in browser localStorage; photos persist in IndexedDB. No network required after the page loads (Google Fonts are the only external resource and are cached aggressively by the browser).

This mode is sufficient for desk work, single-user audits, and quick sharing of the tool. The browser's Add to Home Screen function still works on mobile and gives a standalone-looking shortcut, but PWA install per se is unavailable from `file://`.

### PWA bundle mode (installable, offline-first)

Deploy the complete bundle to a single HTTPS origin (e.g., `https://greenshoegarage.com/wattmeter/`). The bundle:

- `wattmeter.html`
- `manifest.json`
- `sw.js`
- `icon-192.png`
- `icon-512.png`
- `icon-512-maskable.png`
- `icon-180.png`

When the page loads at the HTTPS URL, the service worker registers and precaches the app shell. After first visit, WATTMETER works fully offline including on cold starts. The browser exposes Install/Add to Home Screen prompts; on iOS use Safari's Share menu, on Android use Chrome's Install App option, on desktop Chrome the install icon appears in the address bar.

The service worker uses cache-first for the precached shell and falls back to network for any uncached asset. The cache version string in `sw.js` is tied to the WATTMETER version; bumping it on a new release triggers the standard SW update flow, and the page shows a discreet "Update available" banner with an Update Now button. Users dismiss the banner if they want to defer; the next page reload picks up the new version automatically.

The two modes share the same `wattmeter.html` file. The service worker registration code feature-detects and silently skips when running under `file://` (which can't register service workers), so a single shipped HTML works for both deployments.

## Build status

Version 0.23.0.
Sixteen of sixteen modules active. Eight themes registered. Print mode polished. Mobile-first layout pass complete. IndexedDB photo attachments shipping. PWA install supported. ASHRAE 211 report and BuildingSync XML export available. v0.23.0 adds Phase 22: institutional handoff. A new Audit Report button in the top bar generates a self-contained HTML deliverable structured according to ASHRAE Standard 211 Level 2 (cover, executive summary, building description, historical energy use, EUI benchmarking, ECM findings, commissioning activities, recommendations, methodology appendix, disclaimer); the report opens in a new tab with print-to-PDF tooling. The Export modal also exposes a Download BuildingSync XML button that emits a BuildingSync v2.5-flavored XML file covering building info, resource uses from LEDGER bills, ECM measures from REGISTER with TechnologyCategory mapping, audit metadata, and auditor contact. v0.22.0 added the PWA package (manifest, service worker, install). v0.21.0 added IndexedDB photo attachments. v0.20.0 added the mobile-first layout pass. v0.19.0 added REGISTER (ECM master ledger). v0.18.0 added COMMISSIONING (FPT scripting). v0.17.0 added DRYBULB psychrometric tool inside CHAMBER. v0.16.0 added COMPRESSOR (compressed air audit). v0.15.0 added COMBUSTION (boiler and furnace Siegert-formula efficiency analysis). v0.14.0 added WATERWORKS (domestic water audit). The v0.2 deferred-item cycle (Phases 9-12, v0.10.0 through v0.13.0) completed before this: MANIFEST Optional Method, ARMATURE expanded NEMA Premium across enclosures and pole counts, CHAMBER per-room detailed mode with orientation-aware solar gains, BAROMETER climate-zone-refined CBECS benchmarks, and CODEX edition-delta notes across all 32 topics.

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
