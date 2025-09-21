export const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 11) {
        return "Selamat Pagi 👋";
    } else if (hour >= 11 && hour < 15) {
        return "Selamat Siang ☀️";
    } else if (hour >= 15 && hour < 18) {
        return "Selamat Sore 🌅";
    } else {
        return "Selamat Malam 🌙";
    }
};