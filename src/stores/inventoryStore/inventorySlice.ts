import { createSlice } from "@reduxjs/toolkit";

import Helpers from "../../utilities/helpers/helpers";

interface IState {
    shops?: I.IMagasin[];
    products?: I.IProduit[];
    inventories?: I.IInventaire[];

    shopsMap?: Record<string, I.IMagasin>;
    productsMap?: Record<string, I.IProduit>;
    inventoriesMap?: Record<string, I.IInventaire>;
}

type IActionsMap = {
    setShops: I.IMagasin[];

    setProducts: I.IProduit[];

    setInventories: I.IInventaire[];
    addInventory: I.IInventaire;
    updateInventory: I.IInventaire;
};
type IReducer = {
    [key in keyof IActionsMap]: (state: IState, action: { payload: IActionsMap[key] }) => void;
};

export const initialState: IState = {};

const reducers: IReducer = {
    setShops: (state, action) => {
        state.shops = action.payload;
        state.shopsMap = Helpers.getMap(action.payload);
    },

    setProducts: (state, action) => {
        state.products = action.payload;
        state.productsMap = Helpers.getMap(action.payload);
    },

    setInventories: (state, action) => {
        state.inventories = action.payload;
        state.inventoriesMap = Helpers.getMap(action.payload, "produitId");
    },
    addInventory: (state, action) => {
        if (!(state.inventories && state.inventoriesMap)) return;

        state.inventories.push(action.payload);
        state.inventoriesMap[action.payload.produitId] = action.payload;
    },

    updateInventory: (state, action) => {
        if (!(state.inventories && state.inventoriesMap)) return;

        const index = state.inventories.findIndex((i) => i.produitId === action.payload.produitId);
        if (index == -1) return;

        state.inventories[index] = action.payload;
        state.inventoriesMap[action.payload.produitId] = action.payload;
    }
};

export const inventorySlice = createSlice({ name: "inventory", initialState, reducers });
export const inventoryActions = inventorySlice.actions;
export default inventorySlice.reducer;
