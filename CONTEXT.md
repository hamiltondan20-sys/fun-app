# Context Glossary

## Primary User
The primary user is a family or couple planning a leisure vacation and wanting a simple, guided way to build an itinerary and book the main parts of the trip.

## Product Priority
The app's first job is to turn a traveler's preferences into a simple, personalized vacation itinerary.

The product priority order is:
1. Itinerary generator
2. Educator
3. Booking app

## Educator Role
The app educates users about the destination through neighborhood guides, local customs, best times to visit attractions, and cultural tips.

The app also explains why each itinerary choice fits the traveler's stated preferences.

## Itinerary Editing
Users can swap, remove, and reorder itinerary items after generation.

The app still does the heavy lifting of creating the itinerary.

## Required Trip Inputs
The app must collect these inputs before generating an itinerary:
- destination
- start date
- end date
- number of travelers
- traveler type or ages if kids are included
- vacation style
- budget
- preferred pace
- cuisine preferences and dietary restrictions

## Budget Model
The app starts with travel style budget tiers:
- budget
- moderate
- premium

The app may optionally allow users to add a total trip budget later.

## Vacation Style Selection
Users can choose up to 3 vacation styles.

Users can also indicate how often each style should appear in the trip.

For example, on a 7 day vacation, a user may want 3 adventurous days and 4 relaxing days.

## Style Frequency Input
Style frequency is expressed as an exact number of days per style.

The app helps the user with the math instead of making the user calculate the full split alone.

## Style Split Validation
If the total style-day split does not match the trip length, the app suggests a corrected split and asks the user to approve it.

## Preferred Pace
Preferred pace is expressed with user-friendly labels:
- easygoing
- balanced
- packed

These labels control how full each day becomes in the itinerary.

## In-Trip Editing
Users can edit their itinerary during the trip as plans change or weather changes.

## Assisted Itinerary Changes
The app supports assisted edits during the trip.

Users can request changes and the app suggests updated options without taking full control.

Users can also adjust the itinerary on their own when needed.

## Itinerary Item Fields
Each itinerary item shows:
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

## Itinerary Generation Scope
The app generates the whole trip first and then lets the user edit individual days.

## Destination Education
For the first version, destination education appears inline inside the itinerary.

The app may also show fun facts about the destination while the itinerary is loading.

A separate guide section may be added later.

## Destination Confidence
If the app knows less about a destination, it still provides a best-effort itinerary.

The app clearly communicates when some suggestions are lower confidence.

The app should still provide whatever information and context it can.

## Itinerary Success
A successful itinerary feels personalized, realistic, easy to follow, and easy to adjust.

It should get the user excited to go on vacation instead of worrying about logistics.

## Booking Timing
Booking options appear after the itinerary is generated.

Booking options are attached to relevant itinerary items such as hotels, flights, museums, or shows.

## Booking Meaning
For version 1, booking means helpful external links connected to itinerary items.

Comparison features may be considered later.

## Account Requirement
The first experience does not require an account.

Users can create a trip without signing in.

Users must create an account to save an itinerary and use it offline.

## Offline Use
For version 1, offline use means view-only access to a saved itinerary and its important trip details.

## Trip Disruption Handling
When weather or closures may affect a plan, the app alerts the user and suggests alternatives for approval.

## Suggestion Explanation
Each suggestion shows a short, practical explanation by default.

Users can expand the explanation to see more detail.

## Suggestion Rejection
If a user rejects a suggestion, the app first asks why.

The app then uses that reason to suggest a better replacement.

## Post-Trip Use
After the trip, the app keeps the itinerary as a saved trip.

Users can add notes about what they liked or disliked.

## Profile Tracking
In the profile section, users can track:
- where they have traveled
- what they have seen
- what activities they have done

Users can also attach photos from their camera roll.

## Trip Management
Users can have multiple trips saved.

One trip is marked as the active trip the user is currently planning or taking.

## Group Planning
For version 1, one main planner enters the trip preferences for the group.

Once the trip link is shared with others, they may modify the trip.

## Shared Trip Permissions
The main planner decides whether a shared link is view-only or editable.

The default shared setting is view-only.

## Shared Edit Conflicts
Shared edits are allowed to happen.

The app keeps a simple change history so the group can see what changed.

## Recommendation Bias
The app leads with dependable suggestions and then sprinkles in discovery.

## Recommendation Presentation
For a given time slot, the app shows one primary recommendation and one or two backups.

