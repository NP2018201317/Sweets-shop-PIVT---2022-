export default interface ICategory {
    categoryId: number;
    name: string;
    isActive: boolean;
    imagePath: string;
    mesuarment: "100g" | "kugla" | "komad";
}