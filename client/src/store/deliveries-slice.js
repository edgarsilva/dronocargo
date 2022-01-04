import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: null };
const newdelivery = {
};

const deliveriesSlice = createSlice({
  name: 'deliveries',
  initialState,
  reducers: {
    fetchDeliveryItems(state, action) {
      if (!action.payload) {
        return;
      }

      state.items = action.payload.items;
    },

    addNewDelivery(state, action) {
      state.items = state.items ?? [];
      let itemIndex = state.items.findIndex((item) => item.orderId === action.payload.orderId);

      if (itemIndex >= 0) {
        state.items.splice(itemIndex, 1, { ...(state.items[itemIndex] || {}), ...action.payload });
      } else {
        state.items.push({ ...action.payload });
      }
      state.loading = false;
    },

    updateDelivery(state, action) {
      if (!state.items) {
        return state;
      }

      const itemIndex = state.items.findIndex((item) => item.id === action.payload.id);

      if (itemIndex >= 0) {
        state.items.splice(itemIndex, 1, { ...(state.items[itemIndex] || {}), ...action.payload });
        return state;
      }

      state.items.push(action.payload);
    },

    deleteDelivery(state, { payload: { id } }) {
      state.items = state.items.filter((item) => item.id !== id);
    },
  }
});

export const deliveriesActions = deliveriesSlice.actions;
export default deliveriesSlice.reducer;