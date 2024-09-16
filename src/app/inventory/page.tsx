/* eslint-disable max-lines-per-function */
"use client";

import { useTranslation } from "react-i18next";
import css from "styled-jsx/css";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import ShopCard from "../../components/cards/ShopCard";
import InventoryModal from "../../components/modals/InventoryModal";
import Page from "../../components/Page";
import InventoryService from "../../services/inventory.service";
import { useInventory } from "../../stores/inventoryStore/inventoryContext";
import InventoryFactory from "../../utilities/factories/inventory.factory";
import PathHelpers from "../../utilities/helpers/path.helpers";

interface IProps {
    params: Record<string, string>;
    searchParams: Record<string, string | string[] | undefined>;
}

const ID_INVTORY_MODAL = "inventory_modal";

export default function InventoryDetailPage({ searchParams }: IProps) {
    const { state, addInventory, updateInventory } = useInventory();
    const { t } = useTranslation("inventoryDetail");
    const router = useRouter();

    const [inventory, setInventory] = useState<I.IInventaire>();
    const [product, setProduct] = useState<I.IProduit>();
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (!state?.products) return;

        handleSetProduct();
    }, [state?.products]);

    useEffect(() => {
        if (!inventory) return;

        getTotal(inventory);
    }, [inventory]);

    const handleSetProduct = () => {
        try {
            if (!(state?.productsMap && state.inventoriesMap)) return;
            if (!state?.productsMap) return;
            if (typeof searchParams.id != "string") throw new Error("product not found");

            const newProduct = state.productsMap[searchParams.id];
            if (!newProduct) throw new Error("product not found");

            const newInventory = InventoryFactory.create(state.inventoriesMap[newProduct.id]);
            newInventory.produitId = newProduct.id;

            setProduct(newProduct);
            setInventory(newInventory);
        } catch (error) {
            console.error(error);
            router.push(PathHelpers.homePagePath());
        }
    };

    const handleUpdateInventory = (newInventory: I.IInventaire) => {
        const inventories = state?.inventories ? [...state.inventories] : [];

        const index = inventories.findIndex((i) => i.produitId == newInventory.produitId);

        index == -1 ? inventories.push(newInventory) : (inventories[index] = newInventory);
        InventoryService.saveInventories(inventories);

        index == -1 ? addInventory(newInventory) : updateInventory(newInventory);
        setInventory(newInventory);
    };

    const getTotal = (data: I.IInventaire) => {
        let productTotal = 0;

        const stocks = Object.values(data.stock);
        stocks.forEach((s) => (productTotal += s));

        setTotal(productTotal);
    };

    return (
        <>
            <Page title={product?.nom || ""}>
                <main>
                    <section className="header">
                        <div className="container">
                            <div className="content">
                                <h1 className="title">{product?.nom}</h1>
                                <h3 className="subtitle">
                                    {t("sections.header.sectinSubtitle", { product: product?.nom })}
                                </h3>

                                <Button
                                    data-toggle="modal"
                                    data-target={ID_INVTORY_MODAL}
                                    variant="primary"
                                >
                                    {t("sections.header.buttons.update.label")}
                                </Button>

                                {inventory?.date && (
                                    <span className="date">{`${t("sections.header.date")}: ${
                                        inventory?.date
                                    }`}</span>
                                )}
                            </div>
                        </div>
                    </section>

                    <section className="listing">
                        <div className="container">
                            <div className="content">
                                <ul>
                                    {product &&
                                        state?.shops?.map((s) => (
                                            <li key={s.id}>
                                                <ShopCard shop={s} inventory={inventory} />
                                            </li>
                                        ))}
                                </ul>

                                <span>{total}</span>
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
                    setInventory={handleUpdateInventory}
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
    .header .date {
        color: var(--grey-light);
        font-weight: bold;
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