The app uses the user's decisions to inform later suggestions.

## Preference Memory
The app remembers stable preferences automatically.

The app learns from accepted and rejected suggestions over time.

If the app is uncertain, it asks a follow-up question.

## Stable Preferences
The app automatically remembers:
- dietary restrictions
- cuisine preferences
- accessibility needs
- family needs
- broad pace tendencies
- broad budget tendencies

## Uncertainty Handling
When the app is unsure, it asks a follow-up question and briefly explains why it is asking.

## Product Tone
The app sounds like a friendly guide: warm, clear, encouraging, and calm.

It is informative, while still keeping users excited about their upcoming vacation.

## Minimal-Input Behavior
If the user gives only basic trip information, the app asks a small number of high-value follow-up questions before generating the itinerary.

## Highest-Value Follow-Up Questions
If the app can ask only 2 follow-up questions before generating, the highest-value questions are:
- vacation style
- preferred pace

These are the backbone of why users are looking for an itinerary.

## Planning Entry Point
Version 1 starts with a destination-first flow.

The app should be designed so a feeling-first flow can be added later.

## In-Trip Transportation
For version 1, the app includes travel time between stops and avoids obviously inefficient days.

The app focuses on locality so the trip feels more exciting and less burdened by unnecessary movement between distant places.

## Neighborhood Planning
Most days are neighborhood-centered unless there is a strong reason to combine areas.

Acceptable reasons to adjust neighborhoods include:
- a nearby neighborhood is close enough to fit naturally into the day
- an event has limited availability and can only be done on a certain day

## Must-Do Activities
If the user has a must-do activity, the app respects it and rebuilds the surrounding day as cleanly as possible.

User preference comes first.

## Must-Do And Skip Inputs
Users can mark must-do activities both before and after itinerary generation.

Users can also mark skip activities both before and after itinerary generation.

## Skip Meaning
A skip usually applies to the current trip.

When a user skips something, the app asks whether they mean this exact item or a broader category.

By default, a skip indicates the user does not want to pursue that specific opportunity.

## Feedback Timing
The app asks lightly during the trip and more fully after the trip.

In-trip feedback should be subtle and should not become something the vacationer has to worry about while trying to relax.

The purpose of light in-trip feedback is to help modify the itinerary when needed.

## No-Feedback Behavior
If the user gives no feedback during the trip, the app assumes the current plan is fine unless the user changes it.

## Core Screen
The generated itinerary screen is the most important screen in the app.

It must remain user-friendly and should not look overwhelming.

## Itinerary Screen Density
The first view of the itinerary stays very light.

Users can expand each itinerary item to see richer details.

## Itinerary Screen Structure
The itinerary screen leads with a day summary first and then lets the user open into the individual activities.

The screen should be informative without feeling overwhelming.

## Day Summary Fields
Each day summary shows:
- day number and date
- main neighborhood or area
- overall vibe or style
- pace label
- one top highlight
- weather-aware note when relevant
- estimated time spent in each location

## Time Planning Style
The itinerary uses a soft schedule with suggested times and estimated duration rather than a rigid minute-by-minute plan.

The itinerary leaves room for flexibility and extra time.

## Behind-Schedule Behavior
If the user falls behind, the app gently offers to adjust the rest of the day.

The app assumes there is a good reason for the delay.

## Event Reminder Timing
Users can choose to be notified about an event:
- 2 hours before
- 1 hour before
- 45 minutes before
- 30 minutes before
- 15 minutes before

## Reminder Model
Users have one default reminder setting for the trip.

Users can change reminder timing for important events if they want.

Reminder frequency can also be adjusted, and daily reminders are a helpful option.

## Daily Reminder Tone
Daily reminders sound like a friendly summary of the day.

They include the first key event and important heads-up items such as traffic or weather.

They should get the user excited for the day ahead.

## Day Balance
The app intentionally balances anchor events with free time.

## Free Time Visibility
Free time appears as intentional space in the itinerary.

Users can adjust whether they want more or less free time based on their preference.

## Trip Personality Summary
The app shows a short trip personality summary before or at the top of the itinerary.

The summary should sound human and natural, like people interacting with other people.

## Overpacked Day Guidance
If a user is making the day too jam packed, the app recommends free time and explains the benefits.

The user can ignore that recommendation.

## Recommendation Explanation Style
When the app explains a recommendation, it combines a practical reason with an emotional benefit.

Positive reviews from other people help determine whether something is a good choice.

