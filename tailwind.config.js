module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // colors: {
      //   'dark-gray': 'var(--brand-dark-gray)', // Using CSS variable
      //   'red': 'var(--brand-red)',             // Using CSS variable
      //   'light-gray': 'var(--brand-light-gray)' // Using CSS variable
      // },
      fontFamily: {
        lufga: ["Lufga Regular", "sans-serif"], // Custom font with a fallback to sans-serif
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
