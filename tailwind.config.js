module.exports = {
  content: [
    "./index.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "dark-gray": "rgba(16, 16, 16, <alpha-value>)",
        "light-gray": "rgba(241, 235, 235, <alpha-value>)",
        "pale-blue": "rgba(188, 200, 198, <alpha-value>)",
        "peach-main": "rgba(244, 188, 162, <alpha-value>)",
        "dark-brown": "rgba(49, 23, 12, <alpha-value>)",
        "off-white": "rgba(232, 255, 217, <alpha-value>)",
        "burnt-orange": "rgba(131, 69, 24, <alpha-value>)",
        "dark-blue": "rgba(6, 23, 30, <alpha-value>)",
        "primary-bg": "rgba(232, 255, 255, <alpha-value>)",

        // screen bg color
        "screen-bg": "rgb(232, 225, 217 , <alpha-value>)",
        "screen-bg-dark": "rgb(6, 23, 30, <alpha-value>)",

        // #31170C
        "color-primary": "rgba(49, 23, 12, <alpha-value>)",
        "color-light": "rgb(255, 255, 255 , <alpha-value>",
      },
      fontSize: {
        xxs: "10px", // extra extra small
        xs: "12px", // extra small
        sm: "16px", // small
        base: "18px", // base/paragraph
        lg: "20px", // large
        xl: "24px", // extra large
        "2xl": "32px", // 2x extra large
        "3xl": "47px", // 3x extra large
      },
      fontFamily: {
        interThin: ["Inter_100Thin"],
        Inter_900Black: ["Inter_900Black"],
        roboto: ["Roboto"],

        // Epiloguefont
        epilogue: ["Epilogue"],
      },
    },
  },
  plugins: [],
};
