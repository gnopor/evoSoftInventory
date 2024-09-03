import { useState } from "react";
import css from "styled-jsx/css";

import PathHelpers from "../../utilities/helpers/path.helpers";
import Icon from "../Icon";
import LanguageForm from "../LanguageToggler";
import Link from "../Link";
import Logo from "../Logo";

export default function HeaderDefaultLayout() {
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const links = [
        { label: "labels.navbarLinks.home", path: PathHelpers.homePagePath(), target: "" }
    ];

    const toggleMenuVisibility = () => {
        setIsMenuVisible((v) => !v);
    };

    return (
        <>
            <header>
                <nav className="container">
                    <figure className="logo">
                        <Link href={PathHelpers.homePagePath()}>
                            <Logo color="var(--white)" fontSize="1em" />
                        </Link>
                    </figure>

                    <div className="trigger">
                        <button onClick={toggleMenuVisibility}>
                            {isMenuVisible ? (
                                <Icon name="ep:close" width="30" />
                            ) : (
                                <Icon name="bx:menu" width="30" />
                            )}
                        </button>
                    </div>

                    <ul className={`menu ${!isMenuVisible ? "menu__collapse" : ""}`}>
                        {links.map((l, i) => (
                            <li key={i} className="menu__item">
                                <Link href={l.path} target={l.target}>
                                    <span>{l.label}</span>
                                </Link>
                            </li>
                        ))}

                        <li className="menu__item">
                            <span>
                                <LanguageForm />
                            </span>
                        </li>
                    </ul>
                </nav>
            </header>

            <style jsx>{style}</style>
        </>
    );
}

const style = css`
    header {
        position: fixed;
        background: var(--black);
        padding: 30px 0px;
        width: 100%;
        max-width: 100vw;
        z-index: 3;
    }

    nav {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
    }

    /* trigger */
    .trigger {
        display: none;
    }
    .trigger button {
        color: var(--white);
        background: none;
        border: none;
    }

    /* menu */
    ul.menu {
        display: flex;
        list-style: none;
    }
    ul.menu li.menu__item {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0px 20px;
    }
    ul.menu li.menu__item span {
        color: var(--grey-light);
        font-weight: bold;
        text-transform: uppercase;
    }

    ul.menu li.menu__item::before {
        content: "";
        position: absolute;
        bottom: -2px;
        border-bottom: 1px solid var(--white);
        width: 100%;
        transform-origin: left;
        transform: scaleX(0);
        transition: 0.5s;
    }
    ul.menu li.menu__item:hover::before {
        transform: scaleX(1);
    }

    /* for tablet and smartphone */
    @media screen and (max-width: 768px) {
        .trigger {
            display: block;
        }

        ul.menu {
            flex: 1 0 100%;
            display: flex;
            flex-direction: column;
            gap: var(--spacing);
            border-top: 1px solid var(--white);
            max-height: 1000px;
            transition: 0.5s;
        }
        ul.menu.menu__collapse {
            transform: scaleY(0);
            max-height: 0px;
        }

        ul.menu li.menu__item {
            margin: 10px 0px;
            transform: scaleY(1);
            transition: 0.5s;
        }
        ul.menu.menu__collapse li.menu__item {
            transform: scaleY(0);
        }
    }
`;
