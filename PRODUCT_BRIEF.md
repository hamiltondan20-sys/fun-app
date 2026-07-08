# Horizon Bound Product Brief

## Product Summary
Horizon Bound is a mobile travel app for couples, families, and leisure travelers who want help turning a vacation idea into a personalized trip plan.

The app's promise is:

> We help you build a vacation that feels personal, memorable, and easy to enjoy.

Version 1 is:
- an itinerary generator first
- an educator second
- a booking helper third

Version 1 is not:
- a direct-booking travel agency
- a flight-first product
- a heavy trip-management system

## Core User
The primary user is a family or couple planning a leisure vacation and wanting a simple, guided way to build an itinerary and book the main parts of the trip.

## Product Goals
- Make vacation planning feel easier, calmer, and more exciting.
- Turn user preferences into a full-trip itinerary, not just a list of ideas.
- Teach users about the destination without overwhelming them.
- Keep the plan editable before and during the trip.
- Help users book supporting pieces like lodging, flights, and tickets through external links in version 1.

## Version 1 Scope
### In scope
- Build a trip around one destination at a time
- Generate the whole trip first, then let users edit days and items
- Recommend neighborhoods to stay in
- Recommend flights as a supporting feature
- Provide external booking links for hotels, flights, museums, tours, shows, and similar items
- Save trips for signed-in users
- Let saved trips be viewed offline
- Support shared trip viewing, with optional editing controlled by the main planner

### Out of scope for version 1
- Direct in-app booking
- Editable sample itineraries
- Full destination comparison mode
- Fully automatic trip replanning without user approval
- Full offline editing

## Product Principles
- The plan is always a suggestion, never mandatory.
- User preference comes first.
- Essentials come before uniqueness unless the user clearly wants otherwise.
- Keep the group together by default.
- Prefer dependable recommendations, then layer in discovery.
- Keep days mostly neighborhood-centered when possible.
- Be helpful, not pushy.
- Be warm, clear, encouraging, and calm.

## What The App Asks
### Core trip-shaping questions
- destination
- dates
- number of travelers
- vacation style
- pace
- budget tier

### Additional important inputs
- traveler type or ages if kids are included
- cuisine preferences and dietary restrictions
- preferred spontaneity
- desired trip memory
- first-time / been here before / unique experience
- classics / balanced / deeper cut
- food importance
- must-do items
- skip items
- avoid preferences
- arrival and departure timing, if known

### Non-negotiables
These should be clearly separated from normal preferences:
- accessibility needs
- dietary restrictions
- hard budget limits
- must-do events
- firm avoid preferences
- safety-sensitive lodging needs
- walking or mobility limits
- airline or flight notes such as nonstop or class

## How The App Thinks
### Trip structure
- It generates the whole trip first.
- It starts with a calm trip-level summary, then moves into day-by-day detail.
- It tries to create a gentle narrative arc across the trip.
- Arrival and departure days stay lighter.
- The trip should end on a satisfying note when timing allows.

### Day structure
- Days are neighborhood-centered unless there is a strong reason not to be.
- A day balances anchor events with free time.
- Free time is visible and intentional.
- Days use soft timing, not a rigid minute-by-minute schedule.
- Each day should have a short "why this day works" explanation.

### Recommendation logic
- Personal fit matters most.
- Reviews are an important trust signal, but not the only one.
- Major landmarks and essentials are assumed to matter unless the user clearly says otherwise.
- Optional surprise moments must be low-risk and practical.
- Signature memory moments should be highlighted when they naturally fit the trip.

## Booking Model
### Lodging
- The app helps users choose where to stay because lodging shapes the whole trip.
- It should offer a few strong area options with plain-language trade-offs.
- Safety should be a strong behind-the-scenes filter.
- The app may suggest paying a little more for a clearly better location, but not too far beyond budget.

### Flights
- Flights are supportive, not the center of the product.
- The app should use common sense and avoid bad trade-offs like extreme layovers or unrealistic timing.
- The user can choose between convenience, balanced value, or lowest reasonable price.

### Version 1 booking behavior
- Use external links for hotels, flights, tickets, and related bookings.
- Direct booking comes later.

