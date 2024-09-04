import css from "styled-jsx/css";
import { useInventory } from "../../stores/inventoryStore/inventoryContext";

interface IProps {
    product: I.IProduit;
}

export default function ProductCard({ product }: IProps) {
    const { state } = useInventory();

    return (
        <>
            <article className="card">
                <div className="header">
                    <span>{product.nom}</span>
                    <span>{`${product.prix} XAF`}</span>
                </div>
            </article>

            <style jsx>{style}</style>
        </>
    );
}
const style = css`
    .card {
        display: flex;
        flex-direction: column;
        gap: var(--spacing);
        border: 1px solid var(--primary);
        padding: var(--spacing);
        width: 400px;
        max-width: 100%;
    }

    .header {
        display: flex;
        justify-content: space-between;
    }
    .header span {
        color: var(--primary);
        font-weight: bold;
        text-transform: capitalize;
    }
`;
