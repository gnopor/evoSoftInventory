"use client";

import { useTranslation } from "react-i18next";
import css from "styled-jsx/css";

import Button from "../components/Button";
import ShopCard from "../components/cards/ShopCard";
import Link from "../components/Link";
import Page from "../components/Page";
import { useInventory } from "../stores/inventoryStore/inventoryContext";
import PathHelpers from "../utilities/helpers/path.helpers";

export default function HomePage() {
    const { state } = useInventory();
    const { t, i18n } = useTranslation("home");

    return (
        <>
            <Page title="Home">
                <main>
                    <section className="header">
                        <div className="container">
                            <div className="content">
                                <h1 className="title">{t("header.sectionTitle")}</h1>

                                <Button variant="primary">{t("header.buttons.export")}</Button>
                            </div>
                        </div>
                    </section>

                    <section className="listing">
                        <div className="container">
                            <div className="content">
                                <ul>
                                    {state?.shops?.map((s) => (
                                        <li key={s.id}>
                                            <Link href={PathHelpers.shopDetailPagePath(s.id)}>
                                                <ShopCard shop={s} />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>
                </main>
            </Page>

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
        gap: calc(var(--spacing) * 3);
        height: 100%;
        width: 100%;
    }

    /*listing */
    .listing .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        width: 100%;
    }

    .listing ul {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing);
    }
    .listing li {
        list-style: none;
    }
`;
