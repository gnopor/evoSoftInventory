"use client";

import { useTranslation } from "react-i18next";
import css from "styled-jsx/css";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ProductCard from "../../components/cards/ProductCard";
import InventoryModal from "../../components/modals/InventoryModal";
import Page from "../../components/Page";
import { useInventory } from "../../stores/inventoryStore/inventoryContext";
import { useNotification } from "../../stores/notificationStore/notificationContext";
import PathHelpers from "../../utilities/helpers/path.helpers";

interface IProps {
    params: Record<string, string>;
    searchParams: Record<string, string | string[] | undefined>;
}

const ID_INVTORY_MODAL = "inventory_modal";

export default function ShopDetailPage({ searchParams }: IProps) {
    const { state } = useInventory();
    const { showNotification } = useNotification();
    const { t } = useTranslation("shopDetail");
    const router = useRouter();

    const [shop, setShop] = useState<I.IMagasin>();
    const [inventory, setInventory] = useState<I.IInventaire>();

    const modalTogglerRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!state?.shops) return;

        handleSetShop();
    }, [state?.shops]);

    const handleSetShop = () => {
        try {
            if (!state?.shopsMap) return;
            if (typeof searchParams.id != "string") throw new Error("Shop not found");

            const newShop = state.shopsMap[searchParams.id];
            if (!newShop) throw new Error("Shop not found");

            setShop(newShop);
        } catch (error) {
            router.push(PathHelpers.homePagePath());
        }
    };

    const handleSetInventory = (productId: string) => {
        if (!state?.inventoriesMap) return;

        setInventory(state?.inventoriesMap[productId]);
        setTimeout(() => {
            modalTogglerRef.current?.click();
        });
    };

    const handleUpdateInventory = (newInventory: I.IInventaire) => {
        try {
            console.log(newInventory);

            return;
            showNotification({ message: "confirmation message" });
        } catch (error: any) {
            console.error(error);
            showNotification({ message: error?.message, type: "error" });
        }
    };

    return (
        <>
            <Page title={shop?.nom || ""}>
                <main>
                    <section className="header">
                        <div className="container">
                            <div className="content">
                                <h1 className="title">
                                    {t("sections.header.sectionTitle", { shop: shop?.nom })}
                                </h1>
                                <h3 className="subtitle">
                                    {t("sections.header.sectinSubtitle", { shop: shop?.nom })}
                                </h3>
                            </div>
                        </div>
                    </section>

                    <section className="listing">
                        <div className="container">
                            <div className="content">
                                <ul>
                                    <button
                                        ref={modalTogglerRef}
                                        data-toggle="modal"
                                        data-target={ID_INVTORY_MODAL}
                                        style={{ display: "none" }}
                                    />
                                    {shop &&
                                        state?.products?.map((p) => (
                                            <li key={p.id} onClick={() => handleSetInventory(p.id)}>
                                                <ProductCard product={p} shopId={shop.id} />
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </section>
                </main>
            </Page>

            {/* START MODALS */}
            <InventoryModal
                id={ID_INVTORY_MODAL}
                inventory={inventory}
                setInventory={handleUpdateInventory}
            />
            {/* START MODALS */}

            <style jsx>{style}</style>
        </>
    );
}

const style = css`
    main {
        display: flex;
        flex-direction: column;
        gap: var(--spacing);
        background: var(--white);
    }

    /* header */
    .header {
        padding: calc(var(--spacing) * 3) 0px;
    }
    .header .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing);
        height: 100%;
        width: 100%;
    }
    .header .subtitle {
        text-align: center;
    }

    /*listing */
    .listing .content {
        width: 100%;
    }

    .listing ul {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing);
    }
    .listing li {
        max-width: 100%;
        list-style: none;
        cursor: pointer;
    }
`;
