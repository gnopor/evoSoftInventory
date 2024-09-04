import { useTranslation } from "react-i18next";
import css from "styled-jsx/css";

interface IProps {
    shop: I.IMagasin;
    inventory?: I.IInventaire;
}

export default function ShopCard({ shop, inventory }: IProps) {
    const { t } = useTranslation("inventoryDetail");

    return (
        <>
            <article className="card">
                <div className="header">
                    <span>{shop.nom}</span>
                    <span>{`${t("sections.listing.shopCard.quantity")}: ${
                        inventory?.stock[shop.id] || 0
                    }`}</span>
                </div>

                <div className="body">
                    <span>{shop.adresse}</span>
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
