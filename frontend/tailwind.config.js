module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: {
            "mongodb": {
                "fern": "#12924F",
                "forest": "#116149",
                "mint": "#B8E6CB",
                "leaf": "#13AA52"
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
            "red": {
                "100": "#FEE2E2",
                "200": "#FECACA",
                "500": "#EF4444",
                "700": "#B91C1C",
                "800": "#991B1B"
            },
            "blue": {
                "100": "#DBEAFE",
                "400": "#60A5FA",
                "500": "#3B82F6",
                "700": "#1D4ED8",
                "800": "#1E40AF"
            },
            "white": "#FFFFFF",
            "black": "#000000"
        },
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
}