## Review Influence
Reviews are one important trust signal among several.

Suggestions are ranked mainly by fit for the user.

Highly recommended, destination-defining events or landmarks should receive added priority when appropriate, such as the Eiffel Tower when visiting Paris.

## Iconic Attraction Handling
Major destination-defining attractions are strongly recommended, but the user can confirm, skip, or downgrade them.

If the user has been there before, they may not want to go again.

## Destination Familiarity
During trip setup, the app asks about the user's familiarity with the destination.

The available choices are:
- first time
- been here before
- give me a unique experience

## Unique Experience Mode
"Give me a unique experience" means:
- fewer default tourist picks
- more local or lesser-known options
- a stronger focus on memorable experiences that still fit the user's style

## Food Planning
Food is always present in a practical way in the itinerary.

Food becomes a bigger part of the itinerary when the user has foodie preferences or strong cuisine interests.

Users can modify restaurant choices based on:
- desired cuisine level or type
- desired price point

Examples include:
- splurging on a Michelin restaurant
- choosing fast food
- focusing on local cuisines

## Food Recommendation Logic
Food recommendations should match the type of trip and destination context unless the user has said otherwise.

For example, on a first trip to Paris, the app should naturally consider experiences like croissants or baked goods, cheese, and wine.

For ordinary meals, convenience is the default priority.

When a meal is meant to be a highlight, food quality and experience receive more priority.

## Food Importance
The app asks how important food is on this trip.

The available choices are:
- supporting detail
- meaningful part
- major highlight

The app prioritizes what the user states to be important.

## Competing Priorities
When a user marks several things as important, the app should first try to fit them across the overall trip.

If that becomes difficult, the app asks the user to rank their top priorities.

## Trade-Off Communication
When the app has to make a meaningful trade-off, it briefly says so in plain language.

The app also offers recommendations that help make the trade-off work.

## Core Product Feel
The app primarily feels like a guide-companion with strong planning ability.

## Trip Naming
The main label for the generated result is "Your Trip."

The supporting functional term is "itinerary."

## Input Naming
The planning flow is called "Build Your Trip."

The specific answers the user gives are called "Trip Preferences."

## Returning User Experience
The app should feel like it knows the user, but never traps them.

The app uses remembered knowledge to help users feel comfortable that the itinerary will match their needs and wants.

## Preference Conflict Rule
For the current trip, the app always trusts what the user enters now.

Saved preferences are only a helpful starting point.

If a suggestion or request is nearly impossible or does not make sense, the app shows a popup that explains the issue.

The user can then cancel the request or follow the app's advice.

## Conflict Popup Triggers
The app uses a popup when the user's request creates a strong conflict with:
- time
- distance
- availability
- budget
- the user's selected pace

## Conflict Popup Options
The popup shows one recommended fix and one or two alternatives.

## Conflict Resolution Priority
When resolving a conflict, the app first tries to preserve the same kind of experience.

After that, it tries to preserve timing or neighborhood when possible.

## Surprise Suggestions
The app can occasionally offer an optional surprise suggestion.

The app never forces a surprise suggestion into the plan.

The plan is always a suggestion and never mandatory.

## Overplanning Warnings
The app keeps gently warning when a day becomes unrealistic, while still letting the user continue if they choose.

The app should softly remind the user that there are only 24 hours in a day and that putting too much into one day can cause tiredness for the rest of the trip and reduce the quality of the overall vacation.

## Special Days
The app allows special days that differ from the overall trip pattern when the user clearly wants them.

Special days can be modified at any point because plans can change.

## Follow-Up Interaction Style
The app mostly uses quick tap choices, with conversational language around them.

The interaction style should feel quick and effective for the user.

## Input Structure
The app stays mostly structured, but allows optional open text when the user has something specific to say.

## Input Conflict Handling
If open text clearly adds important nuance or conflicts with structured answers, the app asks a short follow-up to confirm which direction to trust.

The most recent answers dictate the direction.

## Setup Question Explanations
The app gives short helpful explanations only when the reason for a question might not be obvious.

## Pre-Generation Confirmation
The app shows a quick pre-generation summary that the user can confirm or tweak before the itinerary is generated.

Users have the final say and should be able to see whether they like the overall direction of the plan.

## Post-Generation Interaction
After the app generates Your Trip, users can start adjusting it immediately.

The app also offers a simple way for users to say the plan looks good if they are happy with it.

## Trip Saving Model
The app auto-saves the latest version of the trip.

Users can optionally mark a version they really like.

