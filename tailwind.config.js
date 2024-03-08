/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
    fontFamily: {
      primary: "Poppins",
    },
    colors: {
      primary: "#00ff00",
      secondary: "#7C4700",
    },
    backgroundImage: {
      "auth-bg": "url('assets/img/bg_login.png')",
      "auth-bg-primary": "url('assets/img/bg-register.png')",
    },
  },
  plugins: [require("flowbite/plugin")],
};
