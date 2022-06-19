export default interface ITokenData {
    id: number;
    identity: string;
    role: "user" | "administrator";
}