import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import css from "styled-jsx/css";

import { ERROR_MESSAGE_PREFIX } from "../../constants";
import { useInventory } from "../../stores/inventoryStore/inventoryContext";
import ValidationHelpers from "../../utilities/helpers/validation.helpers";
import AlertBox from "../AlertBox";
import Button from "../Button";
import Select from "../forms/Select";
import TextField from "../forms/TextField";
import Modal from "./Modal";

interface IProps<T = I.IInventaire> {
    id: string;
    inventory: T;
    setInventory: (inventory: T) => void;
}

export default function InventoryModal({ id, inventory, setInventory }: IProps) {
    const { state } = useInventory();
    const { t } = useTranslation("inventoryDetail");

    const [formValues, setFormValues] = useState<I.IInventaire>(inventory);
    const [shopId, setShopId] = useState("");
    const [alertMessage, setAlertMessage] = useState<I.IAlertMessage>();

    const closeButtonRef = useRef<HTMLButtonElement>(null);

    const handleSubmit = () => {
        try {
            const data = ValidationHelpers.isInventoryFormValid(formValues);
            setInventory(data);

            setAlertMessage({ message: t("common:form.confirmationMessage") });

            setTimeout(() => {
                handleCloseModal();
            }, 1000);
        } catch (error: any) {
            let errorMessage = error.message || "";
            const field = errorMessage.split(ERROR_MESSAGE_PREFIX)[1];
            if (field) {
                errorMessage = t("common:form.fieldErrorMessage", { field });
            }

            setAlertMessage({ message: errorMessage || "", type: "error" });
        }
    };

    const handleCloseModal = () => {
        closeButtonRef.current?.click();
    };

    return (
        <>
            <Modal id={id}>
                <div className="modal_inner" style={{ width: "700px" }}>
                    <section className="modal_header">
                        <span>{t("sections.inventoryModal.sectionTitle")}</span>

                        <button ref={closeButtonRef} data-toggle="modal" data-target={id}>
                            x
                        </button>
                    </section>

                    <section className="modal_body">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="inner_form">
                                <div>
                                    {alertMessage?.message && (
                                        <AlertBox
                                            message={alertMessage.message}
                                            type={alertMessage.type}
                                            onClose={() => setAlertMessage({})}
                                        />
                                    )}
                                </div>

                                <div>
                                    <Select
                                        label={t("sections.inventoryModal.mainForm.shop.label")}
                                        required
                                        value={shopId}
                                        onChange={(e) => setShopId(e.target.value)}
                                    >
                                        <option></option>
                                        {state?.shops?.map((s) => (
                                            <option key={s.id} value={s.id}>
                                                {s.nom}
                                            </option>
                                        ))}
                                    </Select>
                                </div>

                                {shopId && (
                                    <div>
                                        <TextField
                                            label={t(
                                                "sections.inventoryModal.mainForm.stock.label"
                                            )}
                                            required
                                            type="number"
                                            step="1"
                                            min="0"
                                            value={formValues.stock[shopId] || 0}
                                            onChange={(e) =>
                                                setFormValues({
                                                    ...formValues,
                                                    stock: {
                                                        ...formValues.stock,
                                                        [shopId]: +e.target.value.split(".")[0]
                                                    }
                                                })
                                            }
                                        />
                                    </div>
                                )}

                                <div>
                                    <TextField
                                        label={t("sections.inventoryModal.mainForm.date.label")}
                                        required
                                        type="date"
                                        value={formValues?.date || ""}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                date: e.target.value
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </form>
                    </section>

                    <section className="modal_footer">
                        <div>
                            <Button block variant="secondary" onClick={handleCloseModal}>
                                {t("common:buttons.cancel.label")}
                            </Button>
                        </div>

                        <div>
                            <Button block variant="primary" onClick={handleSubmit}>
                                {t("common:buttons.submit.label")}
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
