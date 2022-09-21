import React from "react";
import css from "styled-jsx/css";
import Button from "../components/Button";

import Page from "../components/Page";

export default function HomePage() {
    return (
        <>
            <Page title="Home">
                <main id="home_page" className="container">
                    <section>
                        Home Page
                        <p>some paragraph</p>
                    </section>

                    <p>super paragrapth</p>

                    <section className="row my-3">
                        <article className="col-12 col-md-6 bg-primary">child 1</article>
                        <article className="col-12 col-md-6">child 2</article>
                    </section>

                    {/* custom button */}
                    <div>
                        <Button prepend="gn" append={<>d</>} variant="primary" disabled block>
                            custom button
                        </Button>

                        {/* <Button secondary loading>
                            ddd
                        </Button> */}
                    </div>
                    {/* custom button */}

                    <hr />

                    {/* <!-- Button trigger modal --> */}
                    <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                    >
                        Launch demo modal
                    </button>

                    {/* <!-- Modal --> */}
                    <div
                        className="modal fade"
                        id="exampleModal"
                        tabIndex={-1}
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">
                                        Modal title
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <div className="modal-body">...</div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                    >
                                        Close
                                    </button>
                                    <button type="button" className="btn btn-primary">
                                        Save changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </Page>

            <style jsx>{style}</style>
        </>
    );
}

const style = css`
    #home_page section {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
            sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 14px;
        font-weight: bold;
        transition: all 1s ease;
    }

    #home_page section:hover {
        text-decoration: underline;
        font-size: 5em;
    }

    #home_page p {
        color: red;
    }
`;
