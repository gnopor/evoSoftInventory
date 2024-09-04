/* eslint-disable no-unused-vars */

export declare global {
    namespace I {
        interface IAlertMessage {
            type?: "info" | "error";
            title?: string;
            message?: string;
        }

        interface ILanguage {
            code2: string;
            code3: string;
            label: string;
        }

        interface IMagasin {
            id: string;
            nom: string;
            adresse: string;
        }
        interface IProduit {
            id: string;
            nom: string;
            prix: number;
        }
        interface IInventaire {
            date: string;
            produitId: string;
            stock: Record<string, number>; // Record<magasinId, stock>
        }
    }
}
