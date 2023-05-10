import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidV4 } from "uuid";
import { Tag } from "application/modals/types";

type TagsType = {
  tags: Tag[];
};

const initialState: TagsType = {
  tags: [],
};

export const createNewTag = createAsyncThunk<Tag, string>(
  "tags/createNewTag",
  async (label: string, thunkAPI) => {
    const newTag: Tag = { id: uuidV4(), label };
    thunkAPI.dispatch(addTag(newTag));
    return newTag;
  }
);

const tagSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    addTag: (state: TagsType, { payload }: PayloadAction<Tag>): void => {
      state.tags.push(payload);
    },
    deleteTag: (state: TagsType, { payload }: PayloadAction<string>): void => {
      const index = state.tags.findIndex((tag) => tag.id === payload);
      if (index !== -1) {
        state.tags.splice(index, 1);
      }
    },
    updateTag: (state: TagsType, { payload }: PayloadAction<Tag>): void => {
      const tag = state.tags.find((tag) => tag.id === payload.id);
      if (tag) {
        tag.label = payload.label;
      }
    },
  },
});

export const { addTag, deleteTag, updateTag } = tagSlice.actions;
export default tagSlice.reducer;
