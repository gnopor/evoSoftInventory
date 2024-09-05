"use client";

import { useTranslation } from "react-i18next";
import css from "styled-jsx/css";

import Button from "../components/Button";
import ProductCard from "../components/cards/ProductCard";
import Link from "../components/Link";
import Page from "../components/Page";
import { useInventory } from "../stores/inventoryStore/inventoryContext";
import Helpers from "../utilities/helpers/helpers";
import PathHelpers from "../utilities/helpers/path.helpers";

export default function HomePage() {
    const { state } = useInventory();
    const { t } = useTranslation("home");

    const handleExportInventory = async () => {
        try {
            if (!state?.inventories) return;

            let content = getFileContent(state.inventories);

            const fileName = `Inventories on ${Helpers.formatDate(Date.now())}.csv`;
            await Helpers.downloadAsTextFile(content, fileName);
        } catch (error: any) {
            console.error(error?.message);
        }
    };

    const getFileContent = (data: Record<string, any>[]) => {
        if (data.length == 0) return "";

        const keys = Object.keys(data[0]);
        let content = keys.map((k) => `"${k}"`).join(",");
        for (let item of data) {
            content += "\n";

            const values: string[] = [];
            for (let key of keys) {
                let value = item[key] || "";
                value =
                    typeof value == "object" ? JSON.stringify(value).replaceAll('"', '\\"') : value;
                values.push(`"${value}"`);
            }
            content += values.join(",");
        }

        return content;
    };

    return (
        <>
            <Page title={t("pageTitle")}>
                <main>
                    <section className="header">
                        <div className="container">
                            <div className="content">
                                <h1 className="title">{t("sections.header.sectionTitle")}</h1>

                                <Button variant="primary" onClick={handleExportInventory}>
                                    {t("sections.header.buttons.export.label")}
                                </Button>
                            </div>
                        </div>
                    </section>

                    <section className="listing">
                        <div className="container">
                            <div className="content">
                                <ul>
                                    {state?.products?.map((p) => (
                                        <li key={p.id}>
                                            <Link href={PathHelpers.inventoryDetailPagePath(p.id)}>
                                                <ProductCard product={p} />
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
    }
`;