## Sample Itineraries
- Samples are read-only in version 1.
- They are there to educate and inspire.
- They should preview a few agenda items from similar trips without exposing a full generated plan.
- They must be clearly labeled as examples, not promises.
- They should briefly explain why they work.

## Core Screen Blueprint
The most important screen in the app is the generated itinerary screen, labeled `Your Trip`.

It must feel:
- calm first
- a little exciting
- informative but not overwhelming

### Top of screen
Show:
- trip title or natural nickname
- destination and dates
- short emotional trip summary
- light reasoning underneath
- signature event teaser if it fits naturally

Example structure:
- `Your Trip`
- `A Relaxed First Paris Trip`
- `Built for iconic moments, great food, and enough breathing room to enjoy the city`

### Day list
Each day begins with a day summary card.

Each summary should show:
- day number and date
- main neighborhood or area
- overall vibe or style
- pace label
- one top highlight
- weather-aware note if relevant
- estimated time spent in each location

### Expanded day view
When opened, a day should reveal activities.

Each itinerary item should show:
- title
- time
- location
- short description
- why it matches the user's preferences
- cost estimate
- booking link
- travel time from previous stop
- indoor or outdoor
- family-friendly note
- reviews when applicable

### Interaction rules for the itinerary screen
- Keep the first view light.
- Let users expand into richer details.
- Let users immediately edit after generation.
- Show one main recommendation and one or two backups when useful.
- Let users swap, remove, reorder, or ask for alternatives.
- Use short explanations with optional expansion.

## Key Supporting Screens
### 1. Build Your Trip
Purpose:
- Collect the minimum information needed
- Keep users from feeling overwhelmed

Needs:
- simple mode
- detailed mode
- clear separation between preferences and non-negotiables

### 2. Trip Blueprint
Purpose:
- Show the biggest trip-shaping choices before generation
- Let the user confirm or tweak

Should include only major shaping inputs, not tiny details.

### 3. Thinking State
Purpose:
- Turn waiting into anticipation

Should include:
- a short handoff line
- changing, warm loading text
- light, human-language notes about what the app is optimizing for
- optional destination fun facts

### 4. Saved Trip Page
Purpose:
- Hold finished trips
- show light post-trip feedback prompts
- support restore points and version comparison

## MVP Build Plan
This is the order I recommend for a new developer.

### Phase 1: Static prototype
Goal:
- Build the screens with mock data only

Build:
- `Build Your Trip` screen
- `Trip Blueprint` screen
- `Thinking` screen
- `Your Trip` screen
- simple `Saved Trip` screen

Do not build:
- real AI
- real accounts
- real booking integrations

### Phase 2: Frontend state
Goal:
- Make the screens interactive

Build:
- form inputs
- simple mode and detailed mode
- preference vs non-negotiable sections
- expand/collapse day and activity cards
- edit buttons for swapping/removing items

### Phase 3: Local fake data engine
Goal:
- Make the app feel real before using APIs

Build:
- hardcoded sample destinations
- hardcoded neighborhoods
- hardcoded activity pools
- simple itinerary generation rules based on:
  - pace
  - style
  - budget tier
  - food importance
  - first-time vs repeat

### Phase 4: Persistence
Goal:
- Save progress

Build:
- local storage for unsaved drafts
- account-based save behavior later
- restore points for liked versions

### Phase 5: Real data
Goal:
- Replace mock content with real sources

Add:
- hotel recommendation data
- flight recommendation data
- activity and attraction data
- reviews
- booking links

### Phase 6: Smarter personalization
Goal:
- Make repeat use better

Add:
- stable preference memory
- favorite memory learning
- past-trip comparison
- post-trip feedback learning

## What To Keep Simple First
If you are new to development, do not try to build all of this at once.

Start with:
- one destination flow
- one full-trip output
- one editable itinerary screen
- mock recommendations
- no real booking
- no real AI

The first success milestone is:

> A user can fill out a short form and receive a believable, calming, personalized vacation itinerary.

## Recommended First Technical Milestone
If you want the best next coding step, build this first:

1. A real `Build Your Trip` form in HTML/CSS/JavaScript
2. A `Generate Trip` button
3. Mock itinerary generation from hardcoded data
4. A day-first `Your Trip` screen with expandable cards

That will give you a working prototype that proves the product idea before you spend time on APIs or booking.
