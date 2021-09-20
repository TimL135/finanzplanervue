export interface CurrentPlan {
    name: string;
    reason: string;
    amount: number;
    duration: number;
    deleted: boolean;
}
export function setData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data))
}
export function getData(key: string): any {
    return JSON.parse(localStorage.getItem(key) || "[]")
}