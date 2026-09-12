module.exports = {
  content: [
    "./code.html",
    "./scripts/**/*.js",
    "./data/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        surface: "#fffdf9",
        "surface-soft": "#f2eee7",
        "surface-card": "#fffdf9",
        "surface-deep": "#193f43",
        primary: "#b95138",
        "primary-bright": "#c76145",
        secondary: "#176765",
        tertiary: "#3f725e",
        ink: "#1d2930",
        muted: "#5c686d",
        line: "#ddd7cf",
        warm: "#fff0e8",
        "warm-line": "#e8b7a5",
        "blue-soft": "#e8f2ef",
        "teal-soft": "#e8f2e9"
      },
      fontFamily: {
        display: ["Space Grotesk", "Inter", "sans-serif"],
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