## Liked Version Meaning
If a user marks a version they like, it becomes a restore point they can return to later.

It does not mean the version is perfect, only that it is a viable option.

## Drift Reminder
The app can gently mention when the current trip has drifted meaningfully from a liked version, but only as a helpful reminder.

## Version Comparison
If the user compares versions, the app briefly explains what improved and what got weaker.

The comparison should keep the user's best interests in mind.

## Value Recommendations
The app recommends better-value options when they still match the user's goals and do not cheapen the experience.

If an experience is truly worth it, the app can offer it to the user, but it should never be pushy.

## Signature Splurges
The app may occasionally suggest one signature splurge if it clearly fits the trip and explains why it may be worth it.

The suggested splurge should not be significantly over budget.

For example, an expensive Eiffel Tower tour may not be worth recommending to a user who only wants to see it from afar.

## Core Trip Priority
The app asks what matters most on this trip.

The available choices are:
- seeing
- doing
- eating
- feeling

Users choose one main trip priority and one secondary priority.

If the user has no preference, the app can use ratings from other users to help make the decision.

## Recommendation Source Labels
When it matters, the app lightly indicates whether a suggestion is:
- more personalized
- more crowd-loved
- or both

## Personalization Levels
The app personalizes at the trip level, day level, and activity level.

The day level is most important because the days change.

## Mostly Open Days
The app sometimes leaves a day mostly open when that better fits the pace, trip style, or user preference.

## Trip Narrative Arc
The app should try to create a gentle narrative arc across the trip.

The goal is to make the trip feel like a memorable experience.

## Arrival And Departure Days
The app treats arrival and departure days differently from the middle days.

The app should not overload the first or last day.

Arrival time should allow users to get acclimated and settled.

Departure time should allow users time to pack and leave comfortably.

## Arrival And Departure Timing
The app asks for arrival and departure timing during setup, but lets users skip it if they do not know yet.

If there is an early arrival or a late departure, the app can offer an optional event or activity.

## Unknown Travel Timing
If arrival or departure timing is unknown, the app uses a cautious default and keeps the first and last day lighter and more flexible.

## Trip Ending
The app should try to end the trip on a satisfying note when timing allows.

## Signature Memory Moment
The app should try to include one signature memory moment when it naturally fits the trip.

The app highlights it as the signature event.

## Signature Event Explanation
The app labels the signature event and briefly explains why it was chosen.

## Multiple Trip Directions
When there are two genuinely strong directions for the trip, the app can offer two full-trip options and let the user choose.

The app should explain why there are two different options.

## Alternate Trip Direction
If the app offers two strong trip directions, it keeps the unchosen one as an alternate version the user can revisit later.

## Personalization Reinforcement
The app lightly reinforces that the trip was built around the user, but without repeating it too much.

The user should feel that the trip was personalized to them.

## Confidence Signaling
The app shows confidence lightly when it matters, especially if a suggestion is lower-confidence or more experimental.

## Obvious Recommendations
The app should try not to leave out obvious choices that many users would expect.

It is better to err on the side of caution and include or strongly surface the obvious rather than assume the user does not want it.

If the app does leave out an obvious choice and that omission may be surprising, it briefly explains why.

## Day-Level Rationale
Each day should include a short explanation of why that day works.

The app should do its best to keep the day in one area unless the city is small enough that broader movement still makes sense.

## Famous Attraction Default
The app assumes the user wants to see all major sites.

The app only suggests skipping a famous attraction when there is a clear user-centered reason.

If it suggests skipping a famous attraction, it explains that reason simply.

## Essentials Before Uniqueness
By default, the app prioritizes not missing the essentials first and then layers in uniqueness where it fits.

Essentials are treated as essential for a reason.

## Essential Definition
An essential is something that is culturally important, widely expected by travelers, or consistently highly valued by visitors.

## Familiarity Depth Preference
The app includes a simple preference that lets users lean toward:
- classics
- balanced
- deeper cut

## Deeper Cut Boundary
Even in deeper cut mode, the app still keeps essentials visible unless the user clearly signals they want to skip them.

## Trip Blueprint
Before generation, the app shows a short trip blueprint summary.

The trip blueprint should show only the biggest trip-shaping choices.

## User Challenge Boundary
The app gently challenges the user only when there is a strong practical reason.

The final choice always stays with the user.

## Packed Trip Protection
The app respects a packed trip style, but still suggests small recovery space when it would clearly help the overall trip.

