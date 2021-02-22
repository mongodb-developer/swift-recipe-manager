module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: {
            "green": {
                "fern": "#12924F",
                "forest": "#116149"
            },
            "gray": {
                "100": "#F3F4F6",
                "200": "#E5E7EB",
                "300": "#D1D5DB",
                "400": "#9CA3AF",
                "500": "#6B7280",
                "600": "#4B5563",
                "700": "#374151",
                "800": "#1F2937",
                "900": "#111827"
            },
            "white": "#FFFFFF"
        },
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
}