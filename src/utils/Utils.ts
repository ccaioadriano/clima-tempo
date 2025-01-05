const Utils = {
    convertWindSpeed: (speedMetroPerSecond: number | undefined): number | undefined => {
        if (speedMetroPerSecond) {
            return Math.round(speedMetroPerSecond * 3.6);
        }
    },
    convertDecimalPoint: (value: number | undefined): string | undefined => {
        if (value) {
            return Math.round(value).toString().replace('.', ',');
        }
    }
};

export default Utils;