# Analytics setup

Horizon Bound uses the free standard version of Google Analytics 4. The site does not load the Google tag until a visitor chooses to allow analytics.

1. Create a Google Analytics 4 property and a Web data stream.
2. Copy the Measurement ID that starts with `G-`.
3. In `scripts/site-config.js`, replace the empty `window.HB_ANALYTICS_ID` value with that ID. This shared file enables the same consent behavior on the planner and every published guide page.
4. Publish the updated site and confirm the first visit in Google Analytics Realtime.

The current implementation keeps analytics off when no Measurement ID is configured. It also stores a visitor's allow or decline choice in local browser storage. Review the privacy notice and consent behavior for the regions where the app will operate before public launch.
