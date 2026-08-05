# weslley.io Security Charter

## Principles

### I. Secrets and private data never enter the repository or the published site

Never commit a secret, a real token, or a private file. Always load secrets from the environment or from the platform's secret store. Only values meant for the whole world go into the site's build, and every other value MUST stay on the server side.

- Why: this site is built once and served as plain files, so anything the build carries is readable by every visitor, not just by the person who put it there. A repository is public and its history is permanent, so a token committed once stays reachable even after it is deleted, and a leaked token is enough to change the site, wipe the stored counts, or run up a bill on the account behind it.

### II. Privileged routes always require proof of authority

Never let an operation that creates, changes, exports, or deletes stored data run on request alone. Always require the caller to prove it holds the administrative token first, and always reject the request when that proof is missing or wrong. Only reading a public count may happen without it.

- Why: the counter service is on the open internet, where anyone can send it a request. Without a check on who is asking, a stranger can invent counters, download a copy of the stored data, or delete it. The difference between a public read and a destructive write is the check itself, not the fact that the route is undocumented.

### III. The public counter stays rate-limited and returns only counts

Always keep a limit on how fast a single caller can hit the public routes. Never let those routes return more than the number a page needs to show.

- Why: an open endpoint with no limit is free to hammer, which runs up cost, distorts the numbers, and can take the service down for everyone. An endpoint that answers with more than it was asked for turns a harmless counter into a way to read the rest of the stored data.

### IV. Data from outside the project is untrusted until it is checked

Always treat data fetched from another service or returned by the API as untrusted. Check its shape before using it, and never place it into the page in a way that lets it act as code or markup.

- Why: the site pulls project statistics from a third party it does not control. If that service is compromised or simply changes what it returns, whatever it sends arrives with the site's own authority. Data that is allowed to become code is how a visitor's browser ends up running someone else's script.

### V. Links to other sites always open with noopener and noreferrer

Never link out to another site without both `noopener` and `noreferrer`. Always route external links through the component that already applies them.

- Why: without these, the page being opened gets a handle back to the tab it came from and can quietly redirect it to a convincing fake, and the visitor's exact reading location is handed to the destination. Both are free to prevent and awkward to undo.

### VI. Workflows triggered by outside contributions never receive secrets

Never expose deployment secrets to an automated job that runs on a pull request or on any other outsider-triggered event. Always keep publishing and cache-purging secrets on the workflows that only run from the project's own branch.

- Why: this repository is public and accepts contributions, and a pull request can change the very code the automation runs. If that job holds the deployment token, a contribution is all it takes to read the token and publish to the live domain.

### VII. Dependencies are installed from the lockfile and added only for a reason

Always install from the committed lockfile so every build uses the exact versions that were reviewed. Never add a dependency without a reason that outweighs the risk of trusting it, and always remove the ones no longer used.

- Why: the build runs its dependencies' code on a machine that holds the deployment secrets, so a compromised package is a compromised deployment and a compromised site. An unpinned or unused dependency widens that trust for nothing in return.

### VIII. The template stays safe for anyone who copies it

Never ship a real credential, a personal endpoint, or a placeholder that looks configured but is not. Always make the default behavior the safe one, so a copy that changes nothing is still safe.

- Why: this project is published as a template and is meant to be forked. An unsafe default is not one mistake, it is repeated in every copy by people who reasonably trust that the defaults were considered, and who will never read the code that made the decision.

## Baseline discipline

Lagune holds this charter, every principle, every time. A principle is not suspended because a control looks small, familiar, or unlikely to be hit. This is not a judgement call.

### Only the controls the project needs

Lagune recommends and applies only the controls this project's context calls for. A control the project does not need is never added for completeness, and a generic checklist is not thoroughness. Every later phase acts on what the system actually does, never on what it might hypothetically do.

- Why: effort spent on risks the project does not have buries the risks it does have. Fewer, right-sized controls are easier to apply, prove, and keep true than a checklist no one finishes.

### Prefer the simplest vetted control

When a control is needed, reach for the safest option already proven, in order: a control this project already has, then a platform or framework built-in, then a well-maintained vetted library, and only then custom code. Never hand-roll a security primitive (cryptography, escaping, authentication, sessions) that a vetted standard already provides. A new dependency is new attack surface, justified and not assumed. Code, an endpoint, or a feature the project does not use is attack surface too, so removing it is itself a control.

- Why: hand-rolled security is where subtle, unaudited bugs live, and a second control duplicating an existing one is the one that gets forgotten and drifts. Boring, standard controls are easier to audit and harder to get wrong, and less surface is less to defend.

### When a control seems skippable

A control is held even when a reason to skip it feels reasonable:

- "Too small to need a control": small gaps are where breaches start.
- "Already handled elsewhere": assumed coverage is exactly how gaps hide.
- "Unlikely to be hit": attackers target the path no one is watching.
- "It works, ship it": working and safe are different claims, and the charter requires both.

## Governance

This charter outranks convenience, habit, and any decision made in the moment. When a change would break a principle, the change gives way, not the principle.

Any change to the code, the deployment, or the dependencies is measured against these principles before it ships. A principle that cannot be met is a blocker to raise, never a step to skip quietly.

The charter is amended, never appended. When the project takes on something new (it starts collecting information from visitors, it gains accounts, it handles payments) a principle is added. When something is removed from the project, its principle is removed with it, because a rule about a part that no longer exists only hides the rules that still matter. Every amendment updates the version: MAJOR for removing or redefining a principle, MINOR for adding one or materially widening it, PATCH for wording.

Version: 1.0.0 | Ratified: 2026-08-05
