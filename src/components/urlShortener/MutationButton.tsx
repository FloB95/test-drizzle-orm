import React from "react";
import { Button } from "../ui/button";
import {
  type DeleteShortUrlParams,
  type NewShortUrl,
} from "~/server/db/schema/schema";
import {
  useShortUrlAddMutation,
  useShortUrlDeleteMutation,
} from "~/hooks/ShortUrlMutations";
import { faker } from "@faker-js/faker";

export const AddButton = () => {
  const addMutation = useShortUrlAddMutation();

  const handleAdd = () => {
    const newShortUrl: NewShortUrl = {
      code: faker.string.alphanumeric({
        length: 5,
      }),
      url: faker.internet.url(),
      createdBy: faker.string.uuid(),
    };

    addMutation.mutate(newShortUrl);
  };

  return (
    <Button onClick={handleAdd} variant="secondary" size="lg">
      test
    </Button>
  );
};

export const DeleteButton = ({ uid }: DeleteShortUrlParams) => {
  const deleteMutation = useShortUrlDeleteMutation();

  const handleDelete = () => {
    deleteMutation.mutate({
      uid,
    });
  };

  return (
    <Button
      onClick={handleDelete}
      className="ml-4"
      variant="secondary"
      size="icon"
    >
      x
    </Button>
  );
};
