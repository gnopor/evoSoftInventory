"use client";

import { useTranslation } from "react-i18next";
import css from "styled-jsx/css";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCard from "../../components/cards/ProductCard";
import InventoryModal from "../../components/modals/InventoryModal";
import Page from "../../components/Page";
import { useInventory } from "../../stores/inventoryStore/inventoryContext";
import PathHelpers from "../../utilities/helpers/path.helpers";

interface IProps {
    params: Record<string, string>;
    searchParams: Record<string, string | string[] | undefined>;
}

const ID_INVTORY_MODAL = "inventory_modal";

export default function ShopDetailPage({ searchParams }: IProps) {
    const { state } = useInventory();
    const { t, i18n } = useTranslation("shop");

    const [shop, setShop] = useState<I.IMagasin>();
    const [inventory, setInventory] = useState<I.IInventaire>();

    const router = useRouter();

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
    };

    return (
        <>
            <Page title="Shop">
                <main>
                    <section className="header">
                        <div className="content">
                            <h1 className="title">{t("header.sectionTitle")}</h1>
                        </div>
                    </section>

                    <section className="listing">
                        <div className="container">
                            <div className="content">
                                <ul>
                                    {state?.products?.map((p) => (
                                        <li
                                            key={p.id}
                                            data-toggle="modal"
                                            data-target={ID_INVTORY_MODAL}
                                            onClick={() => handleSetInventory(p.id)}
                                        >
                                            <ProductCard product={p} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>
                </main>
            </Page>

            {/* START MODALS */}
            {inventory && (
                <InventoryModal
                    id={ID_INVTORY_MODAL}
                    inventory={inventory}
                    setInventory={console.log}
                />
            )}
            {/* START MODALS */}

            <style jsx>{style}</style>
        </>
    );
}

const style = css`
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
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
        justify-content: center;
        gap: calc(var(--spacing) * 3);
        height: 100%;
        width: 100%;
    }

    /*listing */
    .listing .content {
        display: flex;
        height: 100%;
        width: 100%;
    }
`;
