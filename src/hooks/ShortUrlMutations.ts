import { type TypeOf } from "zod";
import {
  type NewShortUrl,
  type ShortUrl,
  type deleteUrlSchema,
} from "~/server/db/schema/schema";
import { api } from "~/utils/api";

type DeleteShortUrl = TypeOf<typeof deleteUrlSchema>;

export const useShortUrlDeleteMutation = () => {
  const utils = api.useContext();
  return api.shortUrls.delete.useMutation({
    onMutate: (data: DeleteShortUrl) => {
      const previousData =
        utils.shortUrls.getAll.getData() ?? ([] as ShortUrl[]);
      utils.shortUrls.getAll.setData(
        undefined,
        (oldQueryData: ShortUrl[] | undefined) => {
          return [
            ...(oldQueryData ?? []).filter((x) => x.uid !== data.uid),
          ] as ShortUrl[];
        },
      );
      return { previousData };
    },
    onSuccess: (data) => {
      // console.log("onSuccess", data);
    },
    onError: (err, _newTodo, context) => {
      // Rollback to the previous value if mutation fails
      utils.shortUrls.getAll.setData(undefined, context?.previousData);
    },
    onSettled: () => {
      void utils.shortUrls.getAll.invalidate();
    },
  });
};

export const useShortUrlAddMutation = () => {
  const utils = api.useContext();

  return api.shortUrls.add.useMutation({
    onMutate: (data: NewShortUrl) => {
      const previousData =
        utils.shortUrls.getAll.getData() ?? ([] as ShortUrl[]);
      utils.shortUrls.getAll.setData(
        undefined,
        (oldQueryData: ShortUrl[] | undefined) => {
          return [...(oldQueryData ?? []), data] as ShortUrl[];
        },
      );
      return { previousData };
    },
    onSuccess: (data) => {
      // console.log("onSuccess", data);
    },
    onError: (err, _newTodo, context) => {
      // Rollback to the previous value if mutation fails
      utils.shortUrls.getAll.setData(undefined, context?.previousData);
    },
    onSettled: () => {
      void utils.shortUrls.getAll.invalidate();
    },
  });
};
