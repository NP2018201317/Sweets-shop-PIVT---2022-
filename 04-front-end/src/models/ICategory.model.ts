export default interface ICategory {
    categoryId: number;
    name: string;
    isActive: boolean;
    imagePath: string;
    measurement: "100g" | "kugla" | "komad";
}