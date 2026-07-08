---
name: Horizon Bound
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#594139'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#8d7168'
  outline-variant: '#e1bfb5'
  surface-tint: '#ab3500'
  primary: '#ab3500'
  on-primary: '#ffffff'
  primary-container: '#ff6b35'
  on-primary-container: '#5f1900'
  inverse-primary: '#ffb59d'
  secondary: '#256291'
  on-secondary: '#ffffff'
  secondary-container: '#92c9fe'
  on-secondary-container: '#0f5483'
  tertiary: '#006a65'
  on-tertiary: '#ffffff'
  tertiary-container: '#0daba3'
  on-tertiary-container: '#003835'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbd0'
  primary-fixed-dim: '#ffb59d'
  on-primary-fixed: '#390c00'
  on-primary-fixed-variant: '#832600'
  secondary-fixed: '#cee5ff'
  secondary-fixed-dim: '#97cbff'
  on-secondary-fixed: '#001d33'
  on-secondary-fixed-variant: '#004a76'
  tertiary-fixed: '#79f6ed'
  tertiary-fixed-dim: '#59dad1'
  on-tertiary-fixed: '#00201e'
  on-tertiary-fixed-variant: '#00504c'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-bold:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style
The design system is engineered to evoke the exhilaration of departure and the serenity of a perfectly planned escape. Targeting modern travelers who seek both adventure and reliability, the UI balances a vibrant, high-energy aesthetic with a systematic, professional structure. 

The style is **Modern Corporate with a Tactile edge**, blending the cleanliness of high-end SaaS with the evocative warmth of lifestyle editorial. It utilizes generous whitespace to reduce cognitive load during complex itinerary building, while employing subtle glassmorphism and vibrant gradients to maintain a sense of premium discovery. The emotional goal is to move the user from the stress of logistics to the joy of anticipation.

## Colors
This design system utilizes a palette inspired by the transition of a coastal sunset. 

- **Primary (Sunset Orange):** Used for key calls-to-action, active states, and highlights to inspire energy and movement.
- **Secondary (Deep Ocean Blue):** Provides a grounding, trustworthy foundation. Used for navigation bars, primary headings, and heavy UI elements to signify stability.
- **Tertiary (Seafoam):** An accent for secondary actions, tags, and illustrative accents to provide a cooling contrast to the orange.
- **Neutral (Crisp White & Slate):** The "Crisp White" (`#FFFFFF`) serves as the primary surface color to maintain an airy feel, while the neutral slate tints are used for borders and secondary text to ensure high legibility without the harshness of pure black.

## Typography
The typography strategy prioritizes rapid scanning and deep legibility. 

**Plus Jakarta Sans** is used for headings to provide a friendly, optimistic, and slightly rounded character that feels modern and approachable. **Inter** is utilized for all body copy and UI labels due to its exceptional performance in data-heavy environments like flight lists and itinerary schedules. High-contrast weight scales help differentiate between "at-a-glance" info and detailed reading. Use `label-bold` for metadata like flight numbers or price labels to ensure they stand out against body content.

## Layout & Spacing
The design system employs a **Fluid Grid** with fixed maximum constraints for desktop to ensure readability. 

- **Desktop:** 12-column grid with 24px gutters. Use large `xl` padding between major sections to emphasize a "stress-free" airy environment.
- **Tablet:** 8-column grid with 16px gutters.
- **Mobile:** 4-column grid with 16px margins. 

Spacing follows an 8px base unit. Vertical rhythm should be generous; never crowd itinerary items. Use "Safe Area" margins on mobile to ensure floating action buttons (like "Book Now") do not interfere with system navigation.

## Elevation & Depth
Depth is signaled through **Tonal Layering** and **Ambient Shadows**. 

- **Level 0 (Surface):** The neutral background (`#F8FAFC`).
- **Level 1 (Cards):** Pure white background with a very soft, large-radius shadow (Blur: 20px, Opacity: 4%, Color: Secondary Blue). This makes cards appear to float gently above the surface.
- **Level 2 (Modals/Popovers):** Uses a more defined shadow and a subtle 1px border in a light neutral tint to provide crisp separation.
- **Overlays:** Use a 20px backdrop-blur (Glassmorphism) for navigation bars and sticky headers to maintain a sense of context and place while the user scrolls through long travel plans.

## Shapes
The shape language is purposefully **Rounded** to feel welcoming and safe. 

Standard components (Buttons, Inputs) use a 0.5rem (8px) radius. Large containers like Trip Cards or Image Carousels should use `rounded-xl` (1.5rem / 24px) to create a soft, premium "frame" for travel photography. Interactive icons should be housed in circular containers to provide a playful, touch-friendly appearance.

