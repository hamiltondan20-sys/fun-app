module.exports = {
  content: [
    "./code.html",
    "./scripts/**/*.js",
    "./data/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        surface: "#f7f9fc",
        "surface-soft": "#eef3f7",
        "surface-card": "#ffffff",
        "surface-deep": "#111827",
        primary: "#b94725",
        "primary-bright": "#bf4f2f",
        secondary: "#2458c8",
        tertiary: "#0b776d",
        ink: "#111827",
        muted: "#4f5f6f",
        line: "#cbd7e3",
        warm: "#fff4ed",
        "warm-line": "#efc5b2",
        "blue-soft": "#edf3ff",
        "teal-soft": "#e9fbf5"
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
        body: ["Inter", "sans-serif"]
      },
      boxShadow: {
        float: "0 18px 48px rgba(37, 98, 145, 0.14)",
        card: "0 10px 28px rgba(16, 32, 51, 0.08)"
      }
    }
  },
  plugins: [
    require("@tailwindcss/forms")
  ]
};