The suggestion should stay polite and be in the user's best interest.

## Personal Pace Learning
The app learns over time what feels like too much for a specific user.

## Favorite Memory Learning
The app remembers what kinds of experiences became favorite memories, not just what was practical.

## Desired Trip Memory
The app asks what kind of memory the user wants most from this trip.

## Desired Memory Input
The app uses quick memory categories first, with an optional open-text note if the user wants to personalize it.

## Desired Memory Weight
The desired memory is one of the strongest trip-planning signals.

## Memory Conflict Guidance
If a user makes a choice that strongly conflicts with the memory they said they want, the app gently points that out and offers a better-fit alternative.

The guidance should not be pushy and should never make the user feel inferior.

## Trip Promise
The app's trip promise is: "We help you build a vacation that feels personal, memorable, and easy to enjoy."

## Overwhelm Response
When a user gets overwhelmed, the app lets them know it is going to simplify the path with fewer choices and stronger recommendations.

## Planning Modes
Users can move between simple mode and detailed mode whenever they need.

## Simple Mode Rule
In simple mode, the app hides more advanced preference-tuning questions first while keeping the core trip-shaping questions.

## Simple Mode Core Questions
The core trip-shaping questions that remain in simple mode are:
- destination
- dates
- number of travelers
- vacation style
- pace
- budget tier

Simple mode also allows an optional open-text field for must haves.

## Simple Mode Tie-Breaker
In simple mode, the app usually generates right away.

If it truly needs more clarity, it may ask one quick tie-breaker question.

## Simple Mode Tie-Breaker Threshold
The app only asks a tie-breaker question in simple mode when not asking would likely make the trip noticeably worse or less personal.

## Simple Mode Reassurance
Simple mode includes a short reassurance that the app will handle the details from there.

The message should indicate that the app is doing the hard work.

## Indecisive Mode
The app lets users say they are feeling indecisive.

When that happens, the app leans more on strong recommendations with fewer choices.

## Spontaneity Preference
The app asks how much spontaneity the user wants.

The available choices are:
- mostly planned
- balanced
- go-with-the-flow

## Spontaneity Boundary
Even in go-with-the-flow mode, the app still locks in important reservations or time-sensitive essentials when needed.

## Group Split Suggestions
The app keeps the group together by default.

The app may suggest an optional split for part of a day when that clearly improves the experience.

## Ease Communication
The app should not explicitly say that it is reducing stress.

Instead, the app's overall image and behavior should make it clear that it is making vacation life easier.

## Thinking Handoff
When the app is thinking after it has enough input, it should have a short handoff moment such as: "You've given us what we need. We'll take it from here."

## Thinking State Experience
While thinking, the app should build anticipation with light, useful, and exciting content.

This can include changing text such as:
- "Developing your perfect vacation"
- "Making your vacation come true"

## Thinking State Transparency
During the thinking state, the app lightly shows what it is optimizing for in human language.

## Itinerary Reveal Tone
The itinerary reveal should feel calm first, with a little excitement layered in.

The reveal should not feel gimmicky.

## Reveal Structure
The first thing the user sees should be a calm trip-level summary, followed by the day-by-day plan.

The reveal should lead users into more detail while letting them feel excited without feeling overwhelmed.

## Reveal Summary Style
The trip-level summary leads with the emotional shape of the trip, with light reasoning underneath.

## Trip Title Style
The app can offer a short, tasteful trip title.

The title should never feel cheesy or forced.

The title should feel natural.

## Trip Renaming
The user can rename the trip at any time.

## Version 1 Scope
For version 1, the app stays focused on one vacation at a time so users do not feel overwhelmed.

## Lodging Guidance
The app helps users decide where to stay because lodging shapes the whole trip.

For version 1, the app recommends lodging and links users out to book.

Direct booking can be a later version.

## Lodging Recommendation Style
The app shows a few strong neighborhood or lodging-area options with plain-language trade-offs.

## Lodging Trade-Offs
The app explains stay options using simple trade-offs such as:
- central vs quiet
- iconic vs local
- budget vs comfort
- lively vs family-friendly

Ideal lodging recommendations prioritize safety.

## Safety Communication
Safety is a strong behind-the-scenes priority.

The app mentions safety lightly only when it genuinely helps the user understand a recommendation.

## Lodging Budget Flex
The app may suggest paying a little more for a better lodging location if it clearly improves the trip.

The app should explain why and never push too hard.

The app should never deviate too far from the user's budget.

