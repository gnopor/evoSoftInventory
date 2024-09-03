import { useEffect, useRef, useState } from "react";
import css from "styled-jsx/css";

import Button from "../Button";
import Modal from "./Modal";

interface IProps<T = I.IInventaire> {
    id: string;
    inventory?: T;
    setInventory: (inventory: T) => void;
}

export default function InventoryModal({ id, inventory, setInventory }: IProps) {
    const [formValues, setFormValues] = useState<I.IInventaire>();

    const closeButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        setFormValues(inventory);
    }, [inventory]);

    const handleSubmit = () => {};

    const handleCloseModal = () => {
        closeButtonRef.current?.click();
    };

    return (
        <>
            <Modal id={id}>
                <div className="modal_inner" style={{ width: "700px" }}>
                    <section className="modal_header">
                        <span>{"labels.videoModal.sectionTitle"}</span>

                        <button ref={closeButtonRef} data-toggle="modal" data-target={id}>
                            x
                        </button>
                    </section>

                    <section className="modal_body">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="inner_form">body goes here</div>
                        </form>
                    </section>

                    <section className="modal_footer">
                        <div>
                            <Button block variant="secondary" onClick={handleCloseModal}>
                                {"labels.videoModal.buttons.cancel.label"}
                            </Button>
                        </div>

                        <div>
                            <Button block variant="primary" onClick={handleSubmit}>
                                {"labels.videoModal.buttons.submit.label"}
                            </Button>
                        </div>
                    </section>
                </div>
            </Modal>

            <style jsx>{style}</style>
        </>
    );
}

const style = css`
    form {
        width: 500px;
        max-width: 100%;
        margin: auto;
    }
    form .inner_form {
        display: flex;
        flex-direction: column;
        gap: var(--spacing);
    }
`;
