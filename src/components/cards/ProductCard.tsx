import css from "styled-jsx/css";
import { useInventory } from "../../stores/inventoryStore/inventoryContext";
import Helpers from "../../utilities/helpers/helpers";

interface IProps {
    product: I.IProduit;
    shopId: string;
}

export default function ProductCard({ product, shopId }: IProps) {
    const { state } = useInventory();

    return (
        <>
            <article className="card">
                <div className="header">
                    <span>{product.nom}</span>
                    <span>{`${product.prix} XAF`}</span>
                </div>

                <div className="body">
                    {state?.inventoriesMap?.[product.id] ? (
                        <>
                            <span>{`quantity: ${
                                state.inventoriesMap[product.id].stock[shopId]
                            }`}</span>

                            <span>
                                {`updatedAt: ${Helpers.formatDate(
                                    +state.inventoriesMap[product.id].date
                                )}
                           `}{" "}
                            </span>
                        </>
                    ) : (
                        <span>{"set the inventory"}</span>
                    )}
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

    .body span {
        color: var(--grey-dark);
        font-size: 0.8em;
        font-weight: bold;
    }
`;
