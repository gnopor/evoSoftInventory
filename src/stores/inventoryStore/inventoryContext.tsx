/* eslint-disable max-lines-per-function */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import InventoryService from "../../services/inventory.service";
import { RootState } from "../store";
import { initialState, inventoryActions } from "./inventorySlice";

interface IInventoryContext {
    state: typeof initialState | undefined;
    addInventory: (payload: I.IInventaire) => void;
    updateInventory: (payload: I.IInventaire) => void;
}

const inventoryContext = React.createContext<IInventoryContext>({} as IInventoryContext);

function useInventory() {
    const context = React.useContext(inventoryContext);

    if (context === undefined) {
        throw new Error("inventoryContext must be used within an InventoryProvider.");
    }
    return context;
}

function InventoryProvider({ children }: { children: React.ReactNode }) {
    const state = useSelector((state: RootState) => state.inventory);
    const dispatch = useDispatch();

    useEffect(() => {
        initState();
    }, []);

    const initState = async () => {
        handleSetShops();
        handleSetProducts();
        handleSetInventories();
    };

    const handleSetShops = () => {
        try {
            const result = InventoryService.getShops();
            setShops(result);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSetProducts = () => {
        try {
            const result = InventoryService.getProducts();
            setProducts(result);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSetInventories = () => {
        try {
            const result = InventoryService.getInventories();
            setInventories(result);
        } catch (error) {
            console.error(error);
        }
    };

    const setShops = (payload: I.IMagasin[]) => dispatch(inventoryActions.setShops(payload));
    const setProducts = (payload: I.IProduit[]) => dispatch(inventoryActions.setProducts(payload));
    const setInventories = (payload: I.IInventaire[]) =>
        dispatch(inventoryActions.setInventories(payload));
    const addInventory = (payload: I.IInventaire) =>
        dispatch(inventoryActions.addInventory(payload));
    const updateInventory = (payload: I.IInventaire) =>
        dispatch(inventoryActions.updateInventory(payload));

    const value: IInventoryContext = {
        state,
        addInventory,
        updateInventory
    };

    return <inventoryContext.Provider value={value}>{children}</inventoryContext.Provider>;
}

export { InventoryProvider, useInventory };