## Flight Role
Flights are a supporting feature in version 1 and are not the center of the experience.

The app takes budget into consideration for flights, but flights are not the primary focus.

## Flight Common Sense
The app should not let a cheaper flight noticeably damage the overall trip experience.

The app should use common sense and avoid options with extremely long layovers or unrealistic expectations.

## Flight Preference
The app asks whether the user wants to lean more toward:
- convenience
- balanced value
- lowest reasonable price

## Category Budget Priorities
The app lets users have different spending priorities for:
- flights
- lodging
- food
- experiences

## Budget Controls By Mode
Category-level spending priorities mainly live in detailed mode, with simpler budget guidance in simple mode.

## Simple Mode Budget Guidance
In simple mode, the app uses a broad budget tier.

The app can also optionally ask one quick question about where the user would rather spend or save.

The app should avoid asking too many questions that could put customers off.

## Avoid Preferences
The app allows a lightweight avoid preference during setup.

## Avoid Preference Strength
Avoid preferences are soft by default.

Users can mark some avoid preferences as firm if they really mean it.

## Avoid Preference Exceptions
If the app includes something that pushes against a soft avoid preference, it briefly explains why and offers an alternative when possible.

## Non-Negotiables
The app has a clear non-negotiables section for things the trip must respect.

## Default Non-Negotiables
The default non-negotiables list includes:
- accessibility needs
- dietary restrictions
- hard budget limits
- must-do events
- firm avoid preferences
- safety-sensitive lodging needs
- walking or mobility limits
- airline or flight notes such as nonstop or class

## Preferences vs Non-Negotiables
The app clearly separates preferences from non-negotiables.

The app should also let users know there will be both kinds of questions because users may blur the line between them.

## Non-Negotiable Upgrade Suggestion
The app gently suggests when something sounds like it belongs in non-negotiables.

The app should double-check with the user before treating it that way.

## Non-Negotiable Modification Check
The app can gently ask whether the user wants to modify a non-negotiable when it is causing a major issue.

The app must never change a non-negotiable on its own.

## Pre-Build Rules Recap
Before building the trip, the app briefly summarizes the final non-negotiables and the user's preferences.

## Trip Presets
The app lets users save reusable trip presets for future planning.

## Preset Structure
Presets are partial starting points, not rigid full templates.

## Sample Itineraries
Users can view sample itineraries as case studies, similar to a website experience.

Sample itineraries mainly educate and inspire while helping users imagine what their own trip could look like.

The app can use itineraries from similar inputs to preview what a trip might look like, without disclosing the entire plan.

The preview can show a few agenda items from a few days.

Sample itineraries are clearly labeled as examples of what the app can create, not exact promises of the final trip.

Sample itineraries appear both before planning and during planning, but are used differently in each place.

For version 1, sample itineraries stay read-only for inspiration and education.

Sample itineraries briefly explain why they work.

## Similar Traveler Language
The app may lightly reference similar travelers when it genuinely helps, but it should never overdo it.

## Past Trip Comparison
The app can lightly compare the current trip to a past trip when it helps the user understand the direction.

Example:
"This trip is shaping up more relaxed than your last city trip, with more free time and fewer evening commitments."

## Similar Or Different Trip Intent
The app asks whether the user wants the current trip to feel similar to their usual style or intentionally different.

The app can use input about how the user felt on their last trip planned through the app as context.

## Post-Trip Feedback Style
After the trip, the app softly asks for feedback.

The app uses this feedback for future notes and modifications.

## Post-Trip Feedback Format
The app asks for post-trip feedback in a few very small prompts.

The app should not use multiple popups for this.

## Post-Trip Feedback Placement
The prompts live in a small, calm section inside the saved trip page.

The app can use a light reminder to bring the user back to it.

## Feedback Learning Reflection
The app lightly shows that past feedback influenced future planning.

The reflection should never make the user feel insecure.

## Surprise Me Opt-In
The app lets users opt into a surprise me moment for one part of the trip.

## Surprise Moment Boundaries
Surprise moments stay in lower-risk parts of the trip, such as:
- food
- a scenic stop
- a local market
- a small experience

Surprise moments do not apply to major logistics.

The surprise must be sensible and practical.

## Surprise Reveal Timing
For low-risk surprise moments, the app can keep some details hidden until closer to the moment, while still giving enough practical context.

## Intentional Simplicity Language
The app can lightly reinforce that simplicity was intentional when that helps the user trust the plan.