## Components
- **Buttons:** Primary buttons use a Sunset Orange gradient to Deep Orange. They should have a subtle "lift" effect on hover. Secondary buttons use an outline of the Deep Ocean Blue.
- **Itinerary Chips:** Use Tertiary (Seafoam) backgrounds with 10% opacity for categories (e.g., "Flight," "Hotel," "Dining") to keep them distinct but secondary to the main text.
- **Input Fields:** Use a light grey fill with a 1px border that shifts to Secondary Blue on focus. Labels should always be visible above the field to assist users during complex booking.
- **Trip Cards:** The centerpiece component. Features a large image top, `rounded-xl` corners, and a "Price Tag" badge in the top right using the Primary Orange.
- **Progress Steppers:** Use a thick 4px line with Secondary Blue for completed steps, ensuring the user feels a sense of accomplishment while planning their journey.
- **Floating Action Button (FAB):** A circular Orange button used on mobile for "Add to Trip," positioned in the bottom right with a Level 2 shadow.

## Product Vision
Horizon Bound is a mobile travel planner for people who want help turning a loose vacation idea into an organized, bookable trip. The core promise is simple: the user tells the app where they are going, when they are going, who is traveling, and what kind of trip they want. The app then creates a personalized itinerary and helps the user move from planning to booking.

The product should feel helpful to first-time travelers and busy families, not just experienced trip planners. The interface should reduce overwhelm by breaking planning into clear steps and presenting smart recommendations in plain language.

## Target User
- Travelers planning leisure vacations rather than business trips.
- Couples, families, and friend groups who want a mix of structure and flexibility.
- Users who may not know the destination well and want curated suggestions.
- People who want one place to manage itinerary ideas, lodging, transportation, and activity tickets.

## Core User Flow
1. The user starts a new trip and enters destination, dates, and number of travelers.
2. The user selects one or more vacation styles such as relaxing, adventurous, historical, foodie, nightlife, family-friendly, or luxury.
3. The app asks a few optional preference questions such as budget, pace, accessibility needs, and must-do attractions.
4. The app generates a draft itinerary with daily plans, suggested neighborhoods, activities, restaurant ideas, and timing recommendations.
5. The user edits the itinerary by swapping suggestions, saving favorites, and removing items they do not want.
6. The app surfaces booking options for flights, hotels, tours, museums, and shows.
7. The user confirms reservations and keeps the final plan in one place during the trip.

## MVP Features
- Trip creation form with destination, dates, and traveler count.
- Vacation style selector with multi-select support.
- Simple itinerary generator that returns day-by-day suggestions.
- Booking cards for flights, hotels, and tickets.
- Saved trip dashboard showing upcoming plans.
- Basic profile page with traveler preferences.

## Future Features
- Collaborative planning with shared trips.
- Real-time weather-aware itinerary adjustments.
- Budget tracking across flights, hotel, food, and tickets.
- In-trip alerts for reservations, check-in times, and nearby recommendations.
- AI chat assistant for "change this day" or "find a cheaper hotel" requests.

## Primary Screens
- **Onboarding / New Trip:** Collects the key travel details in a beginner-friendly flow.
- **Style Selection:** Lets users choose the mood and purpose of the vacation.
- **Generated Itinerary:** Shows the draft trip plan in a clean, editable timeline.
- **Booking Hub:** Aggregates reservable flights, hotels, and ticketed experiences.
- **Trip Dashboard:** Displays confirmed bookings and daily plans during the trip.

## UX Principles
- **Reduce decision fatigue:** Ask only for the information needed at the current step.
- **Show confidence without pressure:** Present recommendations as editable suggestions, not fixed plans.
- **Keep logistics and inspiration together:** The app should feel exciting, but still dependable when handling important details.
- **Design for mobile first:** Most planning and on-trip usage should feel natural on a phone.
- **Explain AI clearly:** Users should understand why an itinerary was generated and how to change it.

## Beginner-Friendly Build Plan
If you are new to coding, this is a good order to build the app:

1. Create a static mobile UI with HTML, CSS, and sample data.
2. Turn the trip form into real inputs with JavaScript state.
3. Save trips locally in the browser before adding accounts.
4. Build a simple itinerary generator using hardcoded mock data first.
5. Replace mock data with an API or AI-powered backend later.
6. Add booking integrations only after the planning flow feels solid.

## Suggested Data Model
- **Trip**
  - `id`
  - `destination`
  - `startDate`
  - `endDate`
  - `adultCount`
  - `childCount`
  - `styles[]`
  - `budget`
- **ItineraryDay**
  - `date`
  - `theme`
  - `items[]`
- **ItineraryItem**
  - `time`
  - `title`
  - `category`
  - `notes`
  - `bookingUrl`

## Success Criteria
- A new user can create a trip in a few minutes without confusion.
- The itinerary feels tailored to the chosen trip style.
- Users can easily understand what is suggested versus what is already booked.
- The app feels exciting enough to inspire travel, but trustworthy enough to manage real plans.
