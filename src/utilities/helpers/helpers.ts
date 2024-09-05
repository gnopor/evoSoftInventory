export default class Helpers {
    static delay(ms = 0) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    static formatDate(dateString: string | number) {
        if (!dateString) return;

        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = this.formatDateUnit(1 + date.getMonth());
        const day = this.formatDateUnit(date.getDate());

        const hour = this.formatDateUnit(date.getHours());
        const minute = this.formatDateUnit(date.getMinutes());
        const second = this.formatDateUnit(date.getSeconds());

        const dateSection = `${year}/${month}/${day}`;
        const timeSection = `${hour}:${minute}:${second}`;

        return `${dateSection} ${timeSection}`.trim();
    }

    static formatDateUnit(unit: number | string) {
        return unit.toString().padStart(2, "0");
    }

    static getMap<T extends any[]>(data: T, field = "id") {
        const dataMap: { [key: string]: T[0] } = {};
        for (const item of data) {
            dataMap[item[field]] = item;
        }
        return dataMap;
    }

    static downloadAsTextFile(data: string, fileName: string) {
        return new Promise((resolve) => {
            const link = document.createElement("a");
            link.setAttribute("href", `data:text/plain;charset=utf-8, ${encodeURIComponent(data)}`);
            link.setAttribute("download", fileName);
            link.style.display = "none";

            document.body.append(link);
            link.click();
            link.remove();
            resolve;
        });
    }
}
