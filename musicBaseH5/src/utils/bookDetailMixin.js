export default {
    created() {
        if (document.documentElement.clientWidth < 700) {
            document.documentElement.style.fontSize = "32px";
        } else {
            document.documentElement.style.fontSize = "48px";
        }
    },
    destroyed() {
        if (document.documentElement.clientWidth < 700) {
            document.documentElement.style.fontSize = "18px";
        } else {
            document.documentElement.style.fontSize = "22px";
        }
    },
